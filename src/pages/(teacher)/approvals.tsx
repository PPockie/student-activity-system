import { Button, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface ApprovalRow {
  key: number
  student: string
  studentId: string
  activity: string
  hours: number
  requestedAt: string
}

const DATA: ApprovalRow[] = [
  { key: 1, student: 'สมหญิง ใจดี', studentId: '6512345678', activity: 'จิตอาสาพัฒนาชุมชน', hours: 4, requestedAt: '10 ส.ค. 2569' },
  { key: 2, student: 'มานี มีนา', studentId: '6512345679', activity: 'อบรมการเงิน', hours: 3, requestedAt: '9 ส.ค. 2569' },
  { key: 3, student: 'ปิติ ชูใจ', studentId: '6512345680', activity: 'ปลูกป่าชายเลน', hours: 6, requestedAt: '8 ส.ค. 2569' },
]

const columns: ColumnsType<ApprovalRow> = [
  {
    title: 'นักศึกษา',
    dataIndex: 'student',
    render: (value: string, row) => (
      <div>
        <p className="text-sm font-medium">{value}</p>
        <p className="text-ink-500 text-xs">{row.studentId}</p>
      </div>
    ),
  },
  { title: 'กิจกรรม', dataIndex: 'activity', responsive: ['md'] },
  {
    title: 'ชั่วโมง',
    dataIndex: 'hours',
    width: 96,
    render: (value: number) => <Tag color="purple">{value} ชม.</Tag>,
  },
  { title: 'วันที่ขอ', dataIndex: 'requestedAt', responsive: ['lg'] },
  {
    title: 'จัดการ',
    key: 'actions',
    width: 160,
    render: () => (
      <div className="flex gap-2">
        <Button type="primary" size="small">
          อนุมัติ
        </Button>
        <Button danger size="small">
          ปฏิเสธ
        </Button>
      </div>
    ),
  },
]

function TeacherApprovals() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">อนุมัติกิจกรรม</h1>
        <Tag color="warning" className="m-0!">
          รอดำเนินการ {DATA.length} รายการ
        </Tag>
      </div>

      <div className="border-ink-100 overflow-hidden rounded-2xl border bg-white">
        <Table<ApprovalRow> columns={columns} dataSource={DATA} pagination={false} scroll={{ x: 'max-content' }} />
      </div>
    </div>
  )
}

export default TeacherApprovals
