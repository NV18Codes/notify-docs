import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Fuse from 'fuse.js'
import { flattenNavItems } from '../data/docsManifest'
import { getEntriesForLocale, extractTitle, getFirstParagraph } from '../utils/docsLoader'

export function useDocSearch() {
  const { i18n, t } = useTranslation()
  const locale = i18n.language?.split('-')[0] || 'en'
  const loc = ['en', 'hi', 'kn'].includes(locale) ? locale : 'en'

  const fuse = useMemo(() => {
    let items = getEntriesForLocale(loc).map(({ slug, content }) => {
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
    if (items.length === 0) {
      items = getEntriesForLocale('en').map(({ slug, content }) => {
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
    return new Fuse(items, {
      keys: [
        { name: 'title', weight: 0.45 },
        { name: 'body', weight: 0.35 },
        { name: 'excerpt', weight: 0.2 },
      ],
      threshold: 0.32,
      ignoreLocation: true,
      includeMatches: true,
    })
  }, [loc, t, i18n.language])

  const search = (q) => {
    const query = (q || '').trim()
    if (!query) return []
    return fuse.search(query).slice(0, 12)
  }

  return { search, locale: loc }
}
