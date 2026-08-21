import Image from "next/image";

export default function WashWithoutLimits() {
  return (
    <section className="relative overflow-hidden bg-white w-full">
      {/* ========================================================= */}
      {/* MOBILE LAYOUT (< md) - Matches Exact Attached Design */}
      {/* ========================================================= */}
      <div className="md:hidden flex flex-col items-center text-center py-10 px-4 w-full">
        {/* Title & Subtitle */}
        <h2 className="text-[#0e1726] font-montserrat text-[32px] font-medium uppercase tracking-tight leading-[1.08]">
          WASH WITHOUT
          <br />
          LIMITS
        </h2>

        {/* Blue Accent Underline */}
        <div className="w-14 h-[2.5px] bg-[#0066cc] mt-2.5 mb-2.5 rounded-full" />

        {/* Subtitle */}
        <p className="text-[#8892a0] font-open-sans text-xs font-bold tracking-[0.24em] uppercase mb-6">
          AQUAFORCE 1400
        </p>

        {/* Two Images Side-by-Side (2 Columns) */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto mb-6">
          {/* Left Portrait Image: Car Exterior Wash */}
          <div className="relative w-full h-[240px] sm:h-[290px] rounded-[20px] overflow-hidden shadow-sm">
            <Image
              src="/images/product-image-left.png"
              alt="AMEC Aquaforce 1400 outdoor car detailing"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right Portrait Image: Car Interior Cleaning */}
          <div className="relative w-full h-[240px] sm:h-[290px] rounded-[20px] overflow-hidden shadow-sm">
            <Image
              src="/images/product-image-right.png"
              alt="AMEC Aquaforce 1400 cordless vehicle detailing"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* 5 Feature Badges (3 in Top Row, 2 in Bottom Row) */}
        <div className="flex flex-col items-center gap-2.5 w-full max-w-sm font-open-sans">
          {/* Row 1: NO SOCKET, NO CABLES, JUST FILL */}
          <div className="flex items-center justify-center gap-2 w-full">
            <span className="border-[1.5px] border-[#0e1726] rounded-[8px] px-3.5 py-1.5 text-[#0e1726] text-[11px] font-bold uppercase tracking-wider bg-transparent">
              NO SOCKET
            </span>
            <span className="border-[1.5px] border-[#0e1726] rounded-[8px] px-3.5 py-1.5 text-[#0e1726] text-[11px] font-bold uppercase tracking-wider bg-transparent">
              NO CABLES
            </span>
            <span className="border-[1.5px] border-[#0e1726] rounded-[8px] px-3.5 py-1.5 text-[#0e1726] text-[11px] font-bold uppercase tracking-wider bg-transparent">
              JUST FILL
            </span>
          </div>

          {/* Row 2: SWITCH ON, WASH */}
          <div className="flex items-center justify-center gap-2">
            <span className="border-[1.5px] border-[#0e1726] rounded-[8px] px-5 py-1.5 text-[#0e1726] text-[11px] font-bold uppercase tracking-wider bg-transparent">
              SWITCH ON
            </span>
            <span className="border-[1.5px] border-[#0e1726] rounded-[8px] px-5 py-1.5 text-[#0e1726] text-[11px] font-bold uppercase tracking-wider bg-transparent">
              WASH
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP LAYOUT (>= md) - Full-Bleed 3-Column Banner */}
      {/* ========================================================= */}
      <div className="hidden md:grid grid-cols-12 w-full min-h-[460px] lg:min-h-[520px]">
        {/* Left Column Image (Edge-to-Edge) */}
        <div className="md:col-span-4 relative h-full min-h-[340px] overflow-hidden">
          <Image
            src="/images/product-image-left.png"
            alt="AMEC Aquaforce 1400 outdoor car detailing"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 35vw"
            className="object-cover object-center"
          />
        </div>

        {/* Center Column: Clean White Card with Title, Subtitle & Badges */}
        <div className="md:col-span-4 bg-white flex flex-col items-center justify-center text-center px-6 sm:px-8 py-12 md:py-8 z-10 shadow-xs">
          {/* Main Title */}
          <h2 className="text-[#0e1726] font-montserrat text-3xl sm:text-4xl lg:text-[40px] font-medium uppercase tracking-tight leading-[1.08]">
            WASH WITHOUT
            <br />
            LIMITS
          </h2>

          {/* Blue Accent Underline */}
          <div className="w-14 h-[2px] bg-[#0080ff] my-3.5 rounded-full" />

          {/* Subtitle */}
          <p className="text-slate-500 font-open-sans text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase mb-8">
            AQUAFORCE 1400
          </p>

          {/* 5 Feature Badges */}
          <div className="flex flex-col items-center gap-3 w-full max-w-sm font-open-sans">
            {/* Top Row Badges */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
              <span className="border border-slate-700/80 rounded-[6px] px-5 py-2 text-slate-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-transparent">
                NO SOCKET
              </span>
              <span className="border border-slate-700/80 rounded-[6px] px-5 py-2 text-slate-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-transparent">
                NO CABLES
              </span>
            </div>

            {/* Bottom Row Badges */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
              <span className="border border-slate-700/80 rounded-[6px] px-4 py-2 text-slate-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-transparent">
                JUST FILL
              </span>
              <span className="border border-slate-700/80 rounded-[6px] px-4 py-2 text-slate-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-transparent">
                SWITCH ON
              </span>
              <span className="border border-slate-700/80 rounded-[6px] px-5 py-2 text-slate-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-transparent">
                WASH
              </span>
            </div>
          </div>
        </div>

        {/* Right Column Image (Edge-to-Edge) */}
        <div className="md:col-span-4 relative h-full min-h-[340px] overflow-hidden">
          <Image
            src="/images/product-image-right.png"
            alt="AMEC Aquaforce 1400 cordless vehicle detailing"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 35vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
