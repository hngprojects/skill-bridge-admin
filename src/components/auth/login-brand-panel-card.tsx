"use client";

import { motion } from "motion/react";

import { landingEase } from "@/components/landing/landing-motion";
import { cn } from "@/lib/utils";

type LoginBrandPanelCardProps = {
  title: string;
  subtitle: string;
  variant: "teal" | "purple";
  bars: readonly number[];
  delay: number;
};

export function LoginBrandPanelCard({
  title,
  subtitle,
  variant,
  bars,
  delay,
}: LoginBrandPanelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: landingEase }}
      className={cn(
        "rounded-[20px] p-5",
        variant === "teal" ? "bg-landing-teal" : "bg-landing-purple",
      )}
    >
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm leading-snug text-gray-700">{subtitle}</p>
      <div className="mt-4 space-y-2.5 rounded-[14px] bg-landing-dark p-4">
        {bars.map((width, index) => (
          <motion.div
            key={index}
            className={cn(
              "h-2 rounded-full",
              index === 0 ? "bg-landing-progress" : "bg-landing-track",
            )}
            initial={{ width: 0 }}
            animate={{ width: `${width}%` }}
            transition={{
              duration: 0.6,
              delay: delay + 0.15 + index * 0.08,
              ease: landingEase,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
