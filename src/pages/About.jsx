import Page from '../components/layout/Page';
import PageHero from '../components/sections/PageHero';
import CTASection from '../components/sections/CTASection';
import Timeline from '../components/sections/Timeline';
import SectionIntro from '../components/ui/SectionIntro';
import AnimatedHeading from '../components/ui/AnimatedHeading';
import Img from '../components/ui/Img';
import { Eyebrow, Star } from '../components/ui/Primitives';
import { PhotoStrip } from '../components/media/PhotoWall';
import { images } from '../data/media';
import { getPage, getMembers, getFeaturedVoices, getGuestArtists, getTimeline, getMilestones, getCleanPhotos } from '../services/content';

export default function About() {
  const page = getPage('about');
  const { story, identity } = page;
  const members = getMembers();

  return (
    <Page meta={page.meta}>
      <PageHero {...page.hero} index="01" />

      {/* The story */}
      <section className="py-20 md:py-32" aria-labelledby="story-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="01" data-reveal="">The story behind 2Forty2</Eyebrow>
            <h2 id="story-title" className="t-statement mt-8" data-reveal="">{story.lead}</h2>
          </div>
          <div className="space-y-6 lg:col-span-6 lg:col-start-7 lg:pt-16" data-stagger="">
            {story.paragraphs.map((p, i) => (
              <p key={i} className={`t-lead ${i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-extrabold first-letter:leading-[0.85] first-letter:text-signal-soft' : ''}`}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="container-x mt-16 grid gap-4 md:mt-24 md:grid-cols-12 md:gap-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[3px] bg-coal md:col-span-8" data-mask="">
            <div className="absolute inset-[-8%_0]" data-parallax="6">
              <Img image={story.images[0]} sizes="(min-width: 768px) 66vw, 100vw" className="size-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 md:col-span-4">
            <blockquote className="font-serif text-2xl italic leading-tight text-bone md:text-3xl" data-reveal="">
              <span className="text-signal-soft">“</span>{story.quote}<span className="text-signal-soft">”</span>
            </blockquote>
            <div className="aspect-square overflow-hidden rounded-[3px] bg-coal" data-mask="">
              <Img image={story.images[1]} sizes="(min-width: 768px) 33vw, 100vw" className="size-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="border-y border-white/10 bg-coal" aria-labelledby="milestones">
        <h2 id="milestones" className="sr-only">Achievements and milestones</h2>
        <dl className="container-x grid sm:grid-cols-2 lg:grid-cols-4" data-stagger="">
          {getMilestones().map((m, i) => (
            <div key={m.id} className={`py-10 md:py-14 ${i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-10' : ''} ${i % 2 ? 'sm:border-l sm:border-white/10 sm:pl-8 lg:pl-10' : ''}`}>
              <dd className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">
                {m.value}<span className="text-signal-soft">.</span>
              </dd>
              <dt className="mt-3 font-display text-sm font-bold uppercase tracking-tight">{m.label}</dt>
              <p className="mt-2 max-w-[16rem] text-sm text-mist">{m.text}</p>
            </div>
          ))}
        </dl>
      </section>

      {/* Musical identity */}
      <section className="relative overflow-hidden py-20 md:py-32" aria-labelledby="identity">
        <div className="pointer-events-none absolute -left-40 top-1/3 size-[36rem] rounded-full bg-navy/70 blur-[140px]" aria-hidden="true" />
        <div className="container-x relative">
          <SectionIntro index="02" eyebrow="Musical identity & style" title={['Classics,', '*reborn.*']} body="What 2Forty2 stands for on every stage." />
          <ol className="mt-14 grid border-t border-white/10 md:grid-cols-3" data-stagger="">
            {identity.pillars.map((p, i) => (
              <li key={p.title} className="border-b border-white/10 py-10 md:border-b-0 md:border-r md:px-10 md:first:pl-0 md:last:border-r-0">
                <span className="font-brand text-xs text-signal-soft">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="t-h2 mt-5">{p.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-mist">{p.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16">
            <p className="t-eyebrow mb-6" data-reveal="">The sound</p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2" data-stagger="">
              {identity.styles.map((s, i) => (
                <li key={s} className="flex items-center gap-5">
                  <span className={`t-h1 ${i % 2 ? 'text-outline' : ''}`}>{s}</span>
                  {i < identity.styles.length - 1 && <Star className="size-4 text-signal" />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PhotoStrip photos={getCleanPhotos()} className="pb-4" />

      {/* The collective + line-up */}
      <section className="py-20 md:py-32" aria-labelledby="members">
        <div className="container-x">
          <SectionIntro
            index="03"
            eyebrow="Band members"
            title={['The people', 'behind the *sound.*']}
            body="A family of singers and musicians, led by co-founder Billy Fernando."
          />

          <figure className="mt-12 overflow-hidden rounded-[4px] bg-bone md:mt-16" data-mask="">
            <Img image={images.bandSuits} sizes="100vw" className="mx-auto w-full max-w-4xl object-contain" />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 px-5 py-4 text-ink md:px-8">
              <span className="font-display text-lg font-extrabold uppercase tracking-tight">The 2Forty2 collective</span>
              <span className="text-xs uppercase tracking-[0.2em] text-ink/60">Fusion · Culture · Class</span>
            </figcaption>
          </figure>

          <ul className="mt-6 grid grid-cols-2 gap-4 md:mt-8 md:gap-6 lg:grid-cols-4" data-stagger="">
            {members.map((m, i) => (
              <li key={m.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[3px] bg-coal">
                  <Img image={m.image} sizes="(min-width: 1024px) 25vw, 50vw" className="size-full object-cover object-top grayscale transition-all duration-[1.2s] ease-expo group-hover:scale-105 group-hover:grayscale-0 pointer-coarse:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                  <span className="absolute left-3 top-3 font-brand text-[0.6rem] font-bold text-bone/80">{String(i + 1).padStart(2, '0')}</span>
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <p className="t-eyebrow text-[0.6rem] text-signal-soft">{m.role}</p>
                    <p className="mt-1 font-display text-lg font-extrabold uppercase leading-tight tracking-tight md:text-xl">{m.name || 'Name to be confirmed'}</p>
                    {m.note && <p className="mt-0.5 text-xs text-fog">{m.note}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-2" data-reveal="">
            <div>
              <p className="t-eyebrow mb-5">Voices on 2Forty2 releases</p>
              <ul className="flex flex-wrap gap-2">
                {getFeaturedVoices().map((n) => (
                  <li key={n} className="rounded-full border border-white/15 px-4 py-2 text-sm">{n}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="t-eyebrow mb-5">Guest artists</p>
              <ul className="flex flex-wrap gap-2">
                {getGuestArtists().map((n) => (
                  <li key={n} className="rounded-full border border-white/10 px-4 py-2 text-sm text-fog">{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-coal py-20 md:py-32" aria-labelledby="journey">
        <div className="container-x">
          <div className="mb-16 text-center md:mb-24">
            <Eyebrow index="04" className="justify-center" data-reveal="">Band history & journey</Eyebrow>
            <AnimatedHeading lines={['The *journey*', 'so far.']} className="t-h1 mt-6" />
          </div>
          <Timeline items={getTimeline()} />
        </div>
      </section>

      <CTASection {...page.cta} />
    </Page>
  );
}
