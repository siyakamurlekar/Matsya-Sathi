import { useRef, useState } from 'react'
import { getCopy } from './copy'
import { FisherHome } from './fisher/FisherHome'
import { Onboarding } from './onboarding/Onboarding'
import { PrefsProvider, usePrefs } from './PrefsContext'
import { AppShell } from './shell/AppShell'
import type { ShellTab } from './types'
import { SathiSays } from './ui/SathiSays'
import homeStyles from './fisher/home.module.css'

function AppView() {
  const { prefs, resetOnboarding } = usePrefs()
  const copy = getCopy(prefs.language)
  const [tab, setTab] = useState<ShellTab>('home')
  const [notice, setNotice] = useState<string | null>(null)
  const taps = useRef(0)
  const tapTimer = useRef<number | null>(null)

  if (!prefs.onboardingDone) {
    return <Onboarding />
  }

  function showNotice(text: string) {
    setNotice(text)
  }

  function onBrandTap() {
    taps.current += 1
    if (tapTimer.current) window.clearTimeout(tapTimer.current)
    tapTimer.current = window.setTimeout(() => {
      taps.current = 0
    }, 1200)
    if (taps.current >= 7) {
      taps.current = 0
      resetOnboarding()
    }
  }

  if (prefs.role === 'family') {
    return (
      <div className="phone">
        <div className={homeStyles.placeholder}>
          <SathiSays copy={copy} text={copy.familySoon} />
          <p className="notice">{copy.familySoon}</p>
          <button type="button" className="btn btn-secondary" onClick={() => resetOnboarding()}>
            {copy.back}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="phone">
      <AppShell
        tab={tab}
        onTab={(next) => {
          if (next !== 'home') showNotice(copy.noticeTab)
          setTab(next === 'home' ? 'home' : next)
        }}
        onSos={() => showNotice(copy.noticeSos)}
        onResetHint={onBrandTap}
      >
        {notice ? (
          <p className="notice" role="status">
            {notice}
          </p>
        ) : null}
        {tab === 'home' ? (
          <FisherHome onNeedNotice={showNotice} />
        ) : (
          <p className="notice">{copy.noticeTab}</p>
        )}
      </AppShell>
    </div>
  )
}

export default function App() {
  return (
    <PrefsProvider>
      <div className="app-root">
        <AppView />
      </div>
    </PrefsProvider>
  )
}
