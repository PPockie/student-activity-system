import type { AuthSession, AuthUser, Role } from '../types/auth'
import type { LoginPayload } from '../utils/schemas/auth'

export interface MockAccount extends AuthUser {
  password: string
}

/**
 * บัญชีจำลองสำหรับพัฒนา UI — ลบทิ้งเมื่อต่อ API จริง
 * รหัสผ่านทุกบัญชี: password
 */
export const MOCK_ACCOUNTS: MockAccount[] = [
  {
    id: 'usr_admin_01',
    name: 'ผู้ดูแลระบบ กยศ.',
    email: 'admin@demo.ac.th',
    role: 'admin',
    initial: 'A',
    password: 'password',
  },
  {
    id: 'usr_teacher_01',
    name: 'อ.สมชาย รักเรียน',
    email: 'teacher@demo.ac.th',
    role: 'teacher',
    initial: 'ส',
    password: 'password',
  },
  {
    id: 'usr_student_01',
    name: 'นางสาวสมหญิง ใจดี',
    email: 'student@demo.ac.th',
    studentId: '6512345678',
    role: 'student',
    initial: 'ส',
    password: 'password',
  },
]

/** บัญชีตัวอย่างสำหรับแสดงบนหน้า login ตอน dev */
export const DEMO_CREDENTIALS: { role: Role; identifier: string; password: string }[] = MOCK_ACCOUNTS.map(
  (account) => ({
    role: account.role,
    identifier: account.studentId ?? account.email,
    password: account.password,
  }),
)

export class InvalidCredentialsError extends Error {
  constructor() {
    super('อีเมล/รหัสนักศึกษา หรือรหัสผ่านไม่ถูกต้อง')
    this.name = 'InvalidCredentialsError'
  }
}

/** จำลองการเรียก API login — แทนที่ด้วย POST /auth/login เมื่อ backend พร้อม */
export async function mockLogin(payload: LoginPayload): Promise<AuthSession> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const account = MOCK_ACCOUNTS.find((item) =>
    payload.email ? item.email.toLowerCase() === payload.email : item.studentId === payload.studentId,
  )

  if (!account || account.password !== payload.password) {
    throw new InvalidCredentialsError()
  }

  const { password: _password, ...user } = account
  return {
    user,
    token: `mock.${account.id}.${Date.now()}`,
    remember: payload.remember,
  }
}
