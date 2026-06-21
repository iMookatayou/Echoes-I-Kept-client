import { mockPosts } from '../data/mockPosts'
import VinylAlbumCarousel from './VinylAlbumCarousel'

function HeroSection() {
  const heroTracks = mockPosts.map(
    ({ id, artist, bestPick, image, spotifyUrl }) => ({
      id,
      artist,
      bestPick,
      image,
      spotifyUrl,
    }),
  )

  return (
    <main className="mx-auto overflow-hidden px-4 py-8 md:px-8 lg:w-[clamp(960px,82vw,1180px)] lg:px-0 lg:pb-[clamp(64px,5vw,96px)] lg:pt-[clamp(40px,4vw,72px)]">
      <div className="flex flex-col items-center lg:grid lg:[grid-template-columns:clamp(240px,20vw,300px)_clamp(360px,32vw,440px)_clamp(240px,20vw,300px)] lg:items-center lg:gap-x-[clamp(32px,3vw,48px)]">
        <div className="mb-8 max-w-[360px] text-center lg:mb-0 lg:w-[clamp(270px,20vw,360px)] lg:max-w-none lg:justify-self-end lg:text-right">
          <p className="mb-3 text-[11px] font-semibold uppercase text-muted-foreground">
            A personal listening journal
          </p>
          <h1 className="mb-5 leading-none">
            <span className="block text-[38px] font-bold sm:text-[42px] lg:text-[clamp(36px,2.5vw,44px)]">
              Artists I Love,
            </span>
            <span className="mt-2 block text-[34px] font-medium italic text-muted-foreground sm:text-[38px] lg:text-[clamp(32px,2.2vw,40px)]">
              Songs I Keep
            </span>
          </h1>
          <p className="mx-auto max-w-[320px] text-sm leading-[1.45] text-muted-foreground lg:ml-auto lg:mr-0 lg:max-w-[clamp(270px,20vw,360px)] lg:text-[clamp(14px,0.9vw,16px)]">
            A personal music journal about the artists I return to and the one
            song from each of them that means the most to me.
          </p>
          <p className="mt-4 text-xs font-medium text-foreground">
            06 artists&nbsp;&nbsp;·&nbsp;&nbsp;06 songs&nbsp;&nbsp;·&nbsp;&nbsp;one best pick each
          </p>
        </div>

        <div className="mb-8 flex w-full max-w-[440px] justify-center lg:mb-0">
          <VinylAlbumCarousel tracks={heroTracks} />
        </div>

        <div className="max-w-[360px] border-l-2 border-foreground/15 pl-5 lg:max-w-none">
          <h2 className="mb-2 text-xs font-semibold uppercase leading-4 text-muted-foreground lg:text-[clamp(10px,0.7vw,12px)] lg:leading-[1.4]">
            A note from
          </h2>
          <h3 className="mb-3 text-xl font-bold leading-7 lg:text-[clamp(16px,1.1vw,22px)] lg:leading-[1.5]">
            Thompson P.
          </h3>
          <p className="mb-4 text-sm font-medium italic leading-relaxed text-foreground lg:text-[clamp(11px,0.75vw,14px)] lg:leading-[1.45]">
            I keep this journal for the songs that turn ordinary moments into
            memories.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground lg:text-[clamp(11px,0.75vw,14px)] lg:leading-[1.35]">
            Each article starts with the artist, follows the feeling, and ends
            with the one track I would keep.
          </p>
        </div>
      </div>
    </main>
  )
}

export default HeroSection
