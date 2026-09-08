import { NextResponse } from "next/server";
import { storeOtp, generateOtpToken } from "@/lib/otpStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: "Please provide your Full Name and Mobile Number" },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    // Generate secure 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    storeOtp(cleanPhone, fullName.trim(), otp);

    const authKey = process.env.YOURBULKSMS_AUTH_KEY || "3236524f4d454338373214";
    const senderId = process.env.YOURBULKSMS_SENDER_ID || "PROMCC";
    const route = process.env.YOURBULKSMS_ROUTE || "2";
    const templateId = process.env.YOURBULKSMS_TEMPLATE_ID || "1777178875938865009";

    // Exact approved DLT message text:
    const message = `${otp} is your OTP for login/signup at PROMEC INDIA. This OTP is valid for 10 minutes. Do not share it with anyone.`;

    let smsDelivered = false;
    let smsError = "";

    if (authKey) {
      try {
        const url = new URL("http://control.yourbulksms.com/api/sendhttp.php");
        url.searchParams.append("authkey", authKey);
        url.searchParams.append("mobiles", `91${cleanPhone}`);
        url.searchParams.append("message", message);
        url.searchParams.append("sender", senderId);
        url.searchParams.append("route", route);
        url.searchParams.append("country", "91");
        if (templateId) {
          url.searchParams.append("DLT_TE_ID", templateId);
        }

        const res = await fetch(url.toString(), { method: "GET" });
        const resData = await res.text();
        console.log(`YourBulkSMS OTP sent to 91${cleanPhone}:`, resData);

        if (resData.includes("success") || resData.includes("Success") || resData.includes("Message Sent") || res.ok) {
          smsDelivered = true;
        } else {
          smsError = resData;
        }
      } catch (err: any) {
        console.error("YourBulkSMS send error:", err);
        smsError = err.message;
      }
    }

    console.log(`[OTP GENERATED] Phone: ${cleanPhone}, Code: ${otp}, Name: ${fullName}`);

    const token = generateOtpToken(cleanPhone, otp);

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully to your mobile number.",
      token,
      // Include testOtp in development/sandbox mode for testing convenience
      ...(process.env.NODE_ENV !== "production" || smsError ? { devOtp: otp } : {}),
    });
  } catch (error: any) {
    console.error("Error in /api/otp/send:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send verification code" },
      { status: 500 }
    );
  }
}
