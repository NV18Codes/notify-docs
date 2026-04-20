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
          /** Deep blue-slate canvas (not flat black) */
          pageDark: "#0b1120",
          ink: "#0f172a",
          inkMuted: "#475569",
          muted: "#64748b",
          border: "#e8ecf1",
          /** Soft rail / dividers on dark */
          borderDark: "#2a3548",
          card: "#ffffff",
          /** Elevated panels — sidebar, footer */
          cardDark: "#121a2d",
          /** Slightly lifted surface for chips / nested UI */
          surfaceDark: "#161f35",
          /** Secondary label text on dark */
          mutedDark: "#8b9cb8",
          /** Subtle primary wash */
          tint: "rgba(0, 61, 138, 0.07)",
          tintDark: "rgba(56, 139, 253, 0.12)",
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
