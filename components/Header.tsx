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
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 lg:px-10">
      <div className="max-w-[1360px] w-full h-[62px] sm:h-[72px] lg:h-[76px] mx-auto bg-white/10 backdrop-blur-md border border-white/25 rounded-[14px] sm:rounded-[16px] px-4 sm:px-6 py-2 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] transition-all">
        {/* AMEC Technology Brand Logo */}
        <a
          href="https://www.amectechnology.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group shrink-0"
        >
          {/* AMEC Shield Image */}
          <div className="relative w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] lg:w-[42px] lg:h-[42px] shrink-0">
            <Image
              src="/logo_shield.png"
              alt="AMEC Shield"
              fill
              priority
              sizes="(max-width: 640px) 32px, 42px"
              className="object-contain drop-shadow-sm"
            />
          </div>

          {/* AMEC Technology Wordmark */}
          <div className="relative w-[110px] h-[22px] sm:w-[130px] sm:h-[26px] lg:w-[145px] lg:h-[28px] shrink-0">
            <Image
              src="/logo_amec_new.png"
              alt="AMEC TECHNOLOGY"
              fill
              priority
              sizes="(max-width: 640px) 110px, 145px"
              className="object-contain object-left"
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
            className="bg-white hover:bg-slate-100 text-[#0f172a] text-xs font-black tracking-wider uppercase px-5 lg:px-6 py-2.5 rounded-[6px] shadow-sm transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer font-montserrat"
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
              className="mt-2 w-full inline-flex items-center justify-center bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs font-black tracking-wider uppercase px-5 py-3.5 rounded-[8px] shadow-lg shadow-blue-600/30 cursor-pointer active:scale-98 transition-all"
            >
              SHOP NOW &rarr;
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
