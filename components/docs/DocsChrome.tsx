"use client";

import { Navbar } from "@/components/Navbar";
import { ArticleOutline } from "@/components/docs/ArticleOutline";
import { DocsSearchTrigger } from "@/components/docs/DocsCommandPalette";
import { DocPager } from "@/components/docs/DocPager";
import { DocsCommandPalette } from "@/components/docs/DocsCommandPalette";
import { DocsSiteFooter } from "@/components/docs/DocsSiteFooter";
import { ScrollProgressBar } from "@/components/docs/ScrollProgressBar";
import { ThemeToggle } from "@/components/docs/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Sidebar } from "./Sidebar";

export function DocsChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDocsHome = pathname === "/docs";
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!mobileSidebarOpen) return;
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileSidebarOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [mobileSidebarOpen]);

  return (
    <>
      <ScrollProgressBar />
      <DocsCommandPalette />
      <div className="flex min-h-screen flex-col bg-white lg:flex-row dark:bg-notifyy-pageDark">
        {mobileSidebarOpen ? (
          <div
            className="fixed inset-0 z-[120] bg-black/45 backdrop-blur-[1px] lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden
          />
        ) : null}
        <Sidebar className="hidden lg:block" />
        <div
          className="fixed inset-y-0 left-0 z-[130] w-[86vw] max-w-[320px] transition-transform duration-200 ease-in-out lg:hidden"
          style={{ transform: mobileSidebarOpen ? "translateX(0)" : "translateX(-100%)" }}
          aria-hidden={!mobileSidebarOpen}
        >
          <Sidebar className="h-full w-full border-r border-gray-200/80 dark:border-notifyy-borderDark" onNavigate={() => setMobileSidebarOpen(false)} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="docs-shell-header sticky top-0 z-40 shadow-sm dark:shadow-[0_1px_0_0_rgba(42,53,72,0.5)]">
            <div className="mx-auto flex items-center justify-between border-b border-gray-200/70 px-4 py-2.5 dark:border-notifyy-borderDark/80 lg:hidden">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen((v) => !v)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200/90 bg-white/85 text-notifyy-ink shadow-sm transition-colors hover:bg-white dark:border-notifyy-borderDark dark:bg-notifyy-surfaceDark dark:text-slate-100 dark:hover:bg-notifyy-cardDark"
                  aria-label="Toggle sidebar menu"
                  aria-expanded={mobileSidebarOpen}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </button>
                <Link href="/docs" className="inline-flex items-center gap-2">
                  <Image src="/notifyyLogo.png" alt="Notifyy logo" width={24} height={24} className="h-6 w-6 rounded-sm object-contain" />
                  <span className="text-base font-semibold tracking-tight text-notifyy-ink dark:text-slate-100">Notifyy Docs</span>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <DocsSearchTrigger />
                <a
                  href="https://www.notifyy.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary transition-all duration-200 ease-in-out hover:bg-primary/15 dark:border-sky-400/25 dark:bg-sky-400/10 dark:text-sky-300 dark:hover:bg-sky-400/20"
                >
                  Visit
                </a>
                <ThemeToggle />
              </div>
            </div>
            <Navbar className="hidden lg:flex" />
            <div className="mx-auto max-w-6xl px-4 py-2.5 dark:border-notifyy-borderDark lg:max-w-none lg:px-6">
              {isDocsHome ? (
                <h1 className="mb-2 text-3xl font-semibold tracking-tight text-notifyy-ink dark:text-slate-100">
                  Notifyy documentation
                </h1>
              ) : null}
              <Breadcrumbs />
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-6xl flex-1 justify-center gap-10 bg-white px-4 py-10 lg:max-w-none lg:px-8 dark:bg-notifyy-pageDark">
            <main
              id="doc-article-main"
              className="doc-content doc-prose-themed prose prose-slate mx-auto min-w-0 w-full max-w-3xl flex-1 space-y-10 text-[16px] leading-relaxed text-gray-700 prose-headings:scroll-mt-28 prose-p:leading-relaxed prose-p:text-gray-700 prose-li:leading-relaxed prose-hr:my-10 prose-hr:border-0 prose-hr:border-t prose-hr:border-gray-200/80 dark:text-slate-200 dark:prose-p:text-slate-300 dark:prose-hr:border-slate-700/80 prose-a:font-medium prose-a:text-primary prose-a:no-underline prose-a:transition-all prose-a:duration-200 prose-a:ease-in-out prose-a:hover:underline dark:prose-a:text-sky-400 dark:hover:prose-a:text-sky-300"
            >
              {children}
              <DocPager />
            </main>
            <ArticleOutline />
          </div>

          <DocsSiteFooter />
        </div>
      </div>
    </>
  );
}
