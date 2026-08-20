import Image from "next/image";

export default function ProfessionalCleaning() {
  return (
    <section id="why-section" className="py-14 sm:py-16 lg:py-[80px] bg-white w-full">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px]">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-sky-600/50 text-[10px] sm:text-[11px] font-black tracking-[0.16em] uppercase text-slate-900 bg-transparent mb-5">
          WHY AQUAFORCE 1400?
        </div>

        {/* Section Heading & Copy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[42px] font-black text-slate-900 leading-[1.12] tracking-tight">
              Professional Cleaning.
              <br />
              No Power Socket
              <br />
              Needed.
            </h2>
          </div>

          <div className="lg:col-span-6 text-slate-600 text-sm sm:text-[15px] leading-relaxed space-y-4 pt-1">
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
          <div className="w-full lg:w-[940px] h-[240px] sm:h-[300px] lg:h-[364px] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group shrink-0">
            <Image
              src="/images/pro-clean-car.png"
              alt="Car detailing with high pressure water spray outdoors"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 940px"
              className="object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>

          {/* Right Card: 324px x 364px */}
          <div className="w-full lg:w-[324px] h-[240px] sm:h-[300px] lg:h-[364px] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group shrink-0">
            <Image
              src="/images/pro-clean-bike.png"
              alt="Pressure washing motorbike outdoors"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 324px"
              className="object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
