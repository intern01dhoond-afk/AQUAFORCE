import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, receipt, notes } = body;

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_T8B1ZfO0qV6cTa";
    const key_secret = process.env.RAZORPAY_KEY_SECRET || "0KXVl9FKyL7UlWPDw0HJancL";

    if (!key_id || !key_secret) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured" },
        { status: 500 }
      );
    }

    if (notes?.quantity && Number(notes.quantity) > 10) {
      return NextResponse.json(
        { error: "Maximum cart value limit is 10 devices per order." },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: Math.round(Number(amount) * 100), // amount in paise
      currency: "INR",
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
