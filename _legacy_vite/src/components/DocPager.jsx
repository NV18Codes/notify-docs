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
        'not-prose mt-20 border-t border-slate-200/90 pt-12 dark:border-slate-800',
        className,
      )}
      aria-label={t('docs.pagerLabel')}
    >
      <p className="mb-8 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">{t('docs.pagerMicrocopy')}</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-6">
        {prevItem ? (
          <Link
            to={`/docs/${prevItem.slug}`}
            className="group flex max-w-full flex-1 items-start gap-3 rounded-lg py-2 text-slate-600 transition hover:text-slate-900 sm:max-w-[48%] dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeftIcon className="mt-0.5 h-4 w-4 shrink-0 opacity-60 transition group-hover:opacity-100" aria-hidden />
            <span className="min-w-0">
              <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">{t('docs.previous')}</span>
              <span className="text-[15px] font-medium leading-snug">{t(prevItem.titleKey)}</span>
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {nextItem ? (
          <Link
            to={`/docs/${nextItem.slug}`}
            className="group flex max-w-full flex-1 items-start justify-end gap-3 rounded-lg py-2 text-right text-slate-600 transition hover:text-slate-900 sm:max-w-[48%] dark:text-slate-400 dark:hover:text-white"
          >
            <span className="min-w-0 text-right">
              <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">{t('docs.next')}</span>
              <span className="text-[15px] font-medium leading-snug">{t(nextItem.titleKey)}</span>
            </span>
            <ArrowRightIcon className="mt-0.5 h-4 w-4 shrink-0 opacity-60 transition group-hover:opacity-100" aria-hidden />
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
