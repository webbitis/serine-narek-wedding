"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "./DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

type LaceCornerProps = {
  className?: string;
  mirror?: boolean;
  side?: "left" | "right" | "top-left" | "top-right";
  size?: "sm" | "md";
};

export function LaceCorner({
  className,
  mirror = false,
  side = "right",
  size = "md",
}: LaceCornerProps) {
  const reduced = usePrefersReducedMotion();

  const positionClasses = {
    right: "-right-[20%] top-[2%]",
    left: "-left-[20%] bottom-[5%]",
    "top-left": "-left-[18%] -top-[8%]",
    "top-right": "-right-[18%] -top-[8%]",
  };

  const sizeClasses = {
    sm: "w-[38vw] max-w-[130px] opacity-[0.22]",
    md: "w-[42vw] max-w-[160px] opacity-[0.28]",
  };

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute z-0",
        positionClasses[side],
        sizeClasses[size],
        mirror && "-scale-x-100",
        className
      )}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: size === "sm" ? 0.22 : 0.28, scale: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <motion.div
        animate={reduced ? {} : { y: [0, 2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <DecorationImage
          src={DECORATIONS.floralLaceCorner}
          width={320}
          height={320}
          className="h-auto w-full"
        />
      </motion.div>
    </motion.div>
  );
}
