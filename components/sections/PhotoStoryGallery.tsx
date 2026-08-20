"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PHOTO_STORY_GALLERY_PHOTOS } from "@/lib/photo-story-gallery";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function PhotoStoryGallery() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative w-full overflow-x-clip">
      {PHOTO_STORY_GALLERY_PHOTOS.map((photo, index) => {
        const fromLeft = photo.side === "left";

        return (
          <motion.figure
            key={photo.src}
            className={cn("relative block", photo.frameClass)}
            style={{ marginTop: photo.marginTop, zIndex: index + 1 }}
            initial={
              reduced
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: fromLeft ? -40 : 40, y: 20 }
            }
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduced ? 0.2 : 1.2, ease }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 768px) 82vw, 648px"
              className="h-auto w-full max-w-full rounded-[4px] object-cover"
              style={{
                boxShadow: "0 12px 35px rgba(50, 35, 20, 0.10)",
              }}
            />
          </motion.figure>
        );
      })}
    </div>
  );
}
