"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { fadeUpVariants, usePrefersReducedMotion } from "@/lib/motion";

type TextRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function TextReveal({
  children,
  className = "",
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={reduced ? "visible" : "hidden"}
        animate={isInView ? "visible" : "hidden"}
        variants={fadeUpVariants}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
