import type { Config } from "tailwindcss";

/**
 * Notifyy brand — aligned with https://www.notifyy.io/
 * Primary: WhatsApp / product green. Neutrals: slate marketing UI.
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
        /** Main CTA / links / accents */
        primary: "#25D366",
        /** Hover / pressed — WhatsApp teal, pairs with primary on marketing */
        primaryDark: "#128C7E",
        /** Semantic tokens (notifyy.io–style slate UI) */
        notifyy: {
          page: "#f4f7fa",
          pageDark: "#09090b",
          ink: "#0f172a",
          inkMuted: "#475569",
          muted: "#64748b",
          border: "#e2e8f0",
          borderDark: "#27272a",
          card: "#ffffff",
          cardDark: "#18181b",
          /** Subtle green wash for CTAs / highlights */
          tint: "rgba(37, 211, 102, 0.08)",
          tintDark: "rgba(37, 211, 102, 0.12)",
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
