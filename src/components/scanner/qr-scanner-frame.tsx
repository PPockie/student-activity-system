export interface QrScannerFrameProps {
  /** true = โชว์เส้นกวาด (ตอนกล้องพร้อมแล้วเท่านั้น) */
  active?: boolean
  children?: React.ReactNode
  className?: string
}

const CORNERS = [
  'top-0 left-0 border-t-4 border-l-4 rounded-tl-2xl',
  'top-0 right-0 border-t-4 border-r-4 rounded-tr-2xl',
  'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-2xl',
  'bottom-0 right-0 border-b-4 border-r-4 rounded-br-2xl',
]

/**
 * กรอบเล็งสแกน QR แบบแอปจ่ายเงิน — พื้นรอบนอกมืด เจาะช่องกลางใส
 * ใช้ box-shadow ขนาดใหญ่แทนการวาง overlay 4 ชิ้น ช่องกลางจึงใสจริงและขอบมนตามกรอบ
 */
function QrScannerFrame({ active = false, children, className = '' }: QrScannerFrameProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="relative aspect-square w-[68%] max-w-72">
          {/* หน้ากากมืดรอบกรอบ */}
          <div className="absolute inset-0 rounded-3xl shadow-[0_0_0_9999px_rgb(0_0_0/0.55)]" />

          {/* มุมทั้งสี่ */}
          {CORNERS.map((corner) => (
            <span
              key={corner}
              className={`absolute size-10 border-white ${corner}`}
            />
          ))}

          {/* เส้นกวาด */}
          {active && (
            <span className="animate-scan-line absolute inset-x-3 top-0 h-0.5 rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
          )}
        </div>
      </div>

      {children && (
        <div className="pointer-events-auto absolute inset-x-0 bottom-0">{children}</div>
      )}
    </div>
  )
}

export default QrScannerFrame
