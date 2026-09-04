import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      orderId,
      paymentId,
      fullName,
      email,
      phone,
      altPhone,
      deliveryAddress,
      city,
      state,
      pincode,
      gstNumber,
      product,
      quantity,
      amount,
      status,
      paymentMethod,
      advanceAmount,
      codBalance,
      waybill,
    } = body;

    if (!fullName || !phone || !deliveryAddress || !city || !state || !pincode) {
      return NextResponse.json(
        { error: "Missing required order checkout fields" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    const isCodOrder = paymentMethod === "10_PERCENT_COD" || Number(codBalance) > 0;
    const resolvedStatus = status || (isCodOrder ? "10% Advance Paid - COD Balance Pending" : "Paid & Confirmed");

    const payload = {
      type: "PURCHASE",
      timestamp,
      orderId: orderId || `ORD_${Date.now()}`,
      paymentId: paymentId || "PENDING",
      paymentMethod: paymentMethod || (isCodOrder ? "10% Cash on Delivery" : "Full Online Payment"),
      advanceAmount: Number(advanceAmount) || (isCodOrder ? Math.round(Number(amount) * 0.1) : Number(amount)),
      codBalance: isCodOrder ? (Number(codBalance) || Math.round(Number(amount) * 0.9)) : 0,
      delhiveryWaybill: waybill || "AUTO_GENERATED",
      fullName,
      email: email || "N/A",
      phone,
      altPhone: altPhone || "N/A",
      deliveryAddress,
      city,
      state,
      pincode,
      gstNumber: gstNumber || "N/A",
      product: product || "Aquaforce 1400",
      quantity: Number(quantity) || 1,
      amount: Number(amount) || 37999,
      status: resolvedStatus,
    };

    const webhookUrl = process.env.GOOGLE_SHEET_PURCHASE_URL;

    if (webhookUrl) {
      try {
        const sheetRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          redirect: "follow",
        });
        const text = await sheetRes.text();
        console.log("Google Sheets Purchase logged successfully:", text);
      } catch (sheetError) {
        console.error("Failed to forward purchase to Google Sheets:", sheetError);
      }
    } else {
      console.warn("GOOGLE_SHEET_PURCHASE_URL is not configured in .env.local. Purchase data logged:", payload);
    }

    // AiSensy WhatsApp Notification Trigger
    const aisensyApiKey = process.env.AISENSY_API_KEY;
    const aisensyCampaign = process.env.AISENSY_CAMPAIGN_NAME || "order_confirmation";

    if (aisensyApiKey && phone) {
      const formattedPhone = phone.replace(/\D/g, "");
      const destination = formattedPhone.length === 10 ? `91${formattedPhone}` : formattedPhone;

      fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: aisensyApiKey,
          campaignName: aisensyCampaign,
          destination: destination,
          userName: fullName,
          templateParams: [
            fullName,
            payload.product,
            payload.amount.toLocaleString("en-IN"),
            payload.orderId,
          ],
        }),
      })
        .then(async (res) => {
          const resText = await res.text();
          console.log("AiSensy WhatsApp notification response:", res.status, resText);
        })
        .catch((aiErr) => {
          console.error("Failed to send AiSensy WhatsApp notification:", aiErr);
        });
    }

    return NextResponse.json({ success: true, data: payload });
  } catch (error: any) {
    console.error("Purchase API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process purchase record" },
      { status: 500 }
    );
  }
}
