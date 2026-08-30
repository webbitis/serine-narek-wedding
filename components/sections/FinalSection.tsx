"use client";

import { motion } from "framer-motion";

import { KenBurnsBackground } from "@/components/decorations/KenBurnsBackground";
import { COUPLE } from "@/lib/constants";
import { WEDDING_IMAGES, WEDDING_VIDEOS } from "@/lib/images";

export function FinalSection() {
  return (
    <section className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[#d8c7aa]">
      <KenBurnsBackground
        src={WEDDING_VIDEOS.final}
        alt={WEDDING_IMAGES.final.alt}
        objectPosition={WEDDING_IMAGES.final.objectPosition}
        poster={WEDDING_IMAGES.final.src}
        media="video"
        overlayClassName="bg-gradient-to-t from-[#2a2218]/75 via-[#2a2218]/35 to-[#2a2218]/15"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-32 pt-24 text-center sm:px-8 sm:pb-40 md:pb-54 md:pt-32">
        <motion.p
          className="max-w-sm font-serif text-xl leading-[1.75] text-pearl/95 md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
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

      {/* ImHyur signature */}
      <div className="absolute bottom-5 left-0 right-0 z-30 flex items-center justify-center gap-1.5 px-4 text-center text-[8px] tracking-[0.08em] text-white/55">
  <span>Designed with care by</span>

  <a
    href="https://imhyur.am"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#e2c48d]/90 transition-colors hover:text-[#f0d7a7]"
  >
    ImHyur ↗
  </a>
</div>
    </section>
  );
}