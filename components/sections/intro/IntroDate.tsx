"use client";

import { motion } from "framer-motion";
import { INTRO_LAYOUT } from "@/lib/intro-constants";
import { usePrefersReducedMotion } from "@/lib/motion";

type IntroDateProps = {
  opening: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

const DATE_NUMBER_STYLE = {
  fontWeight: 400,
  fontSize: INTRO_LAYOUT.dateSize,
  lineHeight: 0.78,
  letterSpacing: "0em",
} as const;

const DATE_LINES = [
  {
    value: "10",
    top: INTRO_LAYOUT.dateFirstTop,
    left: INTRO_LAYOUT.dateFirstLeft,
  },
  {
    value: "10",
    top: INTRO_LAYOUT.dateSecondTop,
    left: INTRO_LAYOUT.dateSecondLeft,
  },
  {
    value: "26",
    top: INTRO_LAYOUT.dateYearTop,
    left: INTRO_LAYOUT.dateYearLeft,
  },
] as const;

export function IntroDate({ opening }: IntroDateProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
      {DATE_LINES.map((line, index) => (
        <motion.div
          key={`${line.value}-${index}`}
          className="absolute"
          custom={index}
          style={{
            top: line.top,
            left: line.left,
          }}
          initial={reduced ? "settled" : "hidden"}
          animate={opening ? "exiting" : "visible"}
          variants={{
            hidden: { opacity: 0, x: -70 },
            settled: { opacity: 1, x: 0 },
            visible: (i: number) =>
              reduced
                ? { opacity: 1, x: 0 }
                : {
                    opacity: [0, 1, 1],
                    x: [-70, 12, 0],
                    transition: {
                      delay: 0.2 + i * 0.38,
                      duration: 1.5,
                      ease,
                    },
                  },
            exiting: {
              opacity: 0,
              x: -12,
              transition: {
                duration: reduced ? 0.3 : 0.6,
                delay: 0,
                ease,
              },
            },
          }}
        >
          <span
            className="font-intro-serif whitespace-nowrap text-[#3F352D]"
            style={DATE_NUMBER_STYLE}
          >
            {line.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
