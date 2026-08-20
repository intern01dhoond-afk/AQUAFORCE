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
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    deliveryAddress: "",
    pincode: "",
  });

  const currentColor = PRODUCT_DATA.colors[selectedColorIndex];
  const images = currentColor.images;

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsCheckingOut(false);
      setIsSubmitted(false);
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

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetAll = () => {
    setIsCheckingOut(false);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
      {/* Dark Blur Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card (Exact Figma: 1045px width, 20px radius, white background) */}
      <div className="relative w-full max-w-[1045px] bg-white rounded-[20px] shadow-2xl border border-slate-100 p-6 sm:p-8 lg:p-10 z-10 my-auto max-h-[94vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200">
        {/* Close Button (Circle icon top-right) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors focus:outline-none z-20 cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {isSubmitted ? (
          /* Order Confirmed View */
          <div className="text-center py-10 sm:py-14">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in-50 duration-300">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Order Placed Successfully!
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your order for{" "}
              <strong>
                {quantity}x {PRODUCT_DATA.name} ({currentColor.name})
              </strong>{" "}
              has been reserved for <strong>₹{(PRODUCT_DATA.offerPrice * quantity).toLocaleString("en-IN")}</strong>.
            </p>
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 max-w-md mx-auto text-left space-y-1">
              <p>
                <strong>Delivery Address:</strong> {formData.deliveryAddress}, {formData.pincode}
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
              className="mt-8 bg-[#0066cc] hover:bg-[#0055b3] text-white font-bold px-8 py-3.5 rounded-[8px] shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Express Checkout Form */
          <div className="py-2">
            <button
              onClick={() => setIsCheckingOut(false)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-4 cursor-pointer"
            >
              &larr; Back to Product Details
            </button>
            <h3 className="text-2xl font-bold text-[#0F1729] mb-1">
              Delivery Details
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Complete your shipping address to receive the <strong>{PRODUCT_DATA.name} ({currentColor.name})</strong>.
            </p>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#0066cc] focus:bg-white rounded-[8px] px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#0066cc] focus:bg-white rounded-[8px] px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Street address, apartment, flat no..."
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#0066cc] focus:bg-white rounded-[8px] px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="400001"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#0066cc] focus:bg-white rounded-[8px] px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
                />
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-[8px] flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-700">Total Payable:</span>
                <span className="font-bold text-slate-950 text-base">
                  ₹{(PRODUCT_DATA.offerPrice * quantity).toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#0066cc] hover:bg-[#0055b3] text-white font-bold text-sm uppercase tracking-wider rounded-[8px] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                Confirm Order <ArrowRight size={16} />
              </button>
            </form>
          </div>
        ) : (
          /* Main Product Detail Layout (Exact 2-Column Figma Design) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* ========================================================= */}
            {/* LEFT COLUMN: Gallery & Thumbnails */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 flex flex-col items-center">
              {/* Main Image Container */}
              <div className="relative w-full aspect-square max-h-[360px] sm:max-h-[400px] flex items-center justify-center bg-white rounded-[16px] overflow-hidden group">
                <Image
                  src={images[activeImageIndex]}
                  alt={`${PRODUCT_DATA.name} ${currentColor.name} view ${activeImageIndex + 1}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-contain p-2 transition-all duration-300"
                />

                {/* Left Navigation Chevron */}
                <button
                  onClick={prevImage}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-white hover:scale-105 transition-all cursor-pointer z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Right Navigation Chevron */}
                <button
                  onClick={nextImage}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-white hover:scale-105 transition-all cursor-pointer z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* 4 Clickable Thumbnails */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full mt-4">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-[8px] bg-white p-1 transition-all overflow-hidden cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-2 border-[#0066cc] shadow-sm ring-1 ring-[#0066cc]"
                        : "border border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100"
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
              {/* Product Title (Exact Figma: Montserrat 40px weight 600 color #0F1729) */}
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#0F1729] leading-[1.1] tracking-tight">
                {PRODUCT_DATA.name}
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-[13px] lg:text-[14px] leading-relaxed mt-2.5">
                {PRODUCT_DATA.description}
              </p>

              {/* Ratings & Reviews */}
              <div className="flex items-center gap-1.5 mt-3">
                <div className="flex items-center text-[#f59e0b]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-xs sm:text-[13px] font-semibold text-slate-700 ml-1">
                  {PRODUCT_DATA.rating.toFixed(1)} ({PRODUCT_DATA.reviewsCount} Reviews)
                </span>
              </div>

              {/* Price Line */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl sm:text-[34px] lg:text-[38px] font-bold text-[#0F1729] tracking-tight">
                  ₹{PRODUCT_DATA.offerPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-slate-400 line-through text-base sm:text-lg font-normal">
                  ₹{PRODUCT_DATA.mrp.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="w-full h-px bg-slate-100 my-4 sm:my-5" />

              {/* Color Selector */}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#0F1729] mb-2.5">
                  Color: <span className="font-bold">{currentColor.name}</span>
                </p>
                <div className="flex items-center gap-3">
                  {PRODUCT_DATA.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => handleColorChange(idx)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-9 h-9 rounded-[4px] border-2 transition-all cursor-pointer ${
                        selectedColorIndex === idx
                          ? "border-slate-900 ring-2 ring-offset-2 ring-slate-400 scale-105"
                          : "border-transparent opacity-85 hover:opacity-100"
                      }`}
                      aria-label={`Select ${c.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Free Delivery Badges Row */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
                {/* Stepper Pill */}
                <div className="inline-flex items-center bg-slate-100/90 rounded-full px-3 py-1.5 border border-slate-200/70">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="text-slate-700 hover:text-slate-950 font-bold px-2 py-0.5 text-base disabled:opacity-35 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    &minus;
                  </button>
                  <span className="px-2.5 text-sm font-bold text-slate-900 min-w-[20px] text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="text-slate-700 hover:text-slate-950 font-bold px-2 py-0.5 text-base cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    &#43;
                  </button>
                </div>

                {/* Shipping Badges */}
                <div className="flex items-center gap-3.5 text-slate-800 text-[11px] sm:text-xs">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-600">
                    <Truck size={15} /> FREE DELIVERY
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <RotateCcw size={14} className="text-blue-600" /> Deliver within 4-6 Days
                  </span>
                </div>
              </div>

              {/* BUY NOW Button (Exact Figma: 426px width x 48px height, rounded-8px, bg #0066cc) */}
              <div className="mt-6 w-full">
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full h-12 bg-[#0066cc] hover:bg-[#0055b3] text-white font-bold text-sm sm:text-base tracking-wider uppercase rounded-[8px] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
