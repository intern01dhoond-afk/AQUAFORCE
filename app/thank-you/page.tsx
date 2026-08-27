"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Package, Truck, Phone, Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id") || "";
  const orderId = searchParams.get("order_id") || "";
  const amount = searchParams.get("amount") || "9999";
  const customerName = searchParams.get("name") || "";
  const formattedAmount = Number(amount).toLocaleString("en-IN");

  useEffect(() => {
    // Trigger Meta Pixel Purchase Conversion Event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Purchase", {
        value: Number(amount) || 9999,
        currency: "INR",
        content_name: "AMEC AQUAFORCE 1400 PSI TECH Cordless Washer",
        content_type: "product",
      });
    }
  }, [amount]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Main Confirmation Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_15px_40px_rgba(15,23,42,0.08)] border border-slate-100 p-6 sm:p-10 md:p-12 text-center">
          {/* Animated Success Badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-md shadow-emerald-500/20 animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="w-9 h-9 sm:w-12 sm:h-12" />
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-montserrat text-slate-900 tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-slate-600 font-open-sans text-sm sm:text-base mt-2 sm:mt-3 max-w-lg mx-auto">
            {customerName ? (
              <>
                Thank you, <strong className="text-slate-900">{customerName}</strong>! Your order has been received and is being processed.
              </>
            ) : (
              "Thank you for your purchase! Your order has been received and is being processed."
            )}
          </p>

          {/* Reference Badges */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2">
            {paymentId && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono px-3 py-1.5 rounded-lg">
                <ShieldCheck size={14} className="text-emerald-600" />
                Payment ID: {paymentId}
              </span>
            )}
            {orderId && (
              <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono px-3 py-1.5 rounded-lg">
                Order ID: {orderId}
              </span>
            )}
          </div>

          {/* Order Details Summary Box */}
          <div className="mt-8 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 text-left max-w-xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-[#0066cc] rounded-xl flex items-center justify-center shrink-0">
                  <Package size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-[15px] font-montserrat text-slate-900">
                    AQUAFORCE 1400 PSI TECH
                  </h4>
                  <p className="text-xs text-slate-500 font-open-sans">
                    Cordless High-Pressure Washer Complete Kit
                  </p>
                </div>
              </div>
              <span className="font-black text-sm sm:text-base font-montserrat text-[#0066cc]">
                ₹{formattedAmount}
              </span>
            </div>

            {/* Shipping & Confirmation info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px] font-open-sans text-slate-600 pt-1">
              <div className="flex items-start gap-2.5">
                <Truck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Free Express Delivery</span>
                  <span>Expected within 4–6 business days</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={18} className="text-[#0066cc] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">1-Year Warranty</span>
                  <span>100% Genuine PROMEC Product</span>
                </div>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="mt-8 pt-6 border-t border-slate-100 max-w-md mx-auto">
            <p className="text-xs text-slate-500 font-open-sans mb-3">
              Need assistance with your order? Our support team is here to help:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
              <a
                href="tel:+919345247343"
                className="inline-flex items-center gap-1.5 hover:text-[#0066cc] transition-colors"
              >
                <Phone size={14} className="text-[#0066cc]" />
                +91 93452 47343
              </a>
              <span className="text-slate-300">•</span>
              <a
                href="mailto:sales@promectools.in"
                className="inline-flex items-center gap-1.5 hover:text-[#0066cc] transition-colors"
              >
                <Mail size={14} className="text-[#0066cc]" />
                sales@promectools.in
              </a>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#0066cc] hover:bg-[#0055b3] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-95 font-montserrat"
            >
              <ArrowLeft size={16} />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
          <div className="w-8 h-8 border-4 border-[#0066cc] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
