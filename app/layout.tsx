import { Providers } from "@/components/providers";
import { copy } from "@/lib/copy";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: copy.meta.title,
  description: copy.meta.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-notifyy-page font-sans antialiased text-notifyy-ink selection:bg-primary/20 selection:text-notifyy-ink dark:bg-notifyy-pageDark dark:text-slate-200 dark:selection:bg-sky-500/25 dark:selection:text-slate-100`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
