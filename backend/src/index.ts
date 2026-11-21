import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import { fileURLToPath } from 'node:url'

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) })

const app = express()
const port = Number(process.env.PORT ?? 3001)
const allowedOrigin = process.env.ALLOWED_ORIGIN

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
  const type = sanitize(req.body?.type, 100)
  const description = sanitize(req.body?.description, 3000)
  const company = sanitize(req.body?.company, 150)
  const budget = sanitize(req.body?.budget, 100)
  const consent = req.body?.consent === true

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !type || description.length < 10 || !consent) {
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
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `VERTRIX website inquiry — ${type}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nProject type: ${type}\nBudget: ${budget || 'Not provided'}\n\nDescription:\n${description}`,
      }),
    })
    if (!response.ok) throw new Error(`Resend returned ${response.status}`)
    res.status(202).json({ accepted: true })
  } catch {
    res.status(502).json({ error: 'Email delivery unavailable' })
  }
})

app.listen(port, () => {
  console.log(`VERTRIX contact server listening on port ${port}`)
})
