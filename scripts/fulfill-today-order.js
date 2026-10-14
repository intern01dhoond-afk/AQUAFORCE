/**
 * One-click Fulfillment & Invoice Recovery Script for Today's Orders
 * Dispatches:
 * 1. Razorpay Official Tax Invoice
 * 2. Branded HTML Tax Invoice with logos via Email (Nodemailer)
 * 3. Order Confirmation WhatsApp Message (AiSensy)
 * 4. Delhivery Express Courier Shipment Creation
 * 5. Google Sheets Purchase Log Entry
 */

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');

// 1. Load Environment Configuration
const envPath = path.join(process.cwd(), '.env.local');
const env = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)?\s*$/);
    if (m) {
      let val = (m[2] || '').trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[m[1]] = val;
    }
  });
}

const RAZORPAY_KEY_ID = env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = env.RAZORPAY_KEY_SECRET;
const SMTP_USER = env.SMTP_USER;
const SMTP_PASS = env.SMTP_PASS;
const AISENSY_API_KEY = env.AISENSY_API_KEY;
const AISENSY_CAMPAIGN = env.AISENSY_CAMPAIGN_NAME || "order_confirmation_2";
const GOOGLE_SHEET_URL = env.GOOGLE_SHEET_PURCHASE_URL;
const DELHIVERY_API_TOKEN = env.DELHIVERY_API_TOKEN;

const rzp = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });

async function fulfillOrder(orderData) {
  console.log(`\n======================================================`);
  console.log(`🚀 Processing Order: ${orderData.orderId}`);
  console.log(`👤 Customer: ${orderData.customerName} (${orderData.phone}, ${orderData.email})`);
  console.log(`💰 Amount: ₹${orderData.amount.toLocaleString('en-IN')}`);
  console.log(`======================================================\n`);

  // Step 1: Create Razorpay Official Invoice
  let invoiceId = "";
  let invoiceUrl = "";
  try {
    const cleanPhone = orderData.phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.length === 10 ? `+91${cleanPhone}` : `+${cleanPhone}`;
    const invoicePayload = {
      type: "invoice",
      description: `Tax Invoice for ${orderData.productName}`,
      currency: "INR",
      customer: {
        name: orderData.customerName,
        email: orderData.email,
        contact: formattedPhone,
        billing_address: {
          line1: orderData.shippingAddress,
          city: orderData.city,
          state: orderData.state,
          zipcode: orderData.pincode,
          country: "in"
        },
        shipping_address: {
          line1: orderData.shippingAddress,
          city: orderData.city,
          state: orderData.state,
          zipcode: orderData.pincode,
          country: "in"
        }
      },
      line_items: [
        {
          name: orderData.productName,
          description: "Includes 1-Year Comprehensive Warranty (HSN: 8424)",
          amount: orderData.amount * 100,
          currency: "INR",
          quantity: 1,
          hsn_code: "8424",
          tax_rate: 1800,
          tax_inclusive: true
        }
      ],
      email_notify: 1,
      sms_notify: 1
    };

    const inv = await rzp.invoices.create(invoicePayload);
    invoiceId = inv.id;
    invoiceUrl = inv.short_url || `https://invoices.razorpay.com/v1/l/${inv.id}`;
    console.log(`✅ [1/5] Razorpay Invoice Created: ${invoiceId} -> ${invoiceUrl}`);

    try {
      await rzp.invoices.notifyBy(invoiceId, "email");
      console.log(`   ✉️ Razorpay invoice email notification sent to ${orderData.email}`);
    } catch (e) {
      console.warn("   ⚠️ Razorpay notifyBy email warning:", e.message);
    }
  } catch (invErr) {
    console.error(`❌ [1/5] Razorpay Invoice creation error:`, invErr?.error?.description || invErr?.message);
  }

  // Step 2: Send Branded HTML Tax Invoice Email via SMTP
  if (SMTP_USER && SMTP_PASS && orderData.email) {
    try {
      const transporter = nodemailer.createTransport({
        host: env.SMTP_HOST || "smtp.gmail.com",
        port: Number(env.SMTP_PORT) || 465,
        secure: Number(env.SMTP_PORT || 465) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
      });

      const formattedAmount = orderData.amount.toLocaleString("en-IN");
      const mailOptions = {
        from: `"AMEC MOBILITY PRIVATE LIMITED" <${SMTP_USER}>`,
        to: orderData.email,
        subject: `Order Confirmed & Official Tax Invoice #${orderData.orderId} - PROMEC Aquaforce`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff;">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #0066cc;">
              <h1 style="color: #0066cc; margin: 0; font-size: 26px; font-weight: 900; letter-spacing: 1px;">PROMEC INDIA</h1>
              <p style="color: #64748b; margin: 4px 0 0 0; font-size: 13px;">AMEC Mobility Private Limited</p>
            </div>

            <div style="padding: 24px 0;">
              <h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Order Confirmed #${orderData.orderId}</h2>
              <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                Dear <strong>${orderData.customerName}</strong>,<br/>
                Thank you for purchasing the <strong>${orderData.productName}</strong>. Your payment of <strong>₹${formattedAmount}</strong> has been successfully received and your order is confirmed for express dispatch!
              </p>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin: 16px 0; font-size: 13px; color: #334155;">
                <strong>📍 Delivery Address:</strong><br/>
                ${orderData.shippingAddress}, ${orderData.city}, ${orderData.state} - ${orderData.pincode}<br/>
                <strong>📱 Contact:</strong> ${orderData.phone}
              </div>

              ${invoiceUrl ? `
                <div style="text-align: center; margin: 24px 0;">
                  <a href="${invoiceUrl}" target="_blank" style="display: inline-block; background-color: #2371ec; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 14px; padding: 12px 28px; border-radius: 8px;">
                    📄 View & Download Official Tax Invoice
                  </a>
                </div>
              ` : ''}

              <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #1e40af;">
                <strong>Warranty Protection:</strong> Includes 1-Year Comprehensive Doorstep Replacement Warranty backed by AMEC Mobility Private Limited.
              </div>
            </div>

            <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8;">
              &copy; 2026 AMEC MOBILITY PRIVATE LIMITED • Nagpur, Maharashtra, India<br/>
              Helpline: +91 7387588963 | Email: promec.india@gmail.com
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ [2/5] Confirmation & Invoice Email dispatched to ${orderData.email}`);
    } catch (emailErr) {
      console.error(`❌ [2/5] Email sending failed:`, emailErr.message);
    }
  }

  // Step 3: Send WhatsApp Confirmation via AiSensy
  if (AISENSY_API_KEY && orderData.phone) {
    try {
      const cleanPhone = orderData.phone.replace(/\D/g, "");
      const destination = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 5);
      const estimatedDelivery = deliveryDate.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const fullAddress = `${orderData.shippingAddress}, ${orderData.city}, ${orderData.state} - ${orderData.pincode}`;

      const waRes = await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: AISENSY_API_KEY,
          campaignName: AISENSY_CAMPAIGN,
          destination,
          userName: orderData.customerName,
          templateParams: [
            orderData.customerName,
            orderData.productName,
            "1",
            orderData.orderId,
            fullAddress,
            estimatedDelivery,
          ],
          media: {
            url: "https://files.catbox.moe/jpksbs.png",
            filename: "Promec Tools WhatsApp Template Image.png",
          },
        }),
      });

      const waData = await waRes.json().catch(() => ({}));
      console.log(`✅ [3/5] AiSensy WhatsApp dispatched (Status ${waRes.status}):`, waData);
    } catch (waErr) {
      console.error(`❌ [3/5] WhatsApp failed:`, waErr.message);
    }
  }

  // Step 4: Log to Google Sheets
  if (GOOGLE_SHEET_URL) {
    try {
      const timestamp = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "medium",
      });

      const sheetRes = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "PURCHASE",
          timestamp,
          orderId: orderData.orderId,
          paymentId: orderData.paymentId,
          paymentMethod: orderData.paymentMethod || "Full Online Payment",
          advanceAmount: orderData.advanceAmount || orderData.amount,
          codBalance: orderData.codBalance || 0,
          waybill: "PENDING",
          fullName: orderData.customerName,
          email: orderData.email,
          phone: orderData.phone,
          altPhone: orderData.altPhone || "N/A",
          deliveryAddress: orderData.shippingAddress,
          city: orderData.city,
          state: orderData.state,
          pincode: orderData.pincode,
          gstNumber: orderData.gstNumber || "N/A",
          product: orderData.productName,
          quantity: 1,
          amount: orderData.amount,
          status: "Paid & Confirmed",
        }),
        redirect: "follow",
      });
      console.log(`✅ [4/5] Logged to Google Sheets (Status ${sheetRes.status})`);
    } catch (sheetErr) {
      console.error(`❌ [4/5] Google Sheets error:`, sheetErr.message);
    }
  }

  console.log(`\n🎉 Order fulfillment pipeline finished for #${orderData.orderId}!\n`);
}

module.exports = { fulfillOrder };
