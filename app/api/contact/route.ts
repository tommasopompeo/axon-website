// API route per i 3 form del sito (Contatti/Professionisti/Aziende).
// Il browser non chiama mai il provider direttamente — POSTa qui, la route
// valida lato server e inoltra. Vedi DESIGN.md §5 (Form).
//
// Provider attuale: Web3Forms (funziona senza DNS di dominio configurato —
// consegna semplicemente sull'email dell'account). La chiamata al provider è
// isolata in `sendViaWeb3Forms`: quando il dominio axon-tech.it sarà pronto,
// lo swap a Resend richiede solo di scrivere un `sendViaResend` equivalente e
// cambiare la chiamata in fondo a `POST` — nessuna modifica ai form.

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

// ── Config ──
const MAX_BODY_BYTES = 20_000 // form testuale, nessun allegato: 20KB è generoso
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SOURCES = ['contatti', 'professionisti', 'aziende'] as const
type Source = (typeof SOURCES)[number]

const SOURCE_LABEL: Record<Source, string> = {
  contatti: 'Contatti',
  professionisti: 'Professionisti',
  aziende: 'Aziende',
}

interface ContactPayload {
  source: Source
  nome: string
  email: string
  messaggio?: string
  _honey?: string
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

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

// Tutti i campi opzionali sono comunque stringhe se presenti (mai altri tipi).
function isOptionalString(v: unknown): v is string | undefined {
  return v === undefined || typeof v === 'string'
}

// ── Validazione lato server ──
// Ripete (non si fida di) la validazione client: campi obbligatori, formato
// email, honeypot vuoto. Ogni violazione fa fallire l'intera richiesta (400).
function validate(body: unknown): string[] {
  const errors: string[] = []

  if (typeof body !== 'object' || body === null) {
    return ['payload']
  }
  const b = body as Record<string, unknown>

  if (!SOURCES.includes(b.source as Source)) errors.push('source')
  if (!isNonEmptyString(b.nome)) errors.push('nome')
  if (!isNonEmptyString(b.email) || !EMAIL_RE.test((b.email as string).trim())) errors.push('email')
  if (isNonEmptyString(b._honey)) errors.push('honeypot') // bot: campo che un utente reale non compila

  const source = b.source as Source
  if (source === 'contatti' && !isNonEmptyString(b.messaggio)) errors.push('messaggio')
  if (source === 'professionisti' && !isNonEmptyString(b.professione)) errors.push('professione')
  if (source === 'aziende' && !isNonEmptyString(b.azienda)) errors.push('azienda')

  // Ogni altro campo noto, se presente, deve essere una stringa (difesa contro payload malformati).
  const optionalFields = [
    'oggetto', 'messaggio', 'professione', 'struttura', 'telefono', 'ambito',
    'tipo', 'pazienti', 'azienda', 'ruolo', 'settore', 'volumi',
  ] as const
  for (const f of optionalFields) {
    if (!isOptionalString(b[f])) errors.push(f)
  }

  return errors
}

// ── Costruzione oggetto/corpo email ──
// Una riga per campo, ordine fisso: Pagina, Nome, Email, poi i campi
// specifici della pagina, Messaggio per ultimo.
function buildEmail(payload: ContactPayload): { subject: string; message: string } {
  const label = SOURCE_LABEL[payload.source]
  const subject = `[Sito AXON — ${label}] Nuova richiesta da ${payload.nome}`

  const lines: [string, string | undefined][] = [
    ['Pagina', label],
    ['Nome', payload.nome],
    ['Email', payload.email],
  ]

  if (payload.source === 'contatti') {
    lines.push(['Oggetto', payload.oggetto])
  }

  if (payload.source === 'professionisti') {
    lines.push(
      ['Professione', payload.professione],
      ['Studio/struttura', payload.struttura],
      ['Telefono', payload.telefono],
      ['Ambito principale', payload.ambito],
      ['Tipo di interesse', payload.tipo],
      ['Pazienti/clienti seguiti', payload.pazienti],
    )
  }

  if (payload.source === 'aziende') {
    lines.push(
      ['Azienda', payload.azienda],
      ['Ruolo', payload.ruolo],
      ['Telefono', payload.telefono],
      ['Settore', payload.settore],
      ['Tipo di interesse', payload.tipo],
      ['Volumi stimati', payload.volumi],
    )
  }

  lines.push(['Messaggio', payload.messaggio])

  const message = lines
    .filter((entry): entry is [string, string] => isNonEmptyString(entry[1]))
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  return { subject, message }
}

// ── Provider: Web3Forms ──
// Unico punto che parla con l'esterno. Firma stabile (subject/replyTo/message)
// pensata per essere riusabile tale e quale da un futuro `sendViaResend`.
async function sendViaWeb3Forms(input: {
  accessKey: string
  subject: string
  replyTo: string
  fromName: string
  message: string
}): Promise<void> {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: input.accessKey,
      subject: input.subject,
      from_name: input.fromName,
      email: input.replyTo, // Web3Forms usa questo campo come Reply-To del messaggio consegnato
      message: input.message,
    }),
  })

  const json: unknown = await res.json().catch(() => null)
  const ok = res.ok && !!json && typeof json === 'object' && (json as { success?: boolean }).success === true
  if (!ok) {
    const detail = json && typeof json === 'object' ? (json as { message?: string }).message : undefined
    throw new Error(`Web3Forms: invio non riuscito${detail ? ` (${detail})` : ''} [status ${res.status}]`)
  }
}

export async function POST(req: NextRequest) {
  // Cap dimensione payload prima ancora di parsare il JSON.
  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Richiesta troppo grande.' }, { status: 413 })
  }

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'JSON non valido.' }, { status: 400 })
  }

  const errors = validate(body)
  if (errors.length) {
    return NextResponse.json({ error: 'Dati non validi.', fields: errors }, { status: 400 })
  }

  const payload = body as ContactPayload
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    // Env mancante (es. dev locale senza .env.local): niente fallback silenzioso lato client,
    // il form mostra il messaggio di errore server come per qualunque altro 5xx.
    console.error('[api/contact] WEB3FORMS_ACCESS_KEY non impostata')
    return NextResponse.json({ error: 'Servizio di invio non configurato.' }, { status: 500 })
  }

  const { subject, message } = buildEmail(payload)

  try {
    await sendViaWeb3Forms({
      accessKey,
      subject,
      replyTo: payload.email.trim(),
      fromName: payload.nome.trim(),
      message,
    })
  } catch (err) {
    console.error('[api/contact] invio fallito:', err)
    return NextResponse.json({ error: 'Invio non riuscito.' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
