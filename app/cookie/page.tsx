import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section, Reveal } from '@/components/ui'
import LegalSection from '@/components/legal/LegalSection'

const description =
  'Cookie policy del sito axon-tech.it: quali cookie vengono utilizzati (allo stato attuale, nessuno) e come vengono gestiti, in conformità alle Linee guida del Garante Privacy.'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description,
  alternates: { canonical: '/cookie' },
  openGraph: { title: 'Cookie Policy', description, url: '/cookie' },
}

const linkStyle: React.CSSProperties = { color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '2px' }
const listStyle: React.CSSProperties = { color: 'var(--text-muted)' }

export default function CookiePage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section id="top" background="black">
        <Container>
          <div className="flex flex-col gap-5 max-w-3xl">
            <Reveal trigger="mount">
              <h1 className="text-display">
                Cookie Policy
              </h1>
            </Reveal>
            <Reveal trigger="mount" delay={0.12}>
              <p className="text-lead" style={{ color: 'var(--text-muted)' }}>
                Se e come questo sito utilizza i cookie, in conformità alle Linee guida del
                Garante per la protezione dei dati personali.
              </p>
            </Reveal>
            <Reveal trigger="mount" delay={0.18}>
              <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)' }}>
                Ultimo aggiornamento: 17 agosto 2026
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Corpo ── */}
      <Section id="contenuto" background="black" className="!pt-0">
        <Container>
          {/* Full-width su richiesta esplicita (2026-08-18) — v. commento
              gemello in app/termini/page.tsx. */}
          <div className="flex flex-col gap-14">

            <LegalSection title="1. Cosa sono i cookie">
              <p>
                I cookie sono piccoli file di testo che i siti visitati inviano al dispositivo
                dell&rsquo;utente, dove vengono memorizzati per essere ritrasmessi agli stessi
                siti alla visita successiva. Possono avere finalità tecniche (necessarie al
                funzionamento del sito), analitiche (per misurare il traffico) o di profilazione
                (per costruire un profilo dell&rsquo;utente a fini pubblicitari).
              </p>
            </LegalSection>

            <LegalSection title="2. I cookie utilizzati da questo sito" delay={0.04}>
              <p>
                <strong style={{ color: 'var(--text)' }}>
                  Allo stato attuale, il sito axon-tech.it non installa alcun cookie, né proprio
                  né di terze parti.
                </strong>{' '}
                In particolare:
              </p>
              <ul className="flex flex-col gap-2 list-disc pl-5" style={listStyle}>
                <li>non sono presenti cookie o strumenti di analisi del traffico (analytics);</li>
                <li>non sono presenti cookie di profilazione o pixel pubblicitari;</li>
                <li>
                  non sono presenti contenuti incorporati di terze parti (video, mappe, social
                  media) che potrebbero installare cookie durante la navigazione;
                </li>
                <li>non è attivo alcun servizio di newsletter o marketing automation.</li>
              </ul>
              <p>
                Poiché il sito non utilizza cookie che richiedono il consenso dell&rsquo;utente,
                in coerenza con le{' '}
                <em>
                  Linee guida cookie e altri strumenti di tracciamento
                </em>{' '}
                del Garante per la protezione dei dati personali (10 giugno 2021), non è presente
                alcun banner di richiesta del consenso.
              </p>
            </LegalSection>

            <LegalSection title="3. Aggiornamenti futuri" delay={0.08}>
              <p>
                Se in futuro venissero introdotti strumenti che comportano l&rsquo;uso di cookie
                tecnici, analitici o di terze parti (ad esempio un servizio di web analytics),
                questa pagina sarà aggiornata di conseguenza e, ove richiesto dalla normativa,
                verrà attivato un apposito banner per la raccolta del consenso prima
                dell&rsquo;installazione di tali cookie.
              </p>
            </LegalSection>

            <LegalSection title="4. Gestione dei cookie dal browser" delay={0.12}>
              <p>
                Anche in assenza di cookie installati da questo sito, puoi in qualsiasi momento
                controllare, bloccare o eliminare i cookie eventualmente presenti sul tuo
                dispositivo — ad esempio impostati da altri siti visitati — tramite le
                impostazioni sulla privacy del tuo browser.
              </p>
            </LegalSection>

            <LegalSection title="5. Titolare del trattamento" delay={0.16}>
              <p>
                <strong style={{ color: 'var(--text)' }}>Axon-Tech S.r.l.</strong> — Via Verdi
                73, 31100 Treviso (TV) — P.IVA IT05577370264 —{' '}
                <a href="mailto:info@axon-tech.it" style={linkStyle}>info@axon-tech.it</a>. Per
                informazioni più ampie sul trattamento dei dati personali, consulta la nostra{' '}
                <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>.
              </p>
            </LegalSection>

          </div>
        </Container>
      </Section>
    </>
  )
}
