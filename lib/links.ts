// URL prodotti Shopify — da aggiornare quando disponibili
export const SHOPIFY_KIT_URL = '#'
export const SHOPIFY_SHELL_URL = '#'

// Route interna che riceve i 3 form (Contatti/Professionisti/Aziende) e li
// inoltra al provider email — vedi app/api/contact/route.ts e DESIGN.md §5.
export const FORM_ENDPOINT = '/api/contact'

// Profili social — finché un valore resta '#', l'icona corrispondente non
// viene renderizzata (Footer). Impostare l'URL reale qui è sufficiente
// per farla ricomparire: nessuna altra modifica.
export const SOCIAL = {
  instagram: '#',
  tiktok: '#',
  linkedin: '#',
}
