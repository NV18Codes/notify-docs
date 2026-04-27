"use client";

import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setP(height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[3px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left rounded-r-full bg-primary/90 shadow-[0_0_12px_rgba(0,61,138,0.35)] transition-[width] duration-150 ease-out dark:bg-sky-500/90 dark:shadow-[0_0_12px_rgba(56,189,248,0.25)]"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
