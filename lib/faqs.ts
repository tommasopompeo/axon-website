// Testi esatti da knowledge/content-it.md → "FAQ (testi)".
// Sorgente unica delle FAQ: la Home (FaqSection) le rende tutte,
// Contatti ne seleziona un sottoinsieme per id.
export interface Faq {
  id: string
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    id: 'cosa-e-axon',
    q: 'Cos’è Axon?',
    a: 'Un dispositivo medico di Classe I, passivo e non invasivo: un disco che si applica ai tuoi capi e, con i micro-movimenti del corpo, genera micro-vibrazioni impercettibili che aiutano a migliorare equilibrio, forza e rilassamento muscolare. Non è un farmaco.',
  },
  {
    id: 'come-si-usa',
    q: 'Come si usa?',
    a: 'Si inserisce nell’Axon Shell e si cuce il guscio al capo (nuca, fascia lombare o petto), oppure si cuce direttamente. Poi basta indossare il capo normalmente. Non serve contatto con la pelle.',
  },
  {
    id: 'ricarica',
    q: 'Devo ricaricarlo o accenderlo?',
    a: 'No. Axon è completamente passivo: niente batterie, niente elettronica, niente ricarica.',
  },
  {
    id: 'percezione',
    q: 'Si sente mentre lo indosso?',
    a: 'No. Le micro-vibrazioni sono sub-percettibili: non te ne accorgi.',
  },
  {
    id: 'tempi',
    q: 'Quanto tempo prima di notare qualcosa?',
    a: 'Axon è pensato per un uso regolare e continuativo. Gli effetti riguardano equilibrio, forza, resistenza alla fatica e rilassamento muscolare con l’uso nel tempo.',
  },
  {
    id: 'lavaggio',
    q: 'Come si lava il capo?',
    a: 'Versione removibile: estrai Axon e lava il capo normalmente; pulisci Axon a mano con sapone neutro. Versione cucita: lavaggio a mano max 30 °C, senza lavatrice, asciugatrice o ferro diretto sull’area del dispositivo.',
  },
  {
    id: 'controindicazioni',
    q: 'Ci sono controindicazioni?',
    a: 'Nessuna controindicazione nota e nessun effetto collaterale segnalato. Non applicare su ferite aperte o pelle lesa. Per precauzione è sconsigliato a donne in gravidanza e bambini sotto i 3 anni.',
  },
  {
    id: 'durata-garanzia',
    q: 'Quanto dura e che garanzia ha?',
    a: 'È riutilizzabile a lungo se conservato correttamente. Garanzia di 2 anni dalla data d’acquisto.',
  },
  {
    id: 'contenuto-kit',
    q: 'Cosa contiene il Kit?',
    a: '1 dispositivo Axon Ø 30 mm, 1 Axon Shell e la scatola originale. A € 230,00, IVA e spedizione incluse.',
  },
  {
    id: 'aziende',
    q: 'Sono un’azienda: posso integrare Axon nei miei prodotti?',
    a: 'Sì. Axon è una tecnologia orizzontale, integrabile in capi, calzature, tutori e programmi per strutture e team. Visita la pagina Aziende e scrivici.',
  },
]
