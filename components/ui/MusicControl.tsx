"use client";

import { motion } from "framer-motion";
import { useMusic } from "@/components/providers/MusicProvider";
import { cn } from "@/lib/utils";

export function MusicControl() {
  const { isPlaying, hasAudio, hasStarted, toggle } = useMusic();

  if (!hasStarted) return null;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? "Դադարեցնել երաժշտությունը" : "Շարունակել երաժշտությունը"}
      className={cn(
        "fixed right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full",
        "bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))]",
        "border border-gold/35 bg-[#faf7f2] shadow-[0_4px_20px_rgba(59,48,39,0.1)]",
        "transition-colors hover:border-gold/55",
        isPlaying && "animate-[music-pulse_3s_ease-in-out_infinite]"
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      whileTap={{ scale: 0.94 }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className={hasAudio ? "text-gold" : "text-foreground-secondary/40"}
        aria-hidden="true"
      >
        {isPlaying ? (
          <>
            <rect x="6" y="5" width="3" height="14" rx="1" fill="currentColor" />
            <rect x="15" y="5" width="3" height="14" rx="1" fill="currentColor" />
          </>
        ) : (
          <path
            d="M9 18V6.5l9 4.5-9 4.5v-3.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </svg>
    </motion.button>
  );
}
