import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Header() {
  const [open, setOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const links = [
    ['home', '/', 'nav.home'], ['about', '/#about', 'nav.about'], ['services', '/#services', 'nav.services'],
    ['projects', '/projects', 'nav.projects'], ['process', '/#process', 'nav.process'],
    ['technologies', '/#technologies', 'nav.technologies'], ['team', '/#team', 'nav.team'], ['contact', '/#contact', 'nav.contact'],
  ] as const

  const switchLanguage = (language: 'en' | 'es') => {
    i18n.changeLanguage(language)
    localStorage.setItem('vertrix-language', language)
  }

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" to="/" aria-label="VERTRIX home">
          <img src="/images/brand/vertrix-mark.png" alt="" />
          <span>VERTRIX</span>
        </Link>
        <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {links.map(([, path, key]) => (
            path.startsWith('/#') ? (
              <a key={key} href={path} onClick={() => setOpen(false)}>{t(key)}</a>
            ) : (
              <NavLink key={key} to={path} onClick={() => setOpen(false)}>{t(key)}</NavLink>
            )
          ))}
        </nav>
        <div className="nav-actions">
          <div className="language-switch" aria-label="Language selector">
            <button type="button" className={i18n.language === 'en' ? 'active' : ''} onClick={() => switchLanguage('en')}>EN</button>
            <span>/</span>
            <button type="button" className={i18n.language === 'es' ? 'active' : ''} onClick={() => switchLanguage('es')}>ES</button>
          </div>
          <Link className="nav-cta" to="/#contact">{t('nav.cta')}</Link>
          <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}
