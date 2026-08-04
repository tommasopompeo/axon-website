'use client'


import Image from 'next/image'
import { Container, Section, Reveal } from '@/components/ui'

interface Partner {
  id: string
  name: string
  logo: string
  widthClass: string
  heightClass: string
}

const partners: Partner[] = [
  {
    id: 'p1',
    name: 'Partner 1',
    logo: '/logo1.png',
    widthClass: 'w-[240px] sm:w-[290px]',
    heightClass: 'h-[90px] sm:h-[110px]',
  },
  {
    id: 'p2',
    name: 'Partner 2',
    logo: '/logo2.png',
    widthClass: 'w-[130px] sm:w-[160px]',
    heightClass: 'h-[130px] sm:h-[160px]',
  },
]

export default function PartnerSection() {
  return (
    <Section className="bg-white py-48 lg:py-72" style={{ background: '#ffffff' }}>
      <Container>
        <div className="flex flex-col gap-10 lg:gap-14">
          {/* Titolo sopra il bordo superiore dei frame dei loghi */}
          <Reveal>
            <h2
              className="font-bold text-black"
              style={{
                fontSize: 'clamp(3.25rem, 7.0vw, 5.2rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                color: '#000000',
              }}
            >
              I nostri partner
            </h2>
          </Reveal>

          {/* Griglia a 2 colonne: Paragrafo a sinistra e loghi senza sfondo a destra */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <Reveal delay={0.1}>
              <p
                className="max-w-[46ch]"
                style={{
                  fontSize: 'var(--fs-lead)',
                  lineHeight: 1.6,
                  color: '#4b5563',
                }}
              >
                Strutture e realtà che hanno scelto di mettere alla prova AXON al fianco delle
                persone di cui si prendono cura.
              </p>
            </Reveal>

            {/* Destra: 2 loghi partner senza sfondo/box, ingranditi */}
            <Reveal delay={0.06}>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-10 sm:gap-14 lg:gap-16 lg:justify-end">
                {partners.map((p) => (
                  <div
                    key={p.id}
                    className={`relative shrink-0 ${p.widthClass} ${p.heightClass}`}
                  >
                    <Image
                      src={p.logo}
                      alt={p.name}
                      fill
                      sizes="300px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
