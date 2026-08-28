import { ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";

export default function StatsBar() {
  return (
    <section className="bg-[#f8f9fb] border-y border-slate-200/70 py-4 sm:py-7 lg:py-8 w-full">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-8 lg:px-[80px]">
        <ScrollRevealStagger className="grid grid-cols-2 lg:grid-cols-4 items-center" staggerDelay={0.1}>
          {/* Stat 1: Battery */}
          <ScrollRevealItem className="flex flex-col items-center justify-center text-center px-2.5 sm:px-4 py-3 sm:py-2 border-r border-b lg:border-b-0 border-slate-200/80">
            {/* Battery Icon */}
            <div className="h-7 sm:h-8 flex items-center justify-center text-slate-800 mb-1">
              <svg
                width="24"
                height="15"
                viewBox="0 0 26 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="1" y="1" width="20" height="14" rx="2" />
                <path d="M23 5.5V10.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-open-sans text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#9CA3AF] leading-tight">
              BATTERY
            </span>
            <span className="font-montserrat text-xl sm:text-3xl lg:text-[32px] font-black text-[#111827] my-0.5 tracking-tight leading-tight">
              3 HRS
            </span>
            <span className="font-open-sans text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#9CA3AF] leading-tight">
              CONTINUOUS USE
            </span>
          </ScrollRevealItem>

          {/* Stat 2: Pressure */}
          <ScrollRevealItem className="flex flex-col items-center justify-center text-center px-2.5 sm:px-4 py-3 sm:py-2 border-b lg:border-b-0 lg:border-r border-slate-200/80">
            {/* Spark / Burst Icon */}
            <div className="h-7 sm:h-8 flex items-center justify-center text-slate-800 mb-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
            </div>
            <span className="font-open-sans text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#9CA3AF] leading-tight">
              PRESSURE
            </span>
            <span className="font-montserrat text-xl sm:text-3xl lg:text-[32px] font-black text-[#111827] my-0.5 tracking-tight leading-tight">
              HIGH
            </span>
            <span className="font-open-sans text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#9CA3AF] leading-tight">
              PRESSURE PUMP
            </span>
          </ScrollRevealItem>

          {/* Stat 3: Power */}
          <ScrollRevealItem className="flex flex-col items-center justify-center text-center px-2.5 sm:px-4 py-3 sm:py-2 border-r border-slate-200/80">
            {/* Wind / Air Flow Icon */}
            <div className="h-7 sm:h-8 flex items-center justify-center text-slate-800 mb-1">
              <svg
                width="22"
                height="18"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path d="M2 5H16C17.6569 5 19 3.65685 19 2C19 0.8 17.8 0 16.5 0" />
                <path d="M2 10H20C21.6569 10 23 11.3431 23 13C23 14.6569 21.6569 16 20 16" />
                <path d="M2 15H13C14.1 15 15 15.9 15 17C15 18.1 14.1 19 13 19" />
              </svg>
            </div>
            <span className="font-open-sans text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#9CA3AF] leading-tight">
              POWER
            </span>
            <span className="font-montserrat text-xl sm:text-3xl lg:text-[32px] font-black text-[#111827] my-0.5 tracking-tight leading-tight">
              NO
            </span>
            <span className="font-open-sans text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#9CA3AF] leading-tight">
              SOCKETS NEEDED
            </span>
          </ScrollRevealItem>

          {/* Stat 4: Cordless */}
          <ScrollRevealItem className="flex flex-col items-center justify-center text-center px-2.5 sm:px-4 py-3 sm:py-2">
            {/* Feather / Lightweight Icon */}
            <div className="h-7 sm:h-8 flex items-center justify-center text-slate-800 mb-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                <line x1="16" y1="8" x2="2" y2="22" />
                <line x1="17.5" y1="15" x2="9" y2="15" />
              </svg>
            </div>
            <span className="font-open-sans text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#9CA3AF] leading-tight">
              CORDLESS
            </span>
            <span className="font-montserrat text-xl sm:text-3xl lg:text-[32px] font-black text-[#111827] my-0.5 tracking-tight leading-tight">
              100%
            </span>
            <span className="font-open-sans text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#9CA3AF] leading-tight">
              WIRELESS
            </span>
          </ScrollRevealItem>
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
