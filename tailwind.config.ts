import type { Config } from "tailwindcss";

/**
 * Notifyy docs — Gallabox-style clarity: primary blue + neutral slate.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        /** Main brand / links / accents */
        primary: "#003D8A",
        /** Darker blue for pressed states (pairs with `hover:bg-blue-800` on buttons) */
        primaryDark: "#002d68",
        /** Semantic tokens — minimal neutrals */
        notifyy: {
          page: "#f6f8fb",
          pageDark: "#09090b",
          ink: "#0f172a",
          inkMuted: "#475569",
          muted: "#64748b",
          border: "#e8ecf1",
          borderDark: "#27272a",
          card: "#ffffff",
          cardDark: "#18181b",
          /** Subtle primary wash */
          tint: "rgba(0, 61, 138, 0.07)",
          tintDark: "rgba(0, 61, 138, 0.14)",
        },
      },
      maxWidth: {
        doc: "900px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        notifyy: "0 1px 2px rgba(15, 23, 42, 0.06)",
        "notifyy-md": "0 4px 24px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
