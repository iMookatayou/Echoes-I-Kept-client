import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Loader2, Search } from 'lucide-react'
import ArticleCard from './ArticleCard'
import {
  getMockPostsByCategory,
  mockCategories,
  searchMockPosts,
} from '../data/mockPosts'

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
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [useMockData, setUseMockData] = useState(false)

  useEffect(() => {
    axios
      .get(`${API_BASE}/categories`)
      .then((res) => {
        setCategories(res.data)
        setCategoriesLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching categories:', err)
        setCategories(mockCategories)
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
      if (useMockData) {
        return Promise.resolve(
          getMockPostsByCategory(selectedCategory, page, 6),
        )
      }
      return axios
        .get(`${API_BASE}/posts?page=${page}&limit=6${categoryParam}`)
        .then((res) => res.data)
        .catch(() => {
          setUseMockData(true)
          return getMockPostsByCategory(selectedCategory, page, 6)
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
      if (useMockData) {
        return Promise.resolve(searchMockPosts(keyword))
      }
      return axios
        .get(`${API_BASE}/posts?keyword=${keyword}`)
        .then((res) => res.data.posts)
        .catch(() => searchMockPosts(keyword))
    }

    fetchSearchResults().then((results) => {
      setSearchResults(results)
      setLoading(false)
    })
  }, [keyword, useMockData])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
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

  return (
    <div className="w-full max-w-7xl mx-auto md:px-6 lg:px-8 mb-20">
      <h2 className="text-xl font-bold mb-4 px-4">Latest articles</h2>

      <div className="bg-[#EFEEEB] px-4 py-4 md:py-3 md:rounded-sm flex flex-col space-y-4 md:gap-16 md:flex-row-reverse md:items-center md:space-y-0 md:justify-between mb-10">
        <div className="w-full md:max-w-sm">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-muted-foreground"
              onChange={(e) => {
                const value = e.target.value
                setKeyword(value)
                if (value.length > 0) {
                  setLoading(true)
                } else {
                  setSearchResults([])
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

        <div className="md:hidden w-full">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            disabled={loading}
            className="w-full py-3 rounded-sm text-muted-foreground border border-input bg-background px-3 focus:outline-none focus:border-muted-foreground"
          >
            <option value="Highlight">Highlight</option>
            {displayCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
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
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
          {posts.map((post) => (
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
        <p className="px-4 text-muted-foreground">No articles found.</p>
      )}

      {hasMore && !isInitialLoading && (
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
    </div>
  )
}

export default LatestArticles
