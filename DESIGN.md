# AXON — Design System

Tema scuro, grandi titoli display, spaziature generose, micro-animazioni allo scroll.

> Questo documento descrive **esattamente ciò che è pubblicato sul sito** (`app/`, `components/`, `design/tokens.css`). Riconciliato con il codice il 2026-08-14: ogni valore sotto è verificato contro l'implementazione reale, non aspirazionale. Se in futuro qualcosa in questo file e il codice divergono, il codice resta la fonte di verità — aggiorna questo file, non il contrario.

## 1. Identità
- **Font: Urbanist** (Google Fonts, `next/font/google`). Pesi 400–800.
- **Logo**: SVG wordmark **bianco**, "X" **rossa**. File in `/public/logo.svg`.
- **Palette**: rosso brand `#db181b`, near-black, bianco. Token sotto.

## 2. Color tokens (`design/tokens.css` e `tokens.json`)
| Token | Valore | Uso |
|---|---|---|
| `--bg` | `#0A0A0B` | sfondo pagina (default) |
| `--bg-black` | `#000000` | sfondo sezioni "pure black" intenzionali (Hero pagine B2B, FAQ, ScienceSection, VideoSection, ecc. — leggermente più scuro di `--bg`, differenza non percepibile ma tenuta come scelta deliberata) |
| `--bg-elevated` | `#121214` | sezioni alternate (`elevated` prop su `Section`) |
| `--surface` | `#161618` | card scure (form panel, box contatti) |
| `--surface-2` | `#1E1E21` | card hover / input |
| `--border` | `rgba(255,255,255,0.08)` | bordi sottili |
| `--border-strong` | `rgba(255,255,255,0.14)` | bordi hover |
| `--text` | `#FFFFFF` | titoli/testo primario su sfondo scuro |
| `--text-muted` | `rgba(255,255,255,0.66)` | paragrafi su sfondo scuro |
| `--text-subtle` | `rgba(255,255,255,0.45)` | note/caption su sfondo scuro |
| `--text-on-white-muted` | `rgba(10,10,11,0.62)` | paragrafi/sottotitoli su card e sezioni **bianche** (Shop, use-case cards, PartnerSection) |
| `--brand` | `#db181b` | CTA, X del logo, accenti |
| `--brand-hover` | `#b6151a` | hover CTA |
| `--brand-soft` / `--brand-glow` | `rgba(219,24,27,.10)` / `.22` | badge, icone, tint |
| `--header-bg` | `rgba(8,8,9,0.72)` + `backdrop-blur(12px)` | header sticky |

Tema: **dark only**, con due eccezioni intenzionali che passano a testo nero su sfondo chiaro: l'hero video (home) e le superfici bianche "commerciali" (Shop, card use-case, PartnerSection).

**Grigi Tailwind fuori-token eliminati** (consolidamento 2026-08-14): `TestimonialCarousel` usava `border-gray-800`/`text-gray-400` (ora `--border-strong`/`--text-muted` — differenza cromatica impercettibile, ±3–7/255) e `ContestiBento` usava `border-gray-100`/`text-gray-800` sui 4 stat box (ora il bordo `rgba(0,0,0,.06)` di `Card variant="white"` — impercettibile; la caption `text-gray-800`, un quasi-nero `#1f2937` senza token equivalente, è invece migrata a `--text-on-white-muted` accettando uno **schiarimento visibile**, per scelta esplicita anziché lasciare un grigio non tokenizzato).

## 3. Tipografia
Tutti i titoli (h1–h6) renderizzano a **weight 400** — è una scelta visiva deliberata (display leggero, non bold) applicata in modo uniforme su tutto il sito. Non esiste più una regola globale che la impone: il peso vive esplicitamente in ciascuna classe utility qui sotto, insieme a font-size/line-height/letter-spacing, cosicché una classe che dichiara un peso è sempre quella che lo applica davvero. Elementi che *non* sono titoli (es. il prezzo su `ProductCard`, le label "Richiesta ricevuta"/"Messaggio inviato") possono legittimamente restare bold — non sono soggetti a questa scala.

Una singola scala "display" copre hero H1 **e** i titoli di sezione principali — è la stessa dimensione ripetuta, non due tier diversi:
- **`.text-display`** (`--fs-display`): `clamp(3.25rem, 7.0vw, 5.2rem)`, weight 400, line-height 1.04, tracking `-0.02em`.
  Usato per: ogni hero H1 (tutte le 8 pagine) **e** i titoli H2 di sezione principali su Home/Perché AXON/Come Funziona (es. "Migliora il tuo benessere a 360°", "Chi lo indossa, lo racconta", "Le basi scientifiche del movimento passivo").
- **`.text-h2`** sottosezione (`--fs-h2`): `clamp(2rem, 4vw, 3rem)`, weight 400, line-height 1.1, tracking `-0.02em`. Usato per titoli di sottosezione più contenuti (es. "Una tecnologia, molte professioni" su Professionisti/Aziende, "Domande frequenti" — quest'ultimo **intenzionalmente** più piccolo perché vive in una colonna fissa di 360px).
- **`.text-h3`** card: `1.375rem` (`--fs-h3`), weight 400, tracking `-0.01em`.
- **`.text-lead`**: `1.25rem` (`--fs-lead`), line-height 1.6, weight 400 — paragrafi introduttivi sotto i titoli.
- **Eyebrow** (etichetta pill sopra i titoli): `0.8125rem`, uppercase, tracking `0.10em`, weight 600 — non è un titolo (è un `<p>`), quindi resta bold legittimamente.
- **Stat**: due tier onesti, non un token unico condiviso — bento e risultati usano dimensioni realmente diverse in produzione, non drift accidentale (bento vive in tile compatte di una griglia densa, risultati è l'unico dato in evidenza dentro un pannello accordion aperto):
  - **`--fs-stat-bento`**: `clamp(1.8rem, 3.2vw, 2.4rem)` — i 4 stat box di `ContestiBento` (+42%, +28%, +30%, +21%).
  - **`--fs-stat-results`**: `clamp(2rem, 4vw, 2.75rem)` — il dato in evidenza di `ResultsAccordion` (Perché AXON).
  - Sono `<span>`/`<p>`, non titoli, e restano bold/extrabold di proposito.
- Body (`--fs-body`): `1.0625rem`, line-height 1.6, colore `--text-muted` (o `--text-on-white-muted` su sfondo bianco).
- Caption/legale: `0.8125rem` (`--fs-caption`), `--text-subtle`.

Le quattro classi (`.text-display` / `.text-h2` / `.text-h3` / `.text-lead`, definite in `app/globals.css`) sono l'unico posto che bundla size + line-height + letter-spacing + weight per la scala titoli: qualunque heading che condivide uno di questi pattern usa la classe invece di ripetere i valori inline. Un paio di titoli con dimensioni realmente uniche (es. "Comodo. Resistente. Versatile." in `AxonFeaturesSection`, i pillar H3 in `ScienceSection`) mantengono uno style inline dedicato — non essendoci una regola globale a forzare il peso, questi restano a `font-weight: 400` per eredità naturale (nessun elemento antenato dichiara bold).

## 4. Spaziatura, raggi, layout
- **Section padding verticale** (`--section-y`): `clamp(4rem, 6.5vw, 6rem)` — applicato da tutte le `<Section>` (incl. Applicazioni: AxonFeaturesSection, WearMethodSection).
- **Container**: max-width **`1440px`** (`--container`, mappato su `max-w-container` in `tailwind.config.ts`), gutter fisso `px-6` (24px) → `md:px-12` (48px) → `lg:px-16` (64px). Un solo container in tutto il sito — usato anche da header/footer, non solo dal contenuto. `Container`/`Header`/`Footer` usano tutti la classe Tailwind `max-w-container`, non un valore arbitrario `max-w-[1440px]` duplicato in tre punti.
- **Header height** (`--header-h`): `64px` — altezza reale dell'header (`h-16`). Usato dagli hero full-viewport (`min-h-[calc(100vh-var(--header-h))]`) per riempire esattamente lo spazio sotto l'header sticky.
- **Raggi**: card e immagini feature a schermo intero → `var(--radius-lg)` = **24px** (`rounded-lg` nella config Tailwind, già mappato al token); input/select → `var(--radius-md)` = 16px; bottoni/eyebrow → pill `999px`. Scala a due livelli, mai mischiata sulla stessa superficie.
- **Bordi**: card scure `1px solid var(--border)`; card bianche `1px solid rgba(0,0,0,0.06)`; hover rinforza a `--border-strong`.

## 5. Componenti
- **Header**: sticky, blur, logo a sx, nav al centro/dx, CTA rossa "Acquista AXON" a dx. Mobile: hamburger → overlay scuro, padding orizzontale fisso `px-6` (stesso del Container, non un token separato). Entrambe le CTA (desktop e mobile-menu) passano da `Button` — vedi sotto.
- **Button** (`components/ui/Button.tsx`) — 4 varianti (`primary` / `secondary` / `ghost` / `white`) × 4 size (`sm` / `md` / `lg` / `custom`):
  - `primary` — rosso pieno, hover schiarisce + `translateY(-2px)`.
  - `secondary` — trasparente con bordo, hover riempie `--surface-2` + `translateY(-2px)`.
  - `ghost` — link testuale con freccia, hover schiarisce il colore (nessun transform).
  - `white` — bianco/nero, per CTA su sezioni scure che richiedono massimo contrasto (FAQ "Hai altre domande?", submit B2B su Professionisti/Aziende). Nessun lift al hover (solo schiarimento bg).
  - `size="custom"` — non applica alcuna classe di padding/text-size: il chiamante fornisce l'intero set via `className`. Esiste perché sovrascrivere un'utility Tailwind di size con un'altra (es. `px-6` → `px-5`) non ha un ordine di cascata affidabile; usata dalle 3 CTA "one-off" che non combaciano con `sm`/`md`/`lg` (Header desktop, Header mobile-menu, hero Home). `onClick` è supportato (necessario per chiudere il menu mobile al tap).
  - **Nota accessibilità**: la CTA "Acquista AXON" del Header desktop è alta **38px** (`min-h-[38px]`, dimensione originale preservata durante la migrazione a `Button`) — sotto il minimo `btn-base` di 44px e sotto il target-size WCAG consigliato. Le altre due CTA (mobile-menu ~50px, hero Home ~52px) superano naturalmente 44px. Non corretto in questa passata di consolidamento (solo refactor, zero cambi visivi) — da rivedere se l'accessibilità del target diventa una priorità.
- **PageHero** (`components/ui/PageHero.tsx`) — scaffold hero full-viewport condiviso da Home/Applicazioni/Come Funziona/Perché AXON: `Section` (min-height `100vh - var(--header-h)`, flex-centered) → media di sfondo (`video` o `Image`, sempre `-z-10`) → overlay scuro opzionale (`overlayOpacity`, 0–1, reso solo se > 0) → `Container` → colonna testo `max-w-4xl`. Props: `media` (`{type:'video',src}` o `{type:'image',src,alt}`), `overlayOpacity`, `tone` (`'light'` testo bianco default · `'dark'` testo nero, usato solo dalla Home su sfondo video chiaro), `children` (contenuto colonna testo), `cta` (opzionale, reso come sibling della colonna — solo la Home lo usa, per il bottone sotto il fold).
- **MediaFrame** (`components/ui/MediaFrame.tsx`) — il frame media con glow condiviso da `StickyScrollApplicazioni`, `WearMethodSection` e `ResultsAccordion`: `aspect-square`, `max-w-lg lg:max-w-xl xl:max-w-[620px]`, `rounded-lg` (24px), `shadow-[0_0_50px_rgba(255,255,255,.08)]`, `border-white/10`. Il posizionamento esterno (`justify-*`, `order-*`) resta nel chiamante perché differisce per layout.
- **Card** (`components/ui/Card.tsx`) — superficie condivisa per box di contenuto (form panel, box contatti, tile use-case, stat box, trust box). Due varianti: `surface` (scura, default — hover `border → --border-strong` / `background → --surface-2` sempre attivo, via classe CSS `.card-surface`, nessun lift) e `white` (prop `hover` opzionale, aggiunge solo `shadow-md → shadow-lg`). Usata da Professionisti/Aziende/Contatti/Home (`ContestiBento`, `HowItsDoneSection` — le 2 card testo nere sopra/sotto le immagini, prima hand-rolled `bg-black border-gray-800` senza hover, ora `variant="surface"` con l'hover in dote)/Shop (trust box).
- **Section** (`components/ui/Section.tsx`) — prop `background`: `default` (trasparente, eredita `--bg`) · `elevated` (`--bg-elevated`) · `black` (`--bg-black`) · `white` (`#ffffff`). Sostituisce il vecchio pattern `className="bg-black" style={{background:'var(--bg-black)'}}` ripetuto in ~18 punti.
- **Eyebrow pill**: bordo sottile, uppercase.
- **Accordion**: 4 implementazioni indipendenti (per contesti diversi: FAQ generica via `ui/AccordionItem`; scroll-jacked in WearMethodSection/StickyScrollApplicazioni; deep-dive in ScienceSection) — tutte allineate sulla stessa firma di movimento: `duration 0.35s`, `ease cubic-bezier(0.22,1,0.36,1)`.
- **Testimonial carousel**: autoplay, swipe mobile, frecce prev/next.
- **Form**: input su `--surface-2`, label sopra, focus ring `--brand`, confirm inline (via `Card`).
- **Footer**: scuro (`--bg-black`), 4 colonne (brand + nav + prodotto + azienda), riga legale.

**Nota storica — `ResultsAccordion` "elevated"**: la sezione "Forza" su Perché AXON passava `elevated` a `ResultsAccordion` per alternare lo sfondo a `--bg-elevated`, ma un `style` inline che sovrascriveva la logica interna di `Section` rendeva la prop di fatto inerte — le tre sezioni (Equilibrio/Forza/Mobilità) hanno **sempre** renderizzato tutte nero puro. Con la migrazione al prop `background` la prop `elevated` è stata rimossa (invece di "aggiustarla in silenzio", che avrebbe cambiato visivamente la sezione Forza): tutte e tre restano `background="black"`, identiche a prima.

## 6. Anatomia HOME (ordine sezioni)
1. Header (sticky)
2. **Hero** — video background (`/hero-video.mp4`), testo e CTA in **nero** (su sfondo chiaro del video)
3. **Migliora il tuo benessere a 360°** (ContestiBento) — bento grid: corsa (col 1 span 2), box dati bianchi (4 sub-box con stat rosse: +42%, +28%, +30%, +21%), nuoto (col 2 riga 2), palestra (col 3 span 2)
4. **Indossa Axon come preferisci** (HowItsDoneSection) — griglia 2 colonne, metodi di applicazione
5. **Per come ti muovi, ogni giorno** (TargetCarousel) — griglia statica con 4 card immagine
6. **Chi lo indossa, lo racconta** (TestimonialsSection + TestimonialCarousel)
7. **Domande frequenti** (FaqSection)
8. Footer

## 7. Anatomia APPLICAZIONI
1. Hero — immagine `hero_applicazioni.jpg`, overlay 30%, titolo display
2. StickyScrollApplicazioni — scroll-pinned, 7 contesti d'uso, frame immagine 24px radius + glow `shadow-[0_0_50px_rgba(255,255,255,.08)]`
3. AxonFeaturesSection — sfondo bianco, layout assoluto attorno al disco AXON, stesso glow sul drop-shadow del prodotto
4. WearMethodSection — scroll-pinned, 2 metodi di applicazione, stesso frame immagine di (2)

## 8. Anatomia COME FUNZIONA
1. Hero — immagine `come_funziona_hero.jpg`, overlay 30%, titolo display
2. VideoSection — video embed `video_come_funziona.mp4`
3. ScienceSection — 3 pillar scientifici (Meccanotrasduzione / Vibrazioni / Nanomateriali), ciascuno con testo intro + accordion "Approfondimento tecnico" + immagine sticky; sezione riferimenti bibliografici in fondo

## 9. Anatomia PERCHÉ AXON
1. Hero — immagine `hero_perche_axon.jpg`, overlay 30%
2. Paragrafo intro (sfondo `--bg-black`)
3. ResultsAccordion × 3 sezioni, tutte su sfondo nero puro: Equilibrio (destra) / Forza (sinistra) / Mobilità (destra) — ogni metrica appare una sola volta; grafici in `/public/grafici-perche-axon/1–7.png`; frame immagine 24px radius via `MediaFrame`, identico ad Applicazioni (vedi §5)
4. PartnerSection — sfondo bianco, titolo display nero, 2 loghi reali (`/logo1.png`, `/logo2.png`), padding verticale standard (`--section-y`, non maggiorato)

## 10. Anatomia SHOP / PROFESSIONISTI / AZIENDE / CONTATTI
Pagine "utility": hero H1 in `--fs-display` (stessa scala del resto del sito), corpo su `--bg-black`, form con `Card` component per stato di successo e box informativi. Professionisti/Aziende aggiungono una griglia di 6 tile use-case (`Card variant="white"`, hover non definito — solo colore/icona).

**Pagine legali (`/privacy`, `/cookie`, `/termini`, 2026-08-17)** — variante prose-only dello scaffold utility, senza `PageHero` e senza form: hero identico (`Section background="black"` → H1 `.text-display` → intro `.text-lead` su `--text-muted` → caption "Ultimo aggiornamento" in `--fs-caption`/`--text-subtle`), poi un secondo `Section` (`className="!pt-0"`) con il corpo testo racchiuso in `max-w-[70ch]` (stesso pattern di `app/perche-axon/page.tsx`). Ogni sezione numerata è un blocco `LegalSection` condiviso (`components/legal/LegalSection.tsx`): H2 `.text-h2` + paragrafi `--fs-body`/1.7/`--text-muted`, estratto per evitare di ripetere 3× lo stesso markup. Liste puntate: `list-disc pl-5` (stesso pattern delle fonti bibliografiche in `ScienceSection`). Nessuna interattività — le tre pagine sono Server Component, non `'use client'`. `/termini` porta un blocco di commento `DA VERIFICARE` in cima al file che elenca le assunzioni commerciali non deducibili dal repo (spese di reso, esclusioni dal recesso, tempistica rimborso, ecc.), da far confermare ad Axon-Tech/legale prima della pubblicazione. `/cookie` documenta l'assenza di cookie/tracker/embed di terze parti (verificato via audit del codice: nessun analytics, nessuno script di tracciamento, `lib/links.ts` con endpoint ancora placeholder `#`) e, coerentemente con le Linee guida del Garante, non introduce alcun banner di consenso.

## 11. Motion
- **`lib/motion.ts`** — sorgente unica per `EASE` (`[0.22, 1, 0.36, 1]`, mirror di `--ease` in `design/tokens.css`) e `DURATION` (`ui` 0.2s, `uiSlow` 0.35s, `reveal` 0.6s, mirror di `--dur`). Tutti gli usi Framer Motion di easing/duration lo importano invece di ridichiararlo — nessun'altra costante `EASE` locale né `easeOut`/`easeInOut` stray nel codebase.
- **Reveal**: due trigger, due meccanismi.
  - `trigger="mount"` (contenuto above-the-fold, es. hero) → **puro CSS**: classe `.reveal-mount` + `@keyframes reveal-mount` in `app/globals.css` (`opacity 0→1`, `y 24→0`, `duration var(--dur)`, `ease var(--ease)`, delay via custom property `--reveal-delay`). Il componente `Reveal` renderizza un `<div>` semplice, non un `motion.div`: niente `opacity:0` SSR-ato in attesa di JS, l'animazione parte anche se lo script non idrata. `prefers-reduced-motion` è gestito via `@media` (animazione disattivata, contenuto visibile a `opacity:1`).
  - `trigger="scroll"` (default) → resta Framer Motion (`whileInView`, `duration DURATION.reveal`, `ease EASE`, viewport once): richiede comunque JS per sapere quando l'elemento entra in viewport, quindi CSS non porterebbe benefici. `RevealGroup` + `RevealItem` per stagger figli (sempre Framer).
- **Header nav** — stato attivo/hover in CSS, non JS: classe `.nav-link` (colore `--text-muted` → `--text` su `:hover`/`:focus-visible`, transition `color 0.2s var(--ease)`), niente più `onMouseEnter`/`onMouseLeave`. Il link della pagina corrente riceve `aria-current="page"` (via `usePathname`) che porta un piccolo indicatore rosso brand: un puntino sotto il link su desktop (`.nav-link--desktop::after`), a sinistra dell'etichetta nel menu mobile (`.nav-link--mobile::before`).
- **Hover bottoni** (`primary`/`secondary`): `translateY(-2px)`, `duration 0.2`; **`:active`** riporta a `translateY(0)` (press state). Card: **nessun lift** — bento/use-case cards (`Card variant="white" hover`) usano solo `shadow-md → shadow-lg` al hover; le card scure (`Card` default, `variant="surface"`) e i tile di `TargetCarousel` hanno uno stato hover dedicato via classi CSS (`.card-surface`, `.target-tile`): `border-color → --border-strong`, `background → --surface-2`, `0.2s var(--ease)` — le proprietà base vivono nella classe CSS (non in inline style) proprio perché un valore inline non può mai essere sovrascritto da una regola `:hover`.
- Accordion/expand-collapse (tutte le varianti): `duration 0.35`, `ease cubic-bezier(0.22,1,0.36,1)` (via `lib/motion.ts`).
- Crossfade immagini (scroll-jacked sections): `opacity duration 0.5` + `scale transition 1s` — categoria di movimento distinta, più lenta, per transizioni "editoriali" tra fotografie.
- Carousel: `TargetCarousel` = slide orizzontale nativo (scroll-snap). `TestimonialCarousel` = crossfade orizzontale via Framer (`AnimatePresence mode="wait"`); il contenitore della quote è un `motion.div layout="size"` che assorbe il cambio di altezza tra quote di lunghezza diversa con una transizione morbida (`DURATION.uiSlow`, `EASE`) invece di uno scatto secco.
- **Rispettare `prefers-reduced-motion`**: disattivare y-translate e autoplay (verificato su `Reveal`/`RevealItem`/`ui/AccordionItem`/`ResultsAccordion`/ScienceSection `DeepDive`/`TestimonialCarousel`).

## 12. Responsive
- Mobile-first. Breakpoint Tailwind: `sm 640 · md 768 · lg 1024 · xl 1280`.
- Nav: hamburger sotto `md`; inline da `md`. Overlay mobile con lo stesso padding orizzontale del Container (`px-6`).
- Griglie: 1 col (mobile) → 2 col (`md`) → 3 col (`lg`).
- Tipografia fluida via `clamp()`.
- Target tap ≥ 44px (eccezione nota: Header desktop CTA, 38px — vedi §5).

## 13. Accessibilità
- Contrasto AA su testo.
- Focus visibile (ring `--brand`) su tutti gli elementi interattivi.
- `alt` su tutte le immagini; label esplicite sui form.
- HTML semantico (`header/nav/main/section/footer`, heading order corretto).

## 14. Performance
Gli asset in `/public/` sono stati ricompressi il 2026-08-10: **224MB → 24MB** (-89%). Foto opache esportate in PNG (Canva) → JPEG q82–85, ridimensionate quando il pixel-count superava di molto la dimensione di rendering reale (es. `applicazioni/1–7.jpg`, `corsa.jpg`, `hero_perche_axon.jpg`). PNG mantenuto solo dove necessario: `axon_no_bkg.png` e `logo2.png` (canale alpha/trasparenza), `grafici-perche-axon/1–7.png` (grafici con testo/linee sottili — la JPEG introdurrebbe artefatti). `video_come_funziona.mp4` re-encodato H.264 CRF23 a parità di risoluzione 1080p: 75MB → 8.3MB, qualità visivamente indistinguibile dall'originale.

**Asset-loading fix (2026-08-16)** — audit su caricamento immagini/video:
- **`sizes` sui frame `MediaFrame`**: `StickyScrollApplicazioni` e `WearMethodSection` avevano `<Image fill>` senza `sizes` (default `100vw` → il browser scarica sempre la variante full-width anche se il frame non supera mai 620px, vedi `MediaFrame` in §5). Aggiunto `sizes="(min-width: 1280px) 620px, (min-width: 1024px) 576px, 512px"`, che rispecchia esattamente i breakpoint `max-w-lg lg:max-w-xl xl:max-w-[620px]` del frame. Verificato via network panel: a 800px di viewport la variante richiesta scende da `w=1920` a `w=1080`.
- **`priority` rimosso** dall'immagine `axon-shell-sewn.jpg` in `HowItsDoneSection` (sotto il fold): competeva per banda con l'hero video in fase di LCP.
- **Poster frame per i video hero**: `hero-video.mp4` e `video_come_funziona.mp4` non avevano `poster`, quindi il primo paint era un riquadro vuoto finché il video non decodifica il primo frame. Generati `hero-video-poster.jpg` e `video-come-funziona-poster.jpg` (ffmpeg, primo frame, JPEG q82, stessa risoluzione del sorgente — 3840×2160 e 1920×1080) e collegati rispettivamente a `PageHero` (nuova prop opzionale `media.poster`, usata da `HeroSection`) e al `<video>` di `VideoSection`.
- **Logo header**: l'asset `logo.svg` ha un canvas intrinseco quadrato (`width="2000" height="2000"`, viewBox `1500×1500`) nonostante il wordmark visivo sia più largo che alto — i `width`/`height` passati a `next/image` (144×48) non corrispondevano né al rapporto reale del file né al box realmente renderizzato (che è sempre stato ~48×48, sia prima che dopo questa fix: verificato via `getBoundingClientRect`, nessuna regressione visiva). Questo disallineamento props↔intrinseco generava sia il warning "width or height modified, but not the other" sia il preload "not used" collegato (`priority` genera un `<link rel=preload>` dimensionato sul rapporto dichiarato, che quindi non corrispondeva al srcset realmente scelto). Fix: `width={48} height={48}` (rapporto reale) + `className="h-auto w-auto max-h-10 md:max-h-12"`. Verificato pulito su build di produzione (`next build && next start`) su Home/Applicazioni/Come Funziona — zero warning in console. In `next dev` un residuo "preloaded but not used" può ancora comparire in modo incostante: è un artefatto del doppio-render di React Strict Mode in sviluppo (doppio fetch di `logo.svg` osservato in dev, assente in build di produzione), non un problema di codice.
- **Lazy-loading selettivo**: in `StickyScrollApplicazioni`, dei 7 frame impilati (crossfade via opacity, tutti nello stesso box) solo `activeIndex ± 1` hanno `loading="eager"`, gli altri `loading="lazy"`. Nota: essendo tutti posizionati `inset-0` nello stesso box visibile (nascosti solo via `opacity`), l'IntersectionObserver nativo del browser li considera comunque "in viewport" e il risparmio di banda reale è limitato — l'attributo è comunque corretto semanticamente e non regressivo.
- **Hero `sizes` + `deviceSizes` cap (2026-08-17)**: `PageHero` renderizza il media di sfondo con `<Image fill>` e, fino a questa fix, nessun `sizes` — il default `100vw` risolveva comunque alla variante più larga disponibile, ma senza un `sizes` esplicito Next.js non sa che l'immagine è realmente full-viewport e i `deviceSizes` di default arrivano fino a `3840` (pensato per display 2x/3x su viewport 4K), quindi un normale monitor 2x da ~1920px richiedeva la variante `w=3840` — molto oltre la risoluzione realmente renderizzata. Aggiunto `sizes="100vw"` esplicito su `PageHero` (Home/Applicazioni/Come Funziona/Perché AXON condividono lo scaffold, vedi §5) e ridotto `images.deviceSizes` in `next.config.ts` a `[640, 750, 828, 1080, 1200, 1920, 2048]` (tetto `2048` invece di `3840`). Verificato via network panel: le richieste hero passano da `w=3840` a `w=2048`; nessuna morbidezza visibile a risoluzione desktop su una foto full-bleed.
