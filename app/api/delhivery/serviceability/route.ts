import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pincode = searchParams.get("pincode");

    if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 6-digit pincode" },
        { status: 400 }
      );
    }

    const token = process.env.DELHIVERY_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "DELHIVERY_API_TOKEN not configured in .env.local" },
        { status: 500 }
      );
    }

    const url = `https://track.delhivery.com/c/api/pin-codes/json/?token=${token}&filter_codes=${pincode}`;
    const res = await fetch(url, { headers: { "Content-Type": "application/json" } });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `Delhivery API returned status ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const codes = data?.delivery_codes;

    if (Array.isArray(codes) && codes.length > 0 && codes[0]?.postal_code) {
      const details = codes[0].postal_code;
      const serviceable = details.pre_paid === "Y" || details.cod === "Y";

      return NextResponse.json({
        success: true,
        serviceable,
        cod: details.cod === "Y",
        prePaid: details.pre_paid === "Y",
        district: details.district || details.city || "",
        state: details.state_code || "",
        remarks: serviceable ? "Express Delivery Available via Delhivery" : "Pincode not currently serviceable",
      });
    }

    return NextResponse.json({
      success: true,
      serviceable: false,
      remarks: "Pincode not found in Delhivery network",
    });
  } catch (error: any) {
    console.error("Delhivery Serviceability Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to check serviceability" },
      { status: 500 }
    );
  }
}
