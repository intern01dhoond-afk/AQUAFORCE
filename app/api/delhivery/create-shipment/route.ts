import { NextResponse } from "next/server";
import { createDelhiveryShipment } from "@/lib/delhivery";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createDelhiveryShipment(body);

    if (result.success && result.waybill) {
      return NextResponse.json({
        success: true,
        waybill: result.waybill,
        delhiveryData: result.raw,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: result.error,
        raw: result.raw,
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Delhivery Order Creation Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create Delhivery shipment" },
      { status: 500 }
    );
  }
}
