import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Edit3,
  Eye,
  FilePlus2,
  Save,
  Send,
  Trash2,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mockCategories } from '../data/mockPosts'
import {
  createAdminArticle,
  getAdminArticles,
  saveAdminArticles,
  updateAdminArticle,
} from '../services/articleAdminService'

const emptyForm = {
  title: '',
  category: 'Cat',
  image: '',
  description: '',
  content: '',
}

function AdminArticleManagementPage() {
  const [articles, setArticles] = useState(() => getAdminArticles())
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [statusFilter, setStatusFilter] = useState('all')

  const editingArticle = useMemo(
    () => articles.find((article) => article.id === editingId),
    [articles, editingId],
  )

  const filteredArticles = useMemo(() => {
    if (statusFilter === 'all') return articles
    return articles.filter((article) => article.status === statusFilter)
  }, [articles, statusFilter])

  const publishedCount = articles.filter(
    (article) => article.status === 'published',
  ).length
  const draftCount = articles.filter((article) => article.status === 'draft')
    .length

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const next = {}

    if (!form.title.trim()) next.title = 'Title is required.'
    if (!form.category.trim()) next.category = 'Category is required.'
    if (!form.image.trim()) next.image = 'Cover image URL is required.'
    if (!form.description.trim()) {
      next.description = 'Description is required.'
    }
    if (!form.content.trim()) next.content = 'Article content is required.'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const persist = (nextArticles) => {
    setArticles(nextArticles)
    saveAdminArticles(nextArticles)
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setErrors({})
  }

  const submitArticle = (status) => {
    if (!validate()) return

    if (editingArticle) {
      const nextArticles = articles.map((article) =>
        article.id === editingArticle.id
          ? updateAdminArticle(article, form, status)
          : article,
      )
      persist(nextArticles)
      resetForm()
      return
    }

    persist([createAdminArticle(form, status), ...articles])
    resetForm()
  }

  const editArticle = (article) => {
    setEditingId(article.id)
    setForm({
      title: article.title,
      category: article.category,
      image: article.image,
      description: article.description,
      content: article.content,
    })
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteArticle = (articleId) => {
    const confirmed = window.confirm('Delete this article?')
    if (!confirmed) return

    persist(articles.filter((article) => article.id !== articleId))
    if (editingId === articleId) resetForm()
  }

  const changeArticleStatus = (articleId, status) => {
    persist(
      articles.map((article) =>
        article.id === articleId
          ? { ...article, status, updatedAt: new Date().toISOString() }
          : article,
      ),
    )
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
              <h1 className="mt-1 text-3xl font-bold">
                Article management
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center sm:w-[360px]">
              <div className="rounded-sm bg-background px-3 py-3">
                <p className="text-xl font-bold">{articles.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="rounded-sm bg-background px-3 py-3">
                <p className="text-xl font-bold">{publishedCount}</p>
                <p className="text-xs text-muted-foreground">Published</p>
              </div>
              <div className="rounded-sm bg-background px-3 py-3">
                <p className="text-xl font-bold">{draftCount}</p>
                <p className="text-xs text-muted-foreground">Drafts</p>
              </div>
            </div>
          </div>

          <section className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
            <form
              className="h-fit rounded-sm bg-background p-4 shadow-sm md:p-6"
              onSubmit={(e) => {
                e.preventDefault()
                submitArticle('published')
              }}
            >
              <div className="mb-6 flex items-center gap-2">
                <FilePlus2 className="h-5 w-5" />
                <h2 className="text-xl font-bold">
                  {editingArticle ? 'Edit article' : 'Create article'}
                </h2>
              </div>

              <div className="space-y-4">
                <label className="block space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Title
                  </span>
                  <input
                    value={form.title}
                    onChange={(e) => updateForm('title', e.target.value)}
                    className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                    placeholder="Article title"
                  />
                  {errors.title && (
                    <span className="text-xs text-red-500">
                      {errors.title}
                    </span>
                  )}
                </label>

                <label className="block space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Category
                  </span>
                  <select
                    value={form.category}
                    onChange={(e) => updateForm('category', e.target.value)}
                    className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                  >
                    {mockCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Cover image URL
                  </span>
                  <input
                    value={form.image}
                    onChange={(e) => updateForm('image', e.target.value)}
                    className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                    placeholder="https://..."
                  />
                  {errors.image && (
                    <span className="text-xs text-red-500">
                      {errors.image}
                    </span>
                  )}
                </label>

                <label className="block space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Description
                  </span>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateForm('description', e.target.value)}
                    className="min-h-24 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                    placeholder="Short intro shown on article cards"
                  />
                  {errors.description && (
                    <span className="text-xs text-red-500">
                      {errors.description}
                    </span>
                  )}
                </label>

                <label className="block space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Content
                  </span>
                  <textarea
                    value={form.content}
                    onChange={(e) => updateForm('content', e.target.value)}
                    className="min-h-40 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                    placeholder="Write the full article content"
                  />
                  {errors.content && (
                    <span className="text-xs text-red-500">
                      {errors.content}
                    </span>
                  )}
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => submitArticle('draft')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground px-5 py-2 text-sm font-medium hover:border-muted-foreground hover:text-muted-foreground"
                >
                  <Save className="h-4 w-4" />
                  Save draft
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-white hover:bg-muted-foreground"
                >
                  <Send className="h-4 w-4" />
                  Publish
                </button>
                {editingArticle && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2 text-sm font-medium underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <section className="rounded-sm bg-background p-4 shadow-sm md:p-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold">Articles</h2>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:border-muted-foreground"
                >
                  <option value="all">All statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="py-3 pr-4 font-medium">Title</th>
                      <th className="py-3 pr-4 font-medium">Category</th>
                      <th className="py-3 pr-4 font-medium">Status</th>
                      <th className="py-3 pr-4 font-medium">Updated</th>
                      <th className="py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArticles.map((article) => (
                      <tr key={article.id} className="border-b border-border">
                        <td className="max-w-[280px] py-4 pr-4">
                          <p className="font-semibold line-clamp-2">
                            {article.title}
                          </p>
                        </td>
                        <td className="py-4 pr-4 text-muted-foreground">
                          {article.category}
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              article.status === 'published'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-[#EFEEEB] text-muted-foreground'
                            }`}
                          >
                            {article.status}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-muted-foreground">
                          {new Date(article.updatedAt).toLocaleDateString(
                            'en-GB',
                          )}
                        </td>
                        <td className="py-4">
                          <div className="flex justify-end gap-2">
                            {article.status === 'published' && (
                              <Link
                                to={`/post/${article.id}`}
                                className="rounded-full p-2 hover:bg-[#EFEEEB]"
                                aria-label={`View ${article.title}`}
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                            )}
                            <button
                              type="button"
                              onClick={() => editArticle(article)}
                              className="rounded-full p-2 hover:bg-[#EFEEEB]"
                              aria-label={`Edit ${article.title}`}
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                changeArticleStatus(
                                  article.id,
                                  article.status === 'published'
                                    ? 'draft'
                                    : 'published',
                                )
                              }
                              className="rounded-full px-3 py-2 text-xs font-medium hover:bg-[#EFEEEB]"
                            >
                              {article.status === 'published'
                                ? 'Draft'
                                : 'Publish'}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteArticle(article.id)}
                              className="rounded-full p-2 text-red-600 hover:bg-red-50"
                              aria-label={`Delete ${article.title}`}
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

              {filteredArticles.length === 0 && (
                <p className="py-10 text-center text-muted-foreground">
                  No articles match this status.
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

export default AdminArticleManagementPage
