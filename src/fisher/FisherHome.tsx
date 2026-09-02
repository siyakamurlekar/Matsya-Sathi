import { useState } from 'react'
import type { ReactNode } from 'react'
import { getCopy } from '../copy'
import { homeMock } from '../mockHome'
import { usePrefs } from '../PrefsContext'
import { InteractionBar } from '../ui/InteractionBar'
import { SathiSays } from '../ui/SathiSays'
import { ShowMePanel } from '../ui/ShowMePanel'
import { StatusMark } from '../ui/StatusMark'
import { canListen, listenOnce, speakText } from '../voice'
import styles from './home.module.css'

type RegionId = 'sea' | 'schemes' | 'family' | 'help'

const showMeOrder: RegionId[] = ['sea', 'schemes', 'family', 'help']

type Props = {
  onNeedNotice: (text: string) => void
}

export function FisherHome({ onNeedNotice }: Props) {
  const { prefs } = usePrefs()
  const copy = getCopy(prefs.language)
  const [showIndex, setShowIndex] = useState<number | null>(null)
  const [listening, setListening] = useState(false)

  const showId = showIndex === null ? null : showMeOrder[showIndex]
  const showScripts = {
    sea: copy.showSea,
    schemes: copy.showSchemes,
    family: copy.showFamily,
    help: copy.showHelp,
  }

  function listen(text: string) {
    speakText(text, prefs.language)
  }

  function speakIntent(raw: string) {
    const t = raw.toLowerCase()
    if (t.includes('sos') || t.includes('emergency')) {
      listen(copy.listenHelp)
      onNeedNotice(copy.noticeSos)
      return
    }
    if (t.includes('sea') || t.includes('समुद्र') || t.includes('go')) {
      listen(copy.listenSea)
      return
    }
    if (t.includes('scheme') || t.includes('योजना') || t.includes('सरकार')) {
      listen(copy.listenSchemes)
      return
    }
    if (t.includes('family') || t.includes('कुटुंब')) {
      listen(copy.listenFamily)
      return
    }
    if (t.includes('help') || t.includes('मदत')) {
      listen(copy.listenHelp)
      onNeedNotice(copy.noticeSos)
      return
    }
    if (t.includes('trip') || t.includes('start') || t.includes('प्रवास')) {
      onNeedNotice(copy.noticeTrip)
      return
    }
    listen(copy.listenHome)
  }

  function onSpeak() {
    if (listening) return
    if (!canListen()) {
      onNeedNotice(copy.tapInstead)
      return
    }
    setListening(true)
    listenOnce(
      prefs.language,
      (text) => speakIntent(text),
      () => onNeedNotice(copy.tapInstead),
      () => setListening(false),
    )
  }

  return (
    <div className={styles.home}>
      <SathiSays copy={copy} text={copy.sathiHome} />

      <div className={styles.regions}>
        <Region
          id="sea"
          active={showId === 'sea'}
          icon="🌊"
          label={copy.qSea}
          status={<StatusMark status={homeMock.seaStatus} language={prefs.language} />}
          onClick={() => listen(copy.listenSea)}
        />
        <Region
          id="schemes"
          active={showId === 'schemes'}
          icon="📄"
          label={copy.qSchemes}
          status={<span className={styles.status}>{copy.schemesStatus}</span>}
          onClick={() => listen(copy.listenSchemes)}
        />
        <Region
          id="family"
          active={showId === 'family'}
          icon="👨‍👩‍👦"
          label={copy.qFamily}
          status={<span className={styles.status}>{copy.familyReady}</span>}
          onClick={() => listen(copy.listenFamily)}
        />
        <Region
          id="help"
          active={showId === 'help'}
          icon="🆘"
          label={copy.qHelp}
          status={<span className={styles.status}>{copy.helpIdle}</span>}
          onClick={() => onNeedNotice(copy.noticeSos)}
        />
      </div>

      <button type="button" className={`btn btn-primary ${styles.ask}`} onClick={onSpeak}>
        🗣️ {copy.askByVoice}
      </button>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => onNeedNotice(copy.noticeTrip)}
      >
        {copy.startTrip}
      </button>

      <InteractionBar
        copy={copy}
        listening={listening}
        onShowMe={() => setShowIndex(0)}
        onListen={() => listen(copy.listenHome)}
        onSpeak={onSpeak}
      />

      {showIndex !== null && showId ? (
        <ShowMePanel
          copy={copy}
          instruction={showScripts[showId]}
          isLast={showIndex === showMeOrder.length - 1}
          onNext={() => setShowIndex((i) => (i === null ? 0 : i + 1))}
          onDone={() => setShowIndex(null)}
        />
      ) : null}
    </div>
  )
}

function Region({
  id,
  active,
  icon,
  label,
  status,
  onClick,
}: {
  id: RegionId
  active: boolean
  icon: string
  label: string
  status: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={`${styles.region} ${active ? 'is-showme' : ''}`}
      data-region={id}
      onClick={onClick}
    >
      <span className={styles.emoji} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.label}>{label}</span>
      {status}
    </button>
  )
}
