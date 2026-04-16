import type { ReactNode } from "react";

export function WarningBox({ children }: { children: ReactNode }) {
  return (
    <aside className="my-5 flex gap-3 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-900 dark:border-yellow-900/50 dark:bg-yellow-950/25 dark:text-yellow-50">
      <span className="select-none font-medium text-yellow-800 dark:text-yellow-200" aria-hidden>
        Important
      </span>
      <div className="min-w-0 flex-1 [&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">{children}</div>
    </aside>
  );
}
