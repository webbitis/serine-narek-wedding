"use client";

import { useCallback, useState } from "react";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { MusicProvider } from "@/components/providers/MusicProvider";
import { MusicControl } from "@/components/ui/MusicControl";
import { DateSection } from "@/components/sections/DateSection";
import { FinalSection } from "@/components/sections/FinalSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InvitationSection } from "@/components/sections/InvitationSection";
import { IntroOverlay } from "@/components/sections/IntroOverlay";
import { PhotoStoryBlock } from "@/components/sections/PhotoStorySection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { TimelineSection } from "@/components/sections/TimelineSection";

function WeddingContent() {
  const [introVisible, setIntroVisible] = useState(true);
  const [opened, setOpened] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);

  const handleIntroPlay = useCallback(() => setOpened(true), []);
  const handleVideoReady = useCallback(() => setHeroVideoReady(true), []);
  const handleIntroComplete = useCallback(() => setIntroVisible(false), []);

  return (
    <div className="relative min-h-[100svh] bg-[#d8c7aa]">
      <main className="overflow-x-clip bg-[#d8c7aa]">
        <HeroSection
          opened={opened}
          videoReady={heroVideoReady}
          onVideoReady={handleVideoReady}
        />
        {opened ? (
          <>
            <InvitationSection />
            <DateSection />

            <PhotoStoryBlock index={0} />

            <GoldDivider variant="thin" />
            <TimelineSection />

            <PhotoStoryBlock index={1} />

            <RsvpSection />
            <FinalSection />
          </>
        ) : null}
      </main>
      {introVisible && (
        <IntroOverlay
          onPlay={handleIntroPlay}
          onComplete={handleIntroComplete}
          heroVideoReady={heroVideoReady}
        />
      )}
      {!introVisible && <MusicControl />}
    </div>
  );
}

export function WeddingPage() {
  return (
    <MusicProvider>
      <WeddingContent />
    </MusicProvider>
  );
}
