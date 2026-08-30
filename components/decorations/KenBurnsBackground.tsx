"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { usePrefersReducedMotion } from "@/lib/motion";

type KenBurnsBackgroundProps = {
  src: string;
  alt: string;
  objectPosition?: string;
  priority?: boolean;
  className?: string;
  overlayClassName?: string;
  media?: "image" | "video";
  poster?: string;
};

export function KenBurnsBackground({
  src,
  alt,
  objectPosition = "center center",
  priority = false,
  className = "",
  overlayClassName = "bg-gradient-to-b from-[#2a2218]/30 via-[#2a2218]/15 to-[#2a2218]/55",
  media = "image",
  poster,
}: KenBurnsBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden bg-[#d8c7aa] ${className}`}>
      <motion.div
        className="relative h-full w-full bg-[#d8c7aa]"
        initial={reduced ? {} : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: [0.22, 1, 0.36, 1] }}
        style={reduced ? {} : { scale }}
      >
        {media === "video" ? (
          <>
            {poster ? (
              <Image
                src={poster}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition }}
                aria-hidden="true"
              />
            ) : null}
            <BackgroundVideo
              src={src}
              poster={poster}
              objectPosition={objectPosition}
              fallbackColor="#d8c7aa"
            />
          </>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition }}
          />
        )}
      </motion.div>
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
