import { useTranslation } from 'react-i18next'
import type { CSSProperties, ReactNode } from 'react'

const Bar = ({ w = '100%', h = 14, style }: { w?: string | number; h?: number; style?: CSSProperties }) => (
  <span className="sk" style={{ width: w, height: h, ...style }} />
)

function Wrapper({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  return <div role="status" aria-busy="true" aria-label={t('loading')}>{children}</div>
}

function HeroSkeleton() {
  return (
    <section className="hero-section sk-hero">
      <div className="hero-content">
        <Bar w={190} h={12} />
        <Bar w="min(520px, 90%)" h={96} style={{ margin: '24px 0 26px' }} />
        <Bar w={340} h={28} />
        <div className="sk-stack"><Bar w="min(520px, 100%)" /><Bar w="min(430px, 90%)" /></div>
        <div className="hero-actions"><Bar w={190} h={48} /><Bar w={110} h={48} /></div>
      </div>
      <div className="hero-visual"><span className="sk sk-circle" /></div>
    </section>
  )
}

function SectionSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <section className="section">
      <Bar w={130} h={12} />
      <Bar w="min(560px, 90%)" h={52} style={{ margin: '18px 0 48px' }} />
      <div className="sk-cards">{Array.from({ length: cards }, (_, i) => <span key={i} className="sk sk-card" />)}</div>
    </section>
  )
}

export function HomeSkeleton() {
  return <Wrapper><HeroSkeleton /><SectionSkeleton /></Wrapper>
}

export function ProjectsSkeleton() {
  return (
    <Wrapper>
      <section className="page-section">
        <Bar w={130} h={12} />
        <Bar w="min(640px, 90%)" h={72} style={{ margin: '18px 0 56px' }} />
        <span className="sk sk-feature" />
      </section>
    </Wrapper>
  )
}

export function DetailSkeleton() {
  return (
    <Wrapper>
      <div className="project-detail">
        <Bar w={90} h={14} style={{ marginBottom: 48 }} />
        <Bar w={200} h={14} />
        <Bar w="min(620px, 90%)" h={96} style={{ margin: '20px 0' }} />
        <div className="sk-stack"><Bar w="min(600px, 100%)" /><Bar w="min(480px, 85%)" /></div>
        <span className="sk sk-shot" />
      </div>
    </Wrapper>
  )
}
