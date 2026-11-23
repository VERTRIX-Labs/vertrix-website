import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { saveLanguage } from '../i18n'
import type { Lang } from '../i18n'
import { useLang } from '../hooks/useLang'

const sectionLinks = [
  ['/#about', 'nav.about'],
  ['/#services', 'nav.services'],
  ['/#process', 'nav.process'],
  ['/#team', 'nav.team'],
  ['/#contact', 'nav.contact'],
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const lang = useLang()
  const location = useLocation()

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [location.pathname, location.hash])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const switchLanguage = (next: Lang) => {
    i18n.changeLanguage(next)
    saveLanguage(next)
  }

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" to="/" aria-label={t('nav.home')}>
          <img src="/images/brand/vertrix-mark-sm.webp" width="38" height="38" alt="" />
          <span>VERTRIX</span>
        </Link>
        <nav id="site-nav" className={open ? 'nav-links open' : 'nav-links'} aria-label={t('nav.main')}>
          <NavLink to="/projects">{t('nav.projects')}</NavLink>
          {sectionLinks.map(([path, key]) => (
            <Link key={key} to={path}>{t(key)}</Link>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="language-switch" role="group" aria-label={t('nav.language')}>
            <button type="button" aria-pressed={lang === 'en'} className={lang === 'en' ? 'active' : ''} onClick={() => switchLanguage('en')}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" aria-pressed={lang === 'es'} className={lang === 'es' ? 'active' : ''} onClick={() => switchLanguage('es')}>ES</button>
          </div>
          <Link className="nav-cta" to="/#contact">{t('nav.cta')}</Link>
          <button className="menu-button" type="button" aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}
