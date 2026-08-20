"use client";

import { DecorationImage } from "@/components/decorations/DecorationImage";
import { FloatingPetals } from "@/components/decorations/FloatingPetals";
import { PhotoStoryGallery } from "@/components/sections/PhotoStoryGallery";
import { TextReveal } from "@/components/ui/TextReveal";
import { DECORATIONS } from "@/lib/decorations";

export function InvitationSection() {
  return (
    <section className="relative overflow-x-hidden overflow-y-visible bg-background-alt px-4 pt-8 pb-18 sm:px-6 md:pt-10 md:pb-32">
      <FloatingPetals count={2} />

      <div className="relative z-10 mx-auto w-full max-w-lg">
        <TextReveal className="text-center">
          <DecorationImage
            src={DECORATIONS.pearlDropsSmall}
            width={120}
            height={40}
            className="mx-auto h-auto w-16 opacity-50"
          />
        </TextReveal>

        <TextReveal className="mt-8 text-center" delay={0.1}>
          <p className="text-[0.92rem] leading-[2] text-foreground-secondary">
            Ձեր ներկայությունը մեր օրը կդարձնի էլ ավելի հիշարժան։
          </p>
        </TextReveal>
      </div>

      <div className="relative z-10 mx-auto mt-16 w-full min-w-0 max-w-[1080px] md:mt-24">
        <PhotoStoryGallery />
      </div>
    </section>
  );
}
