"use client";

import { Check } from "lucide-react";

interface EmiCodBadgesProps {
  className?: string;
}

export default function EmiCodBadges({ className = "" }: EmiCodBadgesProps) {
  return (
    <div
      className={`inline-flex items-center rounded-[6px] overflow-hidden shadow-sm font-montserrat select-none ${className}`}
    >
      {/* Left Badge: NO COST EMI */}
      <div
        className="bg-[#8cd6fa] text-[#0052b3] font-bold text-[10px] xs:text-[11px] sm:text-[12px] tracking-wider uppercase pl-2.5 pr-4 py-1 flex items-center gap-1.5 shrink-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
        }}
      >
        <div className="w-3.5 h-3.5 xs:w-4 xs:h-4 rounded-full bg-[#0066cc] flex items-center justify-center shrink-0">
          <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
        </div>
        <span className="whitespace-nowrap">NO COST EMI</span>
      </div>

      {/* Right Badge: CASH ON DELIVERY */}
      <div
        className="bg-white text-[#0052b3] font-bold text-[10px] xs:text-[11px] sm:text-[12px] tracking-wider uppercase pl-4 pr-2.5 py-1 flex items-center gap-1.5 -ml-[10px] shrink-0"
        style={{
          clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <div className="w-3.5 h-3.5 xs:w-4 xs:h-4 rounded-full bg-[#0066cc] flex items-center justify-center shrink-0">
          <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
        </div>
        <span className="whitespace-nowrap">CASH ON DELIVERY</span>
      </div>
    </div>
  );
}
