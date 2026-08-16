'use client'

import { useRef, useState, useCallback } from 'react'
import { Container, Section, Reveal } from '@/components/ui'
import { Play, Pause, Volume2, VolumeX, Volume1 } from 'lucide-react'

export default function VideoSection() {
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
    <Section id="video-come-funziona" background="black">
      <Container>
        <Reveal>
          {/* 16:9 box — sides flush with container text area */}
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
              src="/video_come_funziona.mp4"
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
            />

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
        </Reveal>
      </Container>
    </Section>
  )
}
