'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Scissors, PackagePlus, Shirt } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import { AccordionItem } from '@/components/ui/Accordion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const steps = [
  {
    id: 'cuci',
    Icon: Scissors,
    title: 'Cuci',
    body: 'Fissa il guscio al capo: nuca, fascia lombare o petto. Bastano pochi punti.',
    image: '/axon-shell-sewn.png',
    alt: 'Axon Shell cucito su un capo',
  },
  {
    id: 'inserisci',
    Icon: PackagePlus,
    title: 'Inserisci',
    body: "Metti Axon nell'Axon Shell™, il guscio funzionale dedicato.",
    image: '/axon-device-pouch.jpg',
    alt: "Dispositivo Axon inserito nell'Axon Shell",
  },
  {
    id: 'indossa',
    Icon: Shirt,
    title: 'Indossa',
    body: 'Vivi la tua giornata. Axon si attiva con i tuoi movimenti.',
    image: '/donna.png',
    alt: 'Persona che indossa Axon nella vita di tutti i giorni',
  },
]

export default function HowItsDoneSection() {
  // null = nessuna card aperta di default
  const [openId, setOpenId] = useState<string | null>(null)
  const reduced = useReducedMotion()

  // Immagine da mostrare: quella della card aperta, o la prima come default visivo
  const displayId = openId ?? steps[0].id

  function handleToggle(id: string) {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <Section id="come-fatto">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20 lg:items-start">

          {/* ── IMAGE COLUMN — frame fisso, tutte e 3 le immagini sempre in DOM ── */}
          <Reveal>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '4/5', borderRadius: 'var(--radius-lg)' }}
            >
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  className="absolute inset-0"
                  // Prima immagine visibile di default, le altre nascoste
                  initial={{ opacity: i === 0 ? 1 : 0 }}
                  animate={{ opacity: step.id === displayId ? 1 : 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.28, ease: EASE }
                  }
                  // Evita che le immagini nascoste catturino eventi
                  style={{ pointerEvents: step.id === displayId ? 'auto' : 'none' }}
                >
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    priority={i === 0}
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* ── CONTENT COLUMN ── */}
          <div className="flex flex-col gap-8">

            {/* Intestazione */}
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
                  Tre passi, e basta.
                </h2>
              </Reveal>
            </div>

            {/* Accordion */}
            <Reveal delay={0.14}>
              <div>
                {steps.map(({ id, Icon, title, body }) => (
                  <AccordionItem
                    key={id}
                    title={title}
                    isOpen={openId === id}
                    onToggle={() => handleToggle(id)}
                    icon={<Icon size={18} strokeWidth={1.75} />}
                  >
                    {body}
                  </AccordionItem>
                ))}
              </div>
            </Reveal>

            {/* Micro-nota */}
            <Reveal delay={0.2}>
              <p
                style={{
                  fontSize: 'var(--fs-caption)',
                  color: 'var(--text-subtle)',
                  lineHeight: 1.55,
                }}
              >
                In alternativa, Axon può essere cucito direttamente lungo la
                circonferenza. Nessun contatto con la pelle richiesto.
              </p>
            </Reveal>

          </div>
        </div>
      </Container>
    </Section>
  )
}
