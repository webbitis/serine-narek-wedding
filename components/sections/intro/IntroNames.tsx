"use client";

import { motion } from "framer-motion";
import { INTRO_DISPLAY_NAMES, INTRO_LAYOUT } from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";

type IntroNamesProps = {
  opening: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function IntroNames({ opening }: IntroNamesProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="pointer-events-none absolute z-20 flex w-fit flex-col items-end text-right"
      style={{
        top: INTRO_LAYOUT.namesTop,
        right: INTRO_LAYOUT.namesRight,
      }}
    >
      <motion.h1
        className="intro-champagne-gold font-intro-script relative z-10"
        style={{
          fontSize: INTRO_LAYOUT.namesSize,
          fontWeight: 500,
          lineHeight: 0.82,
          letterSpacing: "0em",
        }}
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        animate={opening ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
        transition={{
          duration: reduced ? 0.3 : opening ? 0.6 : 0.9,
          delay: reduced || opening ? 0 : 0.7,
          ease,
        }}
      >
        {INTRO_DISPLAY_NAMES.first}
      </motion.h1>

      <motion.span
        className="intro-champagne-gold font-intro-script pointer-events-none absolute left-1/2 z-[1] -translate-x-1/2 text-center"
        style={{
          top: "46%",
          fontSize: INTRO_LAYOUT.ampersandSize,
          fontWeight: 400,
          lineHeight: 0.6,
          opacity: 0.9,
        }}
        initial={reduced ? { opacity: 0.9 } : { opacity: 0 }}
        animate={opening ? { opacity: 0 } : { opacity: 0.9 }}
        transition={{
          duration: reduced ? 0.3 : opening ? 0.5 : 0.8,
          delay: reduced || opening ? 0 : 0.85,
          ease,
        }}
      >
        &
      </motion.span>

      <motion.h1
        className="intro-champagne-gold font-intro-script relative z-10"
        style={{
          fontSize: INTRO_LAYOUT.namesSize,
          fontWeight: 500,
          lineHeight: 0.82,
          letterSpacing: "0em",
        }}
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        animate={opening ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
        transition={{
          duration: reduced ? 0.3 : opening ? 0.6 : 0.9,
          delay: reduced || opening ? 0 : 1,
          ease,
        }}
      >
        {INTRO_DISPLAY_NAMES.second}
      </motion.h1>
    </div>
  );
}
