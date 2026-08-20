'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
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
import { submitContact } from '@/lib/contact'
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
      await submitContact('contatti', {
        nome: data.nome,
        email: data.email,
        oggetto: data.oggetto,
        messaggio: data.messaggio,
      })
      setSuccess(true)
    } catch {
      setServerError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* ── Hero — niente hero pinnata qui (Section, non PageHero), stesso
          pattern di Aziende/Professionisti. Font-size e gap per fascia:
          38px/18px mobile, 52px/18px tablet, invariati da lg. ── */}
      <Section id="top" background="black">
        <Container>
          <div className="flex flex-col gap-[18px] lg:gap-5 max-w-3xl">
            <Reveal trigger="mount">
              <h1 className="text-display text-[2.375rem] md:text-[3.25rem] lg:[font-size:clamp(3.25rem,7vw,5.2rem)]">
                Contatti
              </h1>
            </Reveal>
            <Reveal trigger="mount" delay={0.12}>
              <p className="text-[1.125rem] md:text-[1.25rem]" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Domande su Axon, ordini o assistenza? Scrivici.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── FAQ + Form — sotto md: form prima delle FAQ (nel DOM desktop la
          colonna FAQ precede il form: sotto 1024 tre accordion spingevano
          il primo campo a ~600px dall'inizio; qui l'intento è scrivere, non
          leggere). Da md: torna l'ordine desktop (FAQ a sinistra, 320px —
          380px invariato da lg), via order-* invece di riordinare il DOM,
          così da md in su `order-none` riproduce esattamente il naturale
          ordine desktop (v. "Contatti - Mobile & Tablet.dc.html" nota 01). ── */}
      <Section id="contatto" background="black" className="!pt-0">
        <Container>
          <div className="grid grid-cols-1 gap-11 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20 items-start">
            <div className="order-2 md:order-none flex flex-col gap-4 lg:gap-5">
              <Reveal>
                <h2 className="text-h2 text-[1.75rem] md:text-[2rem] lg:[font-size:clamp(2rem,4vw,3rem)]">
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
              {/* Le 3 domande qui sono un'anteprima, non l'insieme: link
                  all'accordion completo della Home (v. dc.html nota 08). */}
              <Reveal delay={0.16} className="lg:hidden">
                <Link
                  href="/#faq"
                  className="inline-flex items-center gap-1.5 min-h-11 text-[15px] font-semibold"
                  style={{ color: 'var(--brand)' }}
                >
                  Tutte le domande frequenti <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </Reveal>
            </div>

            <div className="order-1 md:order-none flex flex-col gap-[22px]">
              {/* Con l'inversione il form arriverebbe senza intestazione (a
                  lg l'h2 di riferimento è quello delle FAQ): una riga,
                  nessun contenuto nuovo oltre l'etichetta (v. dc.html
                  nota 02). */}
              <h3 className="text-h2 text-[1.75rem] md:text-[2rem] lg:hidden">
                Scrivici
              </h3>
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

                  {/* sm: → md:: il desktop affiancava già da 640px; sotto
                      768 i due campi restano impilati, tornano affiancati a
                      834 (v. dc.html nota 03). */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        id="ct-email" type="email" autoComplete="email" inputMode="email"
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
                      {/* Sottolineato sotto lg — non solo colorato — per
                          un'informativa da leggere prima di acconsentire
                          (stesso trattamento di Aziende/Professionisti);
                          invariato da lg. */}
                      Accetto il trattamento dei dati personali secondo la{' '}
                      <Link
                        href="/privacy"
                        className="underline underline-offset-2 lg:no-underline"
                        style={{ color: 'var(--text)' }}
                      >
                        Privacy Policy
                      </Link> di Axon-Tech S.r.l.
                    </CheckboxField>
                    {errors.consenso && <FieldError id="ct-consenso-err">{errors.consenso}</FieldError>}
                  </div>

                  {serverError && (
                    <p role="alert" style={{ fontSize: 'var(--fs-caption)', color: 'var(--brand)' }}>
                      Errore nell'invio. Riprova o scrivici direttamente a info@axon-tech.it.
                    </p>
                  )}

                  {/* Larghezza piena sotto md — chiude il form nella zona
                      del pollice; da md torna a larghezza contenuto,
                      invariato (v. dc.html nota 04). */}
                  <div>
                    <Button type="submit" variant="white" size="lg" disabled={submitting} className="w-full md:w-auto">
                      {submitting ? 'Invio in corso…' : 'Invia messaggio'}
                    </Button>
                  </div>
                </form>
              )}
              </Reveal>

              {/* Il mailto del footer promosso qui sotto come riga da 44px:
                  su mobile è spesso la via più rapida, e copre il caso di
                  invio fallito (v. dc.html nota 06). */}
              <Reveal delay={0.14} className="lg:hidden flex flex-col gap-2">
                <a
                  href="mailto:info@axon-tech.it"
                  className="inline-flex items-center gap-2 min-h-11 text-[17px] text-white"
                >
                  <Mail size={18} aria-hidden="true" style={{ color: 'var(--brand)' }} />
                  info@axon-tech.it
                </a>
                <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)', lineHeight: 1.6 }}>
                  Axon-Tech S.r.l. — Via Verdi 73, 31100 Treviso (TV)
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
