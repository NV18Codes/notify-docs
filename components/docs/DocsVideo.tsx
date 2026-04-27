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

    // Mobile browsers only allow autoplay when the video is definitely muted
    // before play() is called.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playFromStart = () => {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      void video.play().catch(() => {
        // Some mobile browsers delay autoplay until metadata is ready.
        const onReady = () => {
          video.currentTime = 0;
          void video.play().catch(() => undefined);
        };
        video.addEventListener("loadeddata", onReady, { once: true });
        video.load();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;

        if (visible && !wasVisibleRef.current) {
          playFromStart();
        }

        if (!visible && wasVisibleRef.current) {
          video.pause();
          video.currentTime = 0;
        }

        wasVisibleRef.current = visible;
      },
      { rootMargin: "-12% 0px -12% 0px", threshold: [0, 0.35, 0.6, 1] },
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
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Documentation walkthrough video"
      />
    </div>
  );
}
