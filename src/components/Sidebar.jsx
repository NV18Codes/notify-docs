import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { navSections } from '../data/docsManifest'
import { cn } from '../lib/utils'

function slugAbbrev(slug) {
  const tail = slug.split('/').pop() || slug
  return tail.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || 'DO'
}

export function Sidebar({ collapsed, onNavigate, className }) {
  const { t } = useTranslation()
  const location = useLocation()
  const currentPath = location.pathname.replace(/^\/docs\/?/, '') || 'introduction'
  const [openSections, setOpenSections] = useState(() =>
    Object.fromEntries(navSections.map((s) => [s.id, true])),
  )

  const activeSectionId = useMemo(() => {
    for (const s of navSections) {
      if (s.items.some((i) => i.slug === currentPath)) return s.id
    }
    return null
  }, [currentPath])

  function toggleSection(id) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (collapsed) {
    return (
      <aside
        className={cn(
          'flex h-full w-14 flex-col border-r border-slate-200/60 bg-white py-4 dark:border-slate-800 dark:bg-slate-950',
          className,
        )}
      >
        <nav className="flex flex-1 flex-col items-center gap-0.5 overflow-y-auto px-1" aria-label={t('nav.docs')}>
          {navSections.flatMap((section) =>
            section.items.map((item) => {
              const active = currentPath === item.slug
              const label = t(item.titleKey)
              return (
                <Link
                  key={item.slug}
                  to={`/docs/${item.slug}`}
                  title={active ? `${label} — ${t('docs.youAreHere')}` : label}
                  onClick={() => onNavigate?.()}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-md text-[10px] font-semibold transition',
                    active
                      ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-2 ring-offset-white dark:bg-white dark:text-slate-900 dark:ring-white dark:ring-offset-slate-950'
                      : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
                  )}
                >
                  {slugAbbrev(item.slug)}
                </Link>
              )
            }),
          )}
        </nav>
      </aside>
    )
  }

  return (
    <aside
      className={cn(
        'flex h-full w-[17.5rem] flex-col border-r border-slate-200/60 bg-white dark:border-slate-800 dark:bg-slate-950',
        className,
      )}
    >
      <div className="flex-1 overflow-y-auto px-3 py-5">
        {navSections.map((section) => {
          const open = openSections[section.id]
          const sectionHasActive = activeSectionId === section.id
          return (
            <div
              key={section.id}
              className={cn(
                'mb-5 rounded-lg px-1 py-1 transition-colors',
                sectionHasActive ? 'bg-slate-50 dark:bg-slate-900/80' : '',
              )}
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className={cn(
                  'mb-1.5 flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[11px] font-semibold uppercase tracking-wider transition',
                  sectionHasActive
                    ? 'text-slate-900 dark:text-slate-100'
                    : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300',
                )}
                aria-expanded={open}
              >
                <span className="flex items-center gap-2">
                  {sectionHasActive ? (
                    <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900 dark:bg-white sm:block" aria-hidden />
                  ) : null}
                  <span>{t(section.titleKey)}</span>
                </span>
                <ChevronDownIcon
                  className={cn('h-3.5 w-3.5 shrink-0 transition-transform', open ? 'rotate-0' : '-rotate-90')}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-0.5 overflow-hidden"
                  >
                    {section.items.map((item, idx) => {
                      const active = currentPath === item.slug
                      const prev = section.items[idx - 1]
                      const showGroup = item.groupKey && item.groupKey !== prev?.groupKey
                      return (
                        <li key={item.slug}>
                          {showGroup ? (
                            <p
                              className={cn(
                                'mb-1 mt-2 px-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400 first:mt-0 dark:text-slate-500',
                                idx > 0 ? 'mt-3 border-t border-slate-100 pt-3 dark:border-slate-800' : '',
                              )}
                            >
                              {t(item.groupKey)}
                            </p>
                          ) : null}
                          <div className="relative">
                            <Link
                              to={`/docs/${item.slug}`}
                              onClick={() => onNavigate?.()}
                              aria-current={active ? 'page' : undefined}
                              className={cn(
                                'relative block rounded-md border-l-[3px] py-2 pl-3 pr-2 text-[13px] leading-snug transition',
                                active
                                  ? 'border-slate-900 bg-white font-semibold text-slate-900 shadow-sm dark:border-white dark:bg-slate-950 dark:text-white'
                                  : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-white/80 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800/50 dark:hover:text-slate-100',
                              )}
                            >
                              <span className="flex items-start justify-between gap-2">
                                <span>{t(item.titleKey)}</span>
                                {active ? (
                                  <span className="hidden shrink-0 text-[9px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500 sm:inline">
                                    {t('docs.youAreHere')}
                                  </span>
                                ) : null}
                              </span>
                            </Link>
                          </div>
                        </li>
                      )
                    })}
                  </motion.ul>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
