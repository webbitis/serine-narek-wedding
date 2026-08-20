"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FloatingPetals } from "@/components/decorations/FloatingPetals";
import { PHOTO_STORY, type PhotoStoryAnimation } from "@/lib/images";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type StoryBlockProps = (typeof PHOTO_STORY)[number] & {
  compactTop?: boolean;
};

function StoryBlock({
  src,
  alt,
  text,
  layout,
  objectPosition,
  animation,
  compactTop = false,
}: StoryBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.03]);

  const animProps = {
    "fade-scale": {
      hidden: { opacity: 0, scale: 1.04 },
      visible: { opacity: 1, scale: 1 },
    },
    "masked-reveal": {
      hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
      visible: { opacity: 1, clipPath: "inset(0 0 0 0)" },
    },
    parallax: {
      hidden: { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0 },
    },
    "fade-up": {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  } satisfies Record<PhotoStoryAnimation, object>;

  if (layout === "full-bleed") {
    return (
      <div ref={ref} className="relative w-full py-6">
        <motion.div
          className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4] md:aspect-auto md:h-[clamp(420px,55vh,650px)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          variants={animProps[animation]}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative h-full w-full"
            style={reduced ? {} : { scale }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-cover [object-position:70%_center] md:object-[70%_40%]"
            />
          </motion.div>
        </motion.div>
        {text && (
          <motion.p
            className="mt-10 text-center font-serif text-lg tracking-wide text-gold/75"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (layout === "background-text") {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden",
          compactTop ? "mt-5 mb-0" : "my-8",
          "min-h-[68svh]",
        )}
      >
        <motion.div
          className="absolute inset-0"
          style={reduced ? {} : { y: parallaxY }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2218]/60 via-[#2a2218]/15 to-transparent" />
        </motion.div>
        <div className="relative z-10 flex min-h-[68svh] items-end justify-center px-8 pb-20">
          <motion.p
            className="max-w-xs text-center font-serif text-xl leading-relaxed text-pearl/95"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={animProps.parallax}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.p>
        </div>
      </div>
    );
  }

  return null;
}

export function PhotoStorySection() {
  return (
    <>
      {PHOTO_STORY.map((photo, index) => (
        <section
          key={photo.src}
          className="relative overflow-hidden bg-background px-0"
        >
          {index === 1 && <FloatingPetals count={3} />}
          <StoryBlock {...photo} />
        </section>
      ))}
    </>
  );
}

export function PhotoStoryBlock({ index }: { index: number }) {
  const photo = PHOTO_STORY[index];
  if (!photo) return null;

  const isPostTimelinePhoto = index === 1;

  return (
    <section className="relative overflow-hidden bg-background">
      {index === 1 && <FloatingPetals count={2} />}
      <StoryBlock {...photo} compactTop={isPostTimelinePhoto} />
    </section>
  );
}
