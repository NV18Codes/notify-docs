import { useState } from 'react'
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
        <nav className="flex flex-1 flex-col items-center gap-0.5 overflow-y-auto px-1">
          {navSections.flatMap((section) =>
            section.items.map((item) => {
              const active = currentPath === item.slug
              const label = t(item.titleKey)
              return (
                <Link
                  key={item.slug}
                  to={`/docs/${item.slug}`}
                  title={label}
                  onClick={() => onNavigate?.()}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-md text-[10px] font-semibold',
                    active
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
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
        'flex h-full w-64 flex-col border-r border-slate-200/60 bg-white dark:border-slate-800 dark:bg-slate-950',
        className,
      )}
    >
      <div className="flex-1 overflow-y-auto px-3 py-5">
        {navSections.map((section) => {
          const open = openSections[section.id]
          return (
            <div key={section.id} className="mb-6">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="mb-2 flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                aria-expanded={open}
              >
                <span>{t(section.titleKey)}</span>
                <ChevronDownIcon
                  className={cn('h-3.5 w-3.5 transition-transform', open ? 'rotate-0' : '-rotate-90')}
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
                                'mb-1 px-3 text-[10px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500',
                                idx > 0 ? 'mt-3' : null,
                              )}
                            >
                              {t(item.groupKey)}
                            </p>
                          ) : null}
                          <Link
                            to={`/docs/${item.slug}`}
                            onClick={() => onNavigate?.()}
                            className={cn(
                              'block rounded-md px-3 py-1.5 text-[13px] leading-snug transition',
                              active
                                ? 'bg-slate-100 font-medium text-slate-900 dark:bg-slate-800 dark:text-white'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100',
                            )}
                          >
                            {t(item.titleKey)}
                          </Link>
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
