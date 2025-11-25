import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from './common/Loading'

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return <Loading fullScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/products" replace />
  }

  return children
}

export default AdminRoute

