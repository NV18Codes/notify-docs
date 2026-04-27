import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"img">, "src" | "width" | "height"> & {
  src?: string;
};

/** MDX images: optimized `next/image` for local `/public` paths; falls back for remote URLs. */
export function MdxImage({ src, alt, className }: Props) {
  if (!src || typeof src !== "string") {
    return null;
  }

  const isAbsoluteUrl = /^https?:\/\//i.test(src);
  if (isAbsoluteUrl) {
    // eslint-disable-next-line @next/next/no-img-element -- external URLs not in next/image config
    return (
      <img
        src={src}
        alt={alt ?? ""}
        className={cn(
          "not-prose mx-auto my-6 block h-auto max-w-full cursor-pointer rounded-lg border border-gray-200 shadow-sm transition duration-200 ease-in-out hover:scale-[1.02] hover:shadow-md dark:border-slate-600/70 dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
          className,
        )}
        loading="lazy"
      />
    );
  }

  return (
    <span className="not-prose mx-auto my-6 block max-w-full text-center">
      <Image
        src={src}
        alt={alt ?? "Documentation screenshot"}
        width={1200}
        height={750}
        sizes="(max-width: 768px) 100vw, 48rem"
        quality={85}
        loading="lazy"
        className={cn(
          "mx-auto h-auto w-full max-w-full cursor-pointer rounded-lg border border-gray-200 shadow-sm transition duration-200 ease-in-out hover:scale-[1.02] hover:shadow-md dark:border-slate-600/70 dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
          className,
        )}
      />
    </span>
  );
}
