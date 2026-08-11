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

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to="/login" replace /> },
          { path: 'login', element: <Login /> },
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
          { index: true, element: <StudentHome /> },
          { path: 'activities', element: <StudentActivities /> },
          { path: 'check-in-out', element: <StudentScanCheckInOut /> },
          { path: 'history', element: <StudentHistory /> },
          { path: 'notifications', element: <StudentNotifications /> },
          { path: 'profile', element: <StudentProfile /> },
        ],
      },
      /* อยู่นอก StudentLayout — กล้องเต็มจอ ไม่มี header/แถบเมนูล่าง */
      { path: 'scan', element: <StudentScanFullscreen /> },
    ],
  },
  {
    path: 'teacher',
    element: <ProtectedRoute allow={['teacher', 'admin']} />,
    children: [
      {
        element: <TeacherLayout />,
        children: [
          { index: true, element: <TeacherDashboard /> },
          { path: 'approvals', element: <TeacherApprovals /> },
          { path: 'check-in-qr', element: <TeacherCheckInQr /> },
          { path: 'students', element: <TeacherStudents /> },
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
          { index: true, element: <AdminDashboard /> },
          { path: 'users', element: <AdminUsers /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
])

export default router
