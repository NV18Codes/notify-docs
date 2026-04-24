"use client";

import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Heading = { id: string; text: string; level: 2 | 3 };

function collectHeadings(root: HTMLElement | null): Heading[] {
  if (!root) return [];
  const nodes = root.querySelectorAll("h2[id], h3[id]");
  const out: Heading[] = [];
  nodes.forEach((el) => {
    const id = el.id;
    if (!id) return;
    const tag = el.tagName.toLowerCase();
    const level = tag === "h2" ? 2 : 3;
    const text = el.textContent?.trim() ?? "";
    if (!text) return;
    out.push({ id, text, level });
  });
  return out;
}

export function ArticleOutline() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const rescan = useCallback(() => {
    const main = document.getElementById("doc-article-main");
    setHeadings(collectHeadings(main));
  }, []);

  useEffect(() => {
    rescan();
    const main = document.getElementById("doc-article-main");
    if (!main) return;
    const mo = new MutationObserver(() => rescan());
    mo.observe(main, { childList: true, subtree: true });
    const t = window.setTimeout(rescan, 100);
    return () => {
      mo.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname, rescan]);

  useEffect(() => {
    if (headings.length === 0) return;
    const TOP = 112;
    const onScroll = () => {
      let id = headings[0]?.id ?? null;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= TOP) id = h.id;
      }
      if (id) setActiveId(id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden w-[13.5rem] shrink-0 xl:block" aria-label="On this page">
      <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-notifyy-muted dark:text-notifyy-mutedDark">
          {copy.docs.onThisPage}
        </p>
        <ul className="space-y-1 border-l border-gray-200/80 dark:border-notifyy-borderDark">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={cn(
                  "-ml-px block border-l-2 border-transparent py-1 pl-3 text-[13px] leading-snug transition-all duration-200 ease-in-out",
                  h.level === 3 && "pl-5 text-[12.5px]",
                  activeId === h.id
                    ? "border-primary font-medium text-primary dark:border-sky-400 dark:text-sky-300"
                    : "text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200",
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
