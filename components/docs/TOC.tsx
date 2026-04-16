"use client";

import { onboardingToc, type DocSlug } from "@/lib/docs-nav";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

type ArticleSlug = Exclude<DocSlug, "onboarding">;

export function TOC({ slug, className }: { slug: ArticleSlug; className?: string }) {
  const items = onboardingToc[slug];
  const labels = copy.docs.tocLabels;

  return (
    <nav className={cn("text-sm", className)} aria-labelledby="toc-heading">
      <p id="toc-heading" className="mb-3 font-semibold text-notifyy-ink dark:text-zinc-100">
        {copy.docs.onThisPage}
      </p>
      <ul className="space-y-2 border-l border-notifyy-border dark:border-notifyy-borderDark">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="-ml-px block border-l-2 border-transparent py-0.5 pl-3 text-notifyy-muted transition-colors hover:border-primary hover:text-primary dark:text-zinc-400 dark:hover:text-primary"
            >
              {labels[item.labelKey as keyof typeof labels]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
