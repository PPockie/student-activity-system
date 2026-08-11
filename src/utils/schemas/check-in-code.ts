import { z } from 'zod'

/** ขึ้นต้นด้วย prefix นี้เสมอ เพื่อแยกจาก QR อื่นที่ไม่ใช่ของระบบ */
export const CHECK_IN_CODE_PREFIX = 'ACT1:'

export const checkInCodePayloadSchema = z.object({
  /** ประเภท — มาจาก QR ฝั่งอาจารย์ ไม่ให้นักศึกษาเลือกเอง */
  t: z.enum(['check-in', 'check-out']),
  /** activity id */
  a: z.string().min(1),
  /** session id (รอบของกิจกรรม) */
  s: z.string().min(1),
  /** หมดอายุ — epoch วินาที */
  exp: z.number().int().positive(),
  /** ลายเซ็นจาก backend — ฝั่ง client ไม่ตรวจ ส่งต่อให้ server ตรวจ */
  sig: z.string().optional(),
})

export type CheckInCodePayload = z.infer<typeof checkInCodePayloadSchema>
export type CheckInCodeType = CheckInCodePayload['t']

export const CHECK_IN_TYPE_LABEL: Record<CheckInCodeType, string> = {
  'check-in': 'เช็คอิน',
  'check-out': 'เช็คเอาท์',
}

export type ParsedCheckInCode =
  | { ok: true; data: CheckInCodePayload }
  | { ok: false; reason: 'format' | 'schema' | 'expired'; message: string }

/** สร้างสตริงสำหรับใส่ใน QR (ฝั่งอาจารย์/หน้าจอกิจกรรม) */
export function buildCheckInCode(payload: CheckInCodePayload): string {
  return CHECK_IN_CODE_PREFIX + JSON.stringify(payload)
}

/** อ่านค่าที่สแกนได้ พร้อมตรวจโครงสร้างและวันหมดอายุ */
export function parseCheckInCode(raw: string, now: Date = new Date()): ParsedCheckInCode {
  const trimmed = raw.trim()

  if (!trimmed.startsWith(CHECK_IN_CODE_PREFIX)) {
    return { ok: false, reason: 'format', message: 'ไม่ใช่ QR ของระบบกิจกรรม' }
  }

  let json: unknown
  try {
    json = JSON.parse(trimmed.slice(CHECK_IN_CODE_PREFIX.length))
  } catch {
    return { ok: false, reason: 'schema', message: 'รูปแบบข้อมูลใน QR ไม่ถูกต้อง' }
  }

  const parsed = checkInCodePayloadSchema.safeParse(json)
  if (!parsed.success) {
    return { ok: false, reason: 'schema', message: 'ข้อมูลใน QR ไม่ครบหรือผิดรูปแบบ' }
  }

  if (parsed.data.exp * 1000 < now.getTime()) {
    return { ok: false, reason: 'expired', message: 'QR หมดอายุแล้ว กรุณาให้เจ้าหน้าที่สร้างใหม่' }
  }

  return { ok: true, data: parsed.data }
}

/** วินาทีที่เหลือก่อน QR หมดอายุ (0 = หมดแล้ว) */
export function secondsUntilExpiry(payload: CheckInCodePayload, now: Date = new Date()): number {
  return Math.max(0, Math.floor((payload.exp * 1000 - now.getTime()) / 1000))
}
