import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const paperPlaneAnimation = "/svg/animation/Loading40_Paperplane.svg";

function preventImageDrag(e) {
  if (e.target instanceof HTMLImageElement) e.preventDefault();
}

function NotFoundPage() {
  return (
    <div
      className="no-image-drag flex min-h-screen flex-col bg-background"
      onDragStart={preventImageDrag}
    >
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-5 py-16 sm:py-20">
        <section className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
          <img
            src={paperPlaneAnimation}
            alt="Paper plane searching for the missing page"
            draggable={false}
            className="mb-5 h-44 w-60 object-contain sm:h-52 sm:w-72"
          />

          <div className="flex flex-col items-center text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Page not found
            </p>
            <h1 className="font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
              This page is not in the journal
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
              The page you are looking for does not exist, or the link may have
              been moved
            </p>

            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[4px] bg-foreground px-6 text-sm font-medium text-white transition-colors hover:bg-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                Go to homepage
              </Link>
              <Link
                to="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border border-[#D9D8D4] px-6 text-sm font-medium text-foreground transition-colors hover:bg-[#EFEEEB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Browse articles
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
