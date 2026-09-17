"use client";

interface EmiCodBadgesProps {
  className?: string;
}

export default function EmiCodBadges({ className = "" }: EmiCodBadgesProps) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-[#0066cc] sm:bg-[#0070f3] text-white px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-[6px] sm:rounded-[7px] shadow-[0_3px_10px_rgba(0,117,255,0.22)] border border-white/10 select-none ${className}`}
    >
      <span className="font-bold text-[10px] xs:text-[11px] sm:text-xs tracking-wide uppercase">
        NO COST EMI / COD
      </span>
      <span className="font-normal text-[10px] xs:text-[11px] sm:text-xs ml-1.5">
        Available
      </span>
    </div>
  );
}





