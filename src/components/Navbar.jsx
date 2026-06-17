import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  KeyRound,
  X,
} from 'lucide-react'
import { useAuth } from '../context/useAuth'

function Navbar() {
  const navigate = useNavigate()
  const { isAuthenticated, state, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    setDropdownOpen(false)
    setMobileMenuOpen(false)
    logout()
  }

  const profilePath =
    state.user?.role === 'admin' ? '/admin/profile' : '/profile'
  const resetPasswordPath =
    state.user?.role === 'admin' ? '/admin/reset-password' : '/reset-password'

  return (
    <nav className="relative flex items-center justify-between py-4 px-4 md:px-8 bg-background border-b border-muted">
      <Link to="/" className="text-2xl font-bold">
        Thomson P<span className="text-green-400">.</span>
      </Link>

      {state.getUserLoading ? (
        <div className="hidden sm:flex items-center">
          <div className="h-12 w-12 rounded-full bg-[#EFEEEB] animate-pulse" />
          <div className="ml-3 h-6 w-32 bg-[#EFEEEB] animate-pulse rounded" />
        </div>
      ) : isAuthenticated ? (
        <div className="hidden sm:flex items-center space-x-4" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex items-center space-x-2 rounded-md text-sm font-medium text-foreground hover:text-muted-foreground focus:outline-none"
          >
            <img
              src={state.user.profilePic}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
            <span>{state.user.name}</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-4 md:right-8 top-16 w-56 bg-background rounded-sm shadow-sm border border-muted p-1 z-50">
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false)
                  navigate(profilePath)
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false)
                  navigate(resetPasswordPath)
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
              >
                <KeyRound className="mr-2 h-4 w-4" />
                Reset password
              </button>
              {state.user.role === 'admin' && (
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false)
                    navigate('/admin/article-management')
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Admin panel
                </button>
              )}
              <div className="border-t border-muted m-1" />
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden sm:flex space-x-4">
          <Link
            to="/login"
            className="px-8 py-2 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/sign-up"
            className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
          >
            Sign up
          </Link>
        </div>
      )}

      <button
        type="button"
        className="sm:hidden focus:outline-none"
        onClick={() => setMobileMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-screen bg-background border-b border-muted flex flex-col gap-6 py-6 px-6 z-50">
          {state.getUserLoading ? (
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-[#EFEEEB] animate-pulse" />
              <div className="ml-3 h-6 w-32 bg-[#EFEEEB] animate-pulse rounded" />
            </div>
          ) : isAuthenticated ? (
            <div className="space-y-2">
              <div className="flex items-center py-2">
                <img
                  src={state.user.profilePic}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <span className="ml-3 text-base font-medium text-foreground">
                  {state.user.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  navigate(profilePath)
                }}
                className="flex items-center w-full px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground rounded-sm"
              >
                <User className="mr-4 h-5 w-5" />
                Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  navigate(resetPasswordPath)
                }}
                className="flex items-center w-full px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground rounded-sm"
              >
                <KeyRound className="mr-4 h-5 w-5" />
                Reset password
              </button>
              {state.user.role === 'admin' && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    navigate('/admin/article-management')
                  }}
                  className="flex items-center w-full px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground rounded-sm"
                >
                  <LayoutDashboard className="mr-4 h-5 w-5" />
                  Admin panel
                </button>
              )}
              <div className="border-t border-muted" />
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground rounded-sm"
              >
                <LogOut className="mr-4 h-5 w-5" />
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-8 py-4 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="px-8 py-4 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
