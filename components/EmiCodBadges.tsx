"use client";

interface EmiCodBadgesProps {
  className?: string;
}

export default function EmiCodBadges({ className = "" }: EmiCodBadgesProps) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-[#0066cc] sm:bg-[#0070f3] text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-[8px] shadow-[0_8px_25px_rgba(0,102,238,0.6)] border border-blue-400/20 select-none ${className}`}
    >
      <span className="font-bold text-xs xs:text-sm sm:text-[15px] tracking-wide uppercase">
        NO COST EMI / COD
      </span>
      <span className="font-normal text-xs xs:text-sm sm:text-[15px] ml-2">
        Available
      </span>
    </div>
  );
}





