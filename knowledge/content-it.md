# AXON — Contenuti del sito (Italiano)

> Tutte le stringhe di testo del sito, organizzate per pagina e sezione.
> Il sito è **solo in italiano**. Claim solo come da `knowledge/product.md`.
> Motto ricorrente (mission): **"La forza invisibile che rivoluziona il movimento."**

---

# NAV (header, sticky, su tutte le pagine)
- Logo AXON (SVG, wordmark bianco con X rossa) → link a "/"
- Voci: **Applicazioni** (/applicazioni) · **Come funziona** (/come-funziona) ·
  **Perchè AXON** (/perche-axon) · **Fisioterapisti** (/fisioterapisti) ·
  **Aziende** (/aziende)
- CTA primaria (bottone rosso): **Acquista AXON** → /shop
- Mobile: menu hamburger con le stesse voci.

# FOOTER (su tutte le pagine)
- Logo AXON + tagline: *"La forza invisibile che rivoluziona il movimento."*
- Colonna Navigazione: Come funziona · Testimonianze · FAQ · Shop · Aziende · Contatti
- Colonna Prodotto: AXON KIT · AXON SHELL™ · Come si usa · FAQ
- Colonna Azienda: Axon-Tech S.r.l. · Contatti · info@axon-tech.it
- Social: Instagram · TikTok · LinkedIn (placeholder)
- Riga legale: "Axon è un dispositivo medico di Classe I. Leggere le istruzioni per l'uso.
  © {anno} Axon-Tech S.r.l. — Via Verdi 73, 31100 Treviso (TV). P.IVA [placeholder]."
- Link: Privacy · Cookie · Termini (placeholder)

---

# PAGINA: HOME ("/")

## 1. HERO
- Eyebrow/badge: **Dispositivo medico · Classe I**
- H1: **La forza invisibile che rivoluziona il movimento**
- Sottotitolo: *Axon è un dispositivo medico passivo che si applica ai tuoi capi e,
  con i micro-movimenti di ogni giorno, aiuta a migliorare equilibrio, forza e
  rilassamento muscolare. Senza batterie. Senza contatto con la pelle.*
- CTA primaria: **Scopri Axon** → #come-funziona
- CTA secondaria: **Acquista il Kit** → /shop
- Immagine: video background (hero-video.mp4).

## 1b. CONTESTI (bento — sezione intro che consolida benefici e dati) — id: contesti
- H2: **La tua performance, in ogni contesto.**
- Sottotitolo: *Micro-stimolazioni vibrazionali passive che sostengono equilibrio, forza,
  flessibilità e recupero muscolare. Senza batterie, senza contatto con la pelle.*
- Bento grid 3 colonne × 2 righe (desktop). Le 3 foto hanno overlay scuro di base + scrim
  gradiente rinforzato in basso (per leggibilità del testo bianco). Parole chiave nelle frasi
  overlay evidenziate (bold bianco + sottolineatura sottile brand):
  - **corsa.png** (colonna 1, span 2 righe) — icona Footprints — *"Più [resistenza alla fatica] e controllo del passo, chilometro dopo chilometro."*
  - **Box dati** (colonna 2, riga 1) — sfondo brand rosso (non scurito) — icona TrendingUp — tre dati impilati e compatti (corsa / nuoto / palestra):
    - **+42%** — potenza nel movimento
    - **+28%** — equilibrio
    - **+30%** — forza
  - **nuoto.png** (colonna 2, riga 2) — icona Waves — *"[Equilibrio e stabilità] posturale, dentro e fuori dall'acqua."*
  - **palestra.png** (colonna 3, span 2 righe) — icona Dumbbell — *"[Forza] e tono muscolare in ogni ripetizione."*
- Alt immagini: "Persona che corre" · "Persona che nuota" · "Persona che si allena in palestra".
- Nota sotto la griglia (text-subtle): *\* Studio pilota IPAB F. Fenzi, 14 soggetti. Risultati preliminari.*

## 2. INTRO ("come funziona") — id: come-funziona
- H2: **Silenzioso. Passivo. Continuo.**
- Testo: *Axon non emette energia e non rilascia sostanze. Una componente nanostrutturata
  trasforma i tuoi micro-movimenti quotidiani in micro-vibrazioni impercettibili che
  aiutano il corpo a ricalibrare il proprio equilibrio neuro-muscolare. Tu indossi i tuoi
  capi di sempre: Axon lavora da solo.*
- (I tre dati del pilota sono ora nel box rosso della sezione CONTESTI.)

## 3. "COME SI APPLICA" (accordion + immagine) — id: come-fatto
- H2: **Tre passi, e basta.**
- Layout: immagine a sinistra (frame fisso, aspect 4/5) + accordion a destra. Prima voce
  aperta di default. Cambio immagine con crossfade al cambio accordion.
- Accordion (ordine):
  1. **Cuci** (icona Scissors) — *Fissa il guscio al capo: nuca, fascia lombare o petto. Bastano pochi punti.* → immagine: axon-shell-sewn.png
  2. **Inserisci** (icona PackagePlus) — *Metti Axon nell'Axon Shell™, il guscio funzionale dedicato.* → immagine: axon-watch.png
  3. **Indossa** (icona Shirt) — *Vivi la tua giornata. Axon si attiva con i tuoi movimenti.*
- Micro-nota: *In alternativa, Axon può essere cucito direttamente lungo la circonferenza.
  Nessun contatto con la pelle richiesto.*

> **NOTA:** la vecchia sezione standalone "Benefici" (6 card, #benefici) è stata RIMOSSA
> dalla home. I benefici sono ora assorbiti dal sottotitolo e dai 3 dati della sezione
> CONTESTI (§1b). Voce "Benefici"/anchor #benefici rimossa anche da header e footer.

## 5. "A CHI È RIVOLTO" (carosello di contesti) — id: per-chi
- H2: **Per come ti muovi, ogni giorno.**
- Sottotitolo (text-muted): *Axon lavora con te in ogni contesto, dal lavoro allo sport.*
- Layout: carosello orizzontale di card-immagine (stile "AI in Action" di EvoTrack). Frame
  unico ad aspect-ratio fisso e **identico** per tutte le card (3/4), raggio `--radius-lg`,
  immagine `object-cover`. Scroll-snap + frecce prev/next (pill brand, disabilitate ai bordi,
  no loop), peek della card successiva, swipe su mobile. Overlay testo in basso a sinistra su
  scrim gradiente (titolo bianco bold + breve descrizione).
- 4 categorie (titolo + descrizione esatti):
  1. **Vita quotidiana** — Postura e tensioni delle lunghe ore da seduti. *(ufficio.png)*
  2. **Anzianità** — Supporto a equilibrio e stabilità, per più autonomia. *(anziano.png)*
  3. **Sport** — Equilibrio, forza e recupero, in ogni disciplina. *(sciatore.png)*
  4. **Lavori intensivi** — Meno affaticamento muscolare a fine turno. *(intenso.png)*
- CTA: **Scopri lo studio** → #testimonianze

## 6. PRODOTTI (preview shop) — id: prodotti
- H2: **Inizia con il Kit. Estendi con i gusci.**
- Card prodotto 1 — **AXON KIT**
  - Sottotitolo: Dispositivo medico · Ø 30 mm
  - Include: 1 dispositivo Axon · 1 Axon Shell™ · scatola originale
  - Prezzo: **€ 230,00** *(IVA e spedizione incluse)*
  - CTA: **Acquista** → redirect Shopify (URL placeholder)
- Card prodotto 2 — **AXON SHELL™ — Kit da 5**
  - Sottotitolo: Gusci funzionali originali · cucibili · riciclabili
  - Include: 5 gusci AXON SHELL™
  - Prezzo: **[da definire]**
  - CTA: **Acquista** → redirect Shopify (URL placeholder)
- Nota fascia: *Solo l'Axon Shell™ originale garantisce le condizioni per cui Axon è
  stato progettato.*

## 7. TESTIMONIANZE — id: testimonianze
- H2: **Chi lo indossa, lo racconta**
- Sottotitolo: *Esperienze reali con Axon, nella vita di tutti i giorni.*
- Carousel (vedi testi in sezione "TESTIMONIANZE (testi)" più sotto).

## 8. FAQ — id: faq
- H2: **Domande frequenti**
- Sottotitolo: *Tutto quello che c'è da sapere prima di iniziare.*
- (vedi sezione "FAQ (testi)" più sotto)
- CTA accanto: **Hai altre domande? Scrivici** → /contatti

## 9. CTA FINALE
- H2: **Porta Axon nella tua giornata**
- Testo: *Un dispositivo medico passivo, discreto, che lavora con te. Inizia oggi.*
- CTA primaria: **Acquista il Kit** → /shop
- CTA secondaria: **Sei un'azienda?** → /aziende

---

# PAGINA: SHOP ("/shop")
- H1: **Shop**
- Sottotitolo: *Scegli il tuo Axon. Spedizione inclusa in Italia.*
- 2 schede prodotto (stesse info della preview, versione estesa):
  - **AXON KIT** — descrizione completa, contenuto, "perché il kit originale",
    avvertenze brevi, prezzo € 230,00, CTA **Acquista su Shopify**.
  - **AXON SHELL™ Kit da 5** — descrizione completa, materiali, vantaggi, prezzo [TBD],
    CTA **Acquista su Shopify**.
- Sezione fiducia: garanzia 2 anni · dispositivo medico Classe I · spedizione inclusa ·
  reso secondo termini.
- Mini-FAQ acquisto: spedizioni, resi, garanzia (placeholder brevi).

---

# PAGINA: AZIENDE ("/aziende")  — Enterprise, accessibile senza credenziali
- H1: **Axon per le aziende**
- Sottotitolo: *Una tecnologia orizzontale, integrabile in prodotti, percorsi e team.
  Dalla moda allo sport, dalla sanità al benessere sul lavoro.*
- CTA: **Parla con noi** → form sotto

## Sezione "Casi d'uso" (use case grid)
- Eyebrow: **Dove può essere integrato**
- H2: **Un dispositivo, molti settori**
- Card:
  1. **Moda e abbigliamento** — Integrare Axon in capi, intimo tecnico, activewear.
  2. **Calzature** — Inserire Axon in scarpe e solette per supporto a postura ed equilibrio.
  3. **Sanità e RSA** — Strutture come case di riposo e centri riabilitativi
     (vedi studio pilota IPAB F. Fenzi): equilibrio e prevenzione cadute.
  4. **Sport e performance** — Squadre, palestre e centri sportivi: supporto a forza,
     equilibrio e recupero.
  5. **Benessere sul lavoro** — Programmi corporate per chi passa molte ore seduto.
  6. **Tutori e ortopedia** — Applicazione su tutori e supporti, su indicazione clinica.

## Sezione "Perché Axon per il B2B"
- Passivo e sicuro: nessuna batteria, nessuna elettronica, nessuna manutenzione.
- Integrabile: si applica/cuce su tessuti, calzature, accessori.
- Discreto: invisibile a chi lo indossa.
- Dispositivo medico di Classe I.

## FORM AZIENDE (più specifico)
- Titolo: **Raccontaci la tua esigenza**
- Campi:
  - Nome e cognome *(obbligatorio)*
  - Azienda *(obbligatorio)*
  - Ruolo
  - Email aziendale *(obbligatorio)*
  - Telefono
  - **Settore** (select): Moda/abbigliamento · Calzature · Sanità/RSA · Sport ·
    Benessere aziendale · Ortopedia/tutori · Altro
  - **Tipo di interesse** (select): Integrare Axon in un prodotto · Fornitura per la
    mia struttura/team · Progetto pilota/sperimentazione · Distribuzione/rivendita · Altro
  - **Volumi stimati** (select): <100 · 100–1.000 · 1.000–10.000 · >10.000 · Non so ancora
  - **Messaggio** (textarea): descrivi il contesto e l'obiettivo
  - Consenso privacy *(checkbox obbligatoria)*
  - CTA: **Invia richiesta**
- Messaggio di conferma: *Grazie. Il team Axon ti ricontatterà al più presto.*

---

# PAGINA: CONTATTI ("/contatti")
- H1: **Contatti**
- Sottotitolo: *Domande su Axon, ordini o assistenza? Scrivici.*
- FORM:
  - Nome e cognome *(obbligatorio)*
  - Email *(obbligatorio)*
  - Oggetto (select): Informazioni prodotto · Ordine/spedizione · Assistenza · Altro
  - Messaggio (textarea) *(obbligatorio)*
  - Consenso privacy *(checkbox obbligatoria)*
  - CTA: **Invia messaggio**
- Box contatti diretti: **info@axon-tech.it** · Axon-Tech S.r.l., Via Verdi 73,
  31100 Treviso (TV).
- Messaggio di conferma: *Messaggio inviato. Ti risponderemo via email.*

---

# TESTIMONIANZE (testi)  — ⚠️ ESEMPI da validare/sostituire con quote reali autorizzate
> Realistici e coerenti col prodotto; tono esperienziale, nessun claim di cura.

1. **Giulia Ferraro — Fisioterapista, Treviso**
   *"Lo consiglio ad alcuni pazienti come supporto ai percorsi che già seguono. La cosa
   che apprezzo è che è passivo e non invasivo: si applica al capo e non ci pensi più."*

2. **Marco Bellandi — Runner amatoriale, Bologna**
   *"L'ho cucito nella fascia dei pantaloncini. Non sento nulla mentre corro, ma sulle
   uscite lunghe ho la sensazione di gestire meglio la fatica."*

3. **Dott.ssa Elena Rossi — Geriatra, Conegliano**
   *"Nei contesti di terza età l'equilibrio è tutto. I primi dati raccolti in struttura
   sono incoraggianti, soprattutto sulla stabilità del cammino."*

4. **Sara De Luca — Impiegata, Milano**
   *"Passo otto ore alla scrivania. Da quando lo tengo sulla giacca le tensioni a fine
   giornata mi sembrano più gestibili. Ed è invisibile, nessuno se ne accorge."*

5. **Luca Moretti — Preparatore atletico, Verona**
   *"Lo abbiamo provato con alcuni ragazzi della squadra come supporto in più al recupero.
   Zero manutenzione, zero batterie: per noi è un vantaggio pratico enorme."*

---

# FAQ (testi)
1. **Cos'è Axon?**
   Un dispositivo medico di Classe I, passivo e non invasivo: un disco che si applica ai
   tuoi capi e, con i micro-movimenti del corpo, genera micro-vibrazioni impercettibili
   che aiutano a migliorare equilibrio, forza e rilassamento muscolare. Non è un farmaco.

2. **Come si usa?**
   Si inserisce nell'Axon Shell™ e si cuce il guscio al capo (nuca, fascia lombare o petto),
   oppure si cuce direttamente. Poi basta indossare il capo normalmente. Non serve contatto
   con la pelle.

3. **Devo ricaricarlo o accenderlo?**
   No. Axon è completamente passivo: niente batterie, niente elettronica, niente ricarica.

4. **Si sente mentre lo indosso?**
   No. Le micro-vibrazioni sono sub-percettibili: non te ne accorgi.

5. **Quanto tempo prima di notare qualcosa?**
   Axon è pensato per un uso regolare e continuativo. Gli effetti riguardano equilibrio,
   forza, resistenza alla fatica e rilassamento muscolare con l'uso nel tempo.

6. **Come si lava il capo?**
   Versione removibile: estrai Axon e lava il capo normalmente; pulisci Axon a mano con
   sapone neutro. Versione cucita: lavaggio a mano max 30 °C, senza lavatrice, asciugatrice
   o ferro diretto sull'area del dispositivo.

7. **Ci sono controindicazioni?**
   Nessuna controindicazione nota e nessun effetto collaterale segnalato. Non applicare su
   ferite aperte o pelle lesa. Per precauzione è sconsigliato a donne in gravidanza e
   bambini sotto i 3 anni.

8. **Quanto dura e che garanzia ha?**
   È riutilizzabile a lungo se conservato correttamente. Garanzia di 2 anni dalla data
   d'acquisto.

9. **Cosa contiene il Kit?**
   1 dispositivo Axon Ø 30 mm, 1 Axon Shell™ e la scatola originale. A € 230,00, IVA e
   spedizione incluse.

10. **Sono un'azienda: posso integrare Axon nei miei prodotti?**
    Sì. Axon è una tecnologia orizzontale, integrabile in capi, calzature, tutori e
    programmi per strutture e team. Visita la pagina **Aziende** e scrivici.
