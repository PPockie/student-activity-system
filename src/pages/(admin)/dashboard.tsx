import { Tag } from 'antd'
import { CalendarCheck, GraduationCap, ShieldCheck, Users } from 'lucide-react'
import { MOCK_ACCOUNTS } from '../../mocks/accounts'
import { ROLE_LABEL } from '../../utils/roles'

const STATS = [
  { label: 'ผู้ใช้ทั้งหมด', value: 486, icon: Users },
  { label: 'นักศึกษา กยศ.', value: 412, icon: GraduationCap },
  { label: 'กิจกรรมที่เปิดอยู่', value: 12, icon: CalendarCheck },
  { label: 'รออนุมัติบัญชี', value: 7, icon: ShieldCheck },
]

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">ภาพรวมระบบ</h1>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="border-ink-100 rounded-2xl border bg-white p-4">
            <div className="bg-accent-50 text-accent-700 flex size-10 items-center justify-center rounded-xl">
              <Icon className="size-5" strokeWidth={1.75} />
            </div>
            <p className="mt-3 text-2xl font-semibold">{value}</p>
            <p className="text-ink-500 text-xs">{label}</p>
          </div>
        ))}
      </section>

      <section className="border-ink-100 rounded-2xl border bg-white p-5">
        <h2 className="mb-4 text-base font-semibold">บัญชีจำลองในระบบ (สำหรับทดสอบ)</h2>
        <ul className="divide-ink-100 divide-y">
          {MOCK_ACCOUNTS.map((account) => (
            <li key={account.id} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{account.name}</p>
                <p className="text-ink-500 truncate text-xs">{account.studentId ?? account.email}</p>
              </div>
              <Tag color="purple" className="m-0! shrink-0">
                {ROLE_LABEL[account.role]}
              </Tag>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default AdminDashboard
