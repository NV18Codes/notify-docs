"use client";

import { ThemeToggle } from "@/components/docs/ThemeToggle";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:max-w-none lg:px-6">
      <Link
        href="/docs"
        className="font-medium tracking-tight text-notifyy-ink dark:text-zinc-50"
      >
        Notifyy <span className="font-normal text-primary">Docs</span>
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        <a
          href="https://www.notifyy.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-[min(100%,20rem)] text-right text-sm text-primary underline-offset-2 hover:underline sm:max-w-none sm:text-left"
        >
          <span className="font-medium">Visit Notifyy →</span>{" "}
          <span className="break-all text-xs font-normal text-notifyy-muted dark:text-zinc-500">
            https://www.notifyy.io/
          </span>
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}
