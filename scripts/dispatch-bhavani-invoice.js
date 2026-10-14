const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');

const dotenv = fs.readFileSync('.env.local', 'utf8');
const env = {};
dotenv.split(/\r?\n/).forEach(line => {
  const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)?\s*$/);
  if (m) {
    let val = (m[2] || '').trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[m[1]] = val;
  }
});

const rzp = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

async function dispatchInvoice() {
  console.log("Generating Official Invoice for Bhavani Balakrishnan...");

  const customerName = "Bhavani Balakrishnan";
  const customerEmail = "bhavanibalakrishnan36@gmail.com";
  const customerPhone = "+918089011625";
  const shippingAddress = "Ernakulam";
  const city = "Ernakulam";
  const state = "Kerala";
  const pincode = "682036";
  const orderId = "PROMEC-ORD-1791958704699-MGZ7";
  const paymentId = "pay_TngdDSss1WVqJQ";
  const waybill = "64729710000346";
  const amountInPaise = 3799900;
  const amountInINR = 37999;
  const productName = "Cordless AquaForce® 1400 High-pressure Washer System (With Vacuum, Yellow)";

  // 1. Create Razorpay Tax Invoice
  let invoiceId = "";
  let invoiceUrl = "";
  try {
    const invoicePayload = {
      type: "invoice",
      description: `Tax Invoice for ${productName}`,
      currency: "INR",
      customer: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone,
        billing_address: {
          line1: shippingAddress,
          city: city,
          state: state,
          zipcode: pincode,
          country: "in"
        },
        shipping_address: {
          line1: shippingAddress,
          city: city,
          state: state,
          zipcode: pincode,
          country: "in"
        }
      },
      line_items: [
        {
          name: productName,
          description: `Includes 1-Year Comprehensive Warranty & Express Delhivery Shipping (HSN: 8424 | IGST @ 18% to ${state})`,
          amount: amountInPaise,
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
    console.log(`✅ [1/3] Razorpay Invoice created: ${invoiceId} -> ${invoiceUrl}`);

    try {
      await rzp.invoices.notifyBy(invoiceId, "email");
      console.log(`   ✉️ Razorpay invoice email notification sent to ${customerEmail}`);
    } catch (e) {
      console.warn("   ⚠️ Razorpay notifyBy email warning:", e.message);
    }

    try {
      await rzp.invoices.notifyBy(invoiceId, "sms");
      console.log(`   📱 Razorpay invoice SMS notification sent to ${customerPhone}`);
    } catch (e) {
      console.warn("   ⚠️ Razorpay notifyBy sms warning:", e.message);
    }
  } catch (err) {
    console.error("❌ Razorpay invoice creation error:", err?.error?.description || err?.message || err);
  }

  // 2. Direct Branded Tax Invoice Email from promec.india@gmail.com
  const smtpUser = env.SMTP_USER;
  const smtpPass = env.SMTP_PASS;
  if (smtpUser && smtpPass && customerEmail) {
    try {
      const transporter = nodemailer.createTransport({
        host: env.SMTP_HOST || "smtp.gmail.com",
        port: Number(env.SMTP_PORT) || 465,
        secure: Number(env.SMTP_PORT || 465) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const taxableBase = Math.round((amountInINR / 1.18) * 100) / 100;
      const igst = Math.round((amountInINR - taxableBase) * 100) / 100;

      const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; color: #1e293b;">
          <!-- Header -->
          <div style="border-bottom: 2px solid #0066cc; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h1 style="color: #0066cc; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.5px;">AMEC MOBILITY PRIVATE LIMITED</h1>
              <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">Plot No. 5A, 3rd Floor, Nagpur MIDC Hingna, Beside Jaika Tata Motors, Nagpur, MH 440016</p>
              <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">GSTIN: 27AATCA7023G1ZQ | State: Maharashtra (27)</p>
            </div>
          </div>

          <div style="padding: 24px 0 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
              <div>
                <span style="display: inline-block; background: #dcfce7; color: #166534; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">TAX INVOICE &bull; PAID</span>
                <h2 style="font-size: 18px; color: #0f172a; margin: 8px 0 4px; font-weight: 700;">Invoice #${invoiceId || 'INV-' + orderId.slice(-6)}</h2>
                <p style="margin: 0; font-size: 13px; color: #64748b;">Date: Oct 14, 2026 &bull; Order ID: #${orderId}</p>
                <p style="margin: 2px 0 0; font-size: 13px; color: #64748b;">Payment ID: ${paymentId}</p>
              </div>
            </div>

            <!-- Customer Details -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 20px; font-size: 13px;">
              <strong style="color: #0f172a;">Billed & Shipped To:</strong><br/>
              <strong>${customerName}</strong><br/>
              ${shippingAddress}, ${city}, ${state} - ${pincode}<br/>
              Phone: ${customerPhone} &bull; Email: ${customerEmail}<br/>
              <span style="color: #0066cc; font-weight: bold; margin-top: 4px; display: inline-block;">🚚 Delhivery Waybill / Tracking No: ${waybill}</span>
            </div>

            <!-- Itemized Table -->
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
              <thead>
                <tr style="background: #f1f5f9; border-bottom: 1px solid #cbd5e1; text-align: left;">
                  <th style="padding: 10px; color: #475569;">Item Description</th>
                  <th style="padding: 10px; color: #475569; text-align: center;">HSN</th>
                  <th style="padding: 10px; color: #475569; text-align: center;">Qty</th>
                  <th style="padding: 10px; color: #475569; text-align: right;">Rate (₹)</th>
                  <th style="padding: 10px; color: #475569; text-align: right;">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 10px;">
                    <strong>${productName}</strong><br/>
                    <span style="font-size: 11px; color: #64748b;">Includes 1-Year Pan-India Doorstep Replacement Warranty</span>
                  </td>
                  <td style="padding: 12px 10px; text-align: center;">8424</td>
                  <td style="padding: 12px 10px; text-align: center;">1</td>
                  <td style="padding: 12px 10px; text-align: right;">₹${taxableBase.toLocaleString('en-IN')}</td>
                  <td style="padding: 12px 10px; text-align: right;">₹${taxableBase.toLocaleString('en-IN')}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0; background: #fafafa;">
                  <td colspan="4" style="padding: 8px 10px; text-align: right; color: #64748b;">Taxable Base Value:</td>
                  <td style="padding: 8px 10px; text-align: right;">₹${taxableBase.toLocaleString('en-IN')}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0; background: #fafafa;">
                  <td colspan="4" style="padding: 8px 10px; text-align: right; color: #64748b;">Integrated GST (IGST @ 18%):</td>
                  <td style="padding: 8px 10px; text-align: right;">₹${igst.toLocaleString('en-IN')}</td>
                </tr>
                <tr style="border-top: 2px solid #0066cc; background: #f8fafc; font-weight: bold;">
                  <td colspan="4" style="padding: 12px 10px; text-align: right; font-size: 14px; color: #0f172a;">Total Invoice Value:</td>
                  <td style="padding: 12px 10px; text-align: right; font-size: 15px; color: #0066cc;">₹${amountInINR.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>

            <!-- View Invoice CTA Button -->
            ${invoiceUrl ? `
              <div style="text-align: center; margin: 24px 0 16px;">
                <a href="${invoiceUrl}" target="_blank" style="display: inline-block; background-color: #2371ec; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 8px;">
                  📄 View & Download Official Razorpay Tax Invoice
                </a>
              </div>
            ` : ''}

            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px; font-size: 12px; color: #1e40af; line-height: 1.5;">
              <strong>1-Year Warranty Protection:</strong> This order includes 1-Year Comprehensive Replacement Warranty. For technical support, contact +91 7387588963 or email promec.india@gmail.com.
            </div>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center; font-size: 11px; color: #94a3b8;">
            AMEC MOBILITY PRIVATE LIMITED &bull; CIN: U29309MH2023PTC414841<br/>
            Registered Office: Nagpur, Maharashtra, India | Support: +91 7387588963
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"AMEC MOBILITY PRIVATE LIMITED" <${smtpUser}>`,
        to: customerEmail,
        subject: `Official Tax Invoice & Order Confirmation #${orderId} - PROMEC India`,
        html: html,
      });

      console.log(`✅ [2/3] Branded Tax Invoice Email sent directly to ${customerEmail}`);
    } catch (mailErr) {
      console.error("❌ Failed sending direct invoice email:", mailErr);
    }
  }

  console.log("\n🎉 Invoice dispatch pipeline completed successfully!");
}

dispatchInvoice();
