"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Star, Truck, RotateCcw, CheckCircle2, ArrowRight, ShieldCheck, FileText, ChevronDown, ChevronUp, Share2, Gift, Check, Info, Headphones, PackageCheck } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpeedingTruckIcon = ({ className = "w-5 h-5 text-[#0066cc]" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Fast Speed Lines */}
    <path d="M2 8h3" />
    <path d="M1 12h4" />
    <path d="M2 16h3" />
    {/* Truck Container */}
    <path d="M7 6h7.5v9H7z" />
    {/* Aerodynamic Fast Cab */}
    <path d="M14.5 9h3.5l2 3v3h-5.5V9z" />
    {/* Wheels */}
    <circle cx="9" cy="17" r="1.8" fill="currentColor" />
    <circle cx="17.5" cy="17" r="1.8" fill="currentColor" />
  </svg>
);

const PRODUCT_DATA = {
  name: "Cordless AquaForce 1400 High-pressure Washer System",
  description:
    "The Aquaforce 1400 is a powerful, battery-powered portable pressure washer. No cables, no power sockets, no fixed setup needed.",
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
        "/aquaforceforautocare/images/products/yellow/1.png",
        "/aquaforceforautocare/images/products/yellow/2.png",
        "/aquaforceforautocare/images/products/yellow/3.1.png",
        "/aquaforceforautocare/images/products/yellow/4.png",
        "/aquaforceforautocare/images/products/yellow/5.1.png",
        "/aquaforceforautocare/images/products/yellow/5.2.png",
        "/aquaforceforautocare/images/products/yellow/6.2.png",
      ],
    },
    {
      name: "Blue",
      hex: "#0066cc",
      inStock: false,
      images: [
        "/aquaforceforautocare/images/products/blue/1.png",
        "/aquaforceforautocare/images/products/blue/2.png",
        "/aquaforceforautocare/images/products/blue/3.jpg",
        "/aquaforceforautocare/images/products/blue/4.png",
        "/aquaforceforautocare/images/products/blue/5.1.png",
        "/aquaforceforautocare/images/products/yellow/5.2.png",
        "/aquaforceforautocare/images/products/blue/6.1.png",
      ],
    },
  ],
};

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedVacuumOption, setSelectedVacuumOption] = useState<"with" | "without">("with");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isReplacementOpen, setIsReplacementOpen] = useState(false);
  const [isKnowMoreOpen, setIsKnowMoreOpen] = useState(false);

  // Dynamic Pricing Calculations
  const currentOfferPrice = selectedVacuumOption === "without" ? 35999 : 37999;
  const currentMRP = selectedVacuumOption === "without" ? 47999 : 51350;
  const unitSavings = currentMRP - currentOfferPrice;
  const totalPrice = currentOfferPrice * quantity;
  const totalMRP = currentMRP * quantity;
  const totalSavings = unitSavings * quantity;
  const savingsPercentage = Math.round((unitSavings / currentMRP) * 100);
  const taxAmount = Math.round(((totalPrice * 18) / 118) * 100) / 100;

  const handleShareReferral = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "AQUAFORCE 1400 Cordless Pressure Washer",
          text: "Check out the AQUAFORCE 1400 Cordless High-Pressure Washer! Use my referral link for ₹1,000 extra credit.",
          url: window.location.origin + "/aquaforceforautocare?ref=FRIEND1000",
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + "/aquaforceforautocare?ref=FRIEND1000");
      setCopiedReferral(true);
      setTimeout(() => setCopiedReferral(false), 2500);
    }
  };

  // Section Refs for Auto-Scrolling on Accordion Open
  const modalCardRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const replacementRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const isThumbnailMount = useRef(true);

  useEffect(() => {
    if (isThumbnailMount.current) {
      isThumbnailMount.current = false;
      return;
    }
    if (thumbnailContainerRef.current && thumbnailRefs.current[activeImageIndex]) {
      const container = thumbnailContainerRef.current;
      const thumb = thumbnailRefs.current[activeImageIndex];
      const offset = thumb.offsetLeft - container.offsetWidth / 2 + thumb.offsetWidth / 2;
      container.scrollTo({
        left: offset,
        behavior: "smooth",
      });
    }
  }, [activeImageIndex]);

  const toggleSection = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    setter((prev) => {
      const willOpen = !prev;
      if (willOpen) {
        setTimeout(() => {
          if (!ref.current) return;
          ref.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }, 60);
      }
      return willOpen;
    });
  };

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
    email: "",
    phone: "",
    deliveryAddress: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
    agreedToTerms: true,
  });

  const [formErrors, setFormErrors] = useState<{
    phone?: string;
    email?: string;
    pincode?: string;
  }>({});

  const [isLoadingPincode, setIsLoadingPincode] = useState(false);

  const isValidEmail = (emailStr: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailStr.trim());
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    if (formErrors.phone && digitsOnly.length === 10) {
      setFormErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, email: val }));
    if (formErrors.email && isValidEmail(val)) {
      setFormErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const cleanVal = rawVal.replace(/\D/g, "").slice(0, 6);

    setFormData((prev) => ({ ...prev, pincode: cleanVal }));
    if (formErrors.pincode && cleanVal.length === 6) {
      setFormErrors((prev) => ({ ...prev, pincode: undefined }));
    }

    if (cleanVal.length === 6) {
      setIsLoadingPincode(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${cleanVal}`);
        const data = await res.json();
        if (Array.isArray(data) && data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
          const po = data[0].PostOffice[0];
          const fetchedCity = po.District || po.Block || po.Circle || po.Name || "";
          const fetchedState = po.State || "";
          setFormData((prev) => ({
            ...prev,
            pincode: cleanVal,
            city: fetchedCity || prev.city,
            state: fetchedState || prev.state,
          }));
        }
      } catch (err) {
        console.warn("Error fetching pincode details:", err);
      } finally {
        setIsLoadingPincode(false);
      }
    }
  };

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

  // Track pushed history states: null | 'product' | 'checkout'
  const historyStateRef = useRef<"product" | "checkout" | null>(null);
  const isNavigatingBackRef = useRef(false);

  // Synchronize history state when modal opens/closes for seamless mobile back navigation
  useEffect(() => {
    if (!isOpen) {
      historyStateRef.current = null;
      return;
    }

    // Push initial history state for product view when modal opens
    if (historyStateRef.current === null) {
      window.history.pushState({ amecModal: "product" }, "");
      historyStateRef.current = "product";
    }

    const handlePopState = () => {
      // If we initiated window.history.back() / window.history.go() programmatically, ignore
      if (isNavigatingBackRef.current) {
        return;
      }

      // If user was in checkout view, pressing back returns to product details
      if (historyStateRef.current === "checkout") {
        historyStateRef.current = "product";
        setIsCheckingOut(false);
        setIsSubmitted(false);
        setIsProcessingPayment(false);
      } else {
        // If user was in product view, pressing back closes modal (returning to Home screen)
        historyStateRef.current = null;
        setIsCheckingOut(false);
        setIsSubmitted(false);
        setIsProcessingPayment(false);
        onClose();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  // When transitioning from product view -> checkout view, push checkout history state
  useEffect(() => {
    if (isOpen && isCheckingOut && historyStateRef.current === "product") {
      window.history.pushState({ amecModal: "checkout" }, "");
      historyStateRef.current = "checkout";
    }
  }, [isOpen, isCheckingOut]);

  // Handle back button from Checkout Form -> Product Details view
  const handleBackToProduct = () => {
    if (historyStateRef.current === "checkout") {
      historyStateRef.current = "product";
      setIsCheckingOut(false);
      setIsSubmitted(false);
      setIsProcessingPayment(false);
      isNavigatingBackRef.current = true;
      window.history.back();
      setTimeout(() => {
        isNavigatingBackRef.current = false;
      }, 100);
    } else {
      setIsCheckingOut(false);
    }
  };

  // Handle closing modal completely from any view
  const handleClose = () => {
    if (historyStateRef.current === "checkout") {
      isNavigatingBackRef.current = true;
      historyStateRef.current = null;
      window.history.go(-2);
      setTimeout(() => {
        isNavigatingBackRef.current = false;
      }, 100);
    } else if (historyStateRef.current === "product") {
      isNavigatingBackRef.current = true;
      historyStateRef.current = null;
      window.history.back();
      setTimeout(() => {
        isNavigatingBackRef.current = false;
      }, 100);
    }
    setIsCheckingOut(false);
    setIsSubmitted(false);
    setIsProcessingPayment(false);
    setPaymentId("");
    setFormErrors({});
    onClose();
  };

  const resetAll = () => {
    handleClose();
  };

  // Reset when modal opens and lock background scroll completely
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      setIsCheckingOut(false);
      setIsSubmitted(false);
      setIsProcessingPayment(false);
      setPaymentId("");
      setFormErrors({});
      return () => {
        document.body.style.overflow = originalBodyOverflow || "";
        document.documentElement.style.overflow = originalHtmlOverflow || "";
      };
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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

    const errors: { phone?: string; email?: string; pincode?: string } = {};

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      errors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.pincode || formData.pincode.length !== 6) {
      errors.pincode = "Please enter a valid 6-digit pincode";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsProcessingPayment(true);

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Unable to load Razorpay payment SDK. Please check your internet connection.");
        setIsProcessingPayment(false);
        return;
      }

      const totalAmount = currentOfferPrice * quantity;

      const res = await fetch("/aquaforceforautocare/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          notes: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            deliveryAddress: formData.deliveryAddress,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            gstNumber: formData.gstNumber || "N/A",
            product: `${PRODUCT_DATA.name} (${currentColor.name}) [${selectedVacuumOption === "without" ? "Without Vacuum" : "With Vacuum"}]`,
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
        name: "PROMEC",
        description: `${PRODUCT_DATA.name} (${currentColor.name}) x ${quantity}`,
        order_id: orderData.id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
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
            await fetch("/aquaforceforautocare/api/purchase", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: orderData.id,
                paymentId: payId,
                fullName: formData.fullName,
                email: formData.email,
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

          // Track Meta Pixel Purchase event
          if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq("track", "Purchase", {
              value: totalAmount,
              currency: "INR",
              content_name: `${PRODUCT_DATA.name} (${currentColor.name})`,
              content_type: "product",
              num_items: quantity,
            });
          }

          // Redirect to dedicated Thank You confirmation page
          window.location.href = `/aquaforceforautocare/thank-you?payment_id=${encodeURIComponent(payId)}&order_id=${encodeURIComponent(orderData.id)}&amount=${encodeURIComponent(totalAmount)}&name=${encodeURIComponent(formData.fullName)}`;
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 lg:p-6 overflow-hidden overscroll-contain bg-white lg:bg-transparent">
      {/* Dark Blur Backdrop (Desktop Only) */}
      <div
        className="hidden lg:block fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal Dialog Card (Full screen separate page on mobile, popup modal on desktop) */}
      <div
        ref={modalCardRef}
        className={`relative w-full ${
          isCheckingOut || isSubmitted
            ? "h-full lg:h-auto max-w-full lg:max-w-[600px] p-4 xs:p-5 sm:p-7 md:p-8 overflow-y-auto"
            : "h-full lg:h-auto max-w-full lg:max-w-[1040px] flex flex-col overflow-hidden"
        } bg-white rounded-none lg:rounded-[24px] shadow-none lg:shadow-2xl border-0 lg:border lg:border-slate-100 z-10 my-0 lg:my-auto max-h-none lg:max-h-[90vh] overscroll-contain animate-in fade-in duration-200 lg:zoom-in-95`}
      >
        {/* Top Close Button for Product Detail and Success Views */}
        {!isCheckingOut && (
          <button
            onClick={handleClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-9 h-9 bg-[#f1f5f9] hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors focus:outline-none z-30 cursor-pointer shadow-xs"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        )}

        {isSubmitted ? (
          /* ========================================================= */
          /* Exact Confirmation View from Reference Screenshot         */
          /* ========================================================= */
          <div className="relative flex flex-col items-center text-center py-2 sm:py-4">
            {/* Checkmark Icon (Double concentric layer circle) */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#e6fbf2] flex items-center justify-center mx-auto mb-4 sm:mb-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#00c06d] flex items-center justify-center shadow-xs">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[3.5]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl xs:text-2xl sm:text-[28px] font-bold font-montserrat text-[#0F1729] tracking-tight leading-snug">
              Order Placed Successfully!
            </h3>

            {/* Personalized Message */}
            <p className="text-[#475569] font-open-sans text-xs xs:text-[13.5px] sm:text-[14px] max-w-[430px] mx-auto mt-2 sm:mt-2.5 leading-relaxed font-normal">
              Thank you, <strong className="text-[#0f172a] font-bold font-open-sans">{formData.fullName || "Valued Customer"}</strong>.
              Your order for <strong className="text-[#005DA6] font-bold font-open-sans">Aquaforce 1400</strong> has been confirmed and our
              dispatch team is preparing your package for express delivery.
            </p>

            {/* Summary Details Card */}
            <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[16px] p-4 sm:p-5 mt-5 sm:mt-6 text-left font-open-sans space-y-3 divide-y divide-[#e2e8f0]/80 shadow-2xs">
              {/* Row 1: Product */}
              <div className="flex items-center justify-between text-[13px] pt-0 font-open-sans">
                <span className="text-[#64748b] font-medium font-open-sans">Product</span>
                <span className="text-[#0f172a] font-bold font-open-sans truncate max-w-[180px] sm:max-w-[240px]">
                  Aquaforce 1400 ({currentColor.name})
                </span>
              </div>

              {/* Row 2: Order Status */}
              <div className="flex items-center justify-between text-[13px] pt-3 font-open-sans">
                <span className="text-[#64748b] font-medium font-open-sans">Order Status</span>
                <span className="bg-[#f0f9ff] border border-[#005DA6]/35 text-[#005DA6] text-xs font-bold font-open-sans px-3 py-0.5 rounded-full leading-none">
                  Paid &amp; Confirmed
                </span>
              </div>

              {/* Row 3: Total Amount */}
              <div className="flex items-center justify-between text-[13px] pt-3 font-open-sans">
                <span className="text-[#64748b] font-medium font-open-sans">Amount Paid</span>
                <span className="text-[#0f172a] font-bold font-open-sans tracking-wide">
                  ₹{(PRODUCT_DATA.offerPrice * quantity).toLocaleString("en-IN")}
                </span>
              </div>

              {/* Row 4: Contact Number */}
              <div className="flex items-center justify-between text-[13px] pt-3 font-open-sans">
                <span className="text-[#64748b] font-medium font-open-sans">Contact Number</span>
                <span className="text-[#0f172a] font-bold font-open-sans tracking-wide">{formData.phone}</span>
              </div>

              {/* Row 5: Payment ID (if available) */}
              {paymentId && (
                <div className="flex items-center justify-between text-[13px] pt-3 font-open-sans">
                  <span className="text-[#64748b] font-medium font-open-sans">Payment ID</span>
                  <span className="text-[#0f172a] font-bold font-mono text-xs truncate max-w-[180px] sm:max-w-[240px]">
                    {paymentId}
                  </span>
                </div>
              )}

              {/* Row 6: Order Notifications Sequence */}
              <div className="flex items-center justify-between text-[12.5px] pt-3 font-open-sans">
                <span className="text-[#64748b] font-medium font-open-sans">Order Updates</span>
                <span className="text-slate-800 font-semibold text-right">
                  1st on Text &rarr; Email &rarr; WhatsApp
                </span>
              </div>
            </div>

            {/* Bottom Action Button */}
            <button
              type="button"
              onClick={resetAll}
              className="mt-6 sm:mt-8 w-full bg-[#0077c8] hover:bg-[#0066b3] active:bg-[#005599] text-white font-bold font-montserrat uppercase tracking-wider py-3.5 sm:py-4 rounded-[12px] shadow-sm hover:shadow-md transition-all cursor-pointer text-xs sm:text-sm"
            >
              CONTINUE BROWSING
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Exact Delivery Checkout Form from Screenshot */
          <div>
            {/* Header row: Back button on left, Close button on right, perfectly aligned */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <button
                onClick={handleBackToProduct}
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-slate-400 hover:text-slate-700 cursor-pointer transition-colors font-open-sans"
              >
                &larr; Back to Product Details
              </button>
              <button
                onClick={handleClose}
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
                    inputMode="numeric"
                    maxLength={10}
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full bg-white border ${
                      formErrors.phone
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc]"
                    } rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-[11px] sm:text-xs mt-1 font-open-sans font-medium">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email Address */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 font-open-sans">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="rahul.sharma@example.com"
                  value={formData.email}
                  onChange={handleEmailChange}
                  className={`w-full bg-white border ${
                    formErrors.email
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc]"
                  } rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-[11px] sm:text-xs mt-1 font-open-sans font-medium">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Row 3: Complete Delivery Address */}
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

              {/* Row 3: Pincode (1st), City (2nd), State (3rd) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 font-open-sans">
                    Pincode
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="560010"
                      value={formData.pincode}
                      onChange={handlePincodeChange}
                      className={`w-full bg-white border ${
                        formErrors.pincode
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-slate-200 focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc]"
                      } rounded-[8px] px-3.5 py-2.5 sm:px-4 sm:py-3 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans`}
                    />
                    {isLoadingPincode && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        <span className="w-4 h-4 border-2 border-[#0066cc] border-t-transparent rounded-full animate-spin block" />
                      </div>
                    )}
                  </div>
                  {formErrors.pincode && (
                    <p className="text-red-500 text-[11px] sm:text-xs mt-1 font-open-sans font-medium">
                      {formErrors.pincode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 font-open-sans">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bengaluru"
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
                    placeholder="Karnataka"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
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

              {/* Price Breakdown Card & Savings Banner (Matching Uploaded Screenshots 1 & 2) */}
              <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3 font-open-sans">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-montserrat text-slate-900">
                    Price Breakdown
                  </h4>
                  <span className="bg-sky-50 border border-sky-200 text-[#0066cc] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {selectedVacuumOption === "without" ? "Without Vacuum" : "With Vacuum"}
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-[13px] divide-y divide-slate-100">
                  {/* MRP Total */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-500 font-medium">MRP Total</span>
                    <span className="text-slate-400 line-through font-normal">₹{totalMRP.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Discount on MRP */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-slate-500 font-medium">Discount on MRP</span>
                    <span className="text-[#00c06d] font-bold">-₹{totalSavings.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-slate-500 font-medium">Subtotal</span>
                    <span className="text-slate-900 font-bold">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-slate-500 font-medium">Shipping</span>
                    <div>
                      <span className="text-slate-400 line-through mr-1.5 font-normal">₹1,500</span>
                      <span className="text-[#00c06d] font-bold uppercase">FREE</span>
                    </div>
                  </div>

                  {/* Handling & Packaging Fee */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-slate-500 font-medium">Handling &amp; Packaging Fee</span>
                    <div>
                      <span className="text-slate-400 line-through mr-1.5 font-normal">₹550</span>
                      <span className="text-[#00c06d] font-bold uppercase">FREE</span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200/80 my-2" />

                {/* Total Price */}
                <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 font-montserrat">
                  <span>Total Price</span>
                  <div className="text-right">
                    <span className="text-slate-400 line-through text-xs sm:text-sm font-normal mr-2">
                      ₹{totalMRP.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[#0066cc]">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Savings Banner Pill (Matching Screenshot 1) */}
                <div className="mt-3 p-3 bg-[#e6fbf2] border border-[#00c06d]/30 rounded-xl text-center text-[#0db168] font-bold text-xs sm:text-[13px] font-open-sans">
                  You are Saving <span className="font-extrabold text-[#00c06d]">₹{totalSavings.toLocaleString("en-IN")} ({savingsPercentage}% OFF)</span> on this order.
                </div>
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
                  I agree to receive order confirmation &amp; delivery updates (1st on Text, then Email, then WhatsApp).
                </span>
              </label>

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
          /* Main Product Detail Layout */
          <>
            <div className="flex-1 overflow-y-auto lg:overflow-hidden p-4 sm:p-6 lg:p-7 no-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch h-full">
                {/* ========================================================= */}
                {/* LEFT COLUMN: Gallery & Thumbnails */}
                {/* ========================================================= */}
                <div className="lg:col-span-6 flex flex-col justify-between select-none h-full lg:min-h-[540px]">
                  {/* Main Image Container with Touch Swipe Support */}
                  <div
                    onTouchStart={handleModalTouchStart}
                    onTouchMove={handleModalTouchMove}
                    onTouchEnd={handleModalTouchEnd}
                    className="relative w-full aspect-square max-h-[280px] xs:max-h-[320px] sm:max-h-[380px] lg:max-h-[430px] flex items-center justify-center bg-white rounded-[16px] overflow-hidden group touch-pan-y"
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

                  {/* Clickable Thumbnails (4 visible at a time, scrollable for 5, 6, etc.) */}
                  <div
                    ref={thumbnailContainerRef}
                    className="flex items-center gap-2.5 sm:gap-3 w-full mt-3 sm:mt-3.5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1"
                  >
                    {images.map((img, idx) => (
                      <button
                        key={img}
                        ref={(el) => {
                          thumbnailRefs.current[idx] = el;
                        }}
                        onClick={() => {
                          setActiveImageIndex(idx);
                          thumbnailRefs.current[idx]?.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                            inline: "center",
                          });
                        }}
                        className={`relative shrink-0 w-[calc(25%-7.5px)] sm:w-[calc(25%-9px)] aspect-square rounded-[12px] bg-white p-1 transition-all overflow-hidden cursor-pointer snap-start ${
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
                {/* RIGHT COLUMN: Info with Bottom-Anchored Buy Now Button */}
                {/* ========================================================= */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full lg:min-h-[540px] lg:max-h-[540px] mt-4 lg:mt-0 pl-0 lg:pl-1 pr-0 lg:pr-1">
                  {/* Scrollable Content Area */}
                  <div
                    ref={scrollContainerRef}
                    className="lg:flex-1 lg:overflow-y-auto pr-0 lg:pr-2 no-scrollbar space-y-3"
                  >
                    {/* Product Title */}
                    <h2 className="text-xl sm:text-2xl lg:text-[25px] font-bold font-montserrat text-[#0F1729] leading-[1.2] tracking-tight mt-1 sm:mt-0">
                      {PRODUCT_DATA.name}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-500 font-open-sans sm:text-slate-600 text-[12.5px] sm:text-sm leading-relaxed">
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

                    {/* Price Line & Delivery Fee */}
                    <div className="space-y-1.5">
                      <div className="flex items-baseline gap-3 font-open-sans">
                        <span className="text-3xl sm:text-4xl font-bold text-[#0F1729] tracking-tight">
                          ₹{currentOfferPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-slate-400 line-through text-lg font-normal">
                          ₹{currentMRP.toLocaleString("en-IN")}
                        </span>
                        <span className="bg-[#16a34a]/10 border border-[#16a34a]/30 text-[#16a34a] text-xs font-bold px-2.5 py-0.5 rounded-full font-open-sans">
                          {savingsPercentage}% OFF
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-open-sans text-xs sm:text-[13px] flex-wrap">
                        <span className="text-slate-500 font-medium">Delivery Fee:</span>
                        <span className="text-red-500 line-through font-semibold">₹1,500</span>
                        <span className="bg-[#16a34a] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                          FREE Delivery
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-slate-100 my-2" />

                    {/* Vacuum Package Option Selector (Without Vacuum vs With Vacuum) */}
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[#0F1729] mb-2 font-open-sans">
                        Select Variant / Package:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                        {/* Option 1: Without Vacuum */}
                        <button
                          type="button"
                          onClick={() => setSelectedVacuumOption("without")}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            selectedVacuumOption === "without"
                              ? "border-[#0066cc] bg-blue-50/60 ring-1 ring-[#0066cc]"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs sm:text-[13px] text-slate-900 font-montserrat">
                              Without Vacuum
                            </span>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              selectedVacuumOption === "without" ? "border-[#0066cc] bg-[#0066cc]" : "border-slate-300"
                            }`}>
                              {selectedVacuumOption === "without" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                          </div>
                          <div className="mt-1 flex items-baseline gap-1.5 font-open-sans">
                            <span className="text-sm font-bold text-slate-900">₹35,999</span>
                            <span className="text-[11px] text-slate-400 line-through">₹47,999</span>
                          </div>
                          <span className="text-[10.5px] font-bold text-emerald-600 mt-0.5 font-open-sans">Save ₹12,000 | 25% OFF</span>
                        </button>

                        {/* Option 2: With Vacuum */}
                        <button
                          type="button"
                          onClick={() => setSelectedVacuumOption("with")}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                            selectedVacuumOption === "with"
                              ? "border-[#0066cc] bg-blue-50/60 ring-1 ring-[#0066cc]"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <span className="absolute -top-2.5 right-3 z-10 bg-[#0066cc] text-white text-[9.5px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 font-montserrat select-none">
                            <Star size={10} fill="#f59e0b" strokeWidth={0} className="text-[#f59e0b] shrink-0" />
                            <span>RECOMMENDED</span>
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs sm:text-[13px] text-slate-900 font-montserrat">
                              With Vacuum
                            </span>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              selectedVacuumOption === "with" ? "border-[#0066cc] bg-[#0066cc]" : "border-slate-300"
                            }`}>
                              {selectedVacuumOption === "with" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                          </div>
                          <div className="mt-1 flex items-baseline gap-1.5 font-open-sans">
                            <span className="text-sm font-bold text-slate-900">₹37,999</span>
                            <span className="text-[11px] text-slate-400 line-through">₹51,350</span>
                          </div>
                          <span className="text-[10.5px] font-bold text-emerald-600 mt-0.5 font-open-sans">Save ₹13,351 | 26% OFF</span>
                        </button>
                      </div>

                      {/* Savings Upsell Highlight Pill - Shown ONLY when With Vacuum option is selected */}
                      {selectedVacuumOption === "with" && (
                        <div className="mt-3 p-2.5 sm:p-3 bg-[#eafaf1] border border-[#bbf2d7] rounded-2xl flex items-center justify-between gap-2.5 text-[11px] xs:text-xs sm:text-[12.5px] font-open-sans shadow-2xs animate-in fade-in duration-150">
                          <div className="text-[#0e5235] font-bold leading-tight">
                            With Vacuum you are saving <span className="font-extrabold text-[#057a4a]">₹1,351/-</span> more!
                          </div>
                          <div className="bg-[#00965e] text-white px-2.5 py-1 rounded-xl font-extrabold text-[9.5px] sm:text-[10px] tracking-wider uppercase whitespace-nowrap shrink-0 font-montserrat shadow-xs">
                            BEST VALUE
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full h-px bg-slate-100 my-2" />

                    {/* Color Selector */}
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[#0F1729] mb-2 font-open-sans flex items-center gap-2">
                        <span>
                          Color: <strong className="font-medium text-slate-800">{currentColor.name}</strong>
                        </span>
                        {!currentColor.inStock && (
                          <span className="text-red-600 bg-red-50 border border-red-200 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-3 py-0.5">
                        {PRODUCT_DATA.colors.map((c, idx) => (
                          <button
                            key={c.name}
                            onClick={() => handleColorChange(idx)}
                            className={`relative w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-[12px] p-[3px] bg-white transition-colors cursor-pointer flex items-center justify-center ${
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

                    <div className="w-full h-px bg-slate-100 my-2" />

                    {/* Quantity Stepper & Deliver within 4-6 Days (Same Row) */}
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      {/* Quantity Stepper */}
                      <div
                        className={`inline-flex items-center bg-[#f1f5f9] rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 transition-opacity ${
                          !currentColor.inStock ? "opacity-40 pointer-events-none" : ""
                        }`}
                      >
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1 || !currentColor.inStock}
                          className="text-slate-700 hover:text-slate-950 font-bold px-2 py-0.5 text-base disabled:opacity-30 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <span className="px-3 text-sm font-bold text-slate-900 min-w-[20px] text-center select-none">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= MAX_QUANTITY_LIMIT || !currentColor.inStock}
                          className="text-slate-700 hover:text-slate-950 font-bold px-2 py-0.5 text-base disabled:opacity-30 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          &#43;
                        </button>
                      </div>

                      {/* Delivery Info on right side */}
                      <div className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-800 font-semibold font-open-sans">
                        <Image
                          src="/aquaforceforautocare/images/TRUCK-03.svg"
                          alt="Express Delivery Truck"
                          width={36}
                          height={36}
                          className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 object-contain"
                        />
                        <span>Express delivery within 4-6 Days</span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-slate-100 my-2" />

                    {/* 1. Warranty & Returns */}
                    <div ref={replacementRef} className="space-y-2 pt-0.5 scroll-mt-4">
                      <h3 className="font-semibold text-xs sm:text-sm text-[#0F1729] font-open-sans">
                        Warranty &amp; Returns
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-600 font-open-sans">
                        <li className="flex items-center gap-2">
                          <span className="text-slate-400 font-normal">-</span>
                          <span>1- year limited warranty on the product + 2-Years of Service Support</span>
                        </li>
                        <li className="space-y-2">
                          <button
                            type="button"
                            onClick={() => toggleSection(setIsReplacementOpen, replacementRef)}
                            className="flex items-center justify-between w-full text-left text-xs text-slate-600 hover:text-slate-900 font-normal font-open-sans cursor-pointer group py-0.5"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-slate-400 font-normal">-</span>
                              <span className="font-normal text-slate-600">10 Days Replacement by Brand</span>
                            </span>
                            <ChevronDown
                              size={14}
                              className={`text-slate-500 transition-transform duration-200 ${
                                isReplacementOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isReplacementOpen && (
                            <div className="space-y-4 text-xs sm:text-[13px] font-open-sans animate-in fade-in duration-150 pt-2 text-slate-800 border-t border-slate-100 mt-2">
                              {/* Clean Amazon-Style Replacement Table */}
                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
                                  <thead>
                                    <tr className="border-b border-slate-300 text-slate-900 font-bold font-open-sans">
                                      <th className="py-2.5 pr-3 font-bold text-slate-900 w-2/5">Replacement Reason</th>
                                      <th className="py-2.5 px-3 font-bold text-slate-900 w-3/10">Replacement Period</th>
                                      <th className="py-2.5 pl-3 font-bold text-slate-900 w-3/10">Replacement Policy</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-200">
                                    <tr>
                                      <td className="py-3 pr-3 text-slate-800 font-medium leading-snug">Physical Damage, Wrong and Missing Item</td>
                                      <td className="py-3 px-3 text-slate-700 font-normal">10 days from delivery</td>
                                      <td className="py-3 pl-3 text-slate-800 font-medium">Replacement</td>
                                    </tr>
                                    <tr>
                                      <td className="py-3 pr-3 text-slate-800 font-medium leading-snug">Defective Item</td>
                                      <td className="py-3 px-3 text-slate-700 font-normal">10 days from delivery</td>
                                      <td className="py-3 pl-3 text-slate-800 font-medium leading-snug">PROMEC warranty policy (Repair/Replacement by PROMEC)</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              <div className="w-full h-px bg-slate-200 my-3" />

                              {/* Info Section with Blue Icon */}
                              <div className="flex items-start gap-2.5">
                                <Info size={18} className="text-[#0066cc] shrink-0 mt-0.5" />
                                <div className="space-y-2 text-xs sm:text-[13px] text-slate-800">
                                  <div>
                                    <strong className="font-bold text-slate-900">Defective item:</strong>
                                    <ul className="pl-4 space-y-1 mt-1 text-slate-700 list-disc">
                                      <li>PROMEC will provide On-call support followed by a Technician inspection at your location.</li>
                                      <li>PROMEC expert will repair the product or provide a replacement as applicable. The time taken for resolution will be as per PROMEC policies.</li>
                                    </ul>
                                  </div>

                                  <div className="pt-1">
                                    <strong className="font-bold text-slate-900">Physical Damage, Wrong, Missing Items:</strong>
                                    <ul className="pl-4 space-y-1 mt-1 text-slate-700 list-disc">
                                      <li>Returns will not be accepted if it is an Open Box Delivery order.</li>
                                      <li>Remote verification by image/video will be done by PROMEC</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* Know More Sub-Section */}
                              <div className="pt-2 space-y-4">
                                <button
                                  type="button"
                                  onClick={() => setIsKnowMoreOpen((prev) => !prev)}
                                  className="font-semibold text-xs text-[#0066cc] flex items-center gap-1 cursor-pointer hover:underline select-none"
                                >
                                  <span>Know More</span>
                                  {isKnowMoreOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>

                                {isKnowMoreOpen && (
                                  <div className="space-y-4 animate-in fade-in duration-150 pt-1">
                                    {/* Replacement verification Card */}
                                    <div className="space-y-1.5">
                                      <h4 className="font-bold text-sm text-slate-900 font-open-sans">Replacement verification</h4>
                                      <div className="flex items-start gap-3.5 pt-1">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/80">
                                          <Headphones size={28} className="text-slate-700 stroke-[1.5]" />
                                        </div>
                                        <p className="text-xs sm:text-[12.5px] text-slate-700 leading-relaxed font-open-sans">
                                          During on-call support, you may be prompted to upload an image for verification. Further inspection or repair will be done at your doorstep by PROMEC as per their warranty policies.
                                        </p>
                                      </div>
                                    </div>

                                    {/* Replacement Instructions Card */}
                                    <div className="space-y-1.5 pt-1">
                                      <h4 className="font-bold text-sm text-slate-900 font-open-sans">Replacement Instructions</h4>
                                      <div className="flex items-start gap-3.5 pt-1">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/80">
                                          <PackageCheck size={28} className="text-slate-700 stroke-[1.5]" />
                                        </div>
                                        <p className="text-xs sm:text-[12.5px] text-slate-700 leading-relaxed font-open-sans">
                                          Keep the item in its original condition and packaging along with MRP tag, warranty card and accessories for a successful pick-up.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>

                    <div className="w-full h-px bg-slate-100 my-4" />

                    {/* 2. Product Highlights (Accordion) */}
                    <div ref={highlightsRef} className="space-y-2.5 pt-0.5 scroll-mt-4">
                      <button
                        type="button"
                        onClick={() => toggleSection(setIsHighlightsOpen, highlightsRef)}
                        className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-[15px] text-[#0F1729] font-open-sans cursor-pointer group"
                      >
                        <span>Product Highlights</span>
                        <ChevronDown
                          size={16}
                          className={`text-slate-500 transition-transform duration-200 ${
                            isHighlightsOpen ? "rotate-180" : ""
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
                    <div ref={specsRef} className="space-y-3 pt-1 scroll-mt-4">
                      <button
                        type="button"
                        onClick={() => toggleSection(setIsSpecsOpen, specsRef)}
                        className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-[15px] text-[#0F1729] font-open-sans cursor-pointer group"
                      >
                        <span>Technical Specifications</span>
                        <ChevronDown
                          size={16}
                          className={`text-slate-500 transition-transform duration-200 ${
                            isSpecsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isSpecsOpen && (
                        <div className="space-y-3 text-xs sm:text-[13px] font-open-sans animate-in fade-in duration-150 pt-1">
                          <div className="grid grid-cols-12 gap-3 items-start">
                            <div className="col-span-5 sm:col-span-4 text-slate-800 font-medium">Water Pressure &amp; Flow Rate</div>
                            <div className="col-span-7 sm:col-span-8 text-slate-500">&gt;1,400 PSI pressure and 7 L/min flow rate for powerful cleaning</div>
                          </div>

                          <div className="grid grid-cols-12 gap-3 items-start">
                            <div className="col-span-5 sm:col-span-4 text-slate-800 font-medium">Vacuum Suction Power</div>
                            <div className="col-span-7 sm:col-span-8 text-slate-500">&gt;12 kPa suction pressure to easily pick up dirt and debris</div>
                          </div>

                          <div className="grid grid-cols-12 gap-3 items-start">
                            <div className="col-span-5 sm:col-span-4 text-slate-800 font-medium">Ultra-Quiet Operation</div>
                            <div className="col-span-7 sm:col-span-8 text-slate-500">noise levels kept low at 40–52 dBA for the pressure washer and 45–58 dBA for the vacuum</div>
                          </div>

                          <div className="grid grid-cols-12 gap-3 items-start">
                            <div className="col-span-5 sm:col-span-4 text-slate-800 font-medium">Power &amp; Performance</div>
                            <div className="col-span-7 sm:col-span-8 text-slate-500">580 W rated power for the pressure washer and 450 W for the vacuum cleaner</div>
                          </div>

                          <div className="grid grid-cols-12 gap-3 items-start">
                            <div className="col-span-5 sm:col-span-4 text-slate-800 font-medium">Hose &amp; Cable Reach</div>
                            <div className="col-span-7 sm:col-span-8 text-slate-500">includes a 22 ft washer hose and a 20 ft (6 m) vacuum cable for convenient movement</div>
                          </div>

                          <div className="grid grid-cols-12 gap-3 items-start">
                            <div className="col-span-5 sm:col-span-4 text-slate-800 font-medium">Fast &amp; Safe Charging</div>
                            <div className="col-span-7 sm:col-span-8 text-slate-500">84V / 6A charger with multi-layer safety protections (short circuit, over-voltage, over-temperature)</div>
                          </div>

                          <div className="grid grid-cols-12 gap-3 items-start">
                            <div className="col-span-5 sm:col-span-4 text-slate-800 font-medium">Total Kit Weight</div>
                            <div className="col-span-7 sm:col-span-8 text-slate-500">8 kg complete kit weight (6 kg washer, 2 kg vacuum)</div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full h-px bg-slate-100 my-4" />

                    {/* 4. What's In The Box (Accordion) */}
                    <div ref={boxRef} className="space-y-3 pt-1 pb-2 scroll-mt-4">
                      <button
                        type="button"
                        onClick={() => toggleSection(setIsBoxOpen, boxRef)}
                        className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-[15px] text-[#0F1729] font-open-sans cursor-pointer group"
                      >
                        <span>What&apos;s In The Box</span>
                        <ChevronDown
                          size={16}
                          className={`text-slate-500 transition-transform duration-200 ${
                            isBoxOpen ? "rotate-180" : ""
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
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Desktop Bottom Buy Now Action Button */}
                  <div className="hidden lg:block shrink-0 pt-3 border-t border-slate-100 mt-2">
                    {currentColor.inStock ? (
                      <button
                        onClick={() => setIsCheckingOut(true)}
                        className="w-full h-12 sm:h-12.5 bg-[#0066cc] hover:bg-[#0055b3] active:bg-[#004799] text-white font-bold font-montserrat text-sm tracking-wider uppercase rounded-[8px] shadow-[0_6px_18px_rgba(0,102,204,0.28)] transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
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
            </div>

            {/* Mobile Bottom Buy Now Bar (Pinned at bottom of full-screen page, NO text below) */}
            <div
              style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom, 0px))" }}
              className="block lg:hidden shrink-0 bg-white border-t border-slate-100 px-4 pt-3.5 sm:px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-20"
            >
              {currentColor.inStock ? (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full h-12 bg-[#0066cc] hover:bg-[#0055b3] active:bg-[#004799] text-white font-bold font-montserrat text-sm tracking-wider uppercase rounded-[8px] shadow-[0_6px_18px_rgba(0,102,204,0.28)] transition-all active:scale-[0.99] cursor-pointer"
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
          </>
        )}
      </div>
    </div>
  );
}
