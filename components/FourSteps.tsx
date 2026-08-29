import Image from "next/image";
import ScrollReveal, { ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";

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
      className="relative w-full min-h-[750px] xs:min-h-[820px] sm:min-h-[880px] lg:min-h-[940px] flex flex-col justify-between pt-10 xs:pt-12 sm:pt-16 pb-8 xs:pb-10 sm:pb-12 bg-black overflow-hidden"
    >
      {/* Mobile Cinematic Background Image */}
      <div className="sm:hidden absolute inset-0 z-0">
        <Image
          src="/aquaforceforautocare/images/Remainig%20images/mobile%20banner%207.1.webp"
          alt="Aquaforce 4 Steps to Pristine Clean mobile background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        {/* Soft Contrast Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/60" />
      </div>

      {/* Desktop Cinematic Background Image */}
      <div className="hidden sm:block absolute inset-0 z-0">
        <Image
          src="/aquaforceforautocare/images/Remainig%20images/four-steps-desktop.webp"
          alt="Aquaforce on workshop workbench 4 Steps to Pristine Clean"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        {/* Soft Contrast Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50" />
      </div>

      {/* Top Heading */}
      <ScrollReveal direction="down" className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-white">
          <span className="block font-open-sans text-xs xs:text-sm sm:text-lg lg:text-xl font-bold tracking-[0.22em] uppercase text-white/90 mb-1 drop-shadow">
            4 STEPS TO
          </span>
          <span className="block font-montserrat-alternates text-3xl xs:text-4xl sm:text-5xl lg:text-[67.23px] font-medium text-white tracking-normal drop-shadow-md leading-tight">
            Pristine Clean
          </span>
        </h2>
      </ScrollReveal>

      {/* Bottom 4-Step Bordered Glass Container (2x2 on Mobile, 4-Col on Desktop) */}
      <ScrollReveal direction="up" delay={0.1} className="relative z-10 w-full max-w-[1440px] mx-auto px-3 sm:px-8 lg:px-[77px] mt-44 xs:mt-52 sm:mt-60 lg:mt-64">
        <div className="w-full max-w-[1286px] mx-auto bg-black/65 backdrop-blur-xl border border-white/20 rounded-[12px] sm:rounded-[8px] py-3 xs:py-4 px-2.5 xs:px-3 sm:px-4 shadow-2xl">
          <ScrollRevealStagger className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-0 sm:divide-x divide-white/20" staggerDelay={0.08}>
            {STEPS.map((step) => (
              <ScrollRevealItem
                key={step.n}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 xs:gap-2.5 sm:gap-4 p-2 xs:p-2.5 sm:px-4 sm:py-2 bg-white/5 sm:bg-transparent rounded-lg sm:rounded-none border border-white/10 sm:border-none"
              >
                {/* Step Number (Exact Light Sans Font Style) */}
                <span className="font-open-sans text-[26px] xs:text-[32px] sm:text-[46px] lg:text-[50px] font-light text-sky-400 sm:text-white leading-none shrink-0 tracking-tighter select-none">
                  {step.n}
                </span>
                {/* Step Content */}
                <div className="flex flex-col justify-center">
                  <h3 className="font-montserrat text-[11px] xs:text-xs sm:text-[13px] lg:text-sm font-bold text-white tracking-wide">
                    {step.title}
                  </h3>
                  <p className="font-open-sans text-[10px] xs:text-[11px] sm:text-[11.5px] text-white/80 font-normal leading-snug mt-0.5 sm:mt-1">
                    {step.desc}
                  </p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </ScrollReveal>
    </section>
  );
}
