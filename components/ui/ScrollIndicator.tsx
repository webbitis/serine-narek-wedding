"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

export function ScrollIndicator() {
  const reduced = usePrefersReducedMotion();

  const scrollToNext = (event: { currentTarget: HTMLElement }) => {
    const hero = event.currentTarget.closest("section");
    const next = hero?.nextElementSibling;
    if (next instanceof HTMLElement) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToNext}
      aria-label="Ներքև"
      className="absolute left-1/2 z-30 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 bg-transparent"
      style={{
        bottom: "max(24px, calc(env(safe-area-inset-bottom, 0px) + 12px))",
        color: "rgba(255, 245, 225, 0.88)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: reduced ? 0 : 2.1, duration: 1.1, ease: "easeOut" }}
    >
      <motion.span
        className="flex flex-col items-center gap-1"
        animate={
          reduced
            ? { y: 0, opacity: 0.88 }
            : { y: [0, 7, 0], opacity: [0.65, 1, 0.65] }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <span
          className="font-sans"
          style={{
            fontSize: "12px",
            letterSpacing: "0.12em",
            fontWeight: 400,
          }}
        >
          Ներքև
        </span>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1.25L7 6.75L13 1.25"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </motion.button>
  );
}
