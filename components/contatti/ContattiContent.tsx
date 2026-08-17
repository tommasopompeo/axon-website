'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import {
  FieldGroup,
  FieldLabel,
  FieldError,
  Input,
  Textarea,
  Select,
  CheckboxField,
} from '@/components/ui/Field'
import { AccordionItem } from '@/components/ui/Accordion'
import { FORM_ENDPOINT } from '@/lib/links'
import { faqs, type Faq } from '@/lib/faqs'

// Sottoinsieme delle FAQ della Home mostrato accanto al form (stessa sorgente: lib/faqs.ts).
const contattiFaqs: Faq[] = ['come-si-usa', 'contenuto-kit', 'lavaggio']
  .map((id) => faqs.find((f) => f.id === id))
  .filter((f): f is Faq => f !== undefined)

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
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _honey: undefined, source: 'contatti' }),
      })
      if (!res.ok) throw new Error('error')
      setSuccess(true)
    } catch {
      setServerError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <Section id="top" background="black">
        <Container>
          <div className="flex flex-col gap-5 max-w-3xl">
            <Reveal trigger="mount">
              <h1 className="text-display">
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

      {/* ── FAQ + Form ── */}
      <Section id="contatto" background="black" className="!pt-0">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20 lg:items-start">
            <div className="flex flex-col gap-5">
              <Reveal>
                <h2 className="text-h2">
                  Domande frequenti
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <div>
                  {contattiFaqs.map(({ id, q, a }, i) => (
                    <AccordionItem
                      key={id}
                      title={q}
                      isOpen={openFaq === i}
                      onToggle={() => setOpenFaq((prev) => (prev === i ? null : i))}
                    >
                      {a}
                    </AccordionItem>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              {success ? (
                <Card className="flex flex-col gap-3 p-8">
                  <p className="font-semibold" style={{ fontSize: 'var(--fs-h3)' }}>Messaggio inviato.</p>
                  <p style={{ fontSize: 'var(--fs-body)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    Ti risponderemo via email al più presto.
                  </p>
                </Card>
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
                      <Link href="/privacy" style={{ color: 'var(--text)' }}>Privacy Policy</Link> di Axon-Tech S.r.l.
                    </CheckboxField>
                    {errors.consenso && <FieldError id="ct-consenso-err">{errors.consenso}</FieldError>}
                  </div>

                  {serverError && (
                    <p role="alert" style={{ fontSize: 'var(--fs-caption)', color: 'var(--brand)' }}>
                      Errore nell'invio. Riprova o scrivici direttamente a info@axon-tech.it.
                    </p>
                  )}

                  <div>
                    <Button type="submit" variant="white" size="lg" disabled={submitting}>
                      {submitting ? 'Invio in corso…' : 'Invia messaggio'}
                    </Button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
