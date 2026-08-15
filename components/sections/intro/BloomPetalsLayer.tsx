"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { WEDDING_IMAGES } from "@/lib/images";
import type { GoldParticle, PetalParticle } from "@/lib/intro-bloom";

type BloomPetalsLayerProps = {
  petals: PetalParticle[];
  goldParticles: GoldParticle[];
  active: boolean;
};

function PetalItem({ petal, active }: { petal: PetalParticle; active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[42%] z-[14]"
      initial={{ x: petal.originX, y: petal.originY, opacity: 0, rotate: petal.rotate, scale: 0.6 }}
      animate={
        active
          ? {
              x: petal.originX + petal.x,
              y: petal.originY + petal.y,
              opacity: [0, petal.peakOpacity, petal.peakOpacity * 0.5, 0],
              rotate: petal.endRotate,
              scale: 1,
            }
          : { opacity: 0 }
      }
      transition={{
        duration: petal.duration,
        delay: petal.delay,
        ease: [0.22, 0.8, 0.36, 1],
        opacity: { duration: petal.duration, times: [0, 0.15, 0.65, 1] },
      }}
    >
      <div style={{ width: petal.size }}>
        <DecorationImage
          src={petal.src}
          width={60}
          height={60}
          className="h-auto w-full opacity-80"
        />
      </div>
    </motion.div>
  );
}

function GoldSparkleItem({
  particle,
  active,
}: {
  particle: GoldParticle;
  active: boolean;
}) {
  return (
    <motion.span
      className="pointer-events-none absolute left-1/2 top-[42%] z-[14] block h-1 w-1 rounded-full bg-gold/70 blur-[0.5px] shadow-[0_0_6px_rgba(183,154,99,0.55)]"
      initial={{ x: particle.x, y: particle.y, opacity: 0, scale: 0.5 }}
      animate={
        active
          ? {
              x: particle.x + particle.driftX,
              y: particle.y + particle.driftY,
              opacity: [0, 0.7, 0.4, 0],
              scale: [0.5, 1, 0.8, 0.4],
            }
          : { opacity: 0 }
      }
      transition={{
        duration: particle.duration,
        delay: particle.delay,
        ease: "easeOut",
        opacity: { duration: particle.duration, times: [0, 0.2, 0.6, 1] },
      }}
    />
  );
}

export function BloomPetalsLayer({
  petals,
  goldParticles,
  active,
}: BloomPetalsLayerProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[14] overflow-hidden">
      {petals.map((petal) => (
        <PetalItem key={petal.id} petal={petal} active={active} />
      ))}
      {goldParticles.map((particle) => (
        <GoldSparkleItem key={particle.id} particle={particle} active={active} />
      ))}
    </div>
  );
}

export function HeroRevealLayer({ active }: { active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={
          active
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 1.04 }
        }
        transition={{ duration: 1.65, delay: 0.15, ease: "easeOut" }}
      >
        <Image
          src={WEDDING_IMAGES.hero.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f2e8]/20 via-transparent to-[#3b3027]/30" />
      </motion.div>
    </motion.div>
  );
}
