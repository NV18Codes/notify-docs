import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import hi from './locales/hi.json'
import kn from './locales/kn.json'

const STORAGE_KEY = 'notifyy-lang'

function getInitialLng() {
  if (typeof window === 'undefined') return 'en'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && ['en', 'hi', 'kn'].includes(saved)) return saved
  const nav = navigator.language?.toLowerCase() || 'en'
  if (nav.startsWith('hi')) return 'hi'
  if (nav.startsWith('kn')) return 'kn'
  return 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    kn: { translation: kn },
  },
  lng: getInitialLng(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng
    localStorage.setItem(STORAGE_KEY, lng)
  }
})

export default i18n
