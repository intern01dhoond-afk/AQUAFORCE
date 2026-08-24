"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 sm:gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-6 sm:p-7 rounded-2xl border border-slate-200/70 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05)] w-full transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:border-slate-300/80 flex flex-col justify-between"
                  key={i}
                >
                  <div className="text-slate-600 text-[13.5px] sm:text-[14px] leading-relaxed font-open-sans">
                    {text}
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover shrink-0"
                    />
                    <div className="flex flex-col font-open-sans min-w-0">
                      <div className="font-semibold text-slate-900 tracking-tight text-sm leading-tight truncate">
                        {name}
                      </div>
                      <div className="text-xs text-slate-500 tracking-tight leading-tight mt-0.5 truncate">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
