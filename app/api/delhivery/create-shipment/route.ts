import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
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
    } = body;

    const token = process.env.DELHIVERY_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "DELHIVERY_API_TOKEN not configured" },
        { status: 500 }
      );
    }

    const pickupLocationName = process.env.DELHIVERY_PICKUP_LOCATION || "Nagpur MIDC";
    const pickupAddress = process.env.DELHIVERY_PICKUP_ADDRESS || "PLOT NO.5A, 3RD FLOOR Nagpur MIDC HINGNA BESIDE JAIKA TATA MOTORS SERVICE CENTRE";
    const pickupPincode = process.env.DELHIVERY_PICKUP_PINCODE || "440016";

    const payload = {
      shipments: [
        {
          name: fullName,
          add: deliveryAddress,
          pin: pincode,
          city: city,
          state: state,
          country: "India",
          phone: phone,
          order: orderId || `ORD_${Date.now()}`,
          payment_mode: "Pre-paid",
          return_add: pickupAddress,
          return_pin: pickupPincode,
          return_city: "Nagpur",
          return_state: "Maharashtra",
          return_country: "India",
          products_desc: product || "Aquaforce 1400 PSI Tech",
          hsn_code: "84243000",
          cod_amount: 0,
          order_date: new Date().toISOString(),
          total_amount: Number(amount) || 37999,
          quantity: String(quantity || 1),
          seller_name: "PROMEC",
          weight: 8500,
        },
      ],
      pickup_location: {
        name: pickupLocationName,
        add: pickupAddress,
        city: "Nagpur",
        state: "Maharashtra",
        pin: pickupPincode,
      },
    };

    const formData = new URLSearchParams();
    formData.append("format", "json");
    formData.append("data", JSON.stringify(payload));

    const res = await fetch("https://track.delhivery.com/api/cmu/create.json", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await res.json();
    console.log("Delhivery Order Creation Response:", JSON.stringify(data, null, 2));

    if (data?.success || data?.packages?.length > 0 || data?.upload_wbn) {
      const waybill = data?.packages?.[0]?.waybill || data?.upload_wbn || "GENERATED";
      return NextResponse.json({
        success: true,
        waybill,
        delhiveryData: data,
      });
    }

    return NextResponse.json({
      success: false,
      error: data?.rmk || data?.error || "Failed to create shipment on Delhivery",
      raw: data,
    });
  } catch (error: any) {
    console.error("Delhivery Order Creation Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create Delhivery shipment" },
      { status: 500 }
    );
  }
}
