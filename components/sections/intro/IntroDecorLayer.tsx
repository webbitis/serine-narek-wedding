"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { DECORATIONS } from "@/lib/decorations";

type IntroDecorLayerProps = {
  blooming: boolean;
};

export function IntroDecorLayer({ blooming }: IntroDecorLayerProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[10]"
      animate={{ scale: blooming ? 1.08 : 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {/* Top-left floral lace anchor */}
      <motion.div
        className="absolute -left-[14%] top-[4%] w-[46vw] max-w-[190px] opacity-[0.82]"
        initial={{ opacity: 0, x: -16, scale: 0.96 }}
        animate={{ opacity: 0.82, x: 0, scale: 1 }}
        transition={{ duration: 2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <DecorationImage
          src={DECORATIONS.floralLaceCorner}
          width={380}
          height={380}
          priority
          className="h-auto w-full"
        />
      </motion.div>

      {/* Left edge lace framing */}
      <motion.div
        className="absolute -left-[6%] top-[22%] w-[22vw] max-w-[95px] opacity-[0.18]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 2.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <DecorationImage
          src={DECORATIONS.laceFloralSide}
          width={200}
          height={400}
          className="h-auto w-full"
        />
      </motion.div>

      {/* Bottom-right floral balance */}
      <motion.div
        className="absolute -bottom-[6%] -right-[10%] w-[38vw] max-w-[155px] opacity-[0.78]"
        initial={{ opacity: 0, x: 12, scale: 0.96 }}
        animate={{ opacity: 0.78, x: 0, scale: 1 }}
        transition={{ duration: 2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <DecorationImage
          src={DECORATIONS.flowers}
          width={320}
          height={280}
          className="h-auto w-full"
        />
      </motion.div>
    </motion.div>
  );
}
