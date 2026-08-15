"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MUSIC_PATH } from "@/lib/constants";

const TARGET_VOLUME = 0.45;
const FADE_DURATION_MS = 2000;

function clampVolume(value: number, max = TARGET_VOLUME): number {
  return Math.min(max, Math.max(0, value));
}

type MusicContextValue = {
  isPlaying: boolean;
  hasAudio: boolean;
  hasStarted: boolean;
  playWithFadeIn: () => Promise<void>;
  toggle: () => Promise<void>;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const fadeGenerationRef = useRef(0);
  const fadeInPromiseRef = useRef<Promise<void> | null>(null);
  const toggleLockRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const stopFade = useCallback(() => {
    fadeGenerationRef.current += 1;
    if (fadeFrameRef.current !== null) {
      cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  }, []);

  const applyVolume = useCallback((audio: HTMLAudioElement, value: number) => {
    audio.volume = clampVolume(value);
  }, []);

  useEffect(() => {
    const audio = new Audio(MUSIC_PATH);
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = 0;
    audioRef.current = audio;

    const handleError = () => setHasAudio(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("error", handleError);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      stopFade();
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, [stopFade]);

  const fadeVolume = useCallback(
    (from: number, to: number, duration: number) => {
      const audio = audioRef.current;
      if (!audio || duration <= 0) return;

      stopFade();

      const generation = fadeGenerationRef.current;
      const safeFrom = clampVolume(from);
      const safeTo = clampVolume(to);
      applyVolume(audio, safeFrom);

      const start = performance.now();

      const step = (now: number) => {
        if (generation !== fadeGenerationRef.current || !audioRef.current) {
          return;
        }

        const rawProgress = (now - start) / duration;
        const progress = Math.min(Math.max(rawProgress, 0), 1);
        const calculatedVolume = safeFrom + (safeTo - safeFrom) * progress;
        const safeVolume = clampVolume(calculatedVolume);

        audio.volume = safeVolume;

        const reachedEnd = progress >= 1;
        const reachedZero = safeTo === 0 && safeVolume <= 0;

        if (reachedEnd || reachedZero) {
          applyVolume(audio, safeTo);
          fadeFrameRef.current = null;
          return;
        }

        fadeFrameRef.current = requestAnimationFrame(step);
      };

      fadeFrameRef.current = requestAnimationFrame(step);
    },
    [applyVolume, stopFade]
  );

  const playWithFadeIn = useCallback(async () => {
    if (fadeInPromiseRef.current) {
      return fadeInPromiseRef.current;
    }

    const audio = audioRef.current;
    if (!audio || !hasAudio) return;

    const run = async () => {
      try {
        stopFade();
        applyVolume(audio, 0);

        if (audio.paused) {
          await audio.play();
        }

        setHasStarted(true);
        fadeVolume(0, TARGET_VOLUME, FADE_DURATION_MS);
      } catch {
        setIsPlaying(false);
      }
    };

    fadeInPromiseRef.current = run().finally(() => {
      fadeInPromiseRef.current = null;
    });

    return fadeInPromiseRef.current;
  }, [applyVolume, fadeVolume, hasAudio, stopFade]);

  const toggle = useCallback(async () => {
    if (toggleLockRef.current) return;

    const audio = audioRef.current;
    if (!audio || !hasAudio || !hasStarted) return;

    toggleLockRef.current = true;

    try {
      stopFade();

      if (!audio.paused) {
        audio.pause();
      } else {
        applyVolume(
          audio,
          audio.volume > 0 ? clampVolume(audio.volume) : TARGET_VOLUME
        );
        await audio.play();
      }
    } catch {
      setIsPlaying(false);
    } finally {
      toggleLockRef.current = false;
    }
  }, [applyVolume, hasAudio, hasStarted, stopFade]);

  return (
    <MusicContext.Provider
      value={{ isPlaying, hasAudio, hasStarted, playWithFadeIn, toggle }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
}
