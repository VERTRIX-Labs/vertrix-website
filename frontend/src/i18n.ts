import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translation.json'
import es from './locales/es/translation.json'

export type Lang = 'en' | 'es'
const STORAGE_KEY = 'vertrix-language'

function initialLanguage(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch { /* storage unavailable */ }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function saveLanguage(lang: Lang) {
  try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* ignore */ }
}

// Keep <html lang> and the meta description in sync with the active language.
const descriptions: Record<Lang, string> = {
  en: 'VERTRIX is a software development studio building practical, well-engineered digital solutions.',
  es: 'VERTRIX es un estudio de desarrollo de software que crea soluciones digitales prácticas y bien construidas.',
}
function syncDocument(lang: string) {
  const l: Lang = lang.startsWith('es') ? 'es' : 'en'
  document.documentElement.lang = l
  document.querySelector('meta[name="description"]')?.setAttribute('content', descriptions[l])
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es } },
  lng: initialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})
syncDocument(i18n.language)
i18n.on('languageChanged', syncDocument)

export default i18n
