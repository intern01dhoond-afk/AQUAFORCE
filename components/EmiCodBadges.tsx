"use client";

interface EmiCodBadgesProps {
  className?: string;
}

export default function EmiCodBadges({ className = "" }: EmiCodBadgesProps) {
  return (
    <div
      className={`inline-flex items-center bg-white rounded-[6px] sm:rounded-[8px] shadow-sm select-none overflow-hidden ${className}`}
    >
      {/* Left Light Blue Section: Available Options with rounded right pill edge */}
      <div className="bg-[#8cc8ff] text-[#0f5c9e] font-bold text-[9.5px] xs:text-[11px] sm:text-[12.5px] px-2 xs:px-3 py-1 rounded-r-full shrink-0 flex items-center">
        <span>Available Options</span>
      </div>

      {/* Right White Section: NO COST EMI | CASH ON DELIVERY */}
      <div className="flex items-center gap-1.5 xs:gap-3 pl-2 xs:pl-3 pr-2.5 xs:pr-3.5 py-1 text-[#0f5c9e] font-extrabold text-[8.5px] xs:text-[10px] sm:text-[11.5px] tracking-wider uppercase shrink-0">
        <span>NO COST EMI</span>
        <span className="text-[#0f5c9e]/50 font-light text-xs sm:text-sm">|</span>
        <span>CASH ON DELIVERY</span>
      </div>
    </div>
  );
}




