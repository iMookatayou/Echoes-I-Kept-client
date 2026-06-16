import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Loader2, Search } from 'lucide-react'
import ArticleCard from './ArticleCard'

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

  useEffect(() => {
    axios
      .get(`${API_BASE}/categories`)
      .then((res) => {
        setCategories(res.data)
        setCategoriesLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching categories:', err)
        setCategoriesLoading(false)
      })
  }, [])

  useEffect(() => {
    const categoryParam =
      selectedCategory !== 'Highlight'
        ? `&category=${selectedCategory}`
        : ''

    axios
      .get(`${API_BASE}/posts?page=${page}&limit=6${categoryParam}`)
      .then((res) => {
        setPosts((prev) =>
          page === 1 ? res.data.posts : [...prev, ...res.data.posts],
        )
        setLoading(false)
        if (res.data.currentPage >= res.data.totalPages) {
          setHasMore(false)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }, [page, selectedCategory])

  useEffect(() => {
    if (keyword.length === 0) return

    axios
      .get(`${API_BASE}/posts?keyword=${keyword}`)
      .then((res) => {
        setSearchResults(res.data.posts)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [keyword])

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
            {categories.map((cat) => (
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
            {categories.map((cat) => (
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

      <article className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        {posts.map((post) => (
          <ArticleCard
            key={post.id}
            id={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={formatDate(post.date)}
          />
        ))}
      </article>

      {hasMore && (
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
              <div className="flex flex-col items-center min-h-lvh">
                <Loader2 className="w-12 h-12 animate-spin text-foreground" />
                <p className="mt-4">Loading...</p>
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
