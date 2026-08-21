"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useOrderModal } from "@/context/OrderModalContext";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { openModal } = useOrderModal();

  return (
    <header className="fixed top-3 sm:top-6 left-0 right-0 z-50 px-3 sm:px-8 lg:px-[60px]">
      <div className="max-w-[1320px] w-full h-[62px] sm:h-[76px] lg:h-[80px] mx-auto bg-black/45 backdrop-blur-xl border border-white/15 rounded-[12px] sm:rounded-[8px] px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-2xl">
        {/* AMEC Technology Brand Logo */}
        <a
          href="https://www.amectechnology.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 sm:gap-[8px] group shrink-0"
        >
          {/* AMEC Shield Image */}
          <div className="relative w-[34px] h-[34px] sm:w-[42px] sm:h-[42px] lg:w-[48px] lg:h-[48px] shrink-0">
            <Image
              src="/logo_shield.png"
              alt="AMEC Shield"
              fill
              priority
              sizes="(max-width: 640px) 34px, 48px"
              className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
            />
          </div>

          {/* AMEC Technology Wordmark */}
          <div className="relative w-[105px] h-[22px] sm:w-[130px] sm:h-[26px] lg:w-[142px] lg:h-[28px] shrink-0">
            <Image
              src="/logo_amec_new.png"
              alt="AMEC TECHNOLOGY"
              fill
              priority
              sizes="(max-width: 640px) 105px, 142px"
              className="object-contain object-left"
            />
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[17px] lg:text-[19px] font-semibold text-white/90 hover:text-white transition-colors tracking-normal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Shop Now Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={openModal}
            className="bg-white hover:bg-slate-100 text-slate-900 text-xs font-black tracking-wider uppercase px-5 lg:px-6 py-2.5 rounded-[4px] shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            SHOP NOW
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
        <div className="md:hidden mt-2 max-w-7xl mx-auto bg-black/90 backdrop-blur-2xl border border-white/15 rounded-[12px] p-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-semibold text-white/90 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/10 transition-colors"
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
              className="mt-2 w-full inline-flex items-center justify-center bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs font-black tracking-wider uppercase px-5 py-3 rounded-[6px] shadow-lg shadow-blue-600/30 cursor-pointer active:scale-98"
            >
              SHOP NOW →
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
