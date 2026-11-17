/**
 * CONTENT SERVICE
 * -------------------------------------------------------------------------
 * The ONLY place components get content from. Today it reads local data
 * synchronously; in the backend phase each getter can be replaced with a
 * fetch to the Node.js/MongoDB API without touching component markup.
 */
import { site } from '../data/site';
import { pages } from '../data/pages';
import { members, featuredVoices, guestArtists, timeline, milestones } from '../data/band';
import { events } from '../data/events';
import { releases, musicTabs, featuredReleaseId, showcaseVideoIds, platforms, spotifyEmbedUrl, CHANNEL_URL } from '../data/music';
import { gallery, galleryCategories } from '../data/gallery';
import { performanceCategories, packages, bookingEventTypes, audienceSizes } from '../data/performances';
import { cleanPhotos } from '../data/media';

export const getSite = () => site;
export const getPage = (slug) => pages[slug];
export const getCleanPhotos = () => cleanPhotos;

export const getMembers = () => [...members].sort((a, b) => a.order - b.order);
export const getFeaturedVoices = () => featuredVoices;
export const getGuestArtists = () => guestArtists;
export const getTimeline = () => timeline;
export const getMilestones = () => milestones;

const byDateAsc = (a, b) => new Date(a.date) - new Date(b.date);
export const getUpcomingEvents = (now = new Date()) => events.filter((e) => new Date(e.date) >= now).sort(byDateAsc);
export const getPastEvents = (now = new Date()) => events.filter((e) => new Date(e.date) < now).sort((a, b) => byDateAsc(b, a));
export const getFeaturedEvent = () => {
  const upcoming = getUpcomingEvents();
  return upcoming.find((e) => e.featured) || upcoming[0] || null;
};

export const getReleases = (kind) => (kind ? releases.filter((r) => r.kind === kind) : releases);
export const getRelease = (id) => releases.find((r) => r.id === id);
export const getFeaturedRelease = () => getRelease(featuredReleaseId) || releases[0];
export const getShowcaseVideos = () => showcaseVideoIds.map(getRelease).filter(Boolean);
export const getMusicTabs = () => musicTabs;
export const getPlatforms = () => platforms;
export const getSpotifyEmbedUrl = () => spotifyEmbedUrl;
export const getChannelUrl = () => CHANNEL_URL;

export const getGallery = () => gallery;
export const getGalleryCategories = () => galleryCategories;

export const getPerformanceCategories = () => performanceCategories;
export const getPackages = () => packages;
export const getBookingOptions = () => ({ eventTypes: bookingEventTypes, audienceSizes });
