import { demoProfileKn } from './copy'
import type { Prefs } from './types'

const KEY = 'matsya-sathi-prefs'

export const defaultPrefs: Prefs = {
  language: 'kn',
  role: 'fisher',
  simpleMode: true,
  voiceEnabled: true,
  onboardingDone: false,
  profile: demoProfileKn,
}

export function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultPrefs
    const parsed = JSON.parse(raw) as Partial<Prefs>
    return {
      ...defaultPrefs,
      ...parsed,
      profile: { ...defaultPrefs.profile, ...parsed.profile },
    }
  } catch {
    return defaultPrefs
  }
}

export function savePrefs(prefs: Prefs) {
  localStorage.setItem(KEY, JSON.stringify(prefs))
}

export function clearPrefs() {
  localStorage.removeItem(KEY)
}
