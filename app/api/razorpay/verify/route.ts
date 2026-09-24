import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required verification parameters (order_id, razorpay_payment_id, razorpay_signature)" },
        { status: 400 }
      );
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return NextResponse.json(
        { error: "Razorpay secret key not configured on server" },
        { status: 500 }
      );
    }

    // Step 1.5 of Razorpay Custom Checkout:
    // generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret)
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(`${order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isAuthentic =
      expectedSignature.length === razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "utf-8"),
        Buffer.from(razorpay_signature, "utf-8")
      );

    if (!isAuthentic) {
      console.error("Razorpay Signature Mismatch:", {
        order_id,
        razorpay_payment_id,
        expected: expectedSignature,
        received: razorpay_signature,
      });
      return NextResponse.json(
        { success: false, verified: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      order_id,
      payment_id: razorpay_payment_id,
    });
  } catch (err: any) {
    console.error("Razorpay verification endpoint error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to verify payment signature" },
      { status: 500 }
    );
  }
}
