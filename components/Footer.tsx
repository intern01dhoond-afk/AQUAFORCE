"use client";

import { useState } from "react";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useOrderModal } from "@/context/OrderModalContext";
import ReturnPolicyModal from "./ReturnPolicyModal";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  const { openModal } = useOrderModal();
  const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#0b0c0e] text-white py-10 xs:py-14 sm:py-20 border-t border-white/5 w-full">
        <ScrollReveal direction="up" className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-[80px] flex flex-col items-center text-center">
          {/* PROMEC Brand Logo */}
          <div className="flex flex-col items-center group mb-6 sm:mb-8 select-none">
            <div className="relative w-[150px] h-[32px] sm:w-[170px] sm:h-[36px]">
              <Image
                src="/aquaforceforautocare/images/promec-logo.svg"
                alt="PROMEC"
                fill
                sizes="(max-width: 640px) 150px, 170px"
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 xs:gap-6 sm:gap-10 text-xs xs:text-sm font-medium text-white/80">
            <a href="#home" className="hover:text-white transition-colors py-1 px-1.5">
              Home
            </a>
            <a href="#features" className="hover:text-white transition-colors py-1 px-1.5">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors py-1 px-1.5">
              How It Works
            </a>
            <button
              type="button"
              onClick={() => setIsReturnPolicyOpen(true)}
              className="hover:text-white transition-colors cursor-pointer font-medium focus:outline-none py-1 px-1.5"
            >
              Return Policy
            </button>
            <button
              type="button"
              onClick={openModal}
              className="hover:text-white transition-colors cursor-pointer font-medium focus:outline-none py-1 px-1.5"
            >
              Buy Now
            </button>
          </nav>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/10 my-6 sm:my-12" />

        {/* Bottom Bar: Copyright on Left, Social Icons on Right */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 text-xs text-white/50">
          {/* Left: Copyright */}
          <div>
            &copy; 2026 PROMEC. All rights reserved @ AMEC MOBILITY PRIVATE LIMITED
          </div>

          {/* Right: Social Media Icons */}
          <div className="flex items-center gap-5 text-white/60">
            <a
              href="https://www.facebook.com/promecindia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition-colors duration-200"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/promec.india"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors duration-200"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@PROMECIndia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-white transition-colors duration-200"
            >
              <Youtube size={19} />
            </a>
            <a
              href="https://x.com/promecindia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-white transition-colors duration-200"
            >
              <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/promecindia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors duration-200"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </footer>
    <ReturnPolicyModal isOpen={isReturnPolicyOpen} onClose={() => setIsReturnPolicyOpen(false)} />
  </>
  );
}
