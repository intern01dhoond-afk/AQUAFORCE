const ROWS = [
  {
    feature: "Power Independence",
    conventional: "Requires a 230V active AC plug socket",
    aquaforce: "Cordless battery-driven operation",
  },
  {
    feature: "Water Source Requirement",
    conventional: "Strictly depends on active running garden tap",
    aquaforce: "Siphons from buckets, tanks, or rivers easily",
  },
  {
    feature: "Portability Factor",
    conventional: "Heavy wheels, tangled wire, rigid setup",
    aquaforce: "Featherweight composite handheld body",
  },
  {
    feature: "Setup Time",
    conventional: "Takes up to 10 minutes of layout setup",
    aquaforce: "Instant snap-on lock. Cleans in 30 seconds",
  },
  {
    feature: "Storage Footprint",
    conventional: "Bulky frame occupies high closet space",
    aquaforce: "Disassembles to a premium compact travel case",
  },
  {
    feature: "Continuous Runtime",
    conventional: "Continuous, but heavily tied down physically",
    aquaforce: "Up to 3 hours with proprietary Lithium cells",
  },
];

export default function ComparisonTable() {
  return (
    <section className="pt-12 sm:pt-16 lg:pt-20 pb-4 sm:pb-8 lg:pb-12 bg-white w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center px-4 py-1 rounded-full border border-sky-600/50 text-[10px] sm:text-[11px] font-black tracking-[0.16em] uppercase text-slate-900 bg-transparent mb-4">
          UNRESTRICTED UTILITY
        </div>

        {/* Heading & Subtitle */}
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-tight">
          What Makes Aquaforce Different?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mt-3 text-sm sm:text-base leading-relaxed">
          See how the AMEC Aquaforce 1400 stacks up against a conventional
          pressure washer across every critical dimension.
        </p>
      </div>

      {/* Comparison Table Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 sm:mt-10 pb-2 sm:pb-4">
        {/* Mobile Swipe Hint */}
        <div className="sm:hidden flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-2.5">
          <span>👈 Swipe to view Aquaforce 1400 👉</span>
        </div>

        <div className="overflow-x-auto p-1 -m-1 sm:p-4 sm:-m-4 scrollbar-thin">
          <div className="min-w-[470px] sm:min-w-[640px] bg-white rounded-2xl sm:rounded-[24px] border border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.07),0_2px_6px_rgba(15,23,42,0.04)] overflow-hidden">
            {/* Table Header Row */}
            <div className="grid grid-cols-[130px_160px_180px] sm:grid-cols-12 border-b border-slate-100 items-stretch">
              {/* Feature Header */}
              <div className="sm:col-span-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.16em] text-slate-400 py-3.5 sm:py-5 px-3 sm:px-8 flex items-center bg-white">
                FEATURE
              </div>
              {/* Conventional Header */}
              <div className="sm:col-span-4 bg-[#fff5f5] text-[#ef4444] font-bold text-[10px] sm:text-[13px] tracking-wider uppercase py-3.5 sm:py-5 px-3.5 sm:px-6 flex items-center">
                CONVENTIONAL WASHER
              </div>
              {/* Aquaforce Header */}
              <div className="sm:col-span-4 bg-[#f0fdf4] text-[#16a34a] font-bold text-[10px] sm:text-[13px] tracking-wider uppercase py-3.5 sm:py-5 px-3.5 sm:px-6 flex items-center">
                AQUAFORCE 1400
              </div>
            </div>

            {/* Table Data Rows */}
            {ROWS.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[130px_160px_180px] sm:grid-cols-12 items-stretch text-xs sm:text-sm ${
                  i !== ROWS.length - 1 ? "border-b border-slate-100/90" : ""
                }`}
              >
                {/* Feature Name */}
                <div className="sm:col-span-4 font-bold text-slate-900 py-3 sm:py-4.5 px-3 sm:px-8 flex items-center bg-white text-[11.5px] sm:text-sm leading-tight">
                  {row.feature}
                </div>

                {/* Conventional Column */}
                <div className="sm:col-span-4 bg-[#fff5f5] py-3 sm:py-4.5 px-3.5 sm:px-6 flex items-center text-slate-600 text-[11px] sm:text-[13px] leading-relaxed">
                  {row.conventional}
                </div>

                {/* Aquaforce Column */}
                <div className="sm:col-span-4 bg-[#f0fdf4] py-3 sm:py-4.5 px-3.5 sm:px-6 flex items-center gap-2 sm:gap-2.5 text-slate-800 font-medium text-[11px] sm:text-[13px] leading-relaxed">
                  <span className="shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#86efac]/70 text-[#15803d] flex items-center justify-center text-[9px] sm:text-[10px] font-black">
                    ✓
                  </span>
                  <span>{row.aquaforce}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
