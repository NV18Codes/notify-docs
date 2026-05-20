import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Customer Onboarding",
  description:
    "Meta WhatsApp Business API prerequisites and Notifyy embedded signup—Business Manager, GST, website, WABA, and verification for India.",
  keywords: [
    "WhatsApp onboarding",
    "Meta Business Manager",
    "WhatsApp API integration",
    "Notifyy",
    "WhatsApp Business API India",
  ],
  openGraph: {
    title: "Customer Onboarding | Notifyy Docs",
    description:
      "Prepare Meta prerequisites and complete WhatsApp Business API onboarding through Notifyy.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Onboarding | Notifyy Docs",
    description:
      "Prepare Meta prerequisites and complete WhatsApp Business API onboarding through Notifyy.",
  },
};

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return children;
}
