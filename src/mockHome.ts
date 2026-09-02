import type { SafetyStatus } from './types'

/**
 * Deterministic mock for Phase 1 Home only.
 * Later phases can replace this with live / API data.
 */
export const homeMock = {
  seaStatus: 'safe' as SafetyStatus,
  schemeCount: 2,
  familyCanSee: true,
  sharingReady: true,
}
