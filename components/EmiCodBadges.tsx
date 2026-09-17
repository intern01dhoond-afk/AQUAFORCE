"use client";

interface EmiCodBadgesProps {
  className?: string;
}

export default function EmiCodBadges({ className = "" }: EmiCodBadgesProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 bg-blue-950/50 backdrop-blur-md border border-blue-400/30 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full select-none ${className}`}
    >
      {/* Subtle blue pulse dot indicator */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
      </span>

      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
        <span className="font-bold text-white tracking-wider uppercase">
          NO COST EMI / COD
        </span>
        <span className="text-blue-200/90 font-medium">
          Available
        </span>
      </div>
    </div>
  );
}





