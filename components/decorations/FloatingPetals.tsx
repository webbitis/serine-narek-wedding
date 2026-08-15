"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "./DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { usePrefersReducedMotion } from "@/lib/motion";

type FloatingPetalsProps = {
  count?: number;
};

export function FloatingPetals({ count = 4 }: FloatingPetalsProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-40"
          style={{
            left: `${10 + i * 22}%`,
            top: `${5 + (i % 2) * 40}%`,
            width: `${28 + (i % 3) * 8}px`,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.4, y: 0 }}
          viewport={{ once: true }}
          animate={{
            y: [0, -30 - i * 8, 0],
            x: [0, i % 2 === 0 ? 12 : -12, 0],
            rotate: [0, i % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        >
          <DecorationImage
            src={DECORATIONS.floatingPetals}
            width={60}
            height={60}
            className="h-auto w-full"
          />
        </motion.div>
      ))}
    </div>
  );
}
