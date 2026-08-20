"use client";

import { useCallback, useEffect, useState } from "react";
import { useMusic } from "@/components/providers/MusicProvider";
import { COUPLE, WEDDING_DATE } from "@/lib/constants";
import {
  INTRO_OPEN_DURATION_MS,
  INTRO_OPEN_DURATION_REDUCED_MS,
} from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";
import { IntroBackground } from "./intro/IntroBackground";
import { IntroCircleCTA } from "./intro/IntroCircleCTA";
import { IntroDate } from "./intro/IntroDate";
import { IntroKicker } from "./intro/IntroKicker";
import { IntroNames } from "./intro/IntroNames";

type IntroOverlayProps = {
  onPlay: () => void;
  onComplete: () => void;
};

type Phase = "idle" | "opening";

export function IntroOverlay({ onPlay, onComplete }: IntroOverlayProps) {
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

    onPlay();
    setPhase("opening");

    setTimeout(
      onComplete,
      reduced ? INTRO_OPEN_DURATION_REDUCED_MS : INTRO_OPEN_DURATION_MS,
    );
  }, [hasAudio, onComplete, onPlay, phase, playWithFadeIn, reduced]);

  return (
    <section
      className={`fixed inset-0 z-[200] h-[100dvh] min-h-[100dvh] max-h-[100dvh] w-full overflow-hidden overscroll-none ${
        opening ? "pointer-events-none" : "touch-none"
      }`}
      style={{ backgroundColor: opening ? "transparent" : "#d8c7aa" }}
      aria-label={`${COUPLE.bride} & ${COUPLE.groom}, ${WEDDING_DATE.display}`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <IntroBackground opening={opening} />
        <IntroKicker opening={opening} />
        <IntroDate opening={opening} />
        <IntroNames opening={opening} />
        {!opening && <IntroCircleCTA onClick={handleOpen} disabled={false} />}
      </div>
    </section>
  );
}
