"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Loader2,
  Building2,
  Package,
} from "lucide-react";

interface BulkEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUANTITY_PRESETS = ["5-10", "11-25", "26-50", "51-100", "100+"];

export default function BulkEnquiryModal({ isOpen, onClose }: BulkEnquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    companyName: "",
    email: "",
    quantity: "5-10",
    customQuantity: "",
    notes: "",
    agreedToTerms: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handlePresetSelect = (preset: string) => {
    setFormData((prev) => ({
      ...prev,
      quantity: preset,
      customQuantity: preset === "100+" ? prev.customQuantity : "",
    }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your full name");
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!formData.companyName.trim()) {
      setErrorMsg("Please enter your company or business name");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid work email address");
      return;
    }
    const finalQuantity = formData.customQuantity.trim() || formData.quantity;
    if (!finalQuantity) {
      setErrorMsg("Please select or enter the required quantity");
      return;
    }
    if (!formData.agreedToTerms) {
      setErrorMsg("Please agree to the terms to proceed");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    // Simulate enquiry submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setErrorMsg("");
    setFormData({
      fullName: "",
      phone: "",
      companyName: "",
      email: "",
      quantity: "5-10",
      customQuantity: "",
      notes: "",
      agreedToTerms: true,
    });
    onClose();
  };

  const activeQuantity = formData.customQuantity.trim() || formData.quantity;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-5 md:p-6 bg-black/65 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-[620px] bg-white rounded-[22px] sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] text-slate-900 overflow-hidden my-auto p-5 sm:p-7 md:p-8">
        {/* Header row: Back button on left, Close button on right */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-slate-400 hover:text-slate-700 cursor-pointer transition-colors font-open-sans"
          >
            &larr; Back to Product Details
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-[#f1f5f9] hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors focus:outline-none cursor-pointer shadow-xs shrink-0"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {isSubmitted ? (
          /* Success Confirmation View */
          <div className="py-4 sm:py-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 shadow-sm animate-scaleIn">
              <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-montserrat text-slate-900 tracking-tight">
              Enquiry Submitted Successfully!
            </h3>

            <p className="text-slate-600 font-open-sans text-xs sm:text-sm max-w-md mt-2.5 leading-relaxed">
              Thank you <strong className="text-slate-900">{formData.fullName}</strong>. Our enterprise sales team for{" "}
              <strong className="text-[#0066cc]">AMEC Aquaforce 1400</strong> has received your bulk order request and will
              contact you within 24 hours with wholesale tiered pricing.
            </p>

            {/* Summary Details Card */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 mt-5 text-left text-xs sm:text-[13px] space-y-2 text-slate-700 font-open-sans">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Company / Business:</span>
                <span className="font-semibold text-slate-900">{formData.companyName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Required Quantity:</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {activeQuantity} Units
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-semibold text-slate-900">{formData.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Work Email:</span>
                <span className="font-semibold text-slate-900">{formData.email}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full sm:w-auto bg-[#0066cc] hover:bg-[#0055b3] active:bg-[#004799] text-white font-bold px-8 py-3.5 rounded-[8px] shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer font-open-sans text-xs xs:text-sm uppercase tracking-wider"
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          /* Clean White Card Form (Matches Screenshot) */
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            {/* Title / Badge Bar */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold font-montserrat text-slate-900 tracking-tight">
                Bulk Quantity Enquiry
              </h2>
              <span className="text-[10.5px] font-bold text-[#0066cc] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                B2B Tiered Pricing
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Row 1: Full Name & Mobile Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 font-open-sans">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Rahul Sharma"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[15px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 font-open-sans">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={15}
                  className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[15px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans shadow-2xs"
                />
              </div>
            </div>

            {/* Row 2: Company Name & Work Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 font-open-sans">
                  Company / Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="e.g. Apex Auto Detailing / Fleet Services"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[15px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 font-open-sans">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[15px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans shadow-2xs"
                />
              </div>
            </div>

            {/* Row 3: How Much Quantity Required? */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 font-open-sans">
                  How much quantity required? <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Tiered Wholesale Pricing
                </span>
              </div>

              {/* Preset Chips */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-2">
                {QUANTITY_PRESETS.map((preset) => {
                  const isSelected = formData.quantity === preset && !formData.customQuantity;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      className={`py-2 px-1 text-center rounded-[8px] text-xs font-bold font-montserrat transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#0066cc] text-white border-[#0066cc] shadow-sm scale-[1.02]"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>

              {/* Custom Quantity Input */}
              <input
                type="text"
                name="customQuantity"
                placeholder="Or enter custom quantity (e.g. 35 units)"
                value={formData.customQuantity}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    customQuantity: e.target.value,
                  }));
                  if (errorMsg) setErrorMsg("");
                }}
                className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2 sm:px-4 sm:py-2.5 text-[14px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans shadow-2xs"
              />
            </div>

            {/* Row 4: Optional Notes / Requirements */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 font-open-sans">
                Optional Notes / Delivery Requirements
              </label>
              <textarea
                rows={2}
                name="notes"
                placeholder="Specify delivery location, timeframe, or special requirements..."
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] rounded-[8px] px-3.5 py-2 sm:px-4 sm:py-2.5 text-[14px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-none h-[65px] sm:h-[75px] font-open-sans shadow-2xs"
              />
            </div>

            {/* Terms Agreement Checkbox (Exact match to screenshot) */}
            <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none font-open-sans">
              <input
                type="checkbox"
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0066cc] focus:ring-[#0066cc] accent-[#0066cc] cursor-pointer shrink-0"
                required
              />
              <span className="text-[11.5px] sm:text-[13px] text-slate-500 leading-snug">
                I agree to the terms and agree to receive transactional bulk pricing updates via mobile/email.
              </span>
            </label>

            {/* B2B Trust Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500 font-open-sans border-t border-slate-100">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                GST Invoicing & Warranty
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                Pan-India Direct Logistics
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                Priority Enterprise Support
              </span>
            </div>

            {/* Big Blue Submit Button (Matches SHOP NOW button in screenshot) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 sm:h-13 !mt-3 bg-[#0066cc] hover:bg-[#0055b3] active:bg-[#004799] text-white font-black font-montserrat text-sm sm:text-base uppercase tracking-wider rounded-[8px] shadow-lg shadow-blue-600/30 transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Bulk Enquiry...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>SUBMIT BULK ENQUIRY</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
