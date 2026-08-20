"use client";

import { motion } from "framer-motion";
import { INTRO_LAYOUT } from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";

type IntroKickerProps = {
  opening: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function IntroKicker({ opening }: IntroKickerProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.p
      className="pointer-events-none absolute left-1/2 z-20 flex max-w-[calc(100%-1.25rem)] -translate-x-1/2 items-center gap-2 whitespace-nowrap font-serif"
      style={{
        top: INTRO_LAYOUT.kickerTop,
        fontSize: "clamp(13px, 3.9vw, 16px)",
        fontWeight: 400,
        letterSpacing: "0.12em",
        color: "rgba(190, 145, 70, 0.9)",
      }}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      animate={opening ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0.3 : opening ? 0.6 : 1.2,
        delay: reduced || opening ? 0 : 0.2,
        ease,
      }}
    >
      <span
        aria-hidden="true"
        className="block h-px w-[18px] opacity-50"
        style={{ background: "rgba(190, 145, 70, 0.55)" }}
      />
      ՀԱՐՍԱՆՅԱՑ ՀՐԱՎԵՐ
      <span
        aria-hidden="true"
        className="block h-px w-[18px] opacity-50"
        style={{ background: "rgba(190, 145, 70, 0.55)" }}
      />
    </motion.p>
  );
}
