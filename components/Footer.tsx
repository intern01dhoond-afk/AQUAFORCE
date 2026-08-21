"use client";

import Image from "next/image";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useOrderModal } from "@/context/OrderModalContext";

export default function Footer() {
  const { openModal } = useOrderModal();

  return (
    <footer className="bg-[#0b0c0e] text-white py-16 sm:py-20 border-t border-white/5 w-full">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px] flex flex-col items-center text-center">
        {/* Brand Shield Emblem & Wordmark */}
        <a
          href="https://www.amectechnology.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center group mb-8"
        >
          {/* AMEC Shield Icon */}
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 mb-3">
            <Image
              src="/logo_shield.png"
              alt="AMEC Shield Logo"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>

          {/* AMEC Technology Wordmark */}
          <div className="relative h-6 sm:h-7 w-32 sm:w-40 shrink-0">
            <Image
              src="/logo_amec_new.png"
              alt="AMEC TECHNOLOGY"
              fill
              sizes="160px"
              className="object-contain object-center"
            />
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-medium text-white/80">
          <a href="#home" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <button
            type="button"
            onClick={openModal}
            className="hover:text-white transition-colors cursor-pointer font-medium focus:outline-none"
          >
            Shop Now
          </button>
          <a href="mailto:info@amecmobility.com" className="hover:text-white transition-colors">
            Contact Us
          </a>
        </nav>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/10 my-10 sm:my-12" />

        {/* Bottom 3-Column Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-white/40">
          {/* Left: Copyright */}
          <div>
            &copy; 2026 AMEC Technology. All Rights Reserved.
          </div>

          {/* Center: Social Icons */}
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

          {/* Right: Policies */}
          <div className="flex items-center gap-1.5 text-white/40">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">
              Cookies Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
