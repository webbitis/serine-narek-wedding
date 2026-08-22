import type { Metadata } from "next";
import { WeddingPage } from "@/components/WeddingPage";

export const metadata: Metadata = {
  title: "Նարեկ & Սերինե | Հրավեր",
  description:
    "Սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր կյանքի ամենակարևոր օրվան — 10 Հոկտեմբերի 2026",
  openGraph: {
    title: "Նարեկ & Սերինե | Հրավեր",
    description: "10 · 10 · 2026",
    locale: "hy_AM",
    type: "website",
  },
};

export default function NarekSerineInvitationPage() {
  return <WeddingPage />;
}
