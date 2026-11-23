import { useTranslation } from 'react-i18next'
import { Reveal } from '../components/Reveal'

export function About() {
  const { t } = useTranslation()
  const values = t('about.values', { returnObjects: true }) as string[]
  return (
    <section id="about" className="section about-section">
      <div className="about-layout">
        <Reveal className="section-heading"><span className="eyebrow">{t('about.eyebrow')}</span><h2>{t('about.title')}</h2></Reveal>
        <Reveal className="about-copy" delay={0.1}><p>{t('about.description')}</p></Reveal>
      </div>
      <div className="about-cards">
        <Reveal><article><span className="index">01</span><h3>{t('about.missionLabel')}</h3><p>{t('about.mission')}</p></article></Reveal>
        <Reveal delay={0.1}><article><span className="index">02</span><h3>{t('about.visionLabel')}</h3><p>{t('about.vision')}</p></article></Reveal>
      </div>
      <Reveal><ul className="values-line">{values.map((v) => <li key={v}>{v}</li>)}</ul></Reveal>
    </section>
  )
}
