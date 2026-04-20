"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useRef } from "react";

export function PreBlock({ children, ...rest }: ComponentPropsWithoutRef<"pre">) {
  const ref = useRef<HTMLPreElement>(null);

  async function copy() {
    const text = ref.current?.innerText ?? "";
    if (!text) return;
    await navigator.clipboard.writeText(text);
  }

  return (
    <div className="group relative my-5">
      <pre
        ref={ref}
        className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-900 p-4 text-sm text-zinc-100 dark:border-slate-700 dark:bg-slate-950"
        {...rest}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity hover:bg-blue-800 group-hover:opacity-100"
      >
        Copy
      </button>
    </div>
  );
}
