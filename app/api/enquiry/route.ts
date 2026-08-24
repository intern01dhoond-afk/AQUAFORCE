import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, companyName, email, quantity, notes } = body;

    if (!fullName || !phone || !companyName || !email || !quantity) {
      return NextResponse.json(
        { error: "Missing required enquiry fields" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    const payload = {
      type: "ENQUIRY",
      timestamp,
      fullName,
      phone,
      companyName,
      email,
      quantity,
      notes: notes || "N/A",
      status: "New Enquiry",
    };

    const webhookUrl = process.env.GOOGLE_SHEET_ENQUIRY_URL;

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.text();
        console.log("Google Sheets Enquiry response:", result);
      } catch (sheetError) {
        console.error("Failed to forward enquiry to Google Sheets:", sheetError);
      }
    } else {
      console.warn("GOOGLE_SHEET_ENQUIRY_URL is not configured in .env.local. Enquiry data logged:", payload);
    }

    return NextResponse.json({ success: true, data: payload });
  } catch (error: any) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
