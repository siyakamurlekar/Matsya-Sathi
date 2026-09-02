import type { Copy } from '../copy'

type Props = {
  copy: Copy
  listening?: boolean
  onShowMe: () => void
  onListen: () => void
  onSpeak: () => void
}

export function InteractionBar({ copy, listening, onShowMe, onListen, onSpeak }: Props) {
  return (
    <div className="interaction-bar" role="group" aria-label="Show me, listen, speak">
      <button type="button" onClick={onShowMe}>
        <span aria-hidden="true">👀</span>
        {copy.showMe}
      </button>
      <button type="button" onClick={onListen}>
        <span aria-hidden="true">🔊</span>
        {copy.listen}
      </button>
      <button type="button" onClick={onSpeak} aria-pressed={listening}>
        <span aria-hidden="true">🗣️</span>
        {listening ? copy.speaking : copy.speak}
      </button>
    </div>
  )
}
