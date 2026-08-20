import { Eyebrow, Reveal, Button, PageHero } from '@/components/ui'

export default function HeroSection() {
  return (
    <PageHero media={{ type: 'none' }} background="white" tone="dark"
      decor={
        // Rotating AXON disc — cropped tight from the original full-bleed video
        // (which was 3840×2160 with the disc occupying a small, off-center
        // region) down to just the disc itself on its own white background, at
        // /public/hero-video-disc.mp4. Rendered in normal flex flow next to the
        // text column (not absolutely positioned over it): at any viewport
        // width the text simply narrows/wraps to make room instead of ever
        // overlapping the disc — the original overlap bug came from both
        // elements being sized off the viewport independently. Hidden below
        // `lg`: at those widths there isn't room for a second column and the
        // disc would render too small to read, per DESIGN.md home hero notes.
        //
        // No `poster`: the cropped video's own background is the same solid
        // white as the section (#fff either side), so the empty box before
        // the first frame decodes is indistinguishable from the loaded state
        // — nothing to paper over. The `<source media>` condition mirrors the
        // `hidden lg:flex` breakpoint below: under `lg` no source matches, so
        // the browser fetches zero bytes of video (verified via network
        // panel) instead of downloading ~470KB a hidden mobile visitor never
        // sees, which a plain CSS-hidden <video> would still do.
        //
        // Size/position (2026-08-18 follow-up): bumped up from
        // clamp(220px,26vw,420px) — read as too small on desktop — and
        // nudged toward the viewport edge via a negative right margin that
        // grows at wider breakpoints, reclaiming part of Container's right
        // gutter the way the old full-bleed video did. Both stay safe from
        // the text column by construction (flex, not absolute — see above),
        // not by picking numbers that happen to work at one width: at any
        // viewport, growing/shifting the decor box just leaves the text less
        // room, so it wraps instead of ever being covered.
        <div className="hidden lg:flex shrink-0 items-center justify-center w-[clamp(260px,32vw,540px)] aspect-square lg:-mr-6 xl:-mr-12 2xl:-mr-20">
          <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-contain">
            <source src="/hero-video-disc.mp4" type="video/mp4" media="(min-width: 1024px)" />
          </video>
        </div>
      }
      cta={
        // Distacco dal sottotitolo: 24px mobile / 56px tablet (era 112px
        // fisso sotto lg — "Acquista AXON" restava sotto la piega), 176px
        // invariato da lg. Larghezza: piena sotto md, 280px a tablet
        // (min(280px,100%) nel prototipo — a queste larghezze equivale a un
        // valore fisso), auto invariata da lg (v. dc.html nota 04).
        <Reveal trigger="mount" delay={0.3} className="w-full flex justify-center mt-6 md:mt-14 lg:mt-44 pb-0 lg:pb-2">
          <div className="flex flex-wrap gap-3 justify-center w-full md:w-auto">
            <Button
              href="/shop"
              size="custom"
              className="w-full md:w-[280px] lg:w-auto px-12 py-3.5 text-base font-medium shadow-lg lg:min-w-[240px] text-center"
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

      {/* ── Title — 38px mobile / 56px tablet (era fissa a 52px sotto 768:
          il clamp non scendeva mai sotto il minimo e l'H1 arrivava a 5
          righe), invariata da lg (v. dc.html nota 02). ── */}
      <Reveal trigger="mount" delay={0.1}>
        <h1 className="text-display text-black text-[2.375rem] md:text-[3.5rem] lg:[font-size:clamp(3.25rem,7vw,5.2rem)]">
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
