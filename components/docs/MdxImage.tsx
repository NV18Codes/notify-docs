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
          "not-prose my-6 h-auto max-w-full rounded-lg border border-gray-200 shadow-sm dark:border-zinc-600",
          className,
        )}
        loading="lazy"
      />
    );
  }

  return (
    <span className="not-prose my-6 block">
      <Image
        src={src}
        alt={alt ?? "Documentation screenshot"}
        width={1200}
        height={750}
        sizes="(max-width: 768px) 100vw, 48rem"
        quality={85}
        loading="lazy"
        className={cn(
          "h-auto w-full rounded-lg border border-gray-200 shadow-sm dark:border-zinc-600",
          className,
        )}
      />
    </span>
  );
}
