import { Plus } from "lucide-react";

const MODULES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="16" height="12" rx="2.5" />
        <path d="M6 12h2l1-2 2 4 1-2h2" />
        <path d="M22 10v4" />
      </svg>
    ),
    title: "Lithium-Ion Battery pack",
    desc: "Intelligent thermal vents and quick-charge support protect cell longevity.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </svg>
    ),
    title: "Heavy-Duty DC Pump",
    desc: "Forged alloy pistons deliver stable maximum fluid flow and zero corrosion risk.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    title: "Compact Water Tank Option",
    desc: "Mount the onboard tank directly or drop the hose in any external vessel.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Dynamic Power Control",
    desc: "Manage motor speeds dynamically using the tactile dual-mode pressure trigger.",
  },
];

export default function CompactModules() {
  return (
    <section className="pt-6 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center px-4 py-1 rounded-full border border-sky-600/50 font-open-sans text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-slate-900 bg-transparent mb-4">
          INTEGRATED ENGINEERING
        </div>

        {/* Section Heading & Subtitle */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-montserrat text-slate-900 tracking-tight">
          Compact Dual-Module Design
        </h2>
        <p className="text-slate-600 font-open-sans max-w-xl mx-auto mt-3 text-sm sm:text-base">
          It is engineered to work as one unified, ergonomic system
        </p>
      </div>

      {/* 4 Connected Cards: Horizontal Carousel on Mobile, 4-Col Grid on Desktop */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 mt-8 sm:mt-16">
        <div className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto lg:overflow-visible pb-4 pt-1 px-1 -mx-1 scrollbar-thin snap-x snap-mandatory">
          {MODULES.map((m, idx) => (
            <div
              key={m.title}
              className="relative flex flex-col h-full shrink-0 w-[245px] sm:w-[270px] lg:w-auto snap-center"
            >
              {/* Card Content */}
              <div className="h-full min-h-[230px] sm:min-h-[250px] bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-start">
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center mb-4 sm:mb-5">
                  {m.icon}
                </div>
                <h3 className="text-[15px] sm:text-[17px] font-bold font-montserrat text-slate-900 leading-snug">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 font-open-sans mt-2 sm:mt-2.5 leading-relaxed">
                  {m.desc}
                </p>
              </div>

              {/* Connecting '+' Pill Badge centered precisely in the gap between cards */}
              {idx < MODULES.length - 1 && (
                <div className="absolute left-[calc(100%+8px)] lg:left-[calc(100%+12px)] top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-400 shadow-[0_2px_6px_rgba(0,0,0,0.06)] pointer-events-none">
                  <Plus size={12} className="text-slate-400 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
