"use client";

import { SIDEBAR_BLOCKS, type SidebarBlock } from "@/lib/sidebar-nav";
import { normalizePathSegments } from "@/lib/breadcrumbs";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function isActivePath(pathStr: string, href: string) {
  const h = href.replace(/\/$/, "");
  const p = pathStr.replace(/\/$/, "") || "/";
  return p === h;
}

function renderBlock(block: SidebarBlock, pathStr: string) {
  if (block.type === "divider") {
    return (
      <div key={block.titleKey} className="mb-2 mt-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-notifyy-muted dark:text-zinc-500">
          {copy.sidebar[block.titleKey as keyof typeof copy.sidebar]}
        </p>
      </div>
    );
  }

  return (
    <div key={block.titleKey} className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-notifyy-muted dark:text-zinc-500">
        {copy.sidebar[block.titleKey as keyof typeof copy.sidebar]}
      </p>
      <div className="space-y-1">
        {block.items.map((item) => {
          const active = isActivePath(pathStr, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm transition-colors",
                item.nested && "ml-2 border-l-2 border-notifyy-border pl-3 dark:border-notifyy-borderDark",
                active
                  ? "bg-primary/10 font-medium text-primary dark:bg-primary/15"
                  : "text-notifyy-inkMuted hover:bg-notifyy-tint dark:text-zinc-300 dark:hover:bg-zinc-800/80",
              )}
              aria-current={active ? "page" : undefined}
            >
              {copy.nav[item.labelKey]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = normalizePathSegments(pathname);
  const pathStr = ("/" + segments.join("/")).replace(/\/$/, "") || "/";

  return (
    <aside
      className={cn(
        "w-64 shrink-0 border-r border-notifyy-border bg-notifyy-card p-5 shadow-notifyy dark:border-notifyy-borderDark dark:bg-notifyy-cardDark/95 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto",
        className,
      )}
    >
      <h2 className="mb-6 text-lg font-semibold tracking-tight text-notifyy-ink dark:text-zinc-50">
        Notifyy <span className="font-normal text-primary">Docs</span>
      </h2>
      <nav aria-label="Documentation">
        {SIDEBAR_BLOCKS.map((block) => renderBlock(block, pathStr))}
      </nav>
    </aside>
  );
}
