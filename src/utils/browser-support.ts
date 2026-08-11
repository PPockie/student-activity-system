export type PermissionStatusName = 'granted' | 'denied' | 'prompt' | 'unknown'

export interface CameraSupport {
  /** https หรือ localhost เท่านั้นถึงจะเรียกกล้องได้ */
  secureContext: boolean
  /** มี navigator.mediaDevices.getUserMedia ให้เรียกไหม */
  mediaDevices: boolean
  /** ถอดรหัส QR ได้เองในตัวเบราว์เซอร์ไหม (Chrome Android / macOS / ChromeOS) */
  barcodeDetector: boolean
  /** จำนวนกล้องที่ระบบมองเห็น (0 = ไม่พบ, null = ถามไม่ได้) */
  videoInputs: number | null
  /** สถานะสิทธิ์กล้อง — Safari/Firefox บางรุ่นตอบ 'unknown' */
  permission: PermissionStatusName
  /** ใช้งานสแกนอัตโนมัติได้ครบทุกเงื่อนไขไหม */
  canScan: boolean
}

/** เช็คแบบ sync เท่าที่ทำได้ทันที — ใช้ตอน render ครั้งแรกได้ */
export function getCameraSupportSync() {
  const secureContext = typeof window !== 'undefined' && window.isSecureContext
  const mediaDevices =
    typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia)
  const barcodeDetector = typeof window !== 'undefined' && 'BarcodeDetector' in window

  return { secureContext, mediaDevices, barcodeDetector }
}

/**
 * เช็คครบทุกอย่างรวมถึงจำนวนกล้องและสถานะสิทธิ์
 * ไม่ขอสิทธิ์ให้ — แค่รายงานสถานะปัจจุบัน จึงเรียกได้โดยไม่มี popup เด้ง
 */
export async function getCameraSupport(): Promise<CameraSupport> {
  const { secureContext, mediaDevices, barcodeDetector } = getCameraSupportSync()

  let videoInputs: number | null = null
  if (navigator.mediaDevices?.enumerateDevices) {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      videoInputs = devices.filter((device) => device.kind === 'videoinput').length
    } catch {
      videoInputs = null
    }
  }

  let permission: PermissionStatusName = 'unknown'
  try {
    // 'camera' ยังไม่อยู่ใน type ของ PermissionName บนบางเบราว์เซอร์
    const result = await navigator.permissions?.query({
      name: 'camera' as PermissionName,
    })
    if (result) permission = result.state
  } catch {
    permission = 'unknown'
  }

  return {
    secureContext,
    mediaDevices,
    barcodeDetector,
    videoInputs,
    permission,
    // ไม่ต้องมี barcodeDetector ก็สแกนได้ เพราะมี zxing เป็นตัวสำรอง
    canScan: secureContext && mediaDevices && permission !== 'denied' && videoInputs !== 0,
  }
}

/** สรุปสาเหตุที่สแกนไม่ได้เป็นข้อความไทย — คืน [] ถ้าพร้อมใช้งาน */
export function describeCameraIssues(support: CameraSupport): string[] {
  const issues: string[] = []

  if (!support.secureContext) issues.push('ไม่ได้เปิดผ่าน https หรือ localhost')
  if (!support.mediaDevices) issues.push('เบราว์เซอร์ไม่มี getUserMedia')
  if (support.videoInputs === 0) issues.push('ไม่พบกล้องบนอุปกรณ์')
  if (support.permission === 'denied') issues.push('สิทธิ์กล้องถูกปฏิเสธไว้')

  return issues
}
