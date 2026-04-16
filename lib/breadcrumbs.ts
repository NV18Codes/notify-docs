export type NavKey =
  | "home"
  | "docs"
  | "onboarding"
  | "connectWhatsapp"
  | "verifyBusiness"
  | "firstCampaign"
  | "userInvite"
  | "campaigns"
  | "chatbots"
  | "whatsappTemplates"
  | "carouselTemplates"
  | "whatsappCatalog"
  | "contactManagement"
  | "importObject"
  | "segments"
  | "propertyManagement"
  | "teamInbox"
  | "contacts"
  | "crm"
  | "templates";

/** Map pathname segments to `nav` keys. */
export function segmentToNavKey(segment: string): NavKey | null {
  const map: Record<string, NavKey> = {
    docs: "docs",
    onboarding: "onboarding",
    "connect-whatsapp": "connectWhatsapp",
    "verify-business": "verifyBusiness",
    "first-campaign": "firstCampaign",
    "user-invite": "userInvite",
    campaigns: "campaigns",
    chatbot: "chatbots",
    chatbots: "chatbots",
    templates: "whatsappTemplates",
    carousel: "carouselTemplates",
    catalog: "whatsappCatalog",
    contacts: "contactManagement",
    import: "importObject",
    segments: "segments",
    property: "propertyManagement",
    "team-inbox": "teamInbox",
    crm: "crm",
  };
  return map[segment] ?? null;
}

export function normalizePathSegments(pathname: string): string[] {
  return pathname.replace(/^\//, "").split("/").filter(Boolean);
}
