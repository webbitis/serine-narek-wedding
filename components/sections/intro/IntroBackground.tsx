"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { INTRO_BACKGROUND, INTRO_PHOTO_REVEAL_DURATION } from "@/lib/intro-constants";

type IntroBackgroundProps = {
  opening?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

const PHOTO_VEIL = "saturate(0.65) contrast(0.90) brightness(1.08)";
const PHOTO_CLEAR = "saturate(1) contrast(1) brightness(1)";

export function IntroBackground({ opening = false }: IntroBackgroundProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0,
        ease,
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          filter: opening ? PHOTO_CLEAR : PHOTO_VEIL,
          scale: opening ? 1 : 1.025,
        }}
        transition={{ duration: INTRO_PHOTO_REVEAL_DURATION, ease }}
      >
        <Image
          src={INTRO_BACKGROUND.src}
          alt=""
          fill
          priority
          draggable={false}
          sizes="100vw"
          className="select-none object-cover"
          style={{ objectPosition: "center 22%", opacity: 1 }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(248, 239, 222, 0.38), rgba(239, 220, 191, 0.22))",
        }}
        initial={false}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: INTRO_PHOTO_REVEAL_DURATION, ease }}
      />
    </motion.div>
  );
}
