"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { Pearl } from "@/components/ui/Pearl";
import { TextReveal } from "@/components/ui/TextReveal";
import { WEDDING_DATE } from "@/lib/constants";
import { DECORATIONS } from "@/lib/decorations";
import { usePrefersReducedMotion } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

const COUNTDOWN_GLASS = {
  background: "rgba(255, 248, 236, 0.12)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  border: "1px solid rgba(230, 205, 160, 0.22)",
  borderRadius: "26px",
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
    <div className="flex min-w-0 flex-col items-center gap-1.5">
      <span
        className="font-serif tabular-nums leading-none text-gold"
        style={{ fontSize: "clamp(34px, 10vw, 54px)", fontWeight: 400 }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[12px] leading-none tracking-[0.14em] text-foreground-secondary uppercase">
        {label}
      </span>
    </div>
  );
}

export function DateSection() {
  const reduced = usePrefersReducedMotion();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(INITIAL_TIME_LEFT);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background px-5 py-10 sm:px-6">
      <motion.div
        className="pointer-events-none absolute z-[1]"
        style={{ top: -6, left: -8, width: "clamp(110px, 32vw, 175px)" }}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.72 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0.2 : 1.1, ease }}
      >
        <DecorationImage
          src={DECORATIONS.floralLaceCorner}
          width={1367}
          height={1150}
          className="h-auto w-full"
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <TextReveal>
          <div className="flex items-center justify-center gap-2.5">
            <Pearl size={3} />
            <h2 className="font-serif text-lg tracking-[0.28em] text-gold/85 md:text-2xl">
              Մեր օրը
            </h2>
            <Pearl size={3} />
          </div>
        </TextReveal>

        <motion.div
          className="mt-6"
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduced ? 0.2 : 1.05, ease }}
        >
          <p
            className="font-serif leading-none text-gold"
            style={{ fontSize: "clamp(90px, 27vw, 150px)", fontWeight: 400 }}
          >
            {WEDDING_DATE.day}
          </p>

          <p
            className="font-serif tracking-[0.22em] text-foreground-secondary md:tracking-[0.28em]"
            style={{
              marginTop: 8,
              fontSize: "clamp(28px, 8vw, 46px)",
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            {WEDDING_DATE.month}
          </p>

          <p
            className="font-serif tracking-[0.28em] text-gold/75"
            style={{
              marginTop: 8,
              fontSize: "clamp(34px, 10vw, 58px)",
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            {WEDDING_DATE.year}
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          style={{ marginTop: 20, marginBottom: 30 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.82 }}
          viewport={{ once: true }}
          transition={{
            duration: reduced ? 0.2 : 1,
            delay: reduced ? 0 : 0.18,
            ease,
          }}
        >
          <DecorationImage
            src={DECORATIONS.goldDividerOrnament}
            width={478}
            height={156}
            className="h-auto"
            style={{ width: "clamp(120px, 38vw, 190px)" }}
          />
        </motion.div>

        <motion.div
          className="mx-auto grid w-full max-w-[340px] grid-cols-4 items-start"
          style={{
            ...COUNTDOWN_GLASS,
            padding: "22px 16px 20px",
          }}
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduced ? 0.2 : 1.1, delay: reduced ? 0 : 0.2, ease }}
        >
          <CountdownUnit value={timeLeft.days} label="օր" />
          <CountdownUnit value={timeLeft.hours} label="ժամ" />
          <CountdownUnit value={timeLeft.minutes} label="րոպե" />
          <CountdownUnit value={timeLeft.seconds} label="վրկ" />
        </motion.div>
      </div>
    </section>
  );
}
