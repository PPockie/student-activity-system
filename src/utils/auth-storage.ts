import type { AuthSession } from '../types/auth'

export const AUTH_STORAGE_KEY = 'activity-system.auth'

export function saveSession(session: AuthSession): void {
  const target = session.remember ? window.localStorage : window.sessionStorage
  const other = session.remember ? window.sessionStorage : window.localStorage

  other.removeItem(AUTH_STORAGE_KEY)
  target.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

export function getSession(): AuthSession | null {
  for (const storage of [window.localStorage, window.sessionStorage]) {
    const raw = storage.getItem(AUTH_STORAGE_KEY)
    if (!raw) continue

    try {
      const parsed = JSON.parse(raw) as AuthSession
      if (parsed?.user?.role && parsed.token) return parsed
    } catch {
      // ข้อมูลเสีย — ล้างทิ้งแล้วถือว่ายังไม่ได้ล็อกอิน
    }
    storage.removeItem(AUTH_STORAGE_KEY)
  }
  return null
}

export function clearSession(): void {
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
}
