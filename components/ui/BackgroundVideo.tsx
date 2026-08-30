"use client";

import { useEffect, useRef } from "react";
import { INTRO_HERO_CROSSFADE_S } from "@/lib/intro-constants";
import { cn } from "@/lib/utils";

type BackgroundVideoProps = {
  src: string;
  className?: string;
  objectPosition?: string;
  poster?: string;
  onCanPlay?: () => void;
  visible?: boolean;
};

export function BackgroundVideo({
  src,
  className,
  objectPosition,
  poster,
  onCanPlay,
  visible = true,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onCanPlayRef = useRef(onCanPlay);
  onCanPlayRef.current = onCanPlay;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      onCanPlayRef.current?.();
    }
    void video.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      preload="auto"
      poster={poster}
      aria-hidden="true"
      onCanPlay={() => onCanPlayRef.current?.()}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover",
        className,
      )}
      style={{
        objectFit: "cover",
        objectPosition,
        opacity: visible ? 1 : 0,
        transition: `opacity ${INTRO_HERO_CROSSFADE_S}s ease`,
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
