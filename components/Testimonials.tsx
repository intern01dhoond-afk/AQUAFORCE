"use client";

import React from "react";
import { TestimonialsColumn, Testimonial } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials: Testimonial[] = [
  {
    text: "The Aquaforce 1400 has completely changed the way I wash my car. No power socket, no long cables — just fill it up and start cleaning. The pressure is surprisingly powerful.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    name: "Rahul Sharma",
    role: "Car Owner, Mumbai",
  },
  {
    text: "I bought this mainly for bike cleaning and it works brilliantly. It's compact, easy to carry and powerful enough to remove mud and dirt from every corner of my bike.",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    name: "Arjun Mehta",
    role: "Bike Enthusiast, Pune",
  },
  {
    text: "What I love most is that I don't need a power connection. I can take the Aquaforce anywhere and clean my car within minutes. The cordless design makes it incredibly convenient.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    name: "Priya Nair",
    role: "Car Owner, Bengaluru",
  },
  {
    text: "The pressure is much better than I expected from such a compact machine. It handled stubborn dirt on my SUV, wheels and floor without any problem.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Vikram Reddy",
    role: "SUV Owner, Hyderabad",
  },
  {
    text: "I run a small detailing setup and this has become one of my most useful tools. It's portable, quick to set up and makes vehicle cleaning much easier.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    name: "Karthik Rao",
    role: "Auto Detailer, Chennai",
  },
  {
    text: "The compact design is a huge advantage. I can keep it in my car and take it anywhere. Great for quick washes when travelling or when there is no proper washing facility nearby.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    name: "Sneha Kapoor",
    role: "Travel Enthusiast, Delhi NCR",
  },
  {
    text: "From cleaning my car and bike to washing the driveway, the Aquaforce handles everything easily. The setup is simple and the machine feels solid and well built.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    name: "Manoj Kumar",
    role: "Homeowner, Chandigarh",
  },
  {
    text: "I was looking for a portable pressure washer that didn't depend on a power socket, and this was exactly what I needed. Excellent pressure and very convenient to use.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    name: "Ananya Rao",
    role: "Car Owner, Kochi",
  },
  {
    text: "The Aquaforce 1400 makes regular car washing much faster. It's powerful, portable and easy to store. Definitely a useful upgrade from traditional hose washing.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    name: "Aditya Singh",
    role: "Automobile Enthusiast, Jaipur",
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
            Real feedback from car enthusiasts, bike owners, and professionals across India who trust AMEC Aquaforce 1400.
          </p>
        </motion.div>

        {/* Animated Marquee Columns */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[720px] overflow-hidden w-full p-2">
            <TestimonialsColumn testimonials={firstColumn} duration={16} className="w-full" />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block w-full"
              duration={20}
            />
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
