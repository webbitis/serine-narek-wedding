"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { usePrefersReducedMotion } from "@/lib/motion";

export function IntroPearlDrapes() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-1/2 z-[8] w-[130%] max-w-[560px] -translate-x-1/2 opacity-[0.88]"
      aria-hidden="true"
      initial={{ opacity: 0, y: -6 }}
      animate={
        reduced
          ? { opacity: 0.88, y: 0 }
          : { opacity: 0.88, y: [0, -3, 0], rotate: [0, 0.2, 0] }
      }
      transition={
        reduced
          ? { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
          : {
              opacity: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
              rotate: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
            }
      }
    >
      <DecorationImage
        src={DECORATIONS.pearlDrapes}
        width={800}
        height={200}
        priority
        className="h-auto w-full object-contain"
      />
    </motion.div>
  );
}
