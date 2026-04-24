import type { ReactNode } from "react";

export function WarningBox({ children }: { children: ReactNode }) {
  return (
    <aside className="my-5 flex gap-3 rounded-lg border border-yellow-200/90 bg-yellow-50 px-4 py-3 text-sm text-yellow-900 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md dark:border-amber-900/35 dark:bg-amber-950/30 dark:text-amber-100 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      <span className="select-none font-medium text-yellow-800 dark:text-amber-200" aria-hidden>
        Important
      </span>
      <div className="min-w-0 flex-1 [&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">{children}</div>
    </aside>
  );
}
