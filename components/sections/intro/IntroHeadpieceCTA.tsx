"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { usePrefersReducedMotion } from "@/lib/motion";

type IntroHeadpieceCTAProps = {
  onClick: () => void;
  disabled?: boolean;
  glowing?: boolean;
};

export function IntroHeadpieceCTA({ onClick, disabled, glowing }: IntroHeadpieceCTAProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Բացել հրավերը"
      className="pointer-events-auto relative mt-10 w-[min(58vw,230px)] min-w-[180px] max-w-[230px] cursor-pointer border-0 bg-transparent p-0 disabled:cursor-default disabled:opacity-60"
      initial={reduced ? {} : { opacity: 0, y: 10 }}
      animate={
        reduced
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: 0, scale: [1, 1.015, 1] }
      }
      transition={
        reduced
          ? { duration: 1, delay: 0.6 }
          : {
              opacity: { duration: 1, delay: 2.1 },
              y: { duration: 1, delay: 2.1 },
              scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.1 },
            }
      }
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {/* Subtle pearl glow — intensifies on open */}
      <motion.span
        className="pointer-events-none absolute inset-[18%] rounded-full bg-pearl/30 blur-xl"
        aria-hidden="true"
        animate={glowing ? { opacity: 0.85, scale: 1.15 } : { opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Gold shimmer */}
      {!reduced && (
        <motion.span
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full opacity-30"
          aria-hidden="true"
        >
          <motion.span
            className="absolute inset-y-[40%] -left-full w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          />
        </motion.span>
      )}

      <DecorationImage
        src={DECORATIONS.bridalHeadpiece}
        width={460}
        height={280}
        priority
        className="relative z-[1] h-auto w-full"
      />

      <span className="absolute inset-0 z-[2] flex items-center justify-center px-4 pt-[8%] font-serif text-[0.72rem] leading-tight tracking-[0.06em] text-gold sm:text-[0.78rem]">
        ♫ Բացել հրավերը
      </span>
    </motion.button>
  );
}
