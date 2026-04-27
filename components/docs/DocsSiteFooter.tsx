"use client";

import { copy } from "@/lib/copy";

export function DocsSiteFooter() {
  return (
    <footer className="not-prose border-t border-notifyy-border bg-white px-4 py-6 dark:border-notifyy-borderDark dark:bg-notifyy-cardDark">
      <p className="mx-auto max-w-6xl text-xs text-notifyy-muted dark:text-notifyy-mutedDark lg:px-6">
        {copy.docs.poweredBy}
        <a
          href="https://www.notifyy.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 font-medium text-primary hover:underline dark:text-sky-400 dark:hover:text-sky-300"
        >
          {copy.docs.visitWebsite}
        </a>
      </p>
    </footer>
  );
}
