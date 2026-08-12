import { useNavigate } from 'react-router-dom'
import CardProfileHeader from '../../components/cards/card-profile-header'
import CardRequirementProgress from '../../components/cards/card-requirement-progress'
import MenuList from '../../components/ui/menu-list'
import { useAuth } from '../../hook/auth-context'
import StudentContentLayout from '../../layouts/student/content-layout'

const PROFILE = {
  faculty: 'วิทยาการคอมพิวเตอร์',
  year: 'ชั้นปีที่ 3',
  requiredHours: 36,
  doneHours: 28,
  advisor: 'อ.สมชาย รักเรียน',
  advisorOffice: 'ห้องให้คำปรึกษา 214',
}

function StudentProfile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <StudentContentLayout pageLabel="โปรไฟล์">
      <CardProfileHeader
        name={user?.name ?? '-'}
        initial={user?.initial}
        details={[
          [PROFILE.faculty, PROFILE.year],
          [user?.studentId, user?.email],
        ]}
      />

      <CardRequirementProgress
        title="ชั่วโมงสำหรับจบการศึกษา"
        done={PROFILE.doneHours}
        required={PROFILE.requiredHours}
        note={`อาจารย์ที่ปรึกษา: ${PROFILE.advisor} · ${PROFILE.advisorOffice}`}
      />

      <MenuList
        items={[
          // { key: 'transcript', label: 'ใบรับรองชั่วโมงกิจกรรม', to: '/student/history' },
          { key: 'advisor', label: 'ติดต่ออาจารย์ที่ปรึกษา', onClick: () => undefined },
          { key: 'privacy', label: 'ความเป็นส่วนตัวและข้อมูล', onClick: () => undefined },
          { key: 'help', label: 'ศูนย์ช่วยเหลือ', onClick: () => undefined },
        ]}
      />

      <MenuList
        items={[
          { key: 'logout', label: 'ออกจากระบบ', danger: true, onClick: handleLogout },
        ]}
      />
    </StudentContentLayout>
  )
}

export default StudentProfile
