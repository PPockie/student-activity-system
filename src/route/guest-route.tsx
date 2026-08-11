import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hook/auth-context'
import { ROLE_HOME } from '../utils/roles'

/** ตรงข้ามกับ ProtectedRoute — ล็อกอินแล้วไม่ต้องเห็นหน้า login อีก */
function GuestRoute() {
  const { user } = useAuth()

  if (user) return <Navigate to={ROLE_HOME[user.role]} replace />

  return <Outlet />
}

export default GuestRoute
