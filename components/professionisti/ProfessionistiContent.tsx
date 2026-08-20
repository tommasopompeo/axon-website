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
import { submitContact } from '@/lib/contact'

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
      await submitContact('professionisti', {
        nome: data.nome,
        email: data.email,
        professione: data.professione,
        struttura: data.struttura,
        telefono: data.telefono,
        ambito: data.ambito,
        tipo: data.tipo,
        pazienti: data.pazienti,
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
      {/* ── Hero — niente hero pinnata qui (Section, non PageHero): nessun
          position:sticky/HeroFade da rivalutare sotto lg (v. "Professionisti
          - Mobile & Tablet.dc.html" nota 01). Font-size e gap per fascia:
          38px/18px mobile, 52px/18px tablet, invariati da lg. ── */}
      <Section id="top" background="black">
        <Container>
          <div className="flex flex-col gap-[18px] lg:gap-5 max-w-3xl">
            <Reveal trigger="mount">
              <h1 className="text-display text-[2.375rem] md:text-[3.25rem] lg:[font-size:clamp(3.25rem,7vw,5.2rem)]">
                Sei un professionista?
              </h1>
            </Reveal>
            <Reveal trigger="mount" delay={0.12}>
              <p className="text-[1.125rem] md:text-[1.25rem]" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
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
          {/* Header — gap/margin per fascia dal prototipo (12px/32px sotto
              lg, invariati 16px/64px da lg). */}
          <div className="flex flex-col gap-3 lg:gap-4 max-w-2xl mb-8 lg:mb-16">
            <Reveal>
              <h2 className="text-h2 text-[1.875rem] md:text-[2.25rem] lg:[font-size:clamp(2rem,4vw,3rem)]">
                Una tecnologia, molte professioni
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-[1.125rem] md:text-[1.25rem]" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Come integrarlo nella tua attività.
              </p>
            </Reveal>
          </div>
        </Container>

        {/* ── Sotto lg: le 6 card diventano un carosello orizzontale con
            snap invece di una griglia impilata — sei card in colonna
            valevano ~1.400px di scroll verticale (v. dc.html, box
            evidenziato "Professioni in carosello"). Card 258px/300px, fuori
            da Container per il bleed a bordo schermo (stesso pattern di
            StickyScrollApplicazioni/WearMethodSection/Aziende). ── */}
        <div className="lg:hidden">
          <Reveal delay={0.06}>
            <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 [scroll-padding-left:1.5rem] md:[scroll-padding-left:3rem] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {useCases.map(({ icon: Icon, title, text }) => (
                <Card
                  key={title}
                  variant="white"
                  className="flex flex-col gap-3.5 flex-none w-[258px] md:w-[300px] p-[18px] md:p-[22px] snap-start"
                >
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
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Da lg: comportamento invariato (griglia 3 colonne) ── */}
        <Container>
          <RevealGroup
            className="hidden lg:grid lg:grid-cols-3 gap-6"
            staggerDelay={0.07}
          >
            {useCases.map(({ icon: Icon, title, text }) => (
              <RevealItem key={title}>
                <Card variant="white" className="flex flex-col gap-4 h-full p-7">
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
        </Container>
      </Section>

      {/* ── Form professionisti — la colonna intro sta già sopra il form
          nel DOM (stesso ordine del desktop, v. dc.html nota 09): nessuna
          inversione necessaria sotto lg. ── */}
      <Section id="contatto-professionisti" background="black">
        <Container>
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20 lg:items-start">
            <div className="flex flex-col gap-3.5 lg:gap-5">
              <Reveal>
                <h2 className="text-h2 text-[1.875rem] md:text-[2.25rem] lg:[font-size:clamp(2rem,4vw,3rem)]">
                  Raccontaci la tua esigenza
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-[1.125rem] md:text-[1.25rem]" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
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

                  {/* sm: → md:: il desktop affiancava già da 640px; sotto
                      768 le coppie restano impilate, tornano affiancate a
                      834 (v. dc.html nota 02). */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        id="pro-email" type="email" autoComplete="email" inputMode="email"
                        value={data.email} onChange={(e) => set('email', e.target.value)}
                        aria-required="true" aria-describedby={errors.email ? 'pro-email-err' : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <FieldError id="pro-email-err">{errors.email}</FieldError>}
                    </FieldGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FieldGroup>
                      <FieldLabel htmlFor="pro-telefono">Telefono</FieldLabel>
                      <Input
                        id="pro-telefono" type="tel" autoComplete="tel" inputMode="tel"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      {/* Sottolineato sotto lg — non solo colorato — per
                          un'informativa da leggere prima di acconsentire
                          (v. dc.html nota 05); invariato da lg. */}
                      Accetto il trattamento dei dati personali secondo la{' '}
                      <Link
                        href="/privacy"
                        className="underline underline-offset-2 lg:no-underline"
                        style={{ color: 'var(--text)' }}
                      >
                        Privacy Policy
                      </Link> di Axon-Tech S.r.l.
                    </CheckboxField>
                    {errors.consenso && <FieldError id="pro-consenso-err">{errors.consenso}</FieldError>}
                  </div>

                  {serverError && (
                    <p role="alert" style={{ fontSize: 'var(--fs-caption)', color: 'var(--brand)' }}>
                      Errore nell'invio. Riprova o scrivici a info@axon-tech.it.
                    </p>
                  )}

                  {/* Larghezza piena sotto md — chiude il form nella zona
                      del pollice invece di un bottone a larghezza-testo
                      allineato a sinistra; da md torna a larghezza
                      contenuto, invariato (v. dc.html nota 03). */}
                  <div>
                    <Button
                      type="submit"
                      variant="white"
                      size="lg"
                      disabled={submitting}
                      className="w-full md:w-auto"
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
