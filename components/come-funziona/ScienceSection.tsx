'use client'

import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Container, Section, Reveal } from '@/components/ui'
import { EASE, DURATION } from '@/lib/motion'

/* ─────────────────────────────────────────────────────────────────────────
 * DeepDive — accordion stile Applicazioni con barra verticale sinistra.
 * Barra e titolo grigi di default, bianchi quando aperto. Usato solo da lg:
 * markup e comportamento invariati (intero blocco cliccabile, div[role=button]).
 * Sotto lg vedi MobileDeepDive più in basso (bottone vero da 48px, v. dc.html
 * "Come funziona - Mobile & Tablet.dc.html" nota 05).
 * ──────────────────────────────────────────────────────────────────────── */
interface DeepDiveProps {
  label?: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

function DeepDive({ label = 'Approfondimento tecnico', children, isOpen, onToggle }: DeepDiveProps) {
  const reduced = useReducedMotion()

  return (
    <div
      className="mt-8 relative pl-6 cursor-pointer group"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}
    >
      {/* Vertical indicator bar — grey by default, white when open */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-300"
        style={{ background: isOpen ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.15)' }}
        aria-hidden="true"
      />

      {/* Label */}
      <span
        className="font-semibold transition-colors duration-300 block"
        style={{
          fontSize: '1.125rem',
          color: isOpen ? 'var(--text)' : 'var(--text-muted)',
        }}
      >
        {label}
      </span>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : DURATION.uiSlow, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="mt-4 flex flex-col gap-4"
              style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
 * MobileReadMore — sotto lg (375/834), assente su desktop: anteprima
 * dell'introduzione troncata a 119px con dissolvenza (mask-image), bottone
 * "Continua a leggere" ↔ "Mostra meno". Ripreso 1:1 dal prototipo
 * (data-more / data-more-body / toggleMore in "Come funziona - Mobile &
 * Tablet.dc.html") — non elencato tra le 11 deviazioni annotate lì, ma
 * presente e funzionante nel file sorgente, quindi parte dello stesso spec.
 * ──────────────────────────────────────────────────────────────────────── */
const READ_MORE_COLLAPSED_PX = 119

function MobileReadMore({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<number>(READ_MORE_COLLAPSED_PX)

  const toggle = () => {
    const next = !open
    setOpen(next)
    setMaxHeight(next ? (bodyRef.current?.scrollHeight ?? READ_MORE_COLLAPSED_PX) : READ_MORE_COLLAPSED_PX)
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={bodyRef}
        className="flex flex-col overflow-hidden"
        style={{
          gap: '18px',
          fontSize: 'var(--fs-body)',
          lineHeight: 1.75,
          color: 'var(--text-muted)',
          maxHeight,
          WebkitMaskImage: open ? 'none' : 'linear-gradient(to bottom, #000 55%, transparent 100%)',
          maskImage: open ? 'none' : 'linear-gradient(to bottom, #000 55%, transparent 100%)',
          transition: 'max-height 0.45s var(--ease)',
        }}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="self-start flex items-center gap-1.5 min-h-11 font-semibold"
        style={{ fontSize: '1.0625rem', color: 'var(--brand)', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <span>{open ? 'Mostra meno' : 'Continua a leggere'}</span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s var(--ease)' }}
        />
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
 * MobileDeepDive — stessa "Approfondimento tecnico" del desktop (barra e
 * colori invariati) ma come bottone vero da 48px invece di un intero blocco
 * div[role=button] cliccabile senza segnale visivo, con chevron che ruota
 * (v. dc.html nota 05).
 * ──────────────────────────────────────────────────────────────────────── */
function MobileDeepDive({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  return (
    <div style={{ borderLeft: `2px solid ${open ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.15)'}`, transition: 'border-color 0.3s ease' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full min-h-12 flex items-center justify-between gap-3 pl-[18px] pr-0 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span
          className="font-semibold transition-colors duration-300"
          style={{ fontSize: '1.0625rem', color: open ? 'var(--text)' : 'var(--text-muted)' }}
        >
          Approfondimento tecnico
        </span>
        <ChevronDown
          size={20}
          aria-hidden="true"
          className="shrink-0"
          style={{ color: 'var(--text-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s var(--ease)' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : DURATION.uiSlow, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="pt-2.5 pb-5 pl-[18px] flex flex-col gap-4"
              style={{ fontSize: 'var(--fs-body)', lineHeight: 1.7, color: 'var(--text-muted)' }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
 * Pillar data
 * Testi originali, divulgativi in superficie, tecnici nell'approfondimento.
 * Nessuna citazione verbatim dai paper; tutte le fonti sono elencate in fondo.
 * ──────────────────────────────────────────────────────────────────────── */
const pillars = [
  {
    id: 'meccanotrasduzione',
    number: '01',
    eyebrow: 'Meccanotrasduzione',
    title: 'Come il corpo "sente" il movimento',
    image: '/comefunziona1.jpg',
    intro: (
      <>
        <p>
          Il corpo umano dispone di un sistema propriocettivo che, in ogni istante, monitora la
          posizione dei segmenti corporei, il loro movimento e la loro relazione con l&apos;ambiente.
          Questo flusso di informazioni parte dai muscoli, dai tendini, dalle articolazioni e dalla
          pelle, e raggiunge il sistema nervoso centrale attraverso terminazioni sensoriali
          specializzate: i meccanocettori.
        </p>
        <p>
          Fino al 2010 non era chiaro quale fosse il &ldquo;sensore molecolare&rdquo; alla base di
          questa conversione &mdash; ovvero la proteina che, deformandosi con il tessuto, trasforma
          uno stimolo meccanico in un segnale elettrico neuronale. La scoperta della famiglia dei
          canali ionici Piezo (Piezo1 e Piezo2) da parte del gruppo di Ardem Patapoutian ha
          identificato questo tassello mancante, riconoscimento culminato nel Premio Nobel per la
          Medicina 2021 assegnato a Patapoutian e David Julius.
        </p>
      </>
    ),
    deepDive: (
      <>
        <p>
          I canali Piezo sono proteine transmembrana trimeriche che si aprono in risposta a una
          deformazione della membrana cellulare, permettendo il passaggio di cationi &mdash; in
          particolare Na⁺ e Ca²⁺. Il flusso ionico genera un potenziale generatore che, se supera la
          soglia, innesca un potenziale d&apos;azione nella fibra sensoriale afferente. È la traduzione
          diretta di uno stimolo meccanico in codice neurale.
        </p>
        <p>
          <strong style={{ color: 'var(--text)' }}>Piezo2</strong> in particolare è espresso nelle
          terminazioni sensoriali dei fusi neuromuscolari e degli organi tendinei del Golgi &mdash; le
          strutture da cui dipende la propriocezione degli arti e del tronco. Woo e collaboratori
          (Nature Neuroscience, 2015) hanno dimostrato che l&apos;eliminazione selettiva di Piezo2 nei
          neuroni propriocettivi produce, nel modello murino, gravi disturbi della coordinazione
          motoria e posture anomale degli arti. Chesler e colleghi (New England Journal of Medicine,
          2016) hanno successivamente descritto pazienti con mutazioni loss-of-function di PIEZO2: la
          loro sensibilità propriocettiva risultava gravemente compromessa, con atassia marcata in
          assenza di feedback visivo. Il ruolo centrale del canale è quindi confermato anche
          nell&apos;uomo.
        </p>
        <p>
          Ai fini clinici, il messaggio è che <strong style={{ color: 'var(--text)' }}>la
            propriocezione non è un concetto astratto</strong>: dipende da una specifica classe di
          meccanocettori la cui attivazione è oggi mappata a livello molecolare, e la cui
          sensibilità può essere modulata da stimoli meccanici opportunamente calibrati &mdash; il
          punto di contatto tra la neuroscienza di base e le applicazioni fisioterapiche.
        </p>
      </>
    ),
  },
  {
    id: 'vibrazioni',
    number: '02',
    eyebrow: 'Stimoli vibratori',
    title: 'Le vibrazioni come strumento terapeutico',
    image: '/comefunziona2.jpg',
    intro: (
      <>
        <p>
          L&apos;utilizzo di stimoli vibratori a bassa intensità per modulare la risposta neuromuscolare
          non è un&apos;idea recente. La ricerca in fisiologia e riabilitazione ha documentato, in
          decenni di letteratura, come vibrazioni di ampiezza e frequenza controllate attivino i
          fusi neuromuscolari &mdash; in particolare le fibre afferenti di tipo Ia &mdash; e
          influenzino il controllo posturale, la coordinazione motoria e la forza espressa dal
          muscolo.
        </p>
        <p>
          È il meccanismo alla base del cosiddetto <em>riflesso tonico da vibrazione</em>
          {' '}(Tonic Vibration Reflex), descritto nella letteratura neurofisiologica a partire dagli
          anni &apos;60 e ripreso in numerose applicazioni cliniche successive.
        </p>
      </>
    ),
    deepDive: (
      <>
        <p>
          Gli studi sulla <strong style={{ color: 'var(--text)' }}>Whole Body Vibration (WBV)</strong>,
          condotti su pedane vibranti a frequenze tipicamente comprese tra 20 e 50 Hz, hanno
          documentato effetti su forza degli arti inferiori, equilibrio posturale e composizione
          corporea, soprattutto in popolazioni con ridotto tono muscolare. Kim &amp; Han (2020)
          hanno riportato incrementi significativi della forza del tronco e miglioramenti
          dell&apos;equilibrio dopo un protocollo di WBV in giovani donne con obesità. Yoo e
          collaboratori (2019) hanno osservato effetti positivi in pazienti anziani in dialisi
          &mdash; una popolazione particolarmente fragile dal punto di vista muscoloscheletrico.
          Meta-analisi più recenti indicano che, pur con una variabilità metodologica ampia, la WBV
          rimane un intervento supportato dall&apos;evidenza per il miglioramento della performance
          fisica nell&apos;anziano sarcopenico.
        </p>
        <p>
          Parallelamente alla WBV, la{' '}
          <strong style={{ color: 'var(--text)' }}>vibrazione focale (Focal Muscle Vibration)</strong>
          {' '}applicata direttamente a muscoli o tendini specifici è studiata in ambito neurologico e
          ortopedico come strumento per rieducare il pattern motorio dopo ictus, in patologie
          neurodegenerative e nella riabilitazione post-chirurgica. Il denominatore comune è
          l&apos;attivazione selettiva delle afferenze propriocettive Ia e la conseguente modulazione
          della risposta motoria &mdash; sia a livello spinale (riflessi) sia a livello corticale
          (rappresentazione motoria).
        </p>
        <p>
          Va sottolineato un punto importante per la pratica clinica: gli effetti sono
          <strong style={{ color: 'var(--text)' }}> dose-dipendenti</strong>. Ampiezza, frequenza,
          durata e punto di applicazione determinano l&apos;esito, e non tutti i protocolli sono
          equivalenti. È uno dei motivi per cui il campo, pur essendo consolidato, continua a
          evolvere.
        </p>
      </>
    ),
  },
  {
    id: 'nanomateriali',
    number: '03',
    eyebrow: 'Materiali passivi',
    title: 'Dai dispositivi attivi ai nanomateriali passivi',
    image: '/comefunziona3.jpg',
    intro: (
      <>
        <p>
          Storicamente questi effetti erano ottenibili solo attraverso{' '}
          <strong style={{ color: 'var(--text)' }}>dispositivi attivi</strong> &mdash; pedane
          vibranti, apparecchi per la vibrazione focale, unità per stimolazione neuromuscolare
          &mdash; spesso ingombranti, dipendenti da una fonte di energia elettrica e utilizzabili
          quasi esclusivamente in ambiente clinico o in palestra.
        </p>
        <p>
          Lo sviluppo della nanotecnologia applicata ai materiali ha aperto una direzione
          radicalmente diversa: progettare{' '}
          <strong style={{ color: 'var(--text)' }}>sistemi passivi</strong> capaci di rispondere ai
          micro-movimenti naturali del corpo e di restituire micro-stimoli meccanici di ampiezza
          calibrata, senza elettronica né alimentazione esterna, integrabili nella vita quotidiana.
        </p>
      </>
    ),
    deepDive: (
      <>
        <p>
          In questo contesto, i{' '}
          <strong style={{ color: 'var(--text)' }}>materiali nanostrutturati</strong> &mdash; una
          famiglia che comprende architetture diverse, dalle nanopolveri alle nanofibre fino a
          strutture più complesse &mdash; rappresentano uno degli ambiti più studiati per
          applicazioni biomedicali di questo tipo. Ciò che li accomuna, al di là della geometria
          specifica, è un rapporto superficie/volume estremamente elevato e la possibilità di
          ingegnerizzare la risposta meccanica del materiale su misura, ottenendo comportamenti
          &mdash; rigidità, elasticità, capacità di trasferire e dissipare energia &mdash; non
          replicabili dagli stessi materiali in forma massiva (bulk).
        </p>
        <p>
          Integrati in matrici opportunamente strutturate, questi materiali possono comportarsi
          come <strong style={{ color: 'var(--text)' }}>risonatori meccanici passivi</strong>,
          trasformando i micro-spostamenti generati dai movimenti quotidiani in stimoli vibratori di
          frequenza e ampiezza compatibili con l&apos;attivazione dei meccanocettori descritti nei
          paragrafi precedenti. Sistemi di questo tipo non emettono energia, non producono calore,
          non richiedono manutenzione, e possono essere integrati stabilmente nell&apos;abbigliamento e
          negli accessori.
        </p>
        <p style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
          <strong style={{ color: 'var(--text)' }}>AXON</strong> appartiene a questa categoria di
          soluzioni: al suo interno è presente una componente nanostrutturata con proprietà
          vibrazionali intrinseche.
        </p>
      </>
    ),
  },
]

/* ─────────────────────────────────────────────────────────────────────────
 * References
 * Ordine: primo le tre citazioni-chiave sulla meccanotrasduzione (Piezo),
 * poi la letteratura sulle vibrazioni. Tutte da fonti indicizzate su PubMed.
 * I DOI dei tre paper Piezo sono verificati; per gli altri riportiamo la
 * citazione bibliografica completa così come fornita dal team.
 * ──────────────────────────────────────────────────────────────────────── */
const references: {
  authors: string
  year: string
  title: string
  journal: string
  doi?: string
}[] = [
    {
      authors: 'Woo S-H., Lukacs V., de Nooij J. C., et al.',
      year: '2015',
      title: 'Piezo2 is the principal mechanotransduction channel for proprioception.',
      journal: 'Nature Neuroscience, 18(12), 1756–1762.',
      doi: '10.1038/nn.4162',
    },
    {
      authors: 'Chesler A. T., Szczot M., Bharucha-Goebel D., et al.',
      year: '2016',
      title: 'The Role of PIEZO2 in Human Mechanosensation.',
      journal: 'New England Journal of Medicine, 375(14), 1355–1364.',
      doi: '10.1056/NEJMoa1602812',
    },
    {
      authors: 'Szczot M., Nickolls A. R., Lam R. M., Chesler A. T.',
      year: '2021',
      title: 'The Form and Function of PIEZO2.',
      journal: 'Annual Review of Biochemistry, 90, 507–534.',
      doi: '10.1146/annurev-biochem-081720-023244',
    },
    {
      authors: 'Kim M.-K., Han J.-T.',
      year: '2020',
      title:
        'The effects of whole-body vibration exercise on trunk muscle strength and body balance in female students with obesity.',
      journal: 'Journal of Exercise Rehabilitation.',
    },
    {
      authors: 'Yoo J., et al.',
      year: '2019',
      title: 'Effects of whole-body vibration exercise in elderly hemodialysis patients.',
      journal: 'International Urology and Nephrology.',
    },
  ]

/* ─────────────────────────────────────────────────────────────────────────
 * ScienceSection component
 * ──────────────────────────────────────────────────────────────────────── */
export default function ScienceSection() {
  // Tracciamo separatamente ogni accordion (uno per pillar). null = tutti chiusi.
  // Usato solo dal blocco desktop (da lg) — sotto lg ogni MobileDeepDive
  // gestisce il proprio stato in autonomia (v. sotto).
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <Section id="scienza" background="black">
      <Container>

        {/* ── Section header — gap 18px sotto lg (dc.html), invariato da lg ── */}
        <div className="flex flex-col gap-[18px] lg:gap-8 max-w-4xl">
          <Reveal delay={0.08}>
            <h2
              className="text-display text-white text-[2.375rem] md:text-[3.25rem] lg:[font-size:clamp(3.25rem,7vw,5.2rem)]"
              style={{ color: 'var(--text)' }}
            >
              Le basi scientifiche del movimento passivo
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              className="text-[1.125rem] md:text-[1.25rem]"
              style={{
                lineHeight: 1.6,
                color: 'var(--text-muted)',
              }}
            >
              Una breve panoramica nelle basi neuro-fisiologiche e nei materiali che rendono possibile una nuova generazione di soluzioni passive per il sistema neuromuscolare.
            </p>
          </Reveal>
        </div>

        {/* ── Three pillars — spaziatura per fascia: 56px mobile / 72px
            tablet (var(--pillGap) nel prototipo), invariata da lg (128/160px) ── */}
        <div className="mt-14 md:mt-[4.5rem] lg:mt-32 flex flex-col gap-14 md:gap-[4.5rem] lg:gap-40">
          {pillars.map((pillar, i) => {
            const isInverted = i % 2 === 1
            return (
              <Reveal key={pillar.id}>
                <article id={pillar.id}>

                  {/* ── Sotto lg: colonna unica. L'immagine va subito dopo
                      il titolo — nell'ordine DOM desktop è la seconda
                      colonna, quindi sotto 1024 cadeva dopo l'intero
                      accordion (v. dc.html nota 06) — seguita
                      dall'introduzione troncata e dall'approfondimento come
                      bottone vero (note 05, 08). ── */}
                  <div className="lg:hidden flex flex-col gap-5">
                    <h3
                      className="text-[1.625rem] md:text-[2rem] font-normal leading-[1.15] text-white"
                      style={{ letterSpacing: '-0.015em' }}
                    >
                      {pillar.title}
                    </h3>

                    <div
                      className="relative w-full overflow-hidden border"
                      style={{
                        aspectRatio: '3 / 2',
                        borderRadius: 'var(--radius-lg)',
                        borderColor: 'var(--border)',
                        background: 'var(--surface)',
                      }}
                    >
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        sizes="100vw"
                        className="object-cover object-center"
                      />
                    </div>

                    <MobileReadMore>{pillar.intro}</MobileReadMore>

                    <MobileDeepDive>{pillar.deepDive}</MobileDeepDive>
                  </div>

                  {/* ── Da lg: comportamento invariato (griglia 2 colonne,
                      immagine sticky, DeepDive a blocco intero cliccabile) ── */}
                  <div className="hidden lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Text column (title + prose + deep-dive) */}
                    <div className={`flex flex-col ${isInverted ? 'lg:order-2' : 'lg:order-1'}`}>
                      <h3
                        className="mb-8"
                        style={{
                          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                          lineHeight: 1.15,
                          letterSpacing: '-0.015em',
                          color: 'var(--text)',
                        }}
                      >
                        {pillar.title}
                      </h3>

                      <div
                        className="flex flex-col gap-5"
                        style={{
                          fontSize: 'var(--fs-body)',
                          lineHeight: 1.75,
                          color: 'var(--text-muted)',
                        }}
                      >
                        {pillar.intro}
                      </div>

                      <DeepDive
                        isOpen={openIndex === i}
                        onToggle={() => handleToggle(i)}
                      >
                        {pillar.deepDive}
                      </DeepDive>
                    </div>

                    {/* Image column (3:2 horizontal ratio — 50/50 grid matching Applicazioni page) */}
                    <div className={`flex items-start ${isInverted ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="w-full lg:sticky lg:top-24">
                        <div
                          className="relative w-full overflow-hidden border"
                          style={{
                            aspectRatio: '3 / 2',
                            borderRadius: 'var(--radius-lg)',
                            borderColor: 'var(--border)',
                            background: 'var(--surface)',
                          }}
                        >
                          <Image
                            src={pillar.image}
                            alt={pillar.title}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </article>
              </Reveal>
            )
          })}
        </div>

        {/* ── References ── */}
        <div className="mt-14 md:mt-[4.5rem] lg:mt-32">
          <Reveal delay={0.08}>
            <h3
              className="mb-6"
              style={{
                fontSize: '1.25rem',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                color: 'var(--text-muted)',
              }}
            >
              Fonti principali:
            </h3>
          </Reveal>

          <ul
            className="flex flex-col gap-3 list-disc pl-5"
            style={{ color: 'var(--text-subtle)' }}
          >
            {references.map((r, i) => (
              <li
                key={r.doi ?? `${r.authors}-${i}`}
                className="text-[0.9375rem] lg:text-[0.8125rem]"
                style={{
                  lineHeight: 1.55,
                  color: 'var(--text-subtle)',
                }}
              >
                <span>{r.authors} ({r.year}). </span>
                <span>{r.title}</span>{' '}
                <em>{r.journal}</em>
                {r.doi && (
                  <>
                    {' '}
                    {/* Sotto lg: riga tappabile da 44px (era testo inline
                        senza target dedicato) — bibliografia a 15px invece
                        di 13px. L'underline resta permanente a ogni fascia
                        (già così sul desktop): solo il colore cambia, e
                        solo su hover reale (v. dc.html nota 09). */}
                    <a
                      href={`https://doi.org/${r.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center min-h-11 lg:inline lg:min-h-0"
                      style={{
                        color: 'var(--text-subtle)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px',
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--text-muted)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-subtle)'
                      }}
                    >
                      DOI: {r.doi}
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

      </Container>
    </Section>
  )
}
