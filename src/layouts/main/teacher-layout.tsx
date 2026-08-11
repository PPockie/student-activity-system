import { useState } from 'react'
import { Avatar, Button, Drawer } from 'antd'
import { ClipboardCheck, LayoutDashboard, LogOut, Menu, QrCode, Users } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/ui/sidebar'
import type { NavItem } from '../../components/ui/nav-item'
import { useAuth } from '../../hook/auth-context'
import { ROLE_LABEL } from '../../utils/roles'

const NAV_ITEMS: NavItem[] = [
  { label: 'ภาพรวม', to: '/teacher', icon: LayoutDashboard, end: true },
  { label: 'อนุมัติกิจกรรม', to: '/teacher/approvals', icon: ClipboardCheck, badge: 5 },
  { label: 'QR เช็คอิน', to: '/teacher/check-in-qr', icon: QrCode },
  { label: 'นักศึกษาในที่ปรึกษา', to: '/teacher/students', icon: Users },
]

/**
 * Layout ของกลุ่ม (teacher) — เน้นงานบนจอกว้าง
 * md ขึ้นไป: sidebar ถาวรด้านซ้าย
 * mobile: ปุ่มแฮมเบอร์เกอร์เปิด Drawer
 */
function TeacherLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const sidebarFooter = (
    <Button type="text" block icon={<LogOut className="size-4.5" />} className="justify-start!" onClick={handleLogout}>
      ออกจากระบบ
    </Button>
  )

  return (
    <div className="bg-surface flex min-h-dvh">
      <div className="sticky top-0 z-20 hidden h-dvh md:block">
        <Sidebar items={NAV_ITEMS} subtitle={ROLE_LABEL.teacher} footer={sidebarFooter} />
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
        size={256}
        closable={false}
        styles={{ body: { padding: 0 } }}
      >
        <div onClick={() => setDrawerOpen(false)} className="h-full">
          <Sidebar
            items={NAV_ITEMS}
            subtitle={ROLE_LABEL.teacher}
            footer={sidebarFooter}
            className="w-full border-r-0"
          />
        </div>
      </Drawer>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-ink-100 sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-white/90 px-4 backdrop-blur md:px-8">
          <button
            type="button"
            aria-label="เปิดเมนู"
            onClick={() => setDrawerOpen(true)}
            className="text-ink-700 -ml-1 p-1 md:hidden"
          >
            <Menu className="size-6" strokeWidth={1.75} />
          </button>

          <p className="flex-1 truncate font-semibold">แผงควบคุมอาจารย์</p>

          <div className="flex items-center gap-2">
            <span className="text-ink-600 hidden text-sm sm:inline">{user?.name}</span>
            <Avatar className="bg-accent-100! text-accent-700!">{user?.initial}</Avatar>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default TeacherLayout
