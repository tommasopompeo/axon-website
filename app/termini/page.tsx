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
 *    "Acquista" reindirizzano a una pagina prodotto Shopify non ancora
 *    configurata (SHOPIFY_KIT_URL / SHOPIFY_SHELL_URL in lib/links.ts sono
 *    placeholder '#'). Il testo descrive l'acquisto come perfezionato sulla
 *    piattaforma esterna a cui si viene reindirizzati, senza specificare
 *    metodi di pagamento puntuali: aggiornare quando l'integrazione è live.
 * 5. Tempi di consegna: non essendo indicato un termine contrattuale fisso
 *    (lo Shop rimanda ai "tempi indicati al momento dell'ordine"), si cita il
 *    termine massimo di legge (30 giorni dalla conclusione del contratto,
 *    art. 61 Codice del Consumo) come rete di sicurezza. Confermare lo SLA
 *    reale del corriere.
 * 6. Prezzo AXON SHELL (kit da 5): in knowledge/product.md il prezzo è
 *    segnato "da definire" — questo testo copre solo AXON KIT (€230, prezzo
 *    confermato). Aggiungere le condizioni dello Shell quando il prezzo sarà
 *    definitivo.
 * 7. Piattaforma ODR UE: non viene incluso un link diretto, perché il suo
 *    funzionamento risulta cambiato nel tempo — verificare l'indicazione
 *    corretta da fornire ai consumatori prima della pubblicazione.
 * 8. Dati camerali (n. REA, capitale sociale, PEC) non presenti nel
 *    repository e non inclusi in questo testo — aggiungere se richiesti.
 * ────────────────────────────────────────────────────────────────────── */

import type { Metadata } from 'next'
import { Container, Section, Reveal } from '@/components/ui'
import LegalSection from '@/components/legal/LegalSection'

export const metadata: Metadata = {
  title: 'Termini e condizioni',
  description:
    'Condizioni di vendita dei prodotti Axon: identità del venditore, prezzo, consegna, diritto di recesso, garanzia legale di conformità e responsabilità.',
  alternates: { canonical: '/termini' },
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
                Ultimo aggiornamento: 17 agosto 2026
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Corpo ── */}
      <Section id="contenuto" background="black" className="!pt-0">
        <Container>
          <div className="max-w-[70ch] flex flex-col gap-14">

            <LegalSection title="1. Chi vende">
              <p>I prodotti descritti in questa pagina sono venduti da:</p>
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
                Le presenti condizioni regolano la vendita a distanza dei prodotti Axon e
                l&rsquo;utilizzo del sito axon-tech.it, ai sensi del Codice del Consumo (D.Lgs.
                206/2005) per i contratti conclusi con i consumatori.
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

            <LegalSection title="3. Prezzo" delay={0.06}>
              <p>
                Il prezzo di AXON KIT è <strong style={{ color: 'var(--text)' }}>€ 230,00</strong>{' '}
                (duecentotrenta/00 euro), IVA e spedizione in Italia incluse. I prezzi indicati
                sul sito sono espressi in Euro e comprensivi di imposta sul valore aggiunto
                (IVA). Eventuali variazioni di prezzo non si applicano agli ordini già
                confermati.
              </p>
            </LegalSection>

            <LegalSection title="4. Come si conclude l'acquisto" delay={0.08}>
              <p>
                L&rsquo;acquisto non si perfeziona su questo sito: il pulsante &ldquo;Acquista&rdquo;
                reindirizza alla pagina prodotto della piattaforma di vendita ufficiale, dove
                l&rsquo;ordine viene effettivamente inserito e pagato. Le presenti condizioni si
                applicano comunque al rapporto contrattuale tra l&rsquo;acquirente e Axon-Tech
                S.r.l. in merito al prodotto acquistato. Le modalità di pagamento accettate sono
                indicate al momento del checkout sulla piattaforma di vendita.
              </p>
            </LegalSection>

            <LegalSection title="5. Consegna" delay={0.1}>
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

            <LegalSection title="6. Diritto di recesso" delay={0.12}>
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
                anche il modulo tipo di recesso previsto dall&rsquo;Allegato I, parte B, del
                Codice del Consumo.
              </p>
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

            <LegalSection title="7. Garanzia legale di conformità" delay={0.14}>
              <p>
                I prodotti Axon sono coperti dalla garanzia legale di conformità di{' '}
                <strong style={{ color: 'var(--text)' }}>2 anni</strong> dalla consegna, prevista
                dagli artt. 128-135 del Codice del Consumo per i beni acquistati da consumatori.
                Se il prodotto presenta un difetto di conformità, hai diritto alla riparazione o
                sostituzione senza spese oppure, nei casi previsti dalla legge, alla riduzione
                del prezzo o alla risoluzione del contratto.
              </p>
              <p>
                Il difetto deve essere denunciato entro 2 mesi dalla scoperta, a pena di
                decadenza. Se il difetto si manifesta entro un anno dalla consegna, si presume
                che fosse già presente al momento della consegna, salvo prova contraria o
                incompatibilità con la natura del bene o del difetto.
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

            <LegalSection title="8. Limitazione di responsabilità" delay={0.16}>
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

            <LegalSection title="9. Legge applicabile e foro competente" delay={0.18}>
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
                Per la risoluzione extragiudiziale delle controversie, il consumatore può
                inoltre rivolgersi agli organismi di risoluzione alternativa delle controversie
                (ADR) competenti, ai sensi del Titolo II-bis del Codice del Consumo.
              </p>
            </LegalSection>

            <LegalSection title="10. Modifiche alle condizioni" delay={0.2}>
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
