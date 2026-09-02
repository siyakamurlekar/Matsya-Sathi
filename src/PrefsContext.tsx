import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { clearPrefs, defaultPrefs, loadPrefs, savePrefs } from './prefs'
import type { Language, Prefs, Profile, Role } from './types'

type PrefsContextValue = {
  prefs: Prefs
  update: (patch: Partial<Prefs>) => void
  setProfile: (profile: Profile) => void
  setLanguage: (language: Language) => void
  setRole: (role: Role) => void
  completeOnboarding: () => void
  resetOnboarding: () => void
}

const PrefsContext = createContext<PrefsContextValue | null>(null)

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('reset') === '1') {
      clearPrefs()
    }
    setPrefs(loadPrefs())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    savePrefs(prefs)
    document.documentElement.lang = prefs.language === 'en' ? 'en' : 'kok'
    document.documentElement.dataset.simple = prefs.simpleMode ? 'true' : 'false'
    document.documentElement.dataset.lang = prefs.language
  }, [prefs, ready])

  const value = useMemo<PrefsContextValue>(
    () => ({
      prefs,
      update: (patch) => setPrefs((prev) => ({ ...prev, ...patch })),
      setProfile: (profile) => setPrefs((prev) => ({ ...prev, profile })),
      setLanguage: (language) => setPrefs((prev) => ({ ...prev, language })),
      setRole: (role) => setPrefs((prev) => ({ ...prev, role })),
      completeOnboarding: () => setPrefs((prev) => ({ ...prev, onboardingDone: true })),
      resetOnboarding: () => {
        clearPrefs()
        setPrefs(defaultPrefs)
      },
    }),
    [prefs],
  )

  if (!ready) return null

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
}

export function usePrefs() {
  const ctx = useContext(PrefsContext)
  if (!ctx) {
    throw new Error('usePrefs must be used inside PrefsProvider')
  }
  return ctx
}
