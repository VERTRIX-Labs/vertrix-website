import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

type Field = 'name' | 'email' | 'location' | 'clientType' | 'type' | 'description' | 'consent'
type FieldErrors = Partial<Record<Field, string>>

export function ContactForm() {
  const { t } = useTranslation()
  const [location, setLocation] = useState('')
  const [clientType, setClientType] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const types = Object.keys(t('contact.types', { returnObjects: true }) as Record<string, string>)
  // Los rangos dependen de dónde está el cliente y de si es empresa o emprendimiento.
  const budgetKey = location && clientType ? `contact.budgets.${location}.${clientType}` : ''
  const budgets = budgetKey ? Object.keys(t(budgetKey, { returnObjects: true }) as Record<string, string>) : []

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Keep a reference: `event.currentTarget` is null once we `await`.
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const type = String(data.get('type') ?? '')
    const description = String(data.get('description') ?? '').trim()

    const next: FieldErrors = {}
    if (name.length < 2) next.name = t('contact.validation.name')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t('contact.validation.email')
    if (!location) next.location = t('contact.validation.location')
    if (!clientType) next.clientType = t('contact.validation.clientType')
    if (!type) next.type = t('contact.validation.type')
    if (description.length < 10) next.description = t('contact.validation.description')
    if (!data.get('consent')) next.consent = t('contact.validation.consent')
    setErrors(next)

    const firstInvalid = (Object.keys(next) as Field[])[0]
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('loading')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, type, description, location, clientType,
          company: String(data.get('company') ?? '').trim(),
          budget: String(data.get('budget') ?? ''),
          consent: true,
        }),
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      form.reset()
      setLocation('')
      setClientType('')
    } catch {
      setStatus('error')
    }
  }

  const err = (field: Field) => errors[field]
  const describe = (field: Field) => (err(field) ? `${field}-error` : undefined)
  const FieldError = ({ field }: { field: Field }) =>
    err(field) ? <small id={`${field}-error`} role="alert">{err(field)}</small> : null

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label>{t('contact.name')}
          <input name="name" autoComplete="name" aria-invalid={Boolean(err('name'))} aria-describedby={describe('name')} />
          <FieldError field="name" />
        </label>
        <label>{t('contact.email')}
          <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(err('email'))} aria-describedby={describe('email')} />
          <FieldError field="email" />
        </label>
        <label>{t('contact.location')}
          <select name="location" value={location} onChange={(e) => setLocation(e.target.value)} aria-invalid={Boolean(err('location'))} aria-describedby={describe('location')}>
            <option value="" disabled>{t('contact.select')}</option>
            {['nicaragua', 'abroad'].map((id) => <option key={id} value={id}>{t(`contact.locations.${id}`)}</option>)}
          </select>
          <FieldError field="location" />
        </label>
        <label>{t('contact.clientType')}
          <select name="clientType" value={clientType} onChange={(e) => setClientType(e.target.value)} aria-invalid={Boolean(err('clientType'))} aria-describedby={describe('clientType')}>
            <option value="" disabled>{t('contact.select')}</option>
            {['business', 'personal'].map((id) => <option key={id} value={id}>{t(`contact.clientTypes.${id}`)}</option>)}
          </select>
          <FieldError field="clientType" />
        </label>
        <label>{t(clientType === 'personal' ? 'contact.venture' : 'contact.company')}
          <input name="company" autoComplete="organization" />
        </label>
        <label>{t('contact.projectType')}
          <select name="type" defaultValue="" aria-invalid={Boolean(err('type'))} aria-describedby={describe('type')}>
            <option value="" disabled>{t('contact.select')}</option>
            {types.map((id) => <option key={id} value={id}>{t(`contact.types.${id}`)}</option>)}
          </select>
          <FieldError field="type" />
        </label>
        <label>{t('contact.budget')}
          {/* key: al cambiar de grupo se borra el rango elegido antes */}
          <select key={budgetKey} name="budget" defaultValue="" disabled={!budgetKey}>
            <option value="" disabled>{t(budgetKey ? 'contact.select' : 'contact.budgetHint')}</option>
            {budgets.map((id) => <option key={id} value={id}>{t(`${budgetKey}.${id}`)}</option>)}
          </select>
        </label>
        <label className="full">{t('contact.description')}
          <textarea name="description" rows={5} aria-invalid={Boolean(err('description'))} aria-describedby={describe('description')} />
          <FieldError field="description" />
        </label>
      </div>
      <label className="consent">
        <input name="consent" type="checkbox" aria-invalid={Boolean(err('consent'))} aria-describedby={describe('consent')} />
        <span>{t('contact.consent')}</span>
      </label>
      <FieldError field="consent" />
      {status === 'success' && <p className="form-status success" role="status">{t('contact.success')}</p>}
      {status === 'error' && <p className="form-status error" role="alert">{t('contact.error')}</p>}
      <button className="button primary" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? t('contact.submitting') : t('contact.submit')}
      </button>
    </form>
  )
}
