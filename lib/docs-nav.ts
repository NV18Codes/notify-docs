/** Single source for onboarding sub-flow order, next/prev, TOC, and legacy path aliases. */

export type DocSlug =
  | "onboarding"
  | "connect-whatsapp"
  | "verify-business"
  | "first-campaign";

export const onboardingOrder: DocSlug[] = [
  "onboarding",
  "connect-whatsapp",
  "verify-business",
  "first-campaign",
];

/** Flat `/docs/*` URLs (matches sidebar). */
export const docPaths: Record<DocSlug, string> = {
  onboarding: "/docs/onboarding",
  "connect-whatsapp": "/docs/connect-whatsapp",
  "verify-business": "/docs/verify-business",
  "first-campaign": "/docs/first-campaign",
};

export const futureSectionPaths = {
  campaigns: "/docs/campaigns",
  chatbot: "/docs/chatbot",
  chatbots: "/docs/chatbots",
  contacts: "/docs/contacts",
  crm: "/docs/crm",
  templates: "/docs/templates",
} as const;

/** Maps doc slug → `nav.*` message key */
export const docSlugToNavKey: Record<
  DocSlug,
  "onboarding" | "connectWhatsapp" | "verifyBusiness" | "firstCampaign"
> = {
  onboarding: "onboarding",
  "connect-whatsapp": "connectWhatsapp",
  "verify-business": "verifyBusiness",
  "first-campaign": "firstCampaign",
};

/** Right-rail TOC anchors — match ## headings in MDX. */
export const onboardingToc: Record<Exclude<DocSlug, "onboarding">, { id: string; labelKey: string }[]> = {
  "connect-whatsapp": [
    { id: "when-to-use", labelKey: "whenToUse" },
    { id: "steps", labelKey: "steps" },
    { id: "notes", labelKey: "notes" },
    { id: "example", labelKey: "example" },
    { id: "next-step", labelKey: "nextStep" },
  ],
  "verify-business": [
    { id: "when-to-use", labelKey: "whenToUse" },
    { id: "steps", labelKey: "steps" },
    { id: "notes", labelKey: "notes" },
    { id: "example", labelKey: "example" },
    { id: "next-step", labelKey: "nextStep" },
  ],
  "first-campaign": [
    { id: "when-to-use", labelKey: "whenToUse" },
    { id: "steps", labelKey: "steps" },
    { id: "notes", labelKey: "notes" },
    { id: "example", labelKey: "example" },
    { id: "next-step", labelKey: "nextStep" },
  ],
};
