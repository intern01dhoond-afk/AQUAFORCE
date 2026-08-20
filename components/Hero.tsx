"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useOrderModal } from "@/context/OrderModalContext";

const TOTAL_SLIDES = 3;

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openModal } = useOrderModal();

  // Auto-advance slides every 4.5 seconds and reset timer on slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
    }, 4500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? TOTAL_SLIDES - 1 : prev - 1));

  return (
    <section
      id="home"
      className="relative min-h-[720px] sm:min-h-[660px] lg:min-h-[760px] xl:min-h-[820px] flex items-center overflow-hidden bg-slate-950 select-none group"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
        </div>

        {/* Desktop Background Image */}
        <div className="hidden sm:block absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="AMEC Aquaforce 1400 Cordless Portable Pressure Washer car wash outdoor"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center sm:object-[center_35%]"
          />
          {/* Left Contrast Gradient Mask for crisp text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent sm:w-3/5 lg:w-1/2" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Mobile Slide 1 Content Overlay */}
        <div className="sm:hidden relative z-10 w-full h-full flex flex-col justify-end px-5 pb-10 pt-20">
          {/* Eyebrow / Kicker */}
          <p className="text-white/85 text-[11px] font-bold tracking-[0.18em] uppercase mb-1.5 drop-shadow">
            CORDLESS. POWERFUL. PORTABLE.
          </p>

          {/* Headline */}
          <h1 className="text-[2.65rem] font-black leading-[0.92] tracking-tight uppercase text-white drop-shadow-lg">
            <span className="block">NO POWER.</span>
            <span className="block">NO SOCKET.</span>
          </h1>

          {/* Description */}
          <p className="text-white/90 text-[13px] leading-relaxed font-normal mt-3 max-w-[340px] drop-shadow">
            Wash your car anywhere with the AMEC Aquaforce 1400 - a powerful,
            battery-powered portable pressure washer. No cables, no power
            sockets, no fixed setup needed.
          </p>

          {/* Pricing & Discount */}
          <div className="mt-3.5">
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

          {/* Mobile Action Buttons (Stacked full-width) */}
          <div className="flex flex-col gap-2.5 mt-4 w-full">
            <button
              onClick={openModal}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs font-black tracking-wider uppercase py-3.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] cursor-pointer"
            >
              SHOP NOW <span className="text-base leading-none">&rarr;</span>
            </button>
            <a
              href="#features"
              className="w-full inline-flex items-center justify-center border border-white/80 hover:border-white text-white hover:bg-white/10 text-xs font-black tracking-wider uppercase py-3.5 rounded-[4px] transition-all active:scale-[0.98] drop-shadow text-center"
            >
              EXPLORE FEATURES
            </a>
          </div>
        </div>

        {/* Desktop Slide 1 Content (Left-Anchored with fluid margins for exact 1440px visual match) */}
        <div className="hidden sm:flex relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 h-full flex-col justify-center">
          <div className="max-w-[560px] lg:max-w-[620px]">
            {/* Eyebrow / Kicker */}
            <p className="text-white/85 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-2.5 sm:mb-3 drop-shadow">
              CORDLESS. POWERFUL. PORTABLE.
            </p>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.85rem] font-black leading-[0.9] tracking-tight uppercase drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
              <span className="block text-white">NO POWER.</span>
              <span className="block text-white/80">NO SOCKET.</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-white/90 mt-4 sm:mt-5 max-w-[500px] text-[14px] sm:text-[15.5px] leading-relaxed font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              Wash your car anywhere with the AMEC Aquaforce 1400 - a powerful,
              battery-powered portable pressure washer. No cables, no power
              sockets, no fixed setup needed.
            </p>

            {/* Pricing & Discount Badge */}
            <div className="flex items-center gap-3 sm:gap-4 mt-5 sm:mt-7">
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
                className="inline-flex items-center gap-2 bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs sm:text-sm font-black tracking-wider uppercase px-6 sm:px-7 py-3.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                SHOP NOW <span className="text-base leading-none">&rarr;</span>
              </button>
              <a
                href="#features"
                className="inline-flex items-center border border-white/40 hover:border-white text-white hover:bg-white/10 text-xs sm:text-sm font-black tracking-wider uppercase px-6 sm:px-7 py-3.5 rounded-[4px] transition-all active:scale-[0.98] drop-shadow"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
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
          {/* Left vignette gradient to guarantee high text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent lg:w-3/5" />
        </div>

        {/* Mobile Slide 2 Content Overlay */}
        <div className="sm:hidden relative z-10 w-full h-full flex flex-col justify-end px-5 pb-10 pt-20">
          {/* Red Promotional Launch Offer Badge */}
          <div className="inline-block bg-[#e53e3e] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-[3px] shadow-sm mb-2 w-fit">
            PROMOTIONAL LAUNCH OFFER
          </div>

          {/* Subtitle */}
          <p className="text-white font-bold text-base drop-shadow">
            Get AQUAFORCE 1400 at
          </p>

          {/* Huge 24% OFF Headline */}
          <h2 className="text-white text-5xl font-black tracking-tight leading-none my-1 drop-shadow-md">
            24% OFF
          </h2>

          {/* Pricing Row */}
          <div className="text-white text-xs font-bold flex items-center gap-2 mt-1.5 drop-shadow">
            <span className="text-white/70 font-normal">
              MRP: <span className="line-through">₹49,999</span>
            </span>
            <span className="text-white font-black ml-1 text-sm">
              Offer Price: ₹37,999
            </span>
          </div>

          {/* Mobile Single Full-Width Action Button */}
          <div className="mt-3.5 w-full">
            <button
              onClick={openModal}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs font-black tracking-wider uppercase py-3.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] cursor-pointer"
            >
              SHOP NOW <span className="text-base leading-none">&rarr;</span>
            </button>
          </div>

          {/* Micro Footer Note */}
          <p className="text-white/70 text-[11px] mt-2 text-center drop-shadow">
            Limited-period promotional offer.
          </p>
        </div>

        {/* Desktop Slide 2 Content (Left-Anchored with fluid margins for exact 1440px visual match) */}
        <div className="hidden sm:flex relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 h-full flex-col justify-center">
          <div className="max-w-[560px]">
            {/* Red Promotional Launch Offer Badge */}
            <div className="inline-block bg-[#e53e3e] text-white text-xs sm:text-[13px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-[4px] shadow-sm mb-3.5 w-fit drop-shadow">
              PROMOTIONAL LAUNCH OFFER
            </div>

            {/* Subtitle */}
            <p className="text-white font-bold text-lg sm:text-xl lg:text-2xl drop-shadow">
              Get AQUAFORCE 1400 at
            </p>

            {/* Huge 24% OFF Headline */}
            <h2 className="text-white text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none my-2 drop-shadow-md">
              24% OFF
            </h2>

            {/* Pricing Row */}
            <div className="text-white text-base sm:text-lg font-bold flex items-center gap-2 mt-3 drop-shadow">
              <span className="text-white/70 font-normal">
                MRP: <span className="line-through">₹49,999</span>
              </span>
              <span className="text-white font-black ml-1 text-lg sm:text-xl">
                Offer Price: ₹37,999
              </span>
            </div>

            {/* CTA Button */}
            <div className="mt-6 sm:mt-7">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs sm:text-sm font-black tracking-wider uppercase px-7 py-3.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                SHOP NOW <span className="text-base leading-none">&rarr;</span>
              </button>
            </div>

            {/* Micro Footer Note */}
            <p className="text-white/70 text-xs mt-3 drop-shadow">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Desktop Background Image (hero-image-block.png) */}
        <div className="hidden sm:block absolute inset-0 z-0">
          <Image
            src="/hero-image-block.png"
            alt="AMEC Aquaforce 1400 No Power No Socket Driveway Washing Scene"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle bottom vignette to ensure bottom text clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
        </div>

        {/* Mobile Slide 3 Content Overlay */}
        <div className="sm:hidden relative z-10 w-full h-full flex flex-col justify-end px-5 pb-10 pt-20">
          {/* Description */}
          <p className="text-white/95 text-[13px] leading-relaxed font-normal max-w-[340px] drop-shadow-md">
            Wash your car anywhere with the AMEC Aquaforce 1400 - a powerful,
            battery-powered portable pressure washer. No cables, no power
            sockets, no fixed setup needed.
          </p>

          {/* Pricing & Discount */}
          <div className="mt-3.5">
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
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs font-black tracking-wider uppercase py-3.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] cursor-pointer"
            >
              SHOP NOW <span className="text-base leading-none">&rarr;</span>
            </button>
            <a
              href="#features"
              className="w-full inline-flex items-center justify-center border border-white/80 hover:border-white text-white hover:bg-white/10 text-xs font-black tracking-wider uppercase py-3.5 rounded-[4px] transition-all active:scale-[0.98] drop-shadow text-center"
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
              <p className="text-white/95 text-[14px] sm:text-[15px] leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Wash your car anywhere with the AMEC Aquaforce 1400 - a powerful,
                battery-powered portable pressure washer. No cables, no power
                sockets, no fixed setup needed.
              </p>
            </div>

            {/* Bottom-Right Pricing & Action Buttons */}
            <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
              {/* Pricing Line */}
              <div className="flex items-center gap-3">
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
                  className="inline-flex items-center gap-2 bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs sm:text-sm font-black tracking-wider uppercase px-5 sm:px-6 py-2.5 rounded-[4px] shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  SHOP NOW <span className="text-base leading-none">&rarr;</span>
                </button>
                <a
                  href="#features"
                  className="inline-flex items-center border border-white/80 hover:border-white text-white hover:bg-white/10 text-xs sm:text-sm font-black tracking-wider uppercase px-5 sm:px-6 py-2.5 rounded-[4px] transition-all active:scale-[0.98] drop-shadow"
                >
                  EXPLORE FEATURES
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Carousel Controls: Arrows & Navigation Indicators */}
      {/* ========================================================= */}
      {/* Left Navigation Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/70 border border-white/20 text-white/90 hover:text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/70 border border-white/20 text-white/90 hover:text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl opacity-80 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight size={20} />
      </button>

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
      </div>
    </section>
  );
}
