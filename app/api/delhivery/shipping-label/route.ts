import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const waybill = searchParams.get("waybill") || searchParams.get("wbns");

    if (!waybill) {
      return NextResponse.json(
        { success: false, error: "Missing waybill parameter (e.g. ?waybill=123456789)" },
        { status: 400 }
      );
    }

    const token = process.env.DELHIVERY_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "DELHIVERY_API_TOKEN not configured" },
        { status: 500 }
      );
    }

    // Call Delhivery Packing Slip API
    const res = await fetch(`https://track.delhivery.com/api/p/packing_slip?wbns=${encodeURIComponent(waybill)}`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Delhivery Packing Slip Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch packing slip" },
      { status: 500 }
    );
  }
}
