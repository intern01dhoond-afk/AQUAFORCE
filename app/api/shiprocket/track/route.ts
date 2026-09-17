import { NextResponse } from "next/server";
import { getShiprocketToken } from "@/lib/shiprocket";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const shipmentId = searchParams.get("shipment_id") || searchParams.get("id");
    const awb = searchParams.get("awb") || searchParams.get("waybill");

    if (!shipmentId && !awb) {
      return NextResponse.json(
        { success: false, error: "Either shipment_id or awb parameter is required" },
        { status: 400 }
      );
    }

    const token = await getShiprocketToken();
    const endpoint = awb
      ? `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awb}`
      : `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`;

    const res = await fetch(endpoint, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (res.ok && data) {
      return NextResponse.json({
        success: true,
        tracking: data,
      });
    }

    return NextResponse.json(
      { success: false, error: data.message || "Failed to fetch tracking info" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Shiprocket Tracking Endpoint Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Tracking request failed" },
      { status: 500 }
    );
  }
}
