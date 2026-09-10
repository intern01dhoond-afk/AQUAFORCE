"use client";

interface EmiCodBadgesProps {
  className?: string;
}

export default function EmiCodBadges({ className = "" }: EmiCodBadgesProps) {
  return (
    <div
      className={`inline-flex items-center rounded-[4px] overflow-hidden shadow-sm select-none ${className}`}
    >
      {/* Left Light Blue Section: Available Options */}
      <div className="bg-[#8cc8ff] text-[#0f5c9e] font-bold text-[11px] xs:text-[12px] sm:text-[13px] px-3 py-1 flex items-center shrink-0">
        <span>Available Options</span>
      </div>

      {/* Right White Section: NO COST EMI | CASH ON DELIVERY */}
      <div className="bg-white text-[#0f5c9e] font-extrabold text-[10px] xs:text-[11px] sm:text-[12px] tracking-wider uppercase px-3 py-1 flex items-center gap-2.5 xs:gap-3.5 shrink-0">
        <span>NO COST EMI</span>
        <span className="text-[#0f5c9e]/50 font-light text-xs sm:text-sm">|</span>
        <span>CASH ON DELIVERY</span>
      </div>
    </div>
  );
}


