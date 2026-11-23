import { useTranslation } from 'react-i18next'
import { Braces, CloudCog, Code2, Database, LayoutPanelTop, ServerCog } from 'lucide-react'
import { Reveal } from '../components/Reveal'

const services = [
  ['web', LayoutPanelTop], ['frontend', Code2], ['backend', ServerCog],
  ['software', Braces], ['database', Database], ['deployment', CloudCog],
] as const

export function Services() {
  const { t } = useTranslation()
  return (
    <section id="services" className="section">
      <Reveal className="section-heading split"><div><span className="eyebrow">{t('services.eyebrow')}</span><h2>{t('services.title')}</h2></div><span className="index">01 / 06</span></Reveal>
      <div className="service-grid">
        {services.map(([key, Icon], i) => (
          <Reveal key={key} delay={(i % 3) * 0.06}>
            <article className="service-card">
              <div className="service-top"><Icon aria-hidden="true" /><span className="index">{String(i + 1).padStart(2, '0')}</span></div>
              <h3>{t(`services.items.${key}.title`)}</h3>
              <p>{t(`services.items.${key}.description`)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
