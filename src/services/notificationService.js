import { mockPosts, mockCommentsByPostId } from '../data/mockPosts'
import { getMockUserById } from '../data/mockUsers'

const STORAGE_KEY = 'adminNotifications'
const STORAGE_VERSION_KEY = 'adminNotificationsVersion'
const STORAGE_VERSION = '3'

function getPost(postId) {
  return mockPosts.find((post) => post.id === postId) || null
}

function hoursAgo(hours) {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()
}

function getCommentNotification(postId) {
  const post = getPost(postId)
  const comment = mockCommentsByPostId[postId]?.[0]
  const user = getMockUserById(comment?.userId)

  return {
    id: `comment-${postId}-${comment?.id}`,
    type: 'comment',
    status: 'unread',
    actorName: user?.name || comment?.name || 'Reader',
    actorAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    action: 'Commented on your article:',
    title: `${user?.name || comment?.name || 'Reader'} Commented on your article: ${post?.title || 'Article'}`,
    message: comment?.comment_text || '',
    articleId: postId,
    articleTitle: post?.title || 'Article',
    createdAt: hoursAgo(4),
  }
}

function getLikeNotification(postId) {
  const post = getPost(postId)
  const user = getMockUserById(3)

  return {
    id: `like-${postId}-${user?.id || 'reader'}`,
    type: 'like',
    status: 'unread',
    actorName: user?.name || 'Reader',
    actorAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    action: 'liked your article:',
    title: `${user?.name || 'Reader'} liked your article: ${post?.title || 'Article'}`,
    message: '',
    articleId: postId,
    articleTitle: post?.title || 'Article',
    createdAt: hoursAgo(4),
  }
}

function getInitialNotifications() {
  return [getCommentNotification(2), getLikeNotification(2)]
}

function parseStoredNotifications() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function getAdminNotifications() {
  const version = localStorage.getItem(STORAGE_VERSION_KEY)

  if (version !== STORAGE_VERSION) {
    const initialNotifications = getInitialNotifications()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotifications))
    localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION)
    return initialNotifications
  }

  const stored = parseStoredNotifications()

  if (stored) return stored

  const initialNotifications = getInitialNotifications()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotifications))
  localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION)
  return initialNotifications
}

export function saveAdminNotifications(notifications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
}

export function markAdminNotificationAsRead(id) {
  const notifications = getAdminNotifications().map((notification) =>
    notification.id === id ? { ...notification, status: 'read' } : notification,
  )

  saveAdminNotifications(notifications)
  return notifications
}

export function markAllAdminNotificationsAsRead() {
  const notifications = getAdminNotifications().map((notification) => ({
    ...notification,
    status: 'read',
  }))

  saveAdminNotifications(notifications)
  return notifications
}

export function deleteAdminNotification(id) {
  const notifications = getAdminNotifications().filter(
    (notification) => notification.id !== id,
  )

  saveAdminNotifications(notifications)
  return notifications
}

export function getUnreadAdminNotificationCount() {
  return getAdminNotifications().filter(
    (notification) => notification.status === 'unread',
  ).length
}
