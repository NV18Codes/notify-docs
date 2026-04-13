import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'
import { cn } from '../lib/utils'

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900',
        className,
      )}
      aria-label={t('theme.toggle')}
      title={t('theme.toggle')}
    >
      <motion.span
        key={isDark ? 'dark' : 'light'}
        initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="inline-flex"
      >
        {isDark ? (
          <MoonIcon className="h-5 w-5" aria-hidden />
        ) : (
          <SunIcon className="h-5 w-5" aria-hidden />
        )}
      </motion.span>
    </button>
  )
}
