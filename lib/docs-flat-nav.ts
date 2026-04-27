import { SIDEBAR_BLOCKS, type SidebarMenuEntry, type SidebarSubgroup } from "@/lib/sidebar-nav";

function isSubgroup(entry: SidebarMenuEntry): entry is SidebarSubgroup {
  return "type" in entry && entry.type === "subgroup";
}

/** Flat docs order (sidebar order) for prev/next and search. */
export const DOCS_NAV_ITEMS: { href: string; labelKey: string }[] = (() => {
  const items: { href: string; labelKey: string }[] = [{ href: "/docs", labelKey: "__home__" }];
  for (const block of SIDEBAR_BLOCKS) {
    for (const entry of block.items) {
      if (isSubgroup(entry)) {
        items.push({ href: entry.href, labelKey: entry.titleKey });
        for (const leaf of entry.items) {
          items.push({ href: leaf.href, labelKey: leaf.labelKey });
        }
      } else {
        items.push({ href: entry.href, labelKey: entry.labelKey });
      }
    }
  }
  return items;
})();

export const DOCS_NAV_HREFS = DOCS_NAV_ITEMS.map((i) => i.href);

/** Pages that already include `<DocFooter />` in MDX — avoid duplicate prev/next. */
export const DOCS_PATHS_WITH_MDX_FOOTER = new Set([
  "/docs/onboarding",
  "/docs/connect-whatsapp",
  "/docs/verify-business",
  "/docs/first-campaign",
]);
