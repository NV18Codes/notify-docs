/**
 * Documentation IA: three top-level sections + optional reference pages (search + direct URL).
 * Markdown lives at src/data/docs/{locale}/{slug}.md
 */

export const DEFAULT_DOC_SLUG = 'introduction'

/** Slugs not listed in the sidebar but valid to open (e.g. /docs/pricing). */
export const REFERENCE_SLUGS = ['pricing']

export const navSections = [
  {
    id: 'getting-started',
    titleKey: 'nav.section.gettingStarted',
    items: [
      { slug: 'introduction', titleKey: 'nav.introduction' },
      { slug: 'setup-whatsapp-api', titleKey: 'nav.setupWhatsappApi' },
      { slug: 'send-first-campaign', titleKey: 'nav.sendFirstCampaign' },
    ],
  },
  {
    id: 'core',
    titleKey: 'nav.section.coreFeatures',
    items: [
      { slug: 'features/bulk-campaigns', titleKey: 'nav.campaigns', groupKey: 'nav.group.messaging' },
      { slug: 'features/whatsapp-templates', titleKey: 'nav.templates', groupKey: 'nav.group.messaging' },
      { slug: 'features/chatbot-builder', titleKey: 'nav.chatbots', groupKey: 'nav.group.automation' },
      { slug: 'features/contacts', titleKey: 'nav.contacts', groupKey: 'nav.group.crm' },
      { slug: 'features/lead-tracking', titleKey: 'nav.leadTracking', groupKey: 'nav.group.crm' },
      { slug: 'features/live-chat', titleKey: 'nav.teamInbox', groupKey: 'nav.group.support' },
      { slug: 'features/analytics', titleKey: 'nav.analytics', groupKey: 'nav.group.analytics' },
    ],
  },
  {
    id: 'api',
    titleKey: 'nav.section.apiAdvanced',
    items: [
      { slug: 'api-overview', titleKey: 'nav.apiOverview' },
      { slug: 'webhooks', titleKey: 'nav.webhooks' },
      { slug: 'integrations', titleKey: 'nav.integrations' },
    ],
  },
]

export function flattenNavItems() {
  return navSections.flatMap((s) => s.items)
}

/** Lower number = higher priority in search ordering (after Fuse score tie-break). */
export function slugSearchPriority(slug) {
  if (slug === 'introduction' || slug === 'setup-whatsapp-api' || slug === 'send-first-campaign') return 0
  if (slug.startsWith('features/')) return 1
  if (slug === 'api-overview' || slug === 'webhooks' || slug === 'integrations') return 2
  if (slug === 'pricing') return 3
  return 9
}

export function isNavSlug(slug) {
  if (!slug) return false
  return flattenNavItems().some((i) => i.slug === slug)
}

export function isValidSlug(slug) {
  if (!slug) return false
  return isNavSlug(slug) || REFERENCE_SLUGS.includes(slug)
}

export function getAdjacentPages(currentSlug) {
  const order = flattenNavItems().map((i) => i.slug)
  const idx = order.indexOf(currentSlug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? order[idx - 1] : null,
    next: idx < order.length - 1 ? order[idx + 1] : null,
  }
}
