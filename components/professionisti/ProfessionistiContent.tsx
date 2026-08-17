'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import {
  Stethoscope,
  HeartPulse,
  Dumbbell,
  Activity,
  Footprints,
  Users,
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

// ── Ambiti professionali ──
const useCases = [
  {
    icon: Stethoscope,
    title: 'Fisioterapisti',
    text: 'Integra Axon nei percorsi riabilitativi dei tuoi pazienti, per lavorare su equilibrio e recupero funzionale.',
  },
  {
    icon: HeartPulse,
    title: 'Medici e specialisti',
    text: 'Suggerisci Axon nei percorsi di prevenzione cadute e mantenimento dell’autonomia motoria.',
  },
  {
    icon: Dumbbell,
    title: 'Personal trainer',
    text: 'Affianca Axon ai tuoi programmi di allenamento per supportare equilibrio, forza e prevenzione infortuni.',
  },
  {
    icon: Activity,
    title: 'Osteopati e chiropratici',
    text: 'Un supporto passivo e non invasivo da abbinare ai tuoi trattamenti manuali.',
  },
  {
    icon: Footprints,
    title: 'Podologi',
    text: 'Applica Axon su plantari e calzature per lavorare su postura ed equilibrio.',
  },
  {
    icon: Users,
    title: 'Educatori motori e trainer per anziani',
    text: 'Integralo nei programmi di attività motoria individuale per la terza età.',
  },
]

// ── Form state ──
interface FormData {
  nome: string; professione: string; struttura: string
  email: string; telefono: string; ambito: string
  tipo: string; pazienti: string; messaggio: string
  consenso: boolean; _honey: string
}

const empty: FormData = {
  nome: '', professione: '', struttura: '', email: '', telefono: '',
  ambito: '', tipo: '', pazienti: '', messaggio: '',
  consenso: false, _honey: '',
}

function validate(d: FormData): Record<string, string> {
  const e: Record<string, string> = {}
  if (!d.nome.trim()) e.nome = 'Campo obbligatorio.'
  if (!d.professione.trim()) e.professione = 'Campo obbligatorio.'
  if (!d.email.trim()) e.email = 'Campo obbligatorio.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Inserisci un indirizzo email valido.'
  if (!d.consenso) e.consenso = 'Accetta la privacy policy per procedere.'
  return e
}

export default function ProfessionistiContent() {
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
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _honey: undefined, source: 'professionisti' }),
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
                Sei un professionista?
              </h1>
            </Reveal>
            <Reveal trigger="mount" delay={0.12}>
              <p style={{ fontSize: 'var(--fs-lead)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Se lavori con pazienti o clienti — come fisioterapista, medico, personal trainer
                o altro professionista della salute e del movimento — e vuoi integrare Axon
                nella tua attività, sei nel posto giusto.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Ambiti professionali ── */}
      <Section id="ambiti" background="black" className="!pt-0">
        <Container>
          <div className="flex flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-4 max-w-2xl">
              <Reveal>
                <h2 className="text-h2">
                  Una tecnologia, molte professioni
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ fontSize: 'var(--fs-lead)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Come integrarlo nella tua attività.
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

      {/* ── Form professionisti ── */}
      <Section id="contatto-professionisti" background="black">
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
                      <FieldLabel htmlFor="pro-nome" required>Nome e cognome</FieldLabel>
                      <Input
                        id="pro-nome" type="text" autoComplete="name"
                        value={data.nome} onChange={(e) => set('nome', e.target.value)}
                        aria-required="true" aria-describedby={errors.nome ? 'pro-nome-err' : undefined}
                        aria-invalid={!!errors.nome}
                      />
                      {errors.nome && <FieldError id="pro-nome-err">{errors.nome}</FieldError>}
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="pro-professione" required>Professione</FieldLabel>
                      <Select
                        id="pro-professione"
                        value={data.professione} onChange={(e) => set('professione', e.target.value)}
                        aria-required="true" aria-describedby={errors.professione ? 'pro-professione-err' : undefined}
                        aria-invalid={!!errors.professione}
                      >
                        <option value="">— Seleziona —</option>
                        <option>Fisioterapista</option>
                        <option>Medico/specialista</option>
                        <option>Personal trainer</option>
                        <option>Osteopata/chiropratico</option>
                        <option>Podologo</option>
                        <option>Educatore motorio/trainer per anziani</option>
                        <option>Altro</option>
                      </Select>
                      {errors.professione && <FieldError id="pro-professione-err">{errors.professione}</FieldError>}
                    </FieldGroup>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldGroup>
                      <FieldLabel htmlFor="pro-struttura">Studio/struttura</FieldLabel>
                      <Input
                        id="pro-struttura" type="text" autoComplete="organization"
                        value={data.struttura} onChange={(e) => set('struttura', e.target.value)}
                      />
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="pro-email" required>Email</FieldLabel>
                      <Input
                        id="pro-email" type="email" autoComplete="email"
                        value={data.email} onChange={(e) => set('email', e.target.value)}
                        aria-required="true" aria-describedby={errors.email ? 'pro-email-err' : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <FieldError id="pro-email-err">{errors.email}</FieldError>}
                    </FieldGroup>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldGroup>
                      <FieldLabel htmlFor="pro-telefono">Telefono</FieldLabel>
                      <Input
                        id="pro-telefono" type="tel" autoComplete="tel"
                        value={data.telefono} onChange={(e) => set('telefono', e.target.value)}
                      />
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="pro-ambito">Ambito principale</FieldLabel>
                      <Select
                        id="pro-ambito"
                        value={data.ambito} onChange={(e) => set('ambito', e.target.value)}
                      >
                        <option value="">— Seleziona —</option>
                        <option>Riabilitazione</option>
                        <option>Sport e prevenzione infortuni</option>
                        <option>Terza età e prevenzione cadute</option>
                        <option>Postura ed equilibrio</option>
                        <option>Altro</option>
                      </Select>
                    </FieldGroup>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldGroup>
                      <FieldLabel htmlFor="pro-tipo">Tipo di interesse</FieldLabel>
                      <Select
                        id="pro-tipo"
                        value={data.tipo} onChange={(e) => set('tipo', e.target.value)}
                      >
                        <option value="">— Seleziona —</option>
                        <option>Usare Axon con i miei pazienti/clienti</option>
                        <option>Proporre/rivendere Axon nel mio studio</option>
                        <option>Collaborazione/partnership con Axon</option>
                        <option>Informazioni generali</option>
                        <option>Altro</option>
                      </Select>
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="pro-pazienti">Quanti pazienti/clienti segui (indicativo)</FieldLabel>
                      <Select
                        id="pro-pazienti"
                        value={data.pazienti} onChange={(e) => set('pazienti', e.target.value)}
                      >
                        <option value="">— Seleziona —</option>
                        <option value="lt10">&lt;10</option>
                        <option value="10-50">10–50</option>
                        <option value="50-200">50–200</option>
                        <option value="gt200">&gt;200</option>
                        <option value="unknown">Non so ancora</option>
                      </Select>
                    </FieldGroup>
                  </div>

                  <FieldGroup>
                    <FieldLabel htmlFor="pro-messaggio">Messaggio</FieldLabel>
                    <Textarea
                      id="pro-messaggio" rows={5}
                      placeholder="Descrivi il contesto e l'obiettivo"
                      value={data.messaggio} onChange={(e) => set('messaggio', e.target.value)}
                    />
                  </FieldGroup>

                  <div className="flex flex-col gap-1">
                    <CheckboxField
                      id="pro-consenso"
                      checked={data.consenso}
                      onChange={(v) => set('consenso', v)}
                      errorId={errors.consenso ? 'pro-consenso-err' : undefined}
                    >
                      Accetto il trattamento dei dati personali secondo la{' '}
                      <Link href="/privacy" style={{ color: 'var(--text)' }}>Privacy Policy</Link> di Axon-Tech S.r.l.
                    </CheckboxField>
                    {errors.consenso && <FieldError id="pro-consenso-err">{errors.consenso}</FieldError>}
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
