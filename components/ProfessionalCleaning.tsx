import Image from "next/image";

export default function ProfessionalCleaning() {
  return (
    <section id="why-section" className="py-14 sm:py-16 lg:py-[80px] bg-white w-full">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px]">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-sky-600/50 font-open-sans text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-slate-900 bg-transparent mb-5">
          WHY AQUAFORCE 1400?
        </div>

        {/* Section Heading & Copy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6 max-w-[611px]">
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium font-montserrat text-[#0F1729] leading-[1.1] tracking-tight">
              Professional Cleaning.
              <br />
              No Power Socket
              <br />
              Needed.
            </h2>
          </div>

          <div className="lg:col-span-6 max-w-[649px] font-open-sans text-[#333340] text-base sm:text-lg lg:text-[20px] font-normal leading-[1.6] space-y-5 pt-1">
            <p>
              Traditional pressure washers require a continuous power
              connection, making it difficult to clean vehicles in open areas,
              parking lots or locations without convenient electrical access.
            </p>
            <p>
              Aquaforce 1400 changes that. Its integrated lithium-ion battery
              system powers the pressure pump, allowing you to carry the
              machine wherever you need it and start cleaning without
              connecting it to a power socket.
            </p>
          </div>
        </div>

        {/* Bottom Image Cards (Exact Figma: Left 940px, Right 324px, Height 364px, Gap 16px) */}
        <div className="flex flex-col lg:flex-row gap-4 mt-10 sm:mt-12 w-full">
          {/* Left Wide Card: 940px x 364px */}
          <div className="w-full lg:w-[940px] h-[240px] sm:h-[300px] lg:h-[364px] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg shrink-0">
            <Image
              src="/images/pro-clean-car.png"
              alt="Car detailing with high pressure water spray outdoors"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 940px"
              className="object-cover"
            />
          </div>

          {/* Right Card: 324px x 364px */}
          <div className="w-full lg:w-[324px] h-[240px] sm:h-[300px] lg:h-[364px] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg shrink-0">
            <Image
              src="/images/pro-clean-bike.png"
              alt="Pressure washing motorbike outdoors"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 324px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
