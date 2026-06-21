function HeroSection() {
  return (
    <main className="mx-auto px-4 py-8 md:px-8 lg:w-[clamp(780px,59vw,1052px)] lg:px-0 lg:pb-[clamp(64px,5vw,96px)] lg:pt-[clamp(40px,4vw,72px)]">
      <div className="flex flex-col items-center lg:grid lg:[grid-template-columns:clamp(224px,17vw,300px)_clamp(252px,19vw,340px)_clamp(224px,17vw,300px)] lg:items-center lg:gap-x-[clamp(40px,3vw,56px)]">
        <div className="mb-8 max-w-[360px] text-center lg:mb-0 lg:w-[clamp(270px,20vw,360px)] lg:max-w-none lg:justify-self-end lg:text-right">
          <h1 className="mb-5 text-4xl font-bold leading-tight lg:text-[clamp(36px,2.5vw,44px)] lg:leading-[1.1]">
            Artists I Love, <br />
            Songs I Keep
          </h1>
          <p className="mx-auto max-w-[320px] text-sm leading-[1.45] text-muted-foreground lg:ml-auto lg:mr-0 lg:max-w-[clamp(270px,20vw,360px)] lg:text-[clamp(14px,0.9vw,16px)]">
            A personal music journal about the artists I return to and the one
            song from each of them that means the most to me.
          </p>
        </div>

        <img
          src="/author-image.jpeg"
          alt="Blog author"
          className="mb-8 h-[420px] w-full max-w-[360px] rounded-lg object-cover shadow-lg sm:h-[480px] sm:max-w-[420px] md:h-[530px] md:max-w-[520px] lg:mb-0 lg:h-[clamp(342px,26vw,460px)] lg:w-[clamp(252px,19vw,340px)] lg:max-w-none"
        />

        <div className="max-w-[360px] lg:max-w-none">
          <h2 className="mb-2 text-xs font-medium leading-4 lg:text-[clamp(10px,0.7vw,12px)] lg:leading-[1.4]">
            -Author
          </h2>
          <h3 className="mb-3 text-xl font-bold leading-7 lg:text-[clamp(16px,1.1vw,22px)] lg:leading-[1.5]">
            Thompson P.
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground lg:text-[clamp(11px,0.75vw,14px)] lg:leading-[1.35]">
            I write about the artists whose music stays with me, from polished
            pop and alternative moods to after-dark R&amp;B.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground lg:text-[clamp(11px,0.75vw,14px)] lg:leading-[1.35]">
            Each article begins with the artist and ends with my best pick: the
            song I keep returning to and why it matters to me.
          </p>
        </div>
      </div>
    </main>
  )
}

export default HeroSection
