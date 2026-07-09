function ArticleCardSkeleton() {
  return (
    <article className="flex flex-col gap-4" aria-hidden="true">
      <div className="skeleton-shimmer aspect-[1.65/1] w-full rounded-md" />
      <div className="flex flex-col gap-2">
        <div className="skeleton-shimmer h-6 w-4/5 rounded-sm" />
        <div className="skeleton-shimmer h-6 w-3/5 rounded-sm" />
        <div className="space-y-2 pt-1">
          <div className="skeleton-shimmer h-4 w-full rounded-sm" />
          <div className="skeleton-shimmer h-4 w-full rounded-sm" />
          <div className="skeleton-shimmer h-4 w-2/3 rounded-sm" />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <div className="skeleton-shimmer h-8 w-8 shrink-0 rounded-full" />
          <div className="skeleton-shimmer h-4 w-24 rounded-sm" />
        </div>
      </div>
    </article>
  )
}

export default ArticleCardSkeleton
