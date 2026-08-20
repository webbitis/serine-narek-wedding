"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "./DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { cn } from "@/lib/utils";

type GoldDividerProps = {
  variant?: "ornament" | "thin";
  className?: string;
};

export function GoldDivider({ variant = "ornament", className }: GoldDividerProps) {
  const src =
    variant === "ornament"
      ? DECORATIONS.goldDividerOrnament
      : DECORATIONS.goldDividerThin;

  return (
    <motion.div
      className={cn("flex justify-center overflow-hidden px-6 py-6 sm:px-8", className)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <DecorationImage
        src={src}
        width={variant === "ornament" ? 280 : 320}
        height={variant === "ornament" ? 40 : 16}
        className="h-auto w-48 max-w-[min(14rem,70vw)] object-contain opacity-60 md:w-56 md:max-w-none"
      />
    </motion.div>
  );
}
