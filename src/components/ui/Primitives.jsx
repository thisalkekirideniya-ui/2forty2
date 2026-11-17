/** Small shared building blocks used across every page. */

export function Eyebrow({ index, children, className = '', ...rest }) {
  return (
    <p className={`t-eyebrow flex items-center gap-3 ${className}`} {...rest}>
      {index && <span className="font-brand text-[0.66rem] tracking-[0.1em] text-signal-soft">{index}</span>}
      <span className="h-px w-8 bg-white/30" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/** Honest labelling for demonstration content. */
export function SampleTag({ children = 'Sample content', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-mist ${className}`}>
      <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Animated equaliser bars — the band's "live" signature. */
export function Equalizer({ bars = 4, className = '' }) {
  return (
    <span className={`inline-flex h-3.5 items-end gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom animate-eq rounded-full bg-current"
          style={{ height: '100%', animationDelay: `${i * -0.27}s`, animationDuration: `${0.9 + (i % 3) * 0.25}s` }}
        />
      ))}
    </span>
  );
}

/** Eight-point star separator. */
export function Star({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 0l2.2 7.1L20.5 3.5l-3.6 6.3L24 12l-7.1 2.2 3.6 6.3-6.3-3.6L12 24l-2.2-7.1-6.3 3.6 3.6-6.3L0 12l7.1-2.2L3.5 3.5l6.3 3.6z" />
    </svg>
  );
}

/** Statement paragraph whose words light up while scrolling. */
export function ScrubText({ text, as: Tag = 'p', className = '' }) {
  return (
    <Tag className={className} data-scrub-words="">
      {text.split(' ').map((w, i) => (
        <span key={i} className="scrub-word">
          {w}{' '}
        </span>
      ))}
    </Tag>
  );
}

export function Marquee({ items, className = '', reverse = false }) {
  const row = (hidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className={`t-h2 whitespace-nowrap px-6 md:px-10 ${i % 2 ? 'text-outline' : ''}`}>{item}</span>
          <Star className="size-5 text-signal md:size-7" />
        </span>
      ))}
    </div>
  );
  return (
    <div data-skew="" className={`overflow-hidden ${className}`}>
      <p className="sr-only">{items.join(', ')}</p>
      <div className="flex w-max animate-marquee" style={{ animationDirection: reverse ? 'reverse' : 'normal' }} aria-hidden="true">
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
