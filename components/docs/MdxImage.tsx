"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type Props = Omit<ComponentPropsWithoutRef<"img">, "src" | "width" | "height"> & {
  src?: string;
};

const imgClass =
  "h-full w-full rounded-md object-contain transition-all duration-200 ease-in-out group-hover:scale-[1.02]";

/** MDX images: optimized `next/image` for local `/public` paths; falls back for remote URLs. Click opens lightbox. */
export function MdxImage({ src, alt, className }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!src || typeof src !== "string") {
    return null;
  }

  const isAbsoluteUrl = /^https?:\/\//i.test(src);

  const lightbox =
    mounted && open
      ? createPortal(
          <div
            className="fixed inset-0 z-[250] flex cursor-zoom-out items-center justify-center bg-black/75 p-4 backdrop-blur-[2px] transition-opacity duration-200 ease-in-out"
            role="presentation"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div
              className="relative max-h-[90vh] max-w-[min(96vw,1200px)] cursor-default"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <p id={titleId} className="sr-only">
                {alt ?? "Documentation image"}
              </p>
              {isAbsoluteUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- lightbox: arbitrary remote URL
                <img
                  src={src}
                  alt={alt ?? ""}
                  className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
                />
              ) : (
                <Image
                  src={src}
                  alt={alt ?? "Documentation screenshot"}
                  width={1600}
                  height={1200}
                  className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
                  sizes="96vw"
                  quality={90}
                  priority
                />
              )}
            </div>
          </div>,
          document.body,
        )
      : null;

  const btnClass =
    "group not-prose mx-auto my-6 flex aspect-video w-full max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-gray-200/90 bg-white p-2 text-left shadow-sm transition-all duration-200 ease-in-out hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-600/60 dark:bg-slate-950/40 dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)] dark:focus-visible:ring-sky-400";

  if (isAbsoluteUrl) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={btnClass}
          aria-label={alt ? `View larger: ${alt}` : "View larger image"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- external URLs not in next/image config */}
          <img src={src} alt={alt ?? ""} className={cn(imgClass, className)} loading="lazy" />
        </button>
        {lightbox}
      </>
    );
  }

  return (
    <>
      <span className="not-prose mx-auto my-6 block max-w-full text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={btnClass}
          aria-label={alt ? `View larger: ${alt}` : "View larger image"}
        >
          <Image
            src={src}
            alt={alt ?? "Documentation screenshot"}
            width={1200}
            height={750}
            sizes="(max-width: 768px) 100vw, 48rem"
            quality={85}
            loading="lazy"
            className={cn(imgClass, className)}
          />
        </button>
      </span>
      {lightbox}
    </>
  );
}
