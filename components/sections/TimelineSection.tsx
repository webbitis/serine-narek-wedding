"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import {
  DAY_PROGRAM,
  DAY_PROGRAM_CIRCLE,
  DAY_PROGRAM_ROW_GAP,
  DAY_PROGRAM_TYPE,
  type DayProgramEvent,
} from "@/lib/day-program";
import { DECORATIONS } from "@/lib/decorations";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const FALLBACK_IMAGE = "/images/couple.jpg";

function ProgramPortrait({
  src,
  alt,
  objectPosition = "center center",
}: {
  src: string;
  alt: string;
  objectPosition?: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full aspect-square",
        DAY_PROGRAM_CIRCLE,
      )}
      style={{
        border: "1px solid rgba(190, 150, 85, 0.28)",
        boxShadow: "0 10px 28px rgba(60, 40, 20, 0.10)",
        aspectRatio: "1 / 1",
      }}
    >
      <Image
        src={currentSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 185px, 230px"
        className="object-cover"
        style={{ objectPosition }}
        onError={() => {
          if (currentSrc !== FALLBACK_IMAGE) setCurrentSrc(FALLBACK_IMAGE);
        }}
      />
    </div>
  );
}

function ProgramRow({ event }: { event: DayProgramEvent }) {
  const reduced = usePrefersReducedMotion();

  return (
    <article className="flex flex-col items-center text-center">
      <motion.div
        initial={
          reduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.94 }
        }
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: reduced ? 0.2 : 0.9, ease }}
      >
        <ProgramPortrait
          src={event.image}
          alt={event.venue}
          objectPosition={event.objectPosition}
        />
      </motion.div>

      <motion.div
        className="mt-[22px] flex w-full max-w-[min(300px,100%)] flex-col items-center px-2 text-center"
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: reduced ? 0.2 : 0.75,
          delay: reduced ? 0 : 0.18,
          ease,
        }}
      >
        <p className="w-full max-w-full break-words font-medium" style={DAY_PROGRAM_TYPE.venue}>
          {event.venue}
        </p>

        {event.eventType ? (
          <p className="mt-2.5 font-serif" style={DAY_PROGRAM_TYPE.eventType}>
            {event.eventType}
          </p>
        ) : null}

        {event.mapUrl ? (
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3.5 inline-flex min-h-11 items-center text-[#B98C3D] transition-colors hover:text-[#A9782E]"
            style={DAY_PROGRAM_TYPE.mapLink}
          >
            <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
            Ինչպես հասնել
          </a>
        ) : null}
      </motion.div>
    </article>
  );
}

export function TimelineSection() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-x-hidden bg-background-alt px-4 py-12 sm:px-8 md:py-16">
      <div className="relative z-10 mx-auto w-full max-w-[980px]">
        <div className="mb-[38px] flex flex-col items-center text-center">
          <motion.h2
            className="px-2 text-center font-serif"
            style={{
              fontSize: "clamp(36px, 10vw, 58px)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#5F5045",
            }}
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduced ? 0.2 : 0.9, ease }}
          >
            Օրվա ծրագիրը
          </motion.h2>

          <motion.div
            className="mt-3"
            initial={reduced ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              delay: reduced ? 0 : 0.15,
              duration: reduced ? 0.2 : 0.9,
              ease,
            }}
          >
            <DecorationImage
              src={DECORATIONS.goldPearlRibbon}
              width={380}
              height={120}
              className="h-auto w-[clamp(150px,48vw,220px)] object-contain md:w-[250px]"
            />
          </motion.div>
        </div>

        <div className={cn("flex flex-col", DAY_PROGRAM_ROW_GAP)}>
          {DAY_PROGRAM.map((event) => (
            <ProgramRow key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
