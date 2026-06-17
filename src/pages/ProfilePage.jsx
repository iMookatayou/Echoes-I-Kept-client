import { useState } from 'react'
import { Save, X } from 'lucide-react'
import AccountLayout from '../components/AccountLayout'
import { useAuth } from '../context/useAuth'

function getProfileForm(user) {
  return {
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    profilePic: user?.profilePic || '',
  }
}

function ProfilePage() {
  const { state, updateProfile } = useAuth()
  const [form, setForm] = useState(() => getProfileForm(state.user))
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
    setMessage('')
  }

  const validate = () => {
    const next = {}

    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.username.trim()) {
      next.username = 'Username is required.'
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      next.username = 'Username can only contain letters, numbers, and underscores.'
    }

    if (!form.email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      updateField('profilePic', reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const result = await updateProfile({
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      profilePic: form.profilePic.trim(),
    })

    if (result?.error) {
      setErrors({ api: result.error })
      return
    }

    setMessage('Your profile has been successfully updated')
  }

  return (
    <AccountLayout activePage="profile" title="Profile">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-sm bg-[#EFEEEB] px-5 py-6"
      >
        <div className="mb-6 flex items-center gap-6 border-b border-border pb-6">
          <img
            src={form.profilePic || state.user?.profilePic}
            alt={form.name || 'Profile'}
            className="h-20 w-20 rounded-full object-cover"
          />
          <label className="inline-flex cursor-pointer rounded-full border border-foreground px-5 py-2 text-xs font-medium hover:border-muted-foreground hover:text-muted-foreground">
            Upload profile picture
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleProfilePictureChange}
              disabled={state.loading}
            />
          </label>
        </div>

        {errors.api && (
          <div className="mb-5 rounded-sm bg-red-500 p-3 text-sm text-white">
            {errors.api}
          </div>
        )}

        <div className="space-y-4">
          <label className="block space-y-1">
            <span className="text-xs font-medium text-muted-foreground">
              Name
            </span>
            <input
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              disabled={state.loading}
              className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
            />
            {errors.name && (
              <span className="text-xs text-red-500">{errors.name}</span>
            )}
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-medium text-muted-foreground">
              Username
            </span>
            <input
              value={form.username}
              onChange={(e) => updateField('username', e.target.value)}
              disabled={state.loading}
              className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
            />
            {errors.username && (
              <span className="text-xs text-red-500">{errors.username}</span>
            )}
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-medium text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              value={form.email}
              disabled
              className="h-10 w-full rounded-sm border border-transparent bg-[#F5F4F2] px-3 text-sm text-muted-foreground"
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </label>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={state.loading}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2 text-xs font-medium text-white hover:bg-muted-foreground disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </form>

      {message && (
        <div className="fixed bottom-8 right-8 z-50 flex w-[360px] max-w-[calc(100vw-32px)] items-start justify-between rounded-sm bg-green-500 px-5 py-4 text-white shadow-lg">
          <div>
            <p className="text-sm font-bold">Saved profile</p>
            <p className="mt-1 text-xs">{message}</p>
          </div>
          <button
            type="button"
            onClick={() => setMessage('')}
            className="rounded-full p-1 hover:bg-white/10"
            aria-label="Close saved profile message"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </AccountLayout>
  )
}

export default ProfilePage
