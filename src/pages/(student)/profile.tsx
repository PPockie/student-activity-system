import { Avatar, Button, Tag } from 'antd'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hook/auth-context'
import StudentContentLayout from '../../layouts/student/content-layout'

function StudentProfile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const info = [
    { label: 'รหัสนักศึกษา', value: user?.studentId ?? '-' },
    { label: 'อีเมล', value: user?.email ?? '-' },
    { label: 'คณะ / สาขา', value: 'วิทยาศาสตร์ / วิทยาการคอมพิวเตอร์' },
    { label: 'ชั้นปี', value: 'ปี 2' },
    { label: 'อาจารย์ที่ปรึกษา', value: 'อ.สมชาย รักเรียน' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <StudentContentLayout pageLabel="โปรไฟล์">
      <section className="border-ink-100 flex flex-col items-center rounded-2xl border bg-white p-6 text-center">
        <Avatar size={80} className="bg-primary-100! text-primary-700! text-2xl!">
          {user?.initial}
        </Avatar>
        <h1 className="mt-3 text-lg font-semibold">{user?.name}</h1>
        <Tag color="success" className="mt-2">
          อนุมัติแล้ว
        </Tag>
      </section>

      <section className="border-ink-100 divide-ink-100 divide-y rounded-2xl border bg-white">
        {info.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3.5">
            <span className="text-ink-500 shrink-0 text-sm">{row.label}</span>
            <span className="truncate text-sm font-medium">{row.value}</span>
          </div>
        ))}
      </section>

      <Button
        color="danger"
        variant="solid"
        block
        size="large"
        icon={<LogOut className="size-4.5" />}
        onClick={handleLogout}
      >
        ออกจากระบบ
      </Button>
    </StudentContentLayout>
  )
}

export default StudentProfile
