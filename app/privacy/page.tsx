import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section, Reveal } from '@/components/ui'
import LegalSection from '@/components/legal/LegalSection'

const description =
  "Informativa sul trattamento dei dati personali raccolti da Axon-Tech S.r.l. tramite il sito axon-tech.it, ai sensi dell'art. 13 del GDPR (Regolamento UE 2016/679)."

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description,
  alternates: { canonical: '/privacy' },
  openGraph: { title: 'Privacy Policy', description, url: '/privacy' },
}

const linkStyle: React.CSSProperties = { color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '2px' }
const listStyle: React.CSSProperties = { color: 'var(--text-muted)' }

export default function PrivacyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section id="top" background="black">
        <Container>
          <div className="flex flex-col gap-5 max-w-3xl">
            <Reveal trigger="mount">
              <h1 className="text-display">
                Privacy Policy
              </h1>
            </Reveal>
            <Reveal trigger="mount" delay={0.12}>
              <p className="text-lead" style={{ color: 'var(--text-muted)' }}>
                Come Axon-Tech S.r.l. raccoglie e utilizza i dati personali di chi visita
                questo sito o ci scrive tramite i moduli di contatto.
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

      {/* ── Corpo informativa ── */}
      <Section id="contenuto" background="black" className="!pt-0">
        <Container>
          {/* Full-width su richiesta esplicita (2026-08-18) — v. commento
              gemello in app/termini/page.tsx. */}
          <div className="flex flex-col gap-14">

            <LegalSection title="1. Titolare del trattamento">
              <p>
                Il Titolare del trattamento dei dati personali raccolti tramite questo sito è:
              </p>
              <p>
                <strong style={{ color: 'var(--text)' }}>Axon-Tech S.r.l.</strong>
                <br />
                Via Verdi 73, 31100 Treviso (TV)
                <br />
                P.IVA IT05577370264
                <br />
                Email: <a href="mailto:info@axon-tech.it" style={linkStyle}>info@axon-tech.it</a>
              </p>
              <p>
                Per qualsiasi richiesta relativa al trattamento dei tuoi dati personali, o per
                esercitare i diritti descritti al punto 8, puoi scrivere all&rsquo;indirizzo email
                sopra indicato.
              </p>
            </LegalSection>

            <LegalSection title="2. Quali dati raccogliamo e perché" delay={0.04}>
              <p>
                Questo sito raccoglie solo i dati che ci fornisci volontariamente tramite i
                moduli di contatto e i dati tecnici generati automaticamente dalla normale
                navigazione. Non utilizziamo cookie di profilazione, strumenti di analisi del
                traffico, pixel di tracciamento o servizi di terze parti che raccolgono dati
                sugli utenti (per i dettagli vedi la{' '}
                <Link href="/cookie" style={linkStyle}>Cookie Policy</Link>). Non gestiamo una
                newsletter e non effettuiamo alcuna attività di profilazione.
              </p>
              <p style={{ color: 'var(--text)' }}>
                a. Dati forniti tramite i moduli di contatto
              </p>
              <p>
                Il sito mette a disposizione tre moduli — nelle pagine Contatti, Professionisti
                e Aziende — attraverso cui puoi inviarci una richiesta. A seconda del modulo, i
                dati raccolti includono nome e cognome, indirizzo email e messaggio, oltre a
                campi facoltativi come telefono, professione o azienda, ambito o settore di
                attività e altre informazioni utili a comprendere la tua richiesta. L&rsquo;invio
                di ciascun modulo richiede la spunta esplicita di una casella di consenso al
                trattamento dei dati, condizione necessaria per l&rsquo;invio.
              </p>
              <p>
                <em>Finalità:</em> rispondere alla richiesta ricevuta e gestire lo scambio di
                comunicazioni necessario a tale scopo — ad esempio fornire informazioni sul
                prodotto, valutare una collaborazione professionale o commerciale, gestire una
                richiesta di assistenza.
              </p>
              <p style={{ color: 'var(--text)' }}>
                b. Dati di navigazione (log tecnici)
              </p>
              <p>
                Come qualunque sito web, durante il normale funzionamento i sistemi informatici
                dell&rsquo;infrastruttura di hosting acquisiscono alcuni dati la cui trasmissione
                è implicita nell&rsquo;uso dei protocolli di comunicazione Internet — ad esempio
                indirizzo IP, tipo di browser e sistema operativo, pagine richieste, data e ora
                della richiesta. Questi dati sono utilizzati al solo fine di garantire il
                corretto funzionamento tecnico e la sicurezza del sito, e per accertare eventuali
                responsabilità in caso di reati informatici; non vengono correlati a persone
                identificate né utilizzati per finalità di profilazione o marketing.
              </p>
            </LegalSection>

            <LegalSection title="3. Base giuridica del trattamento" delay={0.06}>
              <ul className="flex flex-col gap-2 list-disc pl-5" style={listStyle}>
                <li>
                  per i dati raccolti tramite i moduli di contatto: il consenso esplicito
                  dell&rsquo;interessato (art. 6, par. 1, lett. a, GDPR), espresso al momento
                  dell&rsquo;invio del modulo;
                </li>
                <li>
                  per i dati di navigazione: il legittimo interesse del Titolare (art. 6, par. 1,
                  lett. f, GDPR) alla sicurezza e al corretto funzionamento del sito.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Natura del conferimento" delay={0.08}>
              <p>
                Il conferimento dei dati contrassegnati come obbligatori nei moduli è necessario
                per poter dare seguito alla tua richiesta; il mancato conferimento non consente
                l&rsquo;invio del modulo. Gli altri campi sono facoltativi e la loro mancata
                compilazione non pregiudica l&rsquo;invio della richiesta.
              </p>
            </LegalSection>

            <LegalSection title="5. Periodo di conservazione" delay={0.1}>
              <ul className="flex flex-col gap-2 list-disc pl-5" style={listStyle}>
                <li>
                  i dati raccolti tramite i moduli di contatto sono conservati per il tempo
                  necessario a gestire la richiesta e, comunque, non oltre 24 mesi
                  dall&rsquo;ultimo contatto, salvo termini diversi imposti da obblighi di legge
                  (ad esempio in caso di instaurazione di un rapporto contrattuale o commerciale,
                  per cui si applicano i termini di conservazione previsti dalla normativa
                  fiscale e civilistica);
                </li>
                <li>
                  i dati di navigazione (log tecnici) sono conservati per il tempo tecnicamente
                  necessario, di norma non superiore a 6 mesi, salvo la necessità di accertare la
                  commissione di reati.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="6. Destinatari dei dati" delay={0.12}>
              <p>
                I tuoi dati non vengono ceduti, venduti o comunicati a terzi per finalità di
                marketing. Possono essere trattati da soggetti che agiscono per conto del
                Titolare in qualità di responsabili del trattamento ai sensi dell&rsquo;art. 28
                GDPR — in particolare il fornitore del servizio di hosting che ospita il sito —
                esclusivamente per le finalità descritte in questa informativa, e da persone
                autorizzate al trattamento (es. personale interno di Axon-Tech S.r.l. incaricato
                di rispondere alle richieste).
              </p>
            </LegalSection>

            <LegalSection title="7. Trasferimento dei dati" delay={0.14}>
              <p>
                Il trattamento dei dati avviene all&rsquo;interno dello Spazio Economico Europeo.
                Qualora si rendesse necessario, in futuro, un trasferimento di dati verso paesi
                extra-UE, questo avverrà solo nel rispetto delle garanzie previste dal Capo V del
                GDPR (ad esempio tramite clausole contrattuali standard approvate dalla
                Commissione Europea).
              </p>
            </LegalSection>

            <LegalSection title="8. I tuoi diritti" delay={0.16}>
              <p>
                In qualità di interessato, in relazione al trattamento dei tuoi dati personali
                hai diritto di chiedere in qualsiasi momento al Titolare, ai sensi degli artt.
                15-22 GDPR:
              </p>
              <ul className="flex flex-col gap-2 list-disc pl-5" style={listStyle}>
                <li>l&rsquo;accesso ai tuoi dati personali;</li>
                <li>la rettifica dei dati inesatti o l&rsquo;integrazione di quelli incompleti;</li>
                <li>la cancellazione dei dati (diritto all&rsquo;oblio), nei casi previsti dalla legge;</li>
                <li>la limitazione del trattamento;</li>
                <li>la portabilità dei dati, ove applicabile;</li>
                <li>l&rsquo;opposizione al trattamento, per motivi legati alla tua situazione particolare;</li>
                <li>
                  la revoca del consenso in qualsiasi momento, senza pregiudicare la liceità del
                  trattamento basata sul consenso prima della revoca.
                </li>
              </ul>
              <p>
                Puoi esercitare questi diritti scrivendo a{' '}
                <a href="mailto:info@axon-tech.it" style={linkStyle}>info@axon-tech.it</a>. Hai
                inoltre diritto di proporre reclamo al Garante per la protezione dei dati
                personali (www.garanteprivacy.it), qualora ritenga che il trattamento dei tuoi
                dati violi la normativa vigente.
              </p>
            </LegalSection>

            <LegalSection title="9. Modifiche a questa informativa" delay={0.18}>
              <p>
                Il Titolare può aggiornare questa informativa nel tempo, ad esempio in
                conseguenza di modifiche normative o di nuove funzionalità del sito. La data di
                ultimo aggiornamento è indicata in cima a questa pagina.
              </p>
            </LegalSection>

          </div>
        </Container>
      </Section>
    </>
  )
}
