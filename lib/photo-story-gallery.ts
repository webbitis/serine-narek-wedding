/** Slider config for the invitation photo block (InvitationSection). */

export type GalleryPhoto = {
  src: string;
  alt: string;
  objectPosition: string;
};

/** Tailwind aspect-ratio class — controls slider height. */
export const PHOTO_STORY_GALLERY_ASPECT = "aspect-[4/5]";

/** Tailwind width classes — slider frame width on mobile/desktop. */
export const PHOTO_STORY_SLIDER_WIDTH = "w-[82vw] max-w-[320px]";

/** Autoplay interval in milliseconds. */
export const PHOTO_STORY_GALLERY_INTERVAL_MS = 5000;

/** Fade transition duration in seconds. */
export const PHOTO_STORY_GALLERY_FADE_DURATION = 1.1;

/**
 * Edit this list to change slider photos.
 * dance.png is always the first slide.
 */
export const PHOTO_STORY_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: "/images/dance.png",
    alt: "Սերինե և Նարեկ",
    objectPosition: "center 40%",
  },
  {
    src: "/images/kiss.jpg",
    alt: "Սեր",
    objectPosition: "center 40%",
  },
  {
    src: "/images/sweet.jpg",
    alt: "Քաղցր պահ",
    objectPosition: "center 35%",
  },
  {
    src: "/images/run.jpg",
    alt: "Միասին",
    objectPosition: "center 42%",
  },
  {
    src: "/images/hands.jpg",
    alt: "Երկու ճանապարհ",
    objectPosition: "70% center",
  },
  {
    src: "/images/horse_look.jpg",
    alt: "Նայելով արևին",
    objectPosition: "center 35%",
  },
];

/** Decorative floral/lace placement — Tailwind classes relative to the slider image frame. */
export const PHOTO_STORY_GALLERY_DECORATIONS = {
  /** Left corner — horizontal: -left-[12%], vertical: -top-[8%] */
  leftCorner:
    "absolute -left-[12%] -top-[8%] z-20 w-[38%] pointer-events-none opacity-[0.32]",
  /** Right lace — horizontal: -right-[18%], vertical: -top-[10%] */
  rightLace:
    "absolute -right-[18%] -top-[10%] z-20 w-[38%] pointer-events-none opacity-[0.28]",
} as const;
