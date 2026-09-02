import type { ReactNode } from 'react'
import { getCopy } from '../copy'
import { usePrefs } from '../PrefsContext'
import type { ShellTab } from '../types'
import styles from './shell.module.css'

type Props = {
  tab: ShellTab
  onTab: (tab: ShellTab) => void
  onSos: () => void
  onResetHint: () => void
  children: ReactNode
}

export function AppShell({ tab, onTab, onSos, onResetHint, children }: Props) {
  const { prefs, setLanguage } = usePrefs()
  const copy = getCopy(prefs.language)

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <button type="button" className={styles.brand} onClick={onResetHint} aria-label={copy.appName}>
          <strong>{copy.appName}</strong>
          <span>
            {prefs.profile.displayName} · {prefs.profile.boatName}
          </span>
        </button>
        <button
          type="button"
          className={styles.langToggle}
          onClick={() => setLanguage(prefs.language === 'kn' ? 'en' : 'kn')}
        >
          {prefs.language === 'kn' ? 'EN' : 'कों'}
        </button>
      </header>

      <main className={styles.main}>{children}</main>

      <div className={styles.dock}>
        <div className={styles.sosRow}>
          <button type="button" className="btn btn-sos" onClick={onSos} aria-label={copy.sos}>
            🆘 {copy.sos}
          </button>
        </div>
        <nav className={styles.bottomNav} aria-label="Main">
          <NavBtn active={tab === 'home'} icon="🏠" label={copy.homeLabel} onClick={() => onTab('home')} />
          <NavBtn
            active={tab === 'schemes'}
            icon="📄"
            label={copy.schemesNav}
            onClick={() => onTab('schemes')}
          />
          <NavBtn active={tab === 'sea'} icon="🌊" label={copy.seaNav} onClick={() => onTab('sea')} />
          <NavBtn active={tab === 'trip'} icon="🚤" label={copy.tripNav} onClick={() => onTab('trip')} />
        </nav>
      </div>
    </div>
  )
}

function NavBtn({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean
  icon: string
  label: string
  onClick: () => void
}) {
  return (
    <button type="button" data-active={active} onClick={onClick}>
      <span aria-hidden="true">{icon}</span>
      {label}
    </button>
  )
}
