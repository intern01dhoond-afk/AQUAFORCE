import { NextResponse } from "next/server";
import { checkShiprocketServiceability } from "@/lib/shiprocket";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pincode = searchParams.get("pincode") || searchParams.get("pin");
    const codParam = searchParams.get("cod");
    const isCod = codParam !== "0" && codParam !== "false";

    if (!pincode || pincode.trim().length !== 6) {
      return NextResponse.json(
        { success: false, error: "Valid 6-digit pincode is required" },
        { status: 400 }
      );
    }

    const cleanPincode = pincode.replace(/\D/g, "");
    const result = await checkShiprocketServiceability(cleanPincode, isCod);

    return NextResponse.json({
      success: true,
      pincode: cleanPincode,
      serviceable: result.serviceable,
      cod: result.cod,
      couriersCount: result.couriersCount || 0,
      remarks: result.serviceable
        ? "Express Delivery Available via Shiprocket"
        : "Pincode not currently serviceable",
    });
  } catch (error: any) {
    console.error("Shiprocket Serviceability Endpoint Error:", error);
    return NextResponse.json({
      success: true,
      serviceable: true,
      cod: true,
      remarks: "Defaulting to serviceable",
    });
  }
}
