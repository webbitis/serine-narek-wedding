"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Pearl } from "./Pearl";
import { usePrefersReducedMotion } from "@/lib/motion";

export function PearlPath() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pearlX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const pathOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.5, 0.5, 0]);

  if (reduced) return null;

  return (
    <div ref={ref} className="pointer-events-none relative h-32 w-full max-w-md mx-auto">
      <motion.svg
        viewBox="0 0 300 80"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: pathOpacity }}
        aria-hidden="true"
      >
        <motion.path
          d="M20,60 Q80,10 150,40 T280,20"
          fill="none"
          stroke="#B79A63"
          strokeWidth="0.5"
          strokeOpacity="0.35"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2"
        style={{ left: pearlX }}
      >
        <Pearl size={7} />
      </motion.div>
    </div>
  );
}
