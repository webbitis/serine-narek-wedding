"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useMusic } from "@/components/providers/MusicProvider";
import { COUPLE, WEDDING_DATE } from "@/lib/constants";
import { WEDDING_IMAGES } from "@/lib/images";
import {
  INTRO_OPEN_DURATION_MS,
  INTRO_OPEN_DURATION_REDUCED_MS,
} from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";
import { HeroRevealLayer } from "@/components/sections/intro/BloomPetalsLayer";
import { IntroBackground } from "./intro/IntroBackground";
import { IntroButterfly } from "./intro/IntroButterfly";
import { IntroCircleCTA } from "./intro/IntroCircleCTA";
import { IntroDate } from "./intro/IntroDate";
import { IntroNames } from "./intro/IntroNames";
import { IntroOpenEffects } from "./intro/IntroOpenEffects";

type IntroOverlayProps = {
  onComplete: () => void;
};

type Phase = "idle" | "opening";

const ease = [0.22, 1, 0.36, 1] as const;

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const { playWithFadeIn, hasAudio } = useMusic();
  const reduced = usePrefersReducedMotion();

  const opening = phase === "opening";

  useEffect(() => {
    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  const handleOpen = useCallback(async () => {
    if (phase !== "idle") return;

    if (hasAudio) {
      void playWithFadeIn();
    }

    setPhase("opening");

    setTimeout(
      onComplete,
      reduced ? INTRO_OPEN_DURATION_REDUCED_MS : INTRO_OPEN_DURATION_MS,
    );
  }, [hasAudio, onComplete, phase, playWithFadeIn, reduced]);

  return (
    <motion.section
      className="fixed inset-0 z-[200] h-[100dvh] min-h-[100dvh] max-h-[100dvh] w-full touch-none overflow-hidden overscroll-none bg-[#F7F1E7]"
      animate={
        opening
          ? { opacity: 0, scale: 1.04 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: reduced ? 0.5 : 1.75, ease }}
      aria-label={`${COUPLE.bride} & ${COUPLE.groom}, ${WEDDING_DATE.display}`}
    >
      <HeroRevealLayer active={opening} />

      <div className="relative mx-auto h-full w-full max-w-[430px] overflow-hidden">
        <IntroBackground opening={opening} />

        {!reduced && <IntroButterfly exiting={opening} />}
        <IntroNames opening={opening} />
        <IntroDate opening={opening} />
        <IntroOpenEffects active={opening && !reduced} />

        {!opening && <IntroCircleCTA onClick={handleOpen} disabled={false} />}

        {opening && (
          <IntroCircleCTA
            onClick={() => undefined}
            disabled
            glowing
            pulsing
          />
        )}
      </div>

      {reduced && opening && (
        <motion.div
          className="fixed inset-0 z-[1] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <Image
            src={WEDDING_IMAGES.hero.src}
            alt=""
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 22%" }}
          />
        </motion.div>
      )}
    </motion.section>
  );
}
