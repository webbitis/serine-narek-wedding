import { MAP_URLS } from "@/lib/constants";

export type DayProgramSide = "left" | "right";

export type DayProgramEvent = {
  id: string;
  venue: string;
  eventType?: string;
  image: string;
  side: DayProgramSide;
  objectPosition?: string;
  mapUrl?: string;
};

/**
 * Day-of program for “Օրվա ծրագիրը”.
 * Shared hierarchy: venue (WHERE) → eventType (WHAT) → mapUrl (HOW).
 */
export const DAY_PROGRAM: DayProgramEvent[] = [
  {
    id: "groom-home",
    venue: "գ․ Օշական",
    eventType: "Փեսայի տուն",
    image: "/narek-serine/images/bridegroom.png",
    objectPosition: "42% 42%",
    side: "left",
  },
  {
    id: "bride-home",
    venue: "գ․ Վարդենիկ",
    eventType: "Հարսի տուն",
    image: "/narek-serine/images/bride.png",
    objectPosition: "52% 58%",
    side: "right",
  },
  {
    id: "church",
    venue: "Օշականի Սուրբ Մեսրոպ Մաշտոց եկեղեցի",
    eventType: "Պսակադրություն",
    mapUrl: MAP_URLS.ceremony,
    image: "/narek-serine/images/churche.jpg",
    side: "left",
  },
  {
    id: "groom-home-return",
    venue: "գ․ Օշական",
    eventType: "Փեսայի տուն",
    image: "/narek-serine/images/bridegroom.png",
    objectPosition: "42% 42%",
    side: "right",
  },
  {
    id: "reception",
    venue: "Platinum Hall",
    eventType: "Հարսանյաց հանդիսություն",
    mapUrl: MAP_URLS.reception,
    image: "/narek-serine/images/hall.png",
    objectPosition: "48% 40%",
    side: "left",
  },
];

export const DAY_PROGRAM_CIRCLE =
  "aspect-square h-[clamp(175px,48vw,185px)] w-[clamp(175px,48vw,185px)] max-w-full md:h-[230px] md:w-[230px]";

export const DAY_PROGRAM_ROW_GAP = "gap-y-14 md:gap-y-20";

export const DAY_PROGRAM_TYPE = {
  venue: {
    fontSize: "clamp(22px, 5.8vw, 24px)",
    fontWeight: 500,
    lineHeight: 1.3,
    color: "#C6A15B",
  },
  eventType: {
    fontSize: "clamp(16px, 4.4vw, 18px)",
    fontWeight: 400,
    color: "#6F5A49",
  },
  mapLink: {
    fontSize: "clamp(14px, 3.8vw, 15px)",
    fontWeight: 500,
    gap: 6,
    borderBottom: "1px solid rgba(185, 140, 61, 0.4)",
    paddingBottom: 2,
  },
} as const;
