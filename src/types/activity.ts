import type { ParticipationStatus } from '../utils/participation-status'

/** แท็บที่ใช้แยกกิจกรรมในหน้ารายการ */
export type ActivityTab = 'เปิดรับสมัคร' | 'ของฉัน'

/** ข้อมูลเท่าที่การ์ดในหน้ารายการต้องใช้ */
export interface ActivitySummary {
  id: number
  title: string
  category: string
  /** วันเริ่ม (จัดรูปแบบมาแล้ว) เช่น "ศ. 15 ส.ค." */
  date: string
  /** วันสิ้นสุด — ใส่เฉพาะกิจกรรมหลายวัน */
  endDate?: string
  time?: string
  endTime?: string
  location: string
  hours: number
  joined: number
  capacity: number
  tab: ActivityTab
}

/** ข้อมูลเต็มของกิจกรรม — ใช้ในป๊อปอัพรายละเอียด */
export interface ActivityDetail extends ActivitySummary {
  description: string
  /** ภาพปก — ไม่มีจะแสดงกล่อง placeholder แทน */
  coverUrl?: string
  /** จำนวนคนในคิวสำรอง — มีความหมายเฉพาะกิจกรรมที่ `allowOverflow` */
  waitlistCount?: number
  organizer: string
  contact?: string
  /** ลงทะเบียนเกินจำนวนที่นั่งได้หรือไม่ (ต้องกด acknowledge ก่อน) */
  allowOverflow: boolean
  /** ชั่วโมงสูงสุดที่นับให้ต่อรอบกิจกรรม */
  maxHours: number
  requirements?: string[]
  /** สถานะการเข้าร่วมของผู้ใช้ปัจจุบัน — ไม่มี = ยังไม่ได้ลงทะเบียน */
  participationStatus?: ParticipationStatus
}
