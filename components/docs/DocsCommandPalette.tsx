"use client";

import { DOCS_NAV_ITEMS } from "@/lib/docs-flat-nav";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export const DOCS_SEARCH_EVENT = "notifyy:open-docs-search";

export function dispatchOpenDocsSearch() {
  window.dispatchEvent(new CustomEvent(DOCS_SEARCH_EVENT));
}

function titleForLabelKey(key: string): string {
  if (key === "__home__") return copy.nav.docs;
  const nav = copy.nav as Record<string, string>;
  return nav[key] ?? key;
}

export function DocsSearchTrigger({ className }: { className?: string }) {
  return (
    <>
      <button
        type="button"
        onClick={() => dispatchOpenDocsSearch()}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md text-notifyy-muted transition-colors duration-200 ease-in-out hover:bg-gray-100 hover:text-notifyy-ink md:hidden dark:text-notifyy-mutedDark dark:hover:bg-white/[0.06] dark:hover:text-slate-200",
          className,
        )}
        aria-label="Search documentation"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => dispatchOpenDocsSearch()}
        className={cn(
          "hidden min-w-[170px] items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-notifyy-muted transition-colors duration-200 ease-in-out hover:bg-gray-100 hover:text-notifyy-ink md:inline-flex dark:text-notifyy-mutedDark dark:hover:bg-white/[0.06] dark:hover:text-slate-200",
          className,
        )}
        aria-label="Search documentation"
      >
        <span>Search…</span>
        <kbd className="rounded px-1 font-mono text-[10px] text-notifyy-muted dark:text-notifyy-mutedDark">
          Cmd/Ctrl + K
        </kbd>
      </button>
    </>
  );
}

export function DocsCommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");
  const [hi, setHi] = useState(0);

  const items = useMemo(() => {
    const rows = DOCS_NAV_ITEMS.map((i) => ({
      href: i.href,
      title: titleForLabelKey(i.labelKey),
    }));
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) => r.title.toLowerCase().includes(s) || r.href.toLowerCase().includes(s));
  }, [q]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setHi(0);
  }, [q, open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(DOCS_SEARCH_EVENT, onOpen);
    return () => window.removeEventListener(DOCS_SEARCH_EVENT, onOpen);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQ("");
      if (href !== pathname) router.push(href);
    },
    [pathname, router],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHi((i) => Math.min(items.length - 1, i + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHi((i) => Math.max(0, i - 1));
      }
      if (e.key === "Enter" && items[hi]) {
        e.preventDefault();
        go(items[hi].href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items, hi, go]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-black/55 p-4 pt-[12vh] backdrop-blur-sm transition-opacity duration-200 ease-in-out dark:bg-black/65"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-2xl transition-all duration-200 ease-in-out dark:border-notifyy-borderDark dark:bg-notifyy-cardDark dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search pages…"
          className="w-full border-0 border-b border-gray-100 bg-transparent px-4 py-3 text-sm text-notifyy-ink outline-none placeholder:text-notifyy-muted dark:border-notifyy-borderDark dark:text-slate-100 dark:placeholder:text-notifyy-mutedDark"
        />
        <ul className="max-h-[min(50vh,360px)] overflow-y-auto py-2">
          {items.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-notifyy-muted dark:text-notifyy-mutedDark">
              No results
            </li>
          ) : (
            items.map((item, i) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => go(item.href)}
                  className={cn(
                    "w-full px-4 py-2.5 text-left text-sm transition-all duration-200 ease-in-out",
                    i === hi
                      ? "bg-primary/10 text-primary dark:bg-sky-500/15 dark:text-sky-300"
                      : "text-notifyy-ink hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-white/[0.06]",
                  )}
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="mt-0.5 block text-xs text-notifyy-muted dark:text-notifyy-mutedDark">
                    {item.href}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-gray-100 px-4 py-2 text-[11px] text-notifyy-muted dark:border-notifyy-borderDark dark:text-notifyy-mutedDark">
          <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> navigate ·{" "}
          <kbd className="font-mono">Enter</kbd> open · <kbd className="font-mono">Esc</kbd> close
        </p>
      </div>
    </div>,
    document.body,
  );
}
