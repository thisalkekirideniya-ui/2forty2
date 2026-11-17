/**
 * IMAGE LIBRARY — official 2Forty2 photography
 * -------------------------------------------------------------------------
 * Band photos, posters and covers live in /public/photos.
 * HD video stills come from the band's official YouTube channel and are stored
 * in /public/photos/yt/<videoId>.jpg.
 * Every entry is { src, alt }, so a CMS/S3 URL from the future admin API can
 * replace it 1:1. Higher-resolution originals can be dropped in with the same
 * file names for a sharper result.
 */
const p = (file, alt) => ({ src: `/photos/${file}`, alt });

export const images = {
  // Band
  bandLineup: p('band-lineup.jpg', '2Forty2 line-up in leather jackets beneath the 2FORTY2 logo'),
  bandSuits: p('band-suits.jpg', 'The 2Forty2 collective in black suits, seated with an acoustic guitar'),
  bandBrickwall: p('band-brickwall.jpg', '2Forty2 members posing playfully against a brick wall with guitars'),

  // Live
  liveStageWide: p('live-stage-wide.jpg', 'Billy Fernando singing to a guest on a lit stage with the band behind'),
  liveVocalTrio: p('live-vocal-trio.jpg', 'Billy Fernando sharing the microphone with two vocalists on stage'),
  liveBillyStage: p('live-billy-stage.jpg', 'Billy Fernando pointing to the crowd on stage with a vocalist and the band behind'),
  liveGuitarTrio: p('live-guitar-trio.jpg', 'Three 2Forty2 guitarists playing side by side under stage light'),
  liveStageBlue: p('live-stage-blue.jpg', 'A playful moment on stage under blue concert lights'),
  livePercussion: p('live-percussion.jpg', '2Forty2 percussionist smiling behind congas at Ordnance Rhythm Night'),
  acousticSession: p('acoustic-session.jpg', 'Acoustic 2Forty2 session with vocals and guitar in a brick-walled room'),
  bailaSession: p('baila-session.jpg', '2Forty2 vocalists in matching floral outfits at a Baila Session'),

  // Release art & video stills (with titles)
  coverAdara: p('cover-adara-mal-pawane.jpg', 'Adara Mal Pawane — 2Forty2 cover art'),
  coverIraPaya: p('cover-ira-paya.jpg', 'Ira Paya — 2Forty2 cover art'),
  coverLankawe: p('cover-lankawe-kello.jpg', 'Lankawe Kello Lassanai — 2Forty2 cover art'),
  coverRaAhase: p('cover-ra-ahase.jpg', 'Ra Ahase acoustic version — live at the Ultimate Band Show'),
  bajawMedley: p('bajaw-medley.jpg', 'Bajaw Medley — Billy Fernando with acoustic guitar'),
  gypsiesMedley: p('gypsies-medley.jpg', 'Gypsies Baila Medley — 2Forty2'),
  someMaamaMedley: p('some-maama-medley.jpg', 'Some Maama Baila Medley — 2Forty2'),

  // Posters
  posterPadura: p('poster-padura.jpg', 'Padura poster — 2Forty2, 11 December, Heritance Negombo'),
  posterLive: p('poster-2forty2-live.jpg', '2Forty2 Live poster — 14 March 2026, Ramadia Grand, Moratuwa'),
  posterOrdnance: p('poster-ordnance.jpg', 'Ordnance Rhythm Night poster featuring 2Forty2'),

  // Line-up portraits (cropped from live photography)
  memberBilly: p('member-billy.jpg', 'Billy Fernando, lead vocalist of 2Forty2, singing on stage'),
  memberVocals: p('member-vocals.jpg', '2Forty2 vocalist performing at an acoustic session'),
  memberGuitar: p('member-guitar.jpg', '2Forty2 guitarist on stage'),
  memberPercussion: p('member-percussion.jpg', '2Forty2 percussionist on stage'),
};

/** Clean photographs (no text overlays) — used for photo walls and strips. */
export const cleanPhotos = [
  images.liveStageWide,
  images.bandSuits,
  images.liveBillyStage,
  images.liveGuitarTrio,
  images.liveVocalTrio,
  images.acousticSession,
  images.livePercussion,
  images.bandBrickwall,
  images.liveStageBlue,
  images.bailaSession,
  images.bandLineup,
];

/** HD still from an official 2Forty2 YouTube video. */
export const ytStill = (id, alt = '') => ({ src: `/photos/yt/${id}.jpg`, alt });

/** Builds an optimised, responsive URL for supported remote image hosts. */
export function imageUrl(src, { w = 1200, h, q = 70 } = {}) {
  if (!src) return '';
  if (src.includes('images.unsplash.com')) {
    const params = new URLSearchParams({ auto: 'format', fit: 'crop', w: String(w), q: String(q) });
    if (h) params.set('h', String(h));
    return `${src}?${params.toString()}`;
  }
  return src;
}
