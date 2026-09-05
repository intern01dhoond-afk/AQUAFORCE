"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Star, Truck, RotateCcw, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Lock, FileText, ChevronDown, ChevronUp, Share2, Gift, Check, Info, Headphones, PackageCheck, Smartphone, Zap, CreditCard, Sparkles } from "lucide-react";
import EmiCalculatorModal from "./EmiCalculatorModal";

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

const PaymentCardIcon = ({ className = "w-8 h-8 sm:w-9 sm:h-9 shrink-0" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.84383 16.6676C6.40667 16.6556 7.00501 16.6653 7.56977 16.6653L10.8494 16.6653L20.6965 16.6656L27.0415 16.6654L29.0742 16.6654C29.4569 16.6654 29.9152 16.6538 30.2918 16.6762C30.2773 16.8284 30.2865 17.1254 30.2865 17.289V18.5046L30.2864 21.7129C30.2864 22.2698 30.2918 22.8271 30.2845 23.3838C30.2747 24.1237 29.9503 24.7729 29.4167 25.2728C29.1424 25.516 28.8683 25.6911 28.5226 25.8202C28.2573 25.918 27.979 25.9759 27.6967 25.992C27.3356 26.0125 26.8682 25.9994 26.497 25.9992L24.337 25.9985L17.6831 25.9986L11.4454 25.9988L9.41709 25.9995C9.06738 25.9995 8.62386 26.0123 8.28372 25.9906C7.9311 25.9675 7.58572 25.8798 7.26488 25.7317C6.61743 25.432 6.11432 24.889 5.86476 24.2206C5.65805 23.6533 5.70471 22.978 5.7053 22.3784L5.70592 20.7099L5.70528 17.7855C5.70527 17.4585 5.71354 17.1304 5.69753 16.8042C5.69552 16.7632 5.70498 16.7346 5.72218 16.6981C5.77069 16.6606 5.76947 16.673 5.84383 16.6676ZM27.5488 23.9899C28.2639 23.9164 28.2526 23.4268 28.2438 22.8569C28.236 22.3431 28.2588 21.8201 28.233 21.3062C28.1875 20.5529 27.4004 20.6645 26.8622 20.6648L25.5173 20.6655L24.2003 20.6651C24.0229 20.6649 23.6677 20.6543 23.5059 20.6713C22.7755 20.7279 22.7804 21.1361 22.7796 21.7236L22.7791 22.4413C22.7791 22.7391 22.7595 23.0921 22.7888 23.3831C22.8556 24.0482 23.48 23.9932 23.9725 23.9933H24.8965C25.7498 23.9931 26.7013 24.0132 27.5488 23.9899Z"
      fill="#005DA6"
    />
    <path
      d="M8.35485 10.0127C8.67943 10.0009 9.06545 10.0098 9.39417 10.0098H11.3222L17.2059 10.0099L24.0588 10.0099L26.3378 10.0094C27.5517 10.0093 28.6452 9.87624 29.5674 10.8712C30.1954 11.5488 30.2877 12.1413 30.2877 13.0254C30.2897 13.2942 30.2868 13.5631 30.2792 13.8319C29.4134 13.8505 28.4975 13.8357 27.6278 13.8357L12.8873 13.8356L8.02685 13.8356L6.36726 13.8371C6.16022 13.8374 5.90361 13.8258 5.70436 13.8329C5.71304 12.6925 5.57019 11.8004 6.41791 10.8802C6.92548 10.3292 7.61096 10.0448 8.35485 10.0127Z"
      fill="#005DA6"
    />
  </svg>
);

const CodPaymentIcon = ({ className = "w-8 h-8 sm:w-9 sm:h-9 shrink-0" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 19.0367C6.04955 18.8906 6.04734 18.5055 6.06803 18.3282C6.18976 17.2849 6.4434 16.3058 6.86209 15.3403C7.7873 13.1932 9.40162 11.4155 11.45 10.2884C12.2796 9.84244 13.1623 9.50327 14.0771 9.27892C14.3582 9.21278 14.7174 9.1542 15.005 9.10303L15.0066 16.9395L15.0066 19.1818L15.0058 19.8694C15.0057 20.0118 15.0006 20.1938 15.0165 20.332C15.0369 20.4992 15.1131 20.6544 15.2329 20.7727C15.4613 20.9967 15.7066 20.9924 16.0084 20.9914C16.2116 20.9908 16.4168 20.9903 16.6203 20.9901L18.4273 20.99H24.0409L25.8568 20.9901C26.1745 20.9901 26.5894 20.9791 26.9008 20.9982C26.8817 21.0824 26.8645 21.1682 26.8497 21.2533C26.7589 21.7792 26.6352 22.3114 26.466 22.8186C25.6676 25.1776 24.0666 27.1818 21.942 28.4815C21.8191 28.5582 21.658 28.6417 21.5295 28.7121C20.696 29.1738 19.8012 29.5155 18.872 29.7269C18.4125 29.8344 17.9811 29.9054 17.5101 29.9516C17.363 29.966 17.0943 29.9564 16.963 29.9999H15.8839C15.8125 29.9732 15.7069 29.967 15.6293 29.9608C14.2854 29.8522 12.9771 29.488 11.7706 28.8721C9.12736 27.5356 7.16986 25.1468 6.37869 22.2925C6.27464 21.9211 6.16953 21.4437 6.11616 21.0573C6.09543 20.9078 6.07727 20.7579 6.0617 20.6077C6.05018 20.4856 6.04098 20.2348 6 20.1271V19.0367Z"
      fill="#005DA6"
    />
    <path
      d="M17.1005 6H17.5119C17.5843 6.02684 17.699 6.03435 17.779 6.04048C18.0561 6.06172 18.3322 6.09948 18.607 6.1411C19.1896 6.23348 19.7658 6.36331 20.3318 6.52979C23.8972 7.58574 26.872 10.0602 28.5596 13.3736C29.149 14.5353 29.5667 15.7763 29.7995 17.058C29.8717 17.4683 29.9316 17.876 29.9638 18.2919C29.9693 18.3638 29.9761 18.4542 29.9998 18.522V18.8782C29.9351 19.0274 29.9034 19.1291 29.79 19.2525C29.539 19.5259 29.2257 19.497 28.8876 19.4972L28.2389 19.4971L26.0279 19.4965H19.7122H17.6396C17.2803 19.4965 16.8583 19.4856 16.5039 19.5011C16.5213 19.1575 16.5074 18.6983 16.5074 18.3448L16.5075 16.1264L16.5075 9.36869L16.507 7.68138C16.5069 7.38106 16.4804 6.79996 16.5497 6.52764C16.6314 6.20613 16.8546 6.1308 17.0917 6.00476L17.1005 6ZM18.0059 17.9875C18.1503 17.9774 18.3274 17.9873 18.4763 17.9876L19.4305 17.9879L22.4411 17.9878H26.4027L27.7187 17.9879C27.9354 17.9879 28.2021 17.9814 28.4166 17.9903C28.4199 17.9153 28.3749 17.7085 28.3627 17.6245C28.3169 17.3093 28.2651 17.0259 28.1886 16.7169C28.056 16.1809 27.8847 15.5842 27.6783 15.0696C27.1617 13.7806 26.3818 12.4926 25.4438 11.4688C25.0819 11.0659 24.6949 10.6865 24.2846 10.333C23.172 9.3915 21.8968 8.66109 20.5217 8.1777C20.0186 8.00362 19.4418 7.82203 18.9179 7.72764C18.7196 7.69383 18.5211 7.66119 18.3224 7.62973C18.2496 7.61812 18.0727 7.59458 18.0115 7.57348C17.9968 8.46329 18.0085 9.38369 18.0085 10.2753L18.0087 15.287V17.0205C18.0087 17.3361 18.0147 17.6736 18.0059 17.9875Z"
      fill="#005DA6"
    />
    <path
      d="M20.6674 10.7035C20.905 10.7019 21.1427 10.7016 21.3803 10.7025L22.6246 10.7017L23.2746 10.7017L23.4742 10.7017C23.6186 10.7017 23.7332 10.6994 23.8326 10.8236C23.8862 10.8914 23.9102 10.9778 23.8992 11.0634C23.8887 11.1486 23.8444 11.226 23.7763 11.2781C23.6732 11.3577 23.5784 11.3476 23.4554 11.3476L23.2035 11.3475L23.037 11.3475C23.0024 11.3475 22.958 11.349 22.9244 11.3447C23.0977 11.6091 23.1698 11.8353 23.2213 12.1428C23.2684 12.1464 23.3173 12.1435 23.3645 12.1448C23.5309 12.1494 23.6912 12.1127 23.8171 12.2487C23.8753 12.312 23.9057 12.396 23.9014 12.4819C23.8975 12.5672 23.8597 12.6474 23.7964 12.7047C23.6563 12.8312 23.4904 12.7776 23.3201 12.7894C23.2892 12.7915 23.2492 12.7905 23.2181 12.7889L23.2177 12.7918C23.15 13.2387 22.9265 13.6901 22.5568 13.962C22.3566 14.111 22.1167 14.1972 21.8675 14.21C21.7681 14.216 21.6353 14.2125 21.5335 14.2123L21.3365 14.2118C21.2987 14.2117 21.2489 14.2138 21.2128 14.2083C21.3623 14.4023 21.5282 14.602 21.6823 14.7935L22.5423 15.8621L22.8896 16.2935C22.9086 16.317 22.9278 16.3406 22.9466 16.3642C23.0374 16.4783 23.1215 16.5541 23.1075 16.7118C23.0996 16.7963 23.0584 16.8742 22.9928 16.9281C22.9271 16.9831 22.8418 17.0091 22.7566 16.9999C22.5882 16.9833 22.5235 16.8572 22.4243 16.7393C22.4067 16.7185 22.39 16.6967 22.3729 16.6754L21.9875 16.1969C21.8524 16.0226 21.7034 15.8432 21.5647 15.6709L20.7584 14.669L20.4438 14.2778C20.3974 14.2206 20.3 14.1068 20.2663 14.0506C20.2222 13.9785 20.2095 13.8916 20.231 13.8098C20.2586 13.703 20.3378 13.6141 20.4426 13.5824C20.5188 13.5593 20.6773 13.5664 20.7621 13.5664L21.4756 13.5666C21.5852 13.5666 21.7873 13.5726 21.8865 13.5567C21.9743 13.5424 22.0584 13.5114 22.1345 13.4654C22.3865 13.3139 22.4992 13.0615 22.5661 12.7896L20.9627 12.7891L20.5138 12.7892C20.4533 12.7892 20.3247 12.7926 20.2699 12.7842C20.2039 12.7736 20.1429 12.7426 20.0954 12.6956C20.0342 12.6345 19.9998 12.5516 20 12.4651C20.001 12.3778 20.0369 12.2944 20.0996 12.2337C20.1641 12.1717 20.2445 12.1449 20.3325 12.145C20.3993 12.145 20.4663 12.1446 20.5331 12.1447L21.0265 12.1447L22.0314 12.1447C22.2101 12.1447 22.3951 12.142 22.5729 12.1454C22.5666 12.126 22.5624 12.1029 22.5576 12.0828C22.5138 11.9006 22.4326 11.7263 22.2996 11.5911C22.196 11.485 22.0647 11.4102 21.9206 11.3752C21.7941 11.3433 21.7019 11.3472 21.5741 11.3474L21.3312 11.3476L20.6054 11.3476C20.5027 11.3476 20.3431 11.356 20.2455 11.3363C20.109 11.3086 20.0056 11.174 20.0021 11.0329C19.9996 10.9455 20.0328 10.8609 20.0942 10.7986C20.1969 10.6933 20.3131 10.7038 20.4463 10.7041C20.52 10.7047 20.5937 10.7046 20.6674 10.7035Z"
      fill="#005DA6"
    />
  </svg>
);

const getApiPath = (endpoint: string) => {
  const clean = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `/aquaforceforautocare${clean}`;
};

const PRODUCT_DATA = {
  name: "Cordless AquaForce® 1400 High-pressure Washer System",
  description:
    "The Aquaforce® 1400 is a powerful, battery-powered portable pressure washer. No cables, no power sockets, no fixed setup needed.",
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
        "/aquaforceforautocare/images/products/yellow/1.webp",
        "/aquaforceforautocare/images/products/yellow/2.webp",
        "/aquaforceforautocare/images/products/yellow/3.webp",
        "/aquaforceforautocare/images/products/yellow/4.webp",
        "/aquaforceforautocare/images/products/yellow/5.webp",
        "/aquaforceforautocare/images/products/yellow/6.webp",
        "/aquaforceforautocare/images/products/yellow/7.webp",
        "/aquaforceforautocare/images/products/yellow/8.webp",
        "/aquaforceforautocare/images/products/yellow/9.webp",
        "/aquaforceforautocare/images/products/yellow/10.webp",
        "/aquaforceforautocare/images/products/yellow/11.webp",
      ],
    },
    {
      name: "Blue",
      hex: "#0066cc",
      inStock: false,
      images: [
        "/aquaforceforautocare/images/products/blue/1.webp",
        "/aquaforceforautocare/images/products/blue/2.webp",
        "/aquaforceforautocare/images/products/blue/3.webp",
        "/aquaforceforautocare/images/products/blue/4.webp",
        "/aquaforceforautocare/images/products/blue/5.webp",
        "/aquaforceforautocare/images/products/blue/6.webp",
        "/aquaforceforautocare/images/products/blue/7.webp",
        "/aquaforceforautocare/images/products/blue/8.webp",
        "/aquaforceforautocare/images/products/blue/9.webp",
        "/aquaforceforautocare/images/products/blue/10.webp",
        "/aquaforceforautocare/images/products/blue/11.webp",
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
  const [isFullReturnPolicyOpen, setIsFullReturnPolicyOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"FULL_ONLINE" | "10_PERCENT_COD">("10_PERCENT_COD");
  const [isCodSuccess, setIsCodSuccess] = useState(false);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [delhiveryCodAvailable, setDelhiveryCodAvailable] = useState<boolean | null>(null);

  // Dynamic Pricing Calculations
  const currentOfferPrice = selectedVacuumOption === "without" ? 35999 : 37999;
  const currentMRP = selectedVacuumOption === "without" ? 47999 : 51350;
  const unitSavings = currentMRP - currentOfferPrice;
  const totalPrice = currentOfferPrice * quantity;
  const totalMRP = currentMRP * quantity;
  const totalSavings = unitSavings * quantity;
  const savingsPercentage = Math.round((unitSavings / currentMRP) * 100);
  const taxAmount = Math.round(((totalPrice * 18) / 118) * 100) / 100;

  // 10% Cash on Delivery calculations
  const advanceAmount = Math.floor(totalPrice * 0.10);
  const codBalance = totalPrice - advanceAmount;
  const payableAmount = paymentMethod === "10_PERCENT_COD" ? advanceAmount : totalPrice;

  const handleShareReferral = () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href.split("?")[0] : "https://promectools.in";
    const shareUrl = `${currentUrl}?ref=FRIEND1000`;
    if (navigator.share) {
      navigator
        .share({
          title: "AQUAFORCE® 1400 Cordless Pressure Washer",
          text: "Check out the AQUAFORCE® 1400 Cordless High-Pressure Washer! Use my referral link for ₹1,000 extra credit.",
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopiedReferral(true);
      setTimeout(() => setCopiedReferral(false), 2500);
    }
  };

  // Section Refs for Auto-Scrolling on Accordion Open
  const modalCardRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const replacementRef = useRef<HTMLDivElement>(null);
  const returnPolicyRef = useRef<HTMLDivElement>(null);
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
    altPhone: "",
    deliveryAddress: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
    agreedToTerms: true,
  });

  const [formErrors, setFormErrors] = useState<{
    phone?: string;
    altPhone?: string;
    email?: string;
    pincode?: string;
  }>({});

  const [isLoadingPincode, setIsLoadingPincode] = useState(false);
  const [delhiveryStatus, setDelhiveryStatus] = useState<{
    serviceable?: boolean;
    cod?: boolean;
    message?: string;
  }>({});

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

  const handleAltPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, altPhone: digitsOnly }));
    if (formErrors.altPhone && (digitsOnly.length === 10 || digitsOnly.length === 0)) {
      setFormErrors((prev) => ({ ...prev, altPhone: undefined }));
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
      setDelhiveryStatus({});
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

        // Live Delhivery Serviceability Check
        const delRes = await fetch(getApiPath(`/api/delhivery/serviceability?pincode=${cleanVal}`));
        const delData = await delRes.json();
        if (delData.success && delData.serviceable) {
          const codOk = delData.cod === true;
          setDelhiveryCodAvailable(codOk);
          setDelhiveryStatus({
            serviceable: true,
            cod: codOk,
            message: codOk
              ? "✓ Delhivery Express: Prepaid & Cash on Delivery Available"
              : "✓ Delhivery Express: Prepaid Delivery Available (COD Not Serviceable)",
          });
        } else if (delData.remarks) {
          setDelhiveryCodAvailable(false);
          setDelhiveryStatus({
            serviceable: false,
            cod: false,
            message: delData.remarks,
          });
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

  // Load Razorpay Magic Checkout Script dynamically
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/magic-checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => {
        // Graceful fallback to standard checkout.js if magic-checkout.js fails
        const fallbackScript = document.createElement("script");
        fallbackScript.src = "https://checkout.razorpay.com/v1/checkout.js";
        fallbackScript.onload = () => resolve(true);
        fallbackScript.onerror = () => resolve(false);
        document.body.appendChild(fallbackScript);
      };
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
    setIsCodSuccess(false);
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
      setIsCodSuccess(false);
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

    const errors: { phone?: string; altPhone?: string; email?: string; pincode?: string } = {};

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      errors.phone = "Please enter a valid 10-digit mobile number";
    }

    const cleanAltPhone = formData.altPhone.replace(/\D/g, "");
    if (cleanAltPhone && cleanAltPhone.length !== 10) {
      errors.altPhone = "Please enter a valid 10-digit mobile number";
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
      const isCod = paymentMethod === "10_PERCENT_COD";
      const chargeAmount = isCod ? advanceAmount : totalAmount;
      const partialCodAmount = advanceAmount;
      const partialCodBalance = codBalance;

      const res = await fetch(getApiPath("/api/razorpay/order"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: chargeAmount,
          notes: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            altPhone: formData.altPhone || "N/A",
            deliveryAddress: formData.deliveryAddress,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            gstNumber: formData.gstNumber || "N/A",
            product: `${PRODUCT_DATA.name} (${currentColor.name}) [${selectedVacuumOption === "without" ? "Without Vacuum" : "With Vacuum"}]`,
            quantity: String(quantity),
            paymentMethod: isCod ? "10% Cash on Delivery" : "Full Online Payment",
            totalOrderAmount: String(totalAmount),
            advanceAmount: String(chargeAmount),
            codBalance: String(isCod ? partialCodBalance : 0),
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

      // 2. Configure Razorpay options with Magic Checkout enabled
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_T8B1ZfO0qV6cTa",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Promec India",
        description: isCod
          ? `10% COD Booking - ${PRODUCT_DATA.name} (${currentColor.name})`
          : `${PRODUCT_DATA.name} (${currentColor.name}) x ${quantity}`,
        order_id: orderData.id,
        one_click_checkout: true, // Enables Razorpay Magic Checkout
        show_coupons: false,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone.startsWith("+91") ? formData.phone : `+91${formData.phone}`,
        },
        notes: {
          order_type: isCod ? "10% Advance COD Booking" : "Full Online Payment",
          total_order_amount: `₹${totalAmount}`,
          advance_amount: `₹${chargeAmount}`,
          balance_on_delivery: `₹${isCod ? partialCodBalance : 0}`,
          pincode: formData.pincode,
          city: formData.city,
        },
        theme: {
          color: "#005a9c",
        },
        handler: async function (response: any) {
          const payId = response.razorpay_payment_id || "";
          setPaymentId(payId);
          setIsProcessingPayment(false);

          let generatedWaybill = "";

          const isCodOrder = paymentMethod === "10_PERCENT_COD" || Boolean(response.is_partial_cod || response.partial_payment);
          setIsCodSuccess(isCodOrder);
          setIsSubmitted(true);
          const advanceAmountPaid = isCodOrder ? partialCodAmount : totalAmount;
          const codBalanceDue = isCodOrder ? partialCodBalance : 0;

          // Automatically Create Shipment Order on Delhivery
          try {
            const delRes = await fetch(getApiPath("/api/delhivery/create-shipment"), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: orderData.id,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                altPhone: formData.altPhone || "N/A",
                deliveryAddress: formData.deliveryAddress,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                product: `${PRODUCT_DATA.name} (${currentColor.name})`,
                quantity: quantity,
                amount: totalAmount,
                paymentMode: isCodOrder ? "COD" : "Pre-paid",
                codAmount: codBalanceDue,
                advanceAmount: advanceAmountPaid,
              }),
            });
            const delData = await delRes.json();
            if (delData?.waybill) {
              generatedWaybill = delData.waybill;
            }
          } catch (delhiveryErr) {
            console.error("Failed to create Delhivery shipment:", delhiveryErr);
          }

          // Record purchase into Google Sheets
          try {
            await fetch(getApiPath("/api/purchase"), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: orderData.id,
                paymentId: payId,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                altPhone: formData.altPhone || "N/A",
                deliveryAddress: formData.deliveryAddress,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                gstNumber: formData.gstNumber || "N/A",
                product: `${PRODUCT_DATA.name} (${currentColor.name})`,
                quantity: quantity,
                amount: totalAmount,
                paymentMethod: isCodOrder ? "10% Cash on Delivery" : "Full Online Payment",
                advanceAmount: advanceAmountPaid,
                codBalance: codBalanceDue,
                waybill: generatedWaybill,
                status: isCodOrder ? "10% Advance Paid - COD Balance Pending" : "Paid & Confirmed",
              }),
            });
          } catch (sheetErr) {
            console.error("Failed to forward purchase to Google Sheets:", sheetErr);
          }

          // Send Email Confirmation from promec.india@gmail.com via SMTP
          try {
            await fetch(getApiPath("/api/send-email"), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: formData.email,
                fullName: formData.fullName,
                orderId: orderData.id,
                paymentId: payId,
                product: `${PRODUCT_DATA.name} (${currentColor.name})`,
                amount: totalAmount,
                deliveryAddress: formData.deliveryAddress,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                altPhone: formData.altPhone || "N/A",
                paymentMethod: isCodOrder ? "10% Cash on Delivery" : "Full Online Payment",
                advanceAmount: advanceAmountPaid,
                codBalance: codBalanceDue,
                waybill: generatedWaybill,
              }),
            });
          } catch (emailErr) {
            console.error("Failed to send email confirmation:", emailErr);
          }

          // Send SMS Confirmation via YourBulkSMS (http://control.yourbulksms.com/)
          try {
            await fetch(getApiPath("/api/send-sms"), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                phone: formData.phone,
                fullName: formData.fullName,
                orderId: orderData.id,
                amount: advanceAmountPaid,
                product: isCodOrder
                  ? `${PRODUCT_DATA.name} (10% COD Booking - Balance Rs.${codBalanceDue.toLocaleString("en-IN")})`
                  : `${PRODUCT_DATA.name} (${currentColor.name})`,
              }),
            });
          } catch (smsErr) {
            console.error("Failed to send SMS confirmation:", smsErr);
          }

          // Track Meta Pixel Purchase event
          if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq("track", "Purchase", {
              value: advanceAmountPaid,
              currency: "INR",
              content_name: `${PRODUCT_DATA.name} (${currentColor.name})`,
              content_type: "product",
              num_items: quantity,
            });
          }

          // Redirect to dedicated Thank You confirmation page with a short delay
          setTimeout(() => {
            const targetThankYou = window.location.pathname.startsWith("/aquaforceforautocare")
              ? "/aquaforceforautocare/thank-you"
              : "/thank-you";
            window.location.href = `${targetThankYou}?payment_id=${encodeURIComponent(payId)}&order_id=${encodeURIComponent(orderData.id)}&amount=${encodeURIComponent(advanceAmountPaid)}&total_amount=${encodeURIComponent(totalAmount)}&cod_balance=${encodeURIComponent(codBalanceDue)}&name=${encodeURIComponent(formData.fullName)}&method=${encodeURIComponent(isCodOrder ? "10% Cash on Delivery" : "Full Online Payment")}${generatedWaybill ? `&waybill=${encodeURIComponent(generatedWaybill)}` : ""}`;
          }, 300);
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
          isCheckingOut
            ? "h-full lg:h-auto max-w-full sm:max-w-[720px] md:max-w-[820px] lg:max-w-[900px] xl:max-w-[960px] flex flex-col overflow-hidden max-h-[100dvh] lg:max-h-[92vh] p-0"
            : isSubmitted
            ? "h-full lg:h-auto max-w-full lg:max-w-[600px] p-4 xs:p-5 sm:p-7 md:p-8 overflow-y-auto max-h-none lg:max-h-[90vh]"
            : "h-full lg:h-auto max-w-full lg:max-w-[1040px] flex flex-col overflow-hidden max-h-none lg:max-h-[90vh]"
        } bg-white rounded-none lg:rounded-[24px] shadow-none lg:shadow-2xl border-0 lg:border lg:border-slate-100 z-10 my-0 lg:my-auto overscroll-contain animate-in fade-in duration-200 lg:zoom-in-95`}
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
              Your order for <strong className="text-[#005DA6] font-bold font-open-sans">Aquaforce® 1400</strong> has been confirmed and our
              dispatch team is preparing your package for express delivery.
            </p>

            {/* Summary Details Card */}
            <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[16px] p-4 sm:p-5 mt-5 sm:mt-6 text-left font-open-sans space-y-3 divide-y divide-[#e2e8f0]/80 shadow-2xs">
              {/* Row 1: Product */}
              <div className="flex items-center justify-between text-[13px] pt-0 font-open-sans">
                <span className="text-[#64748b] font-medium font-open-sans">Product</span>
                <span className="text-[#0f172a] font-bold font-open-sans truncate max-w-[180px] sm:max-w-[240px]">
                  Aquaforce® 1400 ({currentColor.name})
                </span>
              </div>

              {/* Row 2: Order Status */}
              <div className="flex items-center justify-between text-[13px] pt-3 font-open-sans">
                <span className="text-[#64748b] font-medium font-open-sans">Order Status</span>
                <span className="bg-[#f0f9ff] border border-[#005DA6]/35 text-[#005DA6] text-xs font-bold font-open-sans px-3 py-0.5 rounded-full leading-none">
                  {isCodSuccess ? "10% Advance Paid • COD Confirmed" : "Paid & Confirmed"}
                </span>
              </div>

              {/* Row 3: Total Amount / Advance */}
              <div className="flex items-center justify-between text-[13px] pt-3 font-open-sans">
                <span className="text-[#64748b] font-medium font-open-sans">
                  {isCodSuccess ? "10% Advance Paid" : "Amount Paid"}
                </span>
                <span className="text-[#0f172a] font-bold font-open-sans tracking-wide">
                  ₹{(isCodSuccess ? advanceAmount : currentOfferPrice * quantity).toLocaleString("en-IN")}
                </span>
              </div>

              {isCodSuccess && (
                <div className="flex items-center justify-between text-[13px] pt-3 font-open-sans bg-amber-50/80 -mx-4 px-4 py-2 rounded-lg border border-amber-200/70">
                  <span className="text-amber-800 font-bold font-open-sans">Balance on Delivery</span>
                  <span className="text-amber-900 font-extrabold font-open-sans tracking-wide">
                    ₹{codBalance.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              {/* Row 4: Contact Number */}
              <div className="flex items-center justify-between text-[13px] pt-3 font-open-sans">
                <span className="text-[#64748b] font-medium font-open-sans">Contact Number</span>
                <span className="text-[#0f172a] font-bold font-open-sans tracking-wide">{formData.phone}</span>
              </div>

              {formData.altPhone && (
                <div className="flex items-center justify-between text-[13px] pt-3 font-open-sans">
                  <span className="text-[#64748b] font-medium font-open-sans">Alt. Contact Number</span>
                  <span className="text-[#0f172a] font-bold font-open-sans tracking-wide">{formData.altPhone}</span>
                </div>
              )}

              {/* Row 5: Payment ID (if available) */}
              {paymentId && (
                <div className="flex items-center justify-between text-[13px] pt-3 font-open-sans">
                  <span className="text-[#64748b] font-medium font-open-sans">Payment ID</span>
                  <span className="text-[#0f172a] font-bold font-mono text-xs truncate max-w-[180px] sm:max-w-[240px]">
                    {paymentId}
                  </span>
                </div>
              )}
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
          /* Exact Delivery Checkout Form Matching Reference Mockups (Desktop & Mobile) */
          <div className="flex flex-col h-full flex-1 overflow-hidden">
            {/* Header row: Back button on left, Close button on right (Fixed Top) */}
            <div className="shrink-0 px-4 sm:px-8 md:px-10 lg:px-12 pt-4 sm:pt-5 pb-3 border-b border-slate-100 flex items-center justify-between bg-white z-20">
              <button
                type="button"
                onClick={handleBackToProduct}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 bg-slate-100/80 hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors focus:outline-none cursor-pointer shadow-2xs shrink-0"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <form
              id="checkout-form"
              onSubmit={handleCheckoutSubmit}
              className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-10 lg:px-12 py-5 sm:py-6 space-y-5 no-scrollbar"
            >
              {/* Section 1: Personal Information */}
              <div>
                <div className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-500 uppercase font-montserrat mb-2.5 sm:mb-3">
                  PERSONAL INFORMATION
                </div>

                <div className="space-y-3 sm:space-y-3.5">
                  {/* Row 1: Full Name & Mobile Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5 font-open-sans">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Rahul Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c] rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5 font-open-sans">
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
                            : "border-slate-200 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
                        } rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans`}
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-[11px] mt-1 font-open-sans font-medium">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email Address & Alternative Mobile Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5 font-open-sans">
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
                            : "border-slate-200 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
                        } rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans`}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-[11px] mt-1 font-open-sans font-medium">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5 font-open-sans">
                        Alt. Mobile Number <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="9876543210"
                        value={formData.altPhone}
                        onChange={handleAltPhoneChange}
                        className={`w-full bg-white border ${
                          formErrors.altPhone
                            ? "border-red-500 ring-1 ring-red-500"
                            : "border-slate-200 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
                        } rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans`}
                      />
                      {formErrors.altPhone && (
                        <p className="text-red-500 text-[11px] mt-1 font-open-sans font-medium">
                          {formErrors.altPhone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="pt-1">
                <div className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-500 uppercase font-montserrat mb-2.5 sm:mb-3">
                  DELIVERY ADDRESS
                </div>

                <div className="space-y-3 sm:space-y-3.5">
                  {/* Complete Delivery Address */}
                  <div>
                    <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5 font-open-sans">
                      Complete Delivery Address
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Street name, house/apartment number"
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      className="w-full bg-white border border-slate-200 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c] rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-none h-[64px] sm:h-[68px] font-open-sans"
                    />
                  </div>

                  {/* Row 3: Pincode (1st), City (2nd), State (3rd) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5 font-open-sans">
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
                              : "border-slate-200 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
                          } rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans`}
                        />
                        {isLoadingPincode && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                            <span className="w-3.5 h-3.5 border-2 border-[#005a9c] border-t-transparent rounded-full animate-spin block" />
                          </div>
                        )}
                      </div>
                      {formErrors.pincode && (
                        <p className="text-red-500 text-[11px] mt-1 font-open-sans font-medium">
                          {formErrors.pincode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5 font-open-sans">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Bengaluru"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c] rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5 font-open-sans">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Karnataka"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-white border border-slate-200 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c] rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans"
                      />
                    </div>
                  </div>

                  {/* GST Number (Optional) */}
                  <div>
                    <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5 font-open-sans">
                      GST Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="E.g. 27AAAAA0000A1Z5"
                      value={formData.gstNumber}
                      onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
                      className="w-full bg-white border border-slate-200 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c] rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-open-sans uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Select Payment Method */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm sm:text-base font-bold text-slate-900 font-montserrat">
                    Select Payment Method:
                  </label>
                  <span className="bg-[#e2f4ec] text-[#0a8961] border border-[#a7f3d0] text-[10px] sm:text-[11.5px] font-bold px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1.5 font-montserrat tracking-tight shrink-0">
                    <Lock size={12} className="text-[#0a8961] shrink-0 stroke-[2.5]" />
                    <span>100% SECURE CHECKOUT</span>
                  </span>
                </div>

                <div className="flex flex-col gap-4 sm:gap-5 font-open-sans">
                  {/* Option 1: 100% Online Payment */}
                  <div
                    onClick={() => setPaymentMethod("FULL_ONLINE")}
                    className={`p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                      paymentMethod === "FULL_ONLINE"
                        ? "border-[#005a9c] ring-1 ring-[#005a9c] bg-white shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
                      <PaymentCardIcon className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 font-montserrat tracking-tight leading-snug">
                          100% Online Payment
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-400 font-normal font-open-sans mt-0.5 leading-snug">
                          UPI, Debit/Credit Cards, Net Banking &amp; EMI options via Razorpay.
                        </p>
                      </div>
                    </div>
                    <span className="text-base sm:text-lg md:text-xl font-bold text-slate-900 font-montserrat shrink-0 whitespace-nowrap">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Option 2: Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod("10_PERCENT_COD")}
                    className={`relative p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                      paymentMethod === "10_PERCENT_COD"
                        ? "border-[#005a9c] ring-1 ring-[#005a9c] bg-white shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    {/* Green Ribbon on Top Border */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center pointer-events-none">
                      <div className="relative bg-[#16a34a] text-white font-montserrat font-bold text-[10.5px] sm:text-xs tracking-tight sm:tracking-normal px-4 sm:px-6 py-0.5 sm:py-1 rounded-b-md shadow-xs whitespace-nowrap">
                        {/* Left triangular fold ear */}
                        <svg className="absolute top-0 -left-2.5 sm:-left-3 w-2.5 sm:w-3 h-3 sm:h-3.5 text-[#147d5a]" viewBox="0 0 12 14" fill="currentColor">
                          <polygon points="12,0 12,14 0,14" />
                        </svg>
                        {/* Right triangular fold ear */}
                        <svg className="absolute top-0 -right-2.5 sm:-right-3 w-2.5 sm:w-3 h-3 sm:h-3.5 text-[#147d5a]" viewBox="0 0 12 14" fill="currentColor">
                          <polygon points="0,0 0,14 12,14" />
                        </svg>
                        Pay Just 10% Now, Rest on Delivery
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
                      <CodPaymentIcon className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 font-montserrat tracking-tight leading-snug">
                          Cash on Delivery
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-400 font-normal font-open-sans mt-0.5 leading-snug">
                          Safe Upfront Payment
                        </p>
                      </div>
                    </div>
                    <span className="text-base sm:text-lg md:text-xl font-bold text-slate-900 font-montserrat shrink-0 whitespace-nowrap">
                      ₹{advanceAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 4: Price Breakdown Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2.5 font-open-sans shadow-2xs">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 font-montserrat uppercase tracking-wide">
                    PRICE BREAKDOWN
                  </span>
                  <span className="bg-blue-50 text-[#005a9c] border border-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full font-open-sans">
                    {selectedVacuumOption === "without" ? "Without Vacuum" : "With Vacuum"}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs sm:text-[13px] font-open-sans">
                  {/* MRP Total */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">MRP Total</span>
                    <span className="text-slate-500 font-normal text-right">₹{totalMRP.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Discount on MRP */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Discount on MRP</span>
                    <span className="text-emerald-600 font-bold text-right">-₹{totalSavings.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 font-bold">Subtotal</span>
                    <span className="text-slate-900 font-bold text-right">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Shipping</span>
                    <div className="flex items-center justify-end gap-1.5 text-right shrink-0">
                      <span className="text-emerald-600 font-bold uppercase">FREE</span>
                      <span className="text-slate-400 line-through font-normal">₹1,500</span>
                    </div>
                  </div>

                  {/* Handling & Packaging Fee */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Handling &amp; Packaging Fee</span>
                    <div className="flex items-center justify-end gap-1.5 text-right shrink-0">
                      <span className="text-emerald-600 font-bold uppercase">FREE</span>
                      <span className="text-slate-400 line-through font-normal">₹550</span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100 my-2" />

                {/* Total Order Value */}
                <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 font-montserrat">
                  <span>Total Order Value</span>
                  <span className="font-extrabold text-base sm:text-lg text-right">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>

                {paymentMethod === "10_PERCENT_COD" && (
                  <div className="pt-2.5 border-t border-slate-100 space-y-2 font-open-sans">
                    <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold text-[#005a9c]">
                      <span>Advance Payable Now (10%)</span>
                      <span className="text-sm font-extrabold text-right">₹{advanceAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold text-slate-700">
                      <span>Balance on Delivery (90% COD)</span>
                      <span className="text-sm font-extrabold text-slate-900 text-right">₹{codBalance.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Savings Banner Pill */}
              <div className="p-3 bg-[#e6fbf2] border border-[#a3f0cb] rounded-xl text-center text-emerald-800 font-bold text-xs sm:text-[13px] font-open-sans flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>You are Saving ₹{totalSavings.toLocaleString("en-IN")} ({savingsPercentage}% OFF) on this order.</span>
              </div>

              {/* Terms Agreement Checkbox */}
              <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none font-open-sans">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer shrink-0"
                  required
                />
                <span className="text-[11.5px] sm:text-xs text-slate-600 font-medium leading-tight">
                  I agree to receive order confirmation &amp; delivery updates via Email and WhatsApp.
                </span>
              </label>
            </form>

            {/* Sticky Bottom Action Bar (in both Desktop & Mobile screens) */}
            <div
              style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
              className="shrink-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 sm:px-8 md:px-10 lg:px-12 pt-3.5 pb-3.5 sm:pb-4 shadow-[0_-6px_20px_rgba(0,0,0,0.06)] z-20"
            >
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessingPayment}
                className="w-full bg-[#005a9c] hover:bg-[#004f8a] active:bg-[#004478] text-white font-bold font-montserrat text-sm sm:text-base tracking-wider py-3.5 sm:py-4 rounded-xl shadow-sm transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed uppercase"
              >
                {isProcessingPayment ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    PROCESSING ORDER...
                  </span>
                ) : paymentMethod === "10_PERCENT_COD" ? (
                  <>
                    <span className="hidden sm:inline">
                      PAY ₹{advanceAmount.toLocaleString("en-IN")} ADVANCE &amp; CONFIRM COD
                    </span>
                    <span className="sm:hidden">
                      PAY ₹{advanceAmount.toLocaleString("en-IN")} ADVANCE
                    </span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">
                      PAY ₹{totalPrice.toLocaleString("en-IN")} &amp; CONFIRM ORDER
                    </span>
                    <span className="sm:hidden">
                      PAY ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </>
                )}
              </button>
            </div>
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-3">
                        {/* Option 1: Without Vacuum */}
                        <button
                          type="button"
                          onClick={() => setSelectedVacuumOption("without")}
                          className={`pt-3.5 pb-3 px-3 sm:px-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            selectedVacuumOption === "without"
                              ? "border-[#0066cc] bg-blue-50/60 ring-1 ring-[#0066cc]"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                            <span className="font-bold text-xs sm:text-[13px] text-slate-900 font-montserrat whitespace-nowrap">
                              Without Vacuum
                            </span>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-1 ${
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
                          className={`pt-3.5 pb-3 px-3 sm:px-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                            selectedVacuumOption === "with"
                              ? "border-[#0066cc] bg-blue-50/60 ring-1 ring-[#0066cc]"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <span className="absolute -top-2.5 right-2.5 sm:right-3 z-10 bg-[#0066cc] text-white text-[9.5px] font-extrabold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 font-montserrat select-none whitespace-nowrap">
                            <Star size={10} fill="#f59e0b" strokeWidth={0} className="text-[#f59e0b] shrink-0" />
                            <span>RECOMMENDED</span>
                          </span>
                          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                            <span className="font-bold text-xs sm:text-[13px] text-slate-900 font-montserrat whitespace-nowrap">
                              With Vacuum
                            </span>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-1 ${
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

                                    {/* Read full returns policy > Link (Toggles Inline Dropdown inside Know More) */}
                                    <div className="pt-3 border-t border-slate-200/80">
                                      <button
                                        type="button"
                                        onClick={() => toggleSection(setIsFullReturnPolicyOpen, returnPolicyRef)}
                                        className="inline-flex items-center gap-1 text-[#0066cc] hover:text-[#0052b3] text-xs sm:text-[13px] font-semibold font-open-sans cursor-pointer hover:underline"
                                      >
                                        <span>Read full returns policy</span>
                                        <ChevronRight
                                          size={14}
                                          className={`stroke-[2.5] transition-transform duration-200 ${
                                            isFullReturnPolicyOpen ? "rotate-90" : ""
                                          }`}
                                        />
                                      </button>

                                      {isFullReturnPolicyOpen && (
                                        <div ref={returnPolicyRef} className="space-y-4 text-xs sm:text-[13px] font-open-sans text-slate-800 animate-in fade-in duration-150 pt-3 leading-relaxed border-t border-slate-100 mt-2">
                                          {/* Preamble Card */}
                                          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-lg text-slate-700 font-medium">
                                            At <strong className="font-bold text-[#0066cc]">AquaForce®</strong>, we ensure that every product is properly checked and packed before dispatch. Returns and refunds are accepted only under the conditions mentioned below.
                                          </div>

                                          {/* Return Period */}
                                          <div className="space-y-1.5 border-b border-slate-100 pb-3">
                                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-open-sans">
                                              Return Period
                                            </h4>
                                            <ul className="pl-4 space-y-1 text-slate-600 list-disc font-open-sans">
                                              <li>Return requests must be raised within <strong>7 days</strong> of delivery.</li>
                                              <li>Returns are accepted only for damaged, defective, incorrect, or incomplete products.</li>
                                            </ul>
                                          </div>

                                          {/* Product Condition */}
                                          <div className="space-y-1.5 border-b border-slate-100 pb-3">
                                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-open-sans">
                                              Product Condition
                                            </h4>
                                            <p className="pl-4 font-semibold text-slate-800 font-open-sans">For a return to be accepted, the product must:</p>
                                            <ul className="pl-8 space-y-1 text-slate-600 list-disc font-open-sans">
                                              <li>Be unused or only tested for the reported issue.</li>
                                              <li>Have no scratches, dents, cracks, stains, or physical damage caused by the customer.</li>
                                              <li>Not be opened, dismantled, repaired, modified, or misused.</li>
                                              <li>Include all original parts, accessories, attachments, manuals, warranty card, and packaging.</li>
                                            </ul>
                                          </div>

                                          {/* Returns Not Accepted */}
                                          <div className="space-y-1.5 border-b border-slate-100 pb-3">
                                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-open-sans">
                                              Returns Not Accepted
                                            </h4>
                                            <p className="pl-4 font-semibold text-slate-800 font-open-sans">Returns will not be accepted for:</p>
                                            <ul className="pl-8 space-y-1 text-slate-600 list-disc font-open-sans">
                                              <li>Customer-caused damage or improper use.</li>
                                              <li>Scratches, dents, cracks, or signs of excessive use.</li>
                                              <li>Missing parts or accessories.</li>
                                              <li>Products that have been opened, modified, repaired, or dismantled.</li>
                                              <li>Normal wear and tear.</li>
                                              <li>Return requests made after the return period.</li>
                                            </ul>
                                          </div>

                                          {/* Unboxing Video */}
                                          <div className="space-y-1.5 border-b border-slate-100 pb-3">
                                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-open-sans">
                                              Unboxing Video
                                            </h4>
                                            <p className="pl-4 text-slate-600 leading-relaxed font-open-sans">
                                              Customers are strongly advised to record a complete unboxing video. It may be required for claims related to transit damage, missing parts, or incorrect products.
                                            </p>
                                          </div>

                                          {/* Return Request */}
                                          <div className="space-y-1.5 border-b border-slate-100 pb-3">
                                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-open-sans">
                                              Return Request
                                            </h4>
                                            <p className="pl-4 font-semibold text-slate-800 font-open-sans">To request a return, contact AquaForce® Customer Support with:</p>
                                            <ul className="pl-8 space-y-1 text-slate-600 list-disc font-open-sans">
                                              <li>Order number</li>
                                              <li>Reason for return</li>
                                              <li>Photos/videos of the product and packaging</li>
                                              <li>Unboxing video, if available</li>
                                            </ul>
                                            <p className="pl-4 text-xs text-slate-500 font-medium italic mt-0.5 font-open-sans">
                                              All return requests are subject to verification and approval.
                                            </p>
                                          </div>

                                          {/* Refund / Replacement */}
                                          <div className="space-y-1.5 border-b border-slate-100 pb-3">
                                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-open-sans">
                                              Refund / Replacement
                                            </h4>
                                            <p className="pl-4 font-semibold text-slate-800 font-open-sans">After inspection and approval:</p>
                                            <ul className="pl-8 space-y-1 text-slate-600 list-disc font-open-sans">
                                              <li>A replacement may be provided where applicable.</li>
                                              <li>If a refund is approved, it will be processed through the applicable payment method.</li>
                                              <li>Refunds may be adjusted for missing parts, customer-caused damage, or other applicable charges.</li>
                                            </ul>
                                          </div>

                                          {/* Warranty */}
                                          <div className="space-y-1.5">
                                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-open-sans">
                                              Warranty
                                            </h4>
                                            <p className="pl-4 text-slate-600 leading-relaxed font-open-sans">
                                              Technical issues reported after the return period may be covered under the manufacturer warranty, subject to warranty terms and conditions.
                                            </p>
                                          </div>

                                          {/* Reserved Rights Banner */}
                                          <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-xs text-amber-900 font-medium leading-relaxed">
                                            AquaForce® reserves the right to approve or reject any return, replacement, or refund request based on product condition and verification.
                                          </div>
                                        </div>
                                      )}
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
                  <div className="hidden lg:block shrink-0 pt-3 pb-1 border-t border-slate-100 mt-2 bg-white/95 backdrop-blur-xs sticky bottom-0 z-20">
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

      {/* Snapmint & All-Bank No-Cost EMI Plans Modal */}
      <EmiCalculatorModal
        isOpen={isEmiModalOpen}
        onClose={() => setIsEmiModalOpen(false)}
        price={currentOfferPrice}
        onSelectEmiOption={(method) => {
          setPaymentMethod(method as any);
          setIsCheckingOut(true);
        }}
      />
    </div>
  );
}
