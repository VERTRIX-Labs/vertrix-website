import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CURRENT_YEAR = 2026

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="brand" to="/"><img src="/images/brand/vertrix-mark.png" alt="" /><span>VERTRIX</span></Link>
          <p>{t('footer.description')}</p>
          <strong>Code. Build. Innovate.</strong>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/#about">{t('nav.about')}</Link>
          <Link to="/#services">{t('nav.services')}</Link>
          <Link to="/projects">{t('nav.projects')}</Link>
          <Link to="/#contact">{t('nav.contact')}</Link>
        </div>
        <div>
          <h3>Social</h3>
          <a href="https://github.com/VERTRIX-Labs" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a>
          <a href="mailto:vertrixdev@gmail.com">{t('footer.email')} <ArrowUpRight size={14}/></a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {CURRENT_YEAR} VERTRIX. {t('footer.rights')}</span>
        <span>NICARAGUA · GLOBAL</span>
      </div>
    </footer>
  )
}
