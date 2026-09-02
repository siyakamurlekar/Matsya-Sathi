import { useState } from 'react'
import { demoProfileEn, demoProfileKn, getCopy } from '../copy'
import { usePrefs } from '../PrefsContext'
import type { Language, OnboardingStep, Role } from '../types'
import { SathiSays } from '../ui/SathiSays'
import { speakText } from '../voice'
import styles from './onboarding.module.css'

export function Onboarding() {
  const { prefs, update, setLanguage, setRole, setProfile, completeOnboarding } = usePrefs()
  const [step, setStep] = useState<OnboardingStep>('splash')
  const copy = getCopy(prefs.language)

  function listen(text: string) {
    if (prefs.voiceEnabled) speakText(text, prefs.language)
  }

  if (step === 'splash') {
    return (
      <div className={styles.page}>
        <button
          type="button"
          className={styles.splash}
          onClick={() => setStep('language')}
        >
          <h1>Matsya Sathi</h1>
          <p>{copy.meaning}</p>
          <p>{copy.place}</p>
          <div className={styles.wave} aria-hidden="true" />
        </button>
        <div className={styles.actions}>
          <button type="button" className="btn btn-primary" onClick={() => setStep('language')}>
            {copy.continue}
          </button>
        </div>
      </div>
    )
  }

  if (step === 'language') {
    return (
      <div className={styles.page}>
        <SathiSays copy={copy} text={copy.sathiLanguage} />
        <h1 className={styles.title}>{copy.languageTitle}</h1>
        <div className={styles.choices}>
          <button
            type="button"
            className="btn btn-choice"
            data-selected={prefs.language === 'kn'}
            onClick={() => {
              setLanguage('kn')
              setStep('role')
            }}
          >
            <span className="icon-word">
              <span className="icon" aria-hidden="true">🗣️</span>
              <span className="word">{copy.konkani}</span>
            </span>
          </button>
          <button
            type="button"
            className="btn btn-choice"
            data-selected={prefs.language === 'en'}
            onClick={() => {
              setLanguage('en')
              setStep('role')
            }}
          >
            <span className="icon-word">
              <span className="icon" aria-hidden="true">🗣️</span>
              <span className="word">{copy.english}</span>
            </span>
          </button>
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => listen(copy.sathiLanguage)}>
          🔊 {copy.listen}
        </button>
      </div>
    )
  }

  if (step === 'role') {
    return (
      <div className={styles.page}>
        <SathiSays copy={copy} text={copy.sathiRole} />
        <h1 className={styles.title}>{copy.roleTitle}</h1>
        <div className={styles.choices}>
          <RoleButton
            selected={prefs.role === 'fisher'}
            icon="🚤"
            label={copy.fisher}
            onPick={() => pickRole('fisher')}
          />
          <RoleButton
            selected={prefs.role === 'family'}
            icon="👨‍👩‍👦"
            label={copy.family}
            onPick={() => pickRole('family')}
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => listen(copy.sathiRole)}>
          🔊 {copy.listen}
        </button>
      </div>
    )
  }

  if (step === 'simpleMode') {
    return (
      <div className={styles.page}>
        <SathiSays copy={copy} text={copy.sathiSimple} />
        <h1 className={styles.title}>{copy.simpleTitle}</h1>
        <p className={styles.lead}>{copy.simpleBody}</p>
        <div className={styles.actions}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              update({ simpleMode: true, voiceEnabled: true })
              setStep('profile')
            }}
          >
            {copy.useSimple}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              update({ simpleMode: false })
              setStep('profile')
            }}
          >
            {copy.notNow}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              update({ voiceEnabled: !prefs.voiceEnabled })
            }
          >
            {prefs.voiceEnabled ? copy.voiceOn : copy.voiceOff}
          </button>
        </div>
      </div>
    )
  }

  if (step === 'profile') {
    return (
      <div className={styles.page}>
        <SathiSays copy={copy} text={copy.sathiProfile} />
        <h1 className={styles.title}>{copy.profileTitle}</h1>
        <p className={styles.lead}>
          {prefs.profile.displayName} · {prefs.profile.boatName} · {prefs.profile.village}
        </p>
        <div className={styles.actions}>
          <button type="button" className="btn btn-primary" onClick={() => applyDemo(prefs.language)}>
            {copy.useDemo}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setStep('howItWorks')}>
            {copy.continue}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <SathiSays copy={copy} text={copy.sathiHow} />
      <h1 className={styles.title}>{copy.howTitle}</h1>
      <div className={styles.flow} aria-hidden="true">
        <div className={styles.node}>🚤 {copy.boat}</div>
        <div className={styles.arrow}>↓</div>
        <div className={styles.node}>📡 {copy.beacon}</div>
        <div className={styles.arrow}>↓</div>
        <div className={styles.node}>📶 {copy.network}</div>
        <div className={styles.arrow}>↓</div>
        <div className={styles.node}>👨‍👩‍👦 {copy.familyNode}</div>
      </div>
      <div className={styles.actions}>
        <button type="button" className="btn btn-primary" onClick={() => completeOnboarding()}>
          {copy.goHome}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => completeOnboarding()}>
          {copy.skip}
        </button>
      </div>
    </div>
  )

  function pickRole(role: Role) {
    setRole(role)
    setStep('simpleMode')
  }

  function applyDemo(language: Language) {
    setProfile(language === 'en' ? demoProfileEn : demoProfileKn)
    setStep('howItWorks')
  }
}

function RoleButton({
  selected,
  icon,
  label,
  onPick,
}: {
  selected: boolean
  icon: string
  label: string
  onPick: () => void
}) {
  return (
    <button type="button" className="btn btn-choice" data-selected={selected} onClick={onPick}>
      <span className="icon-word">
        <span className="icon" aria-hidden="true">
          {icon}
        </span>
        <span className="word">{label}</span>
      </span>
    </button>
  )
}
