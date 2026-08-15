"use client";

import { motion } from "framer-motion";
import {
  INTRO_LIGHT_PARTICLES,
  INTRO_PEARL_SHIMMERS,
  INTRO_SPARKLES,
} from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";

export function IntroMagicLayer() {
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[12]" aria-hidden="true">
      {INTRO_PEARL_SHIMMERS.map((shimmer) => (
        <motion.span
          key={shimmer.id}
          className="absolute overflow-hidden rounded-full opacity-0"
          style={{
            left: shimmer.left,
            top: shimmer.top,
            width: shimmer.width,
            height: shimmer.height,
          }}
          animate={{ opacity: [0, 0.35, 0] }}
          transition={{
            duration: 5.5,
            delay: shimmer.delay,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="absolute inset-y-0 -left-full w-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{ x: ["-50%", "100%"] }}
            transition={{
              duration: 6,
              delay: shimmer.delay,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
          />
        </motion.span>
      ))}

      {INTRO_LIGHT_PARTICLES.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-[#faf7f2]/40 blur-[0.5px]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0, 0.35, 0.2, 0],
            x: [0, particle.driftX * 0.4, particle.driftX],
            y: [0, particle.driftY * 0.5, particle.driftY],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {INTRO_SPARKLES.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute h-[3px] w-[3px] rounded-full bg-gold-light/80 blur-[0.3px]"
          style={{ left: sparkle.left, top: sparkle.top }}
          animate={{ opacity: [0, 0.85, 0], scale: [0.4, 1, 0.5] }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: sparkle.repeatDelay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
