"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { LaceCorner } from "@/components/decorations/LaceCorner";
import { Pearl } from "@/components/ui/Pearl";
import { TextReveal } from "@/components/ui/TextReveal";
import { WEDDING_DATE } from "@/lib/constants";
import { DECORATIONS } from "@/lib/decorations";
import { usePrefersReducedMotion } from "@/lib/motion";

/** Edit compact spacing for the date block here. */
const DATE_SECTION_LAYOUT = {
  sectionPadding: "py-10 md:py-16",
  headingToDay: "mt-[18px]",
  dayToMonth: "mt-2",
  monthToYear: "mt-1.5",
  ornamentsMargin: "mt-5",
  countdownMargin: "mt-8",
  daySize: "text-[4.25rem] md:text-[6rem]",
} as const;

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const INITIAL_TIME_LEFT: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getTimeLeft(): TimeLeft {
  const target = new Date(WEDDING_DATE.iso).getTime();
  const diff = Math.max(0, target - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1">
      <span className="font-serif text-xl tabular-nums text-gold md:text-2xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="max-w-full px-0.5 text-center text-[0.55rem] leading-tight tracking-[0.12em] text-foreground-secondary uppercase">
        {label}
      </span>
    </div>
  );
}

export function DateSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const reduced = usePrefersReducedMotion();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(INITIAL_TIME_LEFT);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`relative overflow-hidden bg-background px-6 ${DATE_SECTION_LAYOUT.sectionPadding}`}
    >
      <LaceCorner side="top-left" size="sm" className="opacity-[0.18]" />
      <LaceCorner side="top-right" size="sm" mirror className="opacity-[0.18]" />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        <TextReveal>
          <div className="flex items-center justify-center gap-2.5">
            <Pearl size={3} />
            <h2 className="font-serif text-lg tracking-[0.28em] text-gold/85 md:text-2xl">
              Մեր օրը
            </h2>
            <Pearl size={3} />
          </div>
        </TextReveal>

        <div ref={ref} className={DATE_SECTION_LAYOUT.headingToDay}>
          <motion.p
            className={`font-serif leading-none text-gold ${DATE_SECTION_LAYOUT.daySize}`}
            initial={reduced ? {} : { opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {WEDDING_DATE.day}
          </motion.p>

          <motion.p
            className={`font-serif text-xs tracking-[0.5em] text-foreground-secondary md:text-sm ${DATE_SECTION_LAYOUT.dayToMonth}`}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 1.2 }}
          >
            {WEDDING_DATE.month}
          </motion.p>

          <motion.p
            className={`font-serif text-sm tracking-[0.35em] text-gold/70 ${DATE_SECTION_LAYOUT.monthToYear}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55, duration: 1 }}
          >
            {WEDDING_DATE.year}
          </motion.p>
        </div>

        <motion.div
          className={`mx-auto flex items-center justify-center gap-3 ${DATE_SECTION_LAYOUT.ornamentsMargin}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 1.2 }}
        >
          <span className="h-px w-8 bg-gold/25" />
          <DecorationImage
            src={DECORATIONS.pearlDropsSmall}
            width={40}
            height={16}
            className="w-7 opacity-55"
          />
          <DecorationImage
            src={DECORATIONS.goldDividerThin}
            width={200}
            height={12}
            className="h-auto w-24 opacity-50"
          />
          <DecorationImage
            src={DECORATIONS.pearlDropsSmall}
            width={40}
            height={16}
            className="w-7 opacity-55"
          />
          <span className="h-px w-8 bg-gold/25" />
        </motion.div>

        <motion.div
          className={`grid grid-cols-4 gap-1 border-t border-gold/10 pt-4 md:gap-3 md:pt-5 ${DATE_SECTION_LAYOUT.countdownMargin}`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 1.2 }}
        >
          <CountdownUnit value={timeLeft.days} label="օր" />
          <CountdownUnit value={timeLeft.hours} label="ժամ" />
          <CountdownUnit value={timeLeft.minutes} label="րոպե" />
          <CountdownUnit value={timeLeft.seconds} label="վայրկյան" />
        </motion.div>
      </div>
    </section>
  );
}
