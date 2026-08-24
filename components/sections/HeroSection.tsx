"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { WEDDING_VIDEOS } from "@/lib/images";
import { usePrefersReducedMotion } from "@/lib/motion";
import { HeroCornerDecorations } from "@/components/sections/hero/HeroCornerDecorations";
import { HeroDriftingPetals } from "@/components/sections/hero/HeroDriftingPetals";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[#d8c7aa] md:h-screen md:min-h-[700px]"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={reduced ? {} : { scale: imageScale, y: imageY }}
      >
        <motion.div
          className="relative h-full w-full bg-[#d8c7aa]"
          initial={reduced ? {} : { scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.65, ease: "easeOut" }}
        >
          <BackgroundVideo
            src={WEDDING_VIDEOS.hero}
            className="object-center md:object-[center_32%]"
          />
        </motion.div>
      </motion.div>

      <HeroCornerDecorations />
      <HeroDriftingPetals />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 z-[15] h-[280px] w-[min(88%,420px)]"
        style={{
          top: "62%",
          transform: "translate(-50%, -42%)",
          background:
            "radial-gradient(circle at center, rgba(45, 32, 24, 0.28) 0%, rgba(45, 32, 24, 0.12) 48%, rgba(45, 32, 24, 0) 74%)",
        }}
      />

      <div className="pointer-events-none absolute left-1/2 z-20 w-[min(86%,26rem)] -translate-x-1/2 text-center"
        style={{ top: "62%" }}
      >
        <motion.h2
          className="font-serif"
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduced ? 0 : 1.05,
            duration: reduced ? 0.2 : 1.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            fontSize: "clamp(28px, 8vw, 42px)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "#F8F1E7",
            textShadow:
              "0 2px 8px rgba(35, 25, 18, 0.32), 0 1px 2px rgba(45, 30, 20, 0.22)",
          }}
        >
          Սիրելի՛ հյուր
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-[18rem] font-serif sm:max-w-[22rem]"
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduced ? 0 : 1.4,
            duration: reduced ? 0.2 : 1.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            fontSize: "clamp(16px, 4.5vw, 20px)",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "rgba(248, 241, 231, 0.92)",
            textShadow: "0 2px 8px rgba(35, 25, 18, 0.30)",
          }}
        >
          Սիրով հրավիրում ենք Ձեզ
          <br />
          միասին նշելու մեր կյանքի
          <br />
          ամենակարևոր օրը։
        </motion.p>
      </div>

      <ScrollIndicator />
    </section>
  );
}
