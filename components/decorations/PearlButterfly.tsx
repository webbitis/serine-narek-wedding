"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "./DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

type PearlButterflyProps = {
  className?: string;
};

export function PearlButterfly({ className }: PearlButterflyProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute z-10 w-16 opacity-60 md:w-20",
        className
      )}
      animate={
        reduced
          ? { x: 0, y: 0, rotate: 0 }
          : {
              x: [0, 40, -20, 30, 0],
              y: [0, -18, 10, -12, 0],
              rotate: [0, 8, -6, 5, 0],
            }
      }
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    >
      <DecorationImage
        src={DECORATIONS.pearlButterfly}
        width={120}
        height={120}
        className="h-auto w-full"
      />
    </motion.div>
  );
}
