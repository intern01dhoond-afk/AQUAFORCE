"use client";

import React from "react";
import { TestimonialsColumn, Testimonial } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials: Testimonial[] = [
  {
    text: "Bhai honestly, apartment parking mein car wash karna was always a headache. Aquaforce lene ke baad wire aur socket ka jhanjhat hi khatam! Ek bucket paani aur 15 mins mein car ekdum showroom clean.",
    image: "/aquaforceforautocare/images/testimonials/rahul-sharma1.webp",
    name: "Rahul Sharma",
    role: "Car Enthusiast, Mumbai",
  },
  {
    text: "Weekend trail ride ke baad bike pe stubborn mud jam jata tha. The 1400 PSI pressure is seriously impressive — radiator ke delicate fins ko bina damage kiye saari mitti saaf kar deta hai.",
    image: "/aquaforceforautocare/images/testimonials/arjun-mehta1.webp",
    name: "Arjun Mehta",
    role: "Superbike Owner, Pune",
  },
  {
    text: "Cordless hone ka sabse bada advantage ye hai ki basement parking mein socket dhoondne ki tension nahi. Very lightweight, easy to carry, and the battery easily lasts for a full deep wash.",
    image: "/aquaforceforautocare/images/testimonials/priya-nair1.webp",
    name: "Priya Nair",
    role: "Creta Owner, Bengaluru",
  },
  {
    text: "I run a mobile auto detailing setup in Hyderabad. Customers are always amazed seeing a cordless pressure washer with such high power. Foam cannon ke sath turnaround time double fast ho gaya hai.",
    image: "/aquaforceforautocare/images/testimonials/vikram-reddy1.webp",
    name: "Vikram Reddy",
    role: "Auto Detailing Studio, Hyderabad",
  },
  {
    text: "Society mein water hose pipe allow nahi thi wash ke liye. Aquaforce is a lifesaver. Siphon pipe bucket mein daalo aur instantly powerful spray start. Balcony tiles aur car dono easily clean ho jaate hain.",
    image: "/aquaforceforautocare/images/testimonials/sneha-kapoor1.webp",
    name: "Sneha Kapoor",
    role: "Home & Garden, Delhi NCR",
  },
  {
    text: "Pehle Sunday car wash center pe 2 ghante line mein lagna padta tha. Ab ghar ke driveway pe 20 minutes mein complete DIY wash ho jata hai. Solid machine and powerful water throw!",
    image: "/aquaforceforautocare/images/testimonials/manoj-kumar1.webp",
    name: "Manoj Kumar",
    role: "Fortuner Owner, Chandigarh",
  },
  {
    text: "The 1400 PSI pressure rating is well calibrated for automotive paintwork. No swirl marks, high flow rate, and seamless cordless portability. Absolutely worth the investment.",
    image: "/aquaforceforautocare/images/testimonials/karthik-rao1.webp",
    name: "Karthik Rao",
    role: "Vehicle Care Expert, Chennai",
  },
  {
    text: "Compact design is a huge plus point. I keep it in the car boot during road trips. Whenever needed, kisi bhi bucket ya container se connect karke instant wash kar lo. Very convenient!",
    image: "/aquaforceforautocare/images/testimonials/ananya-rao1.webp",
    name: "Ananya Rao",
    role: "Daily Commuter, Kochi",
  },
  {
    text: "Thar off-roading ke baad remote locations mein wash karna pehle impossible tha. Ab highway dhabe pe bhi bucket paani se chassis aur tyre arches ekdum clean kar lete hain. Gazab product hai!",
    image: "/aquaforceforautocare/images/testimonials/aditya-singh1.webp",
    name: "Aditya Singh",
    role: "Off-Road Enthusiast, Jaipur",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section className="bg-white pt-8 sm:pt-10 lg:pt-12 pb-14 sm:pb-20 lg:pb-24 relative overflow-hidden w-full">
      <div className="w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[620px] mx-auto text-center px-4"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-sky-600/50 font-open-sans text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-slate-900 bg-transparent mb-3 sm:mb-4">
            CUSTOMER STORIES
          </div>

          {/* Main Title */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-medium font-montserrat text-[#0F1729] tracking-tight">
            What Our Users Say
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 font-open-sans max-w-xl mx-auto mt-2 sm:mt-3 text-xs xs:text-sm sm:text-base leading-relaxed">
            Real feedback from car enthusiasts, bike owners, and professionals across India who trust Aquaforce 1400.
          </p>
        </motion.div>

        {/* Animated Marquee Columns */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          {/* Mobile View: Shows ALL 9 Testimonials in single smooth marquee column */}
          <div className="block md:hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[640px] overflow-hidden w-full p-2">
            <TestimonialsColumn testimonials={testimonials} duration={28} className="w-full" />
          </div>

          {/* Desktop & Tablet View: 2 or 3 Parallel Columns */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[720px] overflow-hidden w-full p-2">
            <TestimonialsColumn testimonials={firstColumn} duration={16} className="w-full" />
            <TestimonialsColumn testimonials={secondColumn} duration={20} className="w-full" />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block w-full"
              duration={18}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
