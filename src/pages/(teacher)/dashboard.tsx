import { Progress, Tag } from 'antd'
import { CalendarCheck, ClipboardCheck, Clock, Users } from 'lucide-react'

const STATS = [
  { label: 'นักศึกษาในที่ปรึกษา', value: 42, icon: Users },
  { label: 'รออนุมัติ', value: 5, icon: ClipboardCheck },
  { label: 'กิจกรรมเดือนนี้', value: 8, icon: CalendarCheck },
  { label: 'ชั่วโมงรวม', value: 312, icon: Clock },
]

const RECENT = [
  { id: 1, name: 'สมหญิง ใจดี', activity: 'จิตอาสาพัฒนาชุมชน', hours: 4, status: 'pending' },
  { id: 2, name: 'สมชาย ขยันเรียน', activity: 'ปลูกป่าชายเลน', hours: 6, status: 'approved' },
  { id: 3, name: 'มานี มีนา', activity: 'อบรมการเงิน', hours: 3, status: 'cancel_requested' },
] as const

const STATUS_MAP = {
  pending: { color: 'warning', label: 'รออนุมัติ' },
  approved: { color: 'success', label: 'อนุมัติแล้ว' },
  cancel_requested: { color: 'error', label: 'ขอยกเลิก' },
} as const

function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">ภาพรวม</h1>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="border-ink-100 rounded-2xl border bg-white p-4">
            <div className="bg-primary-50 text-primary flex size-10 items-center justify-center rounded-xl">
              <Icon className="size-5" strokeWidth={1.75} />
            </div>
            <p className="mt-3 text-2xl font-semibold">{value}</p>
            <p className="text-ink-500 text-xs">{label}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="border-ink-100 rounded-2xl border bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold">รายการล่าสุด</h2>
          <ul className="divide-ink-100 divide-y">
            {RECENT.map((row) => {
              const status = STATUS_MAP[row.status]
              return (
                <li key={row.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{row.name}</p>
                    <p className="text-ink-500 truncate text-xs">
                      {row.activity} · {row.hours} ชม.
                    </p>
                  </div>
                  <Tag color={status.color} className="m-0! shrink-0">
                    {status.label}
                  </Tag>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="border-ink-100 rounded-2xl border bg-white p-5">
          <h2 className="mb-4 text-base font-semibold">ความคืบหน้าชั่วโมง</h2>
          <div className="space-y-4">
            {[
              { label: 'ครบ 36 ชม.', value: 18, total: 42 },
              { label: 'มากกว่า 18 ชม.', value: 31, total: 42 },
              { label: 'ยังไม่เริ่ม', value: 4, total: 42 },
            ].map((row) => (
              <div key={row.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-ink-600">{row.label}</span>
                  <span className="text-ink-500">
                    {row.value}/{row.total} คน
                  </span>
                </div>
                <Progress
                  percent={Math.round((row.value / row.total) * 100)}
                  showInfo={false}
                  strokeColor="#714BD5"
                  trailColor="#ECEAF2"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default TeacherDashboard
