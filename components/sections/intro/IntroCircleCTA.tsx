"use client";

import { motion } from "framer-motion";
import { INTRO_LAYOUT } from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";

type IntroCircleCTAProps = {
  onClick: () => void;
  disabled?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

const GLOW_REST =
  "0 0 0 1px rgba(255, 224, 155, 0.12), 0 0 18px rgba(211, 166, 75, 0.28), 0 6px 25px rgba(55, 35, 15, 0.18)";
const GLOW_BREATHE =
  "0 0 0 1px rgba(255, 224, 155, 0.22), 0 0 28px rgba(211, 166, 75, 0.42), 0 6px 28px rgba(55, 35, 15, 0.16)";
const GLOW_HOVER =
  "0 0 0 1px rgba(255, 224, 155, 0.28), 0 0 26px rgba(211, 166, 75, 0.4), 0 6px 25px rgba(55, 35, 15, 0.18)";

export function IntroCircleCTA({ onClick, disabled }: IntroCircleCTAProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2"
      style={{ bottom: INTRO_LAYOUT.playBottom }}
    >
      <motion.div
        initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduced ? 0.3 : 0.8,
          delay: reduced ? 0 : 1.2,
          ease,
        }}
      >
        <motion.div
          className="relative"
          style={{
            width: INTRO_LAYOUT.playSize,
            height: INTRO_LAYOUT.playSize,
          }}
          whileHover={disabled ? {} : { scale: 1.05 }}
          whileTap={disabled ? {} : { scale: 1.03 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{
              border: "1.5px solid rgba(218, 174, 82, 0.98)",
              backgroundColor: "rgba(65, 48, 30, 0.18)",
              boxShadow: GLOW_REST,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            animate={
              reduced
                ? { scale: 1, boxShadow: GLOW_REST }
                : {
                    scale: [1, 1.055, 1],
                    boxShadow: [GLOW_REST, GLOW_BREATHE, GLOW_REST],
                  }
            }
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
            whileHover={disabled ? {} : { boxShadow: GLOW_HOVER }}
          >
            <span className="pointer-events-none absolute inset-[4px] rounded-full border border-[rgba(225,190,120,0.18)]" />
          </motion.div>

          <motion.button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label="Play"
            className="pointer-events-auto relative z-10 flex h-full w-full items-center justify-center rounded-full bg-transparent disabled:cursor-default"
          >
            <svg
              width={INTRO_LAYOUT.playIconSize}
              height={INTRO_LAYOUT.playIconSize}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{
                transform: "translateX(1.5px)",
                filter: "drop-shadow(0 1px 3px rgba(90, 55, 15, 0.25))",
              }}
            >
              <path d="M8.2 5.8v12.4L19.2 12 8.2 5.8Z" fill="#F2C968" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
