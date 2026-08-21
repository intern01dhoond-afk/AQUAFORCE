"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useOrderModal } from "@/context/OrderModalContext";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useOrderModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 lg:px-10 transition-all duration-300">
      <div
        className={`max-w-[1360px] w-full h-[66px] sm:h-[76px] lg:h-[82px] mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-[#0b1a2e]/90 backdrop-blur-xl border border-white/20 rounded-[14px] sm:rounded-[16px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]"
            : "bg-transparent border-transparent shadow-none"
        }`}
      >
        {/* AMEC Technology Brand Logo */}
        <a
          href="https://www.amectechnology.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 sm:gap-3.5 group shrink-0"
        >
          {/* AMEC Shield Image (Exact larger proportion matching Image 2) */}
          <div className="relative w-[38px] h-[44px] sm:w-[46px] sm:h-[54px] lg:w-[52px] lg:h-[60px] shrink-0">
            <Image
              src="/logo_shield.png"
              alt="AMEC Shield"
              fill
              priority
              sizes="(max-width: 640px) 38px, 52px"
              className="object-contain drop-shadow-md"
            />
          </div>

          {/* AMEC Technology Wordmark */}
          <div className="relative w-[130px] h-[28px] sm:w-[160px] sm:h-[34px] lg:w-[180px] lg:h-[38px] shrink-0">
            <Image
              src="/logo_amec_new.png"
              alt="AMEC TECHNOLOGY"
              fill
              priority
              sizes="(max-width: 640px) 130px, 180px"
              className="object-contain object-left drop-shadow-md"
            />
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15px] lg:text-[17px] font-semibold text-white/95 hover:text-white transition-colors tracking-normal drop-shadow-xs"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Shop Now Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0062ff] text-xs font-bold tracking-wider uppercase px-5 lg:px-6 py-2.5 rounded-[6px] shadow-sm transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer font-montserrat group"
          >
            <span>SHOP NOW</span>
            <ArrowRight className="w-4 h-4 text-[#0062ff] transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg focus:outline-none transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden mt-2.5 max-w-7xl mx-auto bg-black/45 backdrop-blur-2xl border border-white/20 rounded-[14px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[17px] font-semibold text-white/95 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                openModal();
              }}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs font-black tracking-wider uppercase px-5 py-3.5 rounded-[8px] shadow-lg shadow-blue-600/30 cursor-pointer active:scale-98 transition-all"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4 text-white shrink-0" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
