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
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
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
    "block rounded-md px-3 py-2 text-sm font-normal transition-all duration-200 ease-in-out",
    nested && "ml-2 border-l border-gray-200/80 pl-3 dark:border-notifyy-borderDark",
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
          "block rounded-md px-3 py-2 text-sm transition-all duration-200 ease-in-out",
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

function SectionIcon({
  titleKey,
  className,
}: {
  titleKey: SidebarBlock["titleKey"];
  className?: string;
}) {
  const iconByKey: Record<SidebarBlock["titleKey"], ReactNode> = {
    gettingStarted: (
      <path
        d="M3 20L12 4l9 16M7.5 12h9M9 15h6"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    messaging: (
      <path
        d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H10l-4.5 5v-5H7.5A2.5 2.5 0 0 1 5 12.5v-6ZM8.5 8.5h7M8.5 11h4.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    automation: (
      <path
        d="M5 13h4l2-6 2 10 2-4h4M7 5h10M7 19h10"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    crm: (
      <path
        d="M4.5 8.5A3.5 3.5 0 0 1 8 5h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H8A3.5 3.5 0 0 1 4.5 13.5v-5ZM8 9.5h8M8 13h5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    support: (
      <path
        d="M12 20v-3.5M7.8 17.8A8 8 0 1 1 20 11.2c0 2.2-.9 4.2-2.4 5.6l-2.2-2.2A5 5 0 1 0 7 11.2c0 1.4.6 2.8 1.6 3.7l-.8 2.9Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={cn("h-4 w-4", className)}
      aria-hidden
    >
      {iconByKey[titleKey]}
    </svg>
  );
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
    <div className="mb-7 rounded-xl border border-gray-200/80 bg-white/90 p-2 shadow-sm transition-all duration-200 ease-in-out dark:border-notifyy-borderDark dark:bg-notifyy-cardDark/70">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "mb-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-all duration-200 ease-in-out hover:bg-gray-50 dark:hover:bg-white/[0.04]",
          sectionActive && "text-primary dark:text-sky-400",
        )}
        aria-expanded={expanded}
      >
        <span
          className={cn(
            "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-200/90 bg-white text-notifyy-muted shadow-sm transition-colors dark:border-notifyy-borderDark dark:bg-notifyy-surfaceDark dark:text-notifyy-mutedDark",
            sectionActive &&
              "border-primary/20 text-primary dark:border-sky-400/30 dark:text-sky-300",
          )}
        >
          <SectionIcon titleKey={block.titleKey} />
        </span>
        <span
          className={cn(
            "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-notifyy-muted transition-transform duration-200 ease-in-out dark:text-notifyy-mutedDark",
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
          <div className="space-y-2 pb-1">{block.items.map((entry) => renderEntry(pathStr, entry))}</div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
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
        "w-72 shrink-0 border-r border-gray-200/80 bg-white p-5 dark:border-notifyy-borderDark dark:bg-notifyy-cardDark lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto",
        className,
      )}
    >
      <Link
        href="/docs"
        onClick={onNavigate}
        className="mb-5 inline-flex items-center gap-2 rounded-lg px-1 py-1 transition-all duration-200 ease-in-out hover:bg-primary/[0.04] dark:hover:bg-sky-400/[0.08]"
      >
        <Image
          src="/notifyyLogo.png"
          alt="Notifyy logo"
          width={26}
          height={26}
          className="h-6.5 w-6.5 rounded-sm object-contain"
          priority
        />
        <span className="inline-flex items-center gap-1.5">
          <span className="text-[1.35rem] font-bold leading-none tracking-tight text-notifyy-ink dark:text-slate-100">
            Notifyy
          </span>
          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary dark:bg-sky-400/15 dark:text-sky-300">
            Docs
          </span>
        </span>
      </Link>
      <nav
        ref={navRef}
        aria-label="Documentation"
        onClickCapture={(event) => {
          const target = event.target as HTMLElement | null;
          if (target?.closest("a")) onNavigate?.();
        }}
      >
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
