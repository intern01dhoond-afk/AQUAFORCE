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
    image: "/images/use-cases/car-washing.png",
  },
  {
    id: "bike-washing",
    label: "Bike Washing",
    desc: "Remove mud, road grit, and chain grease from motorcycles and bicycles with targeted pressure that protects delicate seals.",
    image: "/images/use-cases/bike-washing.png",
  },
  {
    id: "home-users",
    label: "Home Users",
    desc: "Power-wash patio tiles, stone steps, driveways, garden paths, and outdoor patio furniture with zero setup hassle.",
    image: "/images/use-cases/home-users.png",
  },
  {
    id: "workshops-garages",
    label: "Workshops & Garages",
    desc: "A heavy-duty, portable washing companion for auto workshops, service bays, and professional vehicle detailing centers.",
    image: "/images/use-cases/workshops-garages.png",
  },
  {
    id: "mobile-car-wash",
    label: "Mobile Car Wash",
    desc: "The perfect all-in-one washing setup for mobile detailers — compact, battery-powered, and siphons water from any onboard tank or container.",
    image: "/images/use-cases/mobile-car-wash.png",
  },
  {
    id: "remote-open-areas",
    label: "Remote & Open Areas",
    desc: "Wash off-road vehicles, trucks, and equipment anywhere off the grid — beside lakes, trailheads, campsites, or open farm fields.",
    image: "/images/use-cases/remote-open-areas.png",
  },
];

export default function UseCase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Relaxed auto-rotation timer (6.5 seconds) that pauses on hover or user interaction
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % USE_CASES.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="use-cases"
      className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px]">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center px-4 py-1 rounded-full border border-sky-600/50 font-open-sans text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-slate-900 bg-white shadow-xs mb-4">
            UNRESTRICTED UTILITY
          </div>

          {/* Section Title */}
          <h2 className="text-[#0F1729] font-montserrat text-3xl sm:text-4xl lg:text-[48px] font-medium tracking-tight leading-[1.1] max-w-[567px] mx-auto">
            Discover Your Use Case
          </h2>

          {/* Subtitle */}
          <p className="text-[#333340] font-open-sans text-base sm:text-lg lg:text-[20px] font-normal leading-[1.6] mt-3 max-w-[886px] mx-auto">
            Whether detailing high-end vehicles or prepping off-road gear, Aquaforce fits every scenario.
          </p>
        </div>

        {/* Mobile View: Horizontal Pill Tag Selector above Image */}
        <div className="lg:hidden w-full overflow-x-auto no-scrollbar py-1 mb-5 flex items-center gap-2">
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
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 w-full">
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
            <div className="relative w-full max-w-[605px] h-[280px] sm:h-[380px] lg:h-[520px] rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.14),0_6px_20px_rgba(15,23,42,0.08)] border border-slate-200/80 bg-slate-950">
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
                    sizes="(max-width: 1024px) 100vw, 605px"
                    className="object-cover object-center"
                  />
                  {/* Subtle inner gradient shadow for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Mobile View: Description placed right below image */}
            <div className="lg:hidden w-full max-w-[605px] mt-4 px-1 text-left">
              <div className="relative min-h-[85px] sm:min-h-[75px] flex items-center">
                {USE_CASES.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${
                      idx === activeIndex
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#0066cc] mb-1">
                      {item.label}
                    </span>
                    <p className="text-[#4D4D59] text-[13.5px] sm:text-[15px] font-normal leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
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
