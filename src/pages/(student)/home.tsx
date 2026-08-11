import { Tag } from 'antd'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import HoursSummaryCard from '../../components/ui/hours-summary-card'
import CardChartSummaryList from '../../components/cards/card-chart-summary'
import StudentContentLayout from '../../layouts/student/content-layout'

const HOURS_DONE = 24
const HOURS_REQUIRED = 36

const UPCOMING = [
  { id: 1, title: 'จิตอาสาพัฒนาชุมชน', date: '15 ส.ค. 2569', time: '08:00 - 12:00', place: 'ศาลาประชาคม', hours: 4, status: 'approved' },
  { id: 2, title: 'อบรมการเงินสำหรับนักศึกษา', date: '20 ส.ค. 2569', time: '13:00 - 16:00', place: 'ห้องประชุม A', hours: 3, status: 'pending' },
] as const

const STATS = [
  { label: 'ลงทะเบียน', value: 6 },
  { label: 'สำเร็จ', value: 2 },
  // { label: 'ยกเลิก', value: 1 },
]

function StudentHome() {
  return (
    <StudentContentLayout>
      <HoursSummaryCard
        done={HOURS_DONE}
        required={HOURS_REQUIRED}
        title="ชั่วโมงกิจกรรมปีการศึกษา 2569"
        detailsTo="/student/activities"
      />

      <section className="flex-1">
        <CardChartSummaryList stats={STATS} />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">กิจกรรมที่กำลังจะถึง</h2>
          <Link to="/student/activities" className="text-primary text-sm font-medium hover:underline">
            ดูทั้งหมด
          </Link>
        </div>

        <ul className="space-y-3">
          {UPCOMING.map((item) => (
            <li key={item.id} className="border-ink-100 rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <Tag color={item.status === 'approved' ? 'success' : 'warning'} className="m-0!">
                  {item.status === 'approved' ? 'อนุมัติแล้ว' : 'รออนุมัติ'}
                </Tag>
              </div>
              <dl className="text-ink-500 mt-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4" /> {item.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4" /> {item.time} ({item.hours} ชม.)
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4" /> {item.place}
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>
    </StudentContentLayout>
  )
}

export default StudentHome
