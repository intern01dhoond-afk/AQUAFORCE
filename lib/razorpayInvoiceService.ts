import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import Razorpay from "razorpay";
import { PromecOrder, orderStore } from "./orderStore";
import { isMaharashtraState, getInvoiceNumber, convertOrderToInvoiceDetails } from "./invoiceUtils";
import { generateInvoiceEmailHtml } from "./invoiceEmailTemplate";

/**
 * Service to generate an official GST-compliant Invoice in Razorpay
 * and dispatch it directly to the customer via Email & SMS through Razorpay.
 */
export async function generateAndSendRazorpayInvoice({
  order,
  paymentId,
}: {
  order: PromecOrder;
  paymentId?: string;
}): Promise<{ invoiceId: string; invoiceUrl: string } | null> {
  const key_id = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim();
  const key_secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();

  if (!key_id || !key_secret) {
    console.error("[Razorpay Invoice] Credentials missing on server.");
    return null;
  }

  const razorpay = new Razorpay({
    key_id,
    key_secret,
  });

  try {
    const custName = order.customer?.fullName?.trim() || "";
    const custEmail = order.customer?.email?.trim() || "";
    const cleanPhone = (order.customer?.phone || "").replace(/\D/g, "");
    const formattedPhone = cleanPhone.length === 10 ? `+91${cleanPhone}` : cleanPhone ? `+${cleanPhone}` : "";
    const state = order.customer?.state?.trim() || "";
    const isMH = isMaharashtraState(state);

    const invoiceNumber = getInvoiceNumber(order.id, order.payment?.razorpayInvoiceId);
    // Invoice the full order value. amountRequiredInPaise can be only the COD
    // advance, so it is not a safe source for the invoice total.
    const orderTotalInINR = Number(order.pricing?.finalTotalInINR || order.pricing?.subtotalInINR);
    if (!Number.isFinite(orderTotalInINR) || orderTotalInINR <= 0) {
      console.error(`[Razorpay Invoice] Invalid order total for ${order.id}; refusing to create a guessed invoice.`);
      return null;
    }
    const amountInPaise = Math.round(orderTotalInINR * 100);
    const resolvedPaymentId = paymentId || order.payment?.razorpayPaymentId;

    const primaryItem = (order.items && order.items[0]) || {
      productName: "Cordless AquaForce® 1400 High-pressure Washer System (R)",
      quantity: 1,
    };

    const taxDescription = isMH
      ? "Includes 1-Year Comprehensive Warranty & Free Express Delivery (HSN: 8424 | CGST @ 9% + SGST @ 9%)"
      : `Includes 1-Year Comprehensive Warranty & Free Express Delivery (HSN: 8424 | IGST @ 18% to ${state})`;

    const fullStreetAddress = order.customer?.shippingAddress?.trim() || "";
    if (!custName || !order.customer?.phone?.trim() || !fullStreetAddress || !order.customer?.city?.trim() || !state || !order.customer?.pincode?.trim()) {
      console.error(`[Razorpay Invoice] Incomplete customer details for ${order.id}; refusing to create an invoice with guessed details.`);
      return null;
    }
    let line1 = fullStreetAddress;
    let line2 = "";
    if (fullStreetAddress.length > 50) {
      const commaIdx = fullStreetAddress.indexOf(",", 30);
      if (commaIdx !== -1 && commaIdx < 80) {
        line1 = fullStreetAddress.substring(0, commaIdx).trim();
        line2 = fullStreetAddress.substring(commaIdx + 1).trim();
      } else {
        line1 = fullStreetAddress.substring(0, 50).trim();
        line2 = fullStreetAddress.substring(50).trim();
      }
    }

    // Construct Razorpay Invoice Creation Payload
    const invoicePayload: any = {
      type: "invoice",
      invoice_number: invoiceNumber,
      description: `Invoice to ${custName} for ${primaryItem.productName}`,
      currency: "INR",
      // Keep customer details on the invoice itself. Reusing a Razorpay
      // customer_id can cause Razorpay to print an old saved address/contact
      // instead of the values from this specific order.
      customer: {
        name: custName,
        ...(custEmail ? { email: custEmail } : {}),
        contact: formattedPhone,
        ...(order.customer?.gstNumber ? { gstin: order.customer.gstNumber } : {}),
        billing_address: {
          line1: line1.slice(0, 100),
          ...(line2 ? { line2: line2.slice(0, 100) } : {}),
          city: order.customer.city,
          state,
          zipcode: order.customer.pincode,
          country: "in",
        },
        shipping_address: {
          line1: line1.slice(0, 100),
          ...(line2 ? { line2: line2.slice(0, 100) } : {}),
          city: order.customer.city,
          state,
          zipcode: order.customer.pincode,
          country: "in",
        },
      },
      line_items: [
        {
          name: primaryItem.productName || "Cordless AquaForce® 1400 High-pressure Washer System (R)",
          description: taxDescription,
          amount: amountInPaise,
          currency: "INR",
          quantity: primaryItem.quantity || 1,
          hsn_code: "8424",
          tax_rate: 1800, // 18% GST (in basis points)
          tax_inclusive: true, // Amount is tax inclusive, Razorpay auto-breaks down taxes based on Place of Supply!
        },
      ],
      // Tells Razorpay to automatically send the Invoice email & SMS to customer
      email_notify: custEmail ? 1 : 0,
      sms_notify: formattedPhone ? 1 : 0,
    };

    console.log(`[Razorpay Invoice] Creating invoice ${invoiceNumber} for order ${order.id} (State: ${state}, isMH: ${isMH})...`);
    let invoiceId = "";
    let invoiceUrl = "";

    try {
      const invoice: any = await (razorpay.invoices as any).create(invoicePayload);
      if (invoice?.id) {
        invoiceId = invoice.id;
        invoiceUrl = invoice.short_url || `https://invoices.razorpay.com/v1/l/${invoice.id}`;
        console.log(`[Razorpay Invoice] Successfully generated Razorpay Invoice: ${invoiceId} (URL: ${invoiceUrl})`);

        // Dispatch explicit notifications via Razorpay's notifyBy endpoints
        if (custEmail) {
          try {
            await (razorpay.invoices as any).notifyBy(invoiceId, "email");
            console.log(`[Razorpay Invoice] Dispatched invoice email to ${custEmail} via Razorpay`);
          } catch (emailErr: any) {
            console.warn("[Razorpay Invoice] notifyBy email warning:", emailErr?.message || emailErr);
          }
        }

        if (formattedPhone) {
          try {
            await (razorpay.invoices as any).notifyBy(invoiceId, "sms");
            console.log(`[Razorpay Invoice] Dispatched invoice SMS to ${formattedPhone} via Razorpay`);
          } catch (smsErr: any) {
            console.warn("[Razorpay Invoice] notifyBy sms warning:", smsErr?.message || smsErr);
          }
        }
      }
    } catch (rzpInvErr: any) {
      console.warn("[Razorpay Invoice] Razorpay invoice API warning:", rzpInvErr?.error?.description || rzpInvErr?.message || rzpInvErr);
    }

    // Direct Dispatch: Always send the branded official Tax Invoice directly to customer's inbox via Nodemailer
    if (custEmail) {
      try {
        const smtpUser = (process.env.SMTP_USER || "").trim();
        const smtpPass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
        if (smtpUser && smtpPass) {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 465,
            secure: Number(process.env.SMTP_PORT || 465) === 465,
            auth: { user: smtpUser, pass: smtpPass },
            connectionTimeout: 5000,
            greetingTimeout: 5000,
            socketTimeout: 5000,
          });
          const invoiceDetails = convertOrderToInvoiceDetails(order);
          const html = generateInvoiceEmailHtml({ invoice: invoiceDetails });
          const amecLogoPath = path.join(process.cwd(), "public", "images", "amec-shield-logo-email.png");
          const rzpLogoPath = path.join(process.cwd(), "public", "images", "razorpay-logo.png");
          const attachments: any[] = [];
          if (fs.existsSync(amecLogoPath)) {
            attachments.push({ filename: "amec-shield-logo.png", path: amecLogoPath, cid: "amecShieldLogo" });
          }
          if (fs.existsSync(rzpLogoPath)) {
            attachments.push({ filename: "razorpay-logo.png", path: rzpLogoPath, cid: "razorpayLogo" });
          }
          await transporter.sendMail({
            from: `"AMEC MOBILITY PRIVATE LIMITED" <${smtpUser}>`,
            to: custEmail,
            subject: `Tax Invoice #${invoiceDetails.invoiceNumber} - AMEC MOBILITY PRIVATE LIMITED`,
            html,
            attachments,
          });
          console.log(`[Razorpay Invoice] Dispatched pixel-perfect invoice email directly to ${custEmail}`);
        }
      } catch (directMailErr: any) {
        console.warn("[Razorpay Invoice] Direct email dispatch warning:", directMailErr?.message || directMailErr);
      }
    }

    // Record invoice details on internal order if generated
    if (invoiceId) {
      await orderStore.updateOrder(order.id, {
        payment: {
          ...order.payment,
          razorpayInvoiceId: invoiceId,
          razorpayInvoiceUrl: invoiceUrl,
        },
      });

      return {
        invoiceId,
        invoiceUrl,
      };
    }

    return null;
  } catch (err: any) {
    console.error("[Razorpay Invoice] Error generating invoice with Razorpay:", err?.message || err);
    return null;
  }
}
