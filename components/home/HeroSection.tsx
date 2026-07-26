import Link from 'next/link'
import { Container, Section, Eyebrow, Reveal } from '@/components/ui'

export default function HeroSection() {
  return (
    <Section
      id="top"
      className="relative overflow-hidden z-0 min-h-[calc(100vh-80px)] flex items-center"
    >
      {/* ── Background Video in Loop ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/HERO7.mp4" type="video/mp4" />
      </video>

      <Container className="relative z-10">
        <div className="max-w-4xl flex flex-col gap-6 lg:gap-8 pt-12 lg:pt-20">

          {/* ── Eyebrow / Tag Badge ── */}
          <Reveal trigger="mount">
            <Eyebrow className="!text-black !border-black/30 !bg-white/50 backdrop-blur-md font-semibold">
              Dispositivo medico classe I
            </Eyebrow>
          </Reveal>

          {/* ── Title ── */}
          <Reveal trigger="mount" delay={0.1}>
            <h1
              className="font-bold text-black"
              style={{
                fontSize: 'clamp(3.25rem, 7.0vw, 5.2rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
              }}
            >
              La forza invisibile che rivoluziona il movimento
            </h1>
          </Reveal>

          {/* ── Subtitle ── */}
          <Reveal trigger="mount" delay={0.2} className="mt-1 lg:mt-2">
            <p
              className="text-zinc-900 font-normal"
              style={{
                fontSize: 'var(--fs-lead)',
                lineHeight: 1.6,
                maxWidth: '58ch',
              }}
            >
              Axon è un dispositivo medico passivo che si applica ai tuoi capi
              e, con i micro-movimenti di ogni giorno, aiuta a migliorare equilibrio,
              forza e rilassamento muscolare. Senza batterie. Senza contatto con la pelle.
            </p>
          </Reveal>

        </div>

        {/* ── CTA Button ── */}
        <Reveal trigger="mount" delay={0.3} className="w-full flex justify-center mt-28 lg:mt-44 pb-0 lg:pb-2">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/shop"
              className="bg-[#E3342F] text-white font-medium px-12 py-3.5 rounded-full hover:bg-red-700 transition-colors inline-block text-base shadow-lg min-w-[240px] text-center"
            >
              Acquista AXON
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}



