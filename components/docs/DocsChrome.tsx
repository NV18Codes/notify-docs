"use client";

import { Navbar } from "@/components/Navbar";
import { DocsSiteFooter } from "@/components/docs/DocsSiteFooter";
import { normalizePathSegments } from "@/lib/breadcrumbs";
import { copy } from "@/lib/copy";
import { SIDEBAR_MOBILE_HREFS } from "@/lib/sidebar-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Sidebar } from "./Sidebar";
import { TOC } from "./TOC";

function getOnboardingArticleSlug(pathname: string) {
  const segs = normalizePathSegments(pathname);
  if (segs[0] !== "docs" || segs.length < 2) return null;
  const leaf = segs[1];
  if (leaf === "connect-whatsapp" || leaf === "verify-business" || leaf === "first-campaign") {
    return leaf;
  }
  return null;
}

export function DocsChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const articleSlug = getOnboardingArticleSlug(pathname);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar className="hidden lg:block" />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="docs-shell-header sticky top-0 z-40 shadow-sm dark:shadow-none">
          <Navbar />
          <div className="mx-auto max-w-6xl border-t border-gray-200/70 px-4 py-2 dark:border-zinc-800/80 lg:max-w-none lg:px-6">
            <Breadcrumbs />
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-gray-200/70 px-4 py-2 dark:border-zinc-800/80 lg:hidden">
            {SIDEBAR_MOBILE_HREFS.map(({ labelKey, href }) => (
              <Link
                key={href}
                href={href}
                className="shrink-0 rounded-full border border-gray-200 bg-notifyy-tint px-3 py-1 text-xs font-normal text-primary dark:border-zinc-700 dark:bg-notifyy-tintDark"
              >
                {copy.nav[labelKey]}
              </Link>
            ))}
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-6xl flex-1 justify-center gap-10 px-4 py-8 lg:max-w-none lg:px-8">
          <main className="doc-content prose prose-slate mx-auto min-w-0 w-full max-w-3xl flex-1 space-y-8 text-[16px] leading-relaxed dark:prose-invert prose-headings:scroll-mt-28 prose-p:leading-relaxed prose-li:leading-relaxed prose-hr:my-8 prose-hr:border-0 prose-hr:border-t prose-hr:border-gray-200 dark:prose-hr:border-zinc-700 prose-a:font-medium prose-a:text-primary prose-a:no-underline prose-a:hover:underline">
            {children}
          </main>
          {articleSlug ? (
            <aside className="hidden w-44 shrink-0 xl:block">
              <div className="sticky top-32">
                <TOC slug={articleSlug} />
              </div>
            </aside>
          ) : null}
        </div>

        <DocsSiteFooter />
      </div>
    </div>
  );
}
