import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { orderStore } from "@/lib/orderStore";
import { executeOrderFulfillment } from "@/lib/fulfillment";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("[Razorpay Webhook] RAZORPAY_WEBHOOK_SECRET is not configured on server.");
      return NextResponse.json({ error: "Webhook secret is not configured" }, { status: 500 });
    }

    if (!signature) {
      return NextResponse.json({ error: "Missing x-razorpay-signature header" }, { status: 400 });
    }

    // Security Check: Validate that Razorpay actually sent this data
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const isValid =
      expectedSignature.length === signature.length &&
      crypto.timingSafeEqual(Buffer.from(expectedSignature, "utf-8"), Buffer.from(signature, "utf-8"));

    if (!isValid) {
      console.error("[Razorpay Webhook] Webhook signature verification failed.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const payload = JSON.parse(rawBody);

    // Initialize Razorpay SDK instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });

    // Only proceed if the event confirms a successful checkout capture
    if (payload.event === "payment.captured") {
      const payment = payload.payload?.payment?.entity;

      if (payment) {
        let invoiceId: string | null = null;

        // 1. Create a "Paid" invoice by binding the transaction ID
        try {
          const invoice: any = await (razorpay.invoices as any).create({
            type: "invoice",
            description: "PROMEC Aquaforce® 1400 PSI Cordless High-Pressure Washer",
            payment_id: payment.id,
            currency: payment.currency || "INR",
            customer: {
              ...(payment.email ? { email: payment.email } : {}),
              ...(payment.contact ? { contact: payment.contact } : {}),
            },
            line_items: [
              {
                name: `PROMEC Purchase - Order ID ${payment.order_id || "Direct"}`,
                amount: payment.amount, // already matches currency subunits (paise)
                currency: payment.currency || "INR",
                quantity: 1,
              },
            ],
            email_notify: process.env.RAZORPAY_INVOICE_EMAIL_NOTIFY === "true" ? 1 : 0,
            sms_notify: 0,
          } as any);

          // 2. Issue the invoice immediately to dispatch the Email/SMS
          if (invoice?.id) {
            await (razorpay.invoices as any).issue(invoice.id);
            invoiceId = invoice.id;
            console.log(`[Razorpay Webhook] Auto-issued Paid Invoice: ${invoice.id} for payment ${payment.id}`);
          }
        } catch (invoiceErr: any) {
          console.error("[Razorpay Webhook] Razorpay invoice creation error:", invoiceErr?.message || invoiceErr);
        }

        // 3. Update order in internal store and trigger fulfillment if present
        const rzpOrderId = payment.order_id;
        let order = rzpOrderId ? await orderStore.getOrderByRazorpayOrderId(rzpOrderId) : null;
        if (!order && payment.notes?.promecOrderId) {
          order = await orderStore.getOrderById(payment.notes.promecOrderId);
        }
        if (!order && payment.notes?.razorpayOrderId) {
          order = await orderStore.getOrderByRazorpayOrderId(payment.notes.razorpayOrderId);
        }

        if (order) {
          const eventId = payload.event_id || `captured_${Date.now()}`;
          const isNewEvent = await orderStore.recordWebhookEvent(order.id, eventId);

          if (isNewEvent) {
            const discountInPaise = Number(payment.discount || 0);
            const discountInINR = Math.round(discountInPaise / 100);
            const grossAmountInINR = Math.round(order.payment.amountRequiredInPaise / 100);
            const netSettlementInINR = grossAmountInINR - discountInINR;

            await orderStore.updateOrder(order.id, {
              orderStatus: "confirmed",
              payment: {
                ...order.payment,
                status: "captured",
                mode: payment.method?.toUpperCase() || order.payment.mode,
                razorpayPaymentId: payment.id,
                amountPaidInPaise: payment.amount,
                capturedAt: new Date().toISOString(),
                ...(invoiceId ? { razorpayInvoiceId: invoiceId } : {}),
                ...(discountInINR > 0
                  ? {
                      subventionDiscountInINR: discountInINR,
                      netSettlementInINR: netSettlementInINR,
                      isNoCostEmi: true,
                    }
                  : {}),
              },
            });

            // Trigger automated shipping, email, sms, and whatsapp confirmation
            await executeOrderFulfillment(order.id);
          }
        }
      }
    } else if (payload.event === "payment.failed") {
      const payment = payload.payload?.payment?.entity;
      const rzpOrderId = payment?.order_id;
      let order = rzpOrderId ? await orderStore.getOrderByRazorpayOrderId(rzpOrderId) : null;
      if (order) {
        await orderStore.updateOrder(order.id, {
          payment: {
            ...order.payment,
            status: "failed",
            failureReason: payment?.error_description || payment?.error_reason || "Payment failed",
          },
        });
      }
    } else if (payload.event === "refund.processed") {
      const payment = payload.payload?.payment?.entity;
      const refund = payload.payload?.refund?.entity;
      const rzpOrderId = payment?.order_id;
      let order = rzpOrderId ? await orderStore.getOrderByRazorpayOrderId(rzpOrderId) : null;
      if (order) {
        await orderStore.updateOrder(order.id, {
          orderStatus: "refunded",
          payment: {
            ...order.payment,
            status: "refunded",
          },
          fulfillment: {
            ...order.fulfillment,
            status: "cancelled",
          },
          refund: {
            refundId: refund?.id || `rfnd_${Date.now()}`,
            amountInPaise: refund?.amount || 0,
            status: "processed",
            refundedAt: new Date().toISOString(),
            reason: refund?.notes?.reason || "Admin refund",
          },
        });
      }
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (err: any) {
    console.error("[Razorpay Webhook Error]:", err);
    return NextResponse.json({ error: "Failed processing" }, { status: 500 });
  }
}
