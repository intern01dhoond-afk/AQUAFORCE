"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useOrderModal } from "@/context/OrderModalContext";

export default function CTABanner() {
  const { openModal } = useOrderModal();

  return (
    <section className="w-full bg-white flex flex-col items-center self-stretch py-10 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="w-full max-w-[1440px] mx-auto flex justify-center">
        {/* Rounded CTA Card (1280x360 desktop aspect) */}
        <div className="relative w-full max-w-[1280px] min-h-[300px] sm:min-h-[340px] lg:h-[360px] rounded-[20px] sm:rounded-[24px] overflow-hidden flex items-center shadow-[0_24px_50px_-12px_rgba(15,23,42,0.22),0_12px_24px_-8px_rgba(15,23,42,0.12)]">
          {/* Background Image using public/images/cta-card.png */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/cta-card.png"
              alt="AMEC Aquaforce 1400 Portable Pressure Washer"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-left md:object-center"
            />
            {/* Subtle mobile contrast gradient for small screens */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-blue-900/40 to-transparent sm:hidden" />
          </div>

          {/* Card Content positioned on right half */}
          <div className="relative z-10 w-full h-full flex flex-col justify-center items-start p-6 sm:p-10 md:p-12 lg:py-0 lg:pl-[47%] lg:pr-12 xl:pl-[48%]">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] xl:text-[40px] font-bold text-white leading-tight tracking-tight">
              Ready to Make Vehicle
              <br className="hidden sm:inline" />
              {" "}Washing Easier?
            </h2>

            <p className="text-white/95 text-sm sm:text-base lg:text-[16px] font-normal mt-2.5 sm:mt-3">
              Go Cordless. Go Portable. Go Aquaforce.
            </p>

            <button
              type="button"
              onClick={openModal}
              className="mt-5 sm:mt-6 lg:mt-7 inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0062ff] text-xs sm:text-sm font-bold tracking-wider uppercase px-6 sm:px-7 py-3 sm:py-3.5 rounded-[6px] shadow-md transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer group"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4 text-[#0062ff] transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
