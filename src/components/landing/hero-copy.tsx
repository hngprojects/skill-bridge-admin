"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { LANDING_HERO } from "@/constants/landing-page";

import { landingEase } from "./landing-motion";

export function HeroCopy() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl space-y-10 px-2 pt-16 pb-10 text-center sm:px-6 md:pt-25 md:pb-16">
      <motion.h1
        className="text-[27px] leading-[1.08] font-bold tracking-tight text-landing-ink sm:text-3xl md:text-5xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease: landingEase }}
      >
        {LANDING_HERO.headline}
      </motion.h1>

      <motion.p
        className="mx-auto max-w-2xl text-base leading-relaxed font-light text-landing-ink md:text-lg"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: landingEase }}
      >
        {LANDING_HERO.subcopy}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2, ease: landingEase }}
        className="mt-6 flex w-full items-center justify-center"
      >
        <Button
          className="rounded-[8px] bg-primary-900 px-4.5 py-3 text-base font-semibold text-white hover:bg-landing-dark"
          asChild
        >
          <Link href={LANDING_HERO.ctaHref}>{LANDING_HERO.ctaLabel}</Link>
        </Button>
      </motion.div>
    </div>
  );
}
