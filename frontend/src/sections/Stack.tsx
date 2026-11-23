import { useTranslation } from 'react-i18next'
import { Reveal } from '../components/Reveal'

const stack = [
  { category: 'frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React'] },
  { category: 'backend', items: ['Node.js', 'Express'] },
  { category: 'database', items: ['MySQL', 'PostgreSQL'] },
  { category: 'tools', items: ['Git', 'GitHub', 'Linux'] },
]

export function Stack() {
  const { t } = useTranslation()
  return (
    <section id="technologies" className="section">
      <Reveal className="section-heading"><span className="eyebrow">{t('stack.eyebrow')}</span><h2>{t('stack.title')}</h2></Reveal>
      <div className="stack-grid">
        {stack.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.06}>
            <article>
              <h3>{t(`stack.categories.${group.category}`)}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
