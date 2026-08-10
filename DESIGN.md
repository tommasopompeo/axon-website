# AXON — Design System

Tema scuro, grandi titoli display, spaziature generose, micro-animazioni allo scroll.

> Questo documento descrive **esattamente ciò che è pubblicato sul sito** (`app/`, `components/`, `design/tokens.css`). Riconciliato con il codice il 2026-08-10: ogni valore sotto è verificato contro l'implementazione reale, non aspirazionale. Se in futuro qualcosa in questo file e il codice divergono, il codice resta la fonte di verità — aggiorna questo file, non il contrario.

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

## 3. Tipografia
Una singola scala "display" copre hero H1 **e** i titoli di sezione principali — è la stessa dimensione ripetuta, non due tier diversi:
- **Display/H1** (`--fs-display`): `clamp(3.25rem, 7.0vw, 5.2rem)`, weight 700, line-height 1.04, tracking `-0.02em`.
  Usato per: ogni hero H1 (tutte le 8 pagine) **e** i titoli H2 di sezione principali su Home/Perché AXON/Come Funziona (es. "Migliora il tuo benessere a 360°", "Chi lo indossa, lo racconta.", "Le basi scientifiche del movimento passivo").
- **H2 sottosezione** (`--fs-h2`): `clamp(2rem, 4vw, 3rem)`, weight 700, line-height 1.1. Usato per titoli di sottosezione più contenuti (es. "Una tecnologia, molte professioni." su Professionisti/Aziende, "Domande frequenti." — quest'ultimo **intenzionalmente** più piccolo perché vive in una colonna fissa di 360px).
- **H3 card**: `1.375rem` (`--fs-h3`), weight 600.
- **Eyebrow** (etichetta pill sopra i titoli): `0.8125rem`, uppercase, tracking `0.10em`, weight 600.
- **Stat** (`--fs-stat`): `clamp(2.5rem, 5vw, 3.75rem)` — dati bento/risultati.
- Body (`--fs-body`): `1.0625rem`, line-height 1.6, colore `--text-muted` (o `--text-on-white-muted` su sfondo bianco).
- Lead (`--fs-lead`): `1.25rem`, line-height 1.6.
- Caption/legale: `0.8125rem` (`--fs-caption`), `--text-subtle`.

## 4. Spaziatura, raggi, layout
- **Section padding verticale** (`--section-y`): `clamp(4rem, 6.5vw, 6rem)` — applicato da tutte le `<Section>` (incl. Applicazioni: AxonFeaturesSection, WearMethodSection).
- **Container**: max-width **`1440px`** (`--container`), gutter fisso `px-6` (24px) → `md:px-12` (48px) → `lg:px-16` (64px). Un solo container in tutto il sito — usato anche da header/footer, non solo dal contenuto.
- **Raggi**: card e immagini feature a schermo intero → `var(--radius-lg)` = **24px** (`rounded-lg` nella config Tailwind, già mappato al token); input/select → `var(--radius-md)` = 16px; bottoni/eyebrow → pill `999px`. Scala a due livelli, mai mischiata sulla stessa superficie.
- **Bordi**: card scure `1px solid var(--border)`; card bianche `1px solid rgba(0,0,0,0.06)`; hover rinforza a `--border-strong`.

## 5. Componenti
- **Header**: sticky, blur, logo a sx, nav al centro/dx, CTA rossa "Acquista AXON" a dx. Mobile: hamburger → overlay scuro, padding orizzontale fisso `px-6` (stesso del Container, non un token separato).
- **Button** (`components/ui/Button.tsx`) — 4 varianti:
  - `primary` — rosso pieno, hover schiarisce + `translateY(-2px)`.
  - `secondary` — trasparente con bordo, hover riempie `--surface-2` + `translateY(-2px)`.
  - `ghost` — link testuale con freccia, hover schiarisce il colore (nessun transform).
  - `white` — bianco/nero, per CTA su sezioni scure che richiedono massimo contrasto (FAQ "Hai altre domande?", submit B2B su Professionisti/Aziende). Nessun lift al hover (solo schiarimento bg).
- **Card** (`components/ui/Card.tsx`) — superficie condivisa per box di contenuto (form panel, box contatti, tile use-case). Due varianti: `surface` (scura, default) e `white`. Usata da Professionisti/Aziende/Contatti. *(ContestiBento e le trust-box di Shop usano ancora lo stesso pattern visivo inline — stessi valori, non ancora migrati al componente: opportunità di consolidamento futura, non un'incoerenza visiva.)*
- **Eyebrow pill**: bordo sottile, uppercase.
- **Accordion**: 4 implementazioni indipendenti (per contesti diversi: FAQ generica via `ui/AccordionItem`; scroll-jacked in WearMethodSection/StickyScrollApplicazioni; deep-dive in ScienceSection) — tutte allineate sulla stessa firma di movimento: `duration 0.35s`, `ease cubic-bezier(0.22,1,0.36,1)`.
- **Testimonial carousel**: autoplay, swipe mobile, frecce prev/next.
- **Form**: input su `--surface-2`, label sopra, focus ring `--brand`, confirm inline (via `Card`).
- **Footer**: scuro (`--bg-black`), 4 colonne (brand + nav + prodotto + azienda), riga legale.

## 6. Anatomia HOME (ordine sezioni)
1. Header (sticky)
2. **Hero** — video background (`/hero-video.mp4`), testo e CTA in **nero** (su sfondo chiaro del video)
3. **Migliora il tuo benessere a 360°** (ContestiBento) — bento grid: corsa (col 1 span 2), box dati bianchi (4 sub-box con stat rosse: +42%, +28%, +30%, +21%), nuoto (col 2 riga 2), palestra (col 3 span 2)
4. **Indossa Axon come preferisci** (HowItsDoneSection) — griglia 2 colonne, metodi di applicazione
5. **Per come ti muovi, ogni giorno.** (TargetCarousel) — carousel con 4 card immagine
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
3. ResultsAccordion × 3 sezioni: Equilibrio (destra) / Forza (sinistra, bg elevated) / Mobilità (destra) — ogni metrica appare una sola volta; grafici in `/public/grafici-perche-axon/1–7.png`; frame immagine 24px radius, identico ad Applicazioni
4. PartnerSection — sfondo bianco, titolo display nero, 2 loghi reali (`/logo1.png`, `/logo2.png`), padding verticale standard (`--section-y`, non maggiorato)

## 10. Anatomia SHOP / PROFESSIONISTI / AZIENDE / CONTATTI
Pagine "utility": hero H1 in `--fs-display` (stessa scala del resto del sito), corpo su `--bg-black`, form con `Card` component per stato di successo e box informativi. Professionisti/Aziende aggiungono una griglia di 6 tile use-case (`Card variant="white"`, hover non definito — solo colore/icona).

## 11. Motion (Framer Motion)
- Reveal allo scroll: `opacity 0→1`, `y 24→0`, `duration 0.6`, `ease cubic-bezier(0.22,1,0.36,1)`, viewport once. `RevealGroup` + `RevealItem` per stagger figli. `trigger="mount"` per contenuto above-the-fold (hero).
- Hover bottoni (`primary`/`secondary`): `translateY(-2px)`, `duration 0.2`. Card: **nessun lift** — bento/use-case cards usano solo `shadow-md → shadow-lg` al hover; card scure (surface) non hanno stato hover dedicato.
- Accordion/expand-collapse (tutte le varianti): `duration 0.35`, `ease cubic-bezier(0.22,1,0.36,1)`.
- Crossfade immagini (scroll-jacked sections): `opacity duration 0.5` + `scale transition 1s` — categoria di movimento distinta, più lenta, per transizioni "editoriali" tra fotografie.
- Carousel: slide orizzontale nativo (scroll-snap).
- **Rispettare `prefers-reduced-motion`**: disattivare y-translate e autoplay (verificato su `Reveal`/`RevealItem`/`ui/AccordionItem`/`ResultsAccordion`/ScienceSection `DeepDive`).

## 12. Responsive
- Mobile-first. Breakpoint Tailwind: `sm 640 · md 768 · lg 1024 · xl 1280`.
- Nav: hamburger sotto `md`; inline da `md`. Overlay mobile con lo stesso padding orizzontale del Container (`px-6`).
- Griglie: 1 col (mobile) → 2 col (`md`) → 3 col (`lg`).
- Tipografia fluida via `clamp()`.
- Target tap ≥ 44px.

## 13. Accessibilità
- Contrasto AA su testo.
- Focus visibile (ring `--brand`) su tutti gli elementi interattivi.
- `alt` su tutte le immagini; label esplicite sui form.
- HTML semantico (`header/nav/main/section/footer`, heading order corretto).

## 14. Performance
Gli asset in `/public/` sono stati ricompressi il 2026-08-10: **224MB → 24MB** (-89%). Foto opache esportate in PNG (Canva) → JPEG q82–85, ridimensionate quando il pixel-count superava di molto la dimensione di rendering reale (es. `applicazioni/1–7.jpg`, `corsa.jpg`, `hero_perche_axon.jpg`). PNG mantenuto solo dove necessario: `axon_no_bkg.png` e `logo2.png` (canale alpha/trasparenza), `grafici-perche-axon/1–7.png` (grafici con testo/linee sottili — la JPEG introdurrebbe artefatti). `video_come_funziona.mp4` re-encodato H.264 CRF23 a parità di risoluzione 1080p: 75MB → 8.3MB, qualità visivamente indistinguibile dall'originale.
