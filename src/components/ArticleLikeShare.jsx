import { Copy, Heart } from 'lucide-react'
import BrandIcon from './BrandIcon'

function ArticleLikeShare({ likesAmount, onLike }) {
  const shareUrl = encodeURI(window.location.href)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className="md:px-4">
      <div className="bg-[#EFEEEB] py-4 px-4 md:rounded-sm flex flex-col space-y-4 md:gap-16 md:flex-row md:items-center md:space-y-0 md:justify-between mb-10">
        <button
          type="button"
          onClick={onLike}
          className="flex items-center justify-center space-x-2 px-11 py-3 rounded-full text-foreground border border-foreground transition-colors group bg-white hover:border-muted-foreground hover:text-muted-foreground"
        >
          <Heart className="w-5 h-5 text-foreground group-hover:text-muted-foreground transition-colors" />
          <span className="text-foreground group-hover:text-muted-foreground font-medium transition-colors">
            {likesAmount}
          </span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopy}
            className="bg-white flex flex-1 items-center justify-center space-x-2 px-11 py-3 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors group"
          >
            <Copy className="w-5 h-5 text-foreground transition-colors group-hover:text-muted-foreground" />
            <span className="text-foreground font-medium transition-colors group-hover:text-muted-foreground">
              Copy
            </span>
          </button>

          <a
            href={`https://www.facebook.com/share.php?u=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
            aria-label="Share on Facebook"
          >
            <BrandIcon
              src="/figma-assets/Facebook_black.svg"
              className="h-6 w-6"
            />
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
            aria-label="Share on LinkedIn"
          >
            <BrandIcon
              src="/figma-assets/LinkedIN_black.svg"
              className="h-6 w-6"
            />
          </a>

          <a
            href={`https://www.twitter.com/share?&url=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
            aria-label="Share on Twitter"
          >
            <BrandIcon
              src="/figma-assets/Twitter_black.svg"
              className="h-6 w-6"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ArticleLikeShare
