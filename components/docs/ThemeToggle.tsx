"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span className="h-9 w-9 rounded-md border border-zinc-200 bg-zinc-100 dark:border-notifyy-borderDark dark:bg-notifyy-surfaceDark" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary/20 bg-primary text-white shadow-sm transition-all duration-200 ease-in-out hover:scale-[1.03] hover:bg-blue-800 dark:border-sky-400/30 dark:bg-sky-600 dark:text-white dark:hover:bg-sky-500"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M12 19.5V21M5.64 5.64l1.06 1.06M17.3 17.3l1.06 1.06M3 12h1.5M19.5 12H21M5.64 18.36l1.06-1.06M17.3 6.7l1.06-1.06M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 13a8.5 8.5 0 1 1-10-10 7 7 0 1 0 10 10Z"
          />
        </svg>
      )}
    </button>
  );
}
