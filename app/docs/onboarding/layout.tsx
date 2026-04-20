import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Customer Onboarding",
  description:
    "Set up Notifyy: connect WhatsApp Business, verify your account, create templates, import contacts, send campaigns, and monitor performance.",
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
      "Set up Notifyy: connect WhatsApp Business, verify your account, create templates, import contacts, send campaigns, and monitor performance.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Onboarding | Notifyy Docs",
    description:
      "Set up Notifyy: connect WhatsApp Business, verify your account, create templates, import contacts, send campaigns, and monitor performance.",
  },
};

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return children;
}
