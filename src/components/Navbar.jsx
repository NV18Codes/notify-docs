import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, BookOpenIcon, XMarkIcon, Squares2X2Icon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SearchBar } from './SearchBar'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Sidebar } from './Sidebar'
import { cn } from '../lib/utils'

export function Navbar({
  className,
  docsSidebarCollapsed,
  onToggleDocsSidebar,
}) {
  const { t } = useTranslation()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isDocs = location.pathname.startsWith('/docs')
  const showDocsControls = isDocs && typeof onToggleDocsSidebar === 'function'

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80',
          className,
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-3 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              onClick={() => setMobileOpen(true)}
              aria-label={t('nav.openMenu')}
            >
              <Bars3Icon className="h-5 w-5" />
            </button>

            <Link to="/" className="group flex shrink-0 items-center gap-2">
              <motion.span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-sm ring-2 ring-notifyy-teal/45 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                whileHover={{ scale: 1.03 }}
              >
                N
              </motion.span>
              <div className="hidden min-w-0 sm:block">
                <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">{t('brand')}</div>
                <div className="truncate text-xs text-slate-500 dark:text-slate-400">{t('tagline')}</div>
              </div>
            </Link>

            {showDocsControls ? (
              <button
                type="button"
                onClick={onToggleDocsSidebar}
                className="hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm lg:inline-flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                aria-pressed={docsSidebarCollapsed}
                title="Toggle sidebar width"
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
            ) : null}
          </div>

          <div className="hidden flex-1 justify-center md:flex">
            <SearchBar />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href="https://www.notifyy.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 hover:bg-notifyy-teal/10 hover:text-notifyy-teal-dark dark:text-slate-200 dark:hover:bg-notifyy-teal/10 dark:hover:text-notifyy-teal-muted md:inline-flex"
            >
              {t('nav.website')}
              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 opacity-70" />
            </a>
            <Link
              to="/docs/getting-started"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-flex"
            >
              <BookOpenIcon className="h-4 w-4" />
              {t('nav.docs')}
            </Link>
            <LanguageSwitcher className="hidden sm:block" />
            <ThemeToggle />
          </div>
        </div>

        <div className="border-t border-slate-100 px-4 py-2 md:hidden dark:border-slate-800">
          <SearchBar />
        </div>
      </header>

      <Transition show={mobileOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[70] lg:hidden" onClose={setMobileOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-[min(100%,20rem)] flex-col bg-white shadow-xl dark:bg-slate-950">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{t('nav.docs')}</span>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => setMobileOpen(false)}
                    aria-label={t('nav.closeMenu')}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <Sidebar onNavigate={() => setMobileOpen(false)} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
