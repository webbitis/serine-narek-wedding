export const WEDDING_IMAGES = {
  hero: {
    src: "/narek-serine/images/first.jpeg",
    alt: "Նարեկ և Սերինե",
    objectPosition: "center center",
  },
  invitation: {
    src: "/narek-serine/images/dance.png",
    alt: "Նարեկ և Սերինե",
    objectPosition: "center 30%",
  },
  final: {
    src: "/narek-serine/images/last.jpeg",
    alt: "Նարեկ և Սերինե",
    objectPosition: "center 36%",
  },
} as const;

export type PhotoStoryLayout =
  | "full-bleed"
  | "portrait-float"
  | "background-text";

export type PhotoStoryAnimation = "fade-scale" | "masked-reveal" | "parallax" | "fade-up";

export const PHOTO_STORY = [
  {
    src: "/narek-serine/images/hands.jpg",
    alt: "Երկու ճանապարհ",
    text: "Երկու ճանապարհ՝ մեկ պատմության",
    layout: "full-bleed" as PhotoStoryLayout,
    objectPosition: "70% center",
    animation: "fade-scale" as PhotoStoryAnimation,
  },
  {
    src: "/narek-serine/images/horse_hug.jpg",
    alt: "Մեկ որոշում",
    text: "Մեկ որոշում՝ մի ամբողջ կյանք",
    layout: "background-text" as PhotoStoryLayout,
    objectPosition: "center 35%",
    animation: "parallax" as PhotoStoryAnimation,
  },
] as const;
