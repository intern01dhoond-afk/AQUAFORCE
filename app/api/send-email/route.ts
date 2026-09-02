import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, fullName, orderId, paymentId, product, amount, deliveryAddress, city, state, pincode, altPhone } = body;

    if (!email || !fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          success: false,
          message: "SMTP_USER or SMTP_PASS not set in .env.local",
        },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"AQUAFORCE Care" <${smtpUser}>`,
      to: email,
      subject: `Order Confirmed: ${product || "Aquaforce 1400"} [#${orderId || "CONFIRMED"}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; rounded: 16px;">
          <h2 style="color: #0066cc; margin-top: 0;">Order Confirmed!</h2>
          <p>Thank you, <strong>${fullName}</strong>. Your payment has been verified and your order is confirmed.</p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Product:</strong> ${product || "Aquaforce 1400 PSI Tech"}</p>
            <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ₹${Number(amount || 37999).toLocaleString("en-IN")}</p>
            <p style="margin: 4px 0;"><strong>Order ID:</strong> ${orderId || "N/A"}</p>
            <p style="margin: 4px 0;"><strong>Payment ID:</strong> ${paymentId || "N/A"}</p>
            ${altPhone && altPhone !== "N/A" ? `<p style="margin: 4px 0;"><strong>Alt. Contact:</strong> ${altPhone}</p>` : ""}
            <p style="margin: 4px 0;"><strong>Delivery Address:</strong> ${deliveryAddress || ""}, ${city || ""}, ${state || ""} - ${pincode || ""}</p>
          </div>
          <p style="color: #16a34a; font-weight: bold;">🚚 Free Express Delivery (Expected in 4-6 Days)</p>
          <p style="font-size: 12px; color: #64748b; margin-top: 24px;">Order updates sequence: 1st on Text, then Email, then WhatsApp.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
