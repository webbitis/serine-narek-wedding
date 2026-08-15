"use client";

import { motion } from "framer-motion";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { MAP_URLS, TIMELINE } from "@/lib/constants";
import { DECORATIONS } from "@/lib/decorations";

const ceremony = TIMELINE.find((e) => e.id === "ceremony")!;
const reception = TIMELINE.find((e) => e.id === "reception")!;

/** Edit Locations spacing and the center flower here. */
const LOCATIONS_LAYOUT = {
  sectionPadding: "pt-6 pb-10 md:pt-14 md:pb-16",
  stackGap: "flex flex-col gap-8",
  titleToVenue: "mt-3",
  venueToMap: "mt-5",
  flowerWidth: "w-28",
  flowerOpacity: "opacity-40",
  flowerY: "my-0",
} as const;

type LocationCardProps = {
  title: string;
  venue: string;
  mapUrl: string;
  index: number;
};

function LocationCard({ title, venue, mapUrl, index }: LocationCardProps) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="font-serif text-xl text-gold md:text-2xl">{title}</h3>
      <p className={`text-sm leading-relaxed text-foreground-secondary ${LOCATIONS_LAYOUT.titleToVenue}`}>
        {venue}
      </p>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block border-b border-gold/35 pb-1 text-[0.7rem] tracking-[0.22em] text-gold transition-colors hover:border-gold/60 ${LOCATIONS_LAYOUT.venueToMap}`}
      >
        Բացել քարտեզում
      </a>
    </motion.div>
  );
}

export function LocationsSection() {
  return (
    <section className={`relative bg-background px-6 ${LOCATIONS_LAYOUT.sectionPadding}`}>
      <div className={`relative z-10 mx-auto max-w-lg ${LOCATIONS_LAYOUT.stackGap}`}>
        <LocationCard
          title={ceremony.title}
          venue={ceremony.location}
          mapUrl={MAP_URLS.ceremony}
          index={0}
        />

        <div className={`flex justify-center ${LOCATIONS_LAYOUT.flowerY}`}>
          <DecorationImage
            src={DECORATIONS.goldDividerThin}
            width={280}
            height={16}
            className={`h-auto ${LOCATIONS_LAYOUT.flowerWidth} ${LOCATIONS_LAYOUT.flowerOpacity}`}
          />
        </div>

        <LocationCard
          title={reception.title}
          venue={reception.location}
          mapUrl={MAP_URLS.reception}
          index={1}
        />
      </div>
    </section>
  );
}
