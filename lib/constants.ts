export const COUPLE = {
  bride: "Սերինե",
  groom: "Նարեկ",
  full: "Նարեկ & Սերինե",
} as const;

export const WEDDING_DATE = {
  display: "10 · 10 · 2026",
  hero: "10 • ՀՈԿՏԵՄԲԵՐ",
  month: "ՀՈԿՏԵՄԲԵՐ",
  day: "10",
  year: "2026",
  full: "10 Հոկտեմբերի 2026",
  iso: "2026-10-10T15:00:00+04:00",
} as const;

export const RSVP_DEADLINE = "25 Սեպտեմբերի 2026";

export type TimelineIconType =
  | "groom-house"
  | "bride-house"
  | "church"
  | "camera"
  | "celebration";

export const TIMELINE = [
  {
    id: "groom-home",
    time: "11:00",
    title: "Փեսայի տուն",
    location: "",
    icon: "groom-house" as TimelineIconType,
  },
  {
    id: "bride-home",
    time: "12:30",
    title: "Հարսի տուն",
    location: "",
    icon: "bride-house" as TimelineIconType,
  },
  {
    id: "ceremony",
    time: "15:00",
    title: "Պսակադրություն",
    location: "Օշականի Սուրբ Մեսրոպ Մաշտոց եկեղեցի",
    icon: "church" as TimelineIconType,
  },
  {
    id: "photoshoot",
    time: "16:15",
    title: "Ֆոտոշարք",
    location: "",
    icon: "camera" as TimelineIconType,
  },
  {
    id: "reception",
    time: "18:00",
    title: "Հարսանյաց հանդիսություն",
    location: "Platinum Hall",
    icon: "celebration" as TimelineIconType,
  },
] as const;

/** Tiny phrases shown between selected timeline stages */
export const TIMELINE_PHRASES: Record<string, string> = {
  "groom-home": "Օրը սկսվում է...",
  "bride-home": "Երկու ընտանիք,\nմեկ նոր պատմություն",
  ceremony: "Եվ սկսվում է մեր\nամենագեղեցիկ ճանապարհը",
};

/** Replace with real Google Maps URLs when available */
export const MAP_URLS = {
  ceremony:
    "https://maps.google.com/?q=Oshakan+Saint+Mesrop+Mashtots+Church+PLACEHOLDER",
  reception: "https://maps.google.com/?q=Platinum+Hall+PLACEHOLDER",
} as const;

export const MUSIC_PATH = "/narek-serine/music/wedding-song.mp3";
