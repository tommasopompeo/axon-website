'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { AccordionItem } from '@/components/ui/Accordion'

// Testi esatti da knowledge/content-it.md → "FAQ (testi)".
const faqs = [
  {
    q: 'Cos’è Axon?',
    a: 'Un dispositivo medico di Classe I, passivo e non invasivo: un disco che si applica ai tuoi capi e, con i micro-movimenti del corpo, genera micro-vibrazioni impercettibili che aiutano a migliorare equilibrio, forza e rilassamento muscolare. Non è un farmaco.',
  },
  {
    q: 'Come si usa?',
    a: 'Si inserisce nell’Axon Shell™ e si cuce il guscio al capo (nuca, fascia lombare o petto), oppure si cuce direttamente. Poi basta indossare il capo normalmente. Non serve contatto con la pelle.',
  },
  {
    q: 'Devo ricaricarlo o accenderlo?',
    a: 'No. Axon è completamente passivo: niente batterie, niente elettronica, niente ricarica.',
  },
  {
    q: 'Si sente mentre lo indosso?',
    a: 'No. Le micro-vibrazioni sono sub-percettibili: non te ne accorgi.',
  },
  {
    q: 'Quanto tempo prima di notare qualcosa?',
    a: 'Axon è pensato per un uso regolare e continuativo. Gli effetti riguardano equilibrio, forza, resistenza alla fatica e rilassamento muscolare con l’uso nel tempo.',
  },
  {
    q: 'Come si lava il capo?',
    a: 'Versione removibile: estrai Axon e lava il capo normalmente; pulisci Axon a mano con sapone neutro. Versione cucita: lavaggio a mano max 30 °C, senza lavatrice, asciugatrice o ferro diretto sull’area del dispositivo.',
  },
  {
    q: 'Ci sono controindicazioni?',
    a: 'Nessuna controindicazione nota e nessun effetto collaterale segnalato. Non applicare su ferite aperte o pelle lesa. Per precauzione è sconsigliato a donne in gravidanza e bambini sotto i 3 anni.',
  },
  {
    q: 'Quanto dura e che garanzia ha?',
    a: 'È riutilizzabile a lungo se conservato correttamente. Garanzia di 2 anni dalla data d’acquisto.',
  },
  {
    q: 'Cosa contiene il Kit?',
    a: '1 dispositivo Axon Ø 30 mm, 1 Axon Shell™ e la scatola originale. A € 230,00, IVA e spedizione incluse.',
  },
  {
    q: 'Sono un’azienda: posso integrare Axon nei miei prodotti?',
    a: 'Sì. Axon è una tecnologia orizzontale, integrabile in capi, calzature, tutori e programmi per strutture e team. Visita la pagina Aziende e scrivici.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function handleToggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <Section id="faq" className="bg-black" style={{ background: 'var(--bg-black)' }}>
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-20 lg:items-start">

          {/* ── Header + CTA ── */}
          <div className="flex flex-col gap-5">
            <Reveal>
              <h2
                className="font-bold"
                style={{
                  fontSize: 'var(--fs-h2)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Domande frequenti.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p
                style={{
                  fontSize: 'var(--fs-lead)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}
              >
                Tutto quello che c’è da sapere prima di iniziare.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-2">
              <Button href="/contatti" variant="white">
                Hai altre domande?
              </Button>
            </Reveal>
          </div>

          {/* ── Accordion ── */}
          <Reveal delay={0.1}>
            <div>
              {faqs.map(({ q, a }, i) => (
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
  )
}
