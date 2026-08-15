"use client";

import { motion } from "framer-motion";
import { KenBurnsBackground } from "./KenBurnsBackground";
import { FloatingPetals } from "./FloatingPetals";

type CinematicPhotoMomentProps = {
  src: string;
  alt: string;
  text: string;
  objectPosition?: string;
  height?: string;
};

export function CinematicPhotoMoment({
  src,
  alt,
  text,
  objectPosition = "center center",
  height = "min-h-[72svh]",
}: CinematicPhotoMomentProps) {
  return (
    <section className={`relative ${height} w-full overflow-hidden`}>
      <KenBurnsBackground
        src={src}
        alt={alt}
        objectPosition={objectPosition}
        overlayClassName="bg-gradient-to-t from-[#2a2218]/65 via-[#2a2218]/20 to-[#2a2218]/10"
      />
      <FloatingPetals count={3} />

      <div className="relative z-10 flex h-full min-h-[inherit] flex-col items-center justify-end px-8 pb-20 pt-32 text-center">
        <motion.p
          className="max-w-xs font-serif text-xl leading-relaxed tracking-wide text-pearl/95 md:text-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}
