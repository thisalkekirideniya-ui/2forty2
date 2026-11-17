import { images, ytStill } from './media';

/**
 * LINE-UP — Future: GET /api/members
 * Only names confirmed by public sources are shown. Roles whose member name
 * is not yet confirmed render "Name to be confirmed".
 */
export const members = [
  { id: 'billy', name: 'Billy Fernando', role: 'Lead Vocals', note: 'Co-founder & frontman', image: images.memberBilly, order: 1 },
  { id: 'vocals', name: null, role: 'Vocals', image: images.memberVocals, order: 2 },
  { id: 'guitar', name: null, role: 'Guitars', image: images.memberGuitar, order: 3 },
  { id: 'percussion', name: null, role: 'Percussion', image: images.memberPercussion, order: 4 },
];

/** Voices credited on official 2Forty2 videos. */
export const featuredVoices = [
  'Billy Fernando',
  'Bonjo Fernando',
  'Johan Ranmuthugala',
  'Shenal Warnakulasurya',
  'Stephanie Pereira',
  'Kavindi Kulasena',
  'Nigel Fernando',
];

/** Guest artists credited on official 2Forty2 videos. */
export const guestArtists = ['Kasun Kalhara', 'Hannah Onella', 'Roja Sivakumar', 'Devashrie'];

/** JOURNEY — Future: GET /api/timeline */
export const timeline = [
  { id: 't0', year: 'The start', title: 'A concert band is born', text: 'Co-founded with lead vocalist Billy Fernando, 2Forty2 set out to reimagine the songs Sri Lanka grew up with — in Sinhala, Tamil and English.', image: images.bandLineup },
  { id: 't1', year: '2017', title: 'Ra Ahase — Live in Concert', text: 'The Ra Ahase concert series begins in Negombo, with full-band reworks of classics such as The Tennysons’ “Ma Gee Gayami”.', image: ytStill('vdpPqdYa0ek', 'Ra Ahase Live in Concert 2017') },
  { id: 't2', year: '2018', title: 'Nelum Pokuna', text: 'Ra Ahase arrives at Nelum Pokuna, joined by guest artist Kasun Kalhara.', image: ytStill('F0ViDNN_ZK8', 'Ra Ahase at Nelum Pokuna 2018') },
  { id: 't3', year: '2020', title: 'Transcendence', text: 'A high-energy live set mixing international pop with the band’s own sound.', image: ytStill('wkoD2yo_m9s', 'Transcendence 2020') },
  { id: 't4', year: '2023', title: 'Ra Ahase Live 2023', text: 'The concert series returns, with Billy Fernando leading “Me Raathriye”.', image: ytStill('Bp6N6NSu56M', 'Ra Ahase Live 2023') },
  { id: 't5', year: '2025', title: 'The Ultimate Band Show', text: 'Live at the CH & FC Grounds — including the Bajaw Medley and an acoustic “Ra Ahase”.', image: images.coverRaAhase },
  { id: 't6', year: '2026', title: '2Forty2 Live & Padura', text: 'A headline night at Ramadia Grand, Moratuwa in March, and Padura at Heritance Negombo in December.', image: images.posterLive },
];

/** MILESTONES — Future: GET /api/milestones */
export const milestones = [
  { id: 'ms1', value: '15+', label: 'Years on stage', text: 'Fusion, culture and class — as the band puts it.' },
  { id: 'ms2', value: '3', label: 'Languages', text: 'Songs performed in Sinhala, Tamil and English.' },
  { id: 'ms3', value: '12M', label: 'Views on one medley', text: 'The Clarence Baila Medley, on the official channel.' },
  { id: 'ms4', value: 'NZ', label: 'International stages', text: 'Including a show at the Invercargill Workingmen’s Club, New Zealand.' },
];
