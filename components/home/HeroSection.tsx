import { Eyebrow, Reveal, Button, PageHero } from '@/components/ui'

export default function HeroSection() {
  return (
    <PageHero media={{ type: 'video', src: '/hero-video.mp4', poster: '/hero-video-poster.jpg' }} tone="dark"
      cta={
        <Reveal trigger="mount" delay={0.3} className="w-full flex justify-center mt-28 lg:mt-44 pb-0 lg:pb-2">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              href="/shop"
              size="custom"
              className="px-12 py-3.5 text-base font-medium shadow-lg min-w-[240px] text-center"
            >
              Acquista AXON
            </Button>
          </div>
        </Reveal>
      }
    >
      {/* ── Eyebrow / Tag Badge ── */}
      <Reveal trigger="mount">
        <Eyebrow className="!text-black !border-black/30 !bg-white/50 backdrop-blur-md font-semibold">
          Dispositivo medico classe I
        </Eyebrow>
      </Reveal>

      {/* ── Title ── */}
      <Reveal trigger="mount" delay={0.1}>
        <h1 className="text-display text-black">
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
    </PageHero>
  )
}
