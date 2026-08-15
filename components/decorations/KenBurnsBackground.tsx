"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

type KenBurnsBackgroundProps = {
  src: string;
  alt: string;
  objectPosition?: string;
  priority?: boolean;
  className?: string;
  overlayClassName?: string;
};

export function KenBurnsBackground({
  src,
  alt,
  objectPosition = "center center",
  priority = false,
  className = "",
  overlayClassName = "bg-gradient-to-b from-[#2a2218]/30 via-[#2a2218]/15 to-[#2a2218]/55",
}: KenBurnsBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="relative h-full w-full"
        initial={reduced ? {} : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: [0.22, 1, 0.36, 1] }}
        style={reduced ? {} : { scale }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </motion.div>
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
