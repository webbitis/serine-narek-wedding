"use client";

import { useCallback, useState } from "react";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { PearlButterfly } from "@/components/decorations/PearlButterfly";
import { MusicProvider } from "@/components/providers/MusicProvider";
import { MusicControl } from "@/components/ui/MusicControl";
import { DateSection } from "@/components/sections/DateSection";
import { FinalSection } from "@/components/sections/FinalSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InvitationSection } from "@/components/sections/InvitationSection";
import { IntroOverlay } from "@/components/sections/IntroOverlay";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { PhotoStoryBlock } from "@/components/sections/PhotoStorySection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { TimelineSection } from "@/components/sections/TimelineSection";

function WeddingContent() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      {!introComplete && <IntroOverlay onComplete={handleIntroComplete} />}
      {introComplete && (
        <>
          <MusicControl />
          <main className="overflow-x-hidden">
            <HeroSection />
            <InvitationSection />
            <DateSection />

            <PhotoStoryBlock index={0} />

            <GoldDivider variant="thin" />
            <TimelineSection />

            <PhotoStoryBlock index={1} />

            <LocationsSection />

            <div className="relative overflow-visible">
              <PearlButterfly className="right-6 top-8 z-20 opacity-35" />
              <PhotoStoryBlock index={2} />
            </div>

            <RsvpSection />
            <FinalSection />
          </main>
        </>
      )}
    </>
  );
}

export function WeddingPage() {
  return (
    <MusicProvider>
      <WeddingContent />
    </MusicProvider>
  );
}
