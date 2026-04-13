import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'

export function Breadcrumbs({ items, className }) {
  const { t } = useTranslation()

  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400', className)}>
      <Link
        to="/"
        className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary"
      >
        <HomeIcon className="h-4 w-4" aria-hidden />
        {t('brand')}
      </Link>
      {items.map((crumb, i) => (
        <span key={crumb.href || crumb.label} className="inline-flex items-center gap-1">
          <ChevronRightIcon className="h-4 w-4 opacity-60" aria-hidden />
          {crumb.href && i < items.length - 1 ? (
            <Link to={crumb.href} className="rounded-md px-1.5 py-0.5 font-medium hover:text-primary">
              {crumb.label}
            </Link>
          ) : i === items.length - 1 ? (
            <span className="rounded-md px-1.5 py-0.5 font-semibold text-slate-800 dark:text-slate-100">{crumb.label}</span>
          ) : (
            <span className="rounded-md px-1.5 py-0.5 font-medium text-slate-600 dark:text-slate-300">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
