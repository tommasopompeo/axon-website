# AXON — Struttura del sito

Stack: **Next.js (App Router) + Tailwind + Framer Motion**, deploy su **Vercel**.
Lingua: **solo italiano**. Tema: **dark only**. Font: **Urbanist**.

## Route
| Route | Pagina | Stato |
|---|---|---|
| `/` | Home | Completa |
| `/applicazioni` | Applicazioni | Completa |
| `/come-funziona` | Come funziona | Completa |
| `/perche-axon` | Perché AXON | Completa |
| `/fisioterapisti` | Fisioterapisti | Stub (in costruzione) |
| `/shop` | Shop | Completa (link Shopify placeholder) |
| `/aziende` | Aziende — Enterprise | Completa (form placeholder) |
| `/contatti` | Contatti | Completa (form placeholder) |

## Navigazione (Header)
Voci: **Applicazioni** · **Come funziona** · **Perchè AXON** · **Fisioterapisti** · **Aziende**
CTA destra: **Acquista AXON** → `/shop`

## Ordine sezioni HOME
1. Hero (`#top`) — video background + titolo nero + CTA
2. ContestiBento (`#contesti`) — bento grid benefici + dati pilota
3. HowItsDoneSection (`#come-fatto`) — accordion "Tre passi, e basta."
4. TargetCarousel (`#per-chi`) — carousel di 4 contesti d'uso
5. TestimonialsSection (`#testimonianze`) — carousel testimonianze
6. FaqSection (`#faq`) — accordion FAQ
7. Footer

## Struttura componenti
```
components/
├── home/
│   ├── HeroSection            ← video bg, testo nero, singola CTA → /shop
│   ├── ContestiBento          ← bento grid 3×2 (corsa / dati / nuoto / palestra)
│   ├── HowItsDoneSection      ← accordion 3 passi + crossfade immagine
│   ├── TargetCarousel         ← carousel orizzontale 4 card (ufficio/anziano/sciatore/intenso)
│   ├── TestimonialsSection    ← wrapper
│   ├── TestimonialCarousel    ← carousel testimonianze
│   └── FaqSection             ← accordion 10 FAQ + CTA contatti
├── applicazioni/
│   ├── StickyScrollApplicazioni  ← sticky scroll 7 contesti (applicazioni/1–7.png)
│   ├── AxonFeaturesSection       ← caratteristiche prodotto (usa axon_no_bkg.png)
│   └── WearMethodSection         ← metodi di applicazione
├── come-funziona/
│   ├── VideoSection           ← embed video_come_funziona.mp4
│   └── ScienceSection         ← 3 pillar scientifici con accordion approfondimento + refs
├── perche-axon/
│   ├── ResultsAccordion       ← accordion dati studio (grafici-perche-axon/1–7.png)
│   └── PartnerSection         ← sfondo bianco, 2 loghi (logo1.png, logo2.png)
├── shop/
│   ├── ShopContent            ← 2 prodotti, immagini, CTA Shopify
│   └── ProductCard            ← card singolo prodotto
├── aziende/
│   └── AziendeContent         ← hero + use case grid + form B2B
├── contatti/
│   └── ContattiContent        ← form contatti
├── layout/
│   ├── Header                 ← sticky, nav desktop/mobile hamburger
│   └── Footer                 ← 4 colonne + riga legale
├── ui/                        ← primitive riutilizzabili
│   ├── Accordion
│   ├── Button
│   ├── Container
│   ├── Eyebrow
│   ├── Field
│   ├── Reveal                 ← (+ RevealGroup, RevealItem)
│   ├── Section
│   └── index.ts
└── JsonLd.tsx                 ← SEO structured data (Organization + Product)
```

## Asset pubblici (`/public/`)
- `logo.svg` — logo wordmark bianco/rosso
- `hero-video.mp4` — video background home hero
- `come_funziona_hero.png` — hero immagine pagina Come funziona
- `hero_applicazioni.png` — hero immagine pagina Applicazioni
- `hero_perche_axon.png` — hero immagine pagina Perché AXON
- `corsa.png`, `nuoto.png`, `palestra.png` — ContestiBento home
- `ufficio.png`, `anziano.png`, `sciatore.png`, `intenso.png` — TargetCarousel home
- `axon-shell-sewn.png`, `axon-watch.png` — HowItsDoneSection (passi 1, 2)
- `axon_no_bkg.png` — AxonFeaturesSection
- `applicazioni_axonband.png`, `applicazioni_axonshell.png`, `applicazioni_axon_singolo.png` — WearMethodSection
- `kit-1.png`, `kit-2.png` — Shop, card AXON KIT
- `shell-1.png`, `shell-2.png` — Shop, card AXON SHELL™
- `video_come_funziona.mp4` — VideoSection
- `comefunziona1.png`, `comefunziona2.png`, `comefunziona3.jpg` — ScienceSection (3 pillar)
- `applicazioni/1–7.png` — StickyScrollApplicazioni
- `grafici-perche-axon/1–7.png` — ResultsAccordion (Perché AXON)
- `logo1.png`, `logo2.png` — PartnerSection (loghi partner reali)

## Integrazioni (da completare)
- **Shopify**: `SHOPIFY_KIT_URL` e `SHOPIFY_SHELL_URL` in `lib/links.ts` — attualmente `'#'`.
- **Form**: `FORM_ENDPOINT` in `lib/links.ts` — attualmente `'#'`. Servizio esterno (Web3Forms/Formspree o API route + Resend).
- **Social**: `SOCIAL.instagram/tiktok/linkedin` in `lib/links.ts` — attualmente `'#'`.
- **Dominio**: `axon-tech.it`. Collegamento in Vercel a sito completato.
