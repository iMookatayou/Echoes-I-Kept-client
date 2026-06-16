import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [state, setState] = useState({
    user: null,
    loading: false,
    error: null,
    getUserLoading: true,
  })

  const fetchUser = useCallback(async () => {
    if (!authService.getStoredToken()) {
      setState((prev) => ({ ...prev, user: null, getUserLoading: false }))
      return
    }

    try {
      setState((prev) => ({ ...prev, getUserLoading: true }))
      const user = await authService.getUser()
      setState((prev) => ({ ...prev, user, getUserLoading: false, error: null }))
    } catch {
      authService.logout()
      setState((prev) => ({
        ...prev,
        user: null,
        getUserLoading: false,
        error: null,
      }))
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const login = async (credentials) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      await authService.login(credentials)
      setState((prev) => ({ ...prev, loading: false, error: null }))
      await fetchUser()
      return null
    } catch (err) {
      const message =
        err.response?.data?.error || 'Login failed'
      setState((prev) => ({ ...prev, loading: false, error: message }))
      return { error: message }
    }
  }

  const signup = async (data) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      await authService.signup(data)
      setState((prev) => ({ ...prev, loading: false, error: null }))
      await fetchUser()
      return null
    } catch (err) {
      const message =
        err.response?.data?.error || 'Sign up failed'
      setState((prev) => ({ ...prev, loading: false, error: message }))
      return { error: message }
    }
  }

  const logout = () => {
    authService.logout()
    setState({ user: null, loading: false, error: null, getUserLoading: false })
    navigate('/')
  }

  const isAuthenticated = !!state.user

  return (
    <AuthContext.Provider
      value={{ state, login, signup, logout, fetchUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
