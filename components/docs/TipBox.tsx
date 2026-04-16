import type { ReactNode } from "react";

export function TipBox({ children }: { children: ReactNode }) {
  return (
    <aside className="my-5 flex gap-3 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-sm text-notifyy-ink dark:border-primary/30 dark:bg-primary/10 dark:text-zinc-100">
      <span className="select-none font-medium text-primary" aria-hidden>
        Tip
      </span>
      <div className="min-w-0 flex-1 [&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">{children}</div>
    </aside>
  );
}
