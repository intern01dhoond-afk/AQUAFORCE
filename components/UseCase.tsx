"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface UseCaseItem {
  id: string;
  label: string;
  desc: string;
  image: string;
}

const USE_CASES: UseCaseItem[] = [
  {
    id: "car-washing",
    label: "Car Washing",
    desc: "Clean cars conveniently at home, parking lots, or detailing bays without needing long extension cords or fixed plumbing.",
    image: "/aquaforceforautocare/images/mobile-banner-3.png",
  },
  {
    id: "bike-washing",
    label: "Bike Washing",
    desc: "Remove mud, road grit, and chain grease from motorcycles and bicycles with targeted pressure that protects delicate seals.",
    image: "/aquaforceforautocare/images/banner-1-1-1.png",
  },
  {
    id: "home-users",
    label: "Home Users",
    desc: "Power-wash patio tiles, stone steps, driveways, garden paths, and outdoor patio furniture with zero setup hassle.",
    image: "/aquaforceforautocare/images/mobile-banner-4.png",
  },
  {
    id: "workshops-garages",
    label: "Workshops & Garages",
    desc: "A heavy-duty, portable washing companion for auto workshops, service bays, and professional vehicle detailing centers.",
    image: "/aquaforceforautocare/images/mobile-banner-1.png",
  },
  {
    id: "mobile-car-wash",
    label: "Mobile Car Wash",
    desc: "The perfect all-in-one washing setup for mobile detailers - compact, battery-powered, and siphons water from any onboard tank or container.",
    image: "/aquaforceforautocare/images/mobile-banner-5.png",
  },
  {
    id: "remote-open-areas",
    label: "Remote & Open Areas",
    desc: "Wash off-road vehicles, trucks, and equipment anywhere off the grid - beside lakes, trailheads, campsites, or open farm fields.",
    image: "/aquaforceforautocare/images/mobile-banner-6.png",
  },
];

export default function UseCase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isClickingRef = useRef(false);

  // Track window scroll and map progress to active use case
  useEffect(() => {
    const handleScroll = () => {
      if (isClickingRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      // Calculate normalized progress clamped between 0 and 1
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      // Map progress to item index [0 .. USE_CASES.length - 1]
      const targetIndex = Math.min(
        Math.floor(progress * USE_CASES.length),
        USE_CASES.length - 1
      );

      setActiveIndex(targetIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smoothly scroll container to specific use case when clicked
  const handleSelectIndex = (idx: number) => {
    setActiveIndex(idx);
    if (!containerRef.current) return;

    isClickingRef.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const step = totalScrollable / USE_CASES.length;
    // Position within the center of the step's scroll window
    const targetScrollTop = window.scrollY + rect.top + (idx + 0.5) * step;

    window.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });

    setTimeout(() => {
      isClickingRef.current = false;
    }, 700);
  };

  const activeCase = USE_CASES[activeIndex];

  return (
    <section
      id="use-cases"
      ref={containerRef}
      className="relative w-full h-[200vh] lg:h-[220vh] bg-white bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem]"
    >
      {/* Sticky Full-Viewport Inner Wrapper */}
      <div className="sticky top-0 h-screen max-h-screen w-full flex flex-col justify-center overflow-hidden py-4 sm:py-6 lg:py-8 z-10">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-[80px] flex flex-col justify-between h-full max-h-[860px] my-auto">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto shrink-0 mb-3 sm:mb-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-sky-600/50 font-open-sans text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-slate-900 bg-white shadow-xs mb-2 sm:mb-3">
              UNRESTRICTED UTILITY
            </div>

            {/* Section Title */}
            <h2 className="text-[#0F1729] font-montserrat text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight leading-[1.15] max-w-[567px] mx-auto">
              Discover Your Use Case
            </h2>

            {/* Subtitle */}
            <p className="text-[#333340] font-open-sans text-xs xs:text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed mt-1 sm:mt-2 max-w-[800px] mx-auto">
              Whether detailing high-end vehicles or prepping off-road gear, Aquaforce fits every scenario.
            </p>
          </div>

          {/* Mobile View: Horizontal Pill Tag Selector above Image */}
          <div className="lg:hidden w-full overflow-x-auto no-scrollbar py-1 mb-2 flex items-center gap-1.5 xs:gap-2 snap-x shrink-0">
            {USE_CASES.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectIndex(idx)}
                  className={`whitespace-nowrap px-3.5 xs:px-4 py-1.5 rounded-full text-[11.5px] xs:text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer snap-center ${
                    isActive
                      ? "bg-[#0066cc] text-white shadow-md shadow-blue-600/30 border border-[#0066cc]"
                      : "bg-slate-100 text-slate-600 border border-slate-200/80 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* 3-Column Interactive Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 xs:gap-4 lg:gap-8 w-full flex-1 min-h-0 my-auto">
            {/* Desktop Left Column: Nav List */}
            <div className="hidden lg:flex w-[280px] flex-col space-y-2.5 sm:space-y-3 shrink-0">
              {USE_CASES.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectIndex(idx)}
                    className={`text-left transition-all duration-300 cursor-pointer py-2 w-full flex items-center group ${
                      isActive
                        ? "border-l-[3px] border-[#0066cc] pl-4 text-[#0F1729] font-bold text-lg sm:text-xl lg:text-[21px] translate-x-1"
                        : "border-l-[3px] border-transparent pl-4 text-[#94A3B8] hover:text-[#0F1729] font-normal text-lg sm:text-xl lg:text-[21px]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Center Column: Stacked Cross-Fade Active Image */}
            <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
              <div className="relative w-full max-w-[560px] h-[195px] xs:h-[225px] sm:h-[320px] lg:h-[440px] xl:h-[480px] rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.14),0_6px_20px_rgba(15,23,42,0.08)] border border-slate-200/80 bg-slate-950">
                {USE_CASES.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      idx === activeIndex
                        ? "opacity-100 scale-100 z-10 pointer-events-auto"
                        : "opacity-0 scale-[1.03] z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      priority={idx === 0}
                      quality={100}
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Mobile View: Dynamic Flow Description */}
              <div className="lg:hidden w-full max-w-[560px] mt-2.5 xs:mt-3 px-1 text-left shrink-0">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 xs:p-3.5 shadow-xs">
                  <span className="text-[11px] xs:text-xs font-bold uppercase tracking-[0.14em] text-[#0066cc] block mb-0.5">
                    {activeCase.label}
                  </span>
                  <p className="text-[#4D4D59] text-[12px] xs:text-[13px] sm:text-[14px] font-normal leading-relaxed">
                    {activeCase.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Right Column: Cross-Fade Description */}
            <div className="hidden lg:flex w-[260px] items-center shrink-0">
              <div className="relative w-full min-h-[180px] flex items-center">
                {USE_CASES.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${
                      idx === activeIndex
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-3 pointer-events-none"
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#0066cc] mb-2">
                      {item.label}
                    </span>
                    <p className="text-[#4D4D59] text-base sm:text-lg lg:text-[18px] font-normal leading-[1.65]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
