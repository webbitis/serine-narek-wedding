"use client";

import { DecorationImage } from "@/components/decorations/DecorationImage";
import { FloatingPetals } from "@/components/decorations/FloatingPetals";
import { PhotoStoryGallery } from "@/components/sections/PhotoStoryGallery";
import { TextReveal } from "@/components/ui/TextReveal";
import { DECORATIONS } from "@/lib/decorations";

export function InvitationSection() {
  return (
    <section className="relative overflow-hidden bg-background-alt px-6 py-18 md:py-32">
      <FloatingPetals count={2} />

      <div className="relative z-10 mx-auto max-w-lg">
        <TextReveal className="text-center">
          <DecorationImage
            src={DECORATIONS.pearlDropsSmall}
            width={120}
            height={40}
            className="mx-auto mb-6 h-auto w-16 opacity-50"
          />
          <h2 className="font-serif text-[1.85rem] leading-tight text-gold md:text-4xl">
            Սիրելի՛ հյուրեր
          </h2>
        </TextReveal>

        <TextReveal className="mt-10 text-center" delay={0.15}>
          <p className="text-[0.92rem] leading-[2] text-foreground-secondary">
            Սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր կյանքի ամենակարևոր օրվան
            և մեզ հետ կիսելու այս գեղեցիկ պահը։
          </p>
        </TextReveal>

        <TextReveal className="mt-8 text-center" delay={0.25}>
          <p className="text-[0.92rem] leading-[2] text-foreground-secondary">
            Ձեր ներկայությունը մեր օրը կդարձնի էլ ավելի հիշարժան։
          </p>
        </TextReveal>
      </div>

      <div className="relative z-10 mx-auto mt-16 w-full max-w-[1080px] md:mt-24">
        <PhotoStoryGallery />
      </div>
    </section>
  );
}
