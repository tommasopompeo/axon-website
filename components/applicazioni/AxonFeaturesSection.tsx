"use client";

import Image from "next/image";
import { Droplets, Thermometer, Layers } from "lucide-react";

// Double-ended vertical arrow — height matches the disc diameter
function VerticalMeasurement({ label, height = 110 }: { label: string; height?: number }) {
  const tip = 11; // arrowhead depth
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="12"
        height={height}
        viewBox={`0 0 12 ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Top arrowhead */}
        <polygon points={`6,0 1,${tip} 11,${tip}`} fill="black" />
        {/* Shaft */}
        <line x1="6" y1={tip - 2} x2="6" y2={height - tip + 2} stroke="black" strokeWidth="1.5" />
        {/* Bottom arrowhead */}
        <polygon points={`6,${height} 1,${height - tip} 11,${height - tip}`} fill="black" />
      </svg>
      <span className="text-black text-sm font-semibold tracking-wide leading-none">
        {label}
      </span>
    </div>
  );
}

// Feature badge — matches sticky scroll section typography
function FeatureBadge({
  icon,
  title,
  description,
  maxWidth = 220,
  compact = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  maxWidth?: number;
  /** true nei badge del layout a griglia sotto lg: titolo più piccolo
      (1.6rem) e non-nowrap — a 375/834 il vincolo nowrap a 2.25rem
      sforerebbe la cella; la griglia già delimita la larghezza, quindi
      niente maxWidth. Il layout absolute-positioned lg+ (compact di
      default false) resta al titolo 2.25rem nowrap invariato. */
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3" style={{ maxWidth: compact ? undefined : maxWidth }}>
      <div className="text-black">{icon}</div>
      {/* Title: hardcoded to match accordion active title size (text-4xl = 2.25rem, font-weight 800) */}
      <p
        className="text-black"
        style={
          compact
            ? { fontSize: '1.6rem', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.01em' }
            : { fontSize: '2.25rem', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }
        }
      >
        {title}
      </p>
      {/* Body: matches accordion body style */}
      <p className="text-black/60 text-lg leading-relaxed">{description}</p>
    </div>
  );
}

export default function AxonFeaturesSection() {
  // Disc size on desktop
  const discR = 150; // px — half of 280px disc

  return (
    <section className="bg-white w-full overflow-hidden">
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-12"
        style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}
      >

        {/* ── Section Title ── */}
        {/* Sotto lg niente whitespace-nowrap: a 375px il clamp(2.8rem,…)
            sforava il viewport dentro l'overflow-hidden della sezione. Ora
            va a capo, font-size fisso 2.125rem/3rem per fascia, margine
            80→40px. Invariato da lg (nowrap + clamp + mb-20 originali). */}
        <h2
          className="text-black mb-10 text-[2.125rem] md:text-[3rem] lg:mb-20 lg:whitespace-nowrap lg:[font-size:clamp(2.8rem,5.2vw,5.2rem)]"
          style={{
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
          }}
        >
          Comodo. Resistente. Versatile.
        </h2>

        {/* ── Absolute-positioned layout — disc as the anchor ── */}
        {/* Container height covers: top feature (~200px) + disc (280px) + bottom feature (~220px) + gaps */}
        <div className="relative hidden lg:block" style={{ height: 740 }}>

          {/* ── AXON Disc — centered ── */}
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: discR * 2,
              height: discR * 2,
            }}
          >
            <Image
              src="/axon_no_bkg.png"
              alt="AXON device"
              fill
              className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.08)]"
            />
          </div>

          {/* ── Measurement arrow — LEFT of disc, vertically centered, height = disc diameter ── */}
          <div
            className="absolute"
            style={{
              // right edge flush with disc left edge minus 14px gap
              right: `calc(50% + ${discR + 14}px)`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <VerticalMeasurement label="5 cm" height={200} />
          </div>

          {/* ── Comfort text — pinned to website LEFT border ── */}
          <div
            className="absolute"
            style={{
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              maxWidth: 380,
            }}
          >
            <p className="text-black/60 text-lg leading-relaxed">
              Con un diametro di soli 5 cm, AXON si applica direttamente
              sull&rsquo;indumento — leggero, discreto, sempre con te.
            </p>
          </div>

          {/* ── Waterproof — ABOVE disc, shifted left so it sits over the disc ── */}
          <div
            className="absolute"
            style={{
              // start ~80px left of disc center so badge sits over the disc
              left: `calc(50% - 80px)`,
              // bottom of badge sits 24px above disc top
              bottom: `calc(50% + ${discR + 24}px)`,
            }}
          >
            <FeatureBadge
              icon={<Droplets size={38} strokeWidth={1.3} />}
              title="Impermeabile"
              description="Resistente all’acqua e all’umidità in ogni condizione."
              maxWidth={500}
            />
          </div>

          {/* ── Temperature — RIGHT of disc, vertically centered, pushed further out ── */}
          <div
            className="absolute"
            style={{
              // further right — 100px gap from disc edge
              left: `calc(50% + ${discR + 100}px)`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <FeatureBadge
              icon={<Thermometer size={38} strokeWidth={1.3} />}
              title="Temperature estreme"
              description="Opera da -20°C a +80°C senza perdere efficacia."
              maxWidth={500}
            />
          </div>

          {/* ── Material durability — BELOW disc, left of temperature ── */}
          <div
            className="absolute"
            style={{
              // towards centre — left of temperature
              left: `calc(50% + ${discR - 60}px)`,
              // 32px gap below disc bottom
              top: `calc(50% + ${discR + 32}px)`,
            }}
          >
            <FeatureBadge
              icon={<Layers size={38} strokeWidth={1.3} />}
              title="Materiali durevoli"
              description="Alta resistenza all'usura e allo sfregamento."
              maxWidth={450}
            />
          </div>

        </div>

        {/* ── Mobile/tablet fallback ── */}
        {/* La quota "5 cm" (freccia + testo) esce sotto lg: restano solo
            disco e i tre badge, ora in griglia (1 col mobile, 2 col
            tablet — "05: Quota 5 cm rimossa"). Disco 200px → 240px da md. */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px]">
            <Image
              src="/axon_no_bkg.png"
              alt="AXON device"
              fill
              className="object-contain"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FeatureBadge
              compact
              icon={<Droplets size={28} strokeWidth={1.4} />}
              title="Impermeabile"
              description="Resiste all'acqua e all'umidità in ogni condizione d'uso."
            />
            <FeatureBadge
              compact
              icon={<Thermometer size={28} strokeWidth={1.4} />}
              title="Temperature estreme"
              description="Opera da -20°C a +80°C senza perdere efficacia."
            />
            <FeatureBadge
              compact
              icon={<Layers size={28} strokeWidth={1.4} />}
              title="Materiali durevoli"
              description="Alta resistenza all'usura e allo sfregamento."
            />
          </div>
        </div>

      </div>
    </section>
  );
}
