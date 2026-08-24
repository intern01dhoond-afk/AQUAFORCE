"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Star, Truck, RotateCcw, CheckCircle2, ArrowRight, ShieldCheck, FileText, ChevronDown, ChevronUp } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRODUCT_DATA = {
  name: "Cordless AquaForce 1400 High-pressure Washer System",
  description:
    "The AMEC Aquaforce 1400 is a powerful, battery-powered portable pressure washer. No cables, no power sockets, no fixed setup needed.",
  rating: 4.8,
  reviewsCount: 2097,
  offerPrice: 37999,
  mrp: 49999,
  colors: [
    {
      name: "Yellow",
      hex: "#f5c518",
      inStock: true,
      images: [
        "/cart page images/Yellow Product/2.png",
        "/cart page images/Yellow Product/1.png",
        "/cart page images/Yellow Product/3.png",
        "/cart page images/Yellow Product/4.png",
      ],
    },
    {
      name: "Blue",
      hex: "#0066cc",
      inStock: false,
      images: [
        "/cart page images/Blue product/2.png",
        "/cart page images/Blue product/1.png",
        "/cart page images/Blue product/3.png",
        "/cart page images/Blue product/4.png",
      ],
    },
  ],
};

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(true);
  const [isSpecsOpen, setIsSpecsOpen] = useState(true);
  const [isBoxOpen, setIsBoxOpen] = useState(true);

  // Touch Swipe State for Modal Image Gallery
  const [modalTouchStartX, setModalTouchStartX] = useState<number | null>(null);
  const [modalTouchEndX, setModalTouchEndX] = useState<number | null>(null);

  const minSwipeDistance = 35;

  const handleModalTouchStart = (e: React.TouchEvent) => {
    setModalTouchEndX(null);
    setModalTouchStartX(e.targetTouches[0].clientX);
  };

  const handleModalTouchMove = (e: React.TouchEvent) => {
    setModalTouchEndX(e.targetTouches[0].clientX);
  };

  const handleModalTouchEnd = () => {
    if (!modalTouchStartX || !modalTouchEndX) return;
    const distance = modalTouchStartX - modalTouchEndX;
    if (distance > minSwipeDistance) {
      nextImage();
    } else if (distance < -minSwipeDistance) {
      prevImage();
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    deliveryAddress: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
    agreedToTerms: true,
  });

  const currentColor = PRODUCT_DATA.colors[selectedColorIndex];
  const images = currentColor.images;

  // Load Razorpay Script dynamically
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsCheckingOut(false);
      setIsSubmitted(false);
      setIsProcessingPayment(false);
      setPaymentId("");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const MAX_QUANTITY_LIMIT = 10;

  const handleColorChange = (idx: number) => {
    setSelectedColorIndex(idx);
    setActiveImageIndex(0);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.min(MAX_QUANTITY_LIMIT, Math.max(1, prev + delta)));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentColor.inStock) return;

    setIsProcessingPayment(true);

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Unable to load Razorpay payment SDK. Please check your internet connection.");
        setIsProcessingPayment(false);
        return;
      }

      const totalAmount = PRODUCT_DATA.offerPrice * quantity;

      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          notes: {
            fullName: formData.fullName,
            phone: formData.phone,
            deliveryAddress: formData.deliveryAddress,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            gstNumber: formData.gstNumber || "N/A",
            product: `${PRODUCT_DATA.name} (${currentColor.name})`,
            quantity: String(quantity),
          },
        }),
      });

      let orderData: any = null;
      const textResponse = await res.text();
      try {
        orderData = JSON.parse(textResponse);
      } catch (err) {
        throw new Error(textResponse || "Failed to parse order response from server.");
      }

      if (!res.ok || !orderData || orderData.error) {
        throw new Error(orderData?.error || `Order creation failed (${res.status})`);
      }

      // 2. Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_T8B1ZfO0qV6cTa",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "AMEC Technology",
        description: `${PRODUCT_DATA.name} (${currentColor.name}) x ${quantity}`,
        order_id: orderData.id,
        prefill: {
          name: formData.fullName,
          contact: formData.phone,
        },
        theme: {
          color: "#0066cc",
        },
        handler: async function (response: any) {
          const payId = response.razorpay_payment_id || "";
          setPaymentId(payId);
          setIsProcessingPayment(false);
          setIsSubmitted(true);

          // Record purchase into Google Sheets
          try {
            await fetch("/api/purchase", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: orderData.id,
                paymentId: payId,
                fullName: formData.fullName,
                phone: formData.phone,
                deliveryAddress: formData.deliveryAddress,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                gstNumber: formData.gstNumber || "N/A",
                product: `${PRODUCT_DATA.name} (${currentColor.name})`,
                quantity: quantity,
                amount: totalAmount,
                status: "Paid & Confirmed",
              }),
            });
          } catch (sheetErr) {
            console.error("Failed to forward purchase to Google Sheets:", sheetErr);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
          },
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err: any) {
      console.error("Payment error:", err);
      alert(err.message || "Payment initiation failed. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  const resetAll = () => {
    setIsCheckingOut(false);
    setIsSubmitted(false);
    setIsProcessingPayment(false);
    setPaymentId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 xs:p-3 sm:p-5 md:p-6 overflow-y-auto">
      {/* Dark Blur Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full ${
          isCheckingOut ? "max-w-[600px] p-5 xs:p-6 sm:p-8 md:p-10" : "max-w-[460px] lg:max-w-[1045px] p-4 xs:p-5 sm:p-8 lg:p-10"
        } bg-white rounded-[20px] sm:rounded-[24px] shadow-2xl border border-slate-100 z-10 my-auto max-h-[92vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200`}
      >
        {/* Top Close Button for Product Detail and Success Views */}
        {!isCheckingOut && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 bg-[#f1f5f9] hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors focus:outline-none z-20 cursor-pointer shadow-xs"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        )}

        {isSubmitted ? (
          /* Order Confirmed View */
          <div className="text-center py-8 sm:py-14">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-in zoom-in-50 duration-300">
              <CheckCircle2 size={32} className="sm:w-9 sm:h-9" />
            </div>
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-black font-montserrat text-slate-900 tracking-tight">
              Order Placed Successfully!
            </h3>
            <p className="text-slate-600 font-open-sans text-xs xs:text-sm sm:text-base mt-2 max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your payment was verified and your order for{" "}
              <strong>
                {quantity}x {PRODUCT_DATA.name} ({currentColor.name})
              </strong>{" "}
              has been confirmed for <strong>₹{(PRODUCT_DATA.offerPrice * quantity).toLocaleString("en-IN")}</strong>.
            </p>
            {paymentId && (
              <div className="mt-2.5 inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] sm:text-xs font-mono px-3 py-1 rounded-md">
                Payment ID: {paymentId}
              </div>
            )}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 max-w-md mx-auto text-left space-y-1 font-open-sans">
              <p>
                <strong>Delivery Address:</strong> {formData.deliveryAddress}
                {formData.city ? `, ${formData.city}` : ""}
                {formData.state ? `, ${formData.state}` : ""}
                {formData.pincode ? ` - ${formData.pincode}` : ""}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
              <p className="text-emerald-700 font-semibold pt-1">
                🚚 Free Express Delivery (Expected within 4-6 Days)
              </p>
            </div>
            <button
              onClick={resetAll}
              className="mt-6 sm:mt-8 w-full sm:w-auto bg-[#0066cc] hover:bg-[#0055b3] active:bg-[#004799] text-white font-bold px-8 py-3.5 rounded-[8px] shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer font-open-sans text-xs xs:text-sm uppercase tracking-wider"
            >
              Continue Browsing
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Exact Delivery Checkout Form from Screenshot */
          <div>
            {/* Header row: Back button on left, Close button on right, perfectly aligned */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <button
                onClick={() => setIsCheckingOut(false)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-slate-400 hover:text-slate-700 cursor-pointer transition-colors font-open-sans"
              >
                &larr; Back to Product Details
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#f1f5f9] hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors focus:outline-none cursor-pointer shadow-xs shrink-0"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-3.5 sm:space-y-5">
              {/* Row 1: Full Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 font-open-sans">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 font-open-sans">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                  />
                </div>
              </div>

              {/* Row 2: Complete Delivery Address */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 font-open-sans">
                  Complete Delivery Address
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Street name, house/apartment number"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-none h-[85px] sm:h-[100px] font-open-sans"
                />
              </div>

              {/* Row 3: City, State, Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 font-open-sans">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nagpur"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 font-open-sans">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Maharashtra"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 font-open-sans">
                    Pincode
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="440001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                  />
                </div>
              </div>

              {/* Row 4: GST Number (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-700 font-open-sans">
                    GST Number
                  </label>
                  <span className="text-[11px] font-medium text-slate-400 font-open-sans">
                    Optional
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. 27AAAAA0000A1Z5"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
                  className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans uppercase"
                />
              </div>

              {/* Terms Agreement Checkbox */}
              <label className="flex items-start gap-2.5 pt-1.5 cursor-pointer select-none font-open-sans">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0066cc] focus:ring-[#0066cc] accent-[#0066cc] cursor-pointer shrink-0"
                  required
                />
                <span className="text-[11.5px] sm:text-[13px] text-slate-500 leading-snug">
                  I agree to the terms and agree to receive transactional delivery updates via mobile.
                </span>
              </label>

              {/* Submit Button (BUY NOW / Pay with Razorpay) */}
              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full h-12 sm:h-13 !mt-5 bg-[#0066cc] hover:bg-[#0055b3] active:bg-[#004799] text-white font-black font-montserrat text-sm sm:text-base uppercase tracking-wider rounded-[8px] shadow-lg shadow-blue-600/30 transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessingPayment ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </span>
                ) : (
                  <span>BUY NOW &rarr;</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Main Product Detail Layout (Matching Image 1 & Image 2 with Sticky Gallery & Sticky Buy Now) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* ========================================================= */}
            {/* LEFT COLUMN: Sticky Gallery & Thumbnails */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 lg:sticky lg:top-0 flex flex-col items-center select-none">
              {/* Main Image Container with Touch Swipe Support */}
              <div
                onTouchStart={handleModalTouchStart}
                onTouchMove={handleModalTouchMove}
                onTouchEnd={handleModalTouchEnd}
                className="relative w-full aspect-square max-h-[260px] xs:max-h-[300px] sm:max-h-[360px] lg:max-h-[380px] flex items-center justify-center bg-white rounded-[16px] overflow-hidden group touch-pan-y"
              >
                {/* Out of Stock Ribbon/Badge */}
                {!currentColor.inStock && (
                  <div className="absolute top-3 left-3 z-20 bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[6px] shadow-md">
                    Out of Stock
                  </div>
                )}

                <Image
                  src={images[activeImageIndex]}
                  alt={`${PRODUCT_DATA.name} ${currentColor.name} view ${activeImageIndex + 1}`}
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 500px"
                  className={`object-contain p-2 transition-all duration-300 ${
                    !currentColor.inStock ? "opacity-75 grayscale-[20%]" : ""
                  }`}
                />

                {/* Left Navigation Chevron */}
                <button
                  onClick={prevImage}
                  className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-slate-200 shadow-md items-center justify-center text-slate-700 hover:bg-white hover:scale-105 transition-all cursor-pointer z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Right Navigation Chevron */}
                <button
                  onClick={nextImage}
                  className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-slate-200 shadow-md items-center justify-center text-slate-700 hover:bg-white hover:scale-105 transition-all cursor-pointer z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* 4 Clickable Thumbnails */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full mt-3 sm:mt-4">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-[12px] bg-white p-1 transition-all overflow-hidden cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-2 border-[#0066cc] shadow-xs"
                        : "border border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      quality={100}
                      sizes="120px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: Scrollable Info with Sticky Buy Now Button */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 flex flex-col justify-between max-h-[78vh] lg:max-h-[580px] overflow-y-auto pl-1 pr-1.5 sm:pr-2 no-scrollbar relative">
              <div className="space-y-4">
                {/* Product Title */}
                <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold font-montserrat text-[#0F1729] leading-[1.2] tracking-tight mt-1 sm:mt-0">
                  {PRODUCT_DATA.name}
                </h2>

                {/* Description */}
                <p className="text-slate-500 font-open-sans sm:text-slate-600 text-[13px] sm:text-sm leading-relaxed">
                  {PRODUCT_DATA.description}
                </p>

                {/* Ratings & Reviews */}
                <div className="flex items-center gap-1.5 font-open-sans">
                  <div className="flex items-center gap-0.5">
                    {/* 4 Full Stars */}
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} size={15} fill="#f59e0b" strokeWidth={0} className="text-[#f59e0b]" />
                    ))}
                    {/* 5th Star: 3/4 (80%) Gold Fill, 20% Gray */}
                    <div className="relative w-[15px] h-[15px]">
                      <Star size={15} fill="#e2e8f0" strokeWidth={0} className="text-[#e2e8f0] absolute inset-0" />
                      <div className="absolute inset-0 overflow-hidden w-[80%]">
                        <Star size={15} fill="#f59e0b" strokeWidth={0} className="text-[#f59e0b]" />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-slate-600 ml-1">
                    {PRODUCT_DATA.rating.toFixed(1)} ({PRODUCT_DATA.reviewsCount} Reviews)
                  </span>
                </div>

                {/* Price Line & Free Delivery Badge */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3 font-open-sans flex-wrap">
                    <span className="text-3xl sm:text-4xl font-bold text-[#0F1729] tracking-tight">
                      ₹{PRODUCT_DATA.offerPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-slate-400 line-through text-lg font-normal">
                      ₹{PRODUCT_DATA.mrp.toLocaleString("en-IN")}
                    </span>
                    <span className="bg-[#16a34a] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      FREE Delivery
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-open-sans">
                    You save ₹{(1500).toLocaleString("en-IN")} on shipping
                  </p>
                </div>

                <div className="w-full h-px bg-slate-100 my-4" />

                {/* Color Selector */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#0F1729] mb-2.5 font-open-sans flex items-center gap-2">
                    <span>
                      Color: <strong className="font-medium text-slate-800">{currentColor.name}</strong>
                    </span>
                    {!currentColor.inStock && (
                      <span className="text-red-600 bg-red-50 border border-red-200 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-3.5 py-1">
                    {PRODUCT_DATA.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorChange(idx)}
                        className={`relative w-10 h-10 rounded-[12px] p-[3px] bg-white transition-colors cursor-pointer flex items-center justify-center ${
                          selectedColorIndex === idx
                            ? "border-[2.5px] border-[#0066cc]"
                            : "border-[1.5px] border-slate-200 hover:border-slate-300"
                        }`}
                        aria-label={`Select ${c.name} color${!c.inStock ? " (Out of Stock)" : ""}`}
                      >
                        <span
                          style={{ backgroundColor: c.hex }}
                          className="w-full h-full rounded-[7px] relative flex items-center justify-center overflow-hidden"
                        >
                          {!c.inStock && (
                            <span className="w-[140%] h-[2.5px] bg-red-500 rotate-45 absolute" />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100 my-4" />

                {/* Quantity Stepper & Delivery on Separate Rows */}
                <div className="space-y-3">
                  {/* Quantity Stepper */}
                  <div
                    className={`inline-flex items-center bg-[#f1f5f9] rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 transition-opacity ${
                      !currentColor.inStock ? "opacity-40 pointer-events-none" : ""
                    }`}
                  >
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1 || !currentColor.inStock}
                      className="text-slate-700 hover:text-slate-950 font-bold px-2 py-0.5 text-base sm:text-lg disabled:opacity-30 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <span className="px-3.5 text-sm sm:text-base font-bold text-slate-900 min-w-[20px] text-center select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= MAX_QUANTITY_LIMIT || !currentColor.inStock}
                      className="text-slate-700 hover:text-slate-950 font-bold px-2 py-0.5 text-base sm:text-lg disabled:opacity-30 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      &#43;
                    </button>
                  </div>

                  {/* Delivery Info */}
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-900 font-semibold font-open-sans">
                    <Truck size={17} className="text-[#0066cc]" />
                    <span>Deliver within 4-6 Days</span>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100 my-4" />

                {/* 1. Warranty & Returns */}
                <div className="space-y-2 pt-1">
                  <h3 className="font-semibold text-sm sm:text-[15px] text-[#0F1729] font-open-sans">
                    Warranty &amp; Returns
                  </h3>
                  <ul className="space-y-1.5 text-xs sm:text-[13px] text-slate-600 font-open-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-normal">-</span>
                      <span>1-year limited warranty on the product</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-normal">-</span>
                      <span>Returns accepted within 7 days of delivery</span>
                    </li>
                  </ul>
                </div>

                <div className="w-full h-px bg-slate-100 my-4" />

                {/* 2. Product Highlights (Accordion) */}
                <div className="space-y-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsHighlightsOpen(!isHighlightsOpen)}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-[15px] text-[#0F1729] font-open-sans cursor-pointer group"
                  >
                    <span>Product Highlights</span>
                    <ChevronUp
                      size={16}
                      className={`text-slate-500 transition-transform duration-200 ${
                        isHighlightsOpen ? "" : "rotate-180"
                      }`}
                    />
                  </button>

                  {isHighlightsOpen && (
                    <div className="space-y-3 text-xs sm:text-[13px] font-open-sans animate-in fade-in duration-150">
                      <div className="grid grid-cols-12 gap-3 items-start">
                        <div className="col-span-4 sm:col-span-4 text-slate-800 font-medium">Battery Powered</div>
                        <div className="col-span-8 sm:col-span-8 text-slate-500">no cables, no power sockets, no fixed setup needed</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 items-start">
                        <div className="col-span-4 sm:col-span-4 text-slate-800 font-medium">Lightweight Design</div>
                        <div className="col-span-8 sm:col-span-8 text-slate-500">portable and easy to carry and maneuver around the job</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 items-start">
                        <div className="col-span-4 sm:col-span-4 text-slate-800 font-medium">Go Cordless</div>
                        <div className="col-span-8 sm:col-span-8 text-slate-500">clean anywhere without being tethered to a wall outlet</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full h-px bg-slate-100 my-4" />

                {/* 3. Technical Specifications (Accordion) */}
                <div className="space-y-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-[15px] text-[#0F1729] font-open-sans cursor-pointer group"
                  >
                    <span>Technical Specifications</span>
                    <ChevronUp
                      size={16}
                      className={`text-slate-500 transition-transform duration-200 ${
                        isSpecsOpen ? "" : "rotate-180"
                      }`}
                    />
                  </button>

                  {isSpecsOpen && (
                    <div className="space-y-2.5 text-xs sm:text-[13px] font-open-sans animate-in fade-in duration-150">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Pressure rating</span>
                        <span className="font-bold text-slate-900">1400 PSI</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Battery life</span>
                        <span className="font-bold text-slate-900">Up to 30 min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Water flow rate</span>
                        <span className="font-bold text-slate-900">1.2 GPM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Weight</span>
                        <span className="font-bold text-slate-900">Approx. 12.5 kg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Tank capacity</span>
                        <span className="font-bold text-slate-900">5 L</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Nozzle types</span>
                        <span className="font-bold text-slate-900">0° / 15° / 25° / 45°</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Charging time</span>
                        <span className="font-bold text-slate-900">Approx. 1.4 hrs</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full h-px bg-slate-100 my-4" />

                {/* 4. What's In The Box (Accordion) */}
                <div className="space-y-3 pt-1 pb-2">
                  <button
                    type="button"
                    onClick={() => setIsBoxOpen(!isBoxOpen)}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-[15px] text-[#0F1729] font-open-sans cursor-pointer group"
                  >
                    <span>What&apos;s In The Box</span>
                    <ChevronUp
                      size={16}
                      className={`text-slate-500 transition-transform duration-200 ${
                        isBoxOpen ? "" : "rotate-180"
                      }`}
                    />
                  </button>

                  {isBoxOpen && (
                    <ul className="space-y-2 text-xs sm:text-[13px] text-slate-600 font-open-sans animate-in fade-in duration-150">
                      <li className="flex items-center gap-2">
                        <span className="text-slate-400 font-normal">-</span> Cordless Pressure Washer
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-400 font-normal">-</span> Lance with Nozzle 0/15/25/45
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-400 font-normal">-</span> Bucket 15ltr
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-400 font-normal">-</span> Foam Gun
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-400 font-normal">-</span> Pressure Hose Pipe
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-400 font-normal">-</span> Pressure Gun
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-400 font-normal">-</span> Charger
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-400 font-normal">-</span> Corded Vacuum with Accessories
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-400 font-normal">-</span> User Manual
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              {/* Sticky Buy Now Action Button (Always Anchored at Bottom) with Top Fade Gradient */}
              <div className="relative pt-2 pb-1 bg-white shrink-0 sticky bottom-0 z-20">
                {/* Smooth White Gradient Overlay prompting user to scroll */}
                <div className="absolute -top-7 left-0 right-0 h-7 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none" />

                {currentColor.inStock ? (
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full h-12 sm:h-12.5 bg-[#0066cc] hover:bg-[#0055b3] active:bg-[#004799] text-white font-bold font-montserrat text-sm tracking-wider uppercase rounded-[8px] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    BUY NOW
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full h-12 bg-slate-100 border border-slate-200 text-slate-400 font-bold font-montserrat text-sm tracking-wider uppercase rounded-[8px] cursor-not-allowed flex items-center justify-center select-none"
                  >
                    OUT OF STOCK
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
