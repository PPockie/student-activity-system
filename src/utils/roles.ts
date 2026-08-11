import type { Role } from '../types/auth'

/** หน้าแรกของแต่ละ role — ใช้ตอน redirect หลัง login และตอนเข้าเส้นทางที่ไม่มีสิทธิ์ */
export const ROLE_HOME: Record<Role, string> = {
  admin: '/admin',
  teacher: '/teacher',
  student: '/student',
}

export const ROLE_LABEL: Record<Role, string> = {
  admin: 'ผู้ดูแลระบบ',
  teacher: 'อาจารย์ที่ปรึกษา',
  student: 'นักศึกษา',
}
