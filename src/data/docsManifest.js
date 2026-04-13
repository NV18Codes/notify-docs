/**
 * Sidebar navigation + slugs for markdown under src/data/docs/{locale}/{slug}.md
 */
export const DEFAULT_DOC_SLUG = 'getting-started'

export const navSections = [
  {
    id: 'intro',
    titleKey: 'nav.section.intro',
    items: [
      { slug: 'what-is-notifyy', titleKey: 'nav.whatIs' },
      { slug: 'getting-started', titleKey: 'nav.gettingStarted' },
    ],
  },
  {
    id: 'features',
    titleKey: 'nav.section.features',
    items: [
      { slug: 'features/whatsapp-business-api', titleKey: 'nav.whatsappApi' },
      { slug: 'features/bulk-campaigns', titleKey: 'nav.bulkCampaigns' },
      { slug: 'features/chatbot-builder', titleKey: 'nav.chatbotBuilder' },
      { slug: 'features/live-chat', titleKey: 'nav.liveChat' },
      { slug: 'features/contacts', titleKey: 'nav.contacts' },
      { slug: 'features/lead-tracking', titleKey: 'nav.leadTracking' },
      { slug: 'features/analytics', titleKey: 'nav.analytics' },
      { slug: 'features/whatsapp-templates', titleKey: 'nav.templates' },
      { slug: 'features/qr-interactive', titleKey: 'nav.qrInteractive' },
    ],
  },
  {
    id: 'guides',
    titleKey: 'nav.section.guides',
    items: [
      { slug: 'guides/api-integration', titleKey: 'nav.apiIntegration' },
      { slug: 'guides/whatsapp-campaigns', titleKey: 'nav.whatsappCampaignGuide' },
      { slug: 'guides/chatbot-setup', titleKey: 'nav.chatbotSetup' },
    ],
  },
  {
    id: 'resources',
    titleKey: 'nav.section.resources',
    items: [
      { slug: 'pricing', titleKey: 'nav.pricing' },
      { slug: 'faq', titleKey: 'nav.faq' },
    ],
  },
]

export function flattenNavItems() {
  return navSections.flatMap((s) => s.items)
}

export function isValidSlug(slug) {
  if (!slug) return false
  return flattenNavItems().some((i) => i.slug === slug)
}
