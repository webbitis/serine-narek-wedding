"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "./DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { usePrefersReducedMotion } from "@/lib/motion";

export function GoldSparkleDust() {
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
        aria-hidden="true"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/40"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 18}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-[30%] left-0 z-[5] w-full opacity-30"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <DecorationImage
          src={DECORATIONS.goldSparkleWave}
          width={600}
          height={80}
          className="mx-auto h-auto w-[70%]"
        />
      </motion.div>
    </>
  );
}
