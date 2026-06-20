import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ChevronDown, Loader2, Search } from 'lucide-react'
import ArticleCard from './ArticleCard'
import { mockCategories } from '../data/mockPosts'
import {
  getAdminCategories,
  hasAdminCategoryStore,
} from '../services/categoryAdminService'
import {
  getPublishedAdminArticlesByCategory,
  hasAdminArticleStore,
  searchPublishedAdminArticles,
} from '../services/articleAdminService'

const API_BASE = 'https://blog-post-project-api-with-db.vercel.app'

function LatestArticles() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('Highlight')
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [categories, setCategories] = useState(() =>
    hasAdminCategoryStore() ? getAdminCategories() : [],
  )
  const [categoriesLoading, setCategoriesLoading] = useState(
    () => !hasAdminCategoryStore(),
  )
  const [useMockData, setUseMockData] = useState(false)

  useEffect(() => {
    if (hasAdminCategoryStore()) {
      return
    }

    axios
      .get(`${API_BASE}/categories`)
      .then((res) => {
        setCategories(res.data)
        setCategoriesLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching categories:', err)
        setCategories(getAdminCategories())
        setCategoriesLoading(false)
      })
  }, [])

  useEffect(() => {
    const categoryParam =
      selectedCategory !== 'Highlight'
        ? `&category=${encodeURIComponent(selectedCategory)}`
        : ''

    let cancelled = false

    const fetchPosts = () => {
      if (useMockData || hasAdminArticleStore()) {
        return Promise.resolve(
          getPublishedAdminArticlesByCategory(selectedCategory, page, 6),
        )
      }
      return axios
        .get(`${API_BASE}/posts?page=${page}&limit=6${categoryParam}`)
        .then((res) => res.data)
        .catch(() => {
          setUseMockData(true)
          return getPublishedAdminArticlesByCategory(selectedCategory, page, 6)
        })
    }

    fetchPosts().then((result) => {
      if (cancelled) return
      setPosts((prev) =>
        page === 1 ? result.posts : [...prev, ...result.posts],
      )
      setHasMore(result.currentPage < result.totalPages)
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [page, selectedCategory, useMockData])

  useEffect(() => {
    if (keyword.length === 0) return

    const fetchSearchResults = () => {
      if (useMockData || hasAdminArticleStore()) {
        return Promise.resolve(searchPublishedAdminArticles(keyword))
      }
      return axios
        .get(`${API_BASE}/posts?keyword=${keyword}`)
        .then((res) => res.data.posts)
        .catch(() => searchPublishedAdminArticles(keyword))
    }

    fetchSearchResults().then((results) => {
      setSearchResults(results)
      setLoading(false)
    })
  }, [keyword, useMockData])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setKeyword('')
    setSearchResults([])
    setPosts([])
    setPage(1)
    setHasMore(true)
    setLoading(true)
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  const displayCategories = categories.length > 0 ? categories : mockCategories
  const isInitialLoading = loading && page === 1 && posts.length === 0
  const visiblePosts = keyword ? searchResults : posts

  return (
    <section className="mx-auto mb-20 w-full max-w-[1040px] px-4 sm:px-6 lg:px-0">
      <h2 className="mb-4 text-xl font-bold">Latest articles</h2>

      <div className="mb-10 flex flex-col gap-4 rounded-sm bg-[#EFEEEB] px-4 py-4 md:flex-row-reverse md:items-center md:justify-between md:gap-10 md:py-3">
        <div className="w-full md:max-w-[320px]">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={keyword}
              className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-muted-foreground"
              onChange={(e) => {
                const value = e.target.value
                setKeyword(value)
                if (value.length > 0) {
                  setLoading(true)
                } else {
                  setSearchResults([])
                  setLoading(false)
                }
              }}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => {
                setTimeout(() => setSearchOpen(false), 200)
              }}
            />
            {!loading && searchOpen && keyword && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-background rounded-sm shadow-lg p-1">
                {searchResults.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    className="text-start px-4 py-2 block w-full text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    {post.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full md:hidden">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            disabled={loading}
            className="w-full appearance-none rounded-sm border border-input bg-background px-3 py-3 pr-10 text-muted-foreground focus:outline-none focus:border-muted-foreground"
          >
            <option value="Highlight">Highlight</option>
            {displayCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
        </div>

        {categoriesLoading ? (
          <div className="hidden md:flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-24 h-10 rounded-sm bg-[#DAD6D1] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="hidden md:flex space-x-2">
            <button
              type="button"
              disabled={selectedCategory === 'Highlight'}
              onClick={() => handleCategoryChange('Highlight')}
              className={`px-4 py-3 transition-colors rounded-sm text-sm text-muted-foreground font-medium ${
                selectedCategory === 'Highlight'
                  ? 'bg-[#DAD6D1]'
                  : 'hover:bg-muted'
              }`}
            >
              Highlight
            </button>
            {displayCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                disabled={selectedCategory === cat.name}
                onClick={() => handleCategoryChange(cat.name)}
                className={`px-4 py-3 transition-colors rounded-sm text-sm text-muted-foreground font-medium ${
                  selectedCategory === cat.name
                    ? 'bg-[#DAD6D1]'
                    : 'hover:bg-muted'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {isInitialLoading ? (
        <div className="flex min-h-60 flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-foreground" />
          <p className="mt-4 font-medium">Loading...</p>
        </div>
      ) : visiblePosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {visiblePosts.map((post) => (
            <ArticleCard
              key={post.id}
              id={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              authorAvatar={post.authorAvatar}
              date={formatDate(post.date)}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No articles found.</p>
      )}

      {hasMore && !isInitialLoading && !keyword && (
        <div className="text-center mt-20">
          <button
            type="button"
            onClick={() => {
              setLoading(true)
              setPage((p) => p + 1)
            }}
            className={`font-medium ${loading ? '' : 'underline hover:text-muted-foreground'}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              'View more'
            )}
          </button>
        </div>
      )}
    </section>
  )
}

export default LatestArticles
