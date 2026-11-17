import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Img from '../ui/Img';
import { TextLink } from '../ui/Button';
import SectionIntro from '../ui/SectionIntro';
import { Eyebrow, ScrubText } from '../ui/Primitives';
import EventRow from '../sections/EventRow';
import { FeaturedRelease, TrackRow, VideoCard } from '../sections/Music';
import { gsap } from '../../lib/motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { formatEventDate } from '../../lib/format';

/* ------------------------------------------------------------------ */
/* B. Band introduction — statement + three-photo composition          */
/* ------------------------------------------------------------------ */
/** Big editorial statement with photo capsules set inline between the words. */
function Statement({ parts, label }) {
  return (
    <h2
      aria-label={label}
      data-scrub-words=""
      className="mx-auto max-w-6xl text-balance text-center md:max-w-none md:text-wrap font-display text-[clamp(1.4rem,2.95vw,3rem)] font-extrabold uppercase leading-[1.15] tracking-[-0.03em]"
    >
      {parts.map((part, i) =>
        part.br ? (
          <br key={i} className="hidden md:block" />
        ) : part.image ? (
          <span
            key={i}
            data-pill=""
            aria-hidden="true"
            className="scrub-word relative mx-[0.12em] inline-block h-[0.82em] w-[1.9em] overflow-hidden rounded-full align-[-0.06em] ring-1 ring-white/15"
          >
            <img src={part.image.src} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
          </span>
        ) : (
          part.text.split(' ').map((w, j) => {
            const accent = part.text.startsWith('*');
            const word = w.replace(/\*/g, '');
            return (
              <span key={`${i}-${j}`} aria-hidden="true" className={`scrub-word ${accent ? 't-accent normal-case text-signal-soft' : ''}`}>
                {word}{' '}
              </span>
            );
          })
        )
      )}
    </h2>
  );
}

export function HomeIntro({ intro }) {
  const [a, b, c] = intro.images;
  return (
    <section id="intro" className="relative scroll-mt-10 overflow-hidden py-20 md:py-32" aria-labelledby="intro-label">
      <div className="pointer-events-none absolute -right-48 top-10 size-[34rem] rounded-full bg-navy/50 blur-[140px]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="flex flex-col items-center gap-3 text-center" data-reveal="">
          <Eyebrow index="01" id="intro-label">The band</Eyebrow>
          <p className="t-eyebrow text-[0.62rem] text-fog">Fusion · Culture · Class</p>
        </div>
        <div className="mt-8 md:mt-10">
          {intro.statementParts ? (
            <Statement parts={intro.statementParts} label={intro.statement} />
          ) : (
            <ScrubText text={intro.statement} className="t-statement max-w-5xl" />
          )}
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-12 md:gap-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-coal md:col-span-7 md:aspect-auto md:min-h-[440px]" data-mask="">
            <div className="absolute inset-[-8%_0]" data-parallax="6">
              <Img image={a} w={1100} sizes="(min-width: 768px) 58vw, 100vw" className="size-full object-cover" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-5 md:grid-cols-1 md:gap-6">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[3px] bg-coal md:aspect-[16/10]" data-mask="">
              <Img image={b} w={700} sizes="(min-width: 768px) 40vw, 50vw" className="size-full object-cover object-top" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[3px] bg-bone md:aspect-[16/10]" data-mask="">
              <Img image={c} w={700} sizes="(min-width: 768px) 40vw, 50vw" className="size-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-12" data-reveal="">
          <p className="t-lead md:col-span-6">{intro.body}</p>
          <div className="md:col-span-5 md:col-start-8 md:text-right">
            <TextLink to="/about">Our story</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stats band                                                          */
/* ------------------------------------------------------------------ */
export function StatsBand({ stats }) {
  return (
    <section aria-label="2Forty2 in numbers" className="border-y border-white/10 bg-coal">
      <dl className="container-x grid grid-cols-2 lg:grid-cols-4" data-stagger="">
        {stats.map((s, i) => (
          <div key={s.label} className={`flex flex-col gap-2 py-8 md:py-12 ${i % 2 ? 'pl-6 md:pl-10' : ''} ${i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-10' : ''} ${i === 1 ? 'border-l border-white/10' : ''} ${i === 3 ? 'border-l border-white/10' : ''}`}>
            <dt className="order-2 text-xs leading-snug text-mist md:text-sm">{s.label}</dt>
            <dd className="order-1 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              {s.value}
              <span className="text-signal-soft">.</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* C. Featured performances — real official videos                     */
/* ------------------------------------------------------------------ */
export function FeaturedVideos({ videos, onPlay }) {
  const [lead, ...rest] = videos;
  return (
    <section className="py-20 md:py-32" aria-labelledby="featured-perf">
      <div className="container-x">
        <SectionIntro
          index="02"
          eyebrow="Featured performances"
          title={['Press', '*play.*']}
          body="Medleys, remakes and live moments from the official 2Forty2 channel — watch without leaving the site."
          action={<TextLink to="/music">All videos</TextLink>}
        />
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-16" data-stagger="">
          {[lead, ...rest].slice(0, 4).map((v) => (
            <VideoCard key={v.id} release={v} onPlay={onPlay} size="lg" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* D. Musical experiences — hover list with cursor-following imagery   */
/* ------------------------------------------------------------------ */
export function Experiences({ items }) {
  const [active, setActive] = useState(-1);
  const area = useRef(null);
  const floater = useRef(null);
  const fine = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 1024px)');

  useEffect(() => {
    if (!fine) return;
    const el = floater.current;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' });
    const move = (e) => {
      const r = area.current.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    };
    const node = area.current;
    node.addEventListener('pointermove', move);
    return () => node.removeEventListener('pointermove', move);
  }, [fine]);

  return (
    <section className="relative py-20 md:py-32" aria-labelledby="exp-title">
      <div className="container-x">
        <SectionIntro
          index="03"
          eyebrow="Musical experiences"
          title={['Music for', 'every *moment.*']}
          body="Concert stages, wedding receptions, corporate galas and private parties — one standard of performance."
          action={<TextLink to="/performances">All performances</TextLink>}
        />

        <div ref={area} className="relative mt-12 md:mt-16" onPointerLeave={() => setActive(-1)}>
          {fine && (
            <div
              ref={floater}
              className={`pointer-events-none absolute left-0 top-0 z-10 aspect-[4/5] w-[20rem] overflow-hidden rounded-[3px] shadow-2xl transition-[opacity,scale] duration-500 ease-expo ${active >= 0 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
              aria-hidden="true"
            >
              {items.map((it, i) => (
                <Img key={it.id} image={it.image} sizes="20rem" alt="" className={`absolute inset-0 size-full object-cover transition-all duration-700 ease-expo ${i === active ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`} />
              ))}
            </div>
          )}

          <ul data-stagger="">
            {items.map((it, i) => (
              <li key={it.id} className="border-t border-white/10 last:border-b">
                <Link
                  to={`/performances#${it.id}`}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(-1)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[4rem_1fr_18rem_3rem] md:py-8"
                >
                  <span className="font-brand text-xs text-mist transition-colors group-hover:text-signal-soft">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`t-h1 transition-all duration-700 ease-expo group-hover:translate-x-4 ${active >= 0 && active !== i ? 'text-bone/25' : 'text-bone'}`}>{it.title}</span>
                  <span className="hidden text-sm text-mist md:block">{it.teaser}</span>
                  <span className="grid size-11 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal">
                    <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  {!fine && (
                    <span className="col-span-3 mt-2 block aspect-[16/9] overflow-hidden rounded-[3px]">
                      <Img image={it.image} sizes="100vw" alt="" className="size-full object-cover" />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* E. Music preview                                                    */
/* ------------------------------------------------------------------ */
export function MusicPreview({ featured, tracks, onPlay }) {
  return (
    <section className="relative overflow-hidden bg-coal py-20 md:py-32" aria-labelledby="music-title">
      <div className="pointer-events-none absolute -right-40 top-20 size-[36rem] rounded-full bg-navy/60 blur-[140px]" aria-hidden="true" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <FeaturedRelease release={featured} onPlay={onPlay} />
          <div className="mt-8" data-reveal="">
            <p className="t-eyebrow mb-3 text-signal-soft">Featured · {featured.format}</p>
            <p className="t-h2">{featured.title}</p>
            {featured.native && <p className="mt-1 text-lg text-fog">{featured.native}</p>}
            {featured.featuring && <p className="mt-2 text-sm text-mist">Ft. {featured.featuring}</p>}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow index="04" data-reveal="">Music</Eyebrow>
          <h2 id="music-title" className="t-h2 mt-6" data-reveal="">
            Originals, remakes <span className="t-accent text-signal-soft">&amp; medleys.</span>
          </h2>
          <p className="t-lead mt-5 max-w-lg" data-reveal="">
            Classic Sinhala songs reborn with a full band, plus 2Forty2 originals. Tap any track to watch.
          </p>
          <ol className="mt-10 border-b border-white/10" data-stagger="">
            {tracks.map((t, i) => (
              <TrackRow key={t.id} release={t} index={i} onPlay={onPlay} />
            ))}
          </ol>
          <div className="mt-8" data-reveal="">
            <TextLink to="/music">Explore the music</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* F. Events                                                           */
/* ------------------------------------------------------------------ */
export function EventsPreview({ upcoming, past }) {
  return (
    <section className="py-20 md:py-32" aria-labelledby="events-preview">
      <div className="container-x">
        <SectionIntro
          index="05"
          eyebrow="Upcoming events"
          title={['Catch us', '*live.*']}
          body="Public concerts and headline nights. For private bookings, send an inquiry."
          action={<TextLink to="/events">All events</TextLink>}
        />
        <div className="mt-12 md:mt-16" data-stagger="">
          {upcoming.map((ev) => (
            <EventRow key={ev.id} event={ev} />
          ))}
        </div>

        {past.length > 0 && (
          <div className="mt-14">
            <p className="t-eyebrow mb-6" data-reveal="">Recently on stage</p>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6" data-stagger="">
              {past.map((ev) => (
                <li key={ev.id}>
                  <Link to="/events" className="group block">
                    <span className="block aspect-[4/5] overflow-hidden rounded-[3px] bg-coal">
                      <Img image={ev.image} sizes="(min-width: 768px) 25vw, 50vw" className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                    </span>
                    <span className="t-eyebrow mt-3 block text-[0.6rem]">{ev.dateLabel || `${formatEventDate(ev.date).month} ${formatEventDate(ev.date).year}`}</span>
                    <span className="mt-1 block font-display text-sm font-bold uppercase tracking-tight md:text-base">{ev.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* G. Gallery preview                                                  */
/* ------------------------------------------------------------------ */
function Tile({ item, aspect, className = '' }) {
  return (
    <Link to="/media" className={`group relative block overflow-hidden rounded-[3px] bg-coal ${aspect} ${className}`} data-cursor="View" data-mask="">
      <Img image={item.image} sizes="(min-width: 768px) 50vw, 100vw" className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-110" />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-coarse:opacity-100" />
      <span className="absolute bottom-4 left-4 translate-y-4 font-display text-sm font-bold uppercase tracking-tight opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100 pointer-coarse:translate-y-0 pointer-coarse:opacity-100 md:text-base">
        {item.caption}
      </span>
    </Link>
  );
}

export function GalleryPreview({ items }) {
  const [a, b, c, d, e, f] = items;
  return (
    <section className="relative py-20 md:py-32" aria-labelledby="gallery-preview">
      <div className="container-x">
        <SectionIntro
          index="06"
          eyebrow="Gallery"
          title={['Frames from', 'the *stage.*']}
          body="Live photography, band portraits and the moments in between."
          action={<TextLink to="/media">Full gallery</TextLink>}
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-12 md:gap-6">
          <Tile item={a} aspect="aspect-[16/10]" className="col-span-2 md:col-span-7" />
          <Tile item={b} aspect="aspect-[4/3] md:aspect-auto" className="md:col-span-5" />
          <Tile item={c} aspect="aspect-[4/3] md:aspect-auto" className="md:col-span-4" />
          <Tile item={d} aspect="aspect-[4/3]" className="md:col-span-4" />
          <Tile item={e} aspect="aspect-[4/3]" className="md:col-span-4" />
          {f && <Tile item={f} aspect="aspect-[21/9]" className="col-span-2 hidden md:col-span-12 md:block" />}
        </div>
      </div>
    </section>
  );
}
