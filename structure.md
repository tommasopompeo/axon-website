# AXON — Struttura del sito

Stack: **Next.js (App Router) + Tailwind + Framer Motion**, deploy su **Vercel**.
Lingua: **solo italiano**. Tema: **dark only**. Font: **Urbanist**.

## Route
| Route | Pagina | Note |
|---|---|---|
| `/` | Home / landing | Vedi ordine sezioni sotto |
| `/applicazioni` | Applicazioni | Contesti d'uso con scroll gallery |
| `/come-funziona` | Come funziona | Hero + video esplicativo |
| `/perche-axon` | Perchè AXON | Benefici (in costruzione) |
| `/fisioterapisti` | Fisioterapisti | Partnership (in costruzione) |
| `/shop` | Shop | 2 prodotti, CTA → redirect Shopify |
| `/aziende` | Enterprise | Casi d'uso + form B2B |
| `/contatti` | Contatti | Form generale |

## Navigazione (header)
Logo → "/" · Applicazioni (/applicazioni) · Come funziona (/come-funziona) ·
Perchè AXON (/perche-axon) · Fisioterapisti (/fisioterapisti) ·
Aziende (/aziende) · **[Acquista AXON]** → /shop

## Ordine sezioni HOME
1. Hero (`#top`) — video background + titolo + CTA
2. Contesti — bento grid con benefici + dati pilota nel box rosso (`#contesti`)
3. Come si applica — accordion "Tre passi e basta" (`#come-fatto`)
4. A chi è rivolto — carosello di contesti (`#per-chi`)
5. Testimonianze (`#testimonianze`)
6. FAQ (`#faq`)
7. Footer

## Struttura componenti
```
components/
├── home/               ← Sezioni della home page
│   ├── HeroSection
│   ├── ContestiBento
│   ├── HowItsDoneSection
│   ├── TargetCarousel
│   ├── TestimonialsSection
│   ├── TestimonialCarousel
│   └── FaqSection
├── applicazioni/       ← Sezioni pagina Applicazioni
│   ├── StickyScrollApplicazioni
│   ├── AxonFeaturesSection
│   └── WearMethodSection
├── come-funziona/      ← Sezioni pagina Come funziona
│   └── VideoSection
├── shop/               ← Componenti Shop
│   ├── ShopContent
│   └── ProductCard
├── aziende/            ← Componenti pagina Aziende
│   └── AziendeContent
├── contatti/           ← Componenti pagina Contatti
│   └── ContattiContent
├── layout/             ← Layout globale
│   ├── Header
│   └── Footer
├── ui/                 ← Primitive riutilizzabili
│   ├── Accordion
│   ├── Button
│   ├── Container
│   ├── Eyebrow
│   ├── Field
│   ├── Reveal
│   └── Section
└── JsonLd              ← SEO structured data
```

## Integrazioni (da completare)
- **Shopify**: i bottoni "Acquista" sono semplici link esterni alle pagine prodotto
  Shopify (target `_blank`). URL in `lib/links.ts`:
  `SHOPIFY_KIT_URL`, `SHOPIFY_SHELL_URL`. Nessun checkout sul sito.
- **Form** (contatti + aziende): servizio esterno (Web3Forms o Formspree) oppure API route
  Next.js + Resend. Endpoint/chiave in env (`.env.local`).
- **Dominio**: `axon-tech.it` (già di proprietà). Collegamento in Vercel a sito completato.

## Asset
- `logo.svg` → `/public/logo.svg`. Header scuro per leggibilità del bianco.
- Immagini prodotto e lifestyle → `/public/`
- Video hero → `/public/hero-video.mp4`
- Foto applicazioni → `/public/applicazioni/`
