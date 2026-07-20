import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

function AuthRequiredDialog({
  eyebrow = 'Listening journal',
  title = 'Sign in to leave a reaction.',
  description = 'Likes and comments are saved with your profile, so your notes stay connected to the songs you keep.',
  confirmLabel = 'Log in',
  cancelLabel = 'Keep reading',
  confirmTo = '/login',
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-required-dialog-title"
        className="relative flex min-h-[300px] w-full max-w-[500px] flex-col items-center justify-center rounded-[6px] border border-[#D9D8D4] bg-background px-6 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:px-11"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-[4px] p-1 text-muted-foreground transition-colors hover:bg-[#EFEEEB] hover:text-foreground"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#7A746E]">
          {eyebrow}
        </p>
        <h2
          id="auth-required-dialog-title"
          className="font-display text-3xl font-medium leading-tight text-foreground sm:text-[2rem]"
        >
          {title}
        </h2>
        <p className="mt-5 max-w-sm text-base leading-7 text-muted-foreground">
          {description}
        </p>

        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12 min-w-[136px] items-center justify-center rounded-[4px] border border-[#D9D8D4] px-5 text-sm font-medium text-foreground transition-colors hover:bg-[#EFEEEB]"
          >
            {cancelLabel}
          </button>
          <Link
            to={confirmTo}
            className="inline-flex h-12 min-w-[136px] items-center justify-center rounded-[4px] bg-foreground px-5 text-sm font-medium text-white transition-colors hover:bg-foreground/80"
          >
            {confirmLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthRequiredDialog
