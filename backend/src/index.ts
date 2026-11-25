import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import { fileURLToPath } from 'node:url'

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) })

// Etiquetas legibles para el correo. Si cambias un rango, cámbialo también en
// los translation.json del frontend (mismo id).
type Labels = Record<string, string>
const projectTypes: Labels = {
  'website': 'Sitio web',
  'webapp': 'Aplicación web',
  'custom': 'Software a medida',
  'database': 'Base de datos',
  'infrastructure': 'Infraestructura',
  'other': 'Otro',
}
const locations: Labels = { nicaragua: 'Nicaragua', abroad: 'Otro país' }
const clientTypes: Labels = { business: 'Empresa', personal: 'Emprendimiento personal' }
const budgets: Record<string, Record<string, Labels>> = {
  nicaragua: {
    personal: {
      'undefined': 'No definido',
      'lt150': 'Menos de US$150 (unos C$5,500)',
      '150-400': 'US$150–400 (C$5,500–14,600)',
      '400-800': 'US$400–800 (C$14,600–29,300)',
      'gt800': 'Más de US$800 (C$29,300+)',
    },
    business: {
      'undefined': 'No definido',
      'lt500': 'Menos de US$500 (unos C$18,300)',
      '500-1200': 'US$500–1,200 (C$18,300–43,900)',
      '1200-3000': 'US$1,200–3,000 (C$43,900–109,900)',
      'gt3000': 'Más de US$3,000 (C$109,900+)',
    },
  },
  abroad: {
    personal: {
      'undefined': 'No definido',
      'lt500': 'Menos de US$500',
      '500-1000': 'US$500–1,000',
      '1000-3000': 'US$1,000–3,000',
      'gt3000': 'Más de US$3,000',
    },
    business: {
      'undefined': 'No definido',
      'lt1k': 'Menos de US$1,000',
      '1k-3k': 'US$1,000–3,000',
      '3k-6k': 'US$3,000–6,000',
      'gt6k': 'Más de US$6,000',
    },
  },
}

// Solo acepta ids que existen en la tabla (ignora claves heredadas como "constructor").
function label(table: Labels | undefined, id: string) {
  return table && Object.hasOwn(table, id) ? table[id] : undefined
}

const app = express()
const port = Number(process.env.PORT ?? 3001)
const allowedOrigin = process.env.ALLOWED_ORIGIN

// Detrás de un proxy (Render, Railway, Nginx) hace falta para limitar por la IP real.
if (process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY))

app.use(express.json({ limit: '20kb' }))
app.use(cors({
  origin: allowedOrigin ? [allowedOrigin] : true,
  methods: ['POST'],
}))

const submissions = new Map<string, number[]>()

function rateLimit(ip: string) {
  const now = Date.now()
  const recent = (submissions.get(ip) ?? []).filter((time) => now - time < 15 * 60 * 1000)
  recent.push(now)
  submissions.set(ip, recent)
  return recent.length <= 5
}

function sanitize(value: unknown, maxLength: number) {
  return String(value ?? '').replace(/[<>]/g, '').trim().slice(0, maxLength)
}

app.post('/api/contact', async (req: Request, res: Response) => {
  const ip = req.ip ?? 'unknown'
  if (!rateLimit(ip)) {
    res.status(429).json({ error: 'Too many requests' })
    return
  }

  const name = sanitize(req.body?.name, 100)
  const email = sanitize(req.body?.email, 254)
  const type = label(projectTypes, sanitize(req.body?.type, 100))
  const locationId = sanitize(req.body?.location, 20)
  const clientTypeId = sanitize(req.body?.clientType, 20)
  const location = label(locations, locationId)
  const clientType = label(clientTypes, clientTypeId)
  const description = sanitize(req.body?.description, 3000)
  const company = sanitize(req.body?.company, 150)
  const budgetId = sanitize(req.body?.budget, 20)
  const budget = location && clientType ? label(budgets[locationId][clientTypeId], budgetId) : undefined
  const consent = req.body?.consent === true

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !type || !location || !clientType || description.length < 10 || !consent) {
    res.status(400).json({ error: 'Invalid form submission' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'vertrixdev@gmail.com'
  const fromEmail = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !fromEmail) {
    res.status(503).json({ error: 'Email delivery is not configured' })
    return
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Nueva consulta web: ${type} (${clientType}, ${location})`,
        text: `Nombre: ${name}\nCorreo: ${email}\nUbicación: ${location}\nTipo de cliente: ${clientType}\nEmpresa o emprendimiento: ${company || 'No indicado'}\nTipo de proyecto: ${type}\nPresupuesto: ${budget ?? 'No indicado'}\n\nDescripción:\n${description}`,
      }),
    })
    if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`)
    res.status(202).json({ accepted: true })
  } catch (error) {
    console.error('No se pudo enviar el correo:', error)
    res.status(502).json({ error: 'Email delivery unavailable' })
  }
})

app.listen(port, () => {
  console.log(`VERTRIX contact server listening on port ${port}`)
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    console.warn('AVISO: faltan RESEND_API_KEY o CONTACT_FROM_EMAIL en .env; no se enviarán correos.')
  }
})
