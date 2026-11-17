import { images, ytStill } from './media';

/**
 * GALLERY — Future: GET /api/gallery?category=
 * ratio drives the masonry tile shape so there is no layout shift on load.
 */
export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live' },
  { id: 'band', label: 'The band' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'posters', label: 'Posters' },
  { id: 'video', label: 'Videos' },
];

export const gallery = [
  { id: 'g1', type: 'image', category: 'live', image: images.liveStageWide, caption: 'Singing to the room', ratio: '738/384' },
  { id: 'g2', type: 'image', category: 'band', image: images.bandSuits, caption: 'The collective', ratio: '528/378' },
  { id: 'g3', type: 'image', category: 'live', image: images.livePercussion, caption: 'Ordnance Rhythm Night', ratio: '387/516' },
  { id: 'g4', type: 'video', category: 'video', image: ytStill('XQH8qUhhQ7U', 'Gypsies Baila Medley'), youtubeId: 'XQH8qUhhQ7U', caption: 'Gypsies Baila Medley', ratio: '16/9' },
  { id: 'g5', type: 'image', category: 'posters', image: images.posterPadura, caption: 'Padura — Heritance Negombo', ratio: '399/501' },
  { id: 'g6', type: 'image', category: 'live', image: images.liveVocalTrio, caption: 'Three voices', ratio: '527/379' },
  { id: 'g7', type: 'image', category: 'sessions', image: images.acousticSession, caption: 'Acoustic session', ratio: '1/1' },
  { id: 'g21', type: 'image', category: 'live', image: images.liveBillyStage, caption: 'Hands in the air', ratio: '1/1' },
  { id: 'g8', type: 'image', category: 'live', image: images.liveGuitarTrio, caption: 'Guitars at Sarigama', ratio: '547/365' },
  { id: 'g9', type: 'video', category: 'video', image: ytStill('_YnAkndPOz0', 'The Clarence Baila Medley'), youtubeId: '_YnAkndPOz0', caption: 'The Clarence Baila Medley', ratio: '16/9' },
  { id: 'g10', type: 'image', category: 'band', image: images.bandBrickwall, caption: 'Off duty', ratio: '512/362' },
  { id: 'g11', type: 'image', category: 'live', image: images.liveStageBlue, caption: 'Lifted', ratio: '335/597' },
  { id: 'g12', type: 'image', category: 'posters', image: images.posterLive, caption: '2Forty2 Live — Ramadia Grand', ratio: '494/619' },
  { id: 'g13', type: 'image', category: 'sessions', image: images.bailaSession, caption: 'Baila Session', ratio: '1/1' },
  { id: 'g14', type: 'video', category: 'video', image: ytStill('-Q-XRJyvtb0', 'Ra Tharakawo'), youtubeId: '-Q-XRJyvtb0', caption: 'Ra Tharakawo', ratio: '16/9' },
  { id: 'g15', type: 'image', category: 'band', image: images.bandLineup, caption: 'The line-up', ratio: '738/411' },
  { id: 'g16', type: 'image', category: 'posters', image: images.posterOrdnance, caption: 'Ordnance Rhythm Night', ratio: '335/597' },
  { id: 'g17', type: 'video', category: 'video', image: images.bajawMedley, youtubeId: '7sO6HYyJJdE', caption: 'Bajaw Medley — Ultimate Band Show', ratio: '316/632' },
  { id: 'g18', type: 'video', category: 'video', image: ytStill('9z7NTNVg1Sc', 'Dance Reggae Medley'), youtubeId: '9z7NTNVg1Sc', caption: 'Dance Reggae Medley', ratio: '16/9' },
  { id: 'g19', type: 'video', category: 'video', image: images.coverRaAhase, youtubeId: '3Ox434RFP28', caption: 'Ra Ahase — Ultimate Band Show', ratio: '494/619' },
  { id: 'g20', type: 'video', category: 'video', image: ytStill('Bp6N6NSu56M', 'Me Raathriye'), youtubeId: 'Bp6N6NSu56M', caption: 'Me Raathriye — Ra Ahase Live 2023', ratio: '16/9' },
];
