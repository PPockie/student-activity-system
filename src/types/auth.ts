export type Role = 'admin' | 'teacher' | 'student'

export interface AuthUser {
  id: string
  name: string
  email: string
  /** มีเฉพาะ role student */
  studentId?: string
  role: Role
  /** ตัวอักษรย่อสำหรับ Avatar */
  initial: string
}

export interface AuthSession {
  user: AuthUser
  token: string
  /** true = เก็บใน localStorage (ค้างข้ามการปิดเบราว์เซอร์), false = sessionStorage */
  remember: boolean
}
