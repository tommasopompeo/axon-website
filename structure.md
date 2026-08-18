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
| `/professionisti` | Professionisti | Completa (form → `/api/contact`) |
| `/shop` | Shop | Completa (link Shopify placeholder) |
| `/aziende` | Aziende — Enterprise | Completa (form → `/api/contact`) |
| `/contatti` | Contatti | Completa (form → `/api/contact`) |
| `/privacy` | Privacy Policy | Completa (prose-only, vedi `components/legal/LegalSection.tsx`) |
| `/cookie` | Cookie Policy | Completa |
| `/termini` | Termini e condizioni | Completa (blocco `DA VERIFICARE` in cima al file — assunzioni commerciali da confermare) |

`/fisioterapisti` è il vecchio slug della pagina Professionisti: redirect 301 permanente
verso `/professionisti` in `next.config.ts`.

`app/api/contact/route.ts` è l'unica route API: riceve i 3 form (Contatti/Professionisti/
Aziende), rivalida lato server e inoltra a Web3Forms. Vedi DESIGN.md §5 e §10.

## Navigazione (Header)
Voci: **Applicazioni** · **Come funziona** · **Perchè AXON** · **Professionisti** · **Aziende**
CTA destra: **Acquista AXON** → `/shop`

## Ordine sezioni HOME
1. Hero (`#top`) — video background + titolo nero + CTA
2. ContestiBento (`#contesti`) — bento grid benefici + dati pilota
3. HowItsDoneSection (`#come-indossare`) — griglia 2 colonne, metodi di applicazione
4. TargetCarousel (`#per-chi`) — griglia statica di 4 contesti d'uso (non un carousel, nonostante il nome — vedi DESIGN.md §11)
5. TestimonialsSection (`#testimonianze`) — carousel testimonianze
6. FaqSection (`#faq`) — accordion FAQ
7. Footer

## Struttura componenti
```
components/
├── home/
│   ├── HeroSection            ← video bg, testo nero, singola CTA → /shop
│   ├── ContestiBento          ← bento grid 3×2 (corsa / dati / nuoto / palestra)
│   ├── HowItsDoneSection      ← griglia 2 colonne: Axon Shell cucito (axon-shell-sewn.jpg)
│   │                             + Axon Band al polso (axon-watch.jpg), CTA "Vedi nello shop"
│   ├── TargetCarousel         ← griglia statica 4 card (ufficio/anziano/sciatore/intenso)
│   ├── TestimonialsSection    ← wrapper
│   ├── TestimonialCarousel    ← carousel testimonianze
│   └── FaqSection             ← accordion 10 FAQ (fonte: lib/faqs.ts) + CTA contatti
├── applicazioni/
│   ├── StickyScrollApplicazioni  ← sticky scroll 7 contesti (applicazioni/1–7.jpg)
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
│   └── ContattiContent        ← hero + form contatti + colonna FAQ (3 domande da lib/faqs.ts)
├── legal/
│   └── LegalSection           ← blocco H2+paragrafi condiviso da /privacy, /cookie, /termini
├── layout/
│   ├── Header                 ← sticky, nav desktop/mobile hamburger
│   └── Footer                 ← blocco brand + 3 colonne (Azienda/Navigazione/Informazioni Legali) + riga legale
├── ui/                        ← primitive riutilizzabili
│   ├── Accordion
│   ├── Button
│   ├── Card
│   ├── Container
│   ├── Eyebrow
│   ├── Field                  ← FieldGroup/FieldLabel/FieldError/Input/Textarea/Select/CheckboxField
│   ├── HeroFade               ← overlay scroll-linked per PageHero, vedi DESIGN.md §11
│   ├── MediaFrame
│   ├── PageHero                ← scaffold hero full-viewport (Home/Applicazioni/Come funziona/Perché AXON)
│   ├── Reveal                 ← (+ RevealGroup, RevealItem)
│   ├── Section
│   └── index.ts
└── JsonLd.tsx                 ← SEO structured data (Organization + Product)
```

## Asset pubblici (`/public/`)
- `logo.svg` — logo wordmark bianco/rosso
- `hero-video-disc.mp4` — disco AXON rotante, cropped/re-encoded dal vecchio video full-bleed (solo da `lg`, vedi DESIGN.md §6)
- `come_funziona_hero.jpg` — hero immagine pagina Come funziona
- `hero_applicazioni.jpg` — hero immagine pagina Applicazioni
- `hero_perche_axon.jpg` — hero immagine pagina Perché AXON
- `corsa.jpg`, `nuoto.jpg`, `palestra.jpg` — ContestiBento home
- `ufficio.jpg`, `anziano.jpg`, `sciatore.jpg`, `intenso.jpg` — TargetCarousel home
- `axon-shell-sewn.jpg`, `axon-watch.jpg` — HowItsDoneSection home
- `axon_no_bkg.png` — AxonFeaturesSection (PNG mantenuto: richiede canale alpha)
- `applicazioni_axonband.jpg`, `applicazioni_axonshell.jpg` — WearMethodSection (2 metodi)
- `kit-1.jpg`, `kit-2.jpg` — Shop, card AXON KIT
- `shell-1.jpg`, `shell-2.jpg` — Shop, card AXON SHELL
- `video_come_funziona.mp4` + `video-come-funziona-poster.jpg` — VideoSection + poster frame
- `comefunziona1.jpg`, `comefunziona2.jpg`, `comefunziona3.jpg` — ScienceSection (3 pillar)
- `applicazioni/1–7.jpg` — StickyScrollApplicazioni
- `grafici-perche-axon/1–7.png` — ResultsAccordion, Perché AXON (PNG mantenuto: grafici con testo/linee sottili)
- `logo1.png`, `logo2.png` — PartnerSection, loghi partner reali (PNG mantenuto: canale alpha)

> Tutte le foto sopra sono state ricompresse a JPEG q82–85 il 2026-08-10 (erano PNG non compressi esportati da Canva, fino a 6250px per un display max di ~620px). PNG mantenuto solo dove serve trasparenza (`axon_no_bkg`, `logo1/2`) o dove la JPEG introdurrebbe artefatti su testo/linee sottili (`grafici-perche-axon/*`). Dettagli in `DESIGN.md` §14.

## Integrazioni
- **Shopify**: `SHOPIFY_KIT_URL` e `SHOPIFY_SHELL_URL` in `lib/links.ts` — attualmente `'#'` (da completare).
- **Form**: i 3 form (Contatti/Professionisti/Aziende) POSTano a `FORM_ENDPOINT` (`lib/links.ts`, ora `/api/contact`), che rivalida lato server e inoltra via Web3Forms (chiave `WEB3FORMS_ACCESS_KEY`, solo server — vedi `.env.example` e DESIGN.md §5). Completo.
- **Social**: `SOCIAL.instagram/tiktok/linkedin` in `lib/links.ts` — attualmente `'#'` (da completare); l'icona corrispondente non renderizza in Footer finché resta placeholder.
- **Pagine legali**: `/privacy`, `/cookie`, `/termini` esistono e sono linkate da Footer → "Informazioni Legali" e dai form (consenso privacy). `/termini` porta un blocco `DA VERIFICARE` da far confermare ad Axon-Tech prima del go-live.
- **Dominio**: `axon-tech.it`. Collegamento in Vercel a sito completato.
