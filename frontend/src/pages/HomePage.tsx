import { usePageTitle } from '../hooks/usePageTitle'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Services } from '../sections/Services'
import { Projects } from '../sections/Projects'
import { Process } from '../sections/Process'
import { Stack } from '../sections/Stack'
import { Team } from '../sections/Team'
import { Contact } from '../sections/Contact'

export function HomePage() {
  usePageTitle()
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Process />
      <Stack />
      <Team />
      <Contact />
    </>
  )
}
