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

    const authKey = process.env.YOURBULKSMS_AUTH_KEY || "";
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
        // When country=91 is specified, pass the 10-digit local number to prevent double 9191... country prefixing
        url.searchParams.append("mobiles", cleanPhone);
        url.searchParams.append("message", message);
        url.searchParams.append("sender", senderId);
        url.searchParams.append("route", route);
        url.searchParams.append("country", "91");
        if (templateId) {
          url.searchParams.append("DLT_TE_ID", templateId);
        }

        const res = await fetch(url.toString(), { method: "GET" });
        const resData = await res.text();
        console.log(`YourBulkSMS OTP sent to ${cleanPhone}:`, resData);

        // Accurately parse YourBulkSMS response instead of relying only on HTTP 200 res.ok
        try {
          const parsed = JSON.parse(resData);
          if (parsed.Status === "Success" || parsed.Code === "000") {
            smsDelivered = true;
          } else {
            smsError = parsed.Description || parsed.Status || resData;
            console.warn(`YourBulkSMS reported failure:`, smsError);
          }
        } catch {
          if (
            (resData.includes("success") || resData.includes("Success") || resData.includes("000")) &&
            !resData.toLowerCase().includes("fail") &&
            !resData.toLowerCase().includes("error")
          ) {
            smsDelivered = true;
          } else {
            smsError = resData;
          }
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
      message: smsError
        ? "SMS service is experiencing network delays."
        : "Verification code sent successfully to your mobile number.",
      token,
      smsDelivered,
      // Include devOtp if in non-production or if SMS delivery encountered an error
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
