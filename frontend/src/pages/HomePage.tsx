import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Braces, CloudCog, Code2, Database, LayoutPanelTop, ServerCog } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { ContactForm } from '../components/ContactForm'
import { projects } from '../data/projects'
import { team } from '../data/team'

const serviceIcons = [LayoutPanelTop, Code2, ServerCog, Braces, Database, CloudCog]

export function HomePage() {
  const { t, i18n } = useTranslation()
  const language = i18n.language.startsWith('es') ? 'es' : 'en'
  const confirmedTeam = team.filter((member) => member.name)
  const services = ['web', 'frontend', 'backend', 'software', 'database', 'deployment']
  const stack = [
    { category: 'frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React'] },
    { category: 'backend', items: ['Node.js', 'Express'] },
    { category: 'database', items: ['MySQL', 'PostgreSQL'] },
    { category: 'tools', items: ['Git', 'GitHub', 'Linux'] },
  ]

  return (
    <>
      <section className="hero-section">
        <div className="hero-grid" aria-hidden="true" />
        <motion.div className="hero-orb orb-one" animate={{ y: [0, -18, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="hero-orb orb-two" animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="hero-content">
          <motion.span className="hero-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>{t('hero.eyebrow')}</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.75 }}>{t('hero.title').slice(0, -1)}<em>{t('hero.title').slice(-1)}</em></motion.h1>
          <p className="hero-slogan">Code. Build. Innovate.</p>
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>{t('hero.subtitle')}</motion.p>
          <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}>{t('hero.description')}</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}>
            <Link className="button primary" to="/projects">{t('hero.primary')} <ArrowUpRight size={17}/></Link>
            <Link className="button secondary" to="/#contact">{t('hero.secondary')}</Link>
          </motion.div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.25 }}>
          <div className="hero-visual-frame">
            <img src="/images/brand/vertrix-mark.png" alt="" />
            <span className="hero-visual-coordinate">12°08' N · 86°15' W</span>
          </div>
          <div className="hero-caption"><span className="live-dot" /> MANAGUA, NICARAGUA <span>·</span> DIGITAL STUDIO</div>
        </motion.div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about"><span>Scroll</span><ArrowDown size={16}/></a>
      </section>

      <section id="about" className="section about-section">
        <Reveal className="section-heading"><span className="eyebrow">{t('about.eyebrow')}</span><h2>{t('about.title')}</h2></Reveal>
        <Reveal className="about-copy"><p>{t('about.description')}</p></Reveal>
        <div className="about-cards">
          <Reveal><article><span>01</span><h3>{t('about.missionLabel')}</h3><p>{t('about.mission')}</p></article></Reveal>
          <Reveal><article><span>02</span><h3>{t('about.visionLabel')}</h3><p>{t('about.vision')}</p></article></Reveal>
        </div>
        <Reveal className="values-line">{t('about.values')}</Reveal>
      </section>

      <section id="services" className="section">
        <Reveal className="section-heading split"><div><span className="eyebrow">{t('services.eyebrow')}</span><h2>{t('services.title')}</h2></div><span className="section-index">01 / 06</span></Reveal>
        <div className="service-grid">
          {services.map((key, index) => {
            const Icon = serviceIcons[index]
            return <Reveal key={key}><article className="service-card"><div className="service-top"><Icon /><span>0{index + 1}</span></div><h3>{t(`services.items.${key}.title`)}</h3><p>{t(`services.items.${key}.description`)}</p></article></Reveal>
          })}
        </div>
      </section>

      <section id="projects" className="section">
        <Reveal className="section-heading split"><div><span className="eyebrow">{t('projects.eyebrow')}</span><h2>{t('projects.title')}</h2></div><Link className="text-link" to="/projects">{t('projects.viewAll')} <ArrowUpRight size={16}/></Link></Reveal>
        <div className={`project-grid${projects.length === 1 ? ' single-project' : ''}`}>
          {projects.map((project) => <Reveal key={project.slug}><article className="project-card"><div className={`project-preview ${project.slug}`}><div className="preview-grid" /><span>{project.name}</span></div><div className="project-meta"><span>{t(`projects.typeLabels.${project.category}`)}</span><span>0{projects.indexOf(project) + 1}</span></div><h3>{project.name}</h3><p>{project.description[language]}</p><Link className="text-link" to={`/projects/${project.slug}`}>{t('projects.view')} <ArrowUpRight size={16}/></Link></article></Reveal>)}
        </div>
      </section>

      <section id="process" className="section">
        <Reveal className="section-heading"><span className="eyebrow">{t('process.eyebrow')}</span><h2>{t('process.title')}</h2></Reveal>
        <div className="process-line">
          {(t('process.steps', { returnObjects: true }) as Array<{title:string; description:string}>).map((step, index) => <Reveal key={step.title}><article><div className="process-number">0{index + 1}</div><h3>{step.title}</h3><p>{step.description}</p></article></Reveal>)}
        </div>
      </section>

      <section id="technologies" className="section">
        <Reveal className="section-heading"><span className="eyebrow">{t('stack.eyebrow')}</span><h2>{t('stack.title')}</h2></Reveal>
        <div className="stack-grid">
          {stack.map((group) => <Reveal key={group.category}><article><h3>{t(`stack.categories.${group.category}`)}</h3><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div></article></Reveal>)}
        </div>
      </section>

      <section id="team" className="section">
        <Reveal className="section-heading"><span className="eyebrow">{t('team.eyebrow')}</span><h2>{t('team.title')}</h2></Reveal>
        <div className={`team-grid${confirmedTeam.length === 1 ? ' single-member' : ''}`}>
          {confirmedTeam.map((member) => <Reveal key={member.id}><article className="team-card"><div className="team-avatar" aria-hidden="true"><span className="avatar-silhouette" /></div><div className="team-info"><span>0{member.id}</span><h3>{member.name}</h3><p>{member.role?.[language]}</p><p className="team-bio">{member.bio[language]}</p><div className="team-links">{member.githubUrl && <a href={member.githubUrl} target="_blank" rel="noreferrer">{t('team.github')} ↗</a>} {member.linkedinUrl && <a href={member.linkedinUrl} target="_blank" rel="noreferrer">{t('team.linkedin')} ↗</a>} {member.portfolioUrl && <a href={member.portfolioUrl} target="_blank" rel="noreferrer">{t('team.portfolio')} ↗</a>} {member.email && <a href={`mailto:${member.email}`}>{t('team.email')} ↗</a>}</div></div></article></Reveal>)}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <Reveal className="contact-heading"><span className="eyebrow">{t('contact.eyebrow')}</span><h2>{t('contact.title')}</h2></Reveal>
        <Reveal><ContactForm /></Reveal>
      </section>
    </>
  )
}
