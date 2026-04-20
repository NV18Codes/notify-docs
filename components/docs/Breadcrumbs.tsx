"use client";

import { normalizePathSegments, segmentToNavKey, type NavKey } from "@/lib/breadcrumbs";
import { copy } from "@/lib/copy";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = normalizePathSegments(pathname);

  const crumbs: { label: string; href?: string }[] = [
    { label: copy.nav.home, href: "/" },
  ];

  let acc = "";
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    acc += `/${seg}`;
    const key = segmentToNavKey(seg);
    const label = key ? copy.nav[key as NavKey] : seg;
    const isLast = i === segments.length - 1;
    crumbs.push({
      label,
      href: isLast ? undefined : acc,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-notifyy-muted dark:text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-notifyy-border dark:text-zinc-600" aria-hidden>/</span>}
            {c.href ? (
              <Link
                href={c.href}
                className="text-primary underline-offset-2 hover:underline"
              >
                {c.label}
              </Link>
            ) : (
              <span className="font-medium text-notifyy-ink dark:text-zinc-200">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
