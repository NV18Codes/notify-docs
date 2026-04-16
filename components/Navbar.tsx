"use client";

import { ThemeToggle } from "@/components/docs/ThemeToggle";
import { copy } from "@/lib/copy";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:max-w-none lg:px-6">
      <Link
        href="/docs"
        className="font-semibold tracking-tight text-notifyy-ink dark:text-zinc-50"
      >
        Notifyy <span className="font-normal text-primary">Docs</span>
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        <a
          href="https://www.notifyy.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary underline-offset-2 hover:text-primaryDark hover:underline"
        >
          {copy.docs.visitNotifyy}
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}
