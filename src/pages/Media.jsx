import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Page from '../components/layout/Page';
import PageHero from '../components/sections/PageHero';
import GalleryGrid from '../components/sections/GalleryGrid';
import Lightbox from '../components/media/Lightbox';
import VideoModal from '../components/media/VideoModal';
import CTASection from '../components/sections/CTASection';
import { getPage, getGallery, getGalleryCategories } from '../services/content';

export default function Media() {
  const page = getPage('media');
  const all = getGallery();
  const categories = getGalleryCategories();
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [video, setVideo] = useState(null);

  const items = useMemo(() => (filter === 'all' ? all : all.filter((g) => g.category === filter)), [filter, all]);
  const photos = useMemo(() => items.filter((g) => g.type === 'image'), [items]);
  const count = (id) => (id === 'all' ? all.length : all.filter((g) => g.category === id).length);

  const open = (item) => {
    if (item.type === 'video') setVideo({ youtubeId: item.youtubeId, src: item.src, title: item.caption, poster: item.image });
    else setLightboxIndex(photos.findIndex((p) => p.id === item.id));
  };

  return (
    <Page meta={page.meta}>
      <PageHero {...page.hero} index="04" />

      <section className="py-20 md:py-28" aria-label="Gallery">
        <div className="sticky top-0 z-30 mb-10 border-b border-white/10 bg-ink/85 backdrop-blur-xl md:mb-14">
          <div className="container-x flex items-center justify-between gap-6">
            <div role="group" aria-label="Filter gallery" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto py-4">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilter(c.id)}
                  aria-pressed={filter === c.id}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${filter === c.id ? 'text-ink' : 'text-fog hover:text-bone'}`}
                >
                  {filter === c.id && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />}
                  <span className="relative">
                    {c.label} <span className="opacity-50">{count(c.id)}</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="hidden shrink-0 text-xs uppercase tracking-[0.2em] text-mist md:block" aria-live="polite">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        <div className="container-x">
          <GalleryGrid items={items} onOpen={open} />
        </div>
      </section>

      <CTASection title={['Be part of', 'the *next frame.*']} body="Book 2Forty2 and make your event the next story in the gallery." />

      <Lightbox items={photos} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />
      <VideoModal open={!!video} onClose={() => setVideo(null)} video={video} />
    </Page>
  );
}
