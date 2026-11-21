export type Project = {
  slug: string
  name: string
  category: 'independent' | 'academic' | 'collaborative' | 'client' | 'web'
  description: Record<'en' | 'es', string>
  technologies: string[]
  placeholder: boolean
  overview: Record<'en' | 'es', string>
  problem: Record<'en' | 'es', string>
  solution: Record<'en' | 'es', string>
  features: Record<'en' | 'es', string[]>
  demoUrl?: string
  repoUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'ecos-de-nicaragua',
    name: 'Ecos de Nicaragua',
    category: 'web',
    description: {
      en: 'An interactive web platform bringing Nicaraguan legends to life. The project is in development.',
      es: 'Una plataforma web interactiva que da vida a las leyendas nicaragüenses. El proyecto está en desarrollo.',
    },
    technologies: ['React', 'Vite', 'Node.js', 'Express', 'MySQL', 'SVG'],
    placeholder: true,
    overview: {
      en: 'An in-progress interactive platform focused on Nicaraguan legends, with a web client and REST API.',
      es: 'Una plataforma interactiva en desarrollo sobre leyendas nicaragüenses, con cliente web y API REST.',
    },
    problem: {
      en: 'Present Nicaraguan legends in an accessible, interactive digital experience.',
      es: 'Presentar las leyendas nicaragüenses en una experiencia digital accesible e interactiva.',
    },
    solution: {
      en: 'A web platform under active development, including a custom SVG map of Nicaragua with 15 departments and two autonomous regions.',
      es: 'Una plataforma web en desarrollo que incluye un mapa SVG propio de Nicaragua con 15 departamentos y dos regiones autónomas.',
    },
    features: {
      en: ['Interactive cultural platform', 'Custom SVG map of Nicaragua', 'React client and REST API'],
      es: ['Plataforma cultural interactiva', 'Mapa SVG propio de Nicaragua', 'Cliente React y API REST'],
    },
    repoUrl: 'https://github.com/edgardcuevas/ecos-de-Nicaragua',
  },
]
