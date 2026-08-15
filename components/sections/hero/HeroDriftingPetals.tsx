"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { HERO_DRIFTING_PETALS } from "@/lib/hero-decorations";
import { usePrefersReducedMotion } from "@/lib/motion";

export function HeroDriftingPetals() {
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[12] overflow-hidden" aria-hidden="true">
      {HERO_DRIFTING_PETALS.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: petal.left, bottom: petal.bottom, width: petal.size }}
          initial={{ opacity: 0, x: 0, y: 0, rotate: petal.rotate }}
          animate={{
            opacity: [0, petal.peakOpacity, petal.peakOpacity * 0.6, 0],
            x: petal.x,
            y: -petal.y,
            rotate: petal.endRotate,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            repeatDelay: 2 + (petal.id % 3),
            ease: [0.22, 0.8, 0.36, 1],
            opacity: { duration: petal.duration, times: [0, 0.15, 0.7, 1] },
          }}
        >
          <DecorationImage
            src={DECORATIONS.ivoryPetals}
            width={48}
            height={48}
            className="h-auto w-full opacity-80"
          />
        </motion.div>
      ))}
    </div>
  );
}
