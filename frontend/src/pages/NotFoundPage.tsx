import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../hooks/usePageTitle'

export function NotFoundPage() {
  const { t } = useTranslation()
  usePageTitle('404')
  return (
    <section className="not-found">
      <span className="code">404</span>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.description')}</p>
      <Link className="button primary" to="/">{t('notFound.back')}</Link>
    </section>
  )
}
