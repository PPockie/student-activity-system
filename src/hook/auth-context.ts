import { createContext, useContext } from 'react'
import type { AuthUser } from '../types/auth'
import type { LoginInput } from '../utils/schemas/auth'

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  /** โยน error ถ้าล็อกอินไม่สำเร็จ — ให้หน้า login จับไปแสดง */
  login: (input: LoginInput) => Promise<AuthUser>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth ต้องอยู่ภายใน <AuthProvider>')
  return context
}
