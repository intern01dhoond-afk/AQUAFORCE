"use client";

import { useOrderModal } from "@/context/OrderModalContext";

export default function SaleTicker() {
  const { openModal } = useOrderModal();

  const items = Array(12).fill("SALE 24% OFF");

  return (
    <div
      onClick={openModal}
      className="relative w-full bg-[#E52E2E] overflow-hidden cursor-pointer select-none py-2.5 sm:py-3 shadow-md z-20 transition-colors hover:bg-[#d92222]"
      title="Click to claim 24% OFF"
    >
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* Double array to create a seamless infinite loop */}
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center">
            <span className="text-white font-montserrat font-black text-[13px] sm:text-[15px] lg:text-[16px] tracking-wider uppercase drop-shadow-xs px-4 sm:px-6">
              {text}
            </span>
            {/* 4-point Diamond Sparkle Star */}
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-current shrink-0 drop-shadow-xs"
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
