"use client";

interface EmiCodBadgesProps {
  className?: string;
}

export default function EmiCodBadges({ className = "" }: EmiCodBadgesProps) {
  return (
    <div
      className={`inline-flex items-stretch rounded-full overflow-hidden shadow-[0_0_18px_rgba(0,102,204,0.45)] shadow-blue-600/40 border border-blue-400/20 select-none ${className}`}
    >
      {/* Left Light Blue Section: Available Options */}
      <div className="bg-[#7ec2ff] text-[#0a437a] font-bold text-[9.5px] xs:text-[11px] sm:text-[12.5px] px-3 xs:px-3.5 py-1 sm:py-1.5 flex items-center shrink-0">
        <span>Available Options</span>
      </div>

      {/* Right White Section: NO COST EMI | CASH ON DELIVERY */}
      <div className="bg-white text-[#0a437a] font-extrabold text-[8.5px] xs:text-[10px] sm:text-[11.5px] tracking-wider uppercase px-3 xs:px-4 py-1 sm:py-1.5 flex items-center gap-1.5 xs:gap-3 shrink-0">
        <span>NO COST EMI</span>
        <span className="text-[#0a437a]/40 font-light text-xs sm:text-sm">|</span>
        <span>CASH ON DELIVERY</span>
      </div>
    </div>
  );
}





