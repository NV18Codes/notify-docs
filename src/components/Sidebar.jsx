import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { navSections } from '../data/docsManifest'
import { cn } from '../lib/utils'

export function Sidebar({ collapsed, onNavigate, className }) {
  const { t } = useTranslation()
  const location = useLocation()
  const currentPath = location.pathname.replace(/^\/docs\/?/, '') || 'getting-started'
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
          'flex h-full w-16 flex-col border-r border-slate-200/80 bg-white/90 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90',
          className,
        )}
      >
        <nav className="flex flex-1 flex-col items-center gap-1 overflow-y-auto px-1">
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
                    'flex h-10 w-10 items-center justify-center rounded-lg text-[10px] font-bold leading-tight',
                    active
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                  )}
                >
                  {label.slice(0, 2).toUpperCase()}
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
        'flex h-full w-72 flex-col border-r border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80',
        className,
      )}
    >
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {navSections.map((section) => {
          const open = openSections[section.id]
          return (
            <div key={section.id} className="mb-4">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="mb-1 flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
                aria-expanded={open}
              >
                <span>{t(section.titleKey)}</span>
                <ChevronDownIcon
                  className={cn('h-4 w-4 transition-transform', open ? 'rotate-0' : '-rotate-90')}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-0.5 overflow-hidden"
                  >
                    {section.items.map((item) => {
                      const active = currentPath === item.slug
                      return (
                        <li key={item.slug}>
                          <Link
                            to={`/docs/${item.slug}`}
                            onClick={() => onNavigate?.()}
                            className={cn(
                              'block rounded-lg px-3 py-2 text-sm transition',
                              active
                                ? 'bg-primary/10 font-semibold text-primary dark:bg-primary/15 dark:text-emerald-300'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
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
