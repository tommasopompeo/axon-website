/* ─────────────────────────────────────────────────────────────────────────
 * DA VERIFICARE — assunzioni commerciali/legali da confermare con Axon-Tech
 * e con un legale prima della pubblicazione. Dove il repository non conteneva
 * l'informazione, è stata scelta l'opzione più standard/tutelante per il
 * consumatore, in modo che il testo sia comunque pubblicabile come bozza.
 *
 * 1. Spese di spedizione per il reso (diritto di recesso): assunte a carico
 *    del cliente — l'opzione di default più comune nell'e-commerce italiano,
 *    esplicitata nel testo come richiesto dall'art. 57 Codice del Consumo.
 *    Confermare se Axon-Tech vuole invece offrire il reso gratuito.
 * 2. Esclusioni dal diritto di recesso: assunta NESSUNA esclusione per motivi
 *    igienici, perché il dispositivo non è a contatto con la pelle (v.
 *    knowledge/product.md, "Non richiede contatto con la pelle"). Confermare
 *    se Axon-Tech vuole comunque escludere il reso di unità aperte/usate.
 * 3. Tempistica del rimborso: assunta pari al termine massimo di legge (14
 *    giorni dal ricevimento del reso o dalla prova di spedizione, se
 *    anteriore). Confermare l'effettiva tempistica operativa.
 * 4. Modalità di pagamento e checkout: al momento della stesura i pulsanti
 *    "Acquista" sono disabilitati ("Presto disponibile") perché la pagina
 *    prodotto Shopify non è ancora configurata (SHOPIFY_KIT_URL /
 *    SHOPIFY_SHELL_URL in lib/links.ts sono placeholder '#'). Il testo
 *    descrive l'acquisto come perfezionato sulla piattaforma Shopify a cui si
 *    viene reindirizzati: aggiornare i dettagli quando l'integrazione è live.
 * 5. Tempi di consegna: non essendo indicato un termine contrattuale fisso
 *    (lo Shop rimanda ai "tempi indicati al momento dell'ordine"), si cita il
 *    termine massimo di legge (30 giorni dalla conclusione del contratto,
 *    art. 61 Codice del Consumo) come rete di sicurezza. Confermare lo SLA
 *    reale del corriere.
 *
 * PLACEHOLDER {{TOKEN}} presenti in questa pagina (resi vistosi a video dal
 * componente components/legal/Placeholder.tsx — da sostituire con i valori
 * reali PRIMA della pubblicazione):
 *   {{REA}}              → numero REA presso la CCIAA di Treviso – Belluno
 *                          (es. "TV-123456")
 *   {{CAPITALE_SOCIALE}} → capitale sociale in euro CON indicazione della
 *                          parte versata (es. "10.000,00 i.v." oppure
 *                          "10.000,00, di cui versati € 2.500,00") —
 *                          l'art. 2250 c.c. richiede la parte versata
 *   {{PEC}}              → indirizzo PEC della società
 *
 * La data dell'autorizzazione ministeriale alla pubblicità sanitaria (art. 26
 * D.lgs. 137/2022), che compare in questa pagina (§3), nel Footer e nello
 * Shop, non è più un placeholder: vive come AUT_MIN_DATE in lib/legal.ts,
 * fonte unica per tutti e tre i punti — aggiornarla lì se l'autorizzazione
 * cambia (nuova domanda, non rinnovo, v. commento in lib/legal.ts).
 * ────────────────────────────────────────────────────────────────────── */

import type { Metadata } from 'next'
import { Container, Section, Reveal } from '@/components/ui'
import LegalSection from '@/components/legal/LegalSection'
import Placeholder from '@/components/legal/Placeholder'
import { AUT_MIN_DATE } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Termini e condizioni',
  description:
    'Condizioni di vendita dei prodotti Axon: identità del venditore, conclusione del contratto, prezzo, consegna, diritto di recesso, garanzia legale di conformità e responsabilità.',
  alternates: { canonical: '/termini' },
  openGraph: {
    title: 'Termini e condizioni',
    description:
      'Condizioni di vendita dei prodotti Axon: identità del venditore, conclusione del contratto, prezzo, consegna, diritto di recesso, garanzia legale di conformità e responsabilità.',
    url: '/termini',
  },
}

const linkStyle: React.CSSProperties = { color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '2px' }

export default function TerminiPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section id="top" background="black">
        <Container>
          <div className="flex flex-col gap-5 max-w-3xl">
            <Reveal trigger="mount">
              <h1 className="text-display">
                Termini e condizioni
              </h1>
            </Reveal>
            <Reveal trigger="mount" delay={0.12}>
              <p className="text-lead" style={{ color: 'var(--text-muted)' }}>
                Le condizioni che regolano la vendita dei prodotti Axon e l&rsquo;utilizzo di
                questo sito.
              </p>
            </Reveal>
            <Reveal trigger="mount" delay={0.18}>
              <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)' }}>
                Ultimo aggiornamento: 18 agosto 2026
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Corpo ── */}
      <Section id="contenuto" background="black" className="!pt-0">
        <Container>
          {/* Full-width su richiesta esplicita (2026-08-18): a differenza
              delle altre pagine "prose" (es. Perché AXON intro), qui il testo
              riempie l'intera larghezza del Container invece di limitarsi a
              70ch — nessun max-width, quindi si adatta da solo a ogni
              breakpoint seguendo il gutter responsive del Container stesso. */}
          <div className="flex flex-col gap-14">

            {/* Blocco identificativo unico del venditore: soddisfa insieme
                l'art. 2250 c.c. (indicazioni negli atti e nella corrispondenza
                delle società iscritte al Registro delle Imprese — per i siti
                web: sede, ufficio del Registro e numero di iscrizione, REA,
                capitale sociale con la parte versata) e l'art. 49, co. 1,
                lett. b)-d) Codice del Consumo (identità, indirizzo geografico
                e recapiti del professionista nei contratti a distanza).
                NON duplicare questi dati in altre pagine o nel footer: questo
                è il punto unico di verità; il footer riporta solo la riga
                breve (denominazione, sede, P.IVA) già presente. */}
            <LegalSection title="1. Il Venditore">
              <p>
                I prodotti offerti su questo sito sono venduti da:
              </p>
              <p>
                <strong style={{ color: 'var(--text)' }}>Axon-Tech S.r.l.</strong>
                <br />
                Sede legale: Via Verdi 73, 31100 Treviso (TV), Italia
                <br />
                Codice fiscale e numero di iscrizione al Registro delle Imprese: 05577370264
                <br />
                Ufficio del Registro delle Imprese: CCIAA di Treviso – Belluno
                <br />
                Numero REA: TV-<Placeholder token="REA" />
                <br />
                Partita IVA: IT05577370264
                <br />
                Capitale sociale: € <Placeholder token="CAPITALE_SOCIALE" />
                <br />
                PEC: <Placeholder token="PEC" />
                <br />
                Email: <a href="mailto:info@axon-tech.it" style={linkStyle}>info@axon-tech.it</a>
              </p>
              <p>
                Le presenti condizioni regolano la vendita a distanza dei prodotti Axon e
                l&rsquo;utilizzo del sito axon-tech.it, ai sensi del Codice del Consumo (D.Lgs.
                206/2005) per i contratti conclusi con i consumatori e del D.Lgs. 70/2003 sul
                commercio elettronico.
              </p>
            </LegalSection>

            <LegalSection title="2. Il prodotto" delay={0.04}>
              <p>
                <strong style={{ color: 'var(--text)' }}>AXON KIT</strong> è un dispositivo
                medico di Classe I, passivo e non invasivo. Non è un farmaco, non richiede
                batterie o alimentazione elettrica, non emette calore né radiazioni e non
                necessita di contatto con la pelle: si applica su indumenti, calzature, tutori o
                accessori. Il Kit comprende 1 dispositivo Axon Ø 30 mm, 1 Axon Shell e la
                scatola originale.
              </p>
              <p>
                Il sito propone anche l&rsquo;AXON SHELL — Kit da 5, un accessorio complementare
                venduto separatamente per estendere l&rsquo;uso di Axon su più capi; per
                informazioni aggiornate su prezzo e disponibilità fai riferimento alla pagina{' '}
                <a href="/shop" style={linkStyle}>Shop</a>.
              </p>
              <p>
                <em>Avvertenze:</em> non posizionare il dispositivo su ferite aperte o pelle lesa
                nell&rsquo;area di applicazione. Non sono note controindicazioni né sono stati
                segnalati effetti collaterali; per precauzione, l&rsquo;uso è sconsigliato a
                donne in gravidanza e bambini sotto i 3 anni. Axon non sostituisce diagnosi, cure
                o trattamenti medici: per qualsiasi dubbio di natura clinica, consulta il tuo
                medico. Le caratteristiche del prodotto sono descritte nella pagina Shop e nel
                foglio illustrativo incluso nella confezione.
              </p>
            </LegalSection>

            {/* NOTA PER I MANUTENTORI — autorizzazione ministeriale (art. 26
                D.lgs. 137/2022, Linee guida ministeriali 2025):
                l'autorizzazione copre UN messaggio pubblicitario specifico e ha
                validità 24 mesi (12 se il messaggio rivendica una novità).
                Nuovi claim basati su nuovi studi richiedono una NUOVA domanda
                (non un rinnovo), con lo studio allegato come documentazione di
                supporto. AUT_MIN_DATE (lib/legal.ts) è la fonte unica della
                data qui sotto, condivisa con Footer e Shop. */}
            <LegalSection title="3. Informazioni sul dispositivo medico" delay={0.05}>
              <p>
                Axon è un <strong style={{ color: 'var(--text)' }}>dispositivo medico di
                Classe I</strong> ai sensi del Regolamento (UE) 2017/745 (MDR), munito di
                marcatura CE. Il fabbricante è Axon-Tech S.r.l., identificata alla sezione 1
                (&ldquo;Il Venditore&rdquo;). La dichiarazione di conformità UE è disponibile su
                richiesta delle autorità competenti.
              </p>
              <p>
                Messaggio pubblicitario autorizzato dal Ministero della Salute in data{' '}
                {AUT_MIN_DATE}, ai sensi dell&rsquo;art. 26 del D.Lgs. 137/2022. Leggere
                attentamente le avvertenze e le istruzioni per l&rsquo;uso.
              </p>
            </LegalSection>

            <LegalSection title="4. Prezzo" delay={0.06}>
              <p>
                Il prezzo di AXON KIT è <strong style={{ color: 'var(--text)' }}>€ 230,00</strong>{' '}
                (duecentotrenta/00 euro) e il prezzo di AXON SHELL — Kit da 5 è{' '}
                <strong style={{ color: 'var(--text)' }}>€ 30,00</strong> (trenta/00 euro), in
                entrambi i casi IVA e spedizione in Italia incluse. I prezzi indicati sul sito
                sono espressi in Euro e comprensivi di imposta sul valore aggiunto (IVA).
                Eventuali variazioni di prezzo non si applicano agli ordini già confermati.
              </p>
            </LegalSection>

            {/* Sezione redatta per l'art. 12 D.lgs. 70/2003: fasi tecniche di
                conclusione del contratto, archiviazione/accessibilità del
                contratto, correzione degli errori di inserimento, lingua. */}
            <LegalSection title="5. Come si conclude l'acquisto" delay={0.08}>
              <p>
                L&rsquo;acquisto non si perfeziona su questo sito: il pulsante
                &ldquo;Acquista&rdquo; della pagina Shop reindirizza alla pagina prodotto dello
                store ufficiale Axon sulla piattaforma{' '}
                <strong style={{ color: 'var(--text)' }}>Shopify</strong>, dove l&rsquo;ordine
                viene effettivamente inserito e pagato. Le fasi tecniche sono le seguenti:
                selezione del prodotto sulla pagina Shop; reindirizzamento alla pagina prodotto
                Shopify; aggiunta al carrello; inserimento dei dati di spedizione e pagamento;
                riepilogo dell&rsquo;ordine; conferma con obbligo di pagamento. Il contratto è
                concluso quando l&rsquo;ordine viene confermato sulla piattaforma di vendita.
              </p>
              <p>
                <em>Correzione degli errori:</em> prima di confermare l&rsquo;ordine, la pagina
                di riepilogo del checkout consente di verificare i dati inseriti e di correggere
                eventuali errori (quantità, indirizzo, dati di pagamento), tornando ai passaggi
                precedenti o modificando il carrello.
              </p>
              <p>
                <em>Archiviazione del contratto:</em> l&rsquo;ordine e le presenti condizioni
                applicabili al momento dell&rsquo;acquisto sono archiviati da Axon-Tech S.r.l. e
                dalla piattaforma di vendita; dopo l&rsquo;ordine ricevi una email di conferma
                con il riepilogo. Puoi richiederne copia in qualsiasi momento scrivendo a{' '}
                <a href="mailto:info@axon-tech.it" style={linkStyle}>info@axon-tech.it</a>.
              </p>
              <p>
                Il contratto è concluso in lingua italiana. Le modalità di pagamento accettate
                sono indicate al momento del checkout sulla piattaforma di vendita.
              </p>
            </LegalSection>

            <LegalSection title="6. Consegna" delay={0.1}>
              <p>
                La spedizione è inclusa nel prezzo per le consegne in Italia e avviene tramite
                corriere. I tempi di consegna indicativi sono comunicati al momento
                dell&rsquo;ordine; in assenza di un termine diverso concordato, la consegna
                avviene comunque entro 30 giorni dalla conclusione del contratto, come previsto
                dall&rsquo;art. 61 del Codice del Consumo. Verifica l&rsquo;integrità del pacco
                alla consegna e segnala tempestivamente eventuali danni al corriere e a{' '}
                <a href="mailto:info@axon-tech.it" style={linkStyle}>info@axon-tech.it</a>.
              </p>
            </LegalSection>

            <LegalSection title="7. Diritto di recesso" delay={0.12}>
              <p>
                Se acquisti in qualità di consumatore, hai diritto di recedere dal contratto
                senza indicarne le ragioni entro <strong style={{ color: 'var(--text)' }}>14
                giorni</strong>, ai sensi degli artt. 52 e seguenti del Codice del Consumo. Il
                termine decorre dal giorno in cui tu, o un terzo da te designato diverso dal
                corriere, acquisisci il possesso fisico del prodotto.
              </p>
              <p>
                <em>Come esercitare il recesso:</em> prima della scadenza del termine, comunica
                la tua decisione di recedere con una dichiarazione esplicita inviata a{' '}
                <a href="mailto:info@axon-tech.it" style={linkStyle}>info@axon-tech.it</a>,
                indicando ordine, prodotto acquistato e dati per il rimborso. Puoi utilizzare
                anche il modulo tipo di recesso riportato qui sotto (Allegato I, parte B, del
                Codice del Consumo), senza che il suo uso sia obbligatorio.
              </p>
              {/* Modello di recesso — Allegato I, parte B, Codice del Consumo,
                  riprodotto integralmente come richiesto dall'art. 49, co. 1,
                  lett. h) cod. cons. (informazione sul modulo tipo). */}
              <div
                style={{
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <p style={{ color: 'var(--text)', fontWeight: 600 }}>
                  Modulo di recesso tipo (Allegato I, parte B, Codice del Consumo)
                </p>
                <p>
                  (compilare e restituire il presente modulo solo se si desidera recedere dal
                  contratto)
                </p>
                <ul className="list-disc pl-5" style={{ color: 'var(--text-muted)' }}>
                  <li>
                    Destinatario: Axon-Tech S.r.l., Via Verdi 73, 31100 Treviso (TV) — email:{' '}
                    info@axon-tech.it
                  </li>
                  <li>
                    Con la presente io/noi (*) notifichiamo il recesso dal mio/nostro (*)
                    contratto di vendita dei seguenti beni (*)
                  </li>
                  <li>Ordinato il (*) / ricevuto il (*)</li>
                  <li>Nome del/dei consumatore(i)</li>
                  <li>Indirizzo del/dei consumatore(i)</li>
                  <li>
                    Firma del/dei consumatore(i) (solo se il presente modulo è notificato in
                    versione cartacea)
                  </li>
                  <li>Data</li>
                </ul>
                <p>(*) Cancellare la dicitura inutile.</p>
              </div>
              <p>
                <em>Restituzione del prodotto:</em> dopo aver comunicato il recesso, devi
                rispedire il prodotto senza indebito ritardo e in ogni caso entro 14 giorni dalla
                comunicazione, integro, non danneggiato, completo di tutti gli accessori e, per
                quanto possibile, nella confezione originale. Le spese dirette di restituzione
                sono a tuo carico.
              </p>
              <p>
                <em>Rimborso:</em> in caso di recesso valido, ti rimborsiamo tutti i pagamenti
                ricevuti, compresi i costi di consegna standard, senza indebito ritardo e
                comunque entro 14 giorni dal giorno in cui siamo informati della tua decisione di
                recedere; il rimborso può essere trattenuto fino al ricevimento del prodotto
                restituito o alla prova dell&rsquo;avvenuta spedizione, se anteriore. Il rimborso
                avviene con lo stesso mezzo di pagamento utilizzato per l&rsquo;acquisto, salvo
                diverso accordo.
              </p>
              <p>
                Il diritto di recesso non si applica agli acquisti effettuati da soggetti che
                agiscono nell&rsquo;esercizio della propria attività professionale (partita IVA,
                indicata in fase d&rsquo;ordine), per i quali si applicano le condizioni generali
                di vendita concordate.
              </p>
            </LegalSection>

            {/* Testo allineato agli artt. 128-135 cod. cons. nella versione
                vigente (post D.lgs. 170/2021, in vigore dal 1° gennaio 2022):
                NESSUN onere di denuncia entro 2 mesi (abrogato), prescrizione
                26 mesi dalla consegna, presunzione di preesistenza del difetto
                entro 1 anno. Non reintrodurre la vecchia regola dei 2 mesi. */}
            <LegalSection title="8. Garanzia legale di conformità" delay={0.14}>
              <p>
                I prodotti Axon sono coperti dalla garanzia legale di conformità prevista dagli
                artt. 128-135 del Codice del Consumo per i beni acquistati da consumatori: il
                venditore risponde dei difetti di conformità esistenti al momento della consegna
                che si manifestano entro <strong style={{ color: 'var(--text)' }}>2 anni</strong>{' '}
                da tale momento. Se il prodotto presenta un difetto di conformità, hai diritto
                al ripristino della conformità mediante riparazione o sostituzione senza spese
                oppure, nei casi previsti dalla legge, a una riduzione proporzionale del prezzo o
                alla risoluzione del contratto.
              </p>
              <p>
                Se il difetto di conformità si manifesta entro un anno dalla consegna, si presume
                che esistesse già a quella data, salvo prova contraria o incompatibilità con la
                natura del bene o del difetto. L&rsquo;azione diretta a far valere i difetti non
                dolosamente occultati dal venditore si prescrive in 26 mesi dalla consegna del
                bene. Non è previsto alcun onere di denuncia del difetto entro un termine
                specifico dalla scoperta.
              </p>
              <p>
                Per attivare la garanzia, scrivi a{' '}
                <a href="mailto:info@axon-tech.it" style={linkStyle}>info@axon-tech.it</a>{' '}
                descrivendo il difetto riscontrato e allegando la prova d&rsquo;acquisto. La
                garanzia non copre i danni derivanti da uso improprio, usura normale, manomissione
                o mancato rispetto delle istruzioni per l&rsquo;uso e delle avvertenze di
                lavaggio e conservazione indicate nella confezione.
              </p>
            </LegalSection>

            <LegalSection title="9. Limitazione di responsabilità" delay={0.16}>
              <p>
                Nei limiti consentiti dalla legge, la responsabilità di Axon-Tech S.r.l. per
                danni derivanti dall&rsquo;utilizzo del prodotto o dal presente contratto è
                limitata ai danni diretti e prevedibili, riconducibili a un uso conforme alle
                istruzioni e alle avvertenze fornite. Restano in ogni caso escluse dalla
                limitazione la responsabilità per morte o lesioni personali causate da
                negligenza, per dolo o colpa grave, e ogni altra ipotesi in cui la legge non
                consente limitazioni di responsabilità. Nessuna disposizione di questi termini
                limita i diritti inderogabili riconosciuti al consumatore dal Codice del
                Consumo, inclusi quelli relativi al diritto di recesso e alla garanzia legale di
                conformità descritti sopra.
              </p>
            </LegalSection>

            {/* ADR ai sensi dell'art. 141-sexies cod. cons. Nessun riferimento
                alla piattaforma ODR europea: il Reg. (UE) 524/2013 è stato
                abrogato dal Reg. (UE) 2024/3228 — obbligo di link cessato il
                19 gennaio 2025, piattaforma dismessa il 20 luglio 2025. Non
                reintrodurre il link ODR. */}
            <LegalSection title="10. Legge applicabile, foro competente e ADR" delay={0.18}>
              <p>
                Le presenti condizioni sono regolate dalla legge italiana. Per le controversie in
                cui l&rsquo;acquirente riveste la qualità di consumatore, è competente in via
                esclusiva il foro del luogo di residenza o domicilio del consumatore, se ubicato
                nel territorio dello Stato italiano, ai sensi dell&rsquo;art. 33, comma 2, lett.
                u), del Codice del Consumo. Per le controversie relative ad acquisti effettuati da
                soggetti che agiscono nell&rsquo;esercizio della propria attività professionale,
                è competente in via esclusiva il Foro di Treviso.
              </p>
              <p>
                <em>Risoluzione alternativa delle controversie (ADR):</em> ai sensi degli artt.
                141 e seguenti del Codice del Consumo, se hai presentato un reclamo a Axon-Tech
                S.r.l. senza che sia stato risolto in modo soddisfacente, puoi rivolgerti a un
                organismo di risoluzione alternativa delle controversie iscritto nell&rsquo;elenco
                tenuto dalle autorità competenti (per il settore, il Ministero delle Imprese e
                del Made in Italy), tra cui gli organismi di conciliazione delle Camere di
                Commercio, ad esempio quello della CCIAA di Treviso – Belluno. Su richiesta,
                forniamo l&rsquo;indicazione dell&rsquo;organismo o degli organismi competenti.
              </p>
            </LegalSection>

            <LegalSection title="11. Modifiche alle condizioni" delay={0.2}>
              <p>
                Axon-Tech S.r.l. può aggiornare queste condizioni nel tempo. Agli ordini
                effettuati si applicano le condizioni pubblicate al momento dell&rsquo;ordine. La
                data di ultimo aggiornamento è indicata in cima a questa pagina.
              </p>
            </LegalSection>

          </div>
        </Container>
      </Section>
    </>
  )
}
