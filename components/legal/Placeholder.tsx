/**
 * Placeholder — valore legale/societario non ancora noto, reso come token
 * {{NOME}} volutamente vistoso (evidenziato in rosso, monospace) così non
 * può arrivare in produzione inosservato. Quando il valore reale è
 * disponibile, sostituire l'intero <Placeholder token="…" /> con il testo
 * definitivo. L'elenco completo dei token e dei valori attesi è nel commento
 * in cima a app/termini/page.tsx.
 *
 * Nessun hook: utilizzabile sia in Server che in Client Component
 * (Footer è server, ShopContent è client).
 */
export default function Placeholder({ token }: { token: string }) {
  return (
    <mark
      style={{
        background: 'rgba(219, 24, 27, 0.18)',
        color: '#ffb4b5',
        border: '1px dashed rgba(219, 24, 27, 0.65)',
        borderRadius: '4px',
        padding: '0 0.3em',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: '0.9em',
        whiteSpace: 'nowrap',
      }}
    >
      {'{{'}
      {token}
      {'}}'}
    </mark>
  )
}
