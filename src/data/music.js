import { images, ytStill } from './media';

/**
 * MUSIC — Future: GET /api/releases
 * Sourced from the official 2Forty2 YouTube channel. Every item plays inside the
 * site via the privacy-enhanced YouTube embed.
 *
 * kind: 'single' (singles, remakes, official videos) | 'medley' | 'live' (concert recordings)
 * credit: the original artist/composer as stated in the official video title.
 */
export const CHANNEL_URL = 'https://www.youtube.com/channel/UCFtEiNuNNFr1SqbLamWsLVg';
const yt = (id) => `https://www.youtube.com/watch?v=${id}`;

const item = ({ id, title, native, kind, format, credit, featuring, youtubeId, artwork, highlight }) => ({
  id,
  title,
  native,
  kind,
  format,
  credit,
  featuring,
  youtubeId,
  youtubeUrl: yt(youtubeId),
  artwork: artwork || ytStill(youtubeId, `${title} — 2Forty2`),
  still: ytStill(youtubeId, `${title} — 2Forty2`),
  highlight,
  spotifyUrl: null,
  appleMusicUrl: null,
});

export const releases = [
  // ---- Singles & remakes ----
  item({ id: 'kello-kollo', title: 'Kello Kollo', native: 'කොල්ලෝ කෙල්ලෝ', kind: 'single', format: 'Original song', featuring: 'Billy Fernando', youtubeId: 'mjCDGELtcMs' }),
  item({ id: 'lankawe-kello', title: 'Lankawe Kello Lassanai', native: 'ලංකාවෙ කෙල්ලො ලස්සනයි', kind: 'single', format: 'Official music video', youtubeId: 'B69bhRDM4gQ', artwork: images.coverLankawe }),
  item({ id: 'ira-paya', title: 'Ira Paya', native: 'ඉර පායා', kind: 'single', format: 'Remake', credit: 'Original by Samitha Mudunkotuwa', featuring: 'Billy Fernando', youtubeId: 'g4ZF74WWVAw', artwork: images.coverIraPaya }),
  item({ id: 'adara-mal-pawane', title: 'Adara Mal Pawane', native: 'ආදර මල් පවනේ', kind: 'single', format: 'Remake', featuring: 'Billy Fernando', youtubeId: 'YpMY78QQcwM', artwork: images.coverAdara }),
  item({ id: 'ra-tharakawo', title: 'Ra Tharakawo', native: 'රෑ තාරකාවෝ', kind: 'single', format: 'Remake', credit: 'Clarence Wijewardena · Lyrics by Rookantha Goonatillake', featuring: 'Billy Fernando', youtubeId: '-Q-XRJyvtb0', highlight: '10M views' }),
  item({ id: 'thanivee-sitinnai', title: 'Thanivee Sitinnai', native: 'තනිවී සිටින්නයි', kind: 'single', format: 'Remake', credit: 'Original song by Milton Mallawarachchi', featuring: 'Billy Fernando', youtubeId: '0ZSDZMolWZ0', highlight: '7.3M views' }),
  item({ id: 'ran-tharu-payana', title: 'Ran Tharu Payana', native: 'රන් තරු පායන', kind: 'single', format: 'Remake', credit: 'Original song by Keerthi Pasquel', featuring: 'Devashrie', youtubeId: 'FFdQVbCbW7g', highlight: '7.4M views' }),
  item({ id: 'iwuru-thala', title: 'Iwuru Thala', native: 'ඉවුරු තලා', kind: 'single', format: 'Remake', credit: 'Milton Mallawarachchi', featuring: 'Billy Fernando', youtubeId: 'TGMFn-JW88o' }),
  item({ id: 'piyumehi-pani-bothi', title: 'Piyumehi Pani Bothi', native: 'පියුමෙහි පැණි බොති', kind: 'single', format: 'Remake', credit: 'Original by CT Fernando', featuring: 'Hannah Onella', youtubeId: 'mm4aElXHlpc', highlight: '4M views' }),
  item({ id: 'nihanda-kalpana', title: 'Nihanda Kalpana', native: 'නිහඬ කල්පනා', kind: 'single', format: 'Remake', featuring: 'Roja Sivakumar & Billy Fernando', youtubeId: 'znBc-slYHCc' }),

  // ---- Medleys ----
  item({ id: 'gypsies-medley', title: 'Gypsies Baila Medley', kind: 'medley', format: 'Medley', featuring: 'Bonjo Fernando, Johan Ranmuthugala & Billy Fernando', youtubeId: 'XQH8qUhhQ7U' }),
  item({ id: 'clarence-baila-medley', title: 'The Clarence Baila Medley', kind: 'medley', format: 'Medley', credit: 'Original songs by Clarence Wijewardena', youtubeId: '_YnAkndPOz0', highlight: '12M views' }),
  item({ id: 'clarence-medley', title: 'The Clarence Medley', kind: 'medley', format: 'Medley', credit: 'Sihina Lowak · Gamen Liyumak', featuring: 'Bonjo Fernando & Johan Ranmuthugala', youtubeId: '4cx-uFxs7uk', highlight: '5.3M views' }),
  item({ id: 'jothipala-medley', title: 'Jothipala Medley', native: 'ජෝතිපාල මෙඩ්ලි', kind: 'medley', format: 'Medley', featuring: 'Bonjo Fernando, Shenal Warnakulasurya & Billy Fernando', youtubeId: 'qPnz6XVQ9no' }),
  item({ id: 'some-maama-medley', title: 'Some Maama Baila Medley', native: 'සෝමෙ මාමා බයිලා', kind: 'medley', format: 'Medley', featuring: 'Billy Fernando', youtubeId: 'svJOx389k5M' }),
  item({ id: 'bajaw-medley', title: 'Bajaw Medley', native: 'බජව් Medley', kind: 'medley', format: 'Live medley', credit: 'Ultimate Band Show 2025', featuring: 'Billy Fernando', youtubeId: '7sO6HYyJJdE' }),
  item({ id: 'kolompure-medley', title: 'Kolompure Medley', native: 'කොළොම්පුරේ Medley', kind: 'medley', format: 'Medley', featuring: 'Stephanie Pereira & Kavindi Kulasena', youtubeId: '1KpaSQTq52w', highlight: '4M views' }),
  item({ id: 'dance-reggae-medley', title: 'Dance Reggae Medley', kind: 'medley', format: 'Medley', featuring: 'Billy Fernando & Stephanie', youtubeId: '9z7NTNVg1Sc' }),
  item({ id: 'disco-medley', title: 'Disco Medley — Non Stop', kind: 'medley', format: 'Acoustic Vibes', youtubeId: 'uLkBfiAD9DI' }),
  item({ id: 'reggae-medley', title: 'The Reggae Medley', kind: 'medley', format: 'Acoustic Vibes', featuring: 'Billy Fernando, Nigel Fernando & Kavindi Kulasena', youtubeId: 'IlFAqMy5tBY' }),

  // ---- Live in concert ----
  item({ id: 'ra-ahase-ubs', title: 'Ra Ahase', native: 'රෑ අහසේ', kind: 'live', format: 'Ultimate Band Show 2025', credit: 'Live @ CH & FC Grounds', featuring: 'Billy Fernando', youtubeId: '3Ox434RFP28', artwork: images.coverRaAhase }),
  item({ id: 'ra-ahase-2017', title: 'Ra Ahase — Live in Negombo', kind: 'live', format: 'Ra Ahase Live 2017', youtubeId: 'rncvGUggYFw' }),
  item({ id: 'ma-gee-gayami', title: 'Ma Gee Gayami', kind: 'live', format: 'Ra Ahase Live 2017', credit: 'The Tennysons', youtubeId: 'vdpPqdYa0ek' }),
  item({ id: 'oba-kamathinam', title: 'Oba Kamathinam', kind: 'live', format: 'Ra Ahase Live 2017', youtubeId: '1vxtKxg_L98', highlight: '2.7M views' }),
  item({ id: 'ra-ahasin', title: 'Ra Ahasin', native: 'රෑ අහසින්', kind: 'live', format: 'Ra Ahase · Nelum Pokuna 2018', credit: 'Kasun Kalhara', youtubeId: '9P-TPwvAYkU' }),
  item({ id: 'soyuriya', title: 'Soyuriya', native: 'සොයුරිය', kind: 'live', format: 'Ra Ahase · Nelum Pokuna 2018', featuring: 'Billy Fernando ft. Kasun Kalhara', youtubeId: 'F0ViDNN_ZK8' }),
  item({ id: 'me-raathriye', title: 'Me Raathriye', native: 'මේ රාත්‍රියේ', kind: 'live', format: 'Ra Ahase Live 2023', featuring: 'Billy Fernando', youtubeId: 'Bp6N6NSu56M' }),
  item({ id: 'sanasennam-ma', title: 'Sanasennam Ma', native: 'සැනසෙන්නම් මා', kind: 'live', format: '2Forty2 Maathra Live', credit: 'Senaka Batagoda', youtubeId: '9xb4Cfr5JFY', highlight: '6.6M views' }),
  item({ id: 'attention', title: 'Attention / Single Ladies', kind: 'live', format: 'Transcendence 2020', youtubeId: 'wkoD2yo_m9s' }),
];

export const musicTabs = [
  { id: 'single', label: 'Singles & remakes' },
  { id: 'medley', label: 'Medleys' },
  { id: 'live', label: 'Live in concert' },
];

/** Featured on Home + Music. */
export const featuredReleaseId = 'kello-kollo';
export const showcaseVideoIds = ['gypsies-medley', 'clarence-baila-medley', 'ra-tharakawo', 'bajaw-medley'];

export const videos = releases;

/** Official streaming profiles. */
export const platforms = [
  { id: 'youtube', label: 'YouTube', url: CHANNEL_URL },
  { id: 'spotify', label: 'Spotify', url: 'https://open.spotify.com/artist/3eAXlMjpOlynvgvoAiDEL4' },
  { id: 'apple', label: 'Apple Music', url: null },
];

export const spotifyEmbedUrl = 'https://open.spotify.com/embed/artist/3eAXlMjpOlynvgvoAiDEL4?utm_source=generator&theme=0';
