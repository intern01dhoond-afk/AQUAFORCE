import { NextResponse } from "next/server";

// Public unauthenticated endpoint for Razorpay Magic Checkout
export async function POST(req: Request) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // Body can be empty or urlencoded
    }

    // Return full shipping & COD serviceability across India with free shipping
    return NextResponse.json({
      shipping_serviceable: true,
      cod_serviceable: true,
      shipping_fee: 0, // 0 paise (Free shipping)
      cod_fee: 0, // 0 paise (Free COD processing)
      shipping_methods: [
        {
          id: "delhivery_express",
          name: "Delhivery Express Delivery",
          description: "Fast Delivery (2-4 Days) across India",
          shipping_fee: 0,
          cod: true,
          cod_fee: 0,
          serviceable: true,
        },
      ],
      message: "Express Delivery and Cash on Delivery available",
    });
  } catch (error: any) {
    console.error("Magic Shipping Info Error:", error);
    return NextResponse.json({
      shipping_serviceable: true,
      cod_serviceable: true,
      shipping_fee: 0,
      cod_fee: 0,
    });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    shipping_serviceable: true,
    cod_serviceable: true,
    shipping_fee: 0,
    cod_fee: 0,
    shipping_methods: [
      {
        id: "delhivery_express",
        name: "Delhivery Express Delivery",
        shipping_fee: 0,
        cod: true,
        cod_fee: 0,
        serviceable: true,
      },
    ],
  });
}
