/** Intro background artwork — fixed dimensions for Next.js Image */
export const INTRO_BACKGROUND = {
  src: "/images/wedding-intro-bg-v3.png",
  width: 852,
  height: 1846,
  objectPosition: "center center",
} as const;

export type IntroButterflyConfig = {
  id: number;
  size: number;
  duration: number;
  delay: number;
  flutterDuration: number;
  x: string[];
  y: string[];
  rotate: number[];
  scale: number[];
  opacity: number[];
  exitX: string;
  exitY: string;
  exitRotate: number;
};

/** Static flight paths — identical on server and client */
export const INTRO_BUTTERFLIES: IntroButterflyConfig[] = [
  {
    id: 0,
    size: 44,
    duration: 18,
    delay: 0,
    flutterDuration: 0.58,
    x: ["88vw", "62vw", "38vw", "18vw", "42vw", "88vw"],
    y: ["11vh", "16vh", "20vh", "18vh", "13vh", "11vh"],
    rotate: [0, 10, -8, 6, -4, 0],
    scale: [0.97, 1.04, 0.94, 1.02, 0.96, 0.97],
    opacity: [0.62, 0.82, 0.52, 0.75, 0.58, 0.62],
    exitX: "74vw",
    exitY: "-8vh",
    exitRotate: -10,
  },
  {
    id: 1,
    size: 36,
    duration: 21,
    delay: 2,
    flutterDuration: 0.52,
    x: ["8vw", "22vw", "48vw", "78vw", "92vw", "8vw"],
    y: ["40vh", "32vh", "24vh", "20vh", "28vh", "40vh"],
    rotate: [0, -9, 7, -6, 11, 0],
    scale: [0.96, 1.03, 0.97, 1.04, 0.95, 0.96],
    opacity: [0.55, 0.72, 0.48, 0.8, 0.6, 0.55],
    exitX: "18vw",
    exitY: "-10vh",
    exitRotate: -8,
  },
  {
    id: 2,
    size: 25,
    duration: 17,
    delay: 4,
    flutterDuration: 0.48,
    x: ["86vw", "90vw", "84vw", "80vw", "86vw"],
    y: ["70vh", "54vh", "40vh", "48vh", "70vh"],
    rotate: [0, 6, -10, 8, 0],
    scale: [0.94, 1.02, 0.97, 1.04, 0.94],
    opacity: [0.48, 0.68, 0.55, 0.75, 0.48],
    exitX: "82vw",
    exitY: "-6vh",
    exitRotate: -12,
  },
  {
    id: 3,
    size: 20,
    duration: 24,
    delay: 6,
    flutterDuration: 0.62,
    x: ["10vw", "28vw", "52vw", "74vw", "10vw"],
    y: ["13vh", "26vh", "33vh", "22vh", "13vh"],
    rotate: [0, 5, -7, 9, 0],
    scale: [0.95, 1.01, 0.96, 1.03, 0.95],
    opacity: [0.45, 0.62, 0.58, 0.72, 0.45],
    exitX: "58vw",
    exitY: "-8vh",
    exitRotate: -6,
  },
  {
    id: 4,
    size: 30,
    duration: 22,
    delay: 8,
    flutterDuration: 0.55,
    x: ["12vw", "24vw", "44vw", "36vw", "12vw"],
    y: ["66vh", "50vh", "34vh", "22vh", "66vh"],
    rotate: [0, -11, 8, -5, 0],
    scale: [0.97, 1.04, 0.94, 1.02, 0.97],
    opacity: [0.5, 0.7, 0.62, 0.85, 0.5],
    exitX: "30vw",
    exitY: "-10vh",
    exitRotate: -9,
  },
];

export const INTRO_OPEN_DURATION_MS = 1800;
export const INTRO_OPEN_DURATION_REDUCED_MS = 550;

/** Viewport-relative positions — container is always 100dvh with object-cover bg */
export const INTRO_LAYOUT = {
  namesTop: "calc(64% - 25px)",
  dateTop: "calc(73% - 25px)",
  circleTop: "calc(89% - 2px)",
} as const;

export type IntroLightParticle = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
};

export type IntroSparkle = {
  id: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
  repeatDelay: number;
};

export type IntroOpenParticle = {
  id: number;
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  delay: number;
  duration: number;
};

export type IntroPearlShimmer = {
  id: number;
  left: string;
  top: string;
  width: string;
  height: string;
  delay: number;
};

/** Static — identical on server and client */
export const INTRO_LIGHT_PARTICLES: IntroLightParticle[] = [
  { id: 0, left: "22%", top: "18%", size: 3, delay: 0, duration: 9, driftX: 8, driftY: -14 },
  { id: 1, left: "68%", top: "24%", size: 2, delay: 2.4, duration: 11, driftX: -6, driftY: -10 },
  { id: 2, left: "44%", top: "14%", size: 2, delay: 4.1, duration: 10, driftX: 5, driftY: -8 },
  { id: 3, left: "78%", top: "34%", size: 3, delay: 1.2, duration: 12, driftX: -9, driftY: -12 },
];

export const INTRO_SPARKLES: IntroSparkle[] = [
  { id: 0, left: "31%", top: "16%", delay: 0, duration: 1.4, repeatDelay: 7.5 },
  { id: 1, left: "62%", top: "21%", delay: 3.2, duration: 1.2, repeatDelay: 9 },
  { id: 2, left: "48%", top: "52%", delay: 5.8, duration: 1.5, repeatDelay: 11 },
];

export const INTRO_PEARL_SHIMMERS: IntroPearlShimmer[] = [
  { id: 0, left: "38%", top: "11%", width: "14%", height: "4%", delay: 0 },
  { id: 1, left: "52%", top: "13%", width: "10%", height: "3%", delay: 2.5 },
  { id: 2, left: "44%", top: "17%", width: "12%", height: "3%", delay: 4.8 },
];

export const INTRO_OPEN_PARTICLES: IntroOpenParticle[] = [
  { id: 0, x: 0, y: 0, driftX: -18, driftY: -32, delay: 0, duration: 1.4 },
  { id: 1, x: 0, y: 0, driftX: 22, driftY: -28, delay: 0.05, duration: 1.5 },
  { id: 2, x: 0, y: 0, driftX: -8, driftY: -38, delay: 0.08, duration: 1.35 },
  { id: 3, x: 0, y: 0, driftX: 14, driftY: -24, delay: 0.1, duration: 1.45 },
  { id: 4, x: 0, y: 0, driftX: -24, driftY: -18, delay: 0.12, duration: 1.3 },
  { id: 5, x: 0, y: 0, driftX: 10, driftY: -42, delay: 0.06, duration: 1.55 },
  { id: 6, x: 0, y: 0, driftX: -12, driftY: -26, delay: 0.14, duration: 1.4 },
];
