'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { AccordionItem } from '@/components/ui/Accordion'
import { faqs } from '@/lib/faqs'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function handleToggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <Section id="faq" background="black">
      <Container>
        {/* Gap 32px sotto lg (era 40px), invariato 80px da lg (v. dc.html:
            10 domande intatte, nessun taglio di contenuto — nota 10). */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-20 lg:items-start">

          {/* ── Header + CTA — gap 16px sotto lg (era 20px), invariato da lg. ── */}
          <div className="flex flex-col gap-4 lg:gap-5">
            <Reveal>
              <h2 className="text-h2 text-[2rem] md:text-[2.25rem] lg:[font-size:clamp(2rem,4vw,3rem)]">
                Domande frequenti
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
            {/* Larghezza piena sotto md, 280px a tablet, contenuto invariato
                da lg (stesso --ctaW dell'hero, v. dc.html nota 04). */}
            <Reveal delay={0.2} className="mt-2">
              <Button href="/contatti" variant="white" className="w-full md:w-[280px] lg:w-auto">
                Hai altre domande?
              </Button>
            </Reveal>
          </div>

          {/* ── Accordion ── */}
          <Reveal delay={0.1}>
            <div>
              {faqs.map(({ id, q, a }, i) => (
                <AccordionItem
                  key={id}
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
