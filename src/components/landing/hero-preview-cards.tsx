"use client";

import { motion } from "motion/react";

import { landingEase } from "./landing-motion";
import { PlatformOverviewCard } from "./platform-overview-card";
import { ReviewQueueCard } from "./review-queue-card";

export function HeroPreviewCards() {
  return (
    <div
      className="relative z-10 mx-auto max-w-5xl px-3 pb-18 sm:px-4 md:px-6 md:pb-0"
      style={{ perspective: "1500px" }}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-0">
        <motion.div
          initial={{ opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.38, ease: landingEase }}
        >
          <div className="md:origin-[right_center] md:transform-[rotateY(10deg)]">
            <PlatformOverviewCard />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.48, ease: landingEase }}
        >
          <div className="md:origin-[left_center] md:transform-[rotateY(-10deg)]">
            <ReviewQueueCard />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
