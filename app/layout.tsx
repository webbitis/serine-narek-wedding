import type { Metadata, Viewport } from "next";
import { Noto_Sans_Armenian, Noto_Serif_Armenian } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Սերինե & Նարեկ | Հրավեր",
  description:
    "Սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր կյանքի ամենակարևոր օրվան — 10 Հոկտեմբերի 2026",
  openGraph: {
    title: "Սերինե & Նարեկ",
    description: "10 · 10 · 2026",
    locale: "hy_AM",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F2E8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hy"
      className={`${notoSerifArmenian.variable} ${notoSansArmenian.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
