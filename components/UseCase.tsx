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
    image: "/aquaforceforautocare/images/use-cases/1.webp",
  },
  {
    id: "bike-washing",
    label: "Bike Washing",
    desc: "Remove mud, road grit, and chain grease from motorcycles and bicycles with targeted pressure that protects delicate seals.",
    image: "/aquaforceforautocare/images/use-cases/2.webp",
  },
  {
    id: "home-users",
    label: "Home Users",
    desc: "Power-wash patio tiles, stone steps, driveways, garden paths, and outdoor patio furniture with zero setup hassle.",
    image: "/aquaforceforautocare/images/use-cases/3.1.webp",
  },
  {
    id: "workshops-garages",
    label: "Workshops & Garages",
    desc: "A heavy-duty, portable washing companion for auto workshops, service bays, and professional vehicle detailing centers.",
    image: "/aquaforceforautocare/images/use-cases/4.1.webp",
  },
  {
    id: "mobile-car-wash",
    label: "Mobile Car Wash",
    desc: "The perfect all-in-one washing setup for mobile detailers - compact, battery-powered, and siphons water from any onboard tank or container.",
    image: "/aquaforceforautocare/images/use-cases/5.webp",
  },
  {
    id: "remote-open-areas",
    label: "Remote & Open Areas",
    desc: "Wash off-road vehicles, trucks, and equipment anywhere off the grid - beside lakes, trailheads, campsites, or open farm fields.",
    image: "/aquaforceforautocare/images/use-cases/6.webp",
  },
];

export default function UseCase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  // Touch swipe support on mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      setActiveIndex((prev) => (prev + 1) % USE_CASES.length);
    } else if (diff < -40) {
      setActiveIndex((prev) => (prev === 0 ? USE_CASES.length - 1 : prev - 1));
    }
  };

  // Only scroll pill bar horizontally inside its container on mobile
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (pillContainerRef.current && pillRefs.current[activeIndex]) {
      const container = pillContainerRef.current;
      const pill = pillRefs.current[activeIndex];
      const offset = pill.offsetLeft - container.offsetWidth / 2 + pill.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [activeIndex]);

  // ── Desktop: lock scroll in this section, step through use cases one by one ──
  // The user is held here until reaching "Remote & Open Areas".
  // Only then does the next scroll-down proceed naturally to the next page section.
  useEffect(() => {
    let lastWheelTime = 0;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Section is dominant in view if it spans the middle of the viewport
      const inView = rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.45;
      if (!inView) return;

      // Filter out micro trackpad tremors
      if (Math.abs(e.deltaY) < 14) return;

      const now = Date.now();
      const coolingDown = now - lastWheelTime < 450;

      if (e.deltaY > 0) {
        // ↓ Scrolling DOWN
        if (activeIndexRef.current < USE_CASES.length - 1) {
          // Locked: always prevent default so page does NOT scroll away
          e.preventDefault();
          if (!coolingDown) {
            lastWheelTime = now;
            // Smoothly snap section to top on initial step
            if (Math.abs(rect.top) > 15 && activeIndexRef.current === 0) {
              containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            const next = activeIndexRef.current + 1;
            activeIndexRef.current = next;
            setActiveIndex(next);
          }
        }
        // At activeIndex === 5 ("Remote & Open Areas"), e.preventDefault() is NOT called!
        // Downward scroll naturally flows directly to "What Makes Aquaforce® Different?".
      } else if (e.deltaY < 0) {
        // ↑ Scrolling UP
        if (activeIndexRef.current > 0) {
          e.preventDefault();
          if (!coolingDown) {
            lastWheelTime = now;
            const prev = activeIndexRef.current - 1;
            activeIndexRef.current = prev;
            setActiveIndex(prev);
          }
        }
        // At activeIndex === 0 ("Car Washing"), e.preventDefault() is NOT called!
        // Upward scroll naturally flows up to "4 Steps".
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.45;
      if (!inView) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (activeIndexRef.current < USE_CASES.length - 1) {
          e.preventDefault();
          const next = activeIndexRef.current + 1;
          activeIndexRef.current = next;
          setActiveIndex(next);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (activeIndexRef.current > 0) {
          e.preventDefault();
          const prev = activeIndexRef.current - 1;
          activeIndexRef.current = prev;
          setActiveIndex(prev);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectIndex = (idx: number) => {
    activeIndexRef.current = idx;
    setActiveIndex(idx);
  };

  const activeCase = USE_CASES[activeIndex];

  return (
    <section
      id="use-cases"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center py-10 lg:py-12 bg-white bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] overflow-hidden"
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-[80px] flex flex-col justify-between h-auto lg:h-full lg:max-h-[860px] my-auto">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto shrink-0 mb-5 sm:mb-8 lg:mb-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-sky-600/50 font-open-sans text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-slate-900 bg-white shadow-xs mb-2.5 sm:mb-3">
            UNRESTRICTED UTILITY
          </div>

          {/* Section Title */}
          <h2 className="text-[#0F1729] font-montserrat text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight leading-[1.15] max-w-[567px] mx-auto">
            Discover Your Use Case
          </h2>

          {/* Subtitle */}
          <p className="text-[#333340] font-open-sans text-xs xs:text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed mt-1.5 sm:mt-2 max-w-[800px] mx-auto">
            Whether detailing high-end vehicles or prepping off-road gear, Aquaforce® fits every scenario.
          </p>
        </div>

        {/* ========================================================= */}
        {/* MOBILE VIEW (lg:hidden): Integrated Showcase Card */}
        {/* ========================================================= */}
        <div className="lg:hidden w-full max-w-[540px] mx-auto flex flex-col items-center">
          {/* Horizontal Pill Tag Selector */}
          <div
            ref={pillContainerRef}
            className="w-full overflow-x-auto no-scrollbar py-1 mb-3.5 flex items-center gap-2 snap-x px-1"
          >
            {USE_CASES.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    pillRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs xs:text-sm font-semibold transition-all shrink-0 cursor-pointer snap-center ${
                    isActive
                      ? "bg-[#0066cc] text-white shadow-md shadow-blue-600/25 border border-[#0066cc] font-bold"
                      : "bg-white text-slate-700 border border-slate-200/90 shadow-2xs hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Unified Showcase Card with Swipe Support */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full bg-white rounded-[20px] border border-slate-200 shadow-[0_12px_35px_-8px_rgba(15,23,42,0.12)] overflow-hidden transition-all touch-pan-y"
          >
            {/* Image Area */}
            <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden">
              {USE_CASES.map((item, idx) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    idx === activeIndex
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-[1.03] z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    priority={idx === 0}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 540px"
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>

            {/* Bottom Content Area */}
            <div className="p-4 xs:p-5 bg-white">
              <span className="text-xs xs:text-[13px] font-black uppercase tracking-[0.14em] text-[#0066cc] font-montserrat block mb-1">
                {activeCase.label}
              </span>

              <p className="text-slate-600 font-open-sans text-[13px] xs:text-[14px] leading-relaxed">
                {activeCase.desc}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP VIEW (hidden lg:flex): 3-Column Interactive Layout */}
        {/* ========================================================= */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-8 w-full flex-1 min-h-0 my-auto">
          {/* Desktop Left Column: Nav List */}
          <div className="w-[280px] flex flex-col space-y-2.5 sm:space-y-3 shrink-0">
            {USE_CASES.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectIndex(idx)}
                  className={`text-left transition-all duration-300 cursor-pointer py-2.5 w-full flex items-center group rounded-r-lg ${
                    isActive
                      ? "border-l-[3px] border-[#0066cc] pl-4 text-[#0F1729] font-bold text-lg sm:text-xl lg:text-[21px] translate-x-1 bg-blue-50/40"
                      : "border-l-[3px] border-transparent pl-4 text-[#94A3B8] hover:text-[#0F1729] hover:bg-slate-50/80 font-normal text-lg sm:text-xl lg:text-[21px]"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop Center Column: Stacked Cross-Fade Active Image */}
          <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
            <div className="relative w-full max-w-[560px] aspect-[4/3] rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.14),0_6px_20px_rgba(15,23,42,0.08)] border border-slate-200/80 bg-slate-900">
              {USE_CASES.map((item, idx) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    idx === activeIndex
                      ? "opacity-100 scale-100 z-10 pointer-events-auto"
                      : "opacity-0 scale-[1.02] z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    priority={idx === 0}
                    quality={100}
                    sizes="560px"
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Right Column: Cross-Fade Description */}
          <div className="w-[260px] items-center shrink-0">
            <div className="relative w-full min-h-[180px] flex items-center">
              {USE_CASES.map((item, idx) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-350 ease-out ${
                    idx === activeIndex
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none"
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
    </section>
  );
}
