import type { ReactNode } from "react";

export function TipBox({ children }: { children: ReactNode }) {
  return (
    <aside className="my-5 flex gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-notifyy-ink shadow-sm transition-all duration-200 ease-in-out hover:shadow-md dark:border-sky-500/20 dark:bg-notifyy-surfaceDark dark:text-slate-300 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      <span className="select-none font-medium text-primary dark:text-sky-400" aria-hidden>
        Tip
      </span>
      <div className="min-w-0 flex-1 [&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">{children}</div>
    </aside>
  );
}
