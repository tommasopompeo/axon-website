# AXON — Design System

Obiettivo: tema scuro, grandi titoli display, card molto
arrotondate, etichette "eyebrow", spaziature generose, immagini di prodotto a tutta
larghezza, micro-animazioni allo scroll — con l'identità **Axon**.

## 1. Identità
- **Font: Urbanist** (Google Fonts, loaded via `next/font/google`). Variabile, pesi 400–800.
- **Logo**: SVG fornito (wordmark **bianco**, "X" **rossa**). Va su **header scuro/nero**
  per garantire leggibilità del bianco. File in `/public/logo.svg`.
- **Palette**: rosso brand **#db181b**, near-black, bianco. (Token sotto.)

## 2. Color tokens (vedi anche design/tokens.css e tokens.json)
| Token | Valore | Uso |
|---|---|---|
| `--bg` | `#0A0A0B` | sfondo pagina |
| `--bg-elevated` | `#121214` | sezioni alternate |
| `--surface` | `#161618` | card |
| `--surface-2` | `#1E1E21` | card hover / input |
| `--border` | `rgba(255,255,255,0.08)` | bordi sottili |
| `--border-strong` | `rgba(255,255,255,0.14)` | bordi hover |
| `--text` | `#FFFFFF` | titoli/testo primario |
| `--text-muted` | `rgba(255,255,255,0.66)` | paragrafi |
| `--text-subtle` | `rgba(255,255,255,0.45)` | note/caption |
| `--brand` | `#db181b` | CTA, X del logo, accenti |
| `--brand-hover` | `#b6151a` | hover CTA |
| `--brand-contrast` | `#FFFFFF` | testo su rosso |
| `--brand-glow` | `rgba(219,24,27,0.22)` | glow dietro hero/prodotto |
| `--brand-soft` | `rgba(219,24,27,0.10)` | sfondi tenui/eyebrow |
| `--header-bg` | `rgba(8,8,9,0.72)` + `backdrop-blur(12px)` | header sticky |

Tema: **dark only**. Nessuna variante light per ora.

## 3. Tipografia
- Display/H1: `clamp(2.75rem, 6vw, 4.5rem)`, weight 700, line-height 1.04, tracking `-0.02em`.
- H2 sezione: `clamp(2rem, 4vw, 3rem)`, weight 700, tracking `-0.015em`.
- H3 card: `1.375rem`, weight 600.
- **Eyebrow** (etichetta sopra gli H2): `0.8125rem`, uppercase, tracking `0.10em`,
  weight 600, colore `--text-subtle` (o `--brand` quando serve enfasi). Spesso dentro un
  "pill" con bordo sottile.
- Body: `1.0625rem`, line-height 1.6, colore `--text-muted`. Lead paragraph fino a `1.25rem`.
- Caption/legale: `0.8125rem`, `--text-subtle`.
- Numeri stat (es. +28%): `clamp(2.5rem, 5vw, 3.75rem)`, weight 700, colore `--text`
  (oppure `--brand` per 1 accento).

## 4. Spaziatura, raggi, layout
- Base 4px. Scala: 4 8 12 16 20 24 32 40 48 64 80 96 128.
- **Section padding verticale**: `clamp(5rem, 10vw, 8.5rem)`.
- **Container**: max-width `1200px`, gutter laterale `clamp(1.25rem, 5vw, 2.5rem)`, centrato.
- **Raggi**: card `var(--radius-lg)=24px`; input/box piccoli `16px`; **bottoni = pill `999px`**.
- **Bordi**: card con `1px solid var(--border)`; hover `--border-strong`.
- **Glow**: dietro l'immagine prodotto in hero e nella CTA finale, radial-gradient con
  `--brand-glow` molto sfocato. Usare con parsimonia (come la "linea rossa" del cover deck).

## 5. Componenti
- **Header**: sticky, sfondo `--header-bg` + blur, bordo inferiore sottile. Logo a sx,
  nav al centro/dx, CTA rossa "Acquista" a dx. Su scroll: leggera riduzione di padding.
  Mobile: hamburger → menu full-width scuro.
- **Button**
  - Primario: bg `--brand`, testo bianco, pill, hover `--brand-hover`, micro lift.
  - Secondario: trasparente, bordo `--border-strong`, testo bianco, hover bg `--surface-2`.
  - Ghost/link: solo testo + freccia.
- **Eyebrow pill**: piccola etichetta con bordo sottile e testo uppercase.
- **Card** (feature/prodotto/step): `--surface`, raggio 24px, bordo `--border`, padding 24–32px,
  hover: bordo `--border-strong` + leggero `translateY(-4px)`.
- **Stat block**: riga di 3 numeri grandi + label + nota asterisco piccola.
- **Accordion** (FAQ + sezione "per chi"): riga cliccabile, icona +/–, altezza animata.
- **Testimonial carousel**: card con virgolettato grande, nome, ruolo, indicatore "n/N",
  frecce prev/next; autoplay opzionale; swipe su mobile.
- **Use-case grid** (Aziende): griglia di card icona+titolo+riga.
- **Form**: input/select/textarea su `--surface-2`, bordo `--border`, focus ring `--brand`,
  label sopra; checkbox consenso; bottone primario; stato di conferma inline.
- **Footer**: scuro, multi-colonna, logo + tagline + social + nav + riga legale.

## 6. Anatomia HOME (ordine sezioni)
1. Header (sticky)
2. **Hero** — video background + titolo display + CTA
3. **Contesti** — bento grid che consolida benefici + dati pilota nel box rosso
4. **Come si applica** — accordion "Tre passi e basta" + immagini
5. **A chi è rivolto** — carosello di contesti (carousel orizzontale)
6. **Testimonianze** — carousel
7. **FAQ** — accordion + CTA contatti
8. Footer

Altre pagine: `/applicazioni`, `/come-funziona`, `/perche-axon`, `/fisioterapisti`,
`/shop`, `/aziende`, `/contatti`. Stesse header/footer.

## 7. Motion (Framer Motion)
- Reveal allo scroll: `opacity 0→1`, `y 24→0`, `duration 0.6`, `ease "easeOut"`,
  `viewport once`. Stagger figli `0.08s`.
- Hero: reveal sequenziale (badge → H1 → sub → CTA → immagine), leggero.
- Hover card/bottoni: `translateY(-4px)` / scale `1.02`, `duration 0.2`.
- Accordion: animare `height`/`opacity`.
- Carousel: slide orizzontale con `AnimatePresence`.
- **Rispettare `prefers-reduced-motion`**: disattivare y-translate e autoplay.

## 8. Responsive
- Mobile-first. Breakpoint Tailwind: `sm 640 · md 768 · lg 1024 · xl 1280`.
- Nav: hamburger sotto `md`; inline da `md`.
- Griglie: feature/use-case 1 col (mobile) → 2 col (`md`) → 3 col (`lg`).
- Prodotti: 1 col (mobile) → 2 col (`md`).
- Hero: testo sopra / immagine sotto su mobile; affiancati da `lg`.
- Tipografia già fluida via `clamp()`.
- Target tap ≥ 44px; immagini con `aspect-ratio` per evitare layout shift.

## 9. Accessibilità & qualità
- Contrasto AA su testo (il muted non sotto 0.6 su sfondo scuro per i paragrafi lunghi).
- Focus visibile (ring `--brand`) su tutti gli elementi interattivi.
- `alt` su tutte le immagini; label esplicite sui campi form.
- HTML semantico (`header/nav/main/section/footer`, heading order corretto).

## 10. Note
- Spaziature/curve di animazione vanno rifinite a occhio durante il build.
- Il design system è dark-only, nessuna variante light per ora.
