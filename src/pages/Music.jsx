import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Page from '../components/layout/Page';
import PageHero from '../components/sections/PageHero';
import SectionIntro from '../components/ui/SectionIntro';
import { Eyebrow, Equalizer } from '../components/ui/Primitives';
import { brandIcon } from '../components/ui/BrandIcons';
import Button from '../components/ui/Button';
import { FeaturedRelease, StreamLinks, VideoCard } from '../components/sections/Music';
import VideoModal from '../components/media/VideoModal';
import CTASection from '../components/sections/CTASection';
import { getPage, getFeaturedRelease, getReleases, getMusicTabs, getPlatforms, getSpotifyEmbedUrl, getChannelUrl, getRelease } from '../services/content';
import { EASE } from '../lib/motion';

export default function Music() {
  const page = getPage('music');
  const featured = getFeaturedRelease();
  const tabs = getMusicTabs();
  const [tab, setTab] = useState(tabs[0].id);
  const [video, setVideo] = useState(null);
  const spotify = getSpotifyEmbedUrl();
  const mostWatched = ['clarence-baila-medley', 'ra-tharakawo', 'ran-tharu-payana', 'thanivee-sitinnai'].map(getRelease).filter(Boolean);
  const list = getReleases(tab);

  return (
    <Page meta={page.meta}>
      <PageHero {...page.hero} index="03" />

      {/* Featured release */}
      <section className="relative overflow-hidden py-20 md:py-32" aria-labelledby="featured-release">
        <div className="pointer-events-none absolute -right-60 top-0 size-[40rem] rounded-full bg-navy/60 blur-[160px]" aria-hidden="true" />
        <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:items-center">
          <FeaturedRelease release={featured} onPlay={setVideo} className="lg:col-span-5" />
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow index="01" data-reveal="">Featured release</Eyebrow>
            <h2 id="featured-release" className="t-mega mt-6" data-reveal="">{featured.title}</h2>
            {featured.native && <p className="mt-3 font-serif text-3xl italic text-fog" data-reveal="">{featured.native}</p>}
            <dl className="mt-8 grid grid-cols-2 border-y border-white/10 py-5 text-sm" data-reveal="">
              <div><dt className="t-eyebrow text-[0.6rem]">Type</dt><dd className="mt-2 text-bone">{featured.format}</dd></div>
              <div><dt className="t-eyebrow text-[0.6rem]">Featuring</dt><dd className="mt-2 text-bone">{featured.featuring || '2Forty2'}</dd></div>
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="">
              <Button onClick={() => setVideo(featured)} size="lg" icon={null}>Watch now</Button>
              <StreamLinks release={featured} />
            </div>
          </div>
        </div>
      </section>

      {/* Most watched */}
      <section className="bg-coal py-20 md:py-32" aria-labelledby="most-watched">
        <div className="container-x">
          <SectionIntro index="02" eyebrow="Most watched" title={['Millions', 'of *views.*']} body="The performances audiences keep coming back to. View counts as shown on the official video artwork." />
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-stagger="">
            {mostWatched.map((r) => (
              <VideoCard key={r.id} release={r} onPlay={setVideo} />
            ))}
          </div>
        </div>
      </section>

      {/* Full catalogue */}
      <section className="py-20 md:py-32" aria-labelledby="catalogue">
        <div className="container-x">
          <SectionIntro index="03" eyebrow="The catalogue" title={['Every', '*session.*']} body="Singles and remakes, medleys and full concert recordings — all from the official channel." />
          <div role="tablist" aria-label="Music category" className="no-scrollbar mt-12 flex gap-8 overflow-x-auto border-b border-white/10">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`relative shrink-0 pb-5 font-display text-lg font-bold uppercase tracking-tight transition-colors md:text-xl ${tab === t.id ? 'text-bone' : 'text-mist hover:text-fog'}`}
              >
                {t.label} <span className="ml-1 text-xs text-mist">{getReleases(t.id).length}</span>
                {tab === t.id && <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-signal" />}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              role="tabpanel"
              id={`panel-${tab}`}
              aria-labelledby={`tab-${tab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE.expo }}
              className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {list.map((r) => (
                <VideoCard key={r.id} release={r} onPlay={setVideo} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Spotify + platforms */}
      <section className="bg-coal py-20 md:py-32" aria-labelledby="listen">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="04" data-reveal="">Listen anywhere</Eyebrow>
            <h2 id="listen" className="t-h1 mt-6" data-reveal="">
              Stream <span className="t-accent text-signal-soft">2Forty2.</span> <Equalizer className="ml-2 align-middle text-signal-soft" />
            </h2>
            <p className="t-lead mt-5" data-reveal="">Follow the band on Spotify and subscribe on YouTube for every new release.</p>
            {spotify && (
              <iframe
                title="2Forty2 on Spotify"
                src={spotify}
                className="mt-8 h-[352px] w-full rounded-xl border-0"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            )}
          </div>

          <ul className="lg:col-span-6 lg:col-start-7 lg:pt-6" data-stagger="">
            {getPlatforms().map((p) => {
              const Icon = brandIcon[p.id];
              const content = (
                <>
                  <span className="flex items-center gap-5">
                    <Icon className="size-7 text-mist transition-colors group-hover:text-signal-soft md:size-8" />
                    <span className="t-h1">{p.label}</span>
                  </span>
                  {p.url ? <ArrowUpRight className="size-7 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.25} /> : <span className="t-eyebrow">Coming soon</span>}
                </>
              );
              return (
                <li key={p.id} className="border-b border-white/10 first:border-t">
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-8">{content}</a>
                  ) : (
                    <div className="flex items-center justify-between gap-4 py-8 opacity-40" aria-disabled="true">{content}</div>
                  )}
                </li>
              );
            })}
            <li className="pt-8">
              <Button href={getChannelUrl()} variant="outline">Subscribe on YouTube</Button>
            </li>
          </ul>
        </div>
      </section>

      <CTASection title={['Hear it', '*live.*']} body="The videos are one thing. Book 2Forty2 and hear these songs in the room." />
      <VideoModal open={!!video} onClose={() => setVideo(null)} video={video} />
    </Page>
  );
}
