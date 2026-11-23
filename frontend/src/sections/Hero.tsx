import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

export function Hero() {
  const { t } = useTranslation()
  const fade = (delay: number, y = 16) => ({ initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.6 } })
  return (
    <section className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <motion.div className="hero-orb orb-one" aria-hidden="true" animate={{ y: [0, -18, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="hero-orb orb-two" aria-hidden="true" animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="hero-content">
        <motion.span className="eyebrow" {...fade(0.1, 12)}>{t('hero.eyebrow')}</motion.span>
        <motion.h1 aria-label="VERTRIX" {...fade(0.18, 30)}>VERTRI<em>X</em></motion.h1>
        <motion.p className="hero-subtitle" {...fade(0.3, 20)}>{t('hero.subtitle')}</motion.p>
        <motion.p className="hero-description" {...fade(0.4, 10)}>{t('hero.description')}</motion.p>
        <motion.div className="hero-actions" {...fade(0.5)}>
          <Link className="button primary" to="/projects">{t('hero.primary')} <ArrowUpRight size={17} /></Link>
          <Link className="button secondary" to="/#contact">{t('hero.secondary')}</Link>
        </motion.div>
        <motion.p className="slogan" {...fade(0.6, 8)}>Code <i /> Build <i /> Innovate</motion.p>
      </div>
      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.25 }}>
        <div className="hero-visual-frame">
          <img src="/images/brand/vertrix-mark.webp" width="960" height="960" alt="" fetchPriority="high" />
          <span className="hero-visual-coordinate">12°08′ N · 86°15′ W</span>
        </div>
        <div className="hero-caption"><span className="live-dot" /> {t('hero.location')}</div>
      </motion.div>
      <a className="scroll-cue" href="#about"><span>{t('hero.scroll')}</span><ArrowDown size={16} /></a>
    </section>
  )
}
