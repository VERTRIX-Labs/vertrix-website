import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import { useLang } from '../hooks/useLang'
import { usePageTitle } from '../hooks/usePageTitle'
import { NotFoundPage } from './NotFoundPage'
import { SmartImage } from '../components/SmartImage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const lang = useLang()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  usePageTitle(project?.name)
  if (!project) return <NotFoundPage />

  const next = projects[(index + 1) % projects.length]
  const d = (key: string) => t(`projects.detail.${key}`)
  const blocks = [
    { key: 'overview', body: <p>{project.overview[lang]}</p> },
    { key: 'need', body: <p>{project.problem[lang]}</p> },
    { key: 'solution', body: <p>{project.solution[lang]}</p> },
    { key: 'technology', body: <div className="tag-list">{project.technologies.map((x) => <span key={x}>{x}</span>)}</div> },
    { key: 'features', body: <ul>{project.features[lang].map((x) => <li key={x}>{x}</li>)}</ul> },
  ]

  return (
    <article className="project-detail">
      <header className="detail-hero">
        <Link className="back-link" to="/projects"><ArrowLeft size={16} /> {t('nav.projects')}</Link>
        <div className="detail-meta">
          <span className="eyebrow">{t(`projects.typeLabels.${project.category}`)}</span>
          <span className={`status-badge ${project.status}`}><i />{t(`projects.status.${project.status}`)}</span>
        </div>
        <h1>{project.name}</h1>
        <p>{project.description[lang]}</p>
        {(project.demoUrl || project.repoUrl) && (
          <div className="detail-actions">
            {project.demoUrl && <a className="button primary" href={project.demoUrl} target="_blank" rel="noreferrer">{d('demo')} <ExternalLink size={16} /></a>}
            {project.repoUrl && <a className="button secondary" href={project.repoUrl} target="_blank" rel="noreferrer">{t('projects.repository')} <ExternalLink size={16} /></a>}
          </div>
        )}
      </header>

      <figure className="browser-frame">
        <div className="browser-bar" aria-hidden="true"><i /><i /><i /></div>
        <div className="shot shimmer"><SmartImage src={project.screenshot ?? project.cover} width="1878" height="912" alt={project.coverAlt[lang]} /></div>
        <figcaption>{d('screenshot')}</figcaption>
      </figure>

      <div className="detail-content">
        {blocks.map((b, i) => (
          <section key={b.key}>
            <span className="index">{String(i + 1).padStart(2, '0')}</span>
            <h2>{d(b.key)}</h2>
            {b.body}
          </section>
        ))}
      </div>

      {project.gallery && (
        <section className="gallery" aria-labelledby="gallery-title">
          <h2 id="gallery-title">{d('gallery')}</h2>
          <ul>
            {project.gallery.map((g) => (
              <li key={g.src}><div className="thumb shimmer"><SmartImage src={g.src} width="1100" height="614" loading="lazy" alt={g.title} /></div><span>{g.title}</span></li>
            ))}
          </ul>
        </section>
      )}

      <Link className="next-project" to={projects.length > 1 ? `/projects/${next.slug}` : '/projects'}>
        <span>{projects.length > 1 ? t('projects.next') : t('projects.backToAll')}</span>
        <strong>{projects.length > 1 ? next.name : t('nav.projects')}</strong>
        <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  )
}
