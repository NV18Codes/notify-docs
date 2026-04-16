/** Premium sidebar: grouped nav + flat `/docs/*` hrefs (`labelKey` → `nav.*`). */

export type NavDocLabelKey =
  | "onboarding"
  | "connectWhatsapp"
  | "verifyBusiness"
  | "firstCampaign"
  | "userInvite"
  | "campaigns"
  | "whatsappTemplates"
  | "carouselTemplates"
  | "whatsappCatalog"
  | "chatbots"
  | "contactManagement"
  | "importObject"
  | "segments"
  | "propertyManagement"
  | "teamInbox";

export type SidebarItem = {
  href: string;
  labelKey: NavDocLabelKey;
  /** Indented under “Customer onboarding” */
  nested?: boolean;
};

export type SidebarBlock =
  | { type: "group"; titleKey: string; items: SidebarItem[] }
  | { type: "divider"; titleKey: string };

export const SIDEBAR_BLOCKS: SidebarBlock[] = [
  {
    type: "group",
    titleKey: "gettingStarted",
    items: [
      { href: "/docs/onboarding", labelKey: "onboarding" },
      { href: "/docs/connect-whatsapp", labelKey: "connectWhatsapp", nested: true },
      { href: "/docs/verify-business", labelKey: "verifyBusiness", nested: true },
      { href: "/docs/first-campaign", labelKey: "firstCampaign", nested: true },
      { href: "/docs/user-invite", labelKey: "userInvite" },
    ],
  },
  { type: "divider", titleKey: "coreFeatures" },
  {
    type: "group",
    titleKey: "messaging",
    items: [
      { href: "/docs/campaigns", labelKey: "campaigns" },
      { href: "/docs/templates", labelKey: "whatsappTemplates" },
      { href: "/docs/carousel", labelKey: "carouselTemplates" },
      { href: "/docs/catalog", labelKey: "whatsappCatalog" },
    ],
  },
  {
    type: "group",
    titleKey: "automation",
    items: [{ href: "/docs/chatbot", labelKey: "chatbots" }],
  },
  {
    type: "group",
    titleKey: "crm",
    items: [
      { href: "/docs/contacts", labelKey: "contactManagement" },
      { href: "/docs/import", labelKey: "importObject" },
      { href: "/docs/segments", labelKey: "segments" },
      { href: "/docs/property", labelKey: "propertyManagement" },
    ],
  },
  {
    type: "group",
    titleKey: "support",
    items: [{ href: "/docs/team-inbox", labelKey: "teamInbox" }],
  },
];

/** Mobile chip strip — first items for small screens */
export const SIDEBAR_MOBILE_HREFS: { labelKey: NavDocLabelKey; href: string }[] = [
  { labelKey: "onboarding", href: "/docs/onboarding" },
  { labelKey: "connectWhatsapp", href: "/docs/connect-whatsapp" },
  { labelKey: "campaigns", href: "/docs/campaigns" },
  { labelKey: "whatsappTemplates", href: "/docs/templates" },
  { labelKey: "chatbots", href: "/docs/chatbot" },
  { labelKey: "contactManagement", href: "/docs/contacts" },
];
