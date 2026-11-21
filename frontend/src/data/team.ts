export type TeamMember = {
  id: number
  name: string | null
  role: Record<'en' | 'es', string> | null
  bio: Record<'en' | 'es', string>
  email: string | null
  githubUrl: string | null
  linkedinUrl: string | null
  portfolioUrl: string | null
}

export const team: TeamMember[] = [
  {
    id: 1,
    name: 'Edgard Francisco Cuevas Guerrero',
    role: { en: 'Co-founder', es: 'Cofundador' },
    bio: {
      en: 'Co-founder of VERTRIX.',
      es: 'Cofundador de VERTRIX.',
    },
    email: 'cuevasedgard45@gmail.com',
    githubUrl: 'https://github.com/edgardcuevas',
    linkedinUrl: 'https://www.linkedin.com/in/edgardcuevas-dev/',
    portfolioUrl: 'https://edgardcuevas.github.io/portfolio/',
  },
  { id: 2, name: null, role: null, bio: { en: 'Team member profile pending.', es: 'Perfil de integrante pendiente.' }, email: null, githubUrl: null, linkedinUrl: null, portfolioUrl: null },
  { id: 3, name: null, role: null, bio: { en: 'Team member profile pending.', es: 'Perfil de integrante pendiente.' }, email: null, githubUrl: null, linkedinUrl: null, portfolioUrl: null },
  { id: 4, name: null, role: null, bio: { en: 'Team member profile pending.', es: 'Perfil de integrante pendiente.' }, email: null, githubUrl: null, linkedinUrl: null, portfolioUrl: null },
]
