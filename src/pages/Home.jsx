import { useState } from 'react';
import Page from '../components/layout/Page';
import HomeHero from '../components/home/HomeHero';
import { HomeIntro, StatsBand, FeaturedVideos, Experiences, MusicPreview, EventsPreview, GalleryPreview } from '../components/home/HomeSections';
import { Marquee } from '../components/ui/Primitives';
import { PhotoStrip } from '../components/media/PhotoWall';
import VideoModal from '../components/media/VideoModal';
import CTASection from '../components/sections/CTASection';
import {
  getPage,
  getPerformanceCategories,
  getFeaturedRelease,
  getRelease,
  getShowcaseVideos,
  getUpcomingEvents,
  getPastEvents,
  getGallery,
  getCleanPhotos,
} from '../services/content';

export default function Home() {
  const page = getPage('home');
  const [video, setVideo] = useState(null);
  const experiences = getPerformanceCategories().filter((c) => ['weddings', 'corporate', 'private', 'concerts'].includes(c.id));
  const featured = getFeaturedRelease();
  const tracks = ['ra-tharakawo', 'adara-mal-pawane', 'ira-paya', 'some-maama-medley', 'thanivee-sitinnai'].map(getRelease).filter(Boolean);
  const gallery = getGallery().filter((g) => g.type === 'image');
  const picks = ['g1', 'g13', 'g3', 'g21', 'g7'].map((id) => gallery.find((g) => g.id === id)).filter(Boolean);
  const photos = getCleanPhotos();

  return (
    <Page meta={page.meta}>
      <HomeHero hero={page.hero} />
      <HomeIntro intro={page.intro} />
      <StatsBand stats={page.stats} />
      <FeaturedVideos videos={getShowcaseVideos()} onPlay={setVideo} />

      <div className="space-y-3 py-6 md:space-y-4">
        <PhotoStrip photos={photos} />
        <div className="py-6 md:py-8">
          <Marquee items={page.marquee} />
        </div>
        <PhotoStrip photos={[...photos].reverse()} reverse />
      </div>

      <Experiences items={experiences} />
      <MusicPreview featured={featured} tracks={tracks} onPlay={setVideo} />
      <EventsPreview upcoming={getUpcomingEvents().slice(0, 2)} past={getPastEvents().slice(0, 4)} />
      <GalleryPreview items={picks} />
      <CTASection {...page.cta} />

      <VideoModal open={!!video} onClose={() => setVideo(null)} video={video} />
    </Page>
  );
}
