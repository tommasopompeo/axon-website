'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Instagram, Mail, MapPin } from 'lucide-react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  Input,
  Textarea,
  Select,
  CheckboxField,
} from '@/components/ui/Field'
import { FORM_ENDPOINT, SOCIAL } from '@/lib/links'

interface FormData {
  nome: string
  email: string
  oggetto: string
  messaggio: string
  consenso: boolean
  _honey: string
}

const empty: FormData = {
  nome: '', email: '', oggetto: '', messaggio: '', consenso: false, _honey: '',
}

function validate(d: FormData): Record<string, string> {
  const e: Record<string, string> = {}
  if (!d.nome.trim()) e.nome = 'Campo obbligatorio.'
  if (!d.email.trim()) e.email = 'Campo obbligatorio.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Inserisci un indirizzo email valido.'
  if (!d.messaggio.trim()) e.messaggio = 'Campo obbligatorio.'
  if (!d.consenso) e.consenso = 'Accetta la privacy policy per procedere.'
  return e
}

export default function ContattiContent() {
  const [data, setData] = useState<FormData>(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState(false)

  function set<K extends keyof FormData>(k: K, v: FormData[K]) {
    setData((prev) => ({ ...prev, [k]: v }))
    if (errors[k as string]) setErrors((prev) => { const next = { ...prev }; delete next[k as string]; return next })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (data._honey) return
    const errs = validate(data)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    setServerError(false)
    try {
      if (FORM_ENDPOINT === '#') {
        setSuccess(true)
      } else {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, _honey: undefined }),
        })
        if (!res.ok) throw new Error('error')
        setSuccess(true)
      }
    } catch {
      setServerError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <Section id="top">
        <Container>
          <div className="flex flex-col gap-5 max-w-3xl">
            <Reveal trigger="mount">
              <h1
                className="font-bold"
                style={{ fontSize: 'var(--fs-display)', lineHeight: 1.04, letterSpacing: '-0.02em' }}
              >
                Contatti
              </h1>
            </Reveal>
            <Reveal trigger="mount" delay={0.12}>
              <p style={{ fontSize: 'var(--fs-lead)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Domande su Axon, ordini o assistenza? Scrivici.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Form + box contatti ── */}
      <Section id="contatto" elevated className="!pt-0">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16 lg:items-start">

            {/* Form */}
            <Reveal>
              {success ? (
                <div
                  className="flex flex-col gap-3 p-8"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}
                >
                  <p className="font-semibold" style={{ fontSize: 'var(--fs-h3)' }}>Messaggio inviato.</p>
                  <p style={{ fontSize: 'var(--fs-body)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    Ti risponderemo via email al più presto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* honeypot */}
                  <input
                    type="text"
                    name="_honey"
                    value={data._honey}
                    onChange={(e) => set('_honey', e.target.value)}
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{ display: 'none' }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldGroup>
                      <FieldLabel htmlFor="ct-nome" required>Nome e cognome</FieldLabel>
                      <Input
                        id="ct-nome" type="text" autoComplete="name"
                        value={data.nome} onChange={(e) => set('nome', e.target.value)}
                        aria-required="true"
                        aria-describedby={errors.nome ? 'ct-nome-err' : undefined}
                        aria-invalid={!!errors.nome}
                      />
                      {errors.nome && <FieldError id="ct-nome-err">{errors.nome}</FieldError>}
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="ct-email" required>Email</FieldLabel>
                      <Input
                        id="ct-email" type="email" autoComplete="email"
                        value={data.email} onChange={(e) => set('email', e.target.value)}
                        aria-required="true"
                        aria-describedby={errors.email ? 'ct-email-err' : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <FieldError id="ct-email-err">{errors.email}</FieldError>}
                    </FieldGroup>
                  </div>

                  <FieldGroup>
                    <FieldLabel htmlFor="ct-oggetto">Oggetto</FieldLabel>
                    <Select
                      id="ct-oggetto"
                      value={data.oggetto} onChange={(e) => set('oggetto', e.target.value)}
                    >
                      <option value="">— Seleziona —</option>
                      <option>Informazioni prodotto</option>
                      <option>Ordine/spedizione</option>
                      <option>Assistenza</option>
                      <option>Altro</option>
                    </Select>
                  </FieldGroup>

                  <FieldGroup>
                    <FieldLabel htmlFor="ct-messaggio" required>Messaggio</FieldLabel>
                    <Textarea
                      id="ct-messaggio" rows={6}
                      value={data.messaggio} onChange={(e) => set('messaggio', e.target.value)}
                      aria-required="true"
                      aria-describedby={errors.messaggio ? 'ct-messaggio-err' : undefined}
                      aria-invalid={!!errors.messaggio}
                    />
                    {errors.messaggio && <FieldError id="ct-messaggio-err">{errors.messaggio}</FieldError>}
                  </FieldGroup>

                  <div className="flex flex-col gap-1">
                    <CheckboxField
                      id="ct-consenso"
                      checked={data.consenso}
                      onChange={(v) => set('consenso', v)}
                      errorId={errors.consenso ? 'ct-consenso-err' : undefined}
                    >
                      Accetto il trattamento dei dati personali secondo la{' '}
                      <Link href="#" style={{ color: 'var(--text)' }}>Privacy Policy</Link> di Axon-Tech S.r.l.
                    </CheckboxField>
                    {errors.consenso && <FieldError id="ct-consenso-err">{errors.consenso}</FieldError>}
                  </div>

                  {serverError && (
                    <p role="alert" style={{ fontSize: 'var(--fs-caption)', color: 'var(--brand)' }}>
                      Errore nell'invio. Riprova o scrivici direttamente a info@axon-tech.it.
                    </p>
                  )}

                  <div>
                    <Button type="submit" variant="primary" size="lg" disabled={submitting}>
                      {submitting ? 'Invio in corso…' : 'Invia messaggio'}
                    </Button>
                  </div>
                </form>
              )}
            </Reveal>

            {/* Box contatti */}
            <Reveal delay={0.14}>
              <div className="flex flex-col gap-6">
                <div
                  className="flex flex-col gap-5 p-6 lg:p-7"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}
                >
                  <h2 className="font-semibold" style={{ fontSize: 'var(--fs-h3)' }}>
                    Contatti diretti
                  </h2>

                  <div className="flex flex-col gap-4">
                    <a
                      href="mailto:info@axon-tech.it"
                      className="flex items-center gap-3 link-muted"
                    >
                      <span
                        className="inline-flex items-center justify-center shrink-0"
                        style={{ width: 36, height: 36, borderRadius: '999px', background: 'var(--brand-soft)', color: 'var(--brand)' }}
                      >
                        <Mail size={16} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span style={{ fontSize: 'var(--fs-body)' }}>info@axon-tech.it</span>
                    </a>

                    <div className="flex items-start gap-3">
                      <span
                        className="inline-flex items-center justify-center shrink-0"
                        style={{ width: 36, height: 36, borderRadius: '999px', background: 'var(--brand-soft)', color: 'var(--brand)' }}
                      >
                        <MapPin size={16} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <address
                        style={{ fontSize: 'var(--fs-body)', color: 'var(--text-muted)', fontStyle: 'normal', lineHeight: 1.55 }}
                      >
                        Axon-Tech S.r.l.<br />
                        Via Verdi 73<br />
                        31100 Treviso (TV)
                      </address>
                    </div>
                  </div>

                  {/* Solo Instagram */}
                  {SOCIAL.instagram !== '#' ? (
                    <a
                      href={SOCIAL.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 link-muted"
                      aria-label="Axon su Instagram"
                    >
                      <Instagram size={18} strokeWidth={1.75} aria-hidden="true" />
                      <span style={{ fontSize: 'var(--fs-body)' }}>Instagram</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2" style={{ color: 'var(--text-subtle)' }}>
                      <Instagram size={18} strokeWidth={1.75} aria-hidden="true" />
                      <span style={{ fontSize: 'var(--fs-body)' }}>Instagram</span>
                    </div>
                  )}
                </div>

                {/* Nota legale */}
                <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)', lineHeight: 1.6 }}>
                  Axon è un dispositivo medico di Classe I. Leggere le istruzioni per l'uso.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
