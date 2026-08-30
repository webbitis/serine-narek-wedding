"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { useMusic } from "@/components/providers/MusicProvider";
import { COUPLE, WEDDING_DATE } from "@/lib/constants";
import { INTRO_BACKGROUND, INTRO_HERO_CROSSFADE_S } from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";
import { IntroBackground } from "./intro/IntroBackground";
import { IntroCircleCTA } from "./intro/IntroCircleCTA";
import { IntroDate } from "./intro/IntroDate";
import { IntroKicker } from "./intro/IntroKicker";
import { IntroNames } from "./intro/IntroNames";

type IntroOverlayProps = {
  onPlay: () => void;
  onComplete: () => void;
  heroVideoReady: boolean;
};

type Phase = "idle" | "opening";

export function IntroOverlay({
  onPlay,
  onComplete,
  heroVideoReady,
}: IntroOverlayProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const openingLock = useRef(false);
  const { playWithFadeIn, hasAudio } = useMusic();
  const reduced = usePrefersReducedMotion();

  const opening = phase === "opening";
  const revealHero = opening && heroVideoReady;

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

  const handleOpen = useCallback(() => {
    if (openingLock.current || phase !== "idle") return;
    openingLock.current = true;

    if (hasAudio) {
      void playWithFadeIn();
    }

    onPlay();
    setPhase("opening");
  }, [hasAudio, onPlay, phase, playWithFadeIn]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      handleOpen();
    },
    [handleOpen],
  );

  return (
    <motion.section
      role="button"
      tabIndex={opening ? -1 : 0}
      onClick={opening ? undefined : handleOpen}
      onKeyDown={opening ? undefined : handleKeyDown}
      className={`fixed inset-0 z-[200] h-[100dvh] min-h-[100svh] w-full overflow-hidden overscroll-none ${
        opening ? "pointer-events-none" : "cursor-pointer touch-none"
      }`}
      style={{
        backgroundColor: revealHero ? "transparent" : "#d8c7aa",
        backgroundImage: revealHero
          ? "none"
          : `url("${INTRO_BACKGROUND.src}")`,
        backgroundSize: "cover",
        backgroundPosition: "center 22%",
        backgroundRepeat: "no-repeat",
      }}
      aria-label={`${COUPLE.full}, ${WEDDING_DATE.display}`}
      initial={false}
      animate={{ opacity: revealHero ? 0 : 1 }}
      transition={{
        duration: revealHero ? (reduced ? 0.2 : INTRO_HERO_CROSSFADE_S) : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      onAnimationComplete={() => {
        if (revealHero) onComplete();
      }}
    >
      <div className="relative h-full w-full overflow-hidden">
        <IntroBackground opening={opening} />
        <IntroKicker opening={opening} />
        <IntroDate opening={opening} />
        <IntroNames opening={opening} />
        {!opening && <IntroCircleCTA onClick={handleOpen} disabled={false} />}
      </div>
    </motion.section>
  );
}
