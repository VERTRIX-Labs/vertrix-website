import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const language = i18n.language.startsWith('es') ? 'es' : 'en'
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <NotFoundDetail />
  const index = projects.findIndex((item) => item.slug === slug)
  const next = projects[(index + 1) % projects.length]
  return (
    <article className="project-detail">
      <header className="detail-hero"><Link className="back-link" to="/projects"><ArrowLeft size={16}/> {t('nav.projects')}</Link><span className="eyebrow">{t(`projects.typeLabels.${project.category}`)}</span><h1>{project.name}</h1><p>{project.description[language]}</p></header>
      <div className={`detail-preview ${project.slug}`}><div className="preview-grid" /><span>{project.name}</span></div>
      <div className="detail-content">
        <section><span className="detail-label">01</span><h2>{language === 'es' ? 'Resumen' : 'Overview'}</h2><p>{project.overview[language]}</p></section>
        <section><span className="detail-label">02</span><h2>{language === 'es' ? 'Necesidad' : 'Need'}</h2><p>{project.problem[language]}</p></section>
        <section><span className="detail-label">03</span><h2>{language === 'es' ? 'Solución' : 'Solution'}</h2><p>{project.solution[language]}</p></section>
        {project.technologies.length > 0 && <section><span className="detail-label">04</span><h2>{language === 'es' ? 'Tecnologías' : 'Technology'}</h2><div className="tag-list">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div></section>}
        {project.features[language].length > 0 && <section><span className="detail-label">05</span><h2>{language === 'es' ? 'Características' : 'Features'}</h2><ul>{project.features[language].map((item) => <li key={item}>{item}</li>)}</ul></section>}
      </div>
      {(project.demoUrl || project.repoUrl) && <div className="detail-actions">{project.demoUrl && <a className="button primary" href={project.demoUrl} target="_blank" rel="noreferrer">Demo <ExternalLink size={16}/></a>} {project.repoUrl && <a className="button secondary" href={project.repoUrl} target="_blank" rel="noreferrer">{t('projects.repository')} <ExternalLink size={16}/></a>}</div>}
      {projects.length > 1 ? <Link className="next-project" to={`/projects/${next.slug}`}><span>{language === 'es' ? 'Siguiente proyecto' : 'Next project'}</span><strong>{next.name}</strong><ArrowRight /></Link> : <Link className="next-project" to="/projects"><span>{t('projects.backToAll')}</span><strong>{t('nav.projects')}</strong><ArrowRight /></Link>}
    </article>
  )
}

function NotFoundDetail() {
  const { t } = useTranslation()
  return <section className="not-found"><h1>{t('notFound.title')}</h1><Link className="button primary" to="/projects">{t('notFound.back')}</Link></section>
}
