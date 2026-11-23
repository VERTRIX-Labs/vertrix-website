import { useTranslation } from 'react-i18next'
import { Reveal } from '../components/Reveal'

export function Process() {
  const { t } = useTranslation()
  const steps = t('process.steps', { returnObjects: true }) as { title: string; description: string }[]
  return (
    <section id="process" className="section">
      <Reveal className="section-heading"><span className="eyebrow">{t('process.eyebrow')}</span><h2>{t('process.title')}</h2></Reveal>
      <ol className="process-line">
        {steps.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={i * 0.07}>
              <div className="process-number">{String(i + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
