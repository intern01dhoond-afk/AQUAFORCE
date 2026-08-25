import Image from "next/image";
import ScrollReveal, { ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";

const FEATURES_LEFT = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="16" height="12" rx="2.5" />
        <path d="M22 10V14" />
      </svg>
    ),
    title: "Powerful Battery Operation",
    desc: "High-voltage lithium cells deliver constant output throughout every wash cycle",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12H7L10 4L14 20L17 12H22" />
      </svg>
    ),
    title: "3 Hours Continuous Use",
    desc: "Extended runtime for multiple vehicle cleaning sessions",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" y1="4" x2="20" y2="20" />
        <path d="M10 3.5L12 8L14 3.5" />
        <path d="M16.5 10L21 12L16.5 14" />
        <path d="M7.5 10L3 12L7.5 14" />
        <path d="M10 20.5L12 16L14 20.5" />
      </svg>
    ),
    title: "No Power Socket Required",
    desc: "Complete operational freedom anywhere without relying on external power sources",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L4 22L12 18L20 22L12 2Z" />
      </svg>
    ),
    title: "Cordless & Portable",
    desc: "Zero cables, lightweight chassis for easy maneuvering",
  },
];

const FEATURES_RIGHT = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3V21" />
        <path d="M15 3V21" />
        <path d="M3 9H21" />
        <path d="M3 15H21" />
      </svg>
    ),
    title: "Built-In Pressure Pump",
    desc: "Precision engineering delivers 1400 PSI directly from an integrated internal pump",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    title: "Vehicle Optimised",
    desc: "Precision nozzle for targeted cleaning on wheels, panels, and tight crevices",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M4.93 4.93L19.07 19.07" />
      </svg>
    ),
    title: "Zero Power Reliance",
    desc: "Operates fully independent of electrical outlets, extension cords, or generators",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Compact & Easy to Carry",
    desc: "Dual-module design fits in any vehicle trunk for easy transport and storage",
  },
];

// 2-Column Mobile Features ordered strictly as shown in screenshot
const MOBILE_FEATURE_PAIRS = [
  [FEATURES_LEFT[0], FEATURES_LEFT[1]], // Powerful Battery | 3 Hours Continuous Use
  [FEATURES_LEFT[2], FEATURES_LEFT[3]], // No Power Socket | Cordless & Portable
  [FEATURES_RIGHT[0], FEATURES_RIGHT[1]], // Built-In Pressure Pump | Vehicle Optimised
  [FEATURES_RIGHT[2], FEATURES_RIGHT[3]], // Zero Power Reliance | Compact & Easy to Carry
];

export default function EngineeredPerformance() {
  return (
    <section
      id="features"
      className="pt-10 sm:pt-14 pb-8 sm:pb-10 bg-gradient-to-b from-[#bcdbf5] via-[#dcebf9] to-[#c2def6] relative overflow-hidden"
    >
      {/* Top Header */}
      <ScrollReveal direction="up" className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center px-4 py-1 rounded-full border border-sky-600/50 font-open-sans text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-slate-900 bg-transparent mb-3">
          PRECISION ENGINEERING
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-montserrat text-[#0F1729] tracking-tight">
          Engineered For Ultimate Performance
        </h2>
        <p className="text-slate-600 font-open-sans max-w-xl mx-auto mt-2 text-sm sm:text-base leading-relaxed">
          Explore the mechanical innovations that make cordless high-pressure
          cleaning a reality.
        </p>
      </ScrollReveal>

      {/* ========================================================= */}
      {/* MOBILE LAYOUT (< lg): Machine in Center + 2-Column Grid */}
      {/* ========================================================= */}
      <div className="lg:hidden max-w-[560px] mx-auto px-3.5 sm:px-6 mt-3 sm:mt-6 flex flex-col items-center">
        {/* Center 3D AMEC Aquaforce Machine Render */}
        <ScrollReveal direction="zoom" className="relative flex items-center justify-center my-1 sm:my-2 w-full">
          {/* Radiant Brightness Spotlight */}
          <div className="absolute w-56 h-56 sm:w-80 sm:h-80 bg-white/85 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 w-64 h-72 sm:w-80 sm:h-92">
            <Image
              src="/aquaforceforautocare/images/aquaforce-machine.png"
              alt="AMEC Aquaforce 1400 PSI TECH portable high pressure washer machine"
              fill
              priority
              quality={100}
              sizes="(max-width: 640px) 100vw, 500px"
              className="object-contain drop-shadow-[0_20px_35px_rgba(15,40,75,0.25)]"
            />
          </div>
        </ScrollReveal>

        {/* 2-Column Features Grid Styled as Crisp Modern Cards */}
        <ScrollRevealStagger className="w-full grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4 mt-2 text-left" staggerDelay={0.08}>
          {MOBILE_FEATURE_PAIRS.flat().map((item) => (
            <ScrollRevealItem
              key={item.title}
              className="flex flex-col items-start bg-white/50 backdrop-blur-xs border border-white/80 rounded-[12px] p-3 xs:p-3.5 shadow-[0_2px_8px_rgba(15,40,75,0.05)] hover:bg-white/70 transition-colors"
            >
              {/* Icon in Accent Badge */}
              <div className="w-7 h-7 xs:w-8 xs:h-8 rounded-[8px] bg-sky-600/10 text-sky-700 flex items-center justify-center mb-2 shrink-0">
                <div className="scale-75 xs:scale-85 origin-center">
                  {item.icon}
                </div>
              </div>
              {/* Title */}
              <h3 className="text-[12px] xs:text-[13px] sm:text-[14.5px] font-bold font-montserrat text-[#0F1729] leading-tight">
                {item.title}
              </h3>
              {/* Description */}
              <p className="text-[10.5px] xs:text-[11px] sm:text-[12px] text-slate-600 font-open-sans mt-1 leading-snug font-normal">
                {item.desc}
              </p>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP LAYOUT (>= lg): 3-Column Layout */}
      {/* ========================================================= */}
      <div className="hidden lg:grid max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px] grid-cols-12 gap-4 items-center mt-8">
        {/* Left Column (4 Features) */}
        <ScrollReveal direction="right" delay={0.1} className="col-span-3 flex flex-col gap-10 text-right">
          {FEATURES_LEFT.map((item) => (
            <div key={item.title} className="flex flex-row-reverse items-start gap-4">
              <div className="shrink-0 text-sky-700 mt-0.5">
                {item.icon}
              </div>
              <div>
                <h3 className="text-[15px] font-bold font-montserrat text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 font-open-sans mt-1 leading-relaxed max-w-[260px] ml-auto">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </ScrollReveal>

        {/* Center Column: Enlarged 3D AMEC Aquaforce Machine Render with Radiant Glow */}
        <ScrollReveal direction="zoom" className="col-span-6 flex items-center justify-center relative">
          {/* Radiant Spotlight */}
          <div className="absolute w-80 h-80 lg:w-[460px] lg:h-[460px] bg-white/85 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute w-60 h-60 sm:w-72 sm:h-72 bg-white rounded-full blur-2xl pointer-events-none" />

          {/* Machine Image Container */}
          <div className="relative z-10 w-[420px] h-[480px] lg:w-[460px] lg:h-[530px] xl:w-[500px] xl:h-[560px]">
            <Image
              src="/aquaforceforautocare/images/aquaforce-machine.png"
              alt="AMEC Aquaforce 1400 PSI TECH portable high pressure washer machine"
              fill
              priority
              quality={100}
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-contain drop-shadow-[0_25px_45px_rgba(15,40,75,0.28)]"
            />
          </div>
        </ScrollReveal>

        {/* Right Column (4 Features) */}
        <ScrollReveal direction="left" delay={0.1} className="col-span-3 flex flex-col gap-10 text-left">
          {FEATURES_RIGHT.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="shrink-0 text-sky-700 mt-0.5">
                {item.icon}
              </div>
              <div>
                <h3 className="text-[15px] font-bold font-montserrat text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 font-open-sans mt-1 leading-relaxed max-w-[260px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
