"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { INTRO_BACKGROUND } from "@/lib/intro-constants";

type IntroBackgroundProps = {
  opening?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function IntroBackground({ opening = false }: IntroBackgroundProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      animate={opening ? { scale: 1.04 } : { scale: 1 }}
      transition={{ duration: 1.6, ease }}
    >
      <Image
        src={INTRO_BACKGROUND.src}
        alt=""
        fill
        priority
        draggable={false}
        sizes="100vw"
        className="select-none object-cover object-center"
      />
    </motion.div>
  );
}
