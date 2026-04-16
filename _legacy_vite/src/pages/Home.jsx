import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Seo } from '../components/Seo'
import { Navbar } from '../components/Navbar'
import { DEFAULT_DOC_SLUG } from '../data/docsManifest'

const WEBSITE = 'https://www.notifyy.io/'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-surface-muted dark:bg-slate-950">
      <Seo title={t('seo.homeTitle')} description={t('seo.homeDesc')} />
      <Navbar />

      <main className="mx-auto max-w-lg px-6 pb-24 pt-20 sm:pt-28">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{t('home.heroTitle')}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{t('home.heroSubtitle')}</p>
          <Link
            to={`/docs/${DEFAULT_DOC_SLUG}`}
            className="mt-10 inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {t('home.ctaGetStarted')}
          </Link>
        </motion.div>

        <footer className="mt-24 border-t border-slate-200/80 pt-8 dark:border-slate-800">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <Link to={`/docs/${DEFAULT_DOC_SLUG}`} className="hover:text-slate-900 dark:hover:text-white">
              {t('home.footerDocs')}
            </Link>
            <Link to="/docs/pricing" className="hover:text-slate-900 dark:hover:text-white">
              {t('home.footerPricing')}
            </Link>
            <a href={WEBSITE} className="hover:text-slate-900 dark:hover:text-white" target="_blank" rel="noopener noreferrer">
              {t('home.footerProduct')}
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
