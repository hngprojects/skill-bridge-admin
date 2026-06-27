"use client";

import { motion } from "motion/react";

import { landingEase } from "./landing-motion";

export function HeroCurve() {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[130%] -translate-x-1/2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.55, ease: landingEase }}
    >
      <svg
        className="h-10 w-full md:h-auto"
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden
      >
        <ellipse cx="720" cy="720" rx="1200" ry="720" fill="white" />
      </svg>
    </motion.div>
  );
}
