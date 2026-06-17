import { Link, NavLink } from 'react-router-dom'
import {
  Bell,
  ExternalLink,
  FileText,
  Folder,
  KeyRound,
  LogOut,
  User,
  Users,
} from 'lucide-react'
import { useAuth } from '../context/useAuth'

const navItems = [
  {
    icon: FileText,
    label: 'Article management',
    path: '/admin/article-management',
  },
  { icon: Folder, label: 'Category management' },
  { icon: Users, label: 'Member management', path: '/admin/member-management' },
  { icon: User, label: 'Profile', path: '/admin/profile' },
  { icon: Bell, label: 'Notification' },
  { icon: KeyRound, label: 'Reset password', path: '/admin/reset-password' },
]

function AdminLayout({ actions, children, title }) {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="flex w-[180px] shrink-0 flex-col bg-[#EFEEEB] max-md:hidden">
          <div className="px-8 pb-10 pt-14">
            <Link to="/" className="text-4xl font-medium leading-none">
              hh<span className="text-green-500">.</span>
            </Link>
            <p className="mt-4 text-lg font-medium text-[#FF9950]">
              Admin panel
            </p>
          </div>

          <nav className="flex-1">
            {navItems.map(({ icon: Icon, label, path }) =>
              path ? (
                <NavLink
                  key={label}
                  to={path}
                  className={({ isActive }) =>
                    `flex h-12 items-center gap-3 px-8 text-sm transition-colors ${
                      isActive
                        ? 'bg-[#DAD7D2] font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-[#E4E1DC] hover:text-foreground'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              ) : (
                <div
                  key={label}
                  className="flex h-12 items-center gap-3 px-8 text-sm text-muted-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
              ),
            )}
          </nav>

          <div className="border-t border-border py-3">
            <Link
              to="/"
              className="flex h-10 items-center gap-3 px-8 text-sm text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              hh. website
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex h-10 w-full items-center gap-3 px-8 text-sm text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex min-h-16 flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-12">
            <h1 className="text-2xl font-bold">{title}</h1>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </header>

          <div className="px-5 py-8 md:px-12">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
