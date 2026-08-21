"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Star, Truck, RotateCcw, CheckCircle2, ArrowRight } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRODUCT_DATA = {
  name: "Aquaforce 1400",
  description:
    "The AMEC Aquaforce 1400 is a powerful, battery-powered portable pressure washer. No cables, no power sockets, no fixed setup needed.",
  rating: 1.0,
  reviewsCount: 215,
  offerPrice: 37999,
  mrp: 49999,
  colors: [
    {
      name: "Blue",
      hex: "#0066cc",
      inStock: false,
      images: [
        "/cart page images/Blue product/1.png",
        "/cart page images/Blue product/2.png",
        "/cart page images/Blue product/3.png",
        "/cart page images/Blue product/4.png",
      ],
    },
    {
      name: "Yellow",
      hex: "#f5c518",
      inStock: true,
      images: [
        "/cart page images/Yellow Product/1.png",
        "/cart page images/Yellow Product/2.png",
        "/cart page images/Yellow Product/3.png",
        "/cart page images/Yellow Product/4.png",
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
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    deliveryAddress: "",
    city: "",
    state: "",
    pincode: "",
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

  const handleColorChange = (idx: number) => {
    setSelectedColorIndex(idx);
    setActiveImageIndex(0);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
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

      // 1. Create order on server
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
            product: `${PRODUCT_DATA.name} (${currentColor.name})`,
            quantity: String(quantity),
          },
        }),
      });

      const orderData = await res.json();

      if (!res.ok || orderData.error) {
        throw new Error(orderData.error || "Failed to create order");
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
        handler: function (response: any) {
          setPaymentId(response.razorpay_payment_id || "");
          setIsProcessingPayment(false);
          setIsSubmitted(true);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
      {/* Dark Blur Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full ${
          isCheckingOut ? "max-w-[600px] p-6 sm:p-8 md:p-10" : "max-w-[440px] lg:max-w-[1045px] p-5 sm:p-8 lg:p-10"
        } bg-white rounded-[24px] sm:rounded-[20px] shadow-2xl border border-slate-100 z-10 my-auto max-h-[94vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200`}
      >
        {/* Close Button (Circle icon top-right) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 bg-[#f1f5f9] hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors focus:outline-none z-20 cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {isSubmitted ? (
          /* Order Confirmed View */
          <div className="text-center py-10 sm:py-14">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in-50 duration-300">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-montserrat text-slate-900 tracking-tight">
              Order Placed Successfully!
            </h3>
            <p className="text-slate-600 font-open-sans text-sm sm:text-base mt-2 max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your payment was verified and your order for{" "}
              <strong>
                {quantity}x {PRODUCT_DATA.name} ({currentColor.name})
              </strong>{" "}
              has been confirmed for <strong>₹{(PRODUCT_DATA.offerPrice * quantity).toLocaleString("en-IN")}</strong>.
            </p>
            {paymentId && (
              <div className="mt-3 inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono px-3 py-1 rounded-md">
                Payment ID: {paymentId}
              </div>
            )}
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 max-w-md mx-auto text-left space-y-1 font-open-sans">
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
              className="mt-8 bg-[#0066cc] hover:bg-[#0055b3] text-white font-bold px-8 py-3.5 rounded-[8px] shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer font-open-sans"
            >
              Continue Browsing
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Exact Delivery Checkout Form from Screenshot */
          <div className="pt-2 sm:pt-4">
            <button
              onClick={() => setIsCheckingOut(false)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 mb-6 cursor-pointer transition-colors font-open-sans"
            >
              &larr; Back to Product Details
            </button>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4 sm:space-y-5">
              {/* Row 1: Full Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 font-open-sans">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 font-open-sans">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                  />
                </div>
              </div>

              {/* Row 2: Complete Delivery Address */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 font-open-sans">
                  Complete Delivery Address
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Street name, house/apartment number"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-none h-[100px] font-open-sans"
                />
              </div>

              {/* Row 3: City, State, Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 font-open-sans">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nagpur"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 font-open-sans">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Maharashtra"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 font-open-sans">
                    Pincode
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="440001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                  />
                </div>
              </div>

              {/* Terms Agreement Checkbox */}
              <label className="flex items-start gap-2.5 pt-2 cursor-pointer select-none font-open-sans">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0066cc] focus:ring-[#0066cc] accent-[#0066cc] cursor-pointer shrink-0"
                  required
                />
                <span className="text-xs sm:text-[13px] text-slate-500 leading-snug">
                  I agree to the terms and agree to receive transactional delivery updates via mobile.
                </span>
              </label>

              {/* Submit Button (SHOP NOW / Pay with Razorpay) */}
              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full h-12 sm:h-13 !mt-6 bg-[#0066cc] hover:bg-[#0055b3] text-white font-black font-montserrat text-sm sm:text-base uppercase tracking-wider rounded-[8px] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessingPayment ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </span>
                ) : (
                  <span>SHOP NOW &rarr;</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Main Product Detail Layout (Matching mobile view design & Figma layout) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center">
            {/* ========================================================= */}
            {/* LEFT COLUMN: Gallery & Thumbnails */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 flex flex-col items-center">
              {/* Main Image Container */}
              <div className="relative w-full aspect-square max-h-[300px] sm:max-h-[380px] lg:max-h-[400px] flex items-center justify-center bg-white rounded-[16px] overflow-hidden group">
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
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className={`object-contain p-2 transition-all duration-300 ${
                    !currentColor.inStock ? "opacity-75 grayscale-[20%]" : ""
                  }`}
                />

                {/* Left Navigation Chevron (Desktop only) */}
                <button
                  onClick={prevImage}
                  className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-slate-200 shadow-md items-center justify-center text-slate-700 hover:bg-white hover:scale-105 transition-all cursor-pointer z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Right Navigation Chevron (Desktop only) */}
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
                    className={`relative aspect-square rounded-[8px] bg-white p-1 transition-all overflow-hidden cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-2 border-[#0066cc] shadow-xs"
                        : "border border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="90px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: Product Information & Controls */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Product Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold font-montserrat text-[#0F1729] leading-[1.15] tracking-tight mt-3 sm:mt-0">
                {PRODUCT_DATA.name}
              </h2>

              {/* Description */}
              <p className="text-slate-500 font-open-sans sm:text-slate-600 text-[13px] sm:text-sm leading-relaxed mt-2 sm:mt-2.5">
                {PRODUCT_DATA.description}
              </p>

              {/* Ratings & Reviews */}
              <div className="flex items-center gap-1.5 mt-2.5 sm:mt-3 font-open-sans">
                <div className="flex items-center text-[#f59e0b]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-slate-600 ml-1">
                  {PRODUCT_DATA.rating.toFixed(1)} ({PRODUCT_DATA.reviewsCount} Reviews)
                </span>
              </div>

              {/* Price Line */}
              <div className="flex items-baseline gap-3 mt-3.5 sm:mt-4 font-open-sans">
                <span className="text-2xl sm:text-[34px] lg:text-[38px] font-bold text-[#0F1729] tracking-tight">
                  ₹{PRODUCT_DATA.offerPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-slate-400 line-through text-base sm:text-lg font-normal">
                  ₹{PRODUCT_DATA.mrp.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="w-full h-px bg-slate-100 my-3.5 sm:my-5" />

              {/* Color Selector */}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#0F1729] mb-2 sm:mb-2.5 flex items-center gap-2">
                  <span>
                    Color: <strong className="font-medium text-slate-800">{currentColor.name}</strong>
                  </span>
                  {!currentColor.inStock && (
                    <span className="text-red-600 bg-red-50 border border-red-200 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-3">
                  {PRODUCT_DATA.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => handleColorChange(idx)}
                      style={{ backgroundColor: c.hex }}
                      className={`relative w-9 h-9 rounded-[4px] transition-all cursor-pointer ${
                        selectedColorIndex === idx
                          ? "ring-2 ring-[#0066cc] ring-offset-2 scale-105"
                          : "opacity-85 hover:opacity-100 border border-slate-200"
                      }`}
                      aria-label={`Select ${c.name} color${!c.inStock ? " (Out of Stock)" : ""}`}
                    >
                      {!c.inStock && (
                        <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[3px]">
                          <span className="w-full h-[2px] bg-red-500 rotate-45 block shadow-xs" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-slate-100 my-3.5 sm:my-5" />

              {/* Quantity Stepper */}
              <div className="flex items-center">
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
                    disabled={!currentColor.inStock}
                    className="text-slate-700 hover:text-slate-950 font-bold px-2 py-0.5 text-base sm:text-lg cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    &#43;
                  </button>
                </div>
              </div>

              {/* Shipping Badges */}
              <div className="flex items-center gap-4 text-slate-900 text-xs sm:text-sm mt-3.5 sm:mt-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <Truck size={16} className="text-[#0066cc]" /> Free Delivery
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <RotateCcw size={15} className="text-[#0066cc]" /> Deliver within 4-6 Days
                </span>
              </div>

              {/* Action Button */}
              <div className="mt-5 sm:mt-6 w-full">
                {currentColor.inStock ? (
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full h-12 bg-[#0066cc] hover:bg-[#0055b3] text-white font-bold text-sm sm:text-base tracking-wider uppercase rounded-[8px] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    BUY NOW
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full h-12 bg-slate-100 border border-slate-200 text-slate-400 font-bold text-sm sm:text-base tracking-wider uppercase rounded-[8px] cursor-not-allowed flex items-center justify-center select-none"
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
