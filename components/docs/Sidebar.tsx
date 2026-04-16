"use client";

import { SIDEBAR_BLOCKS, type SidebarBlock, type SidebarLeafItem, type SidebarMenuEntry, type SidebarSubgroup } from "@/lib/sidebar-nav";
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

function linkClasses(active: boolean, nested?: boolean) {
  return cn(
    "block rounded-md px-3 py-2 text-sm transition-all duration-150",
    nested && "ml-2 border-l-2 border-notifyy-border pl-3 dark:border-notifyy-borderDark",
    active
      ? "bg-primary/10 font-medium text-primary"
      : "text-notifyy-inkMuted hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800/80",
  );
}

function renderLeaf(pathStr: string, item: SidebarLeafItem) {
  const active = isActivePath(pathStr, item.href);
  return (
    <Link
      key={item.href}
      href={item.href}
      className={linkClasses(active, item.nested)}
      aria-current={active ? "page" : undefined}
    >
      {copy.nav[item.labelKey]}
    </Link>
  );
}

function renderSubgroup(pathStr: string, sub: SidebarSubgroup) {
  const hubActive = isActivePath(pathStr, sub.href);
  return (
    <div key={sub.href} className="space-y-1.5">
      <Link
        href={sub.href}
        className={cn(
          "block rounded-md px-3 py-2 text-sm transition-all duration-150",
          hubActive
            ? "bg-primary/10 font-medium text-primary"
            : "font-medium text-notifyy-ink hover:bg-gray-100 dark:text-zinc-200 dark:hover:bg-zinc-800/80",
        )}
        aria-current={hubActive ? "page" : undefined}
      >
        {copy.nav[sub.titleKey]}
      </Link>
      <div className="space-y-1">{sub.items.map((item) => renderLeaf(pathStr, item))}</div>
    </div>
  );
}

function isSubgroup(entry: SidebarMenuEntry): entry is SidebarSubgroup {
  return "type" in entry && entry.type === "subgroup";
}

function renderEntry(pathStr: string, entry: SidebarMenuEntry) {
  if (isSubgroup(entry)) {
    return renderSubgroup(pathStr, entry);
  }
  return renderLeaf(pathStr, entry);
}

function renderBlock(block: SidebarBlock, pathStr: string) {
  return (
    <div key={block.titleKey} className="mb-8">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-notifyy-muted dark:text-zinc-500">
        {copy.sidebar[block.titleKey]}
      </p>
      <div className="space-y-2">{block.items.map((entry) => renderEntry(pathStr, entry))}</div>
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
