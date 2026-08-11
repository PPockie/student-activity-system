import { useCallback, useMemo, useState } from 'react'
import { mockLogin } from '../mocks/accounts'
import type { AuthUser } from '../types/auth'
import { clearSession, getSession, saveSession } from '../utils/auth-storage'
import { toLoginPayload, type LoginInput } from '../utils/schemas/auth'
import { AuthContext, type AuthContextValue } from './auth-context'

function AuthProvider({ children }: { children: React.ReactNode }) {
  // อ่าน session ที่ค้างอยู่ (localStorage หรือ sessionStorage) ตั้งแต่ครั้งแรกที่ render
  const [user, setUser] = useState<AuthUser | null>(() => getSession()?.user ?? null)

  const login = useCallback(async (input: LoginInput) => {
    // TODO: เปลี่ยนเป็น POST /auth/login เมื่อ backend พร้อม
    const session = await mockLogin(toLoginPayload(input))
    saveSession(session)
    setUser(session.user)
    return session.user
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}

export default AuthProvider
