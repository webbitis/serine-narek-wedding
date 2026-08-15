"use client";

import { motion } from "framer-motion";
import { COUPLE } from "@/lib/constants";
import { INTRO_LAYOUT } from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";

type IntroNamesProps = {
  opening: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

const nameStyle = {
  color: "#6B452C",
  fontWeight: 500,
  lineHeight: 1.02,
  letterSpacing: "0.01em",
  textShadow: "0 1px 0 rgba(255,255,255,0.45), 0 3px 12px rgba(80,45,20,0.15)",
} as const;

export function IntroNames({ opening }: IntroNamesProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="pointer-events-none absolute left-1/2 z-20 w-[92%] -translate-x-1/2 -translate-y-1/2 text-center"
      style={{ top: INTRO_LAYOUT.namesTop }}
    >
      <motion.h1
        className="font-serif"
        style={{
          ...nameStyle,
          fontSize: "clamp(44px, 12vw, 56px)",
        }}
        initial={reduced ? {} : { opacity: 0, y: 20, scale: 0.98 }}
        animate={
          opening
            ? { opacity: 0, y: -8, scale: 1 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={
          reduced
            ? { duration: 0.3 }
            : { duration: opening ? 0.9 : 1.3, ease }
        }
      >
        {COUPLE.bride}
      </motion.h1>

      <motion.span
        className="font-serif block"
        style={{
          fontSize: "25px",
          fontWeight: 400,
          color: "#B68A4A",
          margin: "4px 0",
        }}
        initial={reduced ? {} : { opacity: 0 }}
        animate={opening ? { opacity: 0 } : { opacity: 1 }}
        transition={
          reduced
            ? { duration: 0.3 }
            : { duration: opening ? 0.7 : 0.8, delay: opening ? 0 : 0.35, ease }
        }
      >
        &
      </motion.span>

      <motion.h1
        className="font-serif"
        style={{
          ...nameStyle,
          fontSize: "clamp(44px, 12vw, 56px)",
        }}
        initial={reduced ? {} : { opacity: 0, y: 20, scale: 0.98 }}
        animate={
          opening
            ? { opacity: 0, y: -8, scale: 1 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={
          reduced
            ? { duration: 0.3 }
            : { duration: opening ? 0.9 : 1.3, delay: opening ? 0 : 0.55, ease }
        }
      >
        {COUPLE.groom}
      </motion.h1>
    </div>
  );
}
