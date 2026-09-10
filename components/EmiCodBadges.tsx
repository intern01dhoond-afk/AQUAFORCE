"use client";

interface EmiCodBadgesProps {
  className?: string;
}

export default function EmiCodBadges({ className = "" }: EmiCodBadgesProps) {
  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
    >
      {/* Left Light Blue Pill: Available Options */}
      <div className="bg-[#8cc8ff] text-[#0f5c9e] font-bold text-[9.5px] xs:text-[11px] sm:text-[12.5px] px-3 xs:px-3.5 py-1 rounded-full shrink-0 flex items-center z-10 shadow-xs">
        <span>Available Options</span>
      </div>

      {/* Right White Section: NO COST EMI | CASH ON DELIVERY */}
      <div className="bg-white text-[#0f5c9e] font-extrabold text-[8.5px] xs:text-[10px] sm:text-[11.5px] tracking-wider uppercase pl-4 xs:pl-5 pr-3 xs:pr-3.5 py-1 -ml-3.5 rounded-r-full shrink-0 flex items-center gap-1.5 xs:gap-3 shadow-xs z-0">
        <span>NO COST EMI</span>
        <span className="text-[#0f5c9e]/50 font-light text-xs sm:text-sm">|</span>
        <span>CASH ON DELIVERY</span>
      </div>
    </div>
  );
}





