/**
 * Shared types for Phase 1.
 * We use union types (not enums) so the code stays simple for beginners.
 */

export type Language = 'kn' | 'en'
export type Role = 'fisher' | 'family'
export type SafetyStatus = 'safe' | 'caution' | 'emergency'
export type ShellTab = 'home' | 'schemes' | 'sea' | 'trip'

export type Profile = {
  displayName: string
  boatName: string
  village: string
}

export type Prefs = {
  language: Language
  role: Role
  simpleMode: boolean
  voiceEnabled: boolean
  onboardingDone: boolean
  profile: Profile
}

export type OnboardingStep =
  | 'splash'
  | 'language'
  | 'role'
  | 'simpleMode'
  | 'profile'
  | 'howItWorks'
