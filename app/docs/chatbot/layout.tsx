import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Chatbot Configuration and Flow Management",
  description:
    "Learn how to build WhatsApp chatbots in Notifyy: create conversation flows, manage variables, set keyword triggers, and configure fallback messages with agent handoff.",
  keywords: [
    "WhatsApp chatbot",
    "chatbot configuration",
    "flow management",
    "Notifyy WorkFlow Builder",
    "WhatsApp automation",
    "chatbot triggers",
    "fallback message",
  ],
  openGraph: {
    title: "Chatbot Configuration and Flow Management | Notifyy Docs",
    description:
      "Build WhatsApp chatbots without code: flows, variables, keyword triggers, and fallback settings in Notifyy.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatbot Configuration and Flow Management | Notifyy Docs",
    description:
      "Build WhatsApp chatbots without code: flows, variables, keyword triggers, and fallback settings in Notifyy.",
  },
};

export default function ChatbotLayout({ children }: { children: ReactNode }) {
  return children;
}
