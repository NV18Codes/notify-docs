"use client";

import { DOCS_NAV_ITEMS, DOCS_PATHS_WITH_MDX_FOOTER } from "@/lib/docs-flat-nav";
import { copy } from "@/lib/copy";
import Link from "next/link";
import { usePathname } from "next/navigation";

function normalizePath(p: string) {
  return p.replace(/\/$/, "") || "/";
}

function titleForLabelKey(key: string): string {
  if (key === "__home__") return copy.nav.docs;
  const nav = copy.nav as Record<string, string>;
  return nav[key] ?? key;
}

export function DocPager() {
  const pathname = usePathname();
  const path = normalizePath(pathname);

  if (DOCS_PATHS_WITH_MDX_FOOTER.has(path)) return null;

  const idx = DOCS_NAV_ITEMS.findIndex((i) => normalizePath(i.href) === path);
  if (idx < 0) return null;

  const prev = idx > 0 ? DOCS_NAV_ITEMS[idx - 1] : null;
  const next = idx < DOCS_NAV_ITEMS.length - 1 ? DOCS_NAV_ITEMS[idx + 1] : null;

  return (
    <nav
      className="not-prose mt-16 flex flex-col gap-3 border-t border-gray-200/70 pt-10 dark:border-notifyy-borderDark sm:flex-row sm:justify-between"
      aria-label="Documentation pagination"
    >
      <div className="min-w-0 flex-1">
        {prev ? (
          <Link
            href={prev.href}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 underline-offset-2 transition-all duration-200 ease-in-out hover:scale-[1.02] hover:text-primary hover:underline dark:text-slate-400 dark:hover:text-sky-400"
          >
            <span aria-hidden>←</span>
            <span>
              {copy.docs.previous}: {titleForLabelKey(prev.labelKey)}
            </span>
          </Link>
        ) : (
          <span className="text-sm text-gray-400 dark:text-slate-600">{copy.docs.previous}: —</span>
        )}
      </div>
      <div className="min-w-0 flex-1 text-right">
        {next ? (
          <Link
            href={next.href}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-2 transition-all duration-200 ease-in-out hover:scale-[1.02] hover:underline dark:text-sky-400 dark:hover:text-sky-300"
          >
            <span>
              {copy.docs.next}: {titleForLabelKey(next.labelKey)}
            </span>
            <span aria-hidden>→</span>
          </Link>
        ) : (
          <span className="text-sm text-gray-400 dark:text-slate-600">{copy.docs.next}: —</span>
        )}
      </div>
    </nav>
  );
}
