"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useOrderModal } from "@/context/OrderModalContext";
import ScrollReveal from "./ScrollReveal";

export default function CTABanner() {
  const { openModal } = useOrderModal();

  return (
    <section className="w-full bg-white flex flex-col items-center self-stretch py-8 sm:py-12 lg:py-16 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="w-full max-w-[1440px] mx-auto flex justify-center">
        {/* Rounded CTA Card */}
        <ScrollReveal direction="zoom" duration={0.7} className="relative w-full max-w-[1280px] min-h-[440px] xs:min-h-[480px] sm:min-h-[320px] lg:min-h-[360px] rounded-[18px] sm:rounded-[24px] overflow-hidden flex items-center shadow-[0_20px_45px_-12px_rgba(15,23,42,0.22)]">
          {/* Mobile Background Image */}
          <div className="sm:hidden absolute inset-0 z-0">
            <Image
              src="/images/mobile-banner-2-alt.png"
              alt="AMEC Aquaforce 1400 Portable Pressure Washer"
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-cover object-top"
            />
            {/* Soft gradient at the bottom for crisp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>

          {/* Desktop Background Image */}
          <div className="hidden sm:block absolute inset-0 z-0">
            <Image
              src="/images/pressure-washer-banner-5b.png"
              alt="AMEC Aquaforce 1400 Portable Pressure Washer"
              fill
              priority
              quality={100}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
            />
          </div>

          {/* Card Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-end sm:justify-center items-start p-5 xs:p-6 sm:p-10 md:p-12 pb-6 xs:pb-8 lg:py-0 sm:pl-[46%] md:pl-[48%] lg:pl-[50%] lg:pr-10 xl:pl-[50%]">
            <h2 className="text-[22px] xs:text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-bold font-montserrat text-white leading-[1.18] tracking-tight drop-shadow-sm">
              Ready to Make Vehicle
              <br className="hidden sm:inline" />
              {" "}Washing Easier?
            </h2>

            <p className="text-white/90 text-[13px] xs:text-sm sm:text-base lg:text-[16px] font-normal font-open-sans mt-2 sm:mt-3 drop-shadow-xs">
              Go Cordless. Go Portable. Go Aquaforce.
            </p>

            <button
              type="button"
              onClick={openModal}
              className="mt-4 xs:mt-5 sm:mt-6 lg:mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 active:bg-slate-100 text-[#0062ff] font-montserrat text-xs sm:text-sm font-bold tracking-wider uppercase px-6 sm:px-7 py-3 sm:py-3.5 rounded-[8px] shadow-md transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer group"
            >
              <span>BUY NOW</span>
              <ArrowRight className="w-4 h-4 text-[#0062ff] transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
