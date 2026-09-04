import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const waybill = searchParams.get("waybill");
    const orderId = searchParams.get("orderId");

    const queryKey = waybill ? `waybill=${waybill}` : orderId ? `ref_ids=${orderId}` : null;
    if (!queryKey) {
      return NextResponse.json(
        { success: false, error: "Please provide a waybill or orderId to track" },
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

    const url = `https://track.delhivery.com/api/v1/packages/json/?${queryKey}&token=${token}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `Delhivery tracking returned status ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const pkg = data?.ShipmentData?.[0]?.Shipment;

    if (!pkg) {
      return NextResponse.json({
        success: false,
        message: "Shipment record not yet active or found in Delhivery network",
        raw: data,
      });
    }

    return NextResponse.json({
      success: true,
      status: pkg.Status?.Status || "In Transit",
      statusDateTime: pkg.Status?.StatusDateTime || "",
      destination: pkg.Destination || "",
      origin: pkg.Origin || "Nagpur",
      expectedDeliveryDate: pkg.ExpectedDeliveryDate || "",
      scans: pkg.Scans || [],
      waybill: pkg.AWB,
      paymentMode: pkg.OrderType || "Pre-paid",
    });
  } catch (error: any) {
    console.error("Delhivery Track API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to query tracking" },
      { status: 500 }
    );
  }
}
