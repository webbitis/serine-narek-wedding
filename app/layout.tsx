import type { Viewport } from "next";
import {
  Instrument_Serif,
  Italianno,
  Noto_Sans_Armenian,
  Noto_Serif_Armenian,
} from "next/font/google";
import { INTRO_BACKGROUND } from "@/lib/intro-constants";
import { weddingMetadata } from "@/lib/site-metadata";
import "./globals.css";

const notoSerifArmenian = Noto_Serif_Armenian({
  variable: "--font-noto-serif-armenian",
  subsets: ["armenian", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const notoSansArmenian = Noto_Sans_Armenian({
  variable: "--font-noto-sans-armenian",
  subsets: ["armenian", "latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const italianno = Italianno({
  variable: "--font-intro-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-intro-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = weddingMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F2E8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hy"
      className={`${notoSerifArmenian.variable} ${notoSansArmenian.variable} ${italianno.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href={INTRO_BACKGROUND.src}
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full overflow-x-hidden bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
