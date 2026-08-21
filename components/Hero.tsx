"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useOrderModal } from "@/context/OrderModalContext";

const TOTAL_SLIDES = 4;

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openModal } = useOrderModal();

  // Touch Swipe State
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const minSwipeDistance = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      // Swipe left -> Next slide
      setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
    } else if (isRightSwipe) {
      // Swipe right -> Prev slide
      setCurrentSlide((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
    }
  };

  // Auto-advance slides every 4.5 seconds and reset timer on slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
    }, 4500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section
      id="home"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[580px] sm:min-h-[620px] md:min-h-[660px] lg:min-h-[720px] xl:min-h-[780px] 2xl:min-h-[820px] h-[calc(100vh-48px)] max-h-[860px] flex items-center overflow-hidden bg-slate-950 select-none group touch-pan-y"
    >
      {/* ========================================================= */}
      {/* SLIDE 1: Outdoor Patio SUV Foam Washing Scene */}
      {/* ========================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentSlide === 0
            ? "opacity-100 z-10 pointer-events-auto"
            : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        {/* Mobile Background Image */}
        <div className="sm:hidden absolute inset-0 z-0">
          <Image
            src="/images/hero-mobile-v2.png"
            alt="AMEC Aquaforce 1400 Cordless Portable Pressure Washer"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Desktop Background Image */}
        <div className="hidden sm:block absolute inset-0 z-0">
          <Image
            src="/Banner 1 highres.png"
            alt="AMEC Aquaforce 1400 Cordless Portable Pressure Washer car wash outdoor"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center sm:object-[center_35%]"
          />
        </div>

        {/* Mobile Slide 1 Content Overlay */}
        <div className="sm:hidden relative z-10 w-full h-full flex flex-col justify-end px-5 pb-10 pt-20">
          {/* Eyebrow / Kicker */}
          <p className="text-white/85 font-open-sans text-[11px] font-bold tracking-[0.18em] uppercase mb-1.5 drop-shadow">
            CORDLESS. POWERFUL. PORTABLE.
          </p>

          {/* Headline (Exact Figma: Montserrat, 95% line-height, 900 vs 700 weight) */}
          <h1 className="font-montserrat text-[2.75rem] sm:text-[3.5rem] leading-[0.95] tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)]">
            <span className="block font-black text-white">NO POWER.</span>
            <span className="block font-bold text-white/80">NO SOCKET.</span>
          </h1>

          {/* Description */}
          <p className="font-open-sans text-white/90 text-[13px] leading-relaxed font-normal mt-3 max-w-[340px] drop-shadow">
            Wash your car anywhere with the AMEC Aquaforce 1400 - a powerful,
            battery-powered portable pressure washer. No cables, no power
            sockets, no fixed setup needed.
          </p>

          {/* Pricing & Discount */}
          <div className="mt-3.5">
            <span className="inline-block bg-[#18c49e] font-open-sans text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider shadow-xs mb-1">
              24% OFF
            </span>
            <div className="flex items-baseline gap-2.5 font-open-sans">
              <span className="text-white text-3xl font-black tracking-tight drop-shadow">
                ₹37,999
              </span>
              <span className="text-white/60 line-through text-sm font-semibold drop-shadow">
                ₹49,999
              </span>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex flex-col gap-2.5 mt-4 w-full">
            <button
              onClick={openModal}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#005DA6] hover:bg-[#004b87] text-white font-montserrat text-xs font-black tracking-wider uppercase py-3.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
            <a
              href="#features"
              className="w-full inline-flex items-center justify-center border border-white/80 hover:border-white text-white hover:bg-white/10 font-open-sans text-xs font-black tracking-wider uppercase py-3.5 rounded-[4px] transition-all active:scale-[0.98] drop-shadow text-center"
            >
              EXPLORE FEATURES
            </a>
          </div>
        </div>

        {/* Desktop Slide 1 Content */}
        <div className="hidden sm:flex relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 h-full flex-col justify-center">
          <div className="max-w-[580px] lg:max-w-[720px] xl:max-w-[760px]">
            {/* Eyebrow / Kicker */}
            <p className="text-white/85 font-open-sans text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-2.5 sm:mb-3 drop-shadow">
              CORDLESS. POWERFUL. PORTABLE.
            </p>

            {/* Headline (Exact Figma: Montserrat 112px, Line-height 95%, 900 vs 700 weight, 0 4px 24px shadow) */}
            <h1 className="font-montserrat text-5xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[112px] leading-[0.95] tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)]">
              <span className="block font-black text-white">NO POWER.</span>
              <span className="block font-bold text-white/80">NO SOCKET.</span>
            </h1>

            {/* Description Paragraph */}
            <p className="font-open-sans text-white/90 mt-4 sm:mt-5 max-w-[500px] text-[14px] sm:text-[15.5px] leading-relaxed font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              Wash your car anywhere with the AMEC Aquaforce 1400 - a powerful,
              battery-powered portable pressure washer. No cables, no power
              sockets, no fixed setup needed.
            </p>

            {/* Pricing & Discount Badge */}
            <div className="flex items-center gap-3 sm:gap-4 mt-5 sm:mt-7 font-open-sans">
              <span className="text-white/60 line-through text-sm sm:text-base font-semibold drop-shadow">
                ₹49,999
              </span>
              <span className="text-white text-2xl sm:text-3xl font-black tracking-tight drop-shadow">
                ₹37,999
              </span>
              <span className="bg-[#18c49e] text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                24% OFF
              </span>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 bg-[#005DA6] hover:bg-[#004b87] text-white font-montserrat text-xs sm:text-sm font-black tracking-wider uppercase px-6 sm:px-7 py-3.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
              <a
                href="#features"
                className="inline-flex items-center border border-white/40 hover:border-white text-white hover:bg-white/10 font-open-sans text-xs sm:text-sm font-black tracking-wider uppercase px-6 sm:px-7 py-3.5 rounded-[4px] transition-all active:scale-[0.98] drop-shadow"
              >
                EXPLORE FEATURES
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SLIDE 2: Special Offer / Promotional Launch Offer Banner */}
      {/* ========================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentSlide === 1
            ? "opacity-100 z-10 pointer-events-auto"
            : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        {/* Mobile Background Image (special-offer-mobile.png) */}
        <div className="sm:hidden absolute inset-0 z-0">
          <Image
            src="/images/special-offer-mobile.png"
            alt="AMEC Aquaforce 1400 Promotional Launch Offer 24% OFF"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>

        {/* Desktop Background Image (special-offer.png) */}
        <div className="hidden sm:block absolute inset-0 z-0">
          <Image
            src="/images/special-offer.png"
            alt="AMEC Aquaforce 1400 Promotional Launch Offer 24% OFF"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Mobile Slide 2 Content Overlay */}
        <div className="sm:hidden relative z-10 w-full h-full flex flex-col justify-end px-5 pb-10 pt-20">
          {/* Red Promotional Launch Offer Badge */}
          <div className="inline-block bg-[#e53e3e] text-white font-inter text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-[3px] shadow-sm mb-2 w-fit">
            PROMOTIONAL LAUNCH OFFER
          </div>

          {/* Subtitle (Exact Figma: Inter font-semibold 32px text-white/85) */}
          <p className="text-white/85 font-inter font-semibold text-lg sm:text-2xl drop-shadow">
            Get AQUAFORCE 1400 at
          </p>

          {/* Huge 24% OFF Headline with vertical gradient text fill */}
          <h2 className="font-inter text-5xl sm:text-6xl font-black tracking-tight leading-none my-1 bg-gradient-to-b from-white via-[#f0f6ff] to-[#cfe2fe] bg-clip-text text-transparent drop-shadow-md">
            24% OFF
          </h2>

          {/* Pricing Row */}
          <div className="text-white font-inter text-xs sm:text-sm font-bold flex items-center gap-2 mt-1.5 drop-shadow">
            <span className="text-white/70 font-normal">
              MRP: <span className="line-through">₹49,999</span>
            </span>
            <span className="text-white font-extrabold ml-1">
              Offer Price: ₹37,999
            </span>
          </div>

          {/* Mobile Single Full-Width Action Button */}
          <div className="mt-3.5 w-full">
            <button
              onClick={openModal}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#005DA6] hover:bg-[#004b87] text-white font-inter text-xs font-black tracking-wider uppercase py-3.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Micro Footer Note */}
          <p className="text-white/70 font-inter text-[11px] mt-2 text-center drop-shadow">
            Limited-period promotional offer.
          </p>
        </div>

        {/* Desktop Slide 2 Content */}
        <div className="hidden sm:flex relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 h-full flex-col justify-center">
          <div className="max-w-[620px] lg:max-w-[760px] xl:max-w-[820px]">
            {/* Red Promotional Launch Offer Badge */}
            <div className="inline-block bg-[#e53e3e] text-white font-inter text-xs sm:text-[13px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-[4px] shadow-sm mb-3.5 w-fit drop-shadow">
              PROMOTIONAL LAUNCH OFFER
            </div>

            {/* Subtitle (Exact Figma: Inter font-semibold 32px text-white/85) */}
            <p className="text-white/85 font-inter font-semibold text-xl sm:text-2xl lg:text-[32px] leading-[1.2] drop-shadow">
              Get AQUAFORCE 1400 at
            </p>

            {/* Huge 24% OFF Headline (Exact Figma: Inter 120px, font-weight 900, line-height 100%, vertical gradient text fill) */}
            <h2 className="font-inter text-6xl sm:text-8xl lg:text-[104px] xl:text-[120px] font-black tracking-tight leading-none my-2 bg-gradient-to-b from-white via-[#f0f6ff] to-[#cfe2fe] bg-clip-text text-transparent drop-shadow-md">
              24% OFF
            </h2>

            {/* Pricing Row */}
            <div className="text-white font-inter text-base sm:text-lg font-bold flex items-center gap-2 mt-3 drop-shadow">
              <span className="text-white/70 font-normal">
                MRP: <span className="line-through">₹49,999</span>
              </span>
              <span className="text-white font-extrabold ml-1 text-lg sm:text-xl">
                Offer Price: ₹37,999
              </span>
            </div>

            {/* CTA Button */}
            <div className="mt-6 sm:mt-7">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 bg-[#005DA6] hover:bg-[#004b87] text-white font-inter text-xs sm:text-sm font-black tracking-wider uppercase px-7 py-3.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            {/* Micro Footer Note */}
            <p className="text-white/70 font-inter text-xs mt-3 drop-shadow">
              Limited-period promotional offer.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SLIDE 3: Center Machine Driveway Banner (hero-image-block.png) */}
      {/* ========================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentSlide === 2
            ? "opacity-100 z-10 pointer-events-auto"
            : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        {/* Mobile Background Image */}
        <div className="sm:hidden absolute inset-0 z-0">
          <Image
            src="/images/hero-mobile.png"
            alt="AMEC Aquaforce 1400 No Power No Socket"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Desktop Background Image (hero-banner-3.png) */}
        <div className="hidden sm:block absolute inset-0 z-0">
          <Image
            src="/hero-banner-3.png"
            alt="AMEC Aquaforce 1400 No Power No Socket Driveway Washing Scene"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Mobile Slide 3 Content Overlay */}
        <div className="sm:hidden relative z-10 w-full h-full flex flex-col justify-end px-5 pb-10 pt-20">
          {/* Description */}
          <p className="text-white/95 font-open-sans text-[13px] leading-relaxed font-normal max-w-[340px] drop-shadow-md">
            Wash your car anywhere with the AMEC Aquaforce 1400 - a powerful,
            battery-powered portable pressure washer. No cables, no power
            sockets, no fixed setup needed.
          </p>

          {/* Pricing & Discount */}
          <div className="mt-3.5 font-open-sans">
            <span className="inline-block bg-[#18c49e] text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider shadow-xs mb-1">
              24% OFF
            </span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-white text-3xl font-black tracking-tight drop-shadow">
                ₹37,999
              </span>
              <span className="text-white/60 line-through text-sm font-semibold drop-shadow">
                ₹49,999
              </span>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex flex-col gap-2.5 mt-4 w-full">
            <button
              onClick={openModal}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#005DA6] hover:bg-[#004b87] text-white font-montserrat text-xs font-black tracking-wider uppercase py-3.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
            <a
              href="#features"
              className="w-full inline-flex items-center justify-center border border-white/80 hover:border-white text-white hover:bg-white/10 font-open-sans text-xs font-black tracking-wider uppercase py-3.5 rounded-[4px] transition-all active:scale-[0.98] drop-shadow text-center"
            >
              EXPLORE FEATURES
            </a>
          </div>
        </div>

        {/* Desktop Slide 3 Bottom Content Bar */}
        <div className="hidden sm:flex relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 h-full flex-col justify-end pb-14 sm:pb-16 lg:pb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-8">
            {/* Bottom-Left Description */}
            <div className="max-w-xl">
              <p className="text-white/95 font-open-sans text-[14px] sm:text-[15px] leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Wash your car anywhere with the AMEC Aquaforce 1400 - a powerful,
                battery-powered portable pressure washer. No cables, no power
                sockets, no fixed setup needed.
              </p>
            </div>

            {/* Bottom-Right Pricing & Action Buttons */}
            <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
              {/* Pricing Line */}
              <div className="flex items-center gap-3 font-open-sans">
                <span className="text-white/60 line-through text-sm sm:text-base font-semibold drop-shadow">
                  ₹49,999
                </span>
                <span className="text-white text-2xl sm:text-3xl font-black tracking-tight drop-shadow">
                  ₹37,999
                </span>
                <span className="bg-[#18c49e] text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                  24% OFF
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2 bg-[#005DA6] hover:bg-[#004b87] text-white font-montserrat text-xs sm:text-sm font-black tracking-wider uppercase px-5 sm:px-6 py-2.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <a
                  href="#features"
                  className="inline-flex items-center border border-white/80 hover:border-white text-white hover:bg-white/10 font-open-sans text-xs sm:text-sm font-black tracking-wider uppercase px-5 sm:px-6 py-2.5 rounded-[4px] transition-all active:scale-[0.98] drop-shadow"
                >
                  EXPLORE FEATURES
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SLIDE 4: Adventure Motorbike Washing Scene (Banner 04.png) */}
      {/* ========================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentSlide === 3
            ? "opacity-100 z-10 pointer-events-auto"
            : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        {/* Mobile Background Image (Banner 04 mobile.png) */}
        <div className="sm:hidden absolute inset-0 z-0">
          <Image
            src="/images/Banner 04 mobile.png"
            alt="AMEC Aquaforce 1400 Cordless Powerful Portable Motorbike Detailing"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          {/* Bottom Dark Gradient for high text contrast over white foam */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/55 to-transparent pointer-events-none" />
        </div>

        {/* Desktop Background Image (Banner 04.png) */}
        <div className="hidden sm:block absolute inset-0 z-0">
          <Image
            src="/images/Banner 04.png"
            alt="AMEC Aquaforce 1400 Cordless Powerful Portable Motorbike Detailing"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center sm:object-[center_40%]"
          />
          {/* Bottom Dark Gradient for high text contrast over white foam */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
        </div>

        {/* Mobile Slide 4 Overlay - Action buttons pinned to bottom without blocking top graphic */}
        <div className="sm:hidden relative z-10 w-full h-full flex flex-col justify-end px-5 pb-10">
          <div className="flex items-center justify-between gap-3 mb-2.5 font-open-sans">
            <div className="flex items-center gap-2">
              <span className="text-white/70 line-through text-xs font-semibold drop-shadow">
                ₹49,999
              </span>
              <span className="text-white text-lg font-black drop-shadow">
                ₹37,999
              </span>
            </div>
            <span className="bg-[#18c49e] text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              24% OFF
            </span>
          </div>
          <button
            onClick={openModal}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#005DA6] hover:bg-[#004b87] text-white font-montserrat text-xs font-black tracking-wider uppercase py-3.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>SHOP NOW</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* Desktop Slide 4 Overlay - Bottom Action Bar (Preserves top-left graphic without overlap) */}
        <div className="hidden sm:flex relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 pb-8 lg:pb-12 h-full flex-col justify-end">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 w-full">
            {/* Bottom-Left caption below graphic */}
            <div className="max-w-md">
              <p className="text-white/95 font-open-sans text-[14px] sm:text-[15px] leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Experience unrestricted high-pressure vehicle detailing anytime, anywhere with zero reliance on power sockets.
              </p>
            </div>

            {/* Bottom-Right Pricing & Action Buttons */}
            <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
              {/* Pricing Line */}
              <div className="flex items-center gap-3 font-open-sans">
                <span className="text-white/60 line-through text-sm sm:text-base font-semibold drop-shadow">
                  ₹49,999
                </span>
                <span className="text-white text-2xl sm:text-3xl font-black tracking-tight drop-shadow">
                  ₹37,999
                </span>
                <span className="bg-[#18c49e] text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                  24% OFF
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2 bg-[#005DA6] hover:bg-[#004b87] text-white font-montserrat text-xs sm:text-sm font-black tracking-wider uppercase px-5 sm:px-6 py-2.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <a
                  href="#features"
                  className="inline-flex items-center border border-white/80 hover:border-white text-white hover:bg-white/10 font-open-sans text-xs sm:text-sm font-black tracking-wider uppercase px-5 sm:px-6 py-2.5 rounded-[4px] transition-all active:scale-[0.98] drop-shadow"
                >
                  EXPLORE FEATURES
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Carousel Controls: Navigation Indicators */}
      {/* ========================================================= */}
      {/* Slide Indicator Pills */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        <button
          onClick={() => setCurrentSlide(0)}
          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
            currentSlide === 0
              ? "w-7 sm:w-8 bg-white"
              : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
          }`}
          aria-label="Go to Slide 1"
        />
        <button
          onClick={() => setCurrentSlide(1)}
          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
            currentSlide === 1
              ? "w-7 sm:w-8 bg-white"
              : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
          }`}
          aria-label="Go to Slide 2"
        />
        <button
          onClick={() => setCurrentSlide(2)}
          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
            currentSlide === 2
              ? "w-7 sm:w-8 bg-white"
              : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
          }`}
          aria-label="Go to Slide 3"
        />
        <button
          onClick={() => setCurrentSlide(3)}
          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
            currentSlide === 3
              ? "w-7 sm:w-8 bg-white"
              : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
          }`}
          aria-label="Go to Slide 4"
        />
      </div>
    </section>
  );
}
