import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function MdxLink({
  href,
  children,
  className,
}: Pick<ComponentPropsWithoutRef<"a">, "href" | "children" | "className"> & {
  href?: string;
  children?: ReactNode;
}) {
  const merged = cn(
    "text-primary underline-offset-2 transition-colors hover:underline",
    className,
  );

  if (!href) {
    return <span className={className}>{children}</span>;
  }
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={merged}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={merged}>
      {children}
    </Link>
  );
}
