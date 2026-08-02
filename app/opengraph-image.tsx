import { ImageResponse } from 'next/og'

export const alt = 'Axon - Etichetta per il benessere del corpo'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          background: '#0A0A0B',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Glow radiale brand in alto a destra */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(219,24,27,0.28) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Wordmark AXON */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 48,
          }}
        >
          {/* A */}
          <span style={{ color: '#ffffff', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>A</span>
          {/* X — brand red */}
          <span style={{ color: '#db181b', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>X</span>
          {/* ON */}
          <span style={{ color: '#ffffff', fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>ON</span>

          {/* Pill "Dispositivo medico · Classe I" */}
          <div
            style={{
              marginLeft: 24,
              display: 'flex',
              alignItems: 'center',
              padding: '6px 14px',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 999,
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Dispositivo medico · Classe I
            </span>
          </div>
        </div>

        {/* Titolo */}
        <div
          style={{
            color: '#ffffff',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            maxWidth: 860,
            marginBottom: 24,
          }}
        >
          La forza invisibile che rivoluziona il movimento.
        </div>

        {/* Tagline */}
        <div
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 26,
            lineHeight: 1.4,
            maxWidth: 720,
          }}
        >
          Equilibrio · Forza · Resistenza alla fatica — senza batterie, senza contatto con la pelle.
        </div>

        {/* URL in basso a destra */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 80,
            color: 'rgba(255,255,255,0.35)',
            fontSize: 20,
            letterSpacing: '0.02em',
          }}
        >
          axon-tech.it
        </div>
      </div>
    ),
    { ...size },
  )
}
