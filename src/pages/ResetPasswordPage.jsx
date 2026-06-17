import { useState } from 'react'
import { Save, X } from 'lucide-react'
import AccountLayout from '../components/AccountLayout'
import { useAuth } from '../context/useAuth'

function ResetPasswordPage() {
  const { state, resetPassword } = useAuth()
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
    setMessage('')
  }

  const validate = () => {
    const next = {}

    if (!form.currentPassword) {
      next.currentPassword = 'Current password is required.'
    }

    if (!form.newPassword) {
      next.newPassword = 'New password is required.'
    } else if (form.newPassword.length < 6) {
      next.newPassword = 'New password must be at least 6 characters.'
    }

    if (!form.confirmPassword) {
      next.confirmPassword = 'Please confirm your new password.'
    } else if (form.newPassword !== form.confirmPassword) {
      next.confirmPassword = 'Passwords do not match.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setConfirmOpen(true)
  }

  const confirmResetPassword = async () => {
    const result = await resetPassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    })

    if (result?.error) {
      setErrors({ api: result.error })
      return
    }

    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setConfirmOpen(false)
    setMessage('Password updated successfully.')
  }

  return (
    <AccountLayout activePage="reset-password" title="Reset password">
      <form
        onSubmit={handleSubmit}
        className="h-fit w-full rounded-sm bg-[#EFEEEB] px-5 py-6"
      >
        {errors.api && (
          <div className="mb-5 rounded-sm bg-red-500 p-3 text-sm text-white">
            {errors.api}
          </div>
        )}
        {message && (
          <div className="mb-5 rounded-sm bg-green-500 p-3 text-sm font-medium text-white">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <label className="block space-y-1">
            <span className="text-xs font-medium text-muted-foreground">
              Current password
            </span>
            <input
              type="password"
              value={form.currentPassword}
              onChange={(e) => updateField('currentPassword', e.target.value)}
              disabled={state.loading}
              className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
            />
            {errors.currentPassword && (
              <span className="text-xs text-red-500">
                {errors.currentPassword}
              </span>
            )}
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-medium text-muted-foreground">
              New password
            </span>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) => updateField('newPassword', e.target.value)}
              disabled={state.loading}
              className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
            />
            {errors.newPassword && (
              <span className="text-xs text-red-500">
                {errors.newPassword}
              </span>
            )}
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-medium text-muted-foreground">
              Confirm new password
            </span>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              disabled={state.loading}
              className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword}
              </span>
            )}
          </label>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={state.loading}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2 text-xs font-medium text-white hover:bg-muted-foreground disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            Reset password
          </button>
        </div>
      </form>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xs rounded-sm bg-background px-6 py-7 text-center shadow-lg">
            <div className="mb-5 flex justify-end">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-full p-1 hover:bg-[#EFEEEB]"
                aria-label="Close reset password dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-lg font-bold">Reset password</h2>
            <p className="mt-3 text-xs text-muted-foreground">
              Do you want to reset your password?
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-full border border-foreground px-5 py-2 text-xs font-medium hover:border-muted-foreground hover:text-muted-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmResetPassword}
                disabled={state.loading}
                className="rounded-full bg-foreground px-5 py-2 text-xs font-medium text-white hover:bg-muted-foreground disabled:opacity-60"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  )
}

export default ResetPasswordPage
