import { useTranslation } from 'react-i18next'
import { Mail } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { ContactForm } from '../components/ContactForm'

export function Contact() {
  const { t } = useTranslation()
  return (
    <section id="contact" className="section contact-section">
      <Reveal className="contact-heading">
        <span className="eyebrow">{t('contact.eyebrow')}</span>
        <h2>{t('contact.title')}</h2>
        <p>{t('contact.intro')}</p>
        <p className="contact-direct">{t('contact.direct')} <a href="mailto:vertrixdev@gmail.com"><Mail size={15} aria-hidden="true" /> vertrixdev@gmail.com</a></p>
      </Reveal>
      <Reveal delay={0.1}><ContactForm /></Reveal>
    </section>
  )
}
