import { useEffect, useMemo, useRef, useState } from 'react'
import { Bell, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import {
  getAdminNotifications,
  markAdminNotificationAsRead,
  markAllAdminNotificationsAsRead,
} from '../services/notificationService'

function formatNotificationDate(value) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function NotificationBell({ compact = false, onNavigate }) {
  const navigate = useNavigate()
  const { state } = useAuth()
  const containerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(() =>
    getAdminNotifications(),
  )
  const isAdmin = state.user?.role === 'admin'

  const unreadCount = useMemo(
    () =>
      notifications.filter((notification) => notification.status === 'unread')
        .length,
    [notifications],
  )

  const previewNotifications = notifications.slice(0, 4)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const openArticle = (notification) => {
    setNotifications(markAdminNotificationAsRead(notification.id))
    setOpen(false)
    onNavigate?.()
    navigate(`/post/${notification.articleId}`)
  }

  const markAllAsRead = () => {
    setNotifications(markAllAdminNotificationsAsRead())
  }

  if (compact) {
    if (!isAdmin) return null

    return (
      <button
        type="button"
        onClick={() => {
          onNavigate?.()
          navigate('/admin/notification')
        }}
        className="flex w-full items-center rounded-sm px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground"
      >
        <Bell className="mr-4 h-5 w-5" />
        Notification
        {unreadCount > 0 && (
          <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-muted text-foreground hover:bg-[#EFEEEB]"
        aria-label="Open notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-[360px] max-w-[calc(100vw-32px)] rounded-sm border border-muted bg-background p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold">Notification</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Mark all read
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-[#EFEEEB]"
                aria-label="Close notifications"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-[360px] space-y-1 overflow-y-auto">
            {previewNotifications.map((notification) => (
              <button
                type="button"
                key={notification.id}
                onClick={() => openArticle(notification)}
                className="flex w-full gap-3 rounded-sm px-2 py-2 text-left hover:bg-[#EFEEEB]"
              >
                <img
                  src={notification.actorAvatar}
                  alt={notification.actorName}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold leading-snug">
                    {notification.title}
                  </span>
                  <span className="mt-1 block truncate text-xs text-muted-foreground">
                    {notification.articleTitle}
                  </span>
                  <span className="mt-1 block text-[10px] text-[#FF9950]">
                    {formatNotificationDate(notification.createdAt)}
                  </span>
                </span>
                {notification.status === 'unread' && (
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                )}
              </button>
            ))}
          </div>

          {isAdmin && (
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                navigate('/admin/notification')
              }}
              className="mt-2 w-full rounded-sm py-2 text-xs font-semibold hover:bg-[#EFEEEB]"
            >
              View all notifications
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationBell
