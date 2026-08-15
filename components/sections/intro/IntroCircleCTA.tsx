"use client";

import { motion } from "framer-motion";
import { INTRO_LAYOUT } from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";

type IntroCircleCTAProps = {
  onClick: () => void;
  disabled?: boolean;
  glowing?: boolean;
  pulsing?: boolean;
};

export function IntroCircleCTA({
  onClick,
  disabled,
  glowing,
  pulsing,
}: IntroCircleCTAProps) {
  const reduced = usePrefersReducedMotion();

  const idlePulse = !disabled && !reduced && !pulsing;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Բացել հրավերը"
      className="pointer-events-auto absolute left-1/2 z-30 flex min-h-[70px] min-w-[160px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center border-0 bg-transparent p-0 disabled:cursor-default"
      style={{ top: INTRO_LAYOUT.circleTop }}
      initial={reduced ? {} : { opacity: 0, scale: 0.96 }}
      animate={
        reduced
          ? { opacity: 1, scale: 1 }
          : glowing || pulsing
            ? {
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.05, 1],
              }
            : idlePulse
              ? {
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.025, 1],
                }
              : { opacity: 1, scale: 1 }
      }
      transition={
        reduced
          ? { duration: 0.6, delay: 0.8 }
          : {
              opacity: {
                duration: glowing || pulsing ? 1.2 : 3,
                repeat: glowing || pulsing ? 0 : idlePulse ? Infinity : 0,
                ease: "easeInOut",
                delay: idlePulse ? 1.1 : 0,
              },
              scale: {
                duration: glowing || pulsing ? 1.2 : 3,
                repeat: glowing || pulsing ? 0 : idlePulse ? Infinity : 0,
                ease: "easeInOut",
                delay: idlePulse ? 1.1 : 0,
              },
            }
      }
      whileTap={disabled ? {} : { scale: 0.97 }}
    >
      <span className="text-center font-serif text-[20px] font-medium leading-[1.25] tracking-[0.03em] text-[#7A5230] [text-shadow:0_1px_0_rgba(255,255,255,0.4),0_2px_10px_rgba(80,45,20,0.12)]">
        <span className="block">Բացել</span>
        <span className="block">հրավերը</span>
      </span>
    </motion.button>
  );
}
