import { useMemo, useState } from 'react'
import {
  Edit3,
  Save,
  Search,
  Trash2,
  UserPlus,
  X,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  createAdminMember,
  deleteAdminMember,
  getAdminMembers,
  updateAdminMember,
} from '../services/authService'
import { useAuth } from '../context/useAuth'

const emptyForm = {
  name: '',
  username: '',
  email: '',
  password: '',
  role: 'user',
  profilePic: '',
}

const roleOptions = [
  { label: 'Member', value: 'user' },
  { label: 'Admin', value: 'admin' },
]

function getErrorMessage(error, fallback) {
  return error.response?.data?.error || fallback
}

function AdminMemberManagementPage() {
  const { state } = useAuth()
  const [members, setMembers] = useState(() => getAdminMembers())
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const editingMember = useMemo(
    () => members.find((member) => member.id === editingId),
    [editingId, members],
  )

  const adminCount = members.filter((member) => member.role === 'admin').length
  const memberCount = members.filter((member) => member.role !== 'admin').length

  const filteredMembers = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    return members.filter((member) => {
      const matchesRole =
        roleFilter === 'all' ? true : member.role === roleFilter
      const matchesSearch = keyword
        ? [member.name, member.username, member.email].some((value) =>
            value.toLowerCase().includes(keyword),
          )
        : true

      return matchesRole && matchesSearch
    })
  }, [members, roleFilter, search])

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
    setApiError('')
  }

  const validate = () => {
    const next = {}

    if (!form.name.trim()) next.name = 'Name is required.'

    if (!form.username.trim()) {
      next.username = 'Username is required.'
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      next.username =
        'Username can only contain letters, numbers, and underscores.'
    }

    if (!form.email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.'
    }

    if (!editingMember && !form.password.trim()) {
      next.password = 'Password is required.'
    } else if (form.password && form.password.length < 6) {
      next.password = 'Password must be at least 6 characters.'
    }

    if (!['admin', 'user'].includes(form.role)) {
      next.role = 'Role is required.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setErrors({})
    setApiError('')
  }

  const refreshMembers = () => {
    setMembers(getAdminMembers())
  }

  const submitMember = (event) => {
    event.preventDefault()
    if (!validate()) return

    try {
      if (editingMember) {
        updateAdminMember(editingMember.id, form)
      } else {
        createAdminMember(form)
      }

      refreshMembers()
      resetForm()
    } catch (error) {
      setApiError(getErrorMessage(error, 'Unable to save member.'))
    }
  }

  const editMember = (member) => {
    setEditingId(member.id)
    setForm({
      name: member.name,
      username: member.username,
      email: member.email,
      password: '',
      role: member.role,
      profilePic: member.profilePic || '',
    })
    setErrors({})
    setApiError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const removeMember = (member) => {
    const confirmed = window.confirm(`Delete ${member.name}?`)
    if (!confirmed) return

    try {
      deleteAdminMember(member.id)
      refreshMembers()
      if (editingId === member.id) resetForm()
    } catch (error) {
      setApiError(getErrorMessage(error, 'Unable to delete member.'))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow bg-[#F7F7F5]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 lg:py-10">
          <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Admin panel
              </p>
              <h1 className="mt-1 text-3xl font-bold">Member management</h1>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center sm:w-[360px]">
              <div className="rounded-sm bg-background px-3 py-3">
                <p className="text-xl font-bold">{members.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="rounded-sm bg-background px-3 py-3">
                <p className="text-xl font-bold">{adminCount}</p>
                <p className="text-xs text-muted-foreground">Admins</p>
              </div>
              <div className="rounded-sm bg-background px-3 py-3">
                <p className="text-xl font-bold">{memberCount}</p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
            </div>
          </div>

          <section className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
            <form
              className="h-fit rounded-sm bg-background p-4 shadow-sm md:p-6"
              onSubmit={submitMember}
            >
              <div className="mb-6 flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                <h2 className="text-xl font-bold">
                  {editingMember ? 'Edit member' : 'Create member'}
                </h2>
              </div>

              {apiError && (
                <div className="mb-5 rounded-sm bg-red-500 p-3 text-sm font-medium text-white">
                  {apiError}
                </div>
              )}

              <div className="space-y-4">
                <label className="block space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Name
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) => updateForm('name', event.target.value)}
                    className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                    placeholder="Member name"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500">{errors.name}</span>
                  )}
                </label>

                <label className="block space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Username
                  </span>
                  <input
                    value={form.username}
                    onChange={(event) =>
                      updateForm('username', event.target.value)
                    }
                    className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                    placeholder="username"
                  />
                  {errors.username && (
                    <span className="text-xs text-red-500">
                      {errors.username}
                    </span>
                  )}
                </label>

                <label className="block space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Email
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateForm('email', event.target.value)
                    }
                    className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                    placeholder="member@example.com"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">{errors.email}</span>
                  )}
                </label>

                <label className="block space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Password
                  </span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) =>
                      updateForm('password', event.target.value)
                    }
                    className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                    placeholder={
                      editingMember
                        ? 'Leave blank to keep current password'
                        : 'Password'
                    }
                  />
                  {errors.password && (
                    <span className="text-xs text-red-500">
                      {errors.password}
                    </span>
                  )}
                </label>

                <label className="block space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Role
                  </span>
                  <select
                    value={form.role}
                    onChange={(event) => updateForm('role', event.target.value)}
                    className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                  >
                    {roleOptions.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <span className="text-xs text-red-500">{errors.role}</span>
                  )}
                </label>

                <label className="block space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Avatar URL
                  </span>
                  <input
                    value={form.profilePic}
                    onChange={(event) =>
                      updateForm('profilePic', event.target.value)
                    }
                    className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                    placeholder="https://..."
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-white hover:bg-muted-foreground"
                >
                  <Save className="h-4 w-4" />
                  {editingMember ? 'Save changes' : 'Create member'}
                </button>
                {editingMember && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium underline"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <section className="rounded-sm bg-background p-4 shadow-sm md:p-6">
              <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <h2 className="text-xl font-bold">Members</h2>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      className="h-10 w-full rounded-sm border border-input bg-background px-3 pr-10 text-sm focus-visible:outline-none focus-visible:border-muted-foreground sm:w-72"
                      placeholder="Search members"
                    />
                  </div>
                  <select
                    value={roleFilter}
                    onChange={(event) => setRoleFilter(event.target.value)}
                    className="h-10 rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                  >
                    <option value="all">All roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">Member</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="py-3 pr-4 font-medium">Member</th>
                      <th className="py-3 pr-4 font-medium">Username</th>
                      <th className="py-3 pr-4 font-medium">Email</th>
                      <th className="py-3 pr-4 font-medium">Role</th>
                      <th className="py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => {
                      const isCurrentUser = member.id === state.user?.id

                      return (
                        <tr key={member.id} className="border-b border-border">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={member.profilePic}
                                alt={member.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-semibold">{member.name}</p>
                                {isCurrentUser && (
                                  <p className="text-xs text-muted-foreground">
                                    Current user
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 pr-4 text-muted-foreground">
                            {member.username}
                          </td>
                          <td className="py-4 pr-4 text-muted-foreground">
                            {member.email}
                          </td>
                          <td className="py-4 pr-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                member.role === 'admin'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-[#EFEEEB] text-muted-foreground'
                              }`}
                            >
                              {member.role === 'admin' ? 'admin' : 'member'}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => editMember(member)}
                                className="rounded-full p-2 hover:bg-[#EFEEEB]"
                                aria-label={`Edit ${member.name}`}
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeMember(member)}
                                disabled={isCurrentUser}
                                className="rounded-full p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:hover:bg-transparent"
                                aria-label={`Delete ${member.name}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {filteredMembers.length === 0 && (
                <p className="py-10 text-center text-muted-foreground">
                  No members match this filter.
                </p>
              )}
            </section>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AdminMemberManagementPage
