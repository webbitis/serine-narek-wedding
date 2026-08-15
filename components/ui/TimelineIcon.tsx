"use client";

import { Camera, Home, Wine } from "lucide-react";
import type { TimelineIconType } from "@/lib/constants";

type TimelineIconProps = {
  type: TimelineIconType;
  className?: string;
};

function ArmenianChurchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 4v4M16 4l-2 2M16 4l2 2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M8 22V12l8-5 8 5v10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M6 22h20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M12 22v-6h8v6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 10.5c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5"
        stroke="currentColor"
        strokeWidth="0.75"
      />
    </svg>
  );
}

function BrideHouseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 22V12l8-5 8 5v10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M6 22h20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M14 22v-5h4v5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="10" r="1.5" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M22 8.5v3M20.5 10h3"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TimelineIcon({ type, className = "h-8 w-8 text-gold" }: TimelineIconProps) {
  switch (type) {
    case "groom-house":
      return <Home className={className} strokeWidth={1} aria-hidden="true" />;
    case "bride-house":
      return <BrideHouseIcon className={className} />;
    case "church":
      return <ArmenianChurchIcon className={className} />;
    case "camera":
      return <Camera className={className} strokeWidth={1} aria-hidden="true" />;
    case "celebration":
      return <Wine className={className} strokeWidth={1} aria-hidden="true" />;
    default:
      return null;
  }
}
