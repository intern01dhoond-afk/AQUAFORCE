import { NextResponse } from "next/server";
import { createDelhiveryShipment } from "@/lib/delhivery";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      orderId = "PROMEC-ORD-1790417815914-5DQL",
      fullName = "Subhash Sing Dhami",
      email = "subhash.singh.dhami.ssd@gmail.com",
      phone = "8800781865",
      altPhone = "8800781865",
      deliveryAddress = "1522 Bhagirath palace Chandni chowk Delhi 110006",
      city = "North Delhi",
      state = "Delhi",
      pincode = "110006",
      product = "Cordless AquaForce\u00ae 1400 High-pressure Washer System (Yellow)",
      quantity = 1,
      amount = 37999,
      paymentMode = "COD",
      codAmount = 34199,
      advanceAmount = 3800,
    } = body;

    const shipmentResult = await createDelhiveryShipment({
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
    });

    // Update Google Sheet with Waybill if generated
    if (shipmentResult.success && shipmentResult.waybill) {
      try {
        const sheetUrl = process.env.GOOGLE_SHEET_PURCHASE_URL || "https://script.google.com/macros/s/AKfycbw93k8Td-zP_4HnTq4QTio4KgbFobeXatiTR2BvPPJJczur1RFRggZHq15InxQJBthFAw/exec";
        await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "UPDATE_WAYBILL",
            orderId,
            waybill: shipmentResult.waybill,
            courier: "Delhivery",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (sheetErr: any) {
        console.warn("[Retry Fulfillment] Google Sheet waybill update warning:", sheetErr.message);
      }
    }

    return NextResponse.json({
      success: shipmentResult.success,
      courier: "Delhivery",
      waybill: shipmentResult.waybill,
      error: shipmentResult.error,
      raw: shipmentResult.raw,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
