/**
 * A tilted wall of band photos drifting in alternating directions.
 * Used behind the hero and closing sections. Pure CSS animation, so it is
 * cheap to run. Images load eagerly: lazy images inside a moving track often
 * never load on mobile browsers, leaving blank gaps that look "stuck".
 */
export default function PhotoWall({ photos, columns = 5, className = '', speed = 1 }) {
  const cols = Array.from({ length: columns }, (_, c) =>
    Array.from({ length: Math.min(photos.length, 6) }, (_, i) => photos[(i * columns + c * 3) % photos.length])
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 flex w-[165%] -translate-x-1/2 -translate-y-1/2 -rotate-[9deg] gap-3 md:w-[135%] md:gap-4">
        {cols.map((list, c) => (
          <div key={c} className={`min-w-0 flex-1 ${c >= 3 ? 'hidden md:block' : ''}`}>
            <div
              className={`flex flex-col gap-3 will-change-transform md:gap-4 ${c % 2 ? 'animate-fall' : 'animate-rise'}`}
              style={{ animationDuration: `${(70 + c * 11) / speed}s` }}
            >
              {[...list, ...list].map((ph, i) => (
                <img
                  key={i}
                  src={ph.src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-[3px] object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Horizontal, endlessly scrolling film-strip of photos. */
export function PhotoStrip({ photos, reverse = false, className = '' }) {
  const row = (
    <div className="flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4">
      {photos.map((ph, i) => (
        <img
          key={i}
          src={ph.src}
          alt=""
          loading="eager"
          decoding="async"
          className="h-44 w-auto shrink-0 rounded-[3px] object-cover grayscale transition-[filter] duration-700 hover:grayscale-0 md:h-64"
        />
      ))}
    </div>
  );
  return (
    <div className={`group overflow-hidden ${className}`} aria-hidden="true">
      <div data-skew="" className="origin-center">
      <div className="flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused]" style={{ animationDirection: reverse ? 'reverse' : 'normal', animationDuration: '70s' }}>
        {row}
        {row}
      </div>
      </div>
    </div>
  );
}
