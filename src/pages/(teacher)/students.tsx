import { useState } from 'react'
import { Avatar, Input, Progress, Tag } from 'antd'
import { Search } from 'lucide-react'

const STUDENTS = [
  { id: '6512345678', name: 'สมหญิง ใจดี', year: 2, hours: 24, status: 'approved' },
  { id: '6512345679', name: 'มานี มีนา', year: 2, hours: 36, status: 'approved' },
  { id: '6512345680', name: 'ปิติ ชูใจ', year: 1, hours: 6, status: 'pending' },
] as const

const REQUIRED_HOURS = 36

function TeacherStudents() {
  const [keyword, setKeyword] = useState('')
  const list = STUDENTS.filter(
    (student) => student.name.includes(keyword.trim()) || student.id.includes(keyword.trim()),
  )

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">นักศึกษาในที่ปรึกษา</h1>

      <Input
        size="large"
        allowClear
        prefix={<Search className="text-ink-400 size-4.5" />}
        placeholder="ค้นหาชื่อ หรือรหัสนักศึกษา"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        className="max-w-md"
      />

      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {list.map((student) => (
          <li key={student.id} className="border-ink-100 rounded-2xl border bg-white p-4">
            <div className="flex items-center gap-3">
              <Avatar className="bg-primary-100! text-primary-700!">{student.name.charAt(0)}</Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{student.name}</p>
                <p className="text-ink-500 text-xs">
                  {student.id} · ปี {student.year}
                </p>
              </div>
              <Tag color={student.status === 'approved' ? 'success' : 'warning'} className="m-0!">
                {student.status === 'approved' ? 'อนุมัติ' : 'รออนุมัติ'}
              </Tag>
            </div>

            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-ink-500">ชั่วโมงสะสม</span>
                <span className="text-ink-700 font-medium">
                  {student.hours}/{REQUIRED_HOURS} ชม.
                </span>
              </div>
              <Progress
                percent={Math.round((student.hours / REQUIRED_HOURS) * 100)}
                showInfo={false}
                strokeColor={student.hours >= REQUIRED_HOURS ? '#16A34A' : '#714BD5'}
                trailColor="#ECEAF2"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TeacherStudents
