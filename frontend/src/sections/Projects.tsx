import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'

export function Projects() {
  const { t } = useTranslation()
  const featured = projects.length === 1
  return (
    <section id="projects" className="section">
      <Reveal className="section-heading split">
        <div><span className="eyebrow">{t('projects.eyebrow')}</span><h2>{t('projects.title')}</h2></div>
        <Link className="text-link" to="/projects">{t('projects.viewAll')} <ArrowUpRight size={16} /></Link>
      </Reveal>
      {projects.length === 0 ? (
        <div className="empty-state">
          <h2>{t('projects.empty.title')}</h2>
          <p>{t('projects.empty.body')}</p>
          <Link className="button secondary" to="/#contact">{t('nav.cta')}</Link>
        </div>
      ) : (
        <div className={featured ? 'project-grid single' : 'project-grid'}>
          {projects.map((p, i) => <Reveal key={p.slug}><ProjectCard project={p} index={i} featured={featured} /></Reveal>)}
        </div>
      )}
    </section>
  )
}
