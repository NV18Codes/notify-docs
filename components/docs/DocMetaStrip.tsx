"use client";

import { copy, estimatedReadLabel } from "@/lib/copy";

type Props = {
  minutes?: number;
};

export function DocMetaStrip({ minutes = 3 }: Props) {
  return (
    <p className="not-prose mb-8 text-sm text-notifyy-muted dark:text-zinc-500">
      <span className="italic">{copy.docs.lastUpdated}</span>
      <span className="mx-2 text-notifyy-border dark:text-zinc-600" aria-hidden>
        ·
      </span>
      <span>{estimatedReadLabel(minutes)}</span>
    </p>
  );
}
