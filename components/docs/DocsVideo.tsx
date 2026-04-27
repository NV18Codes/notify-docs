"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function DocsVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wasVisibleRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.6;

        if (visible && !wasVisibleRef.current) {
          video.currentTime = 0;
          void video.play();
        }

        if (!visible && wasVisibleRef.current) {
          video.pause();
          video.currentTime = 0;
        }

        wasVisibleRef.current = visible;
      },
      { threshold: [0, 0.6, 1] },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "not-prose my-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-slate-600/70 dark:bg-slate-950/40 dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        className="aspect-video h-auto w-full object-contain"
        muted
        playsInline
        preload="metadata"
        aria-label="Documentation walkthrough video"
      />
    </div>
  );
}
