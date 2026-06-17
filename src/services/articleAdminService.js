import { mockPosts } from '../data/mockPosts'

const STORAGE_KEY = 'adminArticles'

function toAdminArticle(post) {
  return {
    ...post,
    status: post.status || 'published',
    updatedAt: post.updatedAt || post.date,
  }
}

export function getAdminArticles() {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const initialArticles = mockPosts.map(toAdminArticle)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialArticles))
  return initialArticles
}

export function hasAdminArticleStore() {
  return Boolean(localStorage.getItem(STORAGE_KEY))
}

export function saveAdminArticles(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
}

export function getPublishedAdminArticles() {
  return getAdminArticles().filter((article) => article.status === 'published')
}

export function getPublishedAdminArticleById(id) {
  const numericId = typeof id === 'string' ? Number(id) : id
  return (
    getPublishedAdminArticles().find((article) => article.id === numericId) ||
    null
  )
}

export function getPublishedAdminArticlesByCategory(
  category,
  page = 1,
  limit = 6,
) {
  const publishedArticles = getPublishedAdminArticles()
  const filtered =
    category === 'Highlight'
      ? publishedArticles
      : publishedArticles.filter((article) => article.category === category)
  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return {
    posts: paginated,
    currentPage: page,
    totalPages: Math.ceil(filtered.length / limit) || 1,
  }
}

export function searchPublishedAdminArticles(keyword) {
  const lower = keyword.toLowerCase()
  return getPublishedAdminArticles().filter(
    (article) =>
      article.title.toLowerCase().includes(lower) ||
      article.description.toLowerCase().includes(lower) ||
      article.category.toLowerCase().includes(lower),
  )
}

export function createAdminArticle(form, status) {
  const today = new Date().toISOString().slice(0, 10)

  return {
    id: Date.now(),
    image: form.image,
    category: form.category,
    title: form.title,
    description: form.description,
    authorId: 2,
    author: 'Thompson P.',
    authorAvatar: '/author-image.jpeg',
    authorBio: [
      'I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.',
      "When I'm not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.",
    ],
    date: today,
    content: form.content,
    status,
    updatedAt: new Date().toISOString(),
  }
}

export function updateAdminArticle(article, form, status) {
  return {
    ...article,
    image: form.image,
    category: form.category,
    title: form.title,
    description: form.description,
    content: form.content,
    status,
    updatedAt: new Date().toISOString(),
  }
}
