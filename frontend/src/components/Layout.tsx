import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Header } from './Header'
import { Footer } from './Footer'
import { CustomCursor } from './CustomCursor'
import { DetailSkeleton, HomeSkeleton, ProjectsSkeleton } from './Skeletons'

function RouteFallback() {
  const { pathname } = useLocation()
  if (pathname === '/') return <HomeSkeleton />
  if (pathname === '/projects') return <ProjectsSkeleton />
  return <DetailSkeleton />
}

export function Layout() {
  const { t } = useTranslation()
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">{t('skip')}</a>
      <CustomCursor />
      <Header />
      <main id="main" tabIndex={-1}><Suspense fallback={<RouteFallback />}><Outlet /></Suspense></main>
      <Footer />
    </MotionConfig>
  )
}
