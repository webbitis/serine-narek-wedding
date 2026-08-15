"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

type LaceOrnamentProps = {
  className?: string;
  variant?: "corner" | "horizontal" | "vertical";
  draw?: boolean;
};

export function LaceOrnament({
  className = "",
  variant = "horizontal",
  draw = false,
}: LaceOrnamentProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = usePrefersReducedMotion();
  const shouldDraw = draw && isInView && !reduced;

  const paths = {
    horizontal: "M0,12 Q40,4 80,12 T160,12",
    vertical: "M12,0 Q4,40 12,80 T12,160",
    corner: "M0,40 Q20,20 40,0 M0,60 Q30,45 60,30",
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 160 24"
      className={`pointer-events-none ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d={paths[variant === "corner" ? "corner" : variant]}
        className="lace-line"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          shouldDraw
            ? { pathLength: 1, opacity: 0.4 }
            : { pathLength: 1, opacity: 0.25 }
        }
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {variant === "horizontal" && (
        <>
          <motion.circle
            cx="80"
            cy="12"
            r="2"
            fill="#F5F1EA"
            stroke="#B79A63"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldDraw ? 0.6 : 0.35 }}
            transition={{ delay: 1.8, duration: 1 }}
          />
        </>
      )}
    </svg>
  );
}
