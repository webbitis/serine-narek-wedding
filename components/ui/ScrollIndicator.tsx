"use client";

import { motion } from "framer-motion";
import { Pearl } from "./Pearl";
import { usePrefersReducedMotion } from "@/lib/motion";

export function ScrollIndicator() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.2, duration: 1.4 }}
    >
      <motion.div
        animate={reduced ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <Pearl size={6} />
        <span className="h-8 w-px bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
