import Image from 'next/image'
import { Container, Section, Eyebrow, Button, Reveal } from '@/components/ui'

export default function HeroSection() {
  return (
    <Section
      id="top"
      className="relative min-h-[calc(100svh-4rem)] flex items-center"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-8 lg:py-0">

          {/* ── Colonna testo ── */}
          <div className="flex flex-col gap-5">

            <Reveal trigger="mount">
              <Eyebrow>Dispositivo medico · Classe I</Eyebrow>
            </Reveal>

            <Reveal trigger="mount" delay={0.1}>
              <h1
                className="font-bold"
                style={{
                  fontSize: 'var(--fs-display)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.02em',
                }}
              >
                La forza invisibile che rivoluziona il movimento
              </h1>
            </Reveal>

            <Reveal trigger="mount" delay={0.2}>
              <p
                style={{
                  fontSize: 'var(--fs-lead)',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                  maxWidth: '44ch',
                }}
              >
                Axon è un dispositivo medico passivo che si applica ai tuoi capi
                e, con i micro-movimenti di ogni giorno, aiuta a migliorare equilibrio,
                forza e rilassamento muscolare. Senza batterie. Senza contatto con la pelle.
              </p>
            </Reveal>

            <Reveal trigger="mount" delay={0.3}>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="#come-funziona" variant="primary" size="lg">
                  Scopri Axon
                </Button>
                <Button href="/shop" variant="secondary" size="lg">
                  Acquista il Kit
                </Button>
              </div>
            </Reveal>

          </div>

          {/* ── Colonna immagine ── */}
          <Reveal trigger="mount" delay={0.45} className="relative">

            {/* Glow radiale — dietro il prodotto */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                inset: '-20%',
                background:
                  'radial-gradient(ellipse 70% 65% at 50% 52%, var(--brand-glow), transparent)',
                filter: 'blur(56px)',
              }}
            />

            {/* Immagine prodotto */}
            <div className="relative w-full aspect-square max-w-sm mx-auto lg:max-w-none">
              <Image
                src="/axon-label.svg"
                alt="Dispositivo Axon — etichetta ufficiale"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 80vw, 45vw"
              />
            </div>

          </Reveal>

        </div>
      </Container>
    </Section>
  )
}
