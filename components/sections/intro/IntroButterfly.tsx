"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import { INTRO_BUTTERFLIES, type IntroButterflyConfig } from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";

type IntroButterflyProps = {
  exiting?: boolean;
  className?: string;
};

function ButterflyItem({
  config,
  exiting,
}: {
  config: IntroButterflyConfig;
  exiting: boolean;
}) {
  const {
    size,
    duration,
    delay,
    flutterDuration,
    x,
    y,
    rotate,
    scale,
    opacity,
    exitX,
    exitY,
    exitRotate,
  } = config;

  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 drop-shadow-[0_2px_6px_rgba(183,154,99,0.22)]"
      style={{ width: size }}
      aria-hidden="true"
      initial={{ opacity: 0, x: x[0], y: y[0] }}
      animate={
        exiting
          ? {
              opacity: 0,
              x: exitX,
              y: exitY,
              rotate: exitRotate,
              scale: 0.92,
            }
          : {
              opacity,
              x,
              y,
              rotate,
              scale,
            }
      }
      transition={
        exiting
          ? { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
          : {
              opacity: { duration, repeat: Infinity, ease: "easeInOut", delay },
              x: { duration, repeat: Infinity, ease: "easeInOut", delay },
              y: { duration, repeat: Infinity, ease: "easeInOut", delay },
              rotate: { duration, repeat: Infinity, ease: "easeInOut", delay },
              scale: { duration, repeat: Infinity, ease: "easeInOut", delay },
            }
      }
    >
      <motion.div
        animate={exiting ? {} : { scaleX: [1, 0.88, 1, 0.92, 1] }}
        transition={
          exiting
            ? {}
            : {
                duration: flutterDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <DecorationImage
          src={DECORATIONS.pearlButterfly}
          width={120}
          height={120}
          className="h-auto w-full"
        />
      </motion.div>
    </motion.div>
  );
}

export function IntroButterfly({ exiting = false, className }: IntroButterflyProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? "z-10"}`}
      aria-hidden="true"
    >
      {INTRO_BUTTERFLIES.map((config) => (
        <ButterflyItem key={config.id} config={config} exiting={exiting} />
      ))}
    </div>
  );
}
