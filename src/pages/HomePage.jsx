import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import LatestArticles from '../components/LatestArticles'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <HeroSection />
        <LatestArticles />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
