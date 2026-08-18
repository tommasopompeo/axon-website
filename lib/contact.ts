// Invio dei 3 form del sito (Contatti/Professionisti/Aziende) a Web3Forms,
// direttamente dal browser — è il modello richiesto dal provider: il piano
// free di Web3Forms rifiuta (403) qualunque chiamata server-side/proxy, la
// richiesta deve partire dal client per la loro spam prevention. Per questo
// l'access key è NEXT_PUBLIC_ ed è visibile nel sorgente della pagina:
// Web3Forms la definisce esplicitamente una chiave pubblica, sicura nel
// codice client (la consegna avviene solo verso l'email dell'account).
//
// Punto di swap provider: quando axon-tech.it avrà il DNS configurato e si
// passerà a Resend, questo modulo è l'unico da toccare — `submitContact`
// tornerà a POSTare a una API route interna (/api/contact) che chiama Resend
// con chiave privata server-side. I 3 form non cambiano. Vedi DESIGN.md §5.

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export type ContactSource = 'contatti' | 'professionisti' | 'aziende'

const SOURCE_LABEL: Record<ContactSource, string> = {
  contatti: 'Contatti',
  professionisti: 'Professionisti',
  aziende: 'Aziende',
}

export interface ContactFields {
  nome: string
  email: string
  messaggio?: string
  // Contatti
  oggetto?: string
  // Professionisti
  professione?: string
  struttura?: string
  telefono?: string
  ambito?: string
  tipo?: string
  pazienti?: string
  // Aziende
  azienda?: string
  ruolo?: string
  settore?: string
  volumi?: string
}

// Oggetto e corpo dell'email: una riga per campo, ordine fisso — Pagina,
// Nome, Email, campi specifici della pagina, Messaggio per ultimo.
function buildEmail(source: ContactSource, f: ContactFields): { subject: string; message: string } {
  const label = SOURCE_LABEL[source]
  const subject = `[Sito AXON — ${label}] Nuova richiesta da ${f.nome}`

  const lines: [string, string | undefined][] = [
    ['Pagina', label],
    ['Nome', f.nome],
    ['Email', f.email],
  ]

  if (source === 'contatti') {
    lines.push(['Oggetto', f.oggetto])
  }

  if (source === 'professionisti') {
    lines.push(
      ['Professione', f.professione],
      ['Studio/struttura', f.struttura],
      ['Telefono', f.telefono],
      ['Ambito principale', f.ambito],
      ['Tipo di interesse', f.tipo],
      ['Pazienti/clienti seguiti', f.pazienti],
    )
  }

  if (source === 'aziende') {
    lines.push(
      ['Azienda', f.azienda],
      ['Ruolo', f.ruolo],
      ['Telefono', f.telefono],
      ['Settore', f.settore],
      ['Tipo di interesse', f.tipo],
      ['Volumi stimati', f.volumi],
    )
  }

  lines.push(['Messaggio', f.messaggio])

  const message = lines
    .filter((entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1].trim().length > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  return { subject, message }
}

// Invia il form a Web3Forms. Lancia in caso di errore (env mancante, rete,
// rifiuto del provider): i form lo catturano e mostrano lo stato serverError
// esistente — nessun successo finto in nessun caso.
export async function submitContact(source: ContactSource, fields: ContactFields): Promise<void> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
  if (!accessKey) {
    throw new Error('NEXT_PUBLIC_WEB3FORMS_KEY non impostata')
  }

  const { subject, message } = buildEmail(source, fields)

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: fields.nome.trim(),
      email: fields.email.trim(), // Web3Forms lo usa come Reply-To dell'email consegnata
      message,
      botcheck: '', // honeypot di Web3Forms: vuoto = umano (il nostro _honey resta nei form)
    }),
  })

  const json: unknown = await res.json().catch(() => null)
  const ok = res.ok && !!json && typeof json === 'object' && (json as { success?: boolean }).success === true
  if (!ok) {
    const detail = json && typeof json === 'object' ? (json as { message?: string }).message : undefined
    throw new Error(`Web3Forms: invio non riuscito${detail ? ` (${detail})` : ''} [status ${res.status}]`)
  }
}
