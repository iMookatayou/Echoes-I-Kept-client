import { Fragment, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AuthorSidebar from '../components/AuthorSidebar'
import ArticleLikeShare from '../components/ArticleLikeShare'
import ArticleComments from '../components/ArticleComments'
import {
  getMockPostById,
  getMockLikesAmount,
  getMockCommentsByPostId,
} from '../data/mockPosts'
import { getMockUserById } from '../data/mockUsers'
import {
  getPublishedAdminArticleById,
  hasAdminArticleStore,
} from '../services/articleAdminService'

const API_BASE = 'https://blog-post-project-api-with-db.vercel.app'

function renderContent(content) {
  if (!content) return null

  const paragraphs = content
    .replace(/\n(?=\d+\.\s)/g, '\n\n')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return paragraphs.map((p, idx) => {
    const sectionMatch = p.match(/^(\d+\.\s[^\n]+)(?:\n([\s\S]+))?$/)

    if (sectionMatch) {
      const [, heading, body] = sectionMatch

      return (
        <Fragment key={idx}>
          <h2 className="mb-4 mt-8 text-2xl font-bold">{heading}</h2>
          {body && <p className="mb-4 whitespace-pre-wrap">{body}</p>}
        </Fragment>
      )
    }

    return (
      <p key={idx} className="mb-4 whitespace-pre-wrap">
        {p}
      </p>
    )
  })
}

function PostDetailPage() {
  const { postId } = useParams()
  const mockPost = useMemo(() => {
    if (hasAdminArticleStore()) {
      return getPublishedAdminArticleById(postId)
    }

    return getMockPostById(postId)
  }, [postId])

  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(() => mockPost)
  const [content, setContent] = useState(() => mockPost?.content || '')
  const [likesAmount, setLikesAmount] = useState(() =>
    getMockLikesAmount(postId),
  )
  const [comments, setComments] = useState(() =>
    getMockCommentsByPostId(postId),
  )

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)

      if (hasAdminArticleStore()) {
        setPost(mockPost)
        setContent(mockPost?.content || '')
        setLikesAmount(getMockLikesAmount(postId))
        setComments(getMockCommentsByPostId(postId))
        setLoading(false)
        return
      }

      try {
        const res = await axios.get(`${API_BASE}/posts/${postId}`)
        if (!mounted) return

        setPost(res.data)
        setContent(res.data.content)

        try {
          const likesRes = await axios.get(`${API_BASE}/posts/${postId}/likes`)
          if (mounted) setLikesAmount(likesRes.data.like_count || 0)
        } catch {
          if (mounted) setLikesAmount(getMockLikesAmount(postId))
        }

        try {
          const commentsRes = await axios.get(
            `${API_BASE}/posts/${postId}/comments`,
          )
          if (mounted) setComments(commentsRes.data || [])
        } catch {
          if (mounted) setComments(getMockCommentsByPostId(postId))
        }
      } catch {
        if (!mounted) return
        setPost(mockPost)
        setContent(mockPost?.content || '')
        setLikesAmount(getMockLikesAmount(postId))
        setComments(getMockCommentsByPostId(postId))
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [postId, mockPost])

  const handleLike = () => {
    setLikesAmount((prev) => prev + 1)
  }

  const handleAddComment = (text) => {
    const currentUser = getMockUserById(1)
    const newComment = {
      id: Date.now(),
      name: currentUser?.name || 'You',
      profile_pic: currentUser?.profilePic || '/author-image.jpeg',
      comment_text: text,
      created_at: new Date().toISOString(),
    }
    setComments((prev) => [newComment, ...prev])
  }

  if (!loading && !post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex flex-grow items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold">Article not found</h1>
            <p className="mt-3 text-muted-foreground">
              The article you are looking for is not available.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (loading && !post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <Loader2 className="w-16 h-16 animate-spin text-foreground" />
          <p className="mt-4 text-lg font-semibold">Loading...</p>
        </div>
        <Footer />
      </div>
    )
  }

  const dateString = post?.date
  const author = {
    name: post?.author,
    profilePic: post?.authorAvatar,
    bio: post?.authorBio,
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto space-y-8 container md:px-8 pb-20 md:pb-28 md:pt-8 lg:pt-16">
          <div className="space-y-4 md:px-4">
            {post?.image && (
              <img
                src={post.image}
                alt={post.title}
                className="md:rounded-lg object-cover w-full h-[260px] sm:h-[340px] md:h-[587px]"
              />
            )}
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            <div className="xl:w-3/4 space-y-8">
              <article className="px-4">
                <div className="flex">
                  <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
                    {post?.category}
                  </span>
                  {dateString && (
                    <span className="px-3 py-1 text-sm font-normal text-muted-foreground">
                      {new Date(dateString).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold">{post?.title}</h1>
                <p className="mt-4 mb-10 text-muted-foreground">
                  {post?.description}
                </p>

                <div className="markdown">
                  {loading ? (
                    <p className="text-muted-foreground">Loading...</p>
                  ) : (
                    renderContent(content)
                  )}
                </div>
              </article>

              <div className="xl:hidden px-4">
                <AuthorSidebar {...author} />
              </div>

              <ArticleLikeShare
                likesAmount={likesAmount}
                onLike={handleLike}
              />

                <ArticleComments
                  comments={comments}
                  onAddComment={handleAddComment}
              />
            </div>

            <div className="hidden xl:block xl:w-1/4">
              <div className="sticky top-4">
                <AuthorSidebar {...author} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PostDetailPage
