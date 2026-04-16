import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Customer Onboarding",
  description:
    "Learn how to set up Notifyy, connect WhatsApp API, and send your first campaign. WhatsApp onboarding, API integration, and campaign setup.",
  keywords: [
    "WhatsApp onboarding",
    "WhatsApp campaign setup",
    "WhatsApp API integration",
    "Notifyy",
    "WhatsApp Business API",
  ],
  openGraph: {
    title: "Customer Onboarding | Notifyy Docs",
    description:
      "Learn how to set up Notifyy, connect WhatsApp API, and send your first campaign.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Onboarding | Notifyy Docs",
    description:
      "Learn how to set up Notifyy, connect WhatsApp API, and send your first campaign.",
  },
};

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return children;
}
