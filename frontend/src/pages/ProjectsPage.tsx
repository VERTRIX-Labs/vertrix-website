import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'

export function ProjectsPage() {
  const { t, i18n } = useTranslation()
  const language = i18n.language.startsWith('es') ? 'es' : 'en'
  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">{t('projects.eyebrow')}</span><h1>{t('projects.title')}</h1></div>
      <div className={`project-grid${projects.length === 1 ? ' single-project' : ''}`}>
        {projects.map((project) => (
          <article className="project-card" key={project.slug}>
            <div className={`project-preview ${project.slug}`}><div className="preview-grid" /><span>{project.name}</span></div>
            <div className="project-meta"><span>{t(`projects.typeLabels.${project.category}`)}</span><span>0{projects.indexOf(project) + 1}</span></div>
            <h2>{project.name}</h2><p>{project.description[language]}</p>
            <Link className="text-link" to={`/projects/${project.slug}`}>{t('projects.view')} <ArrowUpRight size={16}/></Link>
          </article>
        ))}
      </div>
    </section>
  )
}
