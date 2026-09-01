"use client";

import Image from "next/image";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useOrderModal } from "@/context/OrderModalContext";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  const { openModal } = useOrderModal();

  return (
    <footer className="bg-[#0b0c0e] text-white py-10 xs:py-14 sm:py-20 border-t border-white/5 w-full">
      <ScrollReveal direction="up" className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-[80px] flex flex-col items-center text-center">
        {/* PROMEC Brand Logo */}
        <div className="flex flex-col items-center group mb-6 sm:mb-8 select-none">
          <div className="relative w-[150px] h-[36px] sm:w-[200px] sm:h-[48px] shrink-0">
            <Image
              src="/aquaforceforautocare/images/promec-logo.svg"
              alt="PROMEC"
              fill
              sizes="(max-width: 640px) 150px, 200px"
              className="object-contain object-center"
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
            onClick={openModal}
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
            &copy; 2026 PROMEC. All Rights Reserved.
          </div>

          {/* Right: Social Media Icons */}
          <div className="flex items-center gap-5 text-white/60">
            <a
              href="https://www.facebook.com/amectechnology/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition-colors duration-200"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/amectechnology/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors duration-200"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://x.com/AMECTechnology"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-white transition-colors duration-200 flex items-center"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://in.linkedin.com/company/amec-technology"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors duration-200"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.youtube.com/@amecmobility"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-white transition-colors duration-200"
            >
              <Youtube size={19} />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
