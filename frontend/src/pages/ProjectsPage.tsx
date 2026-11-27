import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { usePageTitle } from '../hooks/usePageTitle'

export function ProjectsPage() {
  const { t } = useTranslation()
  usePageTitle(t('nav.projects'))
  const featured = projects.length === 1
  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">{t('projects.eyebrow')}</span><h1>{t('projects.title')}</h1></div>
      {projects.length === 0 ? (
        <div className="empty-state">
          <h2>{t('projects.empty.title')}</h2>
          <p>{t('projects.empty.body')}</p>
          <Link className="button secondary" to="/#contact">{t('nav.cta')}</Link>
        </div>
      ) : (
        <div className={featured ? 'project-grid single' : 'project-grid'}>
          {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} featured={featured} heading="h2" />)}
        </div>
      )}
    </section>
  )
}
