'use client'

import { useState } from 'react'
import { ShieldCheck, Stethoscope, Truck, RotateCcw } from 'lucide-react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { AccordionItem } from '@/components/ui/Accordion'
import ProductCard from '@/components/shop/ProductCard'
import { AUT_MIN_DATE } from '@/lib/legal'
import { SHOPIFY_KIT_URL, SHOPIFY_SHELL_URL } from '@/lib/links'

// ── Prodotti (versione estesa) — dati da knowledge/product.md e content-it.md ──
const products = [
  {
    images: [
      { src: '/kit-1.jpg', alt: 'Axon Kit — confezione e dispositivo Axon' },
      { src: '/kit-2.jpg', alt: 'Axon Kit — dispositivo Axon e Axon Shell' },
    ],
    title: 'AXON KIT',
    subtitle: 'Dispositivo medico · Ø 30 mm',
    includes: [
      '1 dispositivo Axon Ø 30 mm',
      '1 Axon Shell',
      'Scatola originale',
    ],
    price: '€ 230,00',
    priceNote: 'IVA e spedizione incluse',
    href: SHOPIFY_KIT_URL,
  },
  {
    images: [
      { src: '/shell-1.jpg', alt: 'Axon Shell — gusci funzionali originali' },
      { src: '/shell-2.jpg', alt: 'Axon Shell — guscio cucibile su capo' },
    ],
    title: 'AXON SHELL — Kit da 5',
    subtitle: 'Gusci funzionali originali · cucibili · riciclabili',
    includes: [
      '5 gusci AXON SHELL',
      'Materiale tecnologico riciclabile',
      'Angoli arrotondati, saldature termosaldabili',
    ],
    price: '€ 30,00',
    priceNote: 'IVA e spedizione incluse',
    href: SHOPIFY_SHELL_URL,
  },
]

// ── Box fiducia ──
const trust = [
  {
    icon: ShieldCheck,
    title: 'Garanzia 2 anni',
    text: 'Dalla data d’acquisto, se conservato correttamente.',
  },
  {
    icon: Stethoscope,
    title: 'Dispositivo medico Classe I',
    text: 'Passivo, non invasivo, senza batterie né elettronica.',
  },
  {
    icon: Truck,
    title: 'Spedizione inclusa',
    text: 'Consegna in tutta Italia, già compresa nel prezzo.',
  },
  {
    icon: RotateCcw,
    title: 'Reso secondo termini',
    text: 'Possibilità di reso secondo le condizioni di vendita.',
  },
]

// ── Mini-FAQ acquisto (testi brevi — placeholder da rifinire) ──
const buyFaqs = [
  {
    q: 'Quanto costa la spedizione?',
    a: 'La spedizione è inclusa nel prezzo per tutta l’Italia. Le consegne avvengono tramite corriere nei tempi indicati al momento dell’ordine.',
  },
  {
    q: 'Posso effettuare un reso?',
    a: 'Sì, è possibile richiedere il reso secondo le condizioni di vendita riportate sullo store. Per assistenza scrivici a info@axon-tech.it.',
  },
  {
    q: 'Che garanzia ha Axon?',
    a: 'Axon è coperto da garanzia di 2 anni dalla data d’acquisto. È riutilizzabile a lungo se conservato correttamente.',
  },
  {
    q: 'Dove avviene l’acquisto?',
    a: 'L’acquisto si conclude in modo sicuro sullo store ufficiale di Axon: il pulsante “Acquista” ti reindirizza alla pagina prodotto.',
  },
]

export default function ShopContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  function handleToggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <>
      {/* ── Hero pagina ── */}
      <Section id="top" background="black">
        <Container>
          <div className="flex flex-col gap-5 max-w-3xl">
            <Reveal trigger="mount">
              <h1 className="text-display">
                Shop
              </h1>
            </Reveal>
            <Reveal trigger="mount" delay={0.12}>
              <p
                style={{
                  fontSize: 'var(--fs-lead)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}
              >
                Scegli il tuo Axon. Spedizione inclusa in Italia.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Schede prodotto estese ── */}
      <Section id="prodotti" background="black" className="!pt-0">
        <Container>
          {/* Titolo solo per screen reader: ripara l'ordine dei heading
              (h1 "Shop" → h3 delle card prodotto saltava il livello h2). */}
          <h2 className="sr-only">Prodotti</h2>
          {/* trigger="mount" (CSS puro) e non RevealGroup (Framer whileInView):
              le card sono above-the-fold e il variant scroll le SSR-a a
              opacity:0 fino all'idratazione — su mobile throttled l'LCP della
              pagina slittava a ~7s (Lighthouse, Render Delay 6.5s). Stesso
              criterio documentato in Reveal.tsx per i contenuti above-the-fold. */}
          {/* Sotto md: carosello orizzontale con snap (card 88%, peek della
              successiva) invece di stack verticale — swipe nativo, niente
              frecce (v. ProductCard). Da md: torna alla griglia 2 colonne
              di sempre; lg invariato. Bleed calcolato sul solo px-6 base di
              Container (niente override sm: nel range 640-767). */}
          <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 [scroll-padding-left:1.5rem] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:snap-none lg:gap-6">
            {products.map((p, i) => (
              <Reveal
                trigger="mount"
                delay={i * 0.1}
                className="h-full flex-[0_0_88%] snap-start md:flex-none"
                key={p.title}
              >
                <ProductCard {...p} priority={i === 0} />
              </Reveal>
            ))}
          </div>

          {/* Dicitura standard per la pubblicità dei dispositivi medici
              (art. 26 D.lgs. 137/2022) al punto vendita: stessa formula del
              Footer e di Termini §3. AUT_MIN_DATE (lib/legal.ts) è la fonte
              unica della data — aggiornarla lì, non nei tre punti. */}
          <Reveal delay={0.15}>
            {/* Dicitura punto vendita a 14px sotto md (leggibilità sulla card
                stretta), torna al token --fs-caption (13px) da md — invariata
                rispetto al desktop attuale. */}
            <p
              className="mt-6 text-[0.875rem] md:[font-size:var(--fs-caption)]"
              style={{ color: 'var(--text-subtle)', lineHeight: 1.6 }}
            >
              AXON è un dispositivo medico CE. Leggere attentamente le avvertenze e le
              istruzioni per l&rsquo;uso. Aut. Min. del {AUT_MIN_DATE}.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Cosa include il kit / perché il kit originale ── */}
      <Section id="cosa-include" background="black">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20 lg:items-start">
            <div className="flex flex-col gap-5">
              <Reveal>
                <h2 className="text-h2">
                  Cosa include il Kit
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p
                  style={{
                    fontSize: 'var(--fs-lead)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  L’AXON KIT è la soluzione completa per iniziare a usare Axon
                  nelle condizioni per cui è stato progettato.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-6">
              <Reveal delay={0.1}>
                <p
                  style={{
                    fontSize: 'var(--fs-body)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.7,
                  }}
                >
                  Ogni Kit contiene{' '}
                  <strong style={{ color: 'var(--text)' }}>
                    1 dispositivo Axon Ø 30 mm
                  </strong>
                  ,{' '}
                  <strong style={{ color: 'var(--text)' }}>1 Axon Shell</strong>{' '}
                  e la scatola originale. L’Axon Shell non è una semplice
                  bustina: è il guscio funzionale dedicato, progettato per
                  garantire piena efficacia, comfort sulla pelle, resistenza ai
                  lavaggi e corretta applicazione. Con il{' '}
                  <strong style={{ color: 'var(--text)' }}>Kit da 5 gusci</strong>{' '}
                  puoi estendere l’uso di Axon su più capi e accessori.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p
                  style={{
                    fontSize: 'var(--fs-caption)',
                    color: 'var(--text-subtle)',
                    lineHeight: 1.6,
                  }}
                >
                  Avvertenze: non posizionare su ferite aperte o pelle lesa
                  nell’area di applicazione. Nessuna controindicazione nota e
                  nessun effetto collaterale segnalato. Per precauzione,
                  sconsigliato a donne in gravidanza e bambini sotto i 3 anni.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Box fiducia ── */}
      <Section id="garanzie" background="black">
        <Container>
          {/* Sotto md: carosello orizzontale con snap (card al 78%, la
              seconda resta parzialmente visibile) — nessuna garanzia
              rimossa o accorpata. Da md: griglia 2×2; lg invariato (4 col). */}
          <RevealGroup
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 [scroll-padding-left:1.5rem] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:snap-none lg:grid-cols-4 lg:gap-6"
            staggerDelay={0.08}
          >
            {trust.map(({ icon: Icon, title, text }) => (
              <RevealItem key={title} className="flex-[0_0_78%] snap-start md:flex-none">
                <Card variant="white" className="flex flex-col gap-3 h-full p-5 md:p-[22px] lg:p-7">
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '999px',
                      background: 'var(--brand-soft)',
                      color: 'var(--brand)',
                    }}
                  >
                    <Icon size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="text-h3" style={{ color: '#0a0a0b' }}>
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--fs-caption)',
                      color: 'var(--text-on-white-muted)',
                      lineHeight: 1.55,
                    }}
                  >
                    {text}
                  </p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Mini-FAQ acquisto ── */}
      <Section id="faq-acquisto" background="black">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-20 lg:items-start">
            <Reveal>
              <h2 className="text-h2">
                Spedizioni, resi e garanzia
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                {buyFaqs.map(({ q, a }, i) => (
                  <AccordionItem
                    key={q}
                    title={q}
                    isOpen={openIndex === i}
                    onToggle={() => handleToggle(i)}
                  >
                    {a}
                  </AccordionItem>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
