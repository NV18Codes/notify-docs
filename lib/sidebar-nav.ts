/** Sidebar: grouped nav + flat `/docs/*` hrefs (`labelKey` → `nav.*`). */

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

export type SidebarLeafItem = {
  href: string;
  labelKey: NavDocLabelKey;
  nested?: boolean;
};

/** Nested block under “Customer Onboarding”. */
export type SidebarSubgroup = {
  type: "subgroup";
  titleKey: "onboarding" | "whatsappTemplates";
  href: string;
  items: SidebarLeafItem[];
};

export type SidebarMenuEntry = SidebarLeafItem | SidebarSubgroup;

export type SidebarBlock = {
  type: "group";
  titleKey: "gettingStarted" | "messaging" | "automation" | "crm" | "support";
  items: SidebarMenuEntry[];
};

export const SIDEBAR_BLOCKS: SidebarBlock[] = [
  {
    type: "group",
    titleKey: "gettingStarted",
    items: [
      {
        type: "subgroup",
        titleKey: "onboarding",
        href: "/docs/onboarding",
        items: [
          { href: "/docs/connect-whatsapp", labelKey: "connectWhatsapp", nested: true },
          { href: "/docs/verify-business", labelKey: "verifyBusiness", nested: true },
          { href: "/docs/first-campaign", labelKey: "firstCampaign", nested: true },
        ],
      },
      { href: "/docs/user-invite", labelKey: "userInvite" },
    ],
  },
  {
    type: "group",
    titleKey: "messaging",
    items: [
      { href: "/docs/campaigns", labelKey: "campaigns" },
      {
        type: "subgroup",
        titleKey: "whatsappTemplates",
        href: "/docs/templates",
        items: [{ href: "/docs/carousel", labelKey: "carouselTemplates", nested: true }],
      },
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

/** Mobile chip strip */
export const SIDEBAR_MOBILE_HREFS: { labelKey: NavDocLabelKey; href: string }[] = [
  { labelKey: "onboarding", href: "/docs/onboarding" },
  { labelKey: "connectWhatsapp", href: "/docs/connect-whatsapp" },
  { labelKey: "campaigns", href: "/docs/campaigns" },
  { labelKey: "whatsappTemplates", href: "/docs/templates" },
  { labelKey: "chatbots", href: "/docs/chatbot" },
  { labelKey: "contactManagement", href: "/docs/contacts" },
];
