"use client";

import { copy } from "@/lib/copy";

export function PlatformCta() {
  return (
    <p className="not-prose mb-8 rounded-lg border border-primary/30 bg-notifyy-tint px-4 py-3 text-[15px] leading-relaxed text-notifyy-inkMuted dark:border-sky-500/25 dark:bg-notifyy-surfaceDark dark:text-slate-300">
      {copy.docs.platformCtaLead}{" "}
      <a
        href="https://www.notifyy.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary hover:underline dark:text-sky-400 dark:hover:text-sky-300"
      >
        {copy.docs.dashboardCta}
      </a>
    </p>
  );
}
