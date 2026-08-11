import { createBrowserRouter, Navigate } from 'react-router-dom'
import AdminLayout from '../layouts//main/admin-layout'
import AuthLayout from '../layouts/main/auth-layout'
import StudentLayout from '../layouts/main/student-layout'
import TeacherLayout from '../layouts/main/teacher-layout'
import Login from '../pages/(auth)/login'
import AdminDashboard from '../pages/(admin)/dashboard'
import AdminUsers from '../pages/(admin)/users'
import StudentHome from '../pages/(student)/home'
import StudentActivities from '../pages/(student)/activities'
import StudentHistory from '../pages/(student)/history'
import StudentNotifications from '../pages/(student)/notifications'
import StudentScanCheckInOut from '../pages/(student)/scan-check-in-out'
import StudentScanFullscreen from '../pages/(student)/scan-fullscreen'
import StudentProfile from '../pages/(student)/profile'
import TeacherDashboard from '../pages/(teacher)/dashboard'
import TeacherApprovals from '../pages/(teacher)/approvals'
import TeacherCheckInQr from '../pages/(teacher)/check-in-qr'
import TeacherStudents from '../pages/(teacher)/students'
import GuestRoute from './guest-route'
import ProtectedRoute from './protected-route'
import RootLayout from './root-layout'

/**
 * title ของแท็บเบราว์เซอร์กำหนดที่ `handle.title` ของแต่ละ route
 * RootLayout เป็นคนอ่านไปตั้ง document.title ให้เอง
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { index: true, element: <Navigate to="/login" replace /> },
              { path: 'login', element: <Login />, handle: { title: 'เข้าสู่ระบบ' } },
            ],
          },
        ],
      },
      {
        path: 'student',
        element: <ProtectedRoute allow={['student']} />,
        children: [
          {
            element: <StudentLayout />,
            children: [
              { index: true, element: <StudentHome />, handle: { title: 'หน้าหลัก' } },
              {
                path: 'activities',
                element: <StudentActivities />,
                handle: { title: 'กิจกรรม' },
              },
              {
                path: 'check-in-out',
                element: <StudentScanCheckInOut />,
                handle: { title: 'เช็คอิน / เช็คเอาท์' },
              },
              {
                path: 'history',
                element: <StudentHistory />,
                handle: { title: 'ประวัติกิจกรรม' },
              },
              {
                path: 'notifications',
                element: <StudentNotifications />,
                handle: { title: 'การแจ้งเตือน' },
              },
              { path: 'profile', element: <StudentProfile />, handle: { title: 'โปรไฟล์' } },
            ],
          },
          /* อยู่นอก StudentLayout — กล้องเต็มจอ ไม่มี header/แถบเมนูล่าง */
          {
            path: 'scan',
            element: <StudentScanFullscreen />,
            handle: { title: 'สแกน QR' },
          },
        ],
      },
      {
        path: 'teacher',
        element: <ProtectedRoute allow={['teacher', 'admin']} />,
        children: [
          {
            element: <TeacherLayout />,
            children: [
              { index: true, element: <TeacherDashboard />, handle: { title: 'ภาพรวม' } },
              {
                path: 'approvals',
                element: <TeacherApprovals />,
                handle: { title: 'อนุมัติกิจกรรม' },
              },
              {
                path: 'check-in-qr',
                element: <TeacherCheckInQr />,
                handle: { title: 'QR เช็คอิน' },
              },
              {
                path: 'students',
                element: <TeacherStudents />,
                handle: { title: 'นักศึกษาในที่ปรึกษา' },
              },
            ],
          },
        ],
      },
      {
        path: 'admin',
        element: <ProtectedRoute allow={['admin']} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboard />, handle: { title: 'ภาพรวมระบบ' } },
              { path: 'users', element: <AdminUsers />, handle: { title: 'จัดการผู้ใช้' } },
            ],
          },
        ],
      },
      { path: '*', element: <Navigate to="/login" replace /> },
    ],
  },
])

export default router
