# AXON — Struttura del sito

Stack: **Next.js (App Router) + Tailwind + Framer Motion**, deploy su **Vercel**.
Lingua: **solo italiano**. Tema: **dark only**.

## Route
| Route | Pagina | Note |
|---|---|---|
| `/` | Home / landing | Vedi ordine sezioni sotto |
| `/shop` | Shop | 2 prodotti, CTA → redirect Shopify |
| `/aziende` | Enterprise | Casi d'uso + form B2B (accessibile senza login) |
| `/contatti` | Contatti | Form generale |

## Navigazione (header)
Logo → "/" · Come funziona (#come-funziona) ·
Testimonianze (#testimonianze) · FAQ (#faq) · Aziende (/aziende) · **[Acquista]** → /shop

> Gli **Eyebrow/tag** in cima alle sezioni della home sono stati rimossi (resta solo il
> badge "Dispositivo medico · Classe I" nell'Hero). Gli `id`/anchor delle sezioni restano
> invariati per i link di navigazione.

## Ordine sezioni HOME
1. Hero (`#top`)
2. Contesti — bento grid che consolida benefici + dati pilota nel box rosso (`#contesti`)
3. Intro — testo "come funziona", senza stat block (`#come-funziona`)
4. Come è fatto / come si usa (`#come-fatto`)
5. A chi è rivolto — carosello di contesti (`#per-chi`)
6. Prodotti — preview shop (`#prodotti`)
7. Testimonianze (`#testimonianze`)
8. FAQ (`#faq`)
9. CTA finale (`#cta`)
10. Footer

> La sezione standalone **"Benefici"** (6 feature card, `#benefici`) è stata RIMOSSA dalla home;
> i suoi contenuti sono assorbiti dalla sezione Contesti.

## Componenti riutilizzabili (suggeriti)
`Header`, `Footer`, `Container`, `Section`, `Eyebrow`, `Button`, `Card`,
`FeatureCard`, `StepCard`, `ProductCard`, `StatRow`, `Accordion`, `TargetCarousel`,
`TestimonialCarousel`, `UseCaseGrid`, `ContactForm`, `EnterpriseForm`, `Reveal` (wrapper Framer Motion).

## Integrazioni (Fase 6)
- **Shopify**: i bottoni "Acquista" sono semplici link esterni alle pagine prodotto
  Shopify (target `_blank`). Inserire 2 URL in un file di config (es. `lib/links.ts`):
  `SHOPIFY_KIT_URL`, `SHOPIFY_SHELL_URL`. Nessun checkout sul sito.
- **Form** (contatti + aziende): servizio esterno (Web3Forms o Formspree) oppure API route
  Next.js + Resend. Endpoint/chiave in env (`.env.local`). Validazione client + server,
  honeypot anti-spam, stato di conferma inline.
- **Dominio**: `axon-tech.it` (già di proprietà). Collegamento in Vercel a sito completato.

## Asset
- `logo.svg` (fornito) → `/public/logo.svg`. Header scuro per leggibilità del bianco.
- Immagini prodotto in `assets/` → spostare in `/public` in fase di build:
  - `axon-device-pouch.jpg` (disco + Axon Shell™) → hero / prodotti
  - `axon-shell-sewn.png` (guscio cucito sul capo) → "come è fatto" / shell
- Servono altre immagini lifestyle/prodotto (Tommaso le fornirà): placeholder nel frattempo.
