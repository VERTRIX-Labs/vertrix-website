import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../data/projects'
import { useLang } from '../hooks/useLang'
import { SmartImage } from './SmartImage'

type Props = { project: Project; index: number; featured?: boolean; heading?: 'h2' | 'h3' }

export function ProjectCard({ project, index, featured = false, heading: Heading = 'h3' }: Props) {
  const { t } = useTranslation()
  const lang = useLang()
  const to = `/projects/${project.slug}`
  return (
    <article className={featured ? 'project-card featured' : 'project-card'}>
      <Link to={to} className="project-media shimmer" tabIndex={-1} aria-hidden="true">
        <SmartImage src={project.cover} alt="" width="1100" height="614" loading="lazy" />
        <span className={`status-badge ${project.status}`}><i />{t(`projects.status.${project.status}`)}</span>
      </Link>
      <div className="project-body">
        <div className="project-meta">
          <span>{t(`projects.typeLabels.${project.category}`)}</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <Heading><Link to={to}>{project.name}</Link></Heading>
        <p>{project.description[lang]}</p>
        <div className="tag-list">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div>
        <Link className="text-link" to={to}>{t('projects.view')} <ArrowUpRight size={16} /></Link>
      </div>
    </article>
  )
}
