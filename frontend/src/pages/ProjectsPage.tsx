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
      <div className={featured ? 'project-grid single' : 'project-grid'}>
        {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} featured={featured} heading="h2" />)}
      </div>
    </section>
  )
}
