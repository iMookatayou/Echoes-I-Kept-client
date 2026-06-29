function ArticleCardSkeleton() {
  return (
    <article className="flex animate-pulse flex-col gap-4" aria-hidden="true">
      <div className="aspect-[1.65/1] w-full rounded-md bg-[#DAD6D1]" />
      <div className="flex flex-col gap-2">
        <div className="h-6 w-4/5 rounded-sm bg-[#DAD6D1]" />
        <div className="h-6 w-3/5 rounded-sm bg-[#DAD6D1]" />
        <div className="space-y-2 pt-1">
          <div className="h-4 w-full rounded-sm bg-[#EFEEEB]" />
          <div className="h-4 w-full rounded-sm bg-[#EFEEEB]" />
          <div className="h-4 w-2/3 rounded-sm bg-[#EFEEEB]" />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <div className="h-8 w-8 shrink-0 rounded-full bg-[#DAD6D1]" />
          <div className="h-4 w-24 rounded-sm bg-[#DAD6D1]" />
        </div>
      </div>
    </article>
  )
}

export default ArticleCardSkeleton
