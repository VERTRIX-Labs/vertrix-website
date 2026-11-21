import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

type FieldErrors = Partial<Record<'name' | 'email' | 'type' | 'description' | 'consent', string>>

export function ContactForm() {
  const { t } = useTranslation()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors: FieldErrors = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const type = String(data.get('type') ?? '')
    const description = String(data.get('description') ?? '').trim()
    if (name.length < 2) nextErrors.name = t('contact.validation.name')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t('contact.validation.email')
    if (!type) nextErrors.type = t('contact.validation.type')
    if (description.length < 10) nextErrors.description = t('contact.validation.description')
    if (!data.get('consent')) nextErrors.consent = t('contact.validation.consent')
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, type, description,
          company: String(data.get('company') ?? '').trim(),
          budget: String(data.get('budget') ?? ''),
          consent: true,
        }),
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      event.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label>{t('contact.name')}<input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
        <label>{t('contact.email')}<input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
        <label>{t('contact.company')}<input name="company" autoComplete="organization" /></label>
        <label>{t('contact.projectType')}<select name="type" defaultValue="" aria-invalid={Boolean(errors.type)}><option value="" disabled>—</option>{(t('contact.types', { returnObjects: true }) as string[]).map((item) => <option key={item}>{item}</option>)}</select>{errors.type && <small>{errors.type}</small>}</label>
        <label>{t('contact.budget')}<select name="budget" defaultValue=""><option value="" disabled>—</option>{(t('contact.budgets', { returnObjects: true }) as string[]).map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="full">{t('contact.description')}<textarea name="description" rows={5} aria-invalid={Boolean(errors.description)} />{errors.description && <small>{errors.description}</small>}</label>
      </div>
      <label className="consent"><input name="consent" type="checkbox" /><span>{t('contact.consent')}</span></label>
      {errors.consent && <small className="error-text">{errors.consent}</small>}
      {status === 'success' && <p className="form-status success" role="status">{t('contact.success')}</p>}
      {status === 'error' && <p className="form-status error" role="alert">{t('contact.error')}</p>}
      <button className="button primary" type="submit" disabled={status === 'loading'}>{status === 'loading' ? t('contact.submitting') : t('contact.submit')}</button>
    </form>
  )
}
