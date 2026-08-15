"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { DECORATIONS } from "@/lib/decorations";
import {
  TIMELINE_ASPECT,
  TIMELINE_BACKGROUND,
  TIMELINE_EVENT_LABELS,
  TIMELINE_IMAGE_INSET,
  TIMELINE_IMAGE_WIDTH,
  TIMELINE_INTRO,
  TIMELINE_LABEL_CLASS,
  TIMELINE_LABEL_REVEAL,
  TIMELINE_TRANSITION,
} from "@/lib/timeline-layout";
import { cn } from "@/lib/utils";

export function TimelineSection() {
  return (
    <section className="relative overflow-hidden bg-background-alt pt-12 pb-0 md:pt-16">
      <div className={cn("px-4 text-center", TIMELINE_INTRO.marginBottom)}>
        <h2 className={TIMELINE_INTRO.headingClass}>{TIMELINE_INTRO.heading}</h2>
        <p className={TIMELINE_INTRO.descriptionClass}>{TIMELINE_INTRO.description}</p>
      </div>

      <div className={cn("relative", TIMELINE_IMAGE_INSET, TIMELINE_IMAGE_WIDTH)}>
        <div className={cn("relative", TIMELINE_IMAGE_WIDTH, TIMELINE_ASPECT)}>
          <Image
            src={TIMELINE_BACKGROUND.src}
            alt={TIMELINE_BACKGROUND.alt}
            fill
            sizes="100vw"
            className="object-contain object-top"
            priority={false}
          />

          {TIMELINE_EVENT_LABELS.map((label) => (
            <motion.p
              key={label.id}
              className={cn(
                "pointer-events-none absolute max-w-[38%] -translate-y-1/2",
                TIMELINE_LABEL_CLASS,
                label.side === "left" ? "text-left" : "text-right",
              )}
              style={{
                top: label.top,
                ...(label.side === "left"
                  ? { left: label.inset }
                  : { right: label.inset }),
              }}
              initial={TIMELINE_LABEL_REVEAL.initial}
              whileInView={TIMELINE_LABEL_REVEAL.animate}
              viewport={TIMELINE_LABEL_REVEAL.viewport}
              transition={TIMELINE_LABEL_REVEAL.transition}
            >
              {label.label}
            </motion.p>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "px-4 text-center",
          TIMELINE_TRANSITION.afterTimeline,
          TIMELINE_TRANSITION.beforeNextPhoto,
        )}
      >
        <motion.p
          className={TIMELINE_TRANSITION.textClass}
          initial={TIMELINE_TRANSITION.textReveal.initial}
          whileInView={TIMELINE_TRANSITION.textReveal.animate}
          viewport={TIMELINE_TRANSITION.textReveal.viewport}
          transition={TIMELINE_TRANSITION.textReveal.transition}
        >
          {TIMELINE_TRANSITION.text}
        </motion.p>

        <motion.div
          className={cn("mx-auto", TIMELINE_TRANSITION.afterText, TIMELINE_TRANSITION.ribbonWidth)}
          initial={TIMELINE_TRANSITION.ribbonReveal.initial}
          whileInView={TIMELINE_TRANSITION.ribbonReveal.animate}
          viewport={TIMELINE_TRANSITION.ribbonReveal.viewport}
          transition={TIMELINE_TRANSITION.ribbonReveal.transition}
        >
          <DecorationImage
            src={DECORATIONS.goldPearlRibbon}
            width={380}
            height={120}
            className="mx-auto h-auto w-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
