"use client";

import { useOrderModal } from "@/context/OrderModalContext";

export default function SaleTicker() {
  const { openModal } = useOrderModal();

  const items = Array(12).fill("SALE 26% OFF");

  return (
    <div
      onClick={openModal}
      className="relative w-full bg-[#E52E2E] overflow-hidden cursor-pointer select-none py-2.5 sm:py-3 shadow-md z-20 transition-colors hover:bg-[#d92222]"
      title="Click to claim 26% OFF"
    >
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* Double array to create a seamless infinite loop */}
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center">
            <span className="text-white font-unbounded font-semibold text-[15px] sm:text-[18px] lg:text-[22.488px] tracking-[-0.337px] uppercase drop-shadow-xs px-4 sm:px-6">
              {text}
            </span>
            {/* 4-point Diamond Sparkle Star */}
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-current shrink-0 drop-shadow-xs"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
