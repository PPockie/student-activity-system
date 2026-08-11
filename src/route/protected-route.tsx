import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hook/auth-context'
import type { Role } from '../types/auth'
import { ROLE_HOME } from '../utils/roles'

export interface ProtectedRouteProps {
  allow: Role[]
}

function ProtectedRoute({ allow }: ProtectedRouteProps) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />
  }

  if (!allow.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role]} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
