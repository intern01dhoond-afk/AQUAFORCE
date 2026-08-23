"use client";

import { useState, useEffect } from "react";
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
    image: "/images/1-1 mobile baner 3.png",
  },
  {
    id: "bike-washing",
    label: "Bike Washing",
    desc: "Remove mud, road grit, and chain grease from motorcycles and bicycles with targeted pressure that protects delicate seals.",
    image: "/images/Banner 1-1 1.jpg",
  },
  {
    id: "home-users",
    label: "Home Users",
    desc: "Power-wash patio tiles, stone steps, driveways, garden paths, and outdoor patio furniture with zero setup hassle.",
    image: "/images/1-1 mobile baner 4.png",
  },
  {
    id: "workshops-garages",
    label: "Workshops & Garages",
    desc: "A heavy-duty, portable washing companion for auto workshops, service bays, and professional vehicle detailing centers.",
    image: "/images/1-1 mobile baner 1.png",
  },
  {
    id: "mobile-car-wash",
    label: "Mobile Car Wash",
    desc: "The perfect all-in-one washing setup for mobile detailers - compact, battery-powered, and siphons water from any onboard tank or container.",
    image: "/images/1-1 mobile baner 5.png",
  },
  {
    id: "remote-open-areas",
    label: "Remote & Open Areas",
    desc: "Wash off-road vehicles, trucks, and equipment anywhere off the grid - beside lakes, trailheads, campsites, or open farm fields.",
    image: "/images/1-1 mobile baner 6.png",
  },
];

export default function UseCase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch Swipe State for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const minSwipeDistance = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      // Next
      setActiveIndex((prev) => (prev + 1) % USE_CASES.length);
    } else if (distance < -minSwipeDistance) {
      // Prev
      setActiveIndex((prev) => (prev === 0 ? USE_CASES.length - 1 : prev - 1));
    }
  };

  // Relaxed auto-rotation timer (6.5 seconds) that pauses on hover or user interaction
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % USE_CASES.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const activeCase = USE_CASES[activeIndex];

  return (
    <section
      id="use-cases"
      className="py-10 xs:py-14 sm:py-20 lg:py-24 bg-white relative overflow-hidden bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[80px]">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-6 xs:mb-8 sm:mb-16">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-sky-600/50 font-open-sans text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-slate-900 bg-white shadow-xs mb-3 sm:mb-4">
            UNRESTRICTED UTILITY
          </div>

          {/* Section Title */}
          <h2 className="text-[#0F1729] font-montserrat text-2xl xs:text-3xl sm:text-4xl lg:text-[48px] font-medium tracking-tight leading-[1.15] max-w-[567px] mx-auto">
            Discover Your Use Case
          </h2>

          {/* Subtitle */}
          <p className="text-[#333340] font-open-sans text-sm xs:text-base sm:text-lg lg:text-[20px] font-normal leading-relaxed mt-2 sm:mt-3 max-w-[886px] mx-auto">
            Whether detailing high-end vehicles or prepping off-road gear, Aquaforce fits every scenario.
          </p>
        </div>

        {/* Mobile View: Horizontal Pill Tag Selector above Image */}
        <div className="lg:hidden w-full overflow-x-auto no-scrollbar py-1 mb-4 flex items-center gap-1.5 xs:gap-2 snap-x">
          {USE_CASES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setIsPaused(true);
                }}
                className={`whitespace-nowrap px-3.5 xs:px-4 py-1.5 xs:py-2 rounded-full text-[11.5px] xs:text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer snap-center ${
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 xs:gap-6 lg:gap-10 w-full">
          {/* Desktop Left Column: Nav List (Hidden on mobile) */}
          <div className="hidden lg:flex w-[297px] flex-col space-y-2.5 sm:space-y-3 shrink-0">
            {USE_CASES.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPaused(true);
                  }}
                  className={`text-left transition-colors duration-200 cursor-pointer py-2 w-full flex items-center ${
                    isActive
                      ? "border-l-[3px] border-[#0066cc] pl-4 text-[#0F1729] font-bold text-lg sm:text-xl lg:text-[22px]"
                      : "border-l-[3px] border-transparent pl-4 text-[#94A3B8] hover:text-[#0F1729] font-normal text-lg sm:text-xl lg:text-[22px]"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Center Column: Stacked Cross-Fade Active Image & Mobile Description */}
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-full max-w-[605px] h-[210px] xs:h-[250px] sm:h-[380px] lg:h-[520px] rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.14),0_6px_20px_rgba(15,23,42,0.08)] border border-slate-200/80 bg-slate-950 touch-pan-y"
            >
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
                    sizes="(max-width: 1024px) 100vw, 605px"
                    className="object-cover object-center"
                  />
                  {/* Subtle inner gradient shadow for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Mobile View: Dynamic Flow Description (No overflow bug) */}
            <div className="lg:hidden w-full max-w-[605px] mt-3 xs:mt-4 px-1 text-left">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 xs:p-4 shadow-xs">
                <span className="text-[11px] xs:text-xs font-bold uppercase tracking-[0.14em] text-[#0066cc] block mb-1">
                  {activeCase.label}
                </span>
                <p className="text-[#4D4D59] text-[13px] xs:text-[14px] font-normal leading-relaxed">
                  {activeCase.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Right Column: Cross-Fade Description (Hidden on mobile) */}
          <div className="hidden lg:flex w-[270px] items-center shrink-0">
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
                  <p className="text-[#4D4D59] text-base sm:text-lg lg:text-[19px] font-normal leading-[1.65]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
