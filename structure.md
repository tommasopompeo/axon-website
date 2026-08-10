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
| `/professionisti` | Professionisti | Completa (form placeholder) |
| `/shop` | Shop | Completa (link Shopify placeholder) |
| `/aziende` | Aziende — Enterprise | Completa (form placeholder) |
| `/contatti` | Contatti | Completa (form placeholder) |

`/fisioterapisti` è il vecchio slug della pagina Professionisti: redirect 301 permanente
verso `/professionisti` in `next.config.ts`.

## Navigazione (Header)
Voci: **Applicazioni** · **Come funziona** · **Perchè AXON** · **Professionisti** · **Aziende**
CTA destra: **Acquista AXON** → `/shop`

## Ordine sezioni HOME
1. Hero (`#top`) — video background + titolo nero + CTA
2. ContestiBento (`#contesti`) — bento grid benefici + dati pilota
3. HowItsDoneSection (`#come-indossare`) — griglia 2 colonne, metodi di applicazione
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
│   ├── HowItsDoneSection      ← griglia 2 colonne: Axon Shell™ cucito (axon-shell-sewn.jpg)
│   │                             + Axon Band al polso (axon-watch.jpg), CTA "Vedi nello shop"
│   ├── TargetCarousel         ← carousel orizzontale 4 card (ufficio/anziano/sciatore/intenso)
│   ├── TestimonialsSection    ← wrapper
│   ├── TestimonialCarousel    ← carousel testimonianze
│   └── FaqSection             ← accordion 10 FAQ + CTA contatti
├── applicazioni/
│   ├── StickyScrollApplicazioni  ← sticky scroll 7 contesti (applicazioni/1–7.png)
│   ├── AxonFeaturesSection       ← caratteristiche prodotto (usa axon_no_bkg.png)
│   └── WearMethodSection         ← 2 metodi di applicazione: AXON + Band (applicazioni_axonband.jpg),
│                                    AXON + Shell (applicazioni_axonshell.jpg)
├── come-funziona/
│   ├── VideoSection           ← player custom, embed video_come_funziona.mp4
│   └── ScienceSection         ← 3 pillar scientifici con accordion approfondimento + refs
├── perche-axon/
│   ├── ResultsAccordion       ← accordion dati studio (grafici-perche-axon/1–7.png)
│   └── PartnerSection         ← sfondo bianco, 2 loghi (logo1.png, logo2.png)
├── shop/
│   ├── ShopContent            ← 2 prodotti, immagini, CTA Shopify, box fiducia, mini-FAQ
│   └── ProductCard            ← card singolo prodotto
├── professionisti/
│   └── ProfessionistiContent  ← hero + ambiti professionali grid (6) + form B2B
├── aziende/
│   └── AziendeContent         ← hero + casi d'uso grid (6) + form B2B
├── contatti/
│   └── ContattiContent        ← form contatti + box contatti diretti
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
- `come_funziona_hero.jpg` — hero immagine pagina Come funziona
- `hero_applicazioni.jpg` — hero immagine pagina Applicazioni
- `hero_perche_axon.jpg` — hero immagine pagina Perché AXON
- `corsa.jpg`, `nuoto.jpg`, `palestra.jpg` — ContestiBento home
- `ufficio.jpg`, `anziano.jpg`, `sciatore.jpg`, `intenso.jpg` — TargetCarousel home
- `axon-shell-sewn.jpg`, `axon-watch.jpg` — HowItsDoneSection home
- `axon_no_bkg.png` — AxonFeaturesSection (PNG mantenuto: richiede canale alpha)
- `applicazioni_axonband.jpg`, `applicazioni_axonshell.jpg` — WearMethodSection (2 metodi)
- `kit-1.jpg`, `kit-2.jpg` — Shop, card AXON KIT
- `shell-1.jpg`, `shell-2.jpg` — Shop, card AXON SHELL™
- `video_come_funziona.mp4` — VideoSection
- `comefunziona1.jpg`, `comefunziona2.jpg`, `comefunziona3.jpg` — ScienceSection (3 pillar)
- `applicazioni/1–7.jpg` — StickyScrollApplicazioni
- `grafici-perche-axon/1–7.png` — ResultsAccordion, Perché AXON (PNG mantenuto: grafici con testo/linee sottili)
- `logo1.png`, `logo2.png` — PartnerSection, loghi partner reali (PNG mantenuto: canale alpha)

> Tutte le foto sopra sono state ricompresse a JPEG q82–85 il 2026-08-10 (erano PNG non compressi esportati da Canva, fino a 6250px per un display max di ~620px). PNG mantenuto solo dove serve trasparenza (`axon_no_bkg`, `logo1/2`) o dove la JPEG introdurrebbe artefatti su testo/linee sottili (`grafici-perche-axon/*`). Dettagli in `DESIGN.md` §14.

## Integrazioni (da completare)
- **Shopify**: `SHOPIFY_KIT_URL` e `SHOPIFY_SHELL_URL` in `lib/links.ts` — attualmente `'#'`.
- **Form**: `FORM_ENDPOINT` in `lib/links.ts` — attualmente `'#'`. Servizio esterno (Web3Forms/Formspree o API route + Resend).
- **Social**: `SOCIAL.instagram/tiktok/linkedin` in `lib/links.ts` — attualmente `'#'`.
- **Privacy Policy**: nessuna pagina `/privacy` esiste ancora — i link "Privacy Policy" nei form
  e in Footer puntano a `#` come placeholder.
- **Dominio**: `axon-tech.it`. Collegamento in Vercel a sito completato.
