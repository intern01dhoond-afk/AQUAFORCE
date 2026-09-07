import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otpStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, otp } = body;

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, error: "Phone number and OTP are required" },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/\D/g, "").slice(-10);
    const result = verifyOtp(cleanPhone, String(otp));

    if (!result.valid) {
      return NextResponse.json(
        { success: false, error: result.error || "Invalid OTP" },
        { status: 400 }
      );
    }

    // Automatically record verified signup lead into the Signups Google Sheet
    const signupsSheetUrl =
      process.env.GOOGLE_SHEET_SIGNUPS_URL ||
      "https://script.google.com/macros/s/AKfycbzZX776z13tAYJY9KjTxNqcGt5WajxAfOg9uI86LDagVlTPnILyYjC7fIOlwzc1jrajaQ/exec";

    if (signupsSheetUrl) {
      fetch(signupsSheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          fullName: result.fullName || "Customer",
          phone: cleanPhone,
          source: "Website Buy Now (OTP Verified)",
          status: "Verified Lead",
        }),
      }).catch((err) => console.error("Failed to log verified signup to Google Sheets:", err));
    }

    return NextResponse.json({
      success: true,
      verified: true,
      phone: cleanPhone,
      fullName: result.fullName || "",
      message: "Mobile number verified successfully!",
    });
  } catch (error: any) {
    console.error("Error in /api/otp/verify:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
