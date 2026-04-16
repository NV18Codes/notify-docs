import { DocsChrome } from "@/components/docs/DocsChrome";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Notifyy Docs",
    default: "Notifyy Docs",
  },
  description:
    "WhatsApp CRM and automation documentation — onboarding, campaigns, templates, chatbots, and more.",
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsChrome>{children}</DocsChrome>;
}
