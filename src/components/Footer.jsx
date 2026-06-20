import { Link } from 'react-router-dom'
import BrandIcon from './BrandIcon'

function Footer() {
  return (
    <footer className="bg-[#EFEEEB] px-8 py-8 md:py-14 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <span className="font-medium">Get in touch</span>
        <div className="flex items-center gap-4 text-[#4A4945]">
          <a href="#" className="transition-colors hover:text-muted-foreground">
            <BrandIcon
              src="/figma-assets/LinkedIN_black.svg"
              className="h-6 w-6"
            />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="transition-colors hover:text-muted-foreground">
            <BrandIcon
              src="/figma-assets/Github_black.svg"
              className="h-6 w-6"
            />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="transition-colors hover:text-muted-foreground">
            <BrandIcon
              src="/figma-assets/Google_black.svg"
              className="h-6 w-6"
            />
            <span className="sr-only">Google</span>
          </a>
        </div>
      </div>
      <Link
        to="/"
        className="hover:text-muted-foreground font-medium underline"
      >
        Home page
      </Link>
    </footer>
  )
}

export default Footer
