/** Timeline background graphic and event label positions (TimelineSection). */

export const TIMELINE_BACKGROUND = {
  /** Place the supplied timeline graphic at public/images/timeline.png */
  src: "/images/timeline.png",
  alt: "",
  /** Intrinsic dimensions of the background graphic — update if your asset differs. */
  width: 750,
  height: 1320,
} as const;

/** Tailwind aspect-ratio class for the timeline frame. Adjust if the graphic proportions change. */
export const TIMELINE_ASPECT = "aspect-[750/1320]";

/** Full width on phones; capped so the graphic is not stretched on tablet/desktop. */
export const TIMELINE_IMAGE_WIDTH = "w-full max-w-[430px] mx-auto";

/** Minimal horizontal inset around the timeline graphic (safe edge margin). */
export const TIMELINE_IMAGE_INSET = "px-1";

/** Intro copy above the timeline graphic. */
export const TIMELINE_INTRO = {
  marginBottom: "mb-7",
  headingClass:
    "font-serif text-[1.6rem] leading-snug tracking-[0.06em] text-gold md:text-[1.75rem]",
  descriptionClass:
    "mt-2 text-[0.85rem] leading-[1.6] text-foreground-secondary md:text-[0.9rem]",
  heading: "Մեր օրվա ընթացքը",
  description: "Սիրով կիսվում ենք մեր կարևոր օրվա պահերով",
} as const;

/** Subtle per-label reveal animation — edit here to tune later. */
export const TIMELINE_LABEL_REVEAL = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, amount: 0.4 as const },
} as const;

/**
 * Event label positions relative to the timeline image frame.
 * Edit `top` and `inset` to align with each row in the background graphic.
 * `side`: "left" | "right" — which edge the label hugs.
 */
export const TIMELINE_EVENT_LABELS = [
  {
    id: "bride-home",
    label: "Հարսի տուն",
    top: "33%",
    side: "left" as const,
    inset: "7%",
  },
  {
    id: "groom-home",
    label: "Փեսայի տուն",
    top: "23.5%",
    side: "right" as const,
    inset: "7%",
  },
  {
    id: "ceremony",
    label: "Եկեղեցի",
    top: "46%",
    side: "right" as const,
    inset: "7%",
  },
  {
    id: "photoshoot",
    label: "Ֆոտոնկարահանում",
    top: "59%",
    side: "left" as const,
    inset: "7%",
  },
  {
    id: "reception",
    label: "Հանդիսություն",
    top: "72%",
    side: "right" as const,
    inset: "7%",
  },
] as const;

/** Shared Tailwind classes for event title labels. */
export const TIMELINE_LABEL_CLASS =
  "font-serif text-[0.92rem] leading-snug tracking-[0.04em] text-foreground sm:text-[0.95rem] md:text-base";

/** Transition block between timeline and the next full-width photo. */
export const TIMELINE_TRANSITION = {
  afterTimeline: "mt-9",
  afterText: "mt-4",
  beforeNextPhoto: "pb-8",
  textClass:
    "whitespace-pre-line font-serif text-[0.85rem] leading-[1.65] tracking-wide text-gold/70 md:text-sm",
  text: "Եվ այսպես սկսվում է\nմեր ամենագեղեցիկ պատմությունը…",
  ribbonWidth: "w-[clamp(150px,42vw,190px)]",
  textReveal: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
    viewport: { once: true, amount: 0.5 as const },
  },
  ribbonReveal: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] as const },
    viewport: { once: true, amount: 0.5 as const },
  },
} as const;

/** Flowers decoration below the post-timeline photo, before the next content block. */
export const TIMELINE_PHOTO_FLOWERS = {
  width: "w-[clamp(120px,38vw,160px)]",
  afterPhoto: "mt-7",
  beforeNext: "mb-5",
  opacity: "opacity-[0.88]",
  reveal: {
    initial: { opacity: 0, y: 14, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    viewport: { once: true, amount: 0.5 as const },
  },
} as const;
