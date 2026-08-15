"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { COUPLE, WEDDING_DATE } from "@/lib/constants";
import { HERO_LAYOUT } from "@/lib/hero-decorations";
import { WEDDING_IMAGES } from "@/lib/images";
import { usePrefersReducedMotion } from "@/lib/motion";
import { IntroButterfly } from "@/components/sections/intro/IntroButterfly";
import { HeroCornerDecorations } from "@/components/sections/hero/HeroCornerDecorations";
import { HeroDriftingPetals } from "@/components/sections/hero/HeroDriftingPetals";
import { HeroPearlDrapes } from "@/components/sections/hero/HeroPearlDrapes";

const ease = [0.22, 1, 0.36, 1] as const;

/** Hero only — intro stays untouched */
const heroNameColorStyle = {
  color: "#F8F1E7",
  textShadow:
    "0 2px 10px rgba(45,30,20,0.32), 0 1px 2px rgba(45,30,20,0.22)",
} as const;

const heroAmpersandColorStyle = {
  fontSize: "20px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  color: "#D8B77A",
  textShadow: "0 1px 6px rgba(45,30,20,0.22)",
  opacity: 1,
  transform: "none",
} as const;

const nameTypography = {
  ...heroNameColorStyle,
  fontWeight: 400,
  lineHeight: 0.93,
  letterSpacing: "0.01em",
  fontSize: "clamp(42px, 11vw, 56px)",
} as const;

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const nameRevealVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.985 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: reduced ? 0 : 1 + i * 0.35,
        duration: 1.3,
        ease,
      },
    }),
  };

  const dateRevealVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: reduced ? 0 : 2.15,
        duration: 1.2,
        ease,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={reduced ? {} : { scale: imageScale, y: imageY }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduced ? {} : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.65, ease: "easeOut" }}
        >
          <Image
            src={WEDDING_IMAGES.hero.src}
            alt={WEDDING_IMAGES.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#f7f2e8]/35 via-[#3b3027]/10 to-[#3b3027]/50" />
        </motion.div>
      </motion.div>

      <HeroCornerDecorations />
      <HeroPearlDrapes />
      <HeroDriftingPetals />
      <IntroButterfly className="z-[15]" />

      {/* Names */}
      <div
  className="pointer-events-none absolute left-1/2 z-20 w-[92%] -translate-x-1/2 -translate-y-1/2 text-center"
  style={{ top: HERO_LAYOUT.namesTop }}
>
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={nameRevealVariants}
          className="font-serif"
          style={nameTypography}
        >
          {COUPLE.bride}
        </motion.h1>

        <motion.span
          custom={1}
          initial="hidden"
          animate="visible"
          variants={nameRevealVariants}
          className="block font-serif"
          style={{
            ...heroAmpersandColorStyle,
            
            margin: "5px 0",
          }}
        >
          &
        </motion.span>

        <motion.h1
          custom={2}
          initial="hidden"
          animate="visible"
          variants={nameRevealVariants}
          className="font-serif"
          style={nameTypography}
        >
          {COUPLE.groom}
        </motion.h1>
      </div>

      {/* Date */}
      <motion.p
        initial="hidden"
        animate="visible"
        variants={dateRevealVariants}
        className="
          pointer-events-none
          absolute
          left-1/2
          z-20
          w-[92%]
          -translate-x-1/2
          text-center
          font-serif
          
        "
        style={{
          top: HERO_LAYOUT.dateTop,
          fontSize: "16px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          color: "#E8D6B7",
          textShadow: "0 1px 6px rgba(40,25,15,0.30)",
        }}
      >
        {WEDDING_DATE.hero}
      </motion.p>

      <ScrollIndicator />
    </section>
  );
}