import { ImageResponse } from 'next/og'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

// Favicon generato dinamicamente: disco nero con "X" rossa centrata.
// Sostituire con app/icon.svg o app/favicon.ico quando il logo definitivo è disponibile.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0B',
          borderRadius: '50%',
        }}
      >
        <span
          style={{
            color: '#db181b',
            fontSize: 30,
            fontWeight: 800,
            lineHeight: 1,
            fontFamily: 'sans-serif',
          }}
        >
          X
        </span>
      </div>
    ),
    size,
  )
}
