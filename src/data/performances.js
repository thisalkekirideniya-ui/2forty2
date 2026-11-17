import { images } from './media';

/**
 * PERFORMANCE CATEGORIES — Future: GET /api/performance-categories
 * `bookingType` pre-selects the event type on the booking form.
 * Details describe the experience; logistics (set length, line-up options)
 * are left as "to be confirmed" until the band provides them.
 */
export const performanceCategories = [
  {
    id: 'weddings',
    title: 'Weddings',
    kicker: 'Receptions & celebrations',
    teaser: 'From the first dance to the last song of the night.',
    description:
      'A wedding is a story told in moments. We score each one — the entrance, the first dance, the toasts and the floor-filling finale — with arrangements chosen around the couple.',
    atmosphere: 'Romantic, elegant and building to a celebration.',
    details: [
      { label: 'Best for', value: 'Receptions, homecomings, after-parties' },
      { label: 'Repertoire', value: 'Built with the couple' },
      { label: 'Set format', value: 'To be confirmed per event' },
    ],
    image: images.acousticSession,
    secondaryImage: images.bailaSession,
    bookingType: 'wedding',
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    kicker: 'Galas, launches & year-end nights',
    teaser: 'Polished, punctual and powerful on any stage.',
    description:
      'Corporate audiences need a band that understands timing. We work around the run-of-show — from refined background sets during dinner to a high-energy close.',
    atmosphere: 'Professional, confident and celebratory.',
    details: [
      { label: 'Best for', value: 'Annual galas, launches, award nights' },
      { label: 'Coordination', value: 'Aligned with event organisers' },
      { label: 'Set format', value: 'To be confirmed per event' },
    ],
    image: images.liveStageWide,
    secondaryImage: images.bandSuits,
    bookingType: 'corporate',
  },
  {
    id: 'private',
    title: 'Private Parties',
    kicker: 'Birthdays, anniversaries & house parties',
    teaser: 'Your guests. Your songs. A proper live show.',
    description:
      'Private celebrations deserve the same care as a big stage. We bring a curated set that suits the crowd — whether it is an intimate dinner or a full dance-floor night.',
    atmosphere: 'Personal, warm and full of energy.',
    details: [
      { label: 'Best for', value: 'Birthdays, anniversaries, family gatherings' },
      { label: 'Requests', value: 'Song requests welcome' },
      { label: 'Set format', value: 'To be confirmed per event' },
    ],
    image: images.bandBrickwall,
    secondaryImage: images.liveStageBlue,
    bookingType: 'private',
  },
  {
    id: 'concerts',
    title: 'Concerts & Festivals',
    kicker: 'Public stages & special occasions',
    teaser: 'Big rooms. Bigger sound.',
    description:
      'On a concert stage the show is the event. Expect a full-energy performance built for crowds, lights and the moment everyone sings the chorus back.',
    atmosphere: 'Loud, cinematic and unforgettable.',
    details: [
      { label: 'Best for', value: 'Concerts, festivals, ticketed shows' },
      { label: 'Production', value: 'Works with venue sound & lighting' },
      { label: 'Set format', value: 'To be confirmed per event' },
    ],
    image: images.liveBillyStage,
    secondaryImage: images.liveVocalTrio,
    bookingType: 'concert',
  },
  {
    id: 'indoor',
    title: 'Indoor Live',
    kicker: 'Lounges, ballrooms & intimate venues',
    teaser: 'Where 2Forty2 feels most at home.',
    description:
      'Ballrooms and indoor venues are home ground — Close enough to see every face, loud enough to move every one of them — a balanced, dynamic live experience.',
    atmosphere: 'Intimate, immersive and alive.',
    details: [
      { label: 'Best for', value: 'Hotels, lounges, ballrooms, venues' },
      { label: 'Sound', value: 'Balanced for indoor acoustics' },
      { label: 'Set format', value: 'To be confirmed per event' },
    ],
    image: images.bandLineup,
    secondaryImage: images.livePercussion,
    bookingType: 'other',
  },
];

/**
 * PERFORMANCE PACKAGES — Future: GET /api/packages
 * PLACEHOLDERS ONLY: no prices or inclusions have been confirmed by the band.
 */
export const packages = [
  {
    id: 'pkg-1',
    name: 'Package One',
    summary: 'Placeholder package description — to be provided by the band.',
    includes: ['Inclusion to be confirmed', 'Inclusion to be confirmed', 'Inclusion to be confirmed'],
    price: null,
    isSample: true,
  },
  {
    id: 'pkg-2',
    name: 'Package Two',
    summary: 'Placeholder package description — to be provided by the band.',
    includes: ['Inclusion to be confirmed', 'Inclusion to be confirmed', 'Inclusion to be confirmed', 'Inclusion to be confirmed'],
    price: null,
    highlighted: true,
    isSample: true,
  },
  {
    id: 'pkg-3',
    name: 'Package Three',
    summary: 'Placeholder package description — to be provided by the band.',
    includes: ['Inclusion to be confirmed', 'Inclusion to be confirmed', 'Inclusion to be confirmed'],
    price: null,
    isSample: true,
  },
];

/** Event types for the booking form (value is what the API will receive). */
export const bookingEventTypes = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'private', label: 'Private Party' },
  { value: 'concert', label: 'Concert' },
  { value: 'birthday', label: 'Birthday Celebration' },
  { value: 'other', label: 'Other' },
];

export const audienceSizes = ['Under 50', '50 – 150', '150 – 300', '300 – 500', '500 – 1,000', '1,000+'];
