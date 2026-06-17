import { Link, useLocation } from 'react-router-dom'
import { KeyRound, User } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import AdminLayout from './AdminLayout'
import { useAuth } from '../context/useAuth'

function AccountLayout({ activePage, children, title }) {
  const { state } = useAuth()
  const location = useLocation()
  const isAdminPath = location.pathname.startsWith('/admin/')
  const profilePath =
    state.user?.role === 'admin' ? '/admin/profile' : '/profile'
  const resetPasswordPath =
    state.user?.role === 'admin' ? '/admin/reset-password' : '/reset-password'

  const navItems = [
    { icon: User, label: 'Profile', path: profilePath, value: 'profile' },
    {
      icon: KeyRound,
      label: 'Reset password',
      path: resetPasswordPath,
      value: 'reset-password',
    },
  ]

  const accountContent = (
    <div className="mx-auto w-full max-w-[760px]">
      <div className="mb-6 flex items-center gap-3 md:ml-[150px]">
        <img
          src={state.user?.profilePic || '/author-image.jpeg'}
          alt={state.user?.name || 'Profile'}
          className="h-8 w-8 rounded-full object-cover"
        />
        <p className="text-sm font-medium">{state.user?.name || 'Member'}</p>
        <span className="h-4 w-px bg-border" aria-hidden="true" />
        <p className="text-sm font-bold">{title}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[120px_300px] md:items-start md:justify-center">
        <aside>
          <nav className="space-y-2">
            {navItems.map(({ icon: Icon, label, path, value }) => (
              <Link
                key={value}
                to={path}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  activePage === value
                    ? 'font-semibold text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-3 w-3" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <div>{children}</div>
      </div>
    </div>
  )

  if (isAdminPath) {
    return <AdminLayout title={title}>{accountContent}</AdminLayout>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow bg-background px-4 py-10 md:px-8 md:py-14">
        {accountContent}
      </main>

      <Footer />
    </div>
  )
}

export default AccountLayout
