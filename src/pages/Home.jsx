import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  CpuChipIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  InboxStackIcon,
  MegaphoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline'
import { Navbar } from '../components/Navbar'
import { Button } from '../components/ui/Button'

const WEBSITE = 'https://www.notifyy.io/'
const VIDEO_URL = 'https://youtu.be/aBNrkWFqLOY'

const stats = [
  { value: '99.9%', key: 'uptime' },
  { value: '24/7', key: 'autoreply' },
  { value: '98%', key: 'open' },
  { value: '0', key: 'extratools' },
]

const pillars = [
  { icon: BoltIcon, key: 'api' },
  { icon: ChatBubbleBottomCenterTextIcon, key: 'growth' },
  { icon: ChartBarIcon, key: 'ops' },
]

const featureKeys = [
  { icon: InboxStackIcon, k: 'featInboxMulti' },
  { icon: BuildingOffice2Icon, k: 'featCrmBuiltIn' },
  { icon: MegaphoneIcon, k: 'featCampaignMgr' },
  { icon: DocumentTextIcon, k: 'featTemplateBuilder' },
  { icon: CpuChipIcon, k: 'featNoCodeFlow' },
  { icon: GlobeAltIcon, k: 'featBizTools' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const itemFade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function Home() {
  const { t } = useTranslation()

  const pricingRows = [
    { label: t('home.rowAgents'), value: t('home.rowAgentsVal') },
    { label: t('home.rowProjects'), value: t('home.valIncluded') },
    { label: t('home.rowTeams'), value: t('home.valIncluded') },
    { label: t('home.rowRoles'), value: t('home.valIncluded') },
    { label: t('home.rowContacts'), value: t('home.val5000') },
    { label: t('home.rowActiveSeg'), value: t('home.val5') },
    { label: t('home.rowStaticSeg'), value: t('home.val50') },
    { label: t('home.rowCampaigns'), value: t('home.val10k') },
    { label: t('home.rowRetry'), value: t('home.valPlanVaries') },
    { label: t('home.rowRecurring'), value: t('home.valPlanVaries') },
    { label: t('home.rowChatbots'), value: t('home.rowChatbotsVal') },
    { label: t('home.rowProps'), value: t('home.val50') },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafbfc] dark:bg-notifyy-navy">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,211,102,0.12),transparent),radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(20,184,166,0.14),transparent),radial-gradient(ellipse_50%_35%_at_0%_20%,rgba(15,23,42,0.05),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,211,102,0.1),transparent),radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(20,184,166,0.12),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2394a3b8' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <Seo title={t('seo.homeTitle')} description={t('seo.homeDesc')} />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pt-20 lg:px-8 lg:pb-24">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={itemFade} className="mb-6 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-notifyy-teal/40 bg-notifyy-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-notifyy-teal-dark dark:border-notifyy-teal/35 dark:bg-notifyy-teal/15 dark:text-notifyy-teal-muted">
                {t('home.metaBadge')}
              </span>
              <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/15">
                {t('home.heroTrial')}
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200/90 bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                {t('home.heroPlanFrom')}
              </span>
            </motion.div>

            <motion.h1
              variants={itemFade}
              className="text-balance text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl sm:leading-[1.08] lg:text-[3.25rem]"
            >
              {t('home.heroTitle')}
            </motion.h1>

            <motion.p
              variants={itemFade}
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl"
            >
              {t('home.heroSubtitle')}
            </motion.p>

            <motion.div
              variants={itemFade}
              className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button asChild size="lg" className="h-12 min-w-[11rem] justify-center shadow-lg shadow-primary/20">
                <a href={WEBSITE} target="_blank" rel="noopener noreferrer" className="gap-2">
                  {t('home.ctaWebsite')}
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 opacity-90" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 min-w-[11rem] justify-center border-slate-200/90 bg-white/80 dark:border-slate-700 dark:bg-slate-900/60">
                <Link to="/docs/getting-started" className="gap-2">
                  {t('home.ctaDocs')}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 min-w-[11rem] justify-center border-notifyy-teal/35 bg-notifyy-teal/5 hover:bg-notifyy-teal/10 dark:border-notifyy-teal/30 dark:bg-notifyy-teal/10">
                <a href={VIDEO_URL} target="_blank" rel="noopener noreferrer" className="gap-2 text-slate-800 dark:text-slate-100">
                  <PlayCircleIcon className="h-5 w-5 text-notifyy-teal-dark dark:text-notifyy-teal-muted" />
                  {t('home.ctaVideo')}
                </a>
              </Button>
            </motion.div>

            <motion.p variants={itemFade} className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              <Link to="/docs/pricing" className="font-medium text-notifyy-teal-dark hover:underline dark:text-notifyy-teal-muted">
                {t('home.ctaPricing')}
              </Link>
              <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
              <a href={WEBSITE} className="hover:text-slate-700 dark:hover:text-slate-200" target="_blank" rel="noopener noreferrer">
                notifyy.io
              </a>
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-16 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((s) => (
              <div
                key={s.key}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm transition duration-300 hover:border-notifyy-teal/30 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-notifyy-teal/25"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-notifyy-teal/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="text-3xl font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white">{s.value}</div>
                <div className="mt-1.5 text-sm leading-snug text-slate-500 dark:text-slate-400">{t(`home.stats.${s.key}`)}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Features */}
        <section className="border-y border-slate-200/70 bg-white/60 py-20 backdrop-blur-sm dark:border-slate-800/80 dark:bg-notifyy-navy-soft/40">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {t('home.featuresTitle')}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">{t('home.featuresSubtitle')}</p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={container}
              className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
            >
              {featureKeys.map((f) => (
                <motion.li
                  key={f.k}
                  variants={itemFade}
                  className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-notifyy-teal/35 hover:shadow-md dark:border-slate-800 dark:from-slate-900/90 dark:to-slate-950/90 dark:hover:border-notifyy-teal/30"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-notifyy-teal/10 text-notifyy-teal-dark ring-1 ring-notifyy-teal/20 transition group-hover:bg-notifyy-teal/15 dark:bg-notifyy-teal/15 dark:text-notifyy-teal-muted dark:ring-notifyy-teal/25">
                    <f.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">{t(`home.${f.k}`)}</h3>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Pillars */}
        <section className="mx-auto max-w-6xl px-4 py-20 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
          >
            {t('home.pillarsTitle')}
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-notifyy-teal/15 blur-2xl dark:bg-notifyy-teal/10" aria-hidden />
                <p.icon className="relative h-9 w-9 text-notifyy-teal-dark dark:text-notifyy-teal-muted" aria-hidden />
                <p className="relative mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{t(`home.pillars.${p.key}`)}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-slate-200/70 bg-gradient-to-b from-slate-50/90 to-white py-20 dark:border-slate-800 dark:from-notifyy-navy dark:to-notifyy-navy-soft">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {t('home.pricingTitle')}
              </h2>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{t('home.pricingSubtitle')}</p>
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative flex flex-col rounded-3xl border border-slate-200/90 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-soft-dark"
              >
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('home.planMonthly')}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    {'\u20b9'}999
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">{t('home.perMonth')}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t('home.planMonthlyHint')}</p>
                <Link
                  to="/docs/pricing"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-notifyy-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-notifyy-navy-soft dark:bg-white dark:text-notifyy-navy dark:hover:bg-slate-100"
                >
                  {t('home.ctaPricing')}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="relative flex flex-col overflow-hidden rounded-3xl border-2 border-notifyy-teal/45 bg-gradient-to-br from-notifyy-teal/10 via-white to-white p-8 shadow-lg shadow-notifyy-teal/10 dark:border-notifyy-teal/35 dark:from-notifyy-teal/10 dark:via-slate-900 dark:to-slate-900"
              >
                <span className="absolute right-6 top-6 rounded-full bg-notifyy-teal px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {t('home.planPopular')}
                </span>
                <p className="text-sm font-medium uppercase tracking-wide text-notifyy-teal-dark dark:text-notifyy-teal-muted">{t('home.planYearly')}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    {'\u20b9'}10,999
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">{t('home.perYear')}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t('home.planYearlyHint')}</p>
                <a
                  href={`${WEBSITE}pricing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-notifyy-teal-dark px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-notifyy-teal"
                >
                  {t('home.ctaWebsite')}
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </a>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400"
            >
              {t('home.pricingTrialNote')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
            >
              <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/80">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{t('home.pricingIncludes')}</h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {pricingRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 px-6 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{row.label}</span>
                    <span className="text-sm tabular-nums text-slate-600 dark:text-slate-400">{row.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video */}
        <section className="mx-auto max-w-6xl px-4 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-900 text-white shadow-2xl dark:border-slate-700"
          >
            <div className="grid gap-0 lg:grid-cols-5">
              <div className="flex flex-col justify-center p-8 lg:col-span-2 lg:p-10">
                <h2 className="text-2xl font-semibold tracking-tight">{t('home.videoTitle')}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{t('home.videoSubtitle')}</p>
                <a
                  href={VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-notifyy-teal-muted"
                >
                  <PlayCircleIcon className="h-5 w-5 text-notifyy-teal-dark" />
                  {t('nav.watchVideo')}
                </a>
              </div>
              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex min-h-[220px] items-center justify-center bg-gradient-to-br from-notifyy-teal/25 via-slate-800 to-slate-900 lg:col-span-3 lg:min-h-[280px]"
              >
                <span className="absolute inset-0 bg-[url('https://img.youtube.com/vi/aBNrkWFqLOY/maxresdefault.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-notifyy-teal-dark shadow-xl ring-4 ring-white/20 transition hover:scale-105">
                  <PlayCircleIcon className="h-10 w-10" />
                </span>
              </a>
            </div>
          </motion.div>
        </section>

        {/* Quick links */}
        <section className="mx-auto max-w-6xl px-4 pb-12 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-dashed border-slate-200/90 bg-white/70 p-8 text-center dark:border-slate-700 dark:bg-slate-900/40"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('home.quickLinks')}</h3>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[
                ['/docs/guides/api-integration', 'API'],
                ['/docs/guides/whatsapp-campaigns', 'Campaigns'],
                ['/docs/guides/chatbot-setup', 'Chatbot'],
                ['/docs/faq', 'FAQ'],
              ].map(([to, label]) => (
                <Link
                  key={to}
                  className="rounded-xl bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-800 ring-1 ring-slate-200/90 transition hover:bg-notifyy-teal/10 hover:ring-notifyy-teal/30 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-notifyy-teal/15"
                  to={to}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        </section>

        <footer className="border-t border-slate-200/80 py-10 dark:border-slate-800">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:text-left lg:px-8">
            <p>© {new Date().getFullYear()} Notifyy · {t('home.footerTag')}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href={WEBSITE} className="font-medium text-slate-700 hover:text-notifyy-teal-dark dark:text-slate-300" target="_blank" rel="noopener noreferrer">
                notifyy.io
              </a>
              <a href={VIDEO_URL} className="font-medium text-slate-700 hover:text-notifyy-teal-dark dark:text-slate-300" target="_blank" rel="noopener noreferrer">
                {t('nav.watchVideo')}
              </a>
              <Link to="/docs/getting-started" className="font-medium text-notifyy-teal-dark hover:underline dark:text-notifyy-teal-muted">
                {t('nav.docs')}
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
