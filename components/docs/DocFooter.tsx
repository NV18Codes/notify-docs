"use client";

import { docPaths, docSlugToNavKey, onboardingOrder, type DocSlug } from "@/lib/docs-nav";
import { copy } from "@/lib/copy";
import Link from "next/link";

export function DocFooter({ slug }: { slug: DocSlug }) {
  const idx = onboardingOrder.indexOf(slug);
  const prevSlug = idx > 0 ? onboardingOrder[idx - 1] : null;
  const nextSlug = idx >= 0 && idx < onboardingOrder.length - 1 ? onboardingOrder[idx + 1] : null;

  return (
    <nav
      className="not-prose mt-12 flex flex-col gap-3 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:flex-row sm:justify-between"
      aria-label="Documentation pagination"
    >
      <div className="min-w-0 flex-1">
        {prevSlug ? (
          <Link
            href={docPaths[prevSlug]}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary"
          >
            <span aria-hidden>←</span>
            <span>
              {copy.docs.previous}: {copy.nav[docSlugToNavKey[prevSlug]]}
            </span>
          </Link>
        ) : (
          <span className="text-sm text-zinc-400 dark:text-zinc-600">{copy.docs.previous}: —</span>
        )}
      </div>
      <div className="min-w-0 flex-1 text-right">
        {nextSlug ? (
          <Link
            href={docPaths[nextSlug]}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primaryDark"
          >
            <span>
              {copy.docs.next}: {copy.nav[docSlugToNavKey[nextSlug]]}
            </span>
            <span aria-hidden>→</span>
          </Link>
        ) : (
          <span className="text-sm text-zinc-400 dark:text-zinc-600">{copy.docs.next}: —</span>
        )}
      </div>
    </nav>
  );
}
