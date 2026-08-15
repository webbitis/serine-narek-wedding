"use client";

import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type DecorationImageProps = Omit<ImageProps, "alt"> & {
  alt?: string;
};

export function DecorationImage({
  src,
  alt = "",
  width,
  height,
  className,
  priority = false,
  unoptimized,
  loading,
  ...rest
}: DecorationImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      unoptimized={unoptimized}
      loading={loading ?? (priority ? undefined : "lazy")}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden={!alt}
      {...rest}
    />
  );
}
