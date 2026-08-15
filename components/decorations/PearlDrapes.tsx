"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "./DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { usePrefersReducedMotion } from "@/lib/motion";

export function PearlDrapes() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute -top-3 left-1/2 z-[1] w-[115%] max-w-none -translate-x-1/2 opacity-60"
      animate={reduced ? {} : { y: [0, -3, 0], rotate: [0, 0.3, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <DecorationImage
        src={DECORATIONS.pearlDrapes}
        width={800}
        height={200}
        className="h-auto w-full object-contain"
        priority
      />
    </motion.div>
  );
}
