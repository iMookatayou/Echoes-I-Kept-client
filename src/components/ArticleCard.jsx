import { Link } from 'react-router-dom'

function ArticleCard({
  id,
  image,
  category,
  title,
  description,
  author,
  authorAvatar = '/author-image.jpeg',
  date,
}) {
  const postPath = `/post/${id}`

  return (
    <article className="flex flex-col gap-4">
      <Link
        to={postPath}
        className="relative block h-[212px] sm:h-[360px] overflow-hidden rounded-md"
      >
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          src={image}
          alt={title}
          loading="lazy"
        />
      </Link>

      <div className="flex flex-col gap-2">
        <span className="inline-flex w-fit rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-700">
          {category}
        </span>

        <Link to={postPath} className="group">
          <h2 className="text-start text-xl font-bold leading-snug line-clamp-2 group-hover:underline">
            {title}
          </h2>
        </Link>

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {description}
        </p>

        <div className="flex items-center gap-2 pt-1 text-sm text-muted-foreground">
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={authorAvatar}
            alt={author || 'Author'}
          />
          <span className="text-foreground">{author || 'Unknown author'}</span>
          <span className="text-gray-300" aria-hidden="true">
            |
          </span>
          {date && <time dateTime={date}>{date}</time>}
        </div>
      </div>
    </article>
  )
}

export default ArticleCard
