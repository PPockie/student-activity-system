/** โลโก้ระบบ — ไฟล์อยู่ใน public/ จึงอ้างด้วย path ตรง ไม่ต้อง import ผ่าน bundler */
const LOGO_SRC = '/logo/logo-sm.svg'

export interface AppLogoProps {
  /** คลาสกำหนดขนาด เช่น "size-10" */
  className?: string
  /** โลโก้ประกอบข้อความที่อ่านออกอยู่แล้ว ให้ตั้งเป็น true เพื่อซ่อนจาก screen reader */
  decorative?: boolean
}

function AppLogo({ className = 'size-10', decorative = false }: AppLogoProps) {
  return (
    <img
      src={LOGO_SRC}
      alt={decorative ? '' : 'ระบบจัดการกิจกรรมนักศึกษา'}
      aria-hidden={decorative || undefined}
      draggable={false}
      className={`shrink-0 select-none ${className}`}
    />
  )
}

export default AppLogo
