"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { usePrefersReducedMotion } from "@/lib/motion";

export function HeroPearlDrapes() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute -top-1 left-1/2 z-10 w-[min(92vw,100%)] max-w-[520px] -translate-x-1/2"
      aria-hidden="true"
      initial={reduced ? {} : { opacity: 0, y: -8 }}
      animate={{ opacity: 0.75, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={reduced ? {} : { y: [0, 3, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
      >
        <DecorationImage
          src={DECORATIONS.pearlDrapes}
          width={800}
          height={200}
          priority
          className="h-auto w-full object-contain opacity-90"
        />
      </motion.div>
    </motion.div>
  );
}
