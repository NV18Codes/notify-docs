import { Link } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { flattenNavItems, getAdjacentPages } from '../data/docsManifest'
import { cn } from '../lib/utils'

export function DocPager({ currentSlug, className }) {
  const { t } = useTranslation()
  const { prev, next } = getAdjacentPages(currentSlug)
  const items = flattenNavItems()
  const prevItem = prev ? items.find((i) => i.slug === prev) : null
  const nextItem = next ? items.find((i) => i.slug === next) : null

  if (!prevItem && !nextItem) return null

  return (
    <nav
      className={cn(
        'mt-16 flex flex-col gap-3 border-t border-slate-200/80 pt-10 sm:flex-row sm:justify-between dark:border-slate-800',
        className,
      )}
      aria-label={t('docs.pagerLabel')}
    >
      {prevItem ? (
        <Link
          to={`/docs/${prevItem.slug}`}
          className="group flex max-w-[48%] items-center gap-2 rounded-lg py-2 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100" aria-hidden />
          <span className="min-w-0">
            <span className="block text-xs text-slate-400 dark:text-slate-500">{t('docs.previous')}</span>
            <span className="font-medium">{t(prevItem.titleKey)}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {nextItem ? (
        <Link
          to={`/docs/${nextItem.slug}`}
          className="group ml-auto flex max-w-[48%] items-center justify-end gap-2 rounded-lg py-2 text-right text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <span className="min-w-0">
            <span className="block text-xs text-slate-400 dark:text-slate-500">{t('docs.next')}</span>
            <span className="font-medium">{t(nextItem.titleKey)}</span>
          </span>
          <ArrowRightIcon className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100" aria-hidden />
        </Link>
      ) : null}
    </nav>
  )
}
