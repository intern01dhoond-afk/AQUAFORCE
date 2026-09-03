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
            <div className="relative w-[150px] h-[36px] sm:w-[200px] sm:h-[48px] shrink-0">
              <Image
                src="/images/promec-logo.svg"
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
            &copy; 2026 PROMEC. All Rights Reserved.
          </div>

          {/* Right: Social Media Icons */}
          <div className="flex items-center gap-5 text-white/60">
            <a
              href="https://www.facebook.com/share/19cRYjSKRA/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition-colors duration-200"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/promec.india?igsi=MXpocDh4NGJyc3F3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors duration-200"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://youtube.com/@promectools?si=2IvjOZwgD73HWBaP"
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
    <ReturnPolicyModal isOpen={isReturnPolicyOpen} onClose={() => setIsReturnPolicyOpen(false)} />
  </>
  );
}
