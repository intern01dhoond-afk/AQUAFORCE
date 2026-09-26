import { NextResponse } from "next/server";

const DELHIVERY_API_TOKEN = process.env.DELHIVERY_API_TOKEN || "896739f8bbc9a0d080336cd9504af9fd22c324a3";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const waybill = searchParams.get("awb") || searchParams.get("waybill") || searchParams.get("shipment_id") || searchParams.get("id");

    if (!waybill) {
      return NextResponse.json(
        { success: false, error: "waybill or awb parameter is required" },
        { status: 400 }
      );
    }

    const url = `https://track.delhivery.com/api/v1/packages/json/?waybill=${waybill}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Token ${DELHIVERY_API_TOKEN}` },
    });

    const data = await res.json();

    if (res.ok && data) {
      return NextResponse.json({
        success: true,
        tracking: data,
      });
    }

    return NextResponse.json(
      { success: false, error: data?.Error || "Failed to fetch tracking info" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Delhivery Tracking Endpoint Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Tracking request failed" },
      { status: 500 }
    );
  }
}
