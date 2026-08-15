"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import type { DriftPetal } from "@/lib/intro-bloom";

type IntroDriftingPetalsProps = {
  petals: DriftPetal[];
  active: boolean;
  loop?: boolean;
};

export function IntroDriftingPetals({
  petals,
  active,
  loop = true,
}: IntroDriftingPetalsProps) {
  if (!petals.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[14] overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: petal.left, top: petal.top }}
          initial={{ opacity: 0, x: 0, y: 0, rotate: petal.rotate, scale: 0.7 }}
          animate={
            active
              ? {
                  opacity: [0, petal.peakOpacity, petal.peakOpacity * 0.6, 0],
                  x: petal.x,
                  y: petal.y,
                  rotate: petal.endRotate,
                  scale: 1,
                }
              : { opacity: 0 }
          }
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: [0.22, 0.8, 0.36, 1],
            opacity: { duration: petal.duration, times: [0, 0.15, 0.7, 1] },
            repeat: active && loop ? Infinity : 0,
            repeatDelay: loop ? 1.5 + (petal.id % 3) : 0,
          }}
        >
          <div style={{ width: petal.size }}>
            <DecorationImage
              src={DECORATIONS.ivoryPetals}
              width={48}
              height={48}
              className="h-auto w-full opacity-80"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
