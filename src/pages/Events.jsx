import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import Page from '../components/layout/Page';
import PageHero from '../components/sections/PageHero';
import SectionIntro from '../components/ui/SectionIntro';
import Img from '../components/ui/Img';
import { Eyebrow, Equalizer } from '../components/ui/Primitives';
import EventRow, { TicketAction, PriceList } from '../components/sections/EventRow';
import CTASection from '../components/sections/CTASection';
import { getPage, getFeaturedEvent, getUpcomingEvents, getPastEvents } from '../services/content';
import { formatEventDate, pad2 } from '../lib/format';

function useCountdown(iso) {
  const calc = () => Math.max(0, new Date(iso) - Date.now());
  const [ms, setMs] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setMs(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iso]);
  const s = Math.floor(ms / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}

function Countdown({ date }) {
  const t = useCountdown(date);
  return (
    <div className="grid grid-cols-4 border-y border-white/10" role="timer" aria-label={`${t.days} days, ${t.hours} hours and ${t.minutes} minutes to go`}>
      {[['Days', t.days], ['Hours', t.hours], ['Mins', t.minutes], ['Secs', t.seconds]].map(([label, v]) => (
        <div key={label} className="border-r border-white/10 py-5 text-center last:border-r-0" aria-hidden="true">
          <span className="block font-display text-3xl font-extrabold tabular-nums tracking-tight md:text-4xl">{pad2(v)}</span>
          <span className="t-eyebrow text-[0.58rem]">{label}</span>
        </div>
      ))}
    </div>
  );
}

function FeaturedEvent({ event }) {
  const d = formatEventDate(event.date);
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-32" aria-labelledby="featured-event">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img src={event.image.src} alt="" className="size-full scale-125 object-cover opacity-25 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      </div>
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" data-mask="">
          <div className="overflow-hidden rounded-[4px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]">
            <Img image={event.image} priority sizes="(min-width: 1024px) 40vw, 90vw" className="w-full" />
          </div>
          <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-ink/80 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] backdrop-blur">
            <Equalizer className="text-signal-soft" /> Next up
          </span>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow index="01" data-reveal="">{event.presenter || 'Featured event'}</Eyebrow>
          <h2 id="featured-event" className="t-mega mt-6" data-reveal="">{event.title}</h2>
          <p className="t-lead mt-6 max-w-lg" data-reveal="">{event.description}</p>
          <dl className="mt-8 space-y-3 text-sm" data-reveal="">
            <div className="flex gap-4"><dt className="w-20 text-mist">Date</dt><dd><time dateTime={d.iso}>{d.full}</time></dd></div>
            <div className="flex gap-4"><dt className="w-20 text-mist">Time</dt><dd>{d.time} onwards</dd></div>
            <div className="flex gap-4"><dt className="w-20 text-mist">Venue</dt><dd className="flex items-center gap-2"><MapPin className="size-4 text-mist" aria-hidden="true" />{event.venue}, {event.city}</dd></div>
          </dl>
          <div className="mt-8 rounded-[4px] border border-white/10 bg-white/[0.03] p-5" data-reveal="">
            <p className="t-eyebrow mb-3 text-[0.6rem]">Tickets</p>
            <PriceList prices={event.prices} className="text-base" />
          </div>
          <div className="mt-8" data-reveal=""><Countdown date={event.date} /></div>
          <div className="mt-8" data-reveal=""><TicketAction event={event} /></div>
        </div>
      </div>
    </section>
  );
}

export default function Events() {
  const page = getPage('events');
  const featured = getFeaturedEvent();
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <Page meta={page.meta}>
      <PageHero {...page.hero} index="05" />

      {featured && <FeaturedEvent event={featured} />}

      <section className="bg-coal py-20 md:py-32" aria-labelledby="upcoming">
        <div className="container-x">
          <SectionIntro index="02" eyebrow="Upcoming performances" title={['On the', '*calendar.*']} body="Public concerts are listed here as they are announced. Private events are not shown." />
          <div className="mt-12" data-stagger="">
            {upcoming.length ? (
              upcoming.map((ev) => <EventRow key={ev.id} event={ev} />)
            ) : (
              <p className="border-t border-white/10 py-10 text-mist">No public dates announced right now — check back soon.</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" aria-labelledby="archive">
        <div className="container-x">
          <SectionIntro index="03" eyebrow="Past performances" title={['The', '*archive.*']} body="Headline nights and concert series already played." />
          {[past.filter((e) => e.poster), past.filter((e) => !e.poster)].map((group, gi) => group.length > 0 && (
          <div key={gi} className={gi ? 'mt-16' : ''}>
          <p className="t-eyebrow mt-12" data-reveal="">{gi ? 'Concert history' : 'Recent headline nights'}</p>
          <ul className={`mt-6 grid gap-x-4 gap-y-10 md:gap-x-6 ${gi ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`} data-stagger="">
            {group.map((ev) => {
              const d = formatEventDate(ev.date);
              return (
                <li key={ev.id} className="group">
                  <div className={`relative overflow-hidden rounded-[3px] bg-coal ${ev.poster ? 'aspect-[4/5]' : 'aspect-video'}`}>
                    <Img image={ev.image} sizes="(min-width: 1024px) 25vw, 50vw" className="size-full object-cover grayscale transition-all duration-[1.2s] ease-expo group-hover:scale-105 group-hover:grayscale-0" />
                    <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-ink/70 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] backdrop-blur">Completed</span>
                  </div>
                  <p className="t-eyebrow mt-4 text-[0.6rem]">
                    {ev.dateLabel ? ev.dateLabel : <time dateTime={d.iso}>{d.day} {d.month} {d.year}</time>} · {ev.type}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold uppercase leading-tight tracking-tight md:text-xl">{ev.title}</h3>
                  <p className="mt-1 text-sm text-mist">{[ev.venue, ev.city].filter(Boolean).join(', ')}</p>
                </li>
              );
            })}
          </ul>
          </div>
          ))}
        </div>
      </section>

      <CTASection title={['Put your event', 'on the *calendar.*']} body="Planning a celebration, gala or concert? Check the band’s availability for your date." />
    </Page>
  );
}
