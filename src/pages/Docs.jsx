import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { useTranslation } from 'react-i18next'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ScrollProgress } from '../components/ScrollProgress'
import { DEFAULT_DOC_SLUG, flattenNavItems, isValidSlug } from '../data/docsManifest'
import { getMarkdownRaw, extractTitle, getFirstParagraph } from '../utils/docsLoader'

export default function Docs() {
  const location = useLocation()
  const { i18n, t } = useTranslation()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const docPath = useMemo(() => {
    const raw = location.pathname.replace(/^\/docs\/?/, '')
    return raw || DEFAULT_DOC_SLUG
  }, [location.pathname])

  const locale = i18n.language?.split('-')[0] || 'en'
  const { content, usedFallback } = getMarkdownRaw(locale, docPath)
  const valid = isValidSlug(docPath)

  const title = useMemo(() => {
    if (!content) return t('nav.docs')
    const nav = flattenNavItems().find((i) => i.slug === docPath)
    if (nav) return t(nav.titleKey)
    return extractTitle(content)
  }, [content, docPath, t])

  const description = useMemo(() => (content ? getFirstParagraph(content) : t('seo.homeDesc')), [content, t])

  const breadcrumbs = useMemo(() => {
    const items = [{ label: t('docs.breadcrumb'), href: '/docs/getting-started' }]
    const segments = docPath.split('/').filter(Boolean)
    if (segments.length >= 2) {
      const parent = segments[0]
      if (parent === 'features') items.push({ label: t('nav.section.features') })
      else if (parent === 'guides') items.push({ label: t('nav.section.guides') })
    }
    items.push({ label: title })
    return items
  }, [docPath, title, t])

  const editHref = useMemo(() => {
    const subject = encodeURIComponent(`Docs feedback: ${title}`)
    const body = encodeURIComponent(`Page: /docs/${docPath}\n\nDescribe your suggested change:\n`)
    return `mailto:support@notifyy.com?subject=${subject}&body=${body}`
  }, [docPath, title])

  return (
    <div className="min-h-screen bg-surface-muted dark:bg-surface-dark">
      <Seo
        title={t('seo.docsTitle', { title })}
        description={t('seo.docsDesc', { description })}
      />
      <ScrollProgress />
      <Navbar docsSidebarCollapsed={sidebarCollapsed} onToggleDocsSidebar={() => setSidebarCollapsed((c) => !c)} />

      <div className="mx-auto flex max-w-[1600px]">
        <div className="sticky top-[57px] hidden h-[calc(100vh-57px)] shrink-0 lg:block">
          <Sidebar collapsed={sidebarCollapsed} />
        </div>

        <main className="min-w-0 flex-1 px-4 py-8 lg:px-12 lg:py-12">
          {!valid || !content ? (
            <div className="mx-auto max-w-3xl">
              <p className="text-lg font-medium text-slate-800 dark:text-slate-100">{t('docs.notFound')}</p>
              <Link className="mt-4 inline-flex text-primary hover:underline" to={`/docs/${DEFAULT_DOC_SLUG}`}>
                {t('nav.gettingStarted')} →
              </Link>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <Breadcrumbs items={breadcrumbs} />
                <a
                  href={editHref}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-primary/40 hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                  {t('docs.editPage')}
                </a>
              </div>

              {usedFallback ? (
                <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
                  {t('docs.fallback')}
                </p>
              ) : null}

              <MarkdownRenderer content={content} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
