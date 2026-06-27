"use client";

import { motion } from "motion/react";

import { LANDING_REVIEW_ITEMS } from "@/constants/landing-page";

import { landingEase } from "./landing-motion";

export function ReviewQueueCard() {
  return (
    <div className="min-h-90 -rotate-1 rounded-[24px] bg-landing-purple p-4 md:min-h-115 md:-rotate-3 md:rounded-[28px] md:p-6">
      <h3 className="text-xl font-bold text-gray-900 md:text-2xl">
        Review queue
      </h3>
      <p className="mt-1 text-sm leading-snug text-gray-700 md:mt-2 md:text-[15px]">
        Curate assessment questions and resolve flagged content quickly.
      </p>

      <div className="mt-6 overflow-hidden rounded-[18px] bg-landing-dark md:mt-8 md:rounded-[20px]">
        <div className="space-y-3 px-4 py-5 md:space-y-4 md:px-5 md:py-6">
          {LANDING_REVIEW_ITEMS.map((item, index) => (
            <motion.div
              key={item.label}
              className="rounded-[12px] bg-landing-purple px-3 py-3 md:rounded-[14px] md:px-4 md:py-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 1.1 + index * 0.08,
                ease: landingEase,
              }}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-gray-900 md:text-sm">
                  {item.label}
                </span>
                <span className="text-[11px] font-bold text-gray-900 md:text-sm">
                  {item.count}
                </span>
              </div>
              <motion.div
                className="h-2 rounded-full bg-landing-dark md:h-2.5"
                initial={{ width: 0 }}
                animate={{ width: `${item.width}%` }}
                transition={{
                  duration: 0.5,
                  delay: 1.15 + index * 0.06,
                  ease: landingEase,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
