# CLAUDE.md — Sito AXON

Istruzioni per Claude Code. Leggere **per intero** prima di scrivere codice.
Leggere anche: `DESIGN.md`, `structure.md`, `knowledge/product.md`,
`knowledge/content-it.md`, `knowledge/evidence.md`.

## Cosa stiamo costruendo
Sito vetrina + shop per **Axon**, un **dispositivo medico di Classe I** (disco passivo
che si applica ai capi). Pubblico **consumer** + pagina **aziende** (B2B, senza login).
Riferimento UI/UX da replicare (riskinnato Axon): **https://evotrack.framer.website/**.

## Regole NON negoziabili
1. **Lingua: solo italiano.** Nessuna versione inglese. Tutte le stringhe in italiano.
2. **Claim medici:** usare SOLO i benefici elencati in `knowledge/product.md` →
   "Claim ammessi". **Mai** promesse di cura/guarigione, mai presentare Axon come farmaco.
   Rispettare i "Claim vietati". I dati dello studio vanno sempre marcati come
   **studio pilota (14 soggetti)** con asterisco.
3. **Design tokens:** usare i token di `design/tokens.css` / `tokens.json`. Niente colori
   hard-coded fuori dai token. Rosso brand = `#db181b`.
4. **Font:** Host Grotesk ovunque (import in `globals.css`).
5. **Logo:** wordmark bianco con X rossa, su **header scuro/nero**.
6. **Responsive obbligatorio:** mobile + desktop, mobile-first (vedi DESIGN.md §8).
7. **Shop:** i bottoni "Acquista" sono **redirect a Shopify** (link esterni), non checkout
   interno. URL in `lib/links.ts` (placeholder finché non forniti).
8. **Accessibilità:** semantica, alt, label, focus visibile, contrasto AA (DESIGN.md §9).

## Stack & convenzioni
- **Next.js (App Router)** + **TypeScript** + **Tailwind CSS** + **Framer Motion**.
- Tailwind: estendere `theme` mappando i token (vedi tokens.json). Tema dark only.
- Struttura cartelle:
  - `app/` (route: `/`, `/shop`, `/aziende`, `/contatti`)
  - `components/` (vedi lista in structure.md)
  - `lib/` (`links.ts`, util form)
  - `public/` (logo.svg + immagini)
- Componenti piccoli e riutilizzabili. Niente librerie UI pesanti: Tailwind + Framer Motion
  bastano. Icone: `lucide-react`.
- Animazioni: wrapper `Reveal` con Framer Motion; rispettare `prefers-reduced-motion`.

## Ordine di build (procedere a step, fermarsi a fine di ognuno)
1. **Scaffold**: progetto Next.js + Tailwind + Framer Motion; import token e font;
   `globals.css`; layout root con `Header` + `Footer`; mappare token in `tailwind.config`.
2. **Primitivi**: `Container`, `Section`, `Eyebrow`, `Button`, `Card`, `Reveal`.
3. **Home — sezione per sezione**, nell'ordine di `structure.md`: Hero → Intro+Stat →
   Come è fatto → Benefici → Perché funziona → Prodotti → Testimonianze → FAQ → CTA finale.
   Tutti i testi da `knowledge/content-it.md`. Verificare a vista vs reference dopo ogni blocco.
4. **/shop**: 2 schede prodotto estese + CTA Shopify + box fiducia + mini-FAQ acquisto.
5. **/aziende**: hero + use-case grid + "perché B2B" + **form aziende** (campi in content-it.md).
6. **/contatti**: form generale + box contatti.
7. **Pass responsive** completo (tutte le pagine, mobile→desktop).
8. **Motion & polish**: reveal allo scroll, hover, glow rosso (con parsimonia), micro-dettagli.
9. **Integrazioni**: link Shopify, invio form (Web3Forms/Formspree o Resend), env.

## Cosa NON fare
- Non aggiungere contenuti o claim non presenti nei file `knowledge/`.
- Non introdurre testo in inglese (nemmeno placeholder come "Lorem"/"Coming soon": usare IT).
- Non implementare un checkout/carrello: lo shop reale è su Shopify.
- Non usare colori/spacing fuori dai token senza motivo.
- Non clonare immagini o asset di EvoTrack (è solo riferimento di layout/stile).

## Stato / aperti (da chiedere a Tommaso quando rilevante)
- Prezzo di **AXON SHELL™ Kit da 5** (placeholder ora).
- **URL prodotto Shopify** (KIT e SHELL).
- **Endpoint/servizio form** + email destinataria.
- **Logo.svg** definitivo e immagini lifestyle aggiuntive.
- Testimonianze: quelle in content-it.md sono **esempi da validare/sostituire**.
- Testi consumer da far **validare al referente regolatorio** Axon-Tech prima del go-live.
