/** Static hero petal configs — no random values */
export type HeroPetalConfig = {
  id: number;
  left: string;
  bottom: string;
  size: number;
  x: number;
  y: number;
  rotate: number;
  endRotate: number;
  delay: number;
  duration: number;
  peakOpacity: number;
};

export const HERO_DRIFTING_PETALS: HeroPetalConfig[] = [
  { id: 0, left: "14%", bottom: "22%", size: 13, x: 10, y: 48, rotate: -12, endRotate: 28, delay: 0, duration: 9, peakOpacity: 0.22 },
  { id: 1, left: "72%", bottom: "16%", size: 11, x: -14, y: 42, rotate: 8, endRotate: -32, delay: 1.8, duration: 10, peakOpacity: 0.18 },
  { id: 2, left: "38%", bottom: "12%", size: 15, x: 6, y: 55, rotate: -6, endRotate: 18, delay: 3.2, duration: 8.5, peakOpacity: 0.2 },
  { id: 3, left: "84%", bottom: "24%", size: 10, x: -8, y: 38, rotate: 14, endRotate: -24, delay: 4.5, duration: 11, peakOpacity: 0.16 },
  { id: 4, left: "24%", bottom: "8%", size: 12, x: 12, y: 44, rotate: -18, endRotate: 22, delay: 2.4, duration: 9.5, peakOpacity: 0.19 },
  { id: 5, left: "58%", bottom: "18%", size: 14, x: -10, y: 50, rotate: 5, endRotate: -20, delay: 5.6, duration: 10.5, peakOpacity: 0.17 },
];
