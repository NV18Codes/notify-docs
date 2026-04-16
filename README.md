# Notifyy documentation site

Next.js (App Router) documentation for **Notifyy**, with MDX pages, `next-intl` (English + Hindi), and dark/light mode.

The previous **Vite + React** app is preserved under `_legacy_vite/` if you need to reference it.

## Commands

```bash
npm install
npm run dev
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) — the home route redirects to `/docs`. Customer onboarding lives under `/docs/onboarding`.

## Structure

- `app/[locale]/docs/` — documentation routes and onboarding MDX
- `components/` — `Sidebar`, `Navbar`, `TOC`, callouts, MDX helpers
- `messages/` — `next-intl` JSON
- `i18n/` — routing and navigation helpers
