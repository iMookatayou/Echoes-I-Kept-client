import { useMemo, useState } from 'react'
import { Check, Search, Trash2, X } from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import {
  deleteAdminNotification,
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

function getTypeLabel(type) {
  return type === 'article' ? 'Article' : 'Comment'
}

function AdminNotificationPage() {
  const [notifications, setNotifications] = useState(() =>
    getAdminNotifications(),
  )
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('unread')
  const [typeFilter, setTypeFilter] = useState('all')
  const [toast, setToast] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const unreadCount = notifications.filter(
    (notification) => notification.status === 'unread',
  ).length
  const readCount = notifications.length - unreadCount

  const filteredNotifications = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    return notifications.filter((notification) => {
      const matchesStatus =
        statusFilter === 'all' ? true : notification.status === statusFilter
      const matchesType =
        typeFilter === 'all' ? true : notification.type === typeFilter
      const matchesSearch = keyword
        ? [
            notification.actorName,
            notification.title,
            notification.message,
            notification.articleTitle,
          ].some((value) => value.toLowerCase().includes(keyword))
        : true

      return matchesStatus && matchesType && matchesSearch
    })
  }, [notifications, search, statusFilter, typeFilter])

  const refresh = (nextNotifications) => {
    setNotifications(nextNotifications)
  }

  const markAsRead = (notification) => {
    refresh(markAdminNotificationAsRead(notification.id))
    setToast({
      title: 'Notification updated',
      message: 'Notification has been marked as read',
    })
  }

  const markAllAsRead = () => {
    refresh(markAllAdminNotificationsAsRead())
    setToast({
      title: 'Notifications updated',
      message: 'All notifications have been marked as read',
    })
  }

  const confirmDelete = () => {
    if (!deleteTarget) return

    refresh(deleteAdminNotification(deleteTarget.id))
    setDeleteTarget(null)
    setToast({
      title: 'Notification deleted',
      message: 'Notification has been deleted',
    })
  }

  return (
    <AdminLayout
      title="Notification"
      actions={
        <button
          type="button"
          onClick={markAllAsRead}
          className="rounded-full bg-foreground px-8 py-2 text-sm font-medium text-white hover:bg-muted-foreground disabled:cursor-not-allowed disabled:bg-muted-foreground"
          disabled={unreadCount === 0}
        >
          Mark all read
        </button>
      }
    >
      <div className="mb-5 grid gap-3 sm:grid-cols-3 lg:w-[520px]">
        <SummaryStat label="Total" value={notifications.length} />
        <SummaryStat label="Unread" value={unreadCount} />
        <SummaryStat label="Read" value={readCount} />
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-[minmax(0,280px)_1fr_160px_160px]">
        <div className="relative md:col-start-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 w-full rounded-sm border border-input bg-background pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
            placeholder="Search..."
          />
        </div>
        <div className="hidden md:block" />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="h-10 rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
        >
          <option value="all">Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          className="h-10 rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
        >
          <option value="all">Type</option>
          <option value="article">Article</option>
          <option value="comment">Comment</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-sm border border-border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse text-left text-sm">
            <thead className="bg-background text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-5 py-3 font-medium">Notification</th>
                <th className="w-28 px-5 py-3 font-medium">Type</th>
                <th className="w-28 px-5 py-3 font-medium">Status</th>
                <th className="w-44 px-5 py-3 font-medium">Created</th>
                <th className="w-28 px-5 py-3 text-right font-medium" />
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.map((notification) => (
                <tr
                  key={notification.id}
                  className="border-b border-border odd:bg-[#F7F6F4] last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={notification.actorAvatar}
                        alt={notification.actorName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {notification.title}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {notification.articleTitle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {getTypeLabel(notification.type)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusLabel status={notification.status} />
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {formatNotificationDate(notification.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => markAsRead(notification)}
                        disabled={notification.status === 'read'}
                        className="text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:text-muted-foreground/50"
                        aria-label={`Mark ${notification.title} as read`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(notification)}
                        className="text-muted-foreground hover:text-red-600"
                        aria-label={`Delete ${notification.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredNotifications.length === 0 && (
        <p className="py-10 text-center text-muted-foreground">
          No notifications match this filter.
        </p>
      )}

      {toast && (
        <Toast
          message={toast.message}
          onClose={() => setToast(null)}
          title={toast.title}
        />
      )}

      {deleteTarget && (
        <DeleteNotificationDialog
          notification={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onDelete={confirmDelete}
        />
      )}
    </AdminLayout>
  )
}

function SummaryStat({ label, value }) {
  return (
    <div className="rounded-sm bg-[#EFEEEB] px-5 py-4">
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function StatusLabel({ status }) {
  const isUnread = status === 'unread'

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[12px] font-medium leading-none ${
        isUnread ? 'text-[#12B76A]' : 'text-muted-foreground'
      }`}
    >
      <span
        className={`h-1 w-1 rounded-full ${
          isUnread ? 'bg-[#12B76A]' : 'bg-muted-foreground'
        }`}
        aria-hidden="true"
      />
      {isUnread ? 'Unread' : 'Read'}
    </span>
  )
}

function Toast({ message, onClose, title }) {
  return (
    <div className="fixed bottom-10 right-10 z-50 flex w-[520px] max-w-[calc(100vw-40px)] items-start justify-between rounded-sm bg-green-500 px-5 py-4 text-white shadow-lg">
      <div>
        <p className="text-base font-bold">{title}</p>
        <p className="mt-1 text-xs">{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-full p-1 hover:bg-white/10"
        aria-label="Close notification toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

function DeleteNotificationDialog({ notification, onCancel, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-[360px] rounded-md bg-background px-10 py-8 text-center shadow-lg">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-5 top-5 rounded-full p-1 text-muted-foreground hover:bg-[#EFEEEB] hover:text-foreground"
          aria-label="Close delete notification dialog"
        >
          <X className="h-4 w-4" />
        </button>
        <h2 className="text-xl font-bold">Delete notification</h2>
        <p className="mt-5 text-sm text-muted-foreground">
          Do you want to delete {notification.actorName}'s notification?
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-foreground px-6 py-2 text-sm font-medium hover:border-muted-foreground hover:text-muted-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-full bg-foreground px-6 py-2 text-sm font-medium text-white hover:bg-muted-foreground"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminNotificationPage
