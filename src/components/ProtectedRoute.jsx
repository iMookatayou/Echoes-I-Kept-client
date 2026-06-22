import { Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../context/useAuth'

function ProtectedRoute({ children }) {
  const { isAuthenticated, state } = useAuth()

  if (state.getUserLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-foreground" />
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
