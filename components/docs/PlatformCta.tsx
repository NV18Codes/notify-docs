"use client";

import { copy } from "@/lib/copy";

export function PlatformCta() {
  return (
    <p className="not-prose mb-8 rounded-lg border border-primary/30 bg-notifyy-tint px-4 py-3 text-[15px] leading-relaxed text-notifyy-inkMuted dark:border-primary/35 dark:bg-notifyy-tintDark dark:text-zinc-200">
      {copy.docs.platformCtaLead}{" "}
      <a
        href="https://www.notifyy.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary hover:text-primaryDark hover:underline"
      >
        {copy.docs.dashboardCta}
      </a>
    </p>
  );
}
