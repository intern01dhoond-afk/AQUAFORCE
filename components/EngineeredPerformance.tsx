import Image from "next/image";

export default function EngineeredPerformance() {
  return (
    <section
      id="features"
      className="pt-14 sm:pt-16 pb-6 sm:pb-7 bg-gradient-to-b from-[#bcdbf5] via-[#dcebf9] to-[#c2def6] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center px-4 py-1 rounded-full border border-sky-600/50 font-open-sans text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-slate-900 bg-transparent mb-3.5">
          PRECISION ENGINEERING
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-montserrat text-[#0F1729] tracking-tight">
          Engineered For Ultimate Performance
        </h2>
        <p className="text-slate-600 font-open-sans max-w-xl mx-auto mt-2.5 text-sm sm:text-base">
          Explore the mechanical innovations that make cordless high-pressure
          cleaning a reality.
        </p>
      </div>

      {/* Main Grid: Left 4 Features, Enlarged Center 3D Machine, Right 4 Features */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center mt-6 sm:mt-8">
        {/* Center Column: Enlarged 3D AMEC Aquaforce Machine Render with Radiant Glow (Order 1 on mobile) */}
        <div className="order-1 lg:order-2 lg:col-span-6 flex items-center justify-center my-4 lg:my-0 relative">
          {/* Radiant Brightness Spotlight / Backlight */}
          <div className="absolute w-64 h-64 sm:w-96 sm:h-96 lg:w-[460px] lg:h-[460px] bg-white/85 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-white rounded-full blur-2xl pointer-events-none" />

          {/* Machine Image Container */}
          <div className="relative z-10 w-72 h-80 sm:w-[420px] sm:h-[480px] lg:w-[460px] lg:h-[530px] xl:w-[500px] xl:h-[560px]">
            <Image
              src="/images/aquaforce-machine.png"
              alt="AMEC Aquaforce 1400 PSI TECH portable high pressure washer machine"
              fill
              priority
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 440px, 520px"
              className="object-contain drop-shadow-[0_25px_45px_rgba(15,40,75,0.28)]"
            />
          </div>
        </div>

        {/* Left Column (4 Features) - Order 2 on mobile */}
        <div className="order-2 lg:order-1 lg:col-span-3 flex flex-col gap-6 sm:gap-11 text-left lg:text-right">
          {/* Feature 1: Powerful Battery */}
          <div className="flex lg:flex-row-reverse items-start gap-4">
            <div className="shrink-0 text-sky-700 mt-0.5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="6" width="16" height="12" rx="2.5" />
                <path d="M22 10V14" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-extrabold font-montserrat text-slate-900">
                Powerful Battery Operation
              </h3>
              <p className="text-xs text-slate-600 font-open-sans mt-1 leading-relaxed max-w-[260px] lg:ml-auto">
                High-voltage lithium cells deliver constant output throughout every wash cycle
              </p>
            </div>
          </div>

          {/* Feature 2: 3 Hours Continuous */}
          <div className="flex lg:flex-row-reverse items-start gap-4">
            <div className="shrink-0 text-sky-700 mt-0.5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12H7L10 4L14 20L17 12H22" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-extrabold font-montserrat text-slate-900">
                3 Hours Continuous Use
              </h3>
              <p className="text-xs text-slate-600 font-open-sans mt-1 leading-relaxed max-w-[260px] lg:ml-auto">
                Extended runtime for multiple vehicle cleaning sessions
              </p>
            </div>
          </div>

          {/* Feature 3: No Socket Required */}
          <div className="flex lg:flex-row-reverse items-start gap-4">
            <div className="shrink-0 text-sky-700 mt-0.5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3L14.2 9.8L21 12L14.2 14.2L12 21L9.8 14.2L3 12L9.8 9.8L12 3Z" />
                <path d="M18.5 5.5L17 7M5.5 18.5L7 17M18.5 18.5L17 17M5.5 5.5L7 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-extrabold font-montserrat text-slate-900">
                No Power Socket Required
              </h3>
              <p className="text-xs text-slate-600 font-open-sans mt-1 leading-relaxed max-w-[260px] lg:ml-auto">
                Complete operational freedom anywhere without relying on external power sources
              </p>
            </div>
          </div>

          {/* Feature 4: Cordless & Portable */}
          <div className="flex lg:flex-row-reverse items-start gap-4">
            <div className="shrink-0 text-sky-700 mt-0.5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3L10 21L12 12L21 10L3 3Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-extrabold font-montserrat text-slate-900">
                Cordless &amp; Portable
              </h3>
              <p className="text-xs text-slate-600 font-open-sans mt-1 leading-relaxed max-w-[260px] lg:ml-auto">
                Zero cables, lightweight chassis for easy maneuvering
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (4 Features) - Order 3 on mobile */}
        <div className="order-3 lg:order-3 lg:col-span-3 flex flex-col gap-6 sm:gap-11 text-left">
          {/* Feature 5: Built-in Pressure Pump */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-sky-700 mt-0.5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="4" width="16" height="16" rx="2.5" />
                <rect x="8.5" y="8.5" width="7" height="7" rx="1" />
                <path d="M9 1V4M15 1V4M9 20V23M15 20V23M20 9H23M20 15H23M1 9H4M1 15H4" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-extrabold font-montserrat text-slate-900">
                Built-In Pressure Pump
              </h3>
              <p className="text-xs text-slate-600 font-open-sans mt-1 leading-relaxed max-w-[260px]">
                Industrial DC pump for maximum water velocity and consistent high-pressure output
              </p>
            </div>
          </div>

          {/* Feature 6: Vehicle Detailing Optimized */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-sky-700 mt-0.5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="9" r="6" />
                <path d="M8.21 13.89L7 22L12 19L17 22L15.79 13.88" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-extrabold font-montserrat text-slate-900">
                Vehicle Detailing Optimized
              </h3>
              <p className="text-xs text-slate-600 font-open-sans mt-1 leading-relaxed max-w-[260px]">
                Precision nozzle for targeted cleaning on wheels, panels, and tight crevices
              </p>
            </div>
          </div>

          {/* Feature 7: Zero Power Reliance */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-sky-700 mt-0.5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2V4.5M12 19.5V22M2 12H4.5M19.5 12H22M4.93 4.93L6.7 6.7M17.3 17.3L19.07 19.07M4.93 19.07L6.7 17.3M17.3 6.7L19.07 4.93" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-extrabold font-montserrat text-slate-900">
                Zero Power Reliance
              </h3>
              <p className="text-xs text-slate-600 font-open-sans mt-1 leading-relaxed max-w-[260px]">
                Clean freely during load shedding or in remote areas
              </p>
            </div>
          </div>

          {/* Feature 8: Compact & Easy to Carry */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-sky-700 mt-0.5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-extrabold font-montserrat text-slate-900">
                Compact &amp; Easy to Carry
              </h3>
              <p className="text-xs text-slate-600 font-open-sans mt-1 leading-relaxed max-w-[260px]">
                Dual-module design fits in any vehicle trunk for easy transport and storage
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
