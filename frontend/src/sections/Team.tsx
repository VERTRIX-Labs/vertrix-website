import { useTranslation } from 'react-i18next'
import { Reveal } from '../components/Reveal'
import { PENDING_MEMBERS, team } from '../data/team'
import { useLang } from '../hooks/useLang'

export function Team() {
  const { t } = useTranslation()
  const lang = useLang()
  return (
    <section id="team" className="section">
      <Reveal className="section-heading"><span className="eyebrow">{t('team.eyebrow')}</span><h2>{t('team.title')}</h2></Reveal>
      <div className="team-grid">
        {team.map((m) => (
          <Reveal key={m.id}>
            <article className="team-card">
              <div className="team-avatar" aria-hidden="true"><span className="avatar-silhouette" /></div>
              <div className="team-info">
                <span className="index">{String(m.id).padStart(2, '0')}</span>
                <h3>{m.name}</h3>
                <p className="team-role">{m.role[lang]}</p>
                <p className="team-bio">{m.bio[lang]}</p>
                <div className="team-links">
                  {m.githubUrl && <a href={m.githubUrl} target="_blank" rel="noreferrer">{t('team.github')} ↗</a>}
                  {m.linkedinUrl && <a href={m.linkedinUrl} target="_blank" rel="noreferrer">{t('team.linkedin')} ↗</a>}
                  {m.portfolioUrl && <a href={m.portfolioUrl} target="_blank" rel="noreferrer">{t('team.portfolio')} ↗</a>}
                  {m.email && <a href={`mailto:${m.email}`}>{t('team.email')} ↗</a>}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
        {PENDING_MEMBERS > 0 && (
          <Reveal delay={0.1}>
            <article className="team-card soon">
              <span className="soon-count">+{PENDING_MEMBERS}</span>
              <h3>{t('team.soonTitle')}</h3>
              <p>{t('team.soonText')}</p>
            </article>
          </Reveal>
        )}
      </div>
    </section>
  )
}
