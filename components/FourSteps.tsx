import Image from "next/image";

const STEPS = [
  {
    n: "01",
    title: "Fill Water",
    desc: "Submerge the filter hose in any clean water bucket",
  },
  {
    n: "02",
    title: "Connect Hose",
    desc: "Click the quick connector into the coupling securely",
  },
  {
    n: "03",
    title: "Switch ON",
    desc: "Press the trigger lock to start the pressure pump.",
  },
  {
    n: "04",
    title: "Start Washing",
    desc: "Select your spray angle and sweep away the grit.",
  },
];

export default function FourSteps() {
  return (
    <section
      id="how-it-works"
      className="relative w-full min-h-[660px] sm:min-h-[720px] lg:min-h-[820px] flex flex-col justify-between py-14 sm:py-18 lg:py-20 bg-black overflow-hidden"
    >
      {/* Mobile Cinematic Background Image (Full-Bleed 100vw) */}
      <div className="sm:hidden absolute inset-0 z-0">
        <Image
          src="/images/4 steps mobile.png"
          alt="AMEC Aquaforce 4 Steps to Pristine Clean mobile background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft Contrast Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
      </div>

      {/* Desktop Cinematic Background Image (Full-Bleed 100vw) */}
      <div className="hidden sm:block absolute inset-0 z-0">
        <Image
          src="/images/four-steps-bg.png"
          alt="AMEC Aquaforce on workshop workbench 4 Steps to Pristine Clean"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft Contrast Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
      </div>

      {/* Top Heading */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-white">
          <span className="block font-open-sans text-base sm:text-lg lg:text-xl font-bold tracking-[0.25em] uppercase text-white/90 mb-1 drop-shadow">
            4 STEPS TO
          </span>
          <span className="block font-montserrat-alternates text-4xl sm:text-5xl lg:text-[67.23px] font-medium text-white tracking-normal drop-shadow-md leading-tight">
            Pristine Clean
          </span>
        </h2>
      </div>

      {/* Bottom 4-Step Bordered Glass Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[77px] mt-10 sm:mt-14">
        <div className="w-full max-w-[1286px] mx-auto bg-black/60 backdrop-blur-xl border border-white/20 rounded-[8px] py-[16px] px-[14px] shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="flex items-center gap-4 px-3 sm:px-4 py-3.5 sm:py-1 lg:py-2"
              >
                {/* Step Number (Exact Light Sans Font Style) */}
                <span className="font-open-sans text-[42px] sm:text-[46px] lg:text-[50px] font-light text-white leading-none shrink-0 tracking-tighter select-none">
                  {step.n}
                </span>
                {/* Step Content */}
                <div className="flex flex-col justify-center">
                  <h3 className="font-montserrat text-xs sm:text-[13px] lg:text-sm font-bold text-white tracking-wide">
                    {step.title}
                  </h3>
                  <p className="font-open-sans text-[11px] sm:text-[11.5px] text-white/80 font-normal leading-snug mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
