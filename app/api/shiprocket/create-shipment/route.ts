import { NextResponse } from "next/server";
import { createDelhiveryShipment } from "@/lib/delhivery";

export async function POST(req: Request) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const {
      orderId,
      fullName,
      email,
      phone,
      altPhone,
      deliveryAddress,
      city,
      state,
      pincode,
      product,
      quantity,
      amount,
      paymentMode,
      codAmount,
      advanceAmount,
    } = body;

    if (!fullName || !phone || !deliveryAddress || !pincode) {
      return NextResponse.json(
        { error: "Missing required shipping parameters (fullName, phone, deliveryAddress, pincode)" },
        { status: 400 }
      );
    }

    const result = await createDelhiveryShipment({
      orderId,
      fullName,
      email,
      phone,
      altPhone,
      deliveryAddress,
      city: city || "Nagpur",
      state: state || "Maharashtra",
      pincode,
      product,
      quantity,
      amount,
      paymentMode,
      codAmount,
      advanceAmount,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        waybill: result.waybill,
        courierName: "Delhivery",
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: result.error || "Failed to create Delhivery shipment",
        raw: result.raw,
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Delhivery Order Creation Endpoint Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create Delhivery shipment" },
      { status: 500 }
    );
  }
}
