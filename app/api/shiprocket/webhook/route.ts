import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let payload: any = {};
    try {
      payload = await req.json();
    } catch {
      // Empty or urlencoded payload
    }

    console.log("Delhivery Webhook Received:", JSON.stringify(payload, null, 2));

    const waybill = payload?.Waybill || payload?.waybill;
    const currentStatus = payload?.Status?.Status || payload?.status;
    const orderId = payload?.ReferenceNo || payload?.order_id;

    if (waybill || orderId) {
      console.log(
        `Delhivery Webhook Event -> Order: ${orderId}, Waybill: ${waybill}, Status: ${currentStatus}`
      );
    }

    return NextResponse.json({
      status: "ok",
      received: true,
      service: "Delhivery Webhook Listener for Promec India",
    });
  } catch (error: any) {
    console.error("Delhivery Webhook Error:", error);
    return NextResponse.json({ status: "ok" });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Delhivery Webhook Endpoint",
  });
}
