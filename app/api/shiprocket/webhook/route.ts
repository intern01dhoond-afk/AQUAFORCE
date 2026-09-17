import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let payload: any = {};
    try {
      payload = await req.json();
    } catch {
      // Empty or urlencoded payload
    }

    console.log("Shiprocket Webhook Received:", JSON.stringify(payload, null, 2));

    const orderId = payload?.order_id || payload?.channel_order_id;
    const awb = payload?.awb || payload?.awb_code;
    const currentStatus = payload?.current_status || payload?.status;

    if (orderId || awb) {
      console.log(
        `Shiprocket Webhook Event -> Order: ${orderId}, AWB: ${awb}, Status: ${currentStatus}`
      );
    }

    return NextResponse.json({
      status: "ok",
      received: true,
      service: "Shiprocket Webhook Listener for Promec India",
    });
  } catch (error: any) {
    console.error("Shiprocket Webhook Error:", error);
    return NextResponse.json({ status: "ok" });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Shiprocket Webhook Endpoint",
  });
}
