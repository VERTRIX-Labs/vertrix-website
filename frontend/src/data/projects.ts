type Bilingual = Record<'en' | 'es', string>

export type Project = {
  slug: string
  name: string
  category: 'independent' | 'academic' | 'collaborative' | 'client' | 'web'
  status: 'inDevelopment' | 'live'
  description: Bilingual
  technologies: string[]
  overview: Bilingual
  problem: Bilingual
  solution: Bilingual
  features: Record<'en' | 'es', string[]>
  cover: string
  coverAlt: Bilingual
  screenshot?: string
  gallery?: { src: string; title: string }[]
  demoUrl?: string
  repoUrl?: string
}

const ecos = '/images/projects/ecos'

export const projects: Project[] = [
  {
    slug: 'ecos-de-nicaragua',
    name: 'Ecos de Nicaragua',
    category: 'web',
    status: 'inDevelopment',
    description: {
      en: 'An interactive web platform bringing Nicaraguan legends to life: read them, find them on the map and put yourself to the test.',
      es: 'Una plataforma web interactiva que da vida a las leyendas nicaragüenses: léelas, ubícalas en el mapa y ponte a prueba.',
    },
    technologies: ['React', 'Vite', 'Node.js', 'Express', 'MySQL', 'SVG'],
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
      en: ['Legend library with illustrated covers', 'Custom SVG map of Nicaragua', 'Trivia and games', '"Locate the legend" challenge', 'Plans and user accounts', 'React client and REST API'],
      es: ['Biblioteca de leyendas con portadas ilustradas', 'Mapa SVG propio de Nicaragua', 'Trivias y juegos', 'Reto «Ubica la leyenda»', 'Planes y cuentas de usuario', 'Cliente React y API REST'],
    },
    cover: `${ecos}/el-cadejo.webp`,
    coverAlt: {
      en: 'Illustrated book page of El Cadejo, a white wolf under a full moon',
      es: 'Página ilustrada de El Cadejo, un lobo blanco bajo la luna llena',
    },
    screenshot: `${ecos}/home-screenshot.webp`,
    gallery: [
      { src: `${ecos}/la-mocuana.webp`, title: 'La Mocuana' },
      { src: `${ecos}/el-cadejo.webp`, title: 'El Cadejo' },
      { src: `${ecos}/la-cegua.webp`, title: 'La Cegua' },
      { src: `${ecos}/la-llorona.webp`, title: 'La Llorona' },
      { src: `${ecos}/la-carreta-nagua.webp`, title: 'La Carreta Nagua' },
      { src: `${ecos}/el-padre-sin-cabeza.webp`, title: 'El Padre sin Cabeza' },
    ],
    repoUrl: 'https://github.com/edgardcuevas/ecos-de-Nicaragua',
  },
]
