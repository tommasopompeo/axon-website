# AXON — Contenuti del sito (Italiano)

> Tutte le stringhe di testo del sito, organizzate per pagina e sezione.
> Il sito è **solo in italiano**. Claim solo come da `knowledge/product.md`.
> Motto ricorrente (mission): **"La forza invisibile che rivoluziona il movimento."**

---

# NAV (header, sticky, su tutte le pagine)
- Logo AXON (SVG, wordmark bianco con X rossa) → link a "/"
- Voci: **Applicazioni** (/applicazioni) · **Come funziona** (/come-funziona) ·
  **Perchè AXON** (/perche-axon) · **Professionisti** (/professionisti) ·
  **Aziende** (/aziende)
- CTA primaria (bottone rosso): **Acquista AXON** → /shop
- Mobile: menu hamburger con le stesse voci.

# FOOTER (su tutte le pagine) — aggiornato 2026-08-17, vedi DESIGN.md §5
- Blocco brand: logo AXON + tagline *"La forza invisibile che rivoluziona il movimento."*
  + icone social condizionate (rese solo se non più `'#'` in `lib/links.ts`).
- Colonna Azienda: Axon-Tech S.r.l. (testo semplice, non link) · Contatti (/contatti) ·
  info@axon-tech.it
- Colonna Navigazione: rispecchia le 5 voci dell'header, stesso ordine — Applicazioni ·
  Come funziona · Perchè AXON · Professionisti · Aziende — + Shop. Niente più
  Testimonianze/FAQ/Contatti come voci di questa colonna (restano raggiungibili in pagina/
  dal Footer stesso, ma non elencate qui).
- Colonna Informazioni Legali: Privacy (/privacy) · Cookie (/cookie) · Termini (/termini) —
  pagine reali, non più placeholder `#`. Non esiste più una colonna "Prodotto".
- Riga legale (fine stampa): "Axon è un dispositivo medico di Classe I. Leggere le istruzioni
  per l'uso. © {anno} Axon-Tech S.r.l. — Via Verdi 73, 31100 Treviso (TV). P.IVA
  IT05577370264."

---

# PAGINA: HOME ("/")

## 1. HERO — id: top
- Eyebrow/badge: **Dispositivo medico classe I**
- H1: **La forza invisibile che rivoluziona il movimento**
- Sottotitolo: *Axon è un dispositivo medico passivo che si applica ai tuoi capi e,
  con i micro-movimenti di ogni giorno, aiuta a migliorare equilibrio, forza e
  rilassamento muscolare. Senza batterie. Senza contatto con la pelle.*
- CTA: **Acquista AXON** → /shop
- Sfondo: video background (`/hero-video.mp4`). Testo e CTA in **nero** (il video ha sfondo chiaro).

## 2. CONTESTI (ContestiBento) — id: contesti
- H2: **Migliora il tuo benessere a 360°**
- Sottotitolo: *Micro-stimolazioni vibrazionali passive che sostengono equilibrio, forza,
  flessibilità e recupero muscolare. Senza batterie, senza contatto con la pelle.
  Tu indossi i tuoi capi di sempre: Axon lavora da solo.*
- Bento grid 3 colonne × 2 righe (desktop):
  - **corsa.jpg** (col 1, span 2 righe) — *"Più resistenza alla fatica e controllo del passo."*
  - **Box dati** (col 2, riga 1) — sfondo **bianco**, stat in rosso brand — 4 sub-box:
    - **+42%** — potenza nel movimento
    - **+28%** — equilibrio
    - **+30%** — forza
    - **+21%** — resistenza
  - **nuoto.jpg** (col 2, riga 2) — *"Equilibrio e stabilità posturale."*
  - **palestra.jpg** (col 3, span 2 righe) — *"Forza e tono muscolare."*

## 3. COME SI APPLICA (HowItsDoneSection) — id: come-indossare
- H2: **Indossa Axon come preferisci**
- Sottotitolo: *Progettato per adattarsi perfettamente al tuo stile di vita. Scegli la
  soluzione più comoda per te ed esprimi il massimo del tuo benessere in ogni momento.*
- Layout: griglia a 2 colonne, ciascuna con immagine + box testo nero:
  1. **Cucilo direttamente sui tuoi capi** — *Fissa l'Axon Shell a qualsiasi capo
     d'abbigliamento — alla nuca, sul petto o sulla schiena — con pochi punti di cucitura.
     Inserisci poi il dispositivo Axon nel guscio ogni volta che lo indossi.* →
     axon-shell-sewn.jpg · CTA "Vedi nello shop" → /shop
  2. **Axon Band: indossalo al polso** — *Indossa Axon comodamente al polso grazie
     all'esclusivo cinturino Axon Band.* → axon-watch.jpg · CTA "Vedi nello shop" → /shop

## 4. A CHI È RIVOLTO (TargetCarousel) — id: per-chi
- H2: **Per come ti muovi, ogni giorno**
- Sottotitolo: *Axon lavora con te in ogni contesto, dal lavoro allo sport.*
- Griglia 4 card:
  1. **Vita quotidiana** — *Postura e tensioni delle lunghe ore da seduti.* (ufficio.jpg)
  2. **Anzianità** — *Supporto a equilibrio e stabilità, per più autonomia.* (anziano.jpg)
  3. **Sport** — *Equilibrio, forza e recupero, in ogni disciplina.* (sciatore.jpg)
  4. **Lavori intensivi** — *Meno affaticamento muscolare a fine turno.* (intenso.jpg)

## 5. TESTIMONIANZE — id: testimonianze
- H2: **Chi lo indossa, lo racconta**
- Sottotitolo: *Esperienze reali con Axon, nella vita di tutti i giorni.*
- Carousel (vedi sezione "TESTIMONIANZE (testi)" più sotto).

## 6. FAQ — id: faq
- H2: **Domande frequenti**
- Sottotitolo: *Tutto quello che c'è da sapere prima di iniziare.*
- Accordion 10 domande (vedi sezione "FAQ (testi)" più sotto).
- CTA: **Hai altre domande? Scrivici** → /contatti

---

# PAGINA: APPLICAZIONI ("/applicazioni")
- H1: **Indossa AXON in ogni occasione**
- Sfondo: `hero_applicazioni.jpg`, overlay 30%.

## StickyScrollApplicazioni — 7 contesti (scroll sticky)
1. **Ufficio** — *Ore alla scrivania, riunioni... AXON agisce in silenzio...* (applicazioni/1.jpg)
2. **Quotidianità** — *La routine quotidiana... Con AXON addosso hai un supporto costante...* (applicazioni/2.jpg)
3. **Sport** — *AXON supporta la muscolatura durante la performance...* (applicazioni/3.jpg)
4. **Recupero** — *AXON amplifica i processi naturali di rigenerazione...* (applicazioni/4.jpg)
5. **Lavori intensivi** — *In cantiere o in magazzino...* (applicazioni/5.jpg)
6. **Riposo** — *AXON favorisce il rilassamento del sistema nervoso...* (applicazioni/6.jpg)
7. **Svago** — *Che sia una passeggiata, una serata fuori...* (applicazioni/7.jpg)

## AxonFeaturesSection — caratteristiche del dispositivo (usa axon_no_bkg.png — PNG mantenuto, canale alpha)

## WearMethodSection — 2 metodi di applicazione
- H2: **Scegli come indossarlo, AXON funziona dovunque**
1. **AXON + Band** — applicazioni_axonband.jpg
2. **AXON + Shell** — applicazioni_axonshell.jpg

---

# PAGINA: COME FUNZIONA ("/come-funziona")
- H1: **La tecnologia dietro AXON**
- Sfondo: `come_funziona_hero.jpg`, overlay 30%.

## VideoSection
- Video esplicativo: `video_come_funziona.mp4`

## ScienceSection — 3 pillar scientifici
- H2: **Le basi scientifiche del movimento passivo**
- Sottotitolo: *Una breve panoramica nelle basi neuro-fisiologiche e nei materiali che rendono possibile una nuova generazione di soluzioni passive per il sistema neuromuscolare.*
- 3 pillar (ogni pillar ha intro + accordion "Approfondimento tecnico" + immagine):
  1. **Come il corpo "sente" il movimento** (Meccanotrasduzione, Piezo1/Piezo2) — comefunziona1.jpg
  2. **Le vibrazioni come strumento terapeutico** (Tonic Vibration Reflex, WBV) — comefunziona2.jpg
  3. **Dai dispositivi attivi ai nanomateriali passivi** — comefunziona3.jpg
- Sezione fonti bibliografiche in fondo (5 riferimenti PubMed).

---

# PAGINA: PERCHÉ AXON ("/perche-axon")

## HERO
- H1: **I risultati di chi ha indossato AXON**
- Sfondo: `hero_perche_axon.jpg`, overlay 30%.

## INTRO (paragrafo, sfondo nero)
- *Tutti i test sono stati condotti in un contesto medico-scientifico rigoroso, confrontando
  la condizione di ogni persona prima e dopo l'applicazione del dispositivo. Di seguito i
  risultati principali emersi su equilibrio, forza e mobilità.*

## TRE SEZIONI RISULTATI (ResultsAccordion — click-to-expand)
> Ogni metrica compare UNA sola volta.

**A. Equilibrio, stabilità e controllo del movimento** (immagine a destra):
- Equilibrio e andatura — Tinetti +28,4% (p = 0.0024) — grafici-perche-axon/1.png
- Salita delle scale — Qualità esecuzione +42,4% (p = 0.0025) — grafici-perche-axon/2.png
- Stabilità posturale — ↓ oscillazione area stabilometrica (D-WALL) — grafici-perche-axon/3.png
- Performance funzionale — SPPB +19,4% (p = 0.0126) — grafici-perche-axon/4.png

**B. Forza e risposta neuromuscolare** (immagine a sinistra, sfondo elevated):
- Forza di presa — forza media +30,4% (dz = 1.54, p < 0.001) — grafici-perche-axon/5.png
- Picco di forza — +22,8% (p = 0.0039) — grafici-perche-axon/6.png

**C. Flessibilità e mobilità** (immagine a destra):
- Flessibilità lombare — ↑ angolo di flessione del busto — grafici-perche-axon/7.png

## PARTNER (PartnerSection — sfondo bianco)
- H2: **I nostri partner** (titolo display nero, stesso font delle hero)
- Sottotitolo: *Strutture e realtà che hanno scelto di mettere alla prova AXON al fianco delle persone di cui si prendono cura.*
- Layout 2 colonne: testo a sinistra, loghi a destra.
- 2 loghi reali: `/logo1.png` (w≈240–290px) e `/logo2.png` (w≈130–160px). Nessun grayscale.
- Pattern crescita: aggiungere item all'array `partners` in `PartnerSection.tsx`.

---

# PAGINA: SHOP ("/shop")
- H1: **Shop**
- Sottotitolo: *Scegli il tuo Axon. Spedizione inclusa in Italia.*
- Prodotto 1 — **AXON KIT**: immagini kit-1.jpg / kit-2.jpg, prezzo € 230,00, CTA → Shopify
- Prodotto 2 — **AXON SHELL Kit da 5**: immagini shell-1.jpg / shell-2.jpg, prezzo € 30,00, CTA → Shopify
- Sezione fiducia: garanzia 2 anni · dispositivo medico Classe I · spedizione inclusa.

---

# PAGINA: PROFESSIONISTI ("/professionisti")
- H1: **Sei un professionista?**
- Sottotitolo: *Se lavori con pazienti o clienti — come fisioterapista, medico, personal
  trainer o altro professionista della salute e del movimento — e vuoi integrare Axon
  nella tua attività, sei nel posto giusto.*

## Sezione "Ambiti professionali"
- H2: **Una tecnologia, molte professioni**
- 6 card: Fisioterapisti · Medici e specialisti · Personal trainer ·
  Osteopati e chiropratici · Podologi · Educatori motori e trainer per anziani

## Form professionisti — id: contatto-professionisti
- H2: **Raccontaci la tua esigenza**
- Sottotitolo: *Il team Axon ti ricontatterà per valutare insieme la soluzione più adatta.*
- Campi: Nome cognome · Professione (select) · Studio/struttura · Email ·
  Telefono · Ambito principale (select) · Tipo di interesse (select) ·
  Pazienti/clienti seguiti (select) · Messaggio · Consenso privacy
- CTA: **Invia richiesta**
- Conferma: *Richiesta ricevuta. Grazie. Il team Axon ti ricontatterà al più presto.*

> Nota: `/fisioterapisti` è il vecchio slug di questa pagina — redirect 301 permanente
> verso `/professionisti` (vedi `next.config.ts`).

---

# PAGINA: AZIENDE ("/aziende") — aggiornata 2026-08-17 (H1/sottotitolo/sezioni corretti su verifica codice)
- H1: **Sei un azienda?**
- Sottotitolo: *Se vuoi integrare Axon nei tuoi prodotti, calzature o percorsi aziendali —
  per i tuoi clienti, i tuoi dipendenti o la tua struttura — sei nel posto giusto.*
- Nessuna CTA nell'hero: si scorre direttamente alla sezione casi d'uso/form sotto.

## Sezione "Casi d'uso" — id: casi-uso
- H2: **Un dispositivo, molti settori**
- Sottotitolo: *Dove può essere integrato.*
- 6 card (`Card variant="white"`, icona `lucide-react` + titolo + testo):
  1. **Moda e abbigliamento** — Integrare Axon in capi, intimo tecnico, activewear.
  2. **Calzature** — Inserire Axon in scarpe e solette per supporto a postura ed equilibrio.
  3. **Sanità e RSA** — Case di riposo e centri riabilitativi: equilibrio e prevenzione cadute.
  4. **Sport e performance** — Squadre, palestre e centri sportivi: supporto a forza, equilibrio e recupero.
  5. **Benessere sul lavoro** — Programmi corporate per chi passa molte ore seduto.
  6. **Tutori e ortopedia** — Applicazione su tutori e supporti, su indicazione clinica.

> Non esiste una sezione "Perché Axon per il B2B" separata (Passivo e sicuro/Integrabile/
> Discreto/Dispositivo medico Classe I) — non è presente nel codice attuale.

## Form B2B — id: contatto-aziende
- H2: **Raccontaci la tua esigenza**
- Sottotitolo: *Il team Axon ti ricontatterà per valutare insieme la soluzione più adatta.*
- Campi: Nome cognome · Azienda · Ruolo · Email aziendale · Telefono ·
  Settore (select) · Tipo di interesse (select) · Volumi stimati (select) ·
  Messaggio · Consenso privacy
- CTA: **Invia richiesta**
- Conferma: *Richiesta ricevuta. Grazie. Il team Axon ti ricontatterà al più presto.*

---

# PAGINA: CONTATTI ("/contatti") — aggiornata 2026-08-17, vedi DESIGN.md §10
- H1: **Contatti**
- Sottotitolo hero: *Domande su Axon, ordini o assistenza? Scrivici.*
- Layout a due colonne (pattern B2B, come Professionisti/Aziende): colonna sinistra
  "Domande frequenti" con 3 FAQ in accordion (id `come-si-usa` · `contenuto-kit` ·
  `lavaggio`, selezionate da `lib/faqs.ts` — stessa fonte della Home), colonna destra
  il form. Non esiste più il vecchio box "Contatti diretti" (email/indirizzo/Instagram):
  quell'informazione resta comunque raggiungibile in Footer (colonna Azienda + riga legale).
- Form: Nome cognome · Email · Oggetto (select) · Messaggio · Consenso privacy
- CTA: **Invia messaggio**
- Conferma: *Messaggio inviato. Ti risponderemo via email al più presto.*

---

# TESTIMONIANZE (testi) — ⚠️ ESEMPI da validare/sostituire con quote reali autorizzate

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
1. **Cos'è Axon?** — Un dispositivo medico di Classe I, passivo e non invasivo...
2. **Come si usa?** — Si inserisce nell'Axon Shell e si cuce il guscio al capo...
3. **Devo ricaricarlo o accenderlo?** — No. Completamente passivo.
4. **Si sente mentre lo indosso?** — No. Le micro-vibrazioni sono sub-percettibili.
5. **Quanto tempo prima di notare qualcosa?** — Pensato per uso regolare e continuativo.
6. **Come si lava il capo?** — Removibile: estrai Axon, lava il capo normalmente. Cucito: a mano max 30°C.
7. **Ci sono controindicazioni?** — Nessuna nota. Non su ferite aperte. Sconsigliato a donne in gravidanza e bambini sotto i 3 anni.
8. **Quanto dura e che garanzia ha?** — Riutilizzabile. Garanzia 2 anni.
9. **Cosa contiene il Kit?** — 1 dispositivo Axon Ø 30 mm, 1 Axon Shell, scatola originale. € 230,00.
10. **Sono un'azienda: posso integrare Axon?** — Sì. Visita la pagina Aziende.
