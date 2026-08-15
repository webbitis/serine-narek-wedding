"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { usePrefersReducedMotion } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroCornerDecorations() {
  const reduced = usePrefersReducedMotion();

  const cornerTransition = (delay: number) =>
    reduced
      ? { duration: 0.3, delay }
      : { duration: 1.2, delay, ease };

  return (
    <>
      <motion.div
        className="pointer-events-none absolute -left-[14%] -top-[5%] z-10 w-[clamp(120px,34vw,155px)] opacity-[0.88]"
        aria-hidden="true"
        initial={reduced ? {} : { opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 0.88, scale: 1, y: 0 }}
        transition={cornerTransition(0.25)}
      >
        <DecorationImage
          src={DECORATIONS.floralLaceCorner}
          width={320}
          height={320}
          priority
          className="h-auto w-full"
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute -right-[20%] -top-[3%] z-10 w-[clamp(105px,30vw,140px)] -scale-x-100 opacity-[0.85]"
        aria-hidden="true"
        initial={reduced ? {} : { opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 0.85, scale: 1, y: 0 }}
        transition={cornerTransition(0.4)}
      >
        <DecorationImage
          src={DECORATIONS.pearlFloralGarland}
          width={480}
          height={200}
          priority
          className="h-auto w-full"
        />
      </motion.div>
    </>
  );
}
