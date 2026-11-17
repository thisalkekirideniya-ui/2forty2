import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import AnimatedHeading from '../ui/AnimatedHeading';
import Button from '../ui/Button';
import Img from '../ui/Img';
import { Equalizer } from '../ui/Primitives';
import PhotoWall from '../media/PhotoWall';
import { getSite, getCleanPhotos, getFeaturedEvent } from '../../services/content';
import { formatEventDate } from '../../lib/format';
import { scrollToTarget } from '../../lib/smoothScroll';

const site = getSite();
const WORDMARK = '2FORTY2'.split('');

/** Full-screen hero: a drifting wall of real band photos behind the wordmark. */
export default function HomeHero({ hero }) {
  const next = getFeaturedEvent();
  const d = next && formatEventDate(next.date);

  const explore = () => scrollToTarget('#intro', { offset: -20 });

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10" data-load="scale">
        <PhotoWall photos={getCleanPhotos()} />
      </div>
      <div className="absolute inset-0 -z-10 bg-ink/35" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_75%,rgb(7_8_10/0.55),rgb(7_8_10/0.7)_80%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[60%] bg-gradient-to-t from-ink via-ink/75 to-transparent" />
      <div className="absolute -bottom-40 -left-40 -z-10 size-[42rem] rounded-full bg-navy/60 blur-[120px]" aria-hidden="true" />

      <div className="container-x relative flex flex-1 flex-col justify-end pb-8 pt-28 md:pb-12">
        <div className="mb-auto flex items-start justify-between gap-6 pt-6">
          <p className="t-eyebrow flex flex-wrap items-center gap-3 text-fog" data-load="fade" data-load-delay="0.2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ember" />
            </span>
            Live
            <span className="h-px w-8 bg-white/30" />
            {hero.eyebrow}
            <Equalizer className="ml-1 text-signal-soft" />
          </p>

          {next && (
            <Link
              to="/events"
              className="group hidden w-72 shrink-0 items-center gap-4 rounded-[4px] border border-white/15 bg-ink/60 p-3 pr-4 backdrop-blur-md transition-colors hover:border-signal lg:flex"
              data-load="fade"
              data-load-delay="0.6"
            >
              <span className="h-20 w-16 shrink-0 overflow-hidden rounded-[2px]">
                <Img image={next.image} w={160} sizes="64px" alt="" className="size-full object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="t-eyebrow block text-[0.58rem] text-signal-soft">Up next</span>
                <span className="mt-1 block font-display text-lg font-extrabold uppercase leading-none tracking-tight">{next.title}</span>
                <span className="mt-1.5 block text-xs text-fog">{d.day} {d.month} · {next.venue}</span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
            </Link>
          )}
        </div>

        <h1 id="hero-title" className="mb-8 md:mb-10">
          <span className="sr-only">2Forty2 — Sri Lanka’s concert band</span>
          <span
            className="block whitespace-nowrap font-brand text-[15vw] font-black leading-[0.86] tracking-[-0.01em] sm:text-[11vw] xl:text-[min(10vw,11rem)]"
            data-load="split"
            aria-hidden="true"
          >
            {WORDMARK.map((c, i) => (
              <span key={i} className="split-word">
                <span className="split-inner">{c}</span>
              </span>
            ))}
          </span>
        </h1>

        <div className="grid gap-8 border-t border-white/15 pt-8 lg:grid-cols-12 lg:items-end">
          <AnimatedHeading
            as="p"
            lines={hero.headline}
            load
            delay={0.25}
            className="font-display text-[clamp(1.7rem,3vw,3rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] lg:col-span-5"
          />
          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7" data-load="fade" data-load-delay="0.5">
            <p className="max-w-lg text-base leading-relaxed text-fog md:text-lg">{hero.intro}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button to={site.bookingPath} size="lg" className="w-full sm:w-auto">Book the band</Button>
              <Button variant="outline" size="lg" icon={ArrowDown} onClick={explore} className="w-full sm:w-auto">Explore our world</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-10 right-5 hidden flex-col items-center gap-4 md:right-10 xl:flex" data-load="fade" data-load-delay="0.8" aria-hidden="true">
        <span className="t-eyebrow [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-20 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-1/3 animate-scrollcue bg-bone" />
        </span>
      </div>
    </section>
  );
}
