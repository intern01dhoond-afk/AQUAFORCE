import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log("Delhivery Webhook Received:", JSON.stringify(payload, null, 2));

    const shipment = payload?.Shipment || payload;
    const awb = shipment?.AWB || shipment?.waybill || shipment?.wbn;
    const orderId = shipment?.Order || shipment?.order_id;
    const status = shipment?.Status?.Status || shipment?.status || "UPDATED";
    const statusType = shipment?.Status?.StatusType || "";

    console.log(`Delhivery Status Update -> AWB: ${awb}, Order: ${orderId}, Status: ${status} (${statusType})`);

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully",
      awb,
      status,
    });
  } catch (error: any) {
    console.error("Delhivery Webhook Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process webhook" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    service: "Delhivery Webhook Listener for Promec India",
    timestamp: new Date().toISOString(),
  });
}
