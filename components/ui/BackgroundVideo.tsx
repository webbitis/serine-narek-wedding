"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type BackgroundVideoProps = {
  src: string;
  className?: string;
  objectPosition?: string;
};

export function BackgroundVideo({
  src,
  className,
  objectPosition,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
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
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover",
        className,
      )}
      style={{ objectFit: "cover", objectPosition }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
