"use client";

import { copy } from "@/lib/copy";

export function DocsSiteFooter() {
  return (
    <footer className="not-prose border-t border-notifyy-border bg-notifyy-card/80 px-4 py-6 dark:border-notifyy-borderDark dark:bg-notifyy-cardDark/95">
      <p className="mx-auto max-w-6xl text-xs text-notifyy-muted dark:text-zinc-500 lg:px-6">
        {copy.docs.poweredBy}
        <a
          href="https://www.notifyy.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 font-medium text-primary hover:underline"
        >
          {copy.docs.visitWebsite}
        </a>
      </p>
    </footer>
  );
}
