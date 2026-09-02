import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, fullName, orderId, paymentId, product, amount, deliveryAddress, city, state, pincode, altPhone } = body;

    if (!email || !fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || "promec.india@gmail.com";
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

    const imagePath = path.join(process.cwd(), "public", "images", "email sticker.png");
    const hasSticker = fs.existsSync(imagePath);

    const fbIconPath = path.join(process.cwd(), "public", "images", "Email icons", "FB.svg");
    const instaIconPath = path.join(process.cwd(), "public", "images", "Email icons", "insta.svg");
    const youtubeIconPath = path.join(process.cwd(), "public", "images", "Email icons", "Youtubr.svg");

    const fbIconSrc = fs.existsSync(fbIconPath)
      ? `data:image/svg+xml;base64,${fs.readFileSync(fbIconPath).toString("base64")}`
      : "";
    const instaIconSrc = fs.existsSync(instaIconPath)
      ? `data:image/svg+xml;base64,${fs.readFileSync(instaIconPath).toString("base64")}`
      : "";
    const youtubeIconSrc = fs.existsSync(youtubeIconPath)
      ? `data:image/svg+xml;base64,${fs.readFileSync(youtubeIconPath).toString("base64")}`
      : "";

    const attachments: any[] = [];
    if (hasSticker) {
      attachments.push({ filename: "email-sticker.png", path: imagePath, cid: "emailSticker" });
    }

    const now = new Date();
    const formattedAmount = Number(amount || 37999).toLocaleString("en-IN");
    const formattedOrderId = orderId || `ORD_TEST_${Date.now().toString().slice(-5)}`;

    const orderDateStr =
      now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }) +
      " " +
      now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });

    const orderDateShort = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      timeZone: "Asia/Kolkata",
    });

    const mailOptions = {
      from: `"PROMEC Care" <${smtpUser}>`,
      to: email,
      subject: `Order Confirmed: ${product || "Aquaforce 1400 PSI Tech"} [#${formattedOrderId}]`,
      attachments,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmed</title>
          <style>
            @media only screen and (max-width: 600px) {
              .email-wrapper { padding: 10px 4px !important; }
              .email-container { padding: 22px 16px !important; border-radius: 18px !important; }
              .hero-sticker { width: 95px !important; max-width: 95px !important; }
              .stat-col {
                display: block !important;
                width: 100% !important;
                border-right: none !important;
                border-bottom: 1px solid #e2e8f0 !important;
                padding: 10px 0 !important;
                box-sizing: border-box !important;
              }
              .stat-col-last {
                border-bottom: none !important;
                padding-bottom: 0 !important;
              }
              .card-col {
                display: block !important;
                width: 100% !important;
                padding: 0 !important;
                margin-bottom: 14px !important;
                box-sizing: border-box !important;
              }
              .card-box { min-height: auto !important; }
              .trust-right-td {
                display: block !important;
                width: 100% !important;
                text-align: center !important;
                margin-top: 10px !important;
              }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 20px 10px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

          <!-- Main Card Container -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="email-wrapper">
            <tr>
              <td align="center">
                
                <div class="email-container" style="max-width: 680px; width: 100%; background-color: #ffffff; border-radius: 24px; padding: 36px 32px; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.04); text-align: left; box-sizing: border-box;">

                  <!-- Top Header Row -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                    <tr>
                      <td width="72" valign="top">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background-color: #10b981; text-align: center; line-height: 60px; color: #ffffff; font-size: 28px; font-weight: bold; box-shadow: 0 4px 14px rgba(16,185,129,0.3);">
                          ✓
                        </div>
                      </td>
                      <td valign="top" style="padding-left: 8px;">
                        <h1 style="margin: 0 0 6px 0; font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">
                          Order Confirmed! 🎉
                        </h1>
                        <p style="margin: 0 0 4px 0; font-size: 14px; color: #475569; font-weight: 500;">
                          Hi <strong>${fullName}</strong>, your payment is verified and your order is confirmed.
                        </p>
                        <p style="margin: 0; font-size: 13px; color: #64748b;">
                          We'll notify you once your order is shipped.
                        </p>
                      </td>
                      <td width="130" align="right" valign="top">
                        ${hasSticker ? `<img src="cid:emailSticker" class="hero-sticker" alt="Aquaforce 1400" style="width: 120px; max-width: 120px; height: auto; display: block;" />` : ""}
                      </td>
                    </tr>
                  </table>

                  <!-- 4 Stat KPI Cards Grid (Desktop 4-col row, Mobile 4-row list with horizontal dividers) -->
                  <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 14px 16px; margin-bottom: 24px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <!-- Stat 1: Order ID -->
                        <td class="stat-col" width="25%" valign="top" style="padding-right: 8px; border-right: 1px solid #e2e8f0;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding-right: 10px;" valign="top">
                                <div style="width: 38px; height: 38px; border-radius: 10px; background-color: #eff6ff; text-align: center; line-height: 38px; font-size: 18px;">📄</div>
                              </td>
                              <td valign="top">
                                <div style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">Order ID</div>
                                <div style="font-size: 12.5px; color: #0f172a; font-weight: 700; word-break: break-all; margin-top: 2px;">${formattedOrderId}</div>
                              </td>
                            </tr>
                          </table>
                        </td>

                        <!-- Stat 2: Order Date -->
                        <td class="stat-col" width="25%" valign="top" style="padding: 0 8px; border-right: 1px solid #e2e8f0;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding-right: 10px;" valign="top">
                                <div style="width: 38px; height: 38px; border-radius: 10px; background-color: #faf5ff; text-align: center; line-height: 38px; font-size: 18px;">📅</div>
                              </td>
                              <td valign="top">
                                <div style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">Order Date</div>
                                <div style="font-size: 12px; color: #0f172a; font-weight: 700; margin-top: 2px;">${orderDateStr}</div>
                              </td>
                            </tr>
                          </table>
                        </td>

                        <!-- Stat 3: Payment Status -->
                        <td class="stat-col" width="25%" valign="top" style="padding: 0 8px; border-right: 1px solid #e2e8f0;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding-right: 10px;" valign="top">
                                <div style="width: 38px; height: 38px; border-radius: 10px; background-color: #ecfdf5; text-align: center; line-height: 38px; font-size: 18px;">💳</div>
                              </td>
                              <td valign="top">
                                <div style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">
                                  Payment Status <span style="background-color: #d1fae5; color: #065f46; font-size: 9.5px; font-weight: 800; padding: 1px 6px; border-radius: 99px; margin-left: 4px;">Paid ✓</span>
                                </div>
                                <div style="font-size: 12.5px; color: #0f172a; font-weight: 700; margin-top: 2px;">₹${formattedAmount}</div>
                              </td>
                            </tr>
                          </table>
                        </td>

                        <!-- Stat 4: Delivery -->
                        <td class="stat-col stat-col-last" width="25%" valign="top" style="padding-left: 8px;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding-right: 10px;" valign="top">
                                <div style="width: 38px; height: 38px; border-radius: 10px; background-color: #fff7ed; text-align: center; line-height: 38px; font-size: 18px;">🚚</div>
                              </td>
                              <td valign="top">
                                <div style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">Delivery</div>
                                <div style="font-size: 12px; color: #0f172a; font-weight: 700; margin-top: 2px;">Expected in 4-6 Days</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Order Tracking Stepper Card -->
                  <div style="background-color: #f8fafc; border: 1px solid #e0f2fe; border-radius: 18px; padding: 22px; margin-bottom: 24px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                      <tr>
                        <td align="left">
                          <strong style="font-size: 16px; color: #0284c7;">Order Tracking</strong>
                        </td>
                        <td align="right">
                          <span style="font-size: 12.5px; color: #16a34a; font-weight: 700;">Expected Delivery: 4-6 Days 📅</span>
                        </td>
                      </tr>
                    </table>

                    <!-- Stepper Steps -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;">
                      <tr>
                        <!-- Step 1: Order Confirmed -->
                        <td width="20%" align="center" valign="top">
                          <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #2563eb; color: #ffffff; text-align: center; line-height: 28px; font-size: 14px; font-weight: bold; margin: 0 auto 8px auto;">✓</div>
                          <div style="font-size: 11.5px; font-weight: 700; color: #0f172a;">Order Confirmed</div>
                          <div style="font-size: 10px; color: #64748b; margin-top: 2px;">${orderDateShort}</div>
                        </td>

                        <!-- Step 2: Payment Verified -->
                        <td width="20%" align="center" valign="top">
                          <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #2563eb; color: #ffffff; text-align: center; line-height: 28px; font-size: 14px; font-weight: bold; margin: 0 auto 8px auto;">✓</div>
                          <div style="font-size: 11.5px; font-weight: 700; color: #0f172a;">Payment Verified</div>
                          <div style="font-size: 10px; color: #64748b; margin-top: 2px;">${orderDateShort}</div>
                        </td>

                        <!-- Step 3: Processing -->
                        <td width="20%" align="center" valign="top">
                          <div style="width: 28px; height: 28px; border-radius: 50%; border: 2px solid #2563eb; background-color: #ffffff; color: #2563eb; text-align: center; line-height: 24px; font-size: 13px; font-weight: bold; margin: 0 auto 8px auto;">📦</div>
                          <div style="font-size: 11.5px; font-weight: 700; color: #2563eb;">Processing</div>
                          <div style="font-size: 10px; color: #2563eb; font-weight: 700; margin-top: 2px;">In Progress</div>
                        </td>

                        <!-- Step 4: Shipped -->
                        <td width="20%" align="center" valign="top">
                          <div style="width: 26px; height: 26px; border-radius: 50%; border: 2px solid #cbd5e1; background-color: #ffffff; margin: 0 auto 8px auto;"></div>
                          <div style="font-size: 11.5px; font-weight: 600; color: #64748b;">Shipped</div>
                          <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">Pending</div>
                        </td>

                        <!-- Step 5: Delivered -->
                        <td width="20%" align="center" valign="top">
                          <div style="width: 26px; height: 26px; border-radius: 50%; border: 2px solid #cbd5e1; background-color: #ffffff; margin: 0 auto 8px auto;"></div>
                          <div style="font-size: 11.5px; font-weight: 600; color: #64748b;">Delivered</div>
                          <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">Pending</div>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- 3 Cards Row (Desktop 3 Columns, Mobile 3 Stacked Cards) -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                    <tr>
                      <!-- Card 1: Product Details -->
                      <td class="card-col" width="33%" valign="top" style="padding-right: 6px;">
                        <div class="card-box" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px; min-height: 165px; box-sizing: border-box;">
                          <div style="font-size: 13px; font-weight: 700; color: #0284c7; margin-bottom: 12px;">
                            📦 Product Details
                          </div>
                          <table border="0" cellspacing="0" cellpadding="0" width="100%" style="margin-bottom: 14px;">
                            <tr>
                              <td valign="top" style="padding-right: 10px;">
                                ${hasSticker ? `<img src="cid:emailSticker" style="width: 48px; height: 48px; border-radius: 8px; object-fit: contain; background: #f8fafc; border: 1px solid #f1f5f9;" />` : ""}
                              </td>
                              <td valign="top">
                                <div style="font-size: 12px; font-weight: 700; color: #0f172a; line-height: 1.3;">${product || "Aquaforce 1400 PSI Tech (Yellow)"}</div>
                                <div style="font-size: 11px; color: #64748b; margin-top: 4px;">
                                  Qty: 1 <span style="font-weight: 700; color: #0f172a; margin-left: 6px;">₹${formattedAmount}</span>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <div style="border-top: 1px solid #f1f5f9; padding-top: 10px; margin-top: 10px;">
                            <a href="#" style="font-size: 12px; font-weight: 700; color: #0284c7; text-decoration: none;">📄 View Invoice &rsaquo;</a>
                          </div>
                        </div>
                      </td>

                      <!-- Card 2: Delivery Address -->
                      <td class="card-col" width="34%" valign="top" style="padding: 0 3px;">
                        <div class="card-box" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px; min-height: 165px; box-sizing: border-box;">
                          <div style="font-size: 13px; font-weight: 700; color: #7c3aed; margin-bottom: 12px;">
                            📍 Delivery Address
                          </div>
                          <div style="font-size: 12px; color: #334155; line-height: 1.45; font-weight: 500;">
                            ${deliveryAddress || ""},<br/>
                            ${city || ""}, ${state || ""} - ${pincode || ""}<br/>
                            India
                            ${altPhone && altPhone !== "N/A" ? `<br/><span style="color: #64748b; font-size: 11px;">Alt: ${altPhone}</span>` : ""}
                          </div>
                          <div style="border-top: 1px solid #f1f5f9; padding-top: 10px; margin-top: 10px;">
                            <a href="#" style="font-size: 12px; font-weight: 700; color: #7c3aed; text-decoration: none;">🗺️ View on Map &rsaquo;</a>
                          </div>
                        </div>
                      </td>

                      <!-- Card 3: Need Help? -->
                      <td class="card-col" width="33%" valign="top" style="padding-left: 6px;">
                        <div class="card-box" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px; min-height: 165px; box-sizing: border-box;">
                          <div style="font-size: 13px; font-weight: 700; color: #059669; margin-bottom: 4px;">
                            🎧 Need Help?
                          </div>
                          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">Our support team is here to help you.</div>
                          <div style="font-size: 11.5px; color: #0f172a; font-weight: 600; margin-bottom: 2px;">📞 9876543210</div>
                          <div style="font-size: 11.5px; color: #0f172a; font-weight: 600;">✉️ care@promec.in</div>
                          <div style="border-top: 1px solid #f1f5f9; padding-top: 10px; margin-top: 10px;">
                            <a href="mailto:care@promec.in" style="font-size: 12px; font-weight: 700; color: #059669; text-decoration: none;">Contact Support &rsaquo;</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Bottom Yellow/Cream Trust Banner -->
                  <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 16px; padding: 14px 20px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding-right: 10px;">
                                <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #fef08a; text-align: center; line-height: 32px; font-size: 16px;">🛡️</div>
                              </td>
                              <td>
                                <div style="font-size: 13px; font-weight: 800; color: #78350f;">Thank you for choosing PROMEC Care!</div>
                                <div style="font-size: 11px; color: #92400e;">We appreciate your trust in us.</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td class="trust-right-td" align="right" style="font-size: 12px; color: #78350f; font-weight: 600;">
                          Follow us &nbsp;
                          <a href="https://www.facebook.com/share/19cRYjSKRA/" target="_blank" style="text-decoration: none; margin-left: 6px; display: inline-block; vertical-align: middle;">
                            <img src="${fbIconSrc}" alt="Facebook" style="width: 22px; height: 22px; display: inline-block; vertical-align: middle;" />
                          </a>
                          <a href="https://www.instagram.com/promec.india?igsi=MXpocDh4NGJyc3F3" target="_blank" style="text-decoration: none; margin-left: 6px; display: inline-block; vertical-align: middle;">
                            <img src="${instaIconSrc}" alt="Instagram" style="width: 22px; height: 22px; display: inline-block; vertical-align: middle;" />
                          </a>
                          <a href="https://youtube.com/@promectools?si=2IvjOZwgD73HWBaP" target="_blank" style="text-decoration: none; margin-left: 6px; display: inline-block; vertical-align: middle;">
                            <img src="${youtubeIconSrc}" alt="YouTube" style="width: 22px; height: 22px; display: inline-block; vertical-align: middle;" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>

                </div>

              </td>
            </tr>
          </table>

        </body>
        </html>
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
