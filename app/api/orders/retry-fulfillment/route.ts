import { NextResponse } from "next/server";
import { createShiprocketShipment } from "@/lib/shiprocket";
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
      product = "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)",
      quantity = 1,
      amount = 37999,
      paymentMode = "COD",
      codAmount = 34199,
      advanceAmount = 3800,
      preferredCourier = "shiprocket", // "shiprocket" or "delhivery"
    } = body;

    let shipmentResult: any = null;
    let courierUsed = "";

    if (preferredCourier === "delhivery") {
      shipmentResult = await createDelhiveryShipment({
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
      courierUsed = "Delhivery";
    } else {
      // Try Shiprocket first
      shipmentResult = await createShiprocketShipment({
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
      courierUsed = "Shiprocket";

      // If Shiprocket fails (e.g. account locked), fallback to Delhivery
      if (!shipmentResult.success && process.env.DELHIVERY_API_TOKEN) {
        console.warn(`[Retry Fulfillment] Shiprocket failed: ${shipmentResult.error}. Falling back to Delhivery.`);
        const dRes = await createDelhiveryShipment({
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
        if (dRes.success) {
          shipmentResult = dRes;
          courierUsed = "Delhivery (Fallback)";
        }
      }
    }

    // Update Google Sheet with Waybill if generated
    if (shipmentResult.success && (shipmentResult.waybill || shipmentResult.awbCode)) {
      const waybill = shipmentResult.waybill || shipmentResult.awbCode;
      try {
        const sheetUrl = process.env.GOOGLE_SHEET_PURCHASE_URL || "https://script.google.com/macros/s/AKfycbw93k8Td-zP_4HnTq4QTio4KgbFobeXatiTR2BvPPJJczur1RFRggZHq15InxQJBthFAw/exec";
        await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "UPDATE_WAYBILL",
            orderId,
            waybill,
            courier: courierUsed,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (sheetErr: any) {
        console.warn("[Retry Fulfillment] Google Sheet waybill update warning:", sheetErr.message);
      }
    }

    return NextResponse.json({
      success: shipmentResult.success,
      courier: courierUsed,
      waybill: shipmentResult.waybill || shipmentResult.awbCode,
      shipmentId: shipmentResult.shipmentId,
      error: shipmentResult.error,
      raw: shipmentResult.raw,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
