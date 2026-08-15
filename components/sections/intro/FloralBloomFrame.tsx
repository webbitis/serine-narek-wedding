"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { DECORATIONS } from "@/lib/decorations";

type FloralBloomFrameProps = {
  blooming: boolean;
};

export function FloralBloomFrame({ blooming }: FloralBloomFrameProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[12]"
      animate={{ scale: blooming ? 1.08 : 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {/* Upper-left — main florals */}
      <motion.div
        className="absolute -left-[10%] top-[6%] w-[44vw] max-w-[175px] opacity-[0.62]"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 0.62, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <DecorationImage
          src={DECORATIONS.ivoryRoseCluster}
          width={350}
          height={280}
          className="h-auto w-full"
        />
      </motion.div>

      <DecorationImage
        src={DECORATIONS.floralLaceCorner}
        width={280}
        height={280}
        className="absolute -left-[6%] top-[1%] w-[36vw] max-w-[145px] opacity-[0.28]"
      />

      {/* Lower-right — mirrored main florals */}
      <motion.div
        className="absolute -bottom-[4%] -right-[10%] w-[44vw] max-w-[175px] -scale-x-100 -scale-y-100 opacity-[0.62]"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 0.62, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <DecorationImage
          src={DECORATIONS.ivoryRoseCluster}
          width={350}
          height={280}
          className="h-auto w-full"
        />
      </motion.div>

      <DecorationImage
        src={DECORATIONS.floralLaceCorner}
        width={280}
        height={280}
        className="absolute -bottom-[1%] -right-[6%] w-[36vw] max-w-[145px] -scale-x-100 -scale-y-100 opacity-[0.28]"
      />

      {/* Upper-right — delicate pearl/lace balance */}
      <DecorationImage
        src={DECORATIONS.pearlFloralGarland}
        width={200}
        height={100}
        className="absolute -right-[4%] top-[14%] w-[32vw] max-w-[130px] opacity-[0.38]"
      />
      <DecorationImage
        src={DECORATIONS.pearlDropsSet}
        width={80}
        height={40}
        className="absolute right-[6%] top-[20%] w-12 opacity-[0.45]"
      />

      {/* Lower-left — delicate balance */}
      <DecorationImage
        src={DECORATIONS.laceFloralSide}
        width={160}
        height={320}
        className="absolute -left-[8%] bottom-[16%] w-[28vw] max-w-[110px] -scale-x-100 opacity-[0.22]"
      />
      <DecorationImage
        src={DECORATIONS.silkRibbon}
        width={160}
        height={48}
        className="absolute bottom-[18%] left-[5%] w-[22vw] max-w-[90px] opacity-[0.32]"
      />
    </motion.div>
  );
}
