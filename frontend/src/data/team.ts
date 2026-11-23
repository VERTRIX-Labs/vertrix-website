export type TeamMember = {
  id: number
  name: string
  role: Record<'en' | 'es', string>
  bio: Record<'en' | 'es', string>
  email?: string
  githubUrl?: string
  linkedinUrl?: string
  portfolioUrl?: string
}

// Only confirmed members live here. Add the others as their profiles arrive.
export const team: TeamMember[] = [
  {
    id: 1,
    name: 'Edgard Francisco Cuevas Guerrero',
    role: { en: 'Co-founder', es: 'Cofundador' },
    bio: {
      en: 'Systems engineering student focused on backend, web development and Linux servers.',
      es: 'Estudiante de Ingeniería en Sistemas enfocado en backend, desarrollo web y servidores Linux.',
    },
    email: 'cuevasedgard45@gmail.com',
    githubUrl: 'https://github.com/edgardcuevas',
    linkedinUrl: 'https://www.linkedin.com/in/edgardcuevas-dev/',
    portfolioUrl: 'https://edgardcuevas.github.io/portfolio/',
  },
]

// Seats still pending a profile (shown as a single "coming soon" card).
export const PENDING_MEMBERS = 3
