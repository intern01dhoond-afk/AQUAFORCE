"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import React from "react";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "zoom" | "fade";
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  once?: boolean;
  margin?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.65,
  className = "",
  distance = 32,
  once = true,
  margin = "-60px",
  ...rest
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      case "zoom":
        return { opacity: 0, scale: 0.94, y: distance * 0.5 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "zoom":
        return { opacity: 1, scale: 1, y: 0 };
      default:
        return { opacity: 1, x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once, margin }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealStagger({
  children,
  staggerDelay = 0.12,
  className = "",
  margin = "-60px",
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  margin?: string;
}) {
  const staggerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      variants={staggerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  direction = "up",
  distance = 28,
  duration = 0.6,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "zoom" | "fade";
  distance?: number;
  duration?: number;
  className?: string;
}) {
  const getVariants = (): Variants => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0, transition: { duration, ease: "easeOut" } },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0, transition: { duration, ease: "easeOut" } },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0, transition: { duration, ease: "easeOut" } },
        };
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0.94, y: 15 },
          visible: { opacity: 1, scale: 1, y: 0, transition: { duration, ease: "easeOut" } },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration, ease: "easeOut" } },
        };
    }
  };

  return (
    <motion.div variants={getVariants()} className={className}>
      {children}
    </motion.div>
  );
}
