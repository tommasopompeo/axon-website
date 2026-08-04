import type { Metadata } from 'next'
import Image from 'next/image'
import { Container, Section, Reveal } from '@/components/ui'
import ResultsAccordion, { ResultItem } from '@/components/perche-axon/ResultsAccordion'
import PartnerSection from '@/components/perche-axon/PartnerSection'

export const metadata: Metadata = {
  title: 'Perché AXON - AXON',
  description:
    'I risultati emersi dai test condotti in contesto medico-scientifico: equilibrio, forza e mobilità prima e dopo l’applicazione dei dispositivi passivi AXON.',
  alternates: { canonical: '/perche-axon' },
}

/* ─────────────────────────────────────────────────────────────────────────
 * Dati risultati studio (pre/post, contesto medico-scientifico).
 * Ogni metrica compare UNA sola volta tra le tre sezioni.
 * Grafici in /public/grafici-perche-axon/1–7.png
 * ────────────────────────────────────────────────────────────────────── */

// SEZIONE A — Equilibrio, stabilità e controllo del movimento
const equilibrioItems: ResultItem[] = [
  {
    id: 'tinetti',
    title: 'Equilibrio e andatura',
    stat: '+28,4%',
    statLabel: 'Scala Tinetti · p = 0.0024',
    body: 'Il punteggio Tinetti, che misura equilibrio e qualità del cammino, è migliorato in modo netto e statisticamente significativo dopo l’applicazione del dispositivo.',
    image: '/grafici-perche-axon/1.png',
    imageAlt: 'Grafico Scala Tinetti - Equilibrio e andatura',
  },
  {
    id: 'scale',
    title: 'Salita delle scale',
    stat: '+42,4%',
    statLabel: 'Qualità esecuzione · p = 0.0025',
    body: 'La qualità di esecuzione nella salita delle scale — indicatore diretto di autonomia quotidiana — ha registrato il miglioramento più marcato tra i parametri funzionali.',
    image: '/grafici-perche-axon/2.png',
    imageAlt: 'Grafico Qualità esecuzione salita delle scale',
  },
  {
    id: 'stabilita',
    title: 'Stabilità posturale',
    stat: '↓ oscillazione',
    statLabel: 'Area stabilometrica (D-WALL)',
    body: 'Le misurazioni strumentali su piattaforma hanno mostrato una riduzione dell’area di oscillazione posturale, segno di un controllo dell’equilibrio più stabile.',
    image: '/grafici-perche-axon/3.png',
    imageAlt: 'Grafico Area Stabilometrica',
  },
  {
    id: 'sppb',
    title: 'Performance funzionale',
    stat: '+19,4%',
    statLabel: 'SPPB · p = 0.0126',
    body: 'La batteria SPPB, misura sintetica della performance fisica complessiva, ha confermato un miglioramento significativo in linea con gli altri parametri.',
    image: '/grafici-perche-axon/4.png',
    imageAlt: 'Grafico Performance Funzionale SPPB',
  },
]

// SEZIONE B — Forza e risposta neuromuscolare (grip: unica fonte, dati completi)
const forzaItems: ResultItem[] = [
  {
    id: 'forza-media',
    title: 'Forza di presa',
    stat: '+30,4%',
    statLabel: 'Forza media · dz = 1.54 · p < 0.001',
    body: 'La forza di presa manuale, biomarker validato della funzione neuromuscolare, è aumentata con un effetto classificato come molto grande.',
    image: '/grafici-perche-axon/5.png',
    imageAlt: 'Grafico Forza media di presa',
  },
  {
    id: 'picco-forza',
    title: 'Picco di forza',
    stat: '+22,8%',
    statLabel: 'Picco di forza · p = 0.0039',
    body: 'Anche il picco di forza espresso ha mostrato un incremento significativo, a conferma di una risposta neuromuscolare più efficiente.',
    image: '/grafici-perche-axon/6.png',
    imageAlt: 'Grafico Picco di forza',
  },
]

// SEZIONE C — Flessibilità e mobilità (contributo unico dello studio biofisico)
const mobilitaItems: ResultItem[] = [
  {
    id: 'flessione',
    title: 'Flessibilità lombare',
    stat: '↑ flessione',
    statLabel: 'Angolo di flessione del busto',
    body: 'Il test di flessione anteriore del busto ha evidenziato un aumento dell’angolo di flessione raggiungibile dopo l’applicazione del dispositivo, trasversale ai gruppi.',
    image: '/grafici-perche-axon/7.png',
    imageAlt: 'Grafico Flessibilità lombare',
  },
]

export default function PercheAxonPage() {
  return (
    <>
      {/* ── Hero Section ── */}
      <Section
        id="top"
        className="relative overflow-hidden z-0 min-h-[calc(100vh-80px)] flex items-center"
      >
        <Image
          src="/hero_perche_axon.png"
          alt="I risultati di chi ha indossato AXON"
          fill
          priority
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/30 -z-10" aria-hidden="true" />

        <Container className="relative z-10">
          <div className="max-w-4xl flex flex-col gap-6 lg:gap-8 pt-12 lg:pt-20">
            <Reveal trigger="mount" delay={0.1}>
              <h1
                className="font-bold text-white"
                style={{
                  fontSize: 'clamp(3.25rem, 7.0vw, 5.2rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.02em',
                }}
              >
                I risultati di chi ha indossato AXON
              </h1>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Intro paragraph ── */}
      <Section className="bg-black" style={{ background: '#000000' }}>
        <Container>
          <Reveal>
            <p
              className="max-w-[70ch]"
              style={{
                fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
                lineHeight: 1.55,
                color: 'var(--text-muted)',
                letterSpacing: '-0.01em',
              }}
            >
              Tutti i test sono stati condotti in un contesto{' '}
              <span style={{ color: 'var(--text)' }}>medico-scientifico rigoroso</span>,
              confrontando la condizione di ogni persona prima e dopo l’applicazione del
              dispositivo. Di seguito i risultati principali emersi su equilibrio, forza e mobilità.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Sezione A: Equilibrio (immagine a destra) ── */}
      <ResultsAccordion
        id="equilibrio"
        title="Equilibrio, stabilità e controllo del movimento"
        items={equilibrioItems}
        imageSide="right"
      />

      {/* ── Sezione B: Forza (immagine a sinistra) ── */}
      <ResultsAccordion
        id="forza"
        title="Forza e risposta neuromuscolare"
        items={forzaItems}
        imageSide="left"
        elevated
      />

      {/* ── Sezione C: Mobilità (immagine a destra) ── */}
      <ResultsAccordion
        id="mobilita"
        title="Flessibilità e mobilità"
        items={mobilitaItems}
        imageSide="right"
      />

      {/* ── Sezione Partner ── */}
      <PartnerSection />
    </>
  )
}
