import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Fuse from 'fuse.js'
import { flattenNavItems, REFERENCE_SLUGS, slugSearchPriority } from '../data/docsManifest'
import { getEntriesForLocale, extractTitle, getFirstParagraph } from '../utils/docsLoader'

const MAX_RESULTS = 5

export function useDocSearch() {
  const { i18n, t } = useTranslation()
  const locale = i18n.language?.split('-')[0] || 'en'
  const loc = ['en', 'hi', 'kn'].includes(locale) ? locale : 'en'

  const fuse = useMemo(() => {
    const allowed = new Set([...flattenNavItems().map((i) => i.slug), ...REFERENCE_SLUGS])

    function buildItems(forLocale) {
      return getEntriesForLocale(forLocale)
        .filter(({ slug }) => allowed.has(slug))
        .map(({ slug, content }) => {
          const nav = flattenNavItems().find((n) => n.slug === slug)
          const titleFromMd = extractTitle(content)
          const title = nav ? t(nav.titleKey) : titleFromMd || slug
          return {
            slug,
            title,
            body: content,
            excerpt: getFirstParagraph(content),
          }
        })
    }

    let items = buildItems(loc)
    if (items.length === 0) items = buildItems('en')

    return new Fuse(items, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'excerpt', weight: 0.28 },
        { name: 'body', weight: 0.22 },
      ],
      threshold: 0.28,
      ignoreLocation: true,
      includeMatches: true,
      minMatchCharLength: 2,
    })
  }, [loc, t, i18n.language])

  const search = (q) => {
    const query = (q || '').trim()
    if (!query) return []
    const raw = fuse.search(query)
    const sorted = [...raw].sort((a, b) => {
      const pa = slugSearchPriority(a.item.slug)
      const pb = slugSearchPriority(b.item.slug)
      if (pa !== pb) return pa - pb
      return (a.score ?? 0) - (b.score ?? 0)
    })
    return sorted.slice(0, MAX_RESULTS)
  }

  return { search, locale: loc }
}
