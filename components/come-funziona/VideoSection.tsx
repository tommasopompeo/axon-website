'use client'

import { useRef, useState, useCallback } from 'react'
import { Container, Section, Reveal } from '@/components/ui'
import { Play, Pause, Volume2, VolumeX, Volume1 } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────
 * VideoSection — sotto lg il player diventa touch-first (v. "Come funziona -
 * Mobile & Tablet.dc.html", note 01-04 del pannello "Deviazioni dal
 * desktop"): comandi sempre visibili di default con tap sul fotogramma per
 * mostrarli/nasconderli (non hover, che sul touch non si riattiva mai),
 * niente slider volume (solo mute/unmute a 44px), preload="none" così sotto
 * 1024 l'unico byte iniziale è il poster. Da lg: player invariato.
 *
 * I due player sono due elementi <video> distinti, ciascuno con un unico
 * <source media="..."> invece di un attributo `src` diretto: senza quel
 * gate, il browser scaricherebbe le risorse di ENTRAMBI i player (anche
 * quello nascosto via `hidden`/`lg:hidden`, perché display:none non impedisce
 * il fetch di un elemento <video>) — stesso accorgimento già usato per il
 * video del disco rotante in HeroSection.tsx (v. commento lì).
 * ──────────────────────────────────────────────────────────────────────── */
export default function VideoSection() {
  return (
    <Section id="video-come-funziona" background="black">
      <Container>
        <Reveal>
          <div className="lg:hidden">
            <MobilePlayer />
          </div>
          <div className="hidden lg:block">
            <DesktopPlayer />
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
 * DesktopPlayer — invariato rispetto alla versione precedente (hover per
 * mostrare i comandi, slider volume, mute 36px, preload="metadata").
 * ──────────────────────────────────────────────────────────────────────── */
function DesktopPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetHideTimer = useCallback(() => {
    setShowControls(true)
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    hideTimeout.current = setTimeout(() => {
      if (playing) setShowControls(false)
    }, 2500)
  }, [playing])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
      setShowControls(true)
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current
    if (!v) return
    const val = parseFloat(e.target.value)
    v.volume = val
    setVolume(val)
    v.muted = val === 0
    setMuted(val === 0)
  }, [])

  function VolumeIcon() {
    if (muted || volume === 0) return <VolumeX size={20} />
    if (volume < 0.5) return <Volume1 size={20} />
    return <Volume2 size={20} />
  }

  return (
    // 16:9 box — sides flush with container text area
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '16 / 9', borderRadius: 'var(--radius-lg, 1.25rem)' }}
      onMouseMove={resetHideTimer}
      onMouseEnter={resetHideTimer}
      onMouseLeave={() => {
        if (playing) setShowControls(false)
      }}
    >
      {/* ── Video element ── */}
      <video
        ref={videoRef}
        poster="/video-come-funziona-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="metadata"
        onClick={togglePlay}
        style={{ cursor: 'pointer' }}
        onEnded={() => {
          setPlaying(false)
          setShowControls(true)
        }}
      >
        <source src="/video_come_funziona.mp4" type="video/mp4" media="(min-width: 1024px)" />
      </video>

      {/* ── Top-left author label ── */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, transparent 100%)',
          width: '100%',
          paddingTop: '1.25rem',
          paddingBottom: '2.5rem',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-8 left-5 flex flex-col gap-0.5 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <span
          className="font-bold text-white leading-tight"
          style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)', letterSpacing: '-0.01em' }}
        >
          Dott. Riccardo Montoro
        </span>
        <span
          className="text-white/80 font-normal leading-tight"
          style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1.05rem)' }}
        >
          Founder &amp; Chief Medical Officer
        </span>
      </div>

      {/* ── Subtle bottom gradient for controls readability ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 35%)',
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
        aria-hidden="true"
      />

      {/* ── Centre Play/Pause button ── */}
      <button
        onClick={togglePlay}
        aria-label={playing ? 'Pausa video' : 'Riproduci video'}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.35s ease',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span
          className="flex items-center justify-center rounded-full"
          style={{
            width: 72,
            height: 72,
            background: 'rgba(255,255,255,0.22)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255,255,255,0.45)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            transition: 'transform 0.18s ease, background 0.18s ease',
          }}
        >
          {playing
            ? <Pause size={30} color="white" fill="white" />
            : <Play size={30} color="white" fill="white" style={{ marginLeft: 3 }} />
          }
        </span>
      </button>

      {/* ── Bottom-right volume controls ── */}
      <div
        className="absolute bottom-4 right-4 flex items-center gap-2"
        style={{
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      >
        {/* Volume slider */}
        <div className="flex items-center gap-1.5">
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            style={{
              width: 72,
              accentColor: 'white',
              cursor: 'pointer',
              opacity: 0.88,
            }}
          />
        </div>

        {/* Mute/unmute button */}
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Attiva audio' : 'Silenzia audio'}
          className="flex items-center justify-center rounded-full"
          style={{
            width: 36,
            height: 36,
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.35)',
            color: 'white',
            cursor: 'pointer',
            transition: 'background 0.18s ease',
            flexShrink: 0,
          }}
        >
          <VolumeIcon />
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
 * MobilePlayer — touch-first player per sotto lg.
 *
 * Interazione: mentre è in pausa, un tap in un punto qualunque del
 * fotogramma avvia la riproduzione (stesso target generoso del desktop, dove
 * il bottone play copre l'intero riquadro). Una volta avviata, i comandi
 * restano visibili finché l'utente non tocca di nuovo il fotogramma fuori
 * dai bottoni: quel tap mostra/nasconde i comandi (non mette in pausa) —
 * pausa/mute restano azioni dedicate dei rispettivi bottoni. Sostituisce
 * onMouseMove/onMouseEnter/onMouseLeave, che sul touch non si riattivano mai.
 * ──────────────────────────────────────────────────────────────────────── */
function MobilePlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
      setShowControls(true)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const handleFrameTap = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // I bottoni gestiscono il proprio tap: qui solo lo sfondo del fotogramma.
    if ((e.target as HTMLElement).closest('button')) return
    if (!playing) {
      togglePlay()
    } else {
      setShowControls((v) => !v)
    }
  }, [playing, togglePlay])

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '16 / 9', borderRadius: 'var(--radius-lg, 1.25rem)' }}
      onClick={handleFrameTap}
    >
      {/* ── Video element — preload="none": sotto 1024 l'unico byte
          iniziale è il poster, il video parte al tap ── */}
      <video
        ref={videoRef}
        poster="/video-come-funziona-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="none"
        onEnded={() => {
          setPlaying(false)
          setShowControls(true)
        }}
      >
        <source src="/video_come_funziona.mp4" type="video/mp4" media="(max-width: 1023.98px)" />
      </video>

      {/* ── Top-left author label — 16/14px mobile, 19.2/16px tablet,
          18px dal bordo (v. dc.html nota 10: a 375px la versione desktop
          invadeva il bottone play) ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 96, background: 'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, transparent 100%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute flex flex-col gap-0.5 pointer-events-none"
        style={{ top: 18, left: 18, zIndex: 2 }}
      >
        <span className="font-bold text-white leading-tight text-base md:text-[1.2rem]" style={{ letterSpacing: '-0.01em' }}>
          Dott. Riccardo Montoro
        </span>
        <span className="text-white/80 font-normal leading-tight text-sm md:text-base">
          Founder &amp; Chief Medical Officer
        </span>
      </div>

      {/* ── Bottom gradient — assieme ai comandi ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 35%)',
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden="true"
      />

      {/* ── Play/Pause — 72px, invariato dal desktop ── */}
      <button
        onClick={togglePlay}
        aria-label={playing ? 'Pausa video' : 'Riproduci video'}
        className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full"
        style={{
          width: 72,
          height: 72,
          transform: 'translate(-50%, -50%)',
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          background: 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1.5px solid rgba(255,255,255,0.45)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
          cursor: 'pointer',
        }}
      >
        {playing
          ? <Pause size={30} color="white" fill="white" />
          : <Play size={30} color="white" fill="white" style={{ marginLeft: 3 }} />
        }
      </button>

      {/* ── Mute/unmute — unico controllo audio sotto 1024, 44×44 (era
          36px, sotto soglia HIG); niente slider volume: un range di 72px
          non è trascinabile col pollice e iOS ignora video.volume, il
          livello lo gestiscono i tasti fisici del telefono (v. dc.html
          note 02-03) ── */}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Attiva audio' : 'Silenzia audio'}
        className="absolute flex items-center justify-center rounded-full"
        style={{
          bottom: 14,
          right: 14,
          width: 44,
          height: 44,
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.35)',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  )
}
