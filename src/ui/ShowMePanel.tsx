import type { Copy } from '../copy'

type Props = {
  copy: Copy
  instruction: string
  isLast: boolean
  onNext: () => void
  onDone: () => void
}

export function ShowMePanel({ copy, instruction, isLast, onNext, onDone }: Props) {
  return (
    <>
      <div className="showme-dim" aria-hidden="true" />
      <div className="showme-panel" role="dialog" aria-label={copy.showMe}>
        <p>{instruction}</p>
        <div className="showme-actions">
          {!isLast ? (
            <button type="button" className="btn btn-primary" onClick={onNext}>
              {copy.next}
            </button>
          ) : null}
          <button type="button" className={isLast ? 'btn btn-primary' : 'btn btn-secondary'} onClick={onDone}>
            {copy.done}
          </button>
        </div>
      </div>
    </>
  )
}
