import type { Metadata } from "next";
import { INTRO_BACKGROUND } from "@/lib/intro-constants";

export const SITE_ORIGIN = "https://imhyur.am";
export const SITE_URL = "https://imhyur.am/narek-serine";
export const OG_IMAGE_URL = `https://imhyur.am${INTRO_BACKGROUND.src}`;

/** Real pixel size of public/images/first.jpeg (do not invent OG crops). */
export const OG_IMAGE_WIDTH = 3807;
export const OG_IMAGE_HEIGHT = 5711;

export const weddingMetadata: Metadata = {
  title: "Նարեկ & Սերինե | Հրավեր",
  description: "10 · 10 · 2026",
  metadataBase: new URL(SITE_ORIGIN),
  openGraph: {
    title: "Նարեկ & Սերինե | Հրավեր",
    description: "10 · 10 · 2026",
    url: SITE_URL,
    siteName: "ImHyur",
    images: [
      {
        url: OG_IMAGE_URL,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: "Նարեկ & Սերինե",
        type: "image/jpeg",
      },
    ],
    type: "website",
    locale: "hy_AM",
  },
  twitter: {
    card: "summary_large_image",
    title: "Նարեկ & Սերինե | Հրավեր",
    description: "10 · 10 · 2026",
    images: [OG_IMAGE_URL],
  },
};
