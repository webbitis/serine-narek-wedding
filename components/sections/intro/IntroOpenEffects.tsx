"use client";

import { motion } from "framer-motion";
import { INTRO_OPEN_PARTICLES } from "@/lib/intro-constants";

type IntroOpenEffectsProps = {
  active: boolean;
};

export function IntroOpenEffects({ active }: IntroOpenEffectsProps) {
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[18]" aria-hidden="true">
      {INTRO_OPEN_PARTICLES.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute left-1/2 block h-[3px] w-[3px] rounded-full bg-gold-light/70 blur-[0.3px] shadow-[0_0_6px_rgba(200,174,120,0.45)]"
          style={{ top: "72%" }}
          initial={{ x: particle.x, y: particle.y, opacity: 0, scale: 0.5 }}
          animate={{
            x: particle.x + particle.driftX,
            y: particle.y + particle.driftY,
            opacity: [0, 0.75, 0.35, 0],
            scale: [0.5, 1, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
