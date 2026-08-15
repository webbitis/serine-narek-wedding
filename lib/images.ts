export const WEDDING_IMAGES = {
  hero: {
    src: "/images/couple3.png",
    alt: "Սերինե և Նարեկ",
    objectPosition: "center center",
  },
  invitation: {
    src: "/images/dance.png",
    alt: "Սերինե և Նարեկ",
    objectPosition: "center 30%",
  },
  final: {
    src: "/images/sweet-final.png",
    alt: "Սերինե և Նարեկ",
    objectPosition: "center 28%",
  },
} as const;

export type PhotoStoryLayout =
  | "full-bleed"
  | "portrait-float"
  | "wide-cinematic"
  | "background-text";

export type PhotoStoryAnimation = "fade-scale" | "masked-reveal" | "parallax" | "fade-up";

export const PHOTO_STORY = [
  {
    src: "/images/hands.jpg",
    alt: "Երկու ճանապարհ",
    text: "Երկու ճանապարհ՝ մեկ պատմության",
    layout: "full-bleed" as PhotoStoryLayout,
    objectPosition: "70% center",
    animation: "fade-scale" as PhotoStoryAnimation,
  },
  {
    src: "/images/horse_hug.jpg",
    alt: "Մեկ որոշում",
    text: "Մեկ որոշում՝ մի ամբողջ կյանք",
    layout: "background-text" as PhotoStoryLayout,
    objectPosition: "center 35%",
    animation: "parallax" as PhotoStoryAnimation,
  },
  {
    src: "/images/dance1.jpg",
    alt: "Միասին",
    text: "Եվ մի ամբողջ կյանք՝ միասին",
    layout: "wide-cinematic" as PhotoStoryLayout,
    objectPosition: "center 40%",
    animation: "masked-reveal" as PhotoStoryAnimation,
  },
] as const;
