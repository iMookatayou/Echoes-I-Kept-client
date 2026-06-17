import { Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../context/useAuth'

function GuestRoute({ children }) {
  const { isAuthenticated, state } = useAuth()

  if (state.getUserLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-foreground" />
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default GuestRoute
