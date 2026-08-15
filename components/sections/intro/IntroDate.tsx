"use client";

import { motion } from "framer-motion";
import { WEDDING_DATE } from "@/lib/constants";
import { INTRO_LAYOUT } from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";

type IntroDateProps = {
  opening: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function IntroDate({ opening }: IntroDateProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.p
      className="pointer-events-none absolute left-1/2 z-20 w-[92%] -translate-x-1/2 -translate-y-1/2 text-center font-serif tracking-[0.28em]"
      style={{
        top: INTRO_LAYOUT.dateTop,
        fontSize: "17px",
        color: "#9A6E35",
      }}
      initial={reduced ? {} : { opacity: 0, y: 10 }}
      animate={opening ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0.3 }
          : { duration: opening ? 0.8 : 1.1, delay: opening ? 0 : 0.85, ease }
      }
    >
      
    </motion.p>
  );
}
