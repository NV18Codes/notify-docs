"use client";

import {
  SIDEBAR_BLOCKS,
  type SidebarBlock,
  type SidebarLeafItem,
  type SidebarMenuEntry,
  type SidebarSubgroup,
} from "@/lib/sidebar-nav";
import { normalizePathSegments } from "@/lib/breadcrumbs";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function isActivePath(pathStr: string, href: string) {
  const h = href.replace(/\/$/, "");
  const p = pathStr.replace(/\/$/, "") || "/";
  return p === h;
}

function blockContainsActive(block: SidebarBlock, pathStr: string): boolean {
  return block.items.some((entry) => {
    if ("type" in entry && entry.type === "subgroup") {
      if (isActivePath(pathStr, entry.href)) return true;
      return entry.items.some((item) => isActivePath(pathStr, item.href));
    }
    return isActivePath(pathStr, entry.href);
  });
}

function linkClasses(active: boolean, nested?: boolean) {
  return cn(
    "block rounded-md px-3 py-2 text-sm font-normal transition-all duration-150",
    nested && "ml-2 border-l border-gray-200 pl-3 dark:border-notifyy-borderDark",
    active
      ? "bg-primary/10 font-medium text-primary dark:bg-sky-500/15 dark:font-medium dark:text-sky-300"
      : "text-notifyy-inkMuted hover:bg-gray-100 dark:text-notifyy-mutedDark dark:hover:bg-white/[0.06]",
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
            ? "bg-primary/10 font-medium text-primary dark:bg-sky-500/15 dark:text-sky-300"
            : "font-normal text-notifyy-ink hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-white/[0.06]",
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

function CollapsibleBlock({
  block,
  pathStr,
  expanded,
  onToggle,
}: {
  block: SidebarBlock;
  pathStr: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const sectionActive = blockContainsActive(block, pathStr);

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "mb-1.5 flex w-full items-center gap-2 rounded-md px-1 py-1.5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.04]",
          sectionActive && "text-primary dark:text-sky-400",
        )}
        aria-expanded={expanded}
      >
        <span
          className={cn(
            "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-notifyy-muted transition-transform dark:text-notifyy-mutedDark",
            expanded && "rotate-90",
          )}
          aria-hidden
        >
          ›
        </span>
        <span
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.12em] text-notifyy-muted dark:text-notifyy-mutedDark",
            sectionActive && "text-primary dark:text-sky-400",
          )}
        >
          {copy.sidebar[block.titleKey]}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-1 pb-1">{block.items.map((entry) => renderEntry(pathStr, entry))}</div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = normalizePathSegments(pathname);
  const pathStr = ("/" + segments.join("/")).replace(/\/$/, "") || "/";
  const navRef = useRef<HTMLElement | null>(null);

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const block of SIDEBAR_BLOCKS) {
      init[block.titleKey] = true;
    }
    return init;
  });

  useEffect(() => {
    setExpanded((prev) => {
      const next = { ...prev };
      for (const block of SIDEBAR_BLOCKS) {
        if (blockContainsActive(block, pathStr)) next[block.titleKey] = true;
      }
      return next;
    });
  }, [pathStr]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const t = window.setTimeout(() => {
      const cur = nav.querySelector('[aria-current="page"]');
      cur?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, 100);
    return () => window.clearTimeout(t);
  }, [pathStr]);

  return (
    <aside
      className={cn(
        "w-64 shrink-0 border-r border-gray-200/90 bg-notifyy-card p-4 dark:border-notifyy-borderDark dark:bg-notifyy-cardDark lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto",
        className,
      )}
    >
      <h2 className="mb-6 text-lg font-medium tracking-tight text-notifyy-ink dark:text-slate-100">
        Notifyy <span className="font-normal text-primary dark:text-sky-400">Docs</span>
      </h2>
      <nav ref={navRef} aria-label="Documentation">
        {SIDEBAR_BLOCKS.map((block) => (
          <CollapsibleBlock
            key={block.titleKey}
            block={block}
            pathStr={pathStr}
            expanded={expanded[block.titleKey] !== false}
            onToggle={() =>
              setExpanded((prev) => ({
                ...prev,
                [block.titleKey]: !prev[block.titleKey],
              }))
            }
          />
        ))}
      </nav>
    </aside>
  );
}
