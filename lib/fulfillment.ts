import { PromecOrder, orderStore } from "./orderStore";
import { createDelhiveryShipment } from "./delhivery";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export interface FulfillmentResult {
  success: boolean;
  skipped?: boolean;
  waybill?: string;
  shipmentId?: string;
  error?: string;
}

export async function executeOrderFulfillment(
  orderId: string
): Promise<FulfillmentResult> {
  const order = await orderStore.getOrderById(orderId);
  if (!order) {
    return { success: false, error: `Order ${orderId} not found.` };
  }

  // Idempotency Mutex Lock
  const lockAcquired = await orderStore.claimFulfillmentLock(orderId);
  if (!lockAcquired) {
    console.log(
      `[Fulfillment] Lock could not be acquired for order ${orderId}. Current status: ${order.fulfillment.status}`
    );
    return {
      success: true,
      skipped: true,
      waybill: order.fulfillment.waybill,
      shipmentId: order.fulfillment.shipmentId,
    };
  }

  console.log(`[Fulfillment] Starting fulfillment pipeline for order ${orderId}...`);

  const isCod = order.payment.method === "COD_ADVANCE";
  const primaryItem = order.items[0] || {
    productName: "Cordless AquaForce 1400",
    color: "Yellow",
    quantity: 1,
  };

  let resolvedWaybill = "";
  let resolvedShipmentId = "";
  let googleSheetSuccess = false;
  let emailSuccess = false;
  let smsSuccess = false;

  // 1. Delhivery Shipment
  try {
    const shipResult = await createDelhiveryShipment({
      orderId: order.id,
      fullName: order.customer.fullName,
      email: order.customer.email,
      phone: order.customer.phone,
      altPhone: order.customer.altPhone,
      deliveryAddress: order.customer.shippingAddress,
      city: order.customer.city,
      state: order.customer.state,
      pincode: order.customer.pincode,
      product: `${primaryItem.productName} (${primaryItem.color})`,
      quantity: primaryItem.quantity,
      amount: order.pricing.finalTotalInINR,
      paymentMode: isCod ? "COD" : "Pre-paid",
      codAmount: isCod ? Math.round(order.payment.amountDueInPaise / 100) : 0,
      advanceAmount: Math.round(order.payment.amountPaidInPaise / 100),
    });

    if (shipResult.success && shipResult.waybill) {
      resolvedWaybill = shipResult.waybill;
      console.log(`[Fulfillment] Delhivery shipment created. Waybill: ${resolvedWaybill}`);
    } else {
      console.warn(`[Fulfillment] Delhivery shipment creation returned error:`, shipResult.error);
    }
  } catch (shipErr: any) {
    console.error("[Fulfillment] Delhivery creation exception:", shipErr.message);
  }

  // 2. Google Sheets Webhook Log
  try {
    const sheetUrl =
      process.env.GOOGLE_SHEET_PURCHASE_URL ||
      "https://script.google.com/macros/s/AKfycbw93k8Td-zP_4HnTq4QTio4KgbFobeXatiTR2BvPPJJczur1RFRggZHq15InxQJBthFAw/exec";

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    const sheetPayload = {
      type: "PURCHASE",
      timestamp,
      orderId: order.id,
      paymentId: order.payment.razorpayPaymentId || "N/A",
      paymentMethod:
        order.payment.method === "COD_ADVANCE"
          ? "10% Cash on Delivery"
          : order.payment.method === "EMI"
          ? "No Cost EMI"
          : "Full Online Payment",
      advanceAmount: Math.round(order.payment.amountPaidInPaise / 100),
      codBalance: Math.round(order.payment.amountDueInPaise / 100),
      waybill: resolvedWaybill || "PENDING",
      delhiveryWaybill: resolvedWaybill || "PENDING",
      fullName: order.customer.fullName,
      email: order.customer.email || "N/A",
      phone: order.customer.phone,
      altPhone: order.customer.altPhone || "N/A",
      deliveryAddress: order.customer.shippingAddress,
      city: order.customer.city,
      state: order.customer.state,
      pincode: order.customer.pincode,
      gstNumber: order.customer.gstNumber || "N/A",
      product: `${primaryItem.productName} (${primaryItem.color})`,
      quantity: primaryItem.quantity,
      amount: order.pricing.finalTotalInINR,
      status: isCod ? "10% Advance Paid - COD Balance Pending" : "Paid & Confirmed",
    };

    const sheetRes = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetPayload),
      redirect: "follow",
    });
    if (sheetRes.ok) {
      googleSheetSuccess = true;
      console.log("[Fulfillment] Google Sheets logged successfully.");
    }
  } catch (sheetErr: any) {
    console.error("[Fulfillment] Google Sheets logging failed:", sheetErr.message);
  }

  // 3. AiSensy WhatsApp Notification
  const aisensyApiKey = process.env.AISENSY_API_KEY;
  const aisensyCampaign = process.env.AISENSY_CAMPAIGN_NAME || "order_confirmation_2";

  if (aisensyApiKey && order.customer.phone) {
    try {
      const cleanPhone = order.customer.phone.replace(/\D/g, "");
      const destination = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 5);
      const estimatedDelivery = deliveryDate.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const fullAddress = `${order.customer.shippingAddress}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`;

      await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: aisensyApiKey,
          campaignName: aisensyCampaign,
          destination,
          userName: order.customer.fullName,
          templateParams: [
            order.customer.fullName,
            `${primaryItem.productName} (${primaryItem.color})`,
            String(primaryItem.quantity),
            order.id,
            fullAddress,
            estimatedDelivery,
          ],
          media: {
            url: "https://files.catbox.moe/jpksbs.png",
            filename: "Promec Tools WhatsApp Template Image.png",
          },
        }),
      });
      console.log("[Fulfillment] AiSensy WhatsApp notification dispatched.");
    } catch (waErr: any) {
      console.error("[Fulfillment] AiSensy WhatsApp failed:", waErr.message);
    }
  }

  // 4. Nodemailer Confirmation Email
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass && order.customer.email) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: Number(process.env.SMTP_PORT || 465) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const formattedAmount = order.pricing.finalTotalInINR.toLocaleString("en-IN");
      const logoPath = path.join(process.cwd(), "public", "images", "promec-badge-logo.png");
      const hasLogo = fs.existsSync(logoPath);
      const attachments: any[] = [];
      if (hasLogo) {
        attachments.push({
          filename: "promec-logo.png",
          path: logoPath,
          cid: "promecLogo",
          contentType: "image/png",
          contentDisposition: "inline",
        });
      }

      const mailOptions = {
        from: `"PROMEC India" <${smtpUser}>`,
        to: order.customer.email,
        subject: `Order Confirmed: ${primaryItem.productName} [#${order.id}]`,
        attachments,
        text: `Dear ${order.customer.fullName},\n\nYour order #${order.id} for ${primaryItem.productName} (₹${formattedAmount}) has been confirmed!\n\nDelivery Address: ${order.customer.shippingAddress}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\nWaybill/Tracking: ${resolvedWaybill || "Processing"}\n\nThank you for choosing PROMEC India.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff;">
            <!-- Brand Logo Header: ONLY PROMEC -->
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #0066cc;">
              ${hasLogo ? `<img src="cid:promecLogo" alt="PROMEC" style="height: 42px; width: auto; max-width: 250px; display: inline-block; border: 0;" />` : `<h1 style="color: #0066cc; margin: 0; font-size: 26px; font-weight: 900; letter-spacing: 1px;">PROMEC</h1>`}
            </div>

            <div style="padding: 24px 0;">
              <h2 style="color: #0f172a; font-size: 20px; margin-top: 0; font-weight: 700;">Order Confirmed #${order.id}</h2>
              <p style="color: #475569; font-size: 14px; line-height: 1.5;">
                Dear <strong>${order.customer.fullName}</strong>,<br/>
                Thank you for purchasing the <strong>PROMEC Aquaforce® 1400 Cordless High-Pressure Washer</strong>. Your order is confirmed and our dispatch team is preparing your package for express delivery.
              </p>

              <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
                <thead>
                  <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1; text-align: left;">
                    <th style="padding: 10px; color: #475569;">Item</th>
                    <th style="padding: 10px; color: #475569; text-align: center;">Qty</th>
                    <th style="padding: 10px; color: #475569; text-align: right;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 12px 10px;">
                      <strong>${primaryItem.productName} (${primaryItem.color})</strong><br/>
                      <span style="color: #64748b; font-size: 12px;">Includes 1-Year Comprehensive Warranty</span>
                    </td>
                    <td style="padding: 12px 10px; text-align: center;">${primaryItem.quantity}</td>
                    <td style="padding: 12px 10px; text-align: right; font-weight: bold;">₹${formattedAmount}</td>
                  </tr>
                  <tr style="border-bottom: 2px solid #cbd5e1; background: #f8fafc;">
                    <td colspan="2" style="padding: 12px 10px; font-weight: bold; text-align: right;">Total Amount:</td>
                    <td style="padding: 12px 10px; text-align: right; font-weight: bold; color: #0066cc; font-size: 16px;">₹${formattedAmount}</td>
                  </tr>
                </tbody>
              </table>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #334155;">
                <strong>📍 Delivery Address:</strong><br/>
                ${order.customer.shippingAddress}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}<br/>
                ${resolvedWaybill ? `<strong style="margin-top: 6px; display: inline-block;">🚚 Delhivery Waybill:</strong> ${resolvedWaybill}` : ""}
              </div>

              <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #1e40af;">
                <strong>Warranty Protection:</strong> 1-Year Pan-India Doorstep Replacement Warranty backed by AMEC Mobility Private Limited.
              </div>

              <div style="text-align: center; margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://promectools.in"}/invoices/${encodeURIComponent(order.id)}" target="_blank" style="display: inline-block; background-color: #2371ec; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 13px; padding: 11px 24px; border-radius: 8px;">
                  📄 View & Download Official Tax Invoice
                </a>
              </div>
            </div>

            <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8;">
              &copy; 2026 AMEC MOBILITY PRIVATE LIMITED • Nagpur, Maharashtra, India<br/>
              Helpline: +91 7387588963 | Email: promec.india@gmail.com
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      emailSuccess = true;
      console.log("[Fulfillment] Confirmation email sent successfully.");
    } catch (emailErr: any) {
      console.error("[Fulfillment] Email sending failed:", emailErr.message);
    }
  }

  // 5. YourBulkSMS
  const smsAuthKey = process.env.YOURBULKSMS_AUTH_KEY;
  if (smsAuthKey && order.customer.phone) {
    try {
      let cleanPhone = order.customer.phone.replace(/\D/g, "");
      if (cleanPhone.length === 10) cleanPhone = `91${cleanPhone}`;
      const senderId = process.env.YOURBULKSMS_SENDER_ID || "PROMCC";
      const route = process.env.YOURBULKSMS_ROUTE || "2";
      const templateId = process.env.YOURBULKSMS_TEMPLATE_ID || "";
      const formattedAmount = order.pricing.finalTotalInINR.toLocaleString("en-IN");

      const message = `Dear ${order.customer.fullName}, your order #${order.id} for ${primaryItem.productName} (Rs.${formattedAmount}) has been confirmed! Thank you for choosing Promec India.`;

      const smsUrl = new URL("http://control.yourbulksms.com/api/sendhttp.php");
      smsUrl.searchParams.append("authkey", smsAuthKey);
      smsUrl.searchParams.append("mobiles", cleanPhone);
      smsUrl.searchParams.append("message", message);
      smsUrl.searchParams.append("sender", senderId);
      smsUrl.searchParams.append("route", route);
      smsUrl.searchParams.append("country", "91");
      if (templateId) smsUrl.searchParams.append("DLT_TE_ID", templateId);

      await fetch(smsUrl.toString(), { method: "GET" });
      smsSuccess = true;
      console.log("[Fulfillment] YourBulkSMS notification sent.");
    } catch (smsErr: any) {
      console.error("[Fulfillment] SMS sending failed:", smsErr.message);
    }
  }

  // 6. Complete Fulfillment in Order Store
  await orderStore.completeFulfillment(orderId, {
    waybill: resolvedWaybill,
    shipmentId: resolvedShipmentId,
    googleSheetSynced: googleSheetSuccess,
    emailSent: emailSuccess,
    smsSent: smsSuccess,
  });

  console.log(`[Fulfillment] Fulfillment pipeline completed for order ${orderId}.`);

  return {
    success: true,
    waybill: resolvedWaybill,
    shipmentId: resolvedShipmentId,
  };
}
