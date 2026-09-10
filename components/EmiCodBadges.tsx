"use client";

interface EmiCodBadgesProps {
  className?: string;
}

export default function EmiCodBadges({ className = "" }: EmiCodBadgesProps) {
  return (
    <div
      className={`inline-flex items-center bg-white rounded-lg sm:rounded-xl p-1 shadow-md select-none ${className}`}
    >
      {/* Left Light Blue Pill: Available Options */}
      <div className="bg-[#8cc8ff] text-[#0f5c9e] font-bold text-[11px] xs:text-[12px] sm:text-[13px] px-2.5 xs:px-3 py-1 rounded-md sm:rounded-lg shrink-0 flex items-center">
        <span>Available Options</span>
      </div>

      {/* Right Options: NO COST EMI | CASH ON DELIVERY */}
      <div className="flex items-center gap-2 xs:gap-3 px-2.5 xs:px-3.5 py-1 text-[#0f5c9e] font-extrabold text-[10px] xs:text-[11px] sm:text-[12px] tracking-wider uppercase shrink-0">
        <span>NO COST EMI</span>
        <span className="text-[#0f5c9e]/60 font-light text-sm">|</span>
        <span>CASH ON DELIVERY</span>
      </div>
    </div>
  );
}

