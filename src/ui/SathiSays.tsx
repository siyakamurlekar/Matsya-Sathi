import type { Copy } from '../copy'

type Props = {
  copy: Copy
  text: string
}

/** Contextual companion line — not a chatbot. */
export function SathiSays({ copy, text }: Props) {
  return (
    <aside className="sathi" aria-live="polite">
      <div className="sathi-label">{copy.sathiSays}</div>
      <p className="sathi-line">{text}</p>
    </aside>
  )
}
