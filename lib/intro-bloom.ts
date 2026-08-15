import { DECORATIONS } from "@/lib/decorations";

export type PetalParticle = {
  id: number;
  src: string;
  originX: number;
  originY: number;
  x: number;
  y: number;
  rotate: number;
  endRotate: number;
  size: number;
  delay: number;
  duration: number;
  peakOpacity: number;
};

export type DriftPetal = {
  id: number;
  left: string;
  top: string;
  x: number;
  y: number;
  rotate: number;
  endRotate: number;
  size: number;
  delay: number;
  duration: number;
  peakOpacity: number;
};

export type GoldParticle = {
  id: number;
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  delay: number;
  duration: number;
};

/** Generated only on client — never during SSR */
export function generateDriftPetals(count: number, idOffset = 0): DriftPetal[] {
  return Array.from({ length: count }, (_, i) => {
    const id = idOffset + i;
    const fallDown = Math.random() > 0.35;

    return {
      id,
      left: `${15 + Math.random() * 70}%`,
      top: `${8 + Math.random() * 55}%`,
      x: (Math.random() - 0.5) * 80,
      y: fallDown ? 60 + Math.random() * 90 : -(20 + Math.random() * 50),
      rotate: Math.random() * 50 - 25,
      endRotate: Math.random() * 120 - 60,
      size: 12 + Math.random() * 14,
      delay: Math.random() * 2.5,
      duration: 4 + Math.random() * 3,
      peakOpacity: 0.2 + Math.random() * 0.25,
    };
  });
}

export function generatePetalParticles(count = 15, idOffset = 0): PetalParticle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const distance = 50 + Math.random() * 85;
    const upwardBias = Math.random() > 0.4 ? -1 : 0.4;

    return {
      id: idOffset + i,
      src: DECORATIONS.ivoryPetals,
      originX: (Math.random() - 0.5) * 32,
      originY: (Math.random() - 0.5) * 22,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance * upwardBias,
      rotate: Math.random() * 40 - 20,
      endRotate: Math.random() * 140 - 70,
      size: 12 + Math.random() * 16,
      delay: Math.random() * 0.4,
      duration: 1.8 + Math.random() * 1,
      peakOpacity: 0.3 + Math.random() * 0.3,
    };
  });
}

export function generateGoldParticles(count = 5): GoldParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 50,
    y: (Math.random() - 0.5) * 35,
    driftX: (Math.random() - 0.5) * 40,
    driftY: -15 - Math.random() * 45,
    delay: 0.15 + Math.random() * 0.4,
    duration: 1.6 + Math.random() * 0.8,
  }));
}

export const BLOOM_DURATION_MS = 5000;
export const BLOOM_DURATION_REDUCED_MS = 650;
