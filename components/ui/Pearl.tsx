"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PearlProps = {
  size?: number;
  className?: string;
  animate?: boolean;
  delay?: number;
};

export function Pearl({ size = 8, className, animate = false, delay = 0 }: PearlProps) {
  const pearl = (
    <span
      className={cn(
        "inline-block rounded-full",
        "bg-gradient-to-br from-[#FAF7F2] via-pearl to-[#DDD4C8]",
        "shadow-[inset_-1px_-1px_3px_rgba(59,48,39,0.12),0_1px_4px_rgba(183,154,99,0.15)]",
        className
      )}
      style={{ width: size, height: size }}
    />
  );

  if (!animate) return pearl;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {pearl}
    </motion.span>
  );
}
