"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import {
  PHOTO_STORY_GALLERY_ASPECT,
  PHOTO_STORY_GALLERY_DECORATIONS,
  PHOTO_STORY_GALLERY_FADE_DURATION,
  PHOTO_STORY_GALLERY_INTERVAL_MS,
  PHOTO_STORY_GALLERY_PHOTOS,
  PHOTO_STORY_SLIDER_WIDTH,
} from "@/lib/photo-story-gallery";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 48;
const ease = [0.22, 1, 0.36, 1] as const;

export function PhotoStoryGalleryCarousel() {
  const reduced = usePrefersReducedMotion();
  const photos = PHOTO_STORY_GALLERY_PHOTOS;
  const count = photos.length;
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (reduced || count <= 1) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, PHOTO_STORY_GALLERY_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [count, reduced]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_THRESHOLD) goTo(index + 1);
    else if (info.offset.x >= SWIPE_THRESHOLD) goTo(index - 1);
  };

  const current = photos[index];
  if (!current) return null;

  return (
    <div className={cn("relative mx-auto touch-pan-y", PHOTO_STORY_SLIDER_WIDTH)}>
      <div className="relative">
        <div
          className={cn(
            "relative w-full overflow-hidden bg-background-alt/20 shadow-[0_12px_36px_rgba(59,48,39,0.08)]",
            PHOTO_STORY_GALLERY_ASPECT,
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.src}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduced ? 0.2 : PHOTO_STORY_GALLERY_FADE_DURATION,
                ease,
              }}
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={onDragEnd}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 82vw, 320px"
                className="object-cover"
                style={{ objectPosition: current.objectPosition }}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <DecorationImage
          src={DECORATIONS.floralLaceCorner}
          width={320}
          height={320}
          className={cn("h-auto", PHOTO_STORY_GALLERY_DECORATIONS.leftCorner)}
          aria-hidden
        />

        <DecorationImage
          src={DECORATIONS.laceFloralSide}
          width={280}
          height={420}
          className={cn("h-auto", PHOTO_STORY_GALLERY_DECORATIONS.rightLace)}
          aria-hidden
        />
      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {photos.map((photo, dotIndex) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Ցուցադրել լուսանկար ${dotIndex + 1}`}
              onClick={() => setIndex(dotIndex)}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                dotIndex === index
                  ? "w-4 bg-gold/65"
                  : "w-1 bg-gold/25 hover:bg-gold/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
