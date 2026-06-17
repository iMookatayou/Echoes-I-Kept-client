import { mockPosts, mockCommentsByPostId } from '../data/mockPosts'
import { getMockUserById } from '../data/mockUsers'

const STORAGE_KEY = 'adminNotifications'

function getPost(postId) {
  return mockPosts.find((post) => post.id === postId) || null
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
    actorAvatar: user?.profilePic || comment?.profile_pic || '',
    title: `${user?.name || comment?.name || 'Reader'} Commented on the article.`,
    message: comment?.comment_text || '',
    articleId: postId,
    articleTitle: post?.title || 'Article',
    createdAt: comment?.created_at || '2024-09-12T18:30:00Z',
  }
}

function getPublishedNotification(postId) {
  const post = getPost(postId)
  const author = getMockUserById(post?.authorId)

  return {
    id: `published-${postId}`,
    type: 'article',
    status: 'unread',
    actorName: author?.name || post?.author || 'Author',
    actorAvatar: author?.profilePic || post?.authorAvatar || '',
    title: `${author?.name || post?.author || 'Author'} Published new article.`,
    message: post?.title || '',
    articleId: postId,
    articleTitle: post?.title || 'Article',
    createdAt: `${post?.date || '2024-09-10'}T09:00:00Z`,
  }
}

function getInitialNotifications() {
  return [
    getPublishedNotification(2),
    getCommentNotification(2),
    getCommentNotification(1),
    getPublishedNotification(1),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
  const stored = parseStoredNotifications()

  if (stored) return stored

  const initialNotifications = getInitialNotifications()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotifications))
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
