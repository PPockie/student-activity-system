import { useCallback, useEffect, useRef, useState } from 'react'

export type ScannerStatus =
  /** ยังไม่เริ่ม */
  | 'idle'
  /** กำลังขอสิทธิ์ / เปิดกล้อง */
  | 'starting'
  /** กล้องทำงานอยู่ */
  | 'scanning'
  /** ผู้ใช้ปฏิเสธสิทธิ์กล้อง */
  | 'denied'
  | 'error'

export interface UseQrScannerOptions {
  /** false = ปิดกล้องและหยุดสแกน */
  enabled: boolean
  /** เรียกเมื่ออ่าน QR ได้ (ยิงครั้งเดียวต่อการสแกนหนึ่งรอบ) */
  onResult: (value: string) => void
  /** ระยะห่างระหว่างรอบตรวจจับ (ms) */
  intervalMs?: number
}

export interface UseQrScannerResult {
  videoRef: React.RefObject<HTMLVideoElement | null>
  status: ScannerStatus
  errorMessage: string | null
  /** false = ถอดรหัสไม่ได้จริงๆ (ทั้งสองทางล้มเหลว) ต้องกรอกรหัสแทน */
  detectionSupported: boolean
  /** ตัวถอดรหัสที่ใช้อยู่ — ไว้ debug */
  decoder: 'barcode-detector' | 'zxing' | null
}

export function useQrScanner({
  enabled,
  onResult,
  intervalMs = 300,
}: UseQrScannerOptions): UseQrScannerResult {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [status, setStatus] = useState<ScannerStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [detectionSupported, setDetectionSupported] = useState(true)
  const [decoder, setDecoder] = useState<'barcode-detector' | 'zxing' | null>(null)

  const onResultRef = useRef(onResult)
  useEffect(() => {
    onResultRef.current = onResult
  }, [onResult])

  const handleError = useCallback((error: unknown) => {
    if (error instanceof DOMException) {
      if (error.name === 'NotAllowedError') {
        setStatus('denied')
        setErrorMessage('ไม่ได้รับสิทธิ์เข้าถึงกล้อง — กรุณาอนุญาตในตั้งค่าเบราว์เซอร์')
        return
      }
      if (error.name === 'NotFoundError' || error.name === 'OverconstrainedError') {
        setStatus('error')
        setErrorMessage('ไม่พบกล้องบนอุปกรณ์นี้')
        return
      }
      if (error.name === 'NotReadableError') {
        setStatus('error')
        setErrorMessage('กล้องถูกใช้งานโดยแอปอื่นอยู่ กรุณาปิดแล้วลองใหม่')
        return
      }
    }
    setStatus('error')
    setErrorMessage(
      error instanceof Error ? error.message : 'เปิดกล้องไม่สำเร็จ กรุณาลองใหม่',
    )
  }, [])

  useEffect(() => {
    if (!enabled) {
      setStatus('idle')
      return
    }

    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setStatus('error')
      setErrorMessage(
        'เบราว์เซอร์เปิดกล้องได้เฉพาะบน https หรือ localhost — ถ้าทดสอบผ่าน IP ในวง LAN ต้องเปิด https ก่อน',
      )
      return
    }

    const video = videoRef.current
    if (!video) return

    let stream: MediaStream | null = null
    let timer: number | undefined
    let zxingControls: { stop: () => void } | null = null
    let cancelled = false
    let hasResult = false

    const emit = (value: string) => {
      if (hasResult) return
      hasResult = true
      onResultRef.current(value)
    }

    // ไม่ระบุ formats = อ่านทุกชนิดที่เครื่องรองรับ (QR +  1D)
    const detector = window.BarcodeDetector ? new window.BarcodeDetector() : null

    const start = async () => {
      setStatus('starting')
      setErrorMessage(null)

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        })
        if (cancelled) return

        video.srcObject = stream
        await video.play()
        if (cancelled) return

        setStatus('scanning')

        if (detector) {
          setDecoder('barcode-detector')
          timer = window.setInterval(async () => {
            if (hasResult || video.readyState < 2) return

            try {
              const [barcode] = await detector.detect(video)
              if (barcode?.rawValue) emit(barcode.rawValue)
            } catch {
              // เฟรมเดียวอ่านไม่ได้ถือว่าปกติ — ปล่อยให้รอบถัดไปลองต่อ
            }
          }, intervalMs)
          return
        }

        // ไม่มี BarcodeDetector — โหลด zxing มาถอดรหัสแทน (โหลดเฉพาะตอนนี้)
        try {
          const { BrowserMultiFormatReader } = await import('@zxing/browser')
          if (cancelled) return

          const reader = new BrowserMultiFormatReader()
          zxingControls = await reader.decodeFromVideoElement(video, (result) => {
            if (result) emit(result.getText())
          })
          if (cancelled) zxingControls.stop()
          else setDecoder('zxing')
        } catch {
          setDetectionSupported(false)
          setErrorMessage('โหลดตัวถอดรหัสไม่สำเร็จ — กรอกรหัสด้วยตนเองแทน')
        }
      } catch (error) {
        if (!cancelled) handleError(error)
      }
    }

    void start()

    return () => {
      cancelled = true
      if (timer) window.clearInterval(timer)
      zxingControls?.stop()
      stream?.getTracks().forEach((track) => track.stop())
      video.srcObject = null
      setDecoder(null)
    }
  }, [enabled, intervalMs, handleError])

  return { videoRef, status, errorMessage, detectionSupported, decoder }
}

export default useQrScanner
