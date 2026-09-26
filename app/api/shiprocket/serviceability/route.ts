import { NextResponse } from "next/server";

const DELHIVERY_API_TOKEN = process.env.DELHIVERY_API_TOKEN || "896739f8bbc9a0d080336cd9504af9fd22c324a3";

// In-memory cache for pincode serviceability (6-hour TTL)
const serviceabilityCache = new Map<string, { result: any; expiresAt: number }>();

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
    const cacheKey = `${cleanPincode}_${isCod ? "cod" : "prepaid"}`;
    const cached = serviceabilityCache.get(cacheKey);
    if (cached && Date.now() < cached.expiresAt) {
      return NextResponse.json(cached.result);
    }

    const url = `https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${cleanPincode}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Token ${DELHIVERY_API_TOKEN}` },
    });

    const data = await res.json();
    const deliveryInfo = data?.delivery_codes?.[0]?.postal_code;
    const serviceable = !!deliveryInfo;
    const codAvailable = serviceable && deliveryInfo?.cod === "Y";

    const result = {
      success: true,
      pincode: cleanPincode,
      serviceable,
      cod: isCod ? codAvailable : serviceable,
      couriersCount: serviceable ? 1 : 0,
      remarks: serviceable
        ? "Express Delivery Available via Delhivery"
        : "Pincode not currently serviceable",
    };

    serviceabilityCache.set(cacheKey, {
      result,
      expiresAt: Date.now() + 6 * 60 * 60 * 1000,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Delhivery Serviceability Endpoint Error:", error);
    return NextResponse.json({
      success: true,
      serviceable: true,
      cod: true,
      remarks: "Defaulting to serviceable",
    });
  }
}
