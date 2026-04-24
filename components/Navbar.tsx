"use client";

import { DocsSearchTrigger } from "@/components/docs/DocsCommandPalette";
import { ThemeToggle } from "@/components/docs/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto flex max-w-6xl items-center justify-end gap-4 px-4 py-3 lg:max-w-none lg:px-6", className)}>
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        <DocsSearchTrigger />
        <a
          href="https://www.notifyy.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-primary/15 dark:border-sky-400/25 dark:bg-sky-400/10 dark:text-sky-300 dark:hover:bg-sky-400/20"
        >
          Visit Notifyy →
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}
