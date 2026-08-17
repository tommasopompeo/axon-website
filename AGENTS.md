# AGENTS.md — Sito AXON

Istruzioni per lo sviluppo. Leggere **per intero** prima di scrivere codice.
Leggere anche: `DESIGN.md`, `structure.md`, `knowledge/product.md`, `knowledge/content-it.md`.

## Cosa stiamo costruendo
Sito vetrina + shop per **Axon**, un **dispositivo medico di Classe I** (disco passivo
che si applica ai capi). Pubblico **consumer** + pagina **aziende** (B2B, senza login).

## Regole NON negoziabili
1. **Lingua: solo italiano.** Nessuna versione inglese. Tutte le stringhe in italiano.
2. **Claim medici:** usare SOLO i benefici elencati in `knowledge/product.md` →
   "Claim ammessi". **Mai** promesse di cura/guarigione, mai presentare Axon come farmaco.
   Rispettare i "Claim vietati". I dati dello studio vanno sempre contestualizzati come
   **risultati emersi in contesto medico-scientifico (pre/post)** con asterisco dove necessario.
3. **Design tokens:** usare i token di `design/tokens.css` / `tokens.json`. Niente colori
   hard-coded fuori dai token. Rosso brand = `#db181b`.
4. **Font:** Urbanist ovunque (import via `next/font/google` in `layout.tsx`).
5. **Logo:** wordmark bianco con X rossa, su **header scuro/nero**.
6. **Responsive obbligatorio:** mobile + desktop, mobile-first (vedi DESIGN.md §8).
7. **Shop:** i bottoni "Acquista" sono **redirect a Shopify** (link esterni), non checkout
   interno. URL in `lib/links.ts` (placeholder `'#'` finché non forniti).
8. **Accessibilità:** semantica, alt, label, focus visibile, contrasto AA.

## Stack & convenzioni
- **Next.js (App Router)** + **TypeScript** + **Tailwind CSS** + **Framer Motion**.
- Tailwind: estendere `theme` mappando i token (vedi tokens.json). Tema dark only.
- Struttura cartelle: vedi `structure.md` per mappa aggiornata.
- Componenti piccoli e riutilizzabili. Icone: `lucide-react`.
- Animazioni: wrapper `Reveal` (+ `RevealGroup`/`RevealItem`) con Framer Motion;
  rispettare `prefers-reduced-motion`.

## Cosa NON fare
- Non aggiungere contenuti o claim non presenti nei file `knowledge/`.
- Non introdurre testo in inglese (nemmeno placeholder: usare IT).
- Non implementare un checkout/carrello: lo shop reale è su Shopify.
- Non usare colori/spacing fuori dai token senza motivo.

## Aperti / da completare (chiedere a Tommaso quando rilevante)
- **URL prodotto Shopify** (KIT e SHELL) — attualmente `'#'` in `lib/links.ts`.
- **Testi consumer** da far validare al referente regolatorio Axon-Tech prima del go-live.
- **Testimonianze** in `content-it.md` sono esempi da validare/sostituire con quote reali.
- **P.IVA** in Footer (già inserita: IT05577370264 — verificare).
- **Social links**: tutti `'#'` in `lib/links.ts`.
- **`/termini`**: porta un blocco `DA VERIFICARE` in cima al file con le assunzioni
  commerciali non deducibili dal repo — da far confermare ad Axon-Tech/legale.
- **URL prodotti Shopify e social**: link reali in arrivo — quando disponibili,
  aggiornare `lib/links.ts` (`SHOPIFY_KIT_URL`/`SHOPIFY_SHELL_URL`/`SOCIAL.*`,
  attualmente `'#'`); nessun'altra modifica necessaria altrove.

Risolti da questa lista in una passata precedente (non più aperti): endpoint form
(ora `/api/contact`, vedi DESIGN.md §5), pagina `/privacy` (ora esistente, insieme a
`/cookie` e `/termini`), prezzo AXON SHELL Kit da 5 (confermato `€ 30,00`).
