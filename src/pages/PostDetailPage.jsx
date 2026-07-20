import { Fragment, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthorSidebar from "../components/AuthorSidebar";
import ArticleLikeShare from "../components/ArticleLikeShare";
import ArticleComments from "../components/ArticleComments";
import {
  getMockPostById,
  getMockLikesAmount,
  getMockCommentsByPostId,
  getPostHeroImage,
  getPostHeroImagePosition,
} from "../data/mockPosts";
import { getMockUserById } from "../data/mockUsers";
import {
  getPublishedAdminArticleById,
  hasAdminArticleStore,
} from "../services/articleAdminService";
import { getCategoryTextStyles } from "../utils/categoryStyles";

const pageShellClassName = "no-image-drag flex flex-col min-h-screen";

function preventImageDrag(e) {
  if (e.target instanceof HTMLImageElement) e.preventDefault();
}

function renderContent(content) {
  if (!content) return null;

  const paragraphs = content
    .replace(/\n(?=\d+\.\s)/g, "\n\n")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs.map((p, idx) => {
    const sectionMatch = p.match(/^(\d+\.\s[^\n]+)(?:\n([\s\S]+))?$/);

    if (sectionMatch) {
      const [, heading, body] = sectionMatch;

      return (
        <Fragment key={idx}>
          <h2 className="font-display mb-4 mt-8 text-2xl font-medium">{heading}</h2>
          {body && <p className="mb-4 whitespace-pre-wrap">{body}</p>}
        </Fragment>
      );
    }

    return (
      <p key={idx} className="mb-4 whitespace-pre-wrap">
        {p}
      </p>
    );
  });
}

function PostDetailPage() {
  const { postId } = useParams();
  const detailImageSource = useMemo(() => getMockPostById(postId), [postId]);
  const post = useMemo(() => {
    if (hasAdminArticleStore()) {
      return getPublishedAdminArticleById(postId);
    }

    return detailImageSource;
  }, [postId, detailImageSource]);

  if (!post) {
    return (
      <div className={pageShellClassName} onDragStart={preventImageDrag}>
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
    );
  }

  return (
    <div className={pageShellClassName} onDragStart={preventImageDrag}>
      <Navbar />
      <PostDetailContent
        key={postId}
        post={post}
        postId={postId}
        detailImageSource={detailImageSource}
      />
      <Footer />
    </div>
  );
}

function PostDetailContent({ post, postId, detailImageSource }) {
  const content = post.content || "";
  const [likesAmount, setLikesAmount] = useState(() =>
    getMockLikesAmount(postId),
  );
  const [comments, setComments] = useState(() =>
    getMockCommentsByPostId(postId),
  );

  const handleLike = () => {
    setLikesAmount((prev) => prev + 1);
  };

  const handleAddComment = (text) => {
    const currentUser = getMockUserById(1);
    const newComment = {
      id: Date.now(),
      name: currentUser?.name || "You",
      profile_pic: currentUser?.profilePic || "/author-image.jpeg",
      comment_text: text,
      created_at: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const dateString = post.date;
  const heroImage = getPostHeroImage(post, detailImageSource);
  const heroImagePosition = getPostHeroImagePosition(post, detailImageSource);
  const author = {
    name: post.author,
    profilePic: post.authorAvatar,
    bio: post.authorBio,
  };

  return (
    <main className="flex-grow">
        <div className="max-w-7xl mx-auto space-y-8 container md:px-8 pb-20 md:pb-28 md:pt-8 lg:pt-16">
          <div className="space-y-4 md:px-4">
            {heroImage && (
              <div className="overflow-hidden md:rounded-lg w-full h-[260px] sm:h-[340px] md:h-[587px]">
                <img
                  src={heroImage}
                  alt={post.title}
                  draggable={false}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: heroImagePosition }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            <div className="xl:w-3/4 space-y-8">
              <article className="px-4">
                <div className="mb-2 flex items-center gap-3">
                  <span
                    className={`shrink-0 text-sm font-semibold ${getCategoryTextStyles(post?.category)}`}
                  >
                    {post?.category}
                  </span>
                  {dateString && (
                    <span className="shrink-0 text-sm text-muted-foreground">
                      {new Date(dateString).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>

                <h1 className="font-display text-3xl font-medium">{post?.title}</h1>
                <p className="mt-4 mb-10 text-muted-foreground">
                  {post?.description}
                </p>

                <div className="markdown font-sans text-[15px] leading-[1.55]">
                  {renderContent(content)}
                </div>
              </article>

              <div className="xl:hidden px-4">
                <AuthorSidebar {...author} />
              </div>

              <ArticleLikeShare likesAmount={likesAmount} onLike={handleLike} />

              <ArticleComments
                comments={comments}
                onAddComment={handleAddComment}
              />
            </div>

            <div className="hidden xl:block xl:w-1/4">
              <div className="sticky top-32">
                <AuthorSidebar {...author} />
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}

export default PostDetailPage;
