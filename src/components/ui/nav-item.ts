import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  /** true = active เฉพาะเมื่อ path ตรงเป๊ะ (ใช้กับหน้า index ของแต่ละกลุ่ม) */
  end?: boolean
  /** ตัวเลขแจ้งเตือนบนไอคอน */
  badge?: number
}
