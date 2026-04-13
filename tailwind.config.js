/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /** WhatsApp CTA green — primary actions */
        primary: {
          DEFAULT: '#25D366',
          foreground: '#042014',
          muted: '#1a5c32',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0b0f14',
          muted: '#f4f7f6',
          'muted-dark': '#111827',
        },
        ink: {
          DEFAULT: '#0f172a',
          muted: '#475569',
          dark: '#e2e8f0',
        },
        /** Deep navy + teal — matches notifyy.io marketing */
        notifyy: {
          navy: '#0b1120',
          'navy-soft': '#121a2b',
          teal: '#14b8a6',
          'teal-dark': '#0d9488',
          'teal-muted': '#5eead4',
        },
        accent: {
          DEFAULT: '#0f766e',
          light: '#14b8a6',
        },
        /** Optional highlight (CTAs on light cards) */
        gold: {
          DEFAULT: '#FFC107',
          bright: '#FFD54F',
          dark: '#E6AC00',
          foreground: '#1c1500',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.06)',
        'soft-dark': '0 1px 2px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.35)',
        glow: '0 8px 30px rgba(20, 184, 166, 0.18)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
