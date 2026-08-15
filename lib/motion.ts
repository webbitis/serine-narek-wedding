"use client";

import { useReducedMotion } from "framer-motion";

export function usePrefersReducedMotion() {
  return useReducedMotion() ?? false;
}

export function getMotionDuration(reduced: boolean, normal: number) {
  return reduced ? 0.01 : normal;
}

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};
