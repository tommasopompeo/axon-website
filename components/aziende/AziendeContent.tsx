'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import {
  Shirt,
  Footprints,
  HeartPulse,
  Dumbbell,
  Briefcase,
  Bandage,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
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
import { FORM_ENDPOINT } from '@/lib/links'

// ── Casi d'uso ──
const useCases = [
  {
    icon: Shirt,
    title: 'Moda e abbigliamento',
    text: 'Integrare Axon in capi, intimo tecnico, activewear.',
  },
  {
    icon: Footprints,
    title: 'Calzature',
    text: 'Inserire Axon in scarpe e solette per supporto a postura ed equilibrio.',
  },
  {
    icon: HeartPulse,
    title: 'Sanità e RSA',
    text: 'Case di riposo e centri riabilitativi: equilibrio e prevenzione cadute.',
  },
  {
    icon: Dumbbell,
    title: 'Sport e performance',
    text: 'Squadre, palestre e centri sportivi: supporto a forza, equilibrio e recupero.',
  },
  {
    icon: Briefcase,
    title: 'Benessere sul lavoro',
    text: 'Programmi corporate per chi passa molte ore seduto.',
  },
  {
    icon: Bandage,
    title: 'Tutori e ortopedia',
    text: 'Applicazione su tutori e supporti, su indicazione clinica.',
  },
]

// ── Form state ──
interface FormData {
  nome: string; azienda: string; ruolo: string
  email: string; telefono: string; settore: string
  tipo: string; volumi: string; messaggio: string
  consenso: boolean; _honey: string
}

const empty: FormData = {
  nome: '', azienda: '', ruolo: '', email: '', telefono: '',
  settore: '', tipo: '', volumi: '', messaggio: '',
  consenso: false, _honey: '',
}

function validate(d: FormData): Record<string, string> {
  const e: Record<string, string> = {}
  if (!d.nome.trim()) e.nome = 'Campo obbligatorio.'
  if (!d.azienda.trim()) e.azienda = 'Campo obbligatorio.'
  if (!d.email.trim()) e.email = 'Campo obbligatorio.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Inserisci un indirizzo email valido.'
  if (!d.consenso) e.consenso = 'Accetta la privacy policy per procedere.'
  return e
}

export default function AziendeContent() {
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
    if (data._honey) return // honeypot
    const errs = validate(data)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    setServerError(false)
    try {
      if (FORM_ENDPOINT === '#') {
        // Placeholder: nessun invio reale — mostra conferma
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
      <Section id="top" background="black">
        <Container>
          <div className="flex flex-col gap-5 max-w-3xl">
            <Reveal trigger="mount">
              <h1 className="text-display">
                Sei un azienda?
              </h1>
            </Reveal>
            <Reveal trigger="mount" delay={0.12}>
              <p style={{ fontSize: 'var(--fs-lead)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Se vuoi integrare Axon nei tuoi prodotti, calzature o percorsi aziendali —
                per i tuoi clienti, i tuoi dipendenti o la tua struttura — sei nel posto giusto.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Casi d'uso ── */}
      <Section id="casi-uso" background="black" className="!pt-0">
        <Container>
          <div className="flex flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-4 max-w-2xl">
              <Reveal>
                <h2 className="text-h2">
                  Un dispositivo, molti settori
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ fontSize: 'var(--fs-lead)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Dove può essere integrato.
                </p>
              </Reveal>
            </div>

            <RevealGroup
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
              staggerDelay={0.07}
            >
              {useCases.map(({ icon: Icon, title, text }) => (
                <RevealItem key={title}>
                  <Card variant="white" className="flex flex-col gap-4 h-full p-6 lg:p-7">
                    <span
                      className="inline-flex items-center justify-center"
                      style={{ width: 48, height: 48, borderRadius: '999px', background: 'var(--brand-soft)', color: 'var(--brand)', flexShrink: 0 }}
                    >
                      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-h3" style={{ color: '#0a0a0b' }}>
                        {title}
                      </h3>
                      <p style={{ fontSize: 'var(--fs-body)', color: 'var(--text-on-white-muted)', lineHeight: 1.55 }}>
                        {text}
                      </p>
                    </div>
                  </Card>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* ── Form aziende ── */}
      <Section id="contatto-aziende" background="black">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20 lg:items-start">
            <div className="flex flex-col gap-5">
              <Reveal>
                <h2 className="text-h2">
                  Raccontaci la tua esigenza
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ fontSize: 'var(--fs-lead)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Il team Axon ti ricontatterà per valutare insieme la soluzione più adatta.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              {success ? (
                <Card className="flex flex-col gap-3 p-8">
                  <p className="font-semibold" style={{ fontSize: 'var(--fs-h3)' }}>Richiesta ricevuta.</p>
                  <p style={{ fontSize: 'var(--fs-body)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    Grazie. Il team Axon ti ricontatterà al più presto.
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
                      <FieldLabel htmlFor="az-nome" required>Nome e cognome</FieldLabel>
                      <Input
                        id="az-nome" type="text" autoComplete="name"
                        value={data.nome} onChange={(e) => set('nome', e.target.value)}
                        aria-required="true" aria-describedby={errors.nome ? 'az-nome-err' : undefined}
                        aria-invalid={!!errors.nome}
                      />
                      {errors.nome && <FieldError id="az-nome-err">{errors.nome}</FieldError>}
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="az-azienda" required>Azienda</FieldLabel>
                      <Input
                        id="az-azienda" type="text" autoComplete="organization"
                        value={data.azienda} onChange={(e) => set('azienda', e.target.value)}
                        aria-required="true" aria-describedby={errors.azienda ? 'az-azienda-err' : undefined}
                        aria-invalid={!!errors.azienda}
                      />
                      {errors.azienda && <FieldError id="az-azienda-err">{errors.azienda}</FieldError>}
                    </FieldGroup>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldGroup>
                      <FieldLabel htmlFor="az-ruolo">Ruolo</FieldLabel>
                      <Input
                        id="az-ruolo" type="text" autoComplete="organization-title"
                        value={data.ruolo} onChange={(e) => set('ruolo', e.target.value)}
                      />
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="az-email" required>Email aziendale</FieldLabel>
                      <Input
                        id="az-email" type="email" autoComplete="email"
                        value={data.email} onChange={(e) => set('email', e.target.value)}
                        aria-required="true" aria-describedby={errors.email ? 'az-email-err' : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <FieldError id="az-email-err">{errors.email}</FieldError>}
                    </FieldGroup>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldGroup>
                      <FieldLabel htmlFor="az-telefono">Telefono</FieldLabel>
                      <Input
                        id="az-telefono" type="tel" autoComplete="tel"
                        value={data.telefono} onChange={(e) => set('telefono', e.target.value)}
                      />
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="az-settore">Settore</FieldLabel>
                      <Select
                        id="az-settore"
                        value={data.settore} onChange={(e) => set('settore', e.target.value)}
                      >
                        <option value="">— Seleziona —</option>
                        <option>Moda/abbigliamento</option>
                        <option>Calzature</option>
                        <option>Sanità/RSA</option>
                        <option>Sport</option>
                        <option>Benessere aziendale</option>
                        <option>Ortopedia/tutori</option>
                        <option>Altro</option>
                      </Select>
                    </FieldGroup>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldGroup>
                      <FieldLabel htmlFor="az-tipo">Tipo di interesse</FieldLabel>
                      <Select
                        id="az-tipo"
                        value={data.tipo} onChange={(e) => set('tipo', e.target.value)}
                      >
                        <option value="">— Seleziona —</option>
                        <option>Integrare Axon in un prodotto</option>
                        <option>Fornitura per la mia struttura/team</option>
                        <option>Progetto pilota/sperimentazione</option>
                        <option>Distribuzione/rivendita</option>
                        <option>Altro</option>
                      </Select>
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="az-volumi">Volumi stimati</FieldLabel>
                      <Select
                        id="az-volumi"
                        value={data.volumi} onChange={(e) => set('volumi', e.target.value)}
                      >
                        <option value="">— Seleziona —</option>
                        <option value="lt100">&lt;100</option>
                        <option value="100-1000">100–1.000</option>
                        <option value="1000-10000">1.000–10.000</option>
                        <option value="gt10000">&gt;10.000</option>
                        <option value="unknown">Non so ancora</option>
                      </Select>
                    </FieldGroup>
                  </div>

                  <FieldGroup>
                    <FieldLabel htmlFor="az-messaggio">Messaggio</FieldLabel>
                    <Textarea
                      id="az-messaggio" rows={5}
                      placeholder="Descrivi il contesto e l'obiettivo"
                      value={data.messaggio} onChange={(e) => set('messaggio', e.target.value)}
                    />
                  </FieldGroup>

                  <div className="flex flex-col gap-1">
                    <CheckboxField
                      id="az-consenso"
                      checked={data.consenso}
                      onChange={(v) => set('consenso', v)}
                      errorId={errors.consenso ? 'az-consenso-err' : undefined}
                    >
                      Accetto il trattamento dei dati personali secondo la{' '}
                      <Link href="/privacy" style={{ color: 'var(--text)' }}>Privacy Policy</Link> di Axon-Tech S.r.l.
                    </CheckboxField>
                    {errors.consenso && <FieldError id="az-consenso-err">{errors.consenso}</FieldError>}
                  </div>

                  {serverError && (
                    <p role="alert" style={{ fontSize: 'var(--fs-caption)', color: 'var(--brand)' }}>
                      Errore nell'invio. Riprova o scrivici a info@axon-tech.it.
                    </p>
                  )}

                  <div>
                    <Button
                      type="submit"
                      variant="white"
                      size="lg"
                      disabled={submitting}
                    >
                      {submitting ? 'Invio in corso…' : 'Invia richiesta'}
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
