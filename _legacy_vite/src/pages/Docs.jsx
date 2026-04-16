import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '../components/Seo'
import { useTranslation } from 'react-i18next'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ScrollProgress } from '../components/ScrollProgress'
import { DocPager } from '../components/DocPager'
import { DEFAULT_DOC_SLUG, flattenNavItems, isNavSlug, isValidSlug } from '../data/docsManifest'
import { getMarkdownRaw, extractTitle, getFirstParagraph, estimateReadMinutes } from '../utils/docsLoader'

const pageMotion = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
}

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

  const readMinutes = useMemo(() => (content ? estimateReadMinutes(content) : 1), [content])

  const breadcrumbs = useMemo(() => {
    return [
      { label: t('docs.breadcrumb'), href: `/docs/${DEFAULT_DOC_SLUG}` },
      { label: title },
    ]
  }, [title, t])

  const editHref = useMemo(() => {
    const subject = encodeURIComponent(`Docs feedback: ${title}`)
    const body = encodeURIComponent(`Page: /docs/${docPath}\n\nDescribe your suggested change:\n`)
    return `mailto:support@notifyy.com?subject=${subject}&body=${body}`
  }, [docPath, title])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Seo title={t('seo.docsTitle', { title })} description={t('seo.docsDesc', { description })} />
      <ScrollProgress />
      <Navbar docsSidebarCollapsed={sidebarCollapsed} onToggleDocsSidebar={() => setSidebarCollapsed((c) => !c)} />

      <div className="mx-auto flex max-w-[1600px]">
        <div className="sticky top-[52px] hidden h-[calc(100vh-52px)] shrink-0 lg:block">
          <Sidebar collapsed={sidebarCollapsed} />
        </div>

        <main className="min-w-0 flex-1 px-4 py-10 lg:px-16 lg:py-14">
          {!valid || !content ? (
            <div className="mx-auto w-full max-w-[1100px]">
              <p className="text-base font-medium text-slate-800 dark:text-slate-100">{t('docs.notFound')}</p>
              <Link className="mt-4 inline-flex text-sm text-slate-700 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-600 dark:text-slate-300" to={`/docs/${DEFAULT_DOC_SLUG}`}>
                {t('docs.backToIntro')} →
              </Link>
            </div>
          ) : (
            <motion.div key={docPath} className="mx-auto w-full max-w-[1100px]" {...pageMotion}>
              <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                <Breadcrumbs items={breadcrumbs} />
                <a
                  href={editHref}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200"
                >
                  <PencilSquareIcon className="h-3.5 w-3.5" />
                  {t('docs.editPage')}
                </a>
              </div>

              {usedFallback ? (
                <p className="mb-8 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  {t('docs.fallback')}
                </p>
              ) : null}

              <div className="not-prose mb-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-slate-100 pb-8 text-[13px] leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <span className="font-medium text-slate-600 dark:text-slate-300">{t('docs.lastUpdated')}</span>
                <span className="text-slate-300 dark:text-slate-600" aria-hidden>
                  ·
                </span>
                <span>{t('docs.estimatedRead', { count: readMinutes })}</span>
              </div>

              <MarkdownRenderer content={content} />

              {isNavSlug(docPath) ? <DocPager currentSlug={docPath} /> : null}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
