import { useEffect, useState } from 'react'

const COVER_TRANSITION_MS = 360

function VinylAlbumCarousel({ tracks }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousTrack, setPreviousTrack] = useState(null)
  const activeTrack = tracks[activeIndex]

  useEffect(() => {
    if (!previousTrack) return undefined

    const timeoutId = window.setTimeout(
      () => setPreviousTrack(null),
      COVER_TRANSITION_MS,
    )

    return () => window.clearTimeout(timeoutId)
  }, [activeTrack.id, previousTrack])

  const selectTrack = (nextIndex) => {
    if (nextIndex === activeIndex) return

    setPreviousTrack(activeTrack)
    setActiveIndex(nextIndex)
  }

  const selectNextTrack = () => {
    selectTrack((activeIndex + 1) % tracks.length)
  }

  return (
    <div className="w-full max-w-[440px]">
      <div className="relative aspect-[7/5] w-full">
        <div className="absolute left-[32%] top-1/2 z-0 aspect-square w-[68%] -translate-y-1/2">
          <div
            className="vinyl-record vinyl-spin relative h-full w-full rounded-full shadow-[0_16px_28px_rgba(0,0,0,0.28)]"
            aria-hidden="true"
          >
            <div className="absolute left-1/2 top-1/2 aspect-square w-[31%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-black/60 bg-neutral-800">
              <img
                src={activeTrack.image}
                alt=""
                className="h-full w-full object-cover"
              />
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#eeeae2] shadow-[0_0_0_2px_rgba(0,0,0,0.7)]" />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={selectNextTrack}
          aria-label={`Show next song. Currently showing ${activeTrack.bestPick} by ${activeTrack.artist}`}
          className="group absolute left-0 top-1/2 z-10 aspect-square w-[72%] -translate-y-1/2 overflow-hidden rounded-[4px] bg-neutral-100 text-left shadow-[0_14px_30px_rgba(0,0,0,0.22)] outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4"
        >
          {previousTrack && (
            <img
              src={previousTrack.image}
              alt=""
              aria-hidden="true"
              className="album-cover-out absolute inset-0 z-10 h-full w-full object-cover"
            />
          )}
          <img
            key={activeTrack.id}
            src={activeTrack.image}
            alt={`${activeTrack.artist} album artwork for ${activeTrack.bestPick}`}
            className="album-cover-in absolute inset-0 z-20 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015] motion-reduce:transition-none"
          />
        </button>
      </div>

      <div className="mt-4 min-h-[72px] text-center" aria-live="polite">
        <p className="text-xs font-medium uppercase text-muted-foreground">
          {activeTrack.artist}
        </p>
        <p className="mt-1 text-base font-semibold leading-6">
          {activeTrack.bestPick}
        </p>

        <div className="mt-2 flex items-center justify-center" aria-label="Choose a song">
          {tracks.map((track, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={track.id}
                type="button"
                onClick={() => selectTrack(index)}
                aria-label={`Show ${track.bestPick} by ${track.artist}`}
                aria-current={isActive ? 'true' : undefined}
                className="flex h-6 w-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1"
              >
                <span
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${
                    isActive ? 'w-4 bg-foreground' : 'w-1.5 bg-neutral-300'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VinylAlbumCarousel
