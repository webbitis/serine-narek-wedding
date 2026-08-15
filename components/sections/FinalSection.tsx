"use client";

import { motion } from "framer-motion";
import { KenBurnsBackground } from "@/components/decorations/KenBurnsBackground";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { COUPLE } from "@/lib/constants";
import { DECORATIONS } from "@/lib/decorations";
import { WEDDING_IMAGES } from "@/lib/images";

export function FinalSection() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <KenBurnsBackground
        src={WEDDING_IMAGES.final.src}
        alt={WEDDING_IMAGES.final.alt}
        objectPosition={WEDDING_IMAGES.final.objectPosition}
        overlayClassName="bg-gradient-to-t from-[#2a2218]/75 via-[#2a2218]/35 to-[#2a2218]/15"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-8 pb-54 pt-32 text-center">
        <motion.p
          className="max-w-sm font-serif text-xl leading-[1.75] text-pearl/95 md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Սիրով սպասում ենք Ձեզ
        </motion.p>

        <motion.p
          className="mt-4 max-w-xs text-[0.9rem] leading-[1.85] text-pearl/80"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1.3 }}
        >
          մեր կյանքի ամենագեղեցիկ օրը միասին նշելու։
        </motion.p>

        <motion.p
          className="mt-12 font-serif text-3xl text-gold-light md:text-4xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.3 }}
        >
          {COUPLE.full}
        </motion.p>
      </div>

      <DecorationImage
        src={DECORATIONS.pearlDropsSet}
        width={120}
        height={60}
        className="absolute bottom-[70px] left-1/2 z-10 w-20 -translate-x-1/2 opacity-50"
      />
    </section>
  );
}
