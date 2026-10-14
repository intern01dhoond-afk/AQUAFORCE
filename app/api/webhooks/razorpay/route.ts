import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { orderStore } from "@/lib/orderStore";
import { executeOrderFulfillment } from "@/lib/fulfillment";
import { generateAndSendRazorpayInvoice } from "@/lib/razorpayInvoiceService";

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
        // 1. Locate order in internal store
        const rzpOrderId = payment.order_id;
        let order = rzpOrderId ? await orderStore.getOrderByRazorpayOrderId(rzpOrderId) : null;
        if (!order && payment.notes?.promecOrderId) {
          order = await orderStore.getOrderById(payment.notes.promecOrderId);
        }
        if (!order && payment.notes?.razorpayOrderId) {
          order = await orderStore.getOrderByRazorpayOrderId(payment.notes.razorpayOrderId);
        }

        // Auto-recovery: If order not found in store, reconstruct from Razorpay payment & order
        if (!order) {
          try {
            console.warn(`[Razorpay Webhook] Order not found in store for payment ${payment.id}. Auto-reconstructing...`);
            let fetchedRzpOrder: any = null;
            if (rzpOrderId) {
              try {
                fetchedRzpOrder = await razorpay.orders.fetch(rzpOrderId);
              } catch (e) {}
            }

            const notes = fetchedRzpOrder?.notes || payment.notes || {};
            const fallbackName = notes.customerName || payment.description || "Valued Customer";
            const fallbackPhone = notes.customerPhone || (payment.contact ? payment.contact.replace(/\D/g, "").slice(-10) : "");
            const fallbackEmail = notes.customerEmail || payment.email || "";
            const fallbackAddress = notes.customerAddress || notes.deliveryAddress || notes.address || "Main Address";
            const fallbackCity = notes.customerCity || notes.city || "Nagpur";
            const fallbackState = notes.customerState || notes.state || "Maharashtra";
            const fallbackPincode = notes.customerPincode || notes.pincode || "440016";
            const fallbackId = notes.promecOrderId || (rzpOrderId ? `PROMEC-ORD-${rzpOrderId}` : `PROMEC-ORD-${Date.now()}`);

            const amountPaise = Number(payment.amount || fetchedRzpOrder?.amount || 3799900);
            const amountINR = Math.round(amountPaise / 100);

            order = {
              id: fallbackId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              orderStatus: "pending_payment",
              customer: {
                fullName: fallbackName,
                phone: fallbackPhone,
                email: fallbackEmail,
                shippingAddress: fallbackAddress,
                city: fallbackCity,
                state: fallbackState,
                pincode: fallbackPincode,
              },
              items: [
                {
                  productId: "aquaforce-1400",
                  productName: notes.variantName ? `Cordless AquaForce® 1400 (${notes.variantName})` : "Cordless AquaForce® 1400 High-pressure Washer System",
                  variantId: "with-vacuum",
                  variantName: notes.variantName || "With Vacuum",
                  color: notes.color || "Yellow",
                  quantity: 1,
                  unitPriceInINR: amountINR,
                  unitMrpInINR: 44990,
                  totalAmountInINR: amountINR,
                },
              ],
              pricing: {
                subtotalInINR: amountINR,
                discountInINR: 0,
                shippingFeeInINR: 0,
                handlingFeeInINR: 0,
                codFeeInINR: 0,
                finalTotalInINR: amountINR,
                currency: "INR",
              },
              payment: {
                method: (notes.paymentMethod as any) || (amountINR < 10000 ? "COD_ADVANCE" : "FULL_ONLINE"),
                provider: "RAZORPAY",
                status: "pending",
                razorpayOrderId: rzpOrderId,
                amountRequiredInPaise: amountPaise,
                amountPaidInPaise: 0,
                amountDueInPaise: (notes.paymentMethod === "COD_ADVANCE" || amountINR < 10000) ? Math.max(0, 3799900 - amountPaise) : 0,
              },
              fulfillment: {
                status: "pending",
              },
              processedWebhookEvents: [],
            };

            await orderStore.createOrder(order);
            console.log(`[Razorpay Webhook] Successfully auto-reconstructed order ${order.id}.`);
          } catch (recoveryErr: any) {
            console.error("[Razorpay Webhook] Auto-reconstruction failed:", recoveryErr);
          }
        }

        let invoiceResult: { invoiceId: string; invoiceUrl: string } | null = null;
        if (order) {
          invoiceResult = await generateAndSendRazorpayInvoice({
            order,
            paymentId: payment.id,
          });
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
                ...(invoiceResult
                  ? {
                      razorpayInvoiceId: invoiceResult.invoiceId,
                      razorpayInvoiceUrl: invoiceResult.invoiceUrl,
                    }
                  : {}),
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
