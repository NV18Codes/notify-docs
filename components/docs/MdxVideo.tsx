"use client";

import { useEffect, useRef } from "react";

interface MdxVideoProps {
  src: string;
  caption?: string;
  /** Show play/pause controls — use only for the main walkthrough video */
  controls?: boolean;
  /** Autoplay when scrolled into view; pauses when scrolled away */
  autoPlayOnView?: boolean;
  loop?: boolean;
  playbackRate?: number;
}

export function MdxVideo({
  src,
  caption,
  controls = false,
  autoPlayOnView = false,
  loop = false,
  playbackRate = 1,
}: MdxVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    if (!autoPlayOnView) return;

    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.loop = loop;
    video.playsInline = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlayOnView, loop]);

  return (
    <figure className="my-6">
      <video
        ref={ref}
        src={src}
        controls={controls}
        playsInline
        muted={autoPlayOnView}
        loop={loop}
        preload={autoPlayOnView ? "metadata" : "auto"}
        className="mx-auto w-full rounded-lg border border-gray-200 shadow-sm dark:border-slate-700"
        onLoadedMetadata={() => {
          if (ref.current) ref.current.playbackRate = playbackRate;
        }}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
