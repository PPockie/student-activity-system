import { z } from 'zod'
const STUDENT_ID_PATTERN = /^\d{8,13}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const isStudentId = (value: string) => STUDENT_ID_PATTERN.test(value)
export const isEmail = (value: string) => EMAIL_PATTERN.test(value)

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'กรุณากรอกอีเมลหรือรหัสนักศึกษา')
    .refine(
      (value) => isEmail(value) || isStudentId(value),
      'รูปแบบไม่ถูกต้อง — กรอกอีเมล หรือรหัสนักศึกษา 8-13 หลัก',
    ),
  password: z
    .string()
    .min(1, 'กรุณากรอกรหัสผ่าน')
    .min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  remember: z.boolean(),
})

export type LoginInput = z.infer<typeof loginSchema>

/** payload ที่ส่งให้ backend — แยก field ตามชนิดของ identifier */
export type LoginPayload = {
  email?: string
  studentId?: string
  password: string
  remember: boolean
}

export const toLoginPayload = ({ identifier, password, remember }: LoginInput): LoginPayload => ({
  ...(isEmail(identifier) ? { email: identifier.toLowerCase() } : { studentId: identifier }),
  password,
  remember,
})
