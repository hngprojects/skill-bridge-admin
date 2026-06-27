"use client";

import { motion } from "motion/react";

import { LANDING_PLATFORM_METRICS } from "@/constants/landing-page";

import { landingEase } from "./landing-motion";

export function PlatformOverviewCard() {
  return (
    <div className="min-h-75 rotate-1 rounded-[24px] bg-landing-teal p-6 md:min-h-95 md:rotate-3 md:rounded-[28px] md:p-8">
      <h3 className="text-xl font-bold text-gray-900 md:text-2xl">
        Platform overview
      </h3>
      <p className="mt-1 text-sm leading-snug text-gray-700 md:mt-2 md:text-[15px]">
        Monitor activity across talents, employers, and support workflows.
      </p>

      <div className="mt-5 overflow-hidden rounded-[18px] bg-landing-dark md:mt-6 md:rounded-[20px]">
        <div className="space-y-4 px-4 py-5 md:space-y-5 md:px-5 md:py-6">
          {LANDING_PLATFORM_METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: 1.05 + index * 0.07,
                ease: landingEase,
              }}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[10px] text-gray-300 md:text-xs">
                  {metric.label}
                </span>
                <span className="text-[10px] font-semibold text-white md:text-xs">
                  {metric.value}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-landing-track md:h-2.5">
                <motion.div
                  className="h-full rounded-full bg-landing-progress"
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.width}%` }}
                  transition={{
                    duration: 0.7,
                    delay: 1.1 + index * 0.08,
                    ease: landingEase,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
