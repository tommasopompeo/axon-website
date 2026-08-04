# AXON — Design System

Tema scuro, grandi titoli display, spaziature generose, micro-animazioni allo scroll.

## 1. Identità
- **Font: Urbanist** (Google Fonts, `next/font/google`). Pesi 400–800.
- **Logo**: SVG wordmark **bianco**, "X" **rossa**. File in `/public/logo.svg`.
- **Palette**: rosso brand `#db181b`, near-black, bianco. Token sotto.

## 2. Color tokens (`design/tokens.css` e `tokens.json`)
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
| `--header-bg` | `rgba(8,8,9,0.72)` + `backdrop-blur(12px)` | header sticky |

Tema: **dark only**.

## 3. Tipografia
- H1/Display: `clamp(3.25rem, 7.0vw, 5.2rem)`, weight 700, line-height 1.04, tracking `-0.02em`.
  Usato anche per H2 di sezione e titoli partner — uniforme su tutto il sito.
- H2 data block: `clamp(2.5rem, 5vw, 3.75rem)`, weight 700.
- H3 card: `1.375rem`, weight 600.
- **Eyebrow** (etichetta pill sopra i titoli): `0.8125rem`, uppercase, tracking `0.10em`, weight 600.
- Body (`--fs-body`): `1.0625rem`, line-height 1.6, colore `--text-muted`.
- Lead (`--fs-lead`): `1.25rem`, line-height 1.6.
- Caption/legale: `0.8125rem`, `--text-subtle`.

## 4. Spaziatura, raggi, layout
- **Section padding verticale**: `clamp(5rem, 10vw, 8.5rem)`.
- **Container**: max-width `1200px`, gutter `clamp(1.25rem, 5vw, 2.5rem)`, centrato.
- **Raggi**: card `var(--radius-lg)=24px`; bottoni pill `999px`.
- **Bordi**: card con `1px solid var(--border)`; hover `--border-strong`.

## 5. Componenti
- **Header**: sticky, blur, logo a sx, nav al centro/dx, CTA rossa "Acquista AXON" a dx.
  Mobile: hamburger → overlay scuro.
- **Button**: primario rosso pill / secondario trasparente / ghost link.
- **Eyebrow pill**: bordo sottile, uppercase.
- **Card**: `--surface`, raggio 24px, bordo `--border`, hover `translateY(-4px)`.
- **Accordion** (HowItsDoneSection, ScienceSection, ResultsAccordion): barra verticale sinistra,
  altezza animata con Framer Motion `AnimatePresence`.
- **Testimonial carousel**: autoplay, swipe mobile, frecce prev/next.
- **Form**: input su `--surface-2`, label sopra, focus ring `--brand`, confirm inline.
- **Footer**: scuro, 4 colonne (brand + nav + prodotto + azienda), riga legale.

## 6. Anatomia HOME (ordine sezioni)
1. Header (sticky)
2. **Hero** — video background (`/hero-video.mp4`), testo e CTA in **nero** (su sfondo chiaro del video)
3. **Migliora il tuo benessere a 360°** (ContestiBento) — bento grid: corsa (col 1 span 2), box dati bianchi (4 sub-box con stat rosse: +42%, +28%, +30%, +21%), nuoto (col 2 riga 2), palestra (col 3 span 2)
4. **Tre passi, e basta.** (HowItsDoneSection) — accordion + immagine crossfade
5. **Per come ti muovi, ogni giorno.** (TargetCarousel) — carousel con 4 card immagine
6. **Chi lo indossa, lo racconta** (TestimonialsSection + TestimonialCarousel)
7. **Domande frequenti** (FaqSection)
8. Footer

## 7. Anatomia COME FUNZIONA
1. Hero — immagine `come_funziona_hero.png`, overlay 30%, titolo display
2. VideoSection — video embed `video_come_funziona.mp4`
3. ScienceSection — 3 pillar scientifici (Meccanotrasduzione / Vibrazioni / Nanomateriali),
   ciascuno con testo intro + accordion "Approfondimento tecnico" + immagine sticky; sezione
   riferimenti bibliografici in fondo

## 8. Anatomia PERCHÉ AXON
1. Hero — immagine `hero_perche_axon.png`, overlay 30%
2. Paragrafo intro (sfondo nero)
3. ResultsAccordion × 3 sezioni: Equilibrio (destra) / Forza (sinistra, bg elevated) / Mobilità (destra)
   — ogni metrica appare una sola volta; grafici in `/public/grafici-perche-axon/1–7.png`
4. PartnerSection — sfondo bianco, titolo display nero, 2 loghi reali (`/logo1.png`, `/logo2.png`)

## 9. Motion (Framer Motion)
- Reveal allo scroll: `opacity 0→1`, `y 24→0`, `duration 0.6`, `ease "easeOut"`, `viewport once`.
  `RevealGroup` + `RevealItem` per stagger figli.
- Hover card/bottoni: `translateY(-4px)`, `duration 0.2`.
- Accordion: animare `height`/`opacity` con `AnimatePresence`.
- Carousel: slide orizzontale.
- **Rispettare `prefers-reduced-motion`**: disattivare y-translate e autoplay.

## 10. Responsive
- Mobile-first. Breakpoint Tailwind: `sm 640 · md 768 · lg 1024 · xl 1280`.
- Nav: hamburger sotto `md`; inline da `md`.
- Griglie: 1 col (mobile) → 2 col (`md`) → 3 col (`lg`).
- Tipografia fluida via `clamp()`.
- Target tap ≥ 44px.

## 11. Accessibilità
- Contrasto AA su testo.
- Focus visibile (ring `--brand`) su tutti gli elementi interattivi.
- `alt` su tutte le immagini; label esplicite sui form.
- HTML semantico (`header/nav/main/section/footer`, heading order corretto).
