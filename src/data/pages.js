import { images, ytStill } from './media';

/**
 * EDITABLE PAGE CONTENT — Future: GET /api/pages/:slug
 * Facts used here come from the band's own channels (Instagram bio, official
 * YouTube titles, event posters) and published press coverage.
 */
export const pages = {
  home: {
    meta: {
      title: '2Forty2 — Sri Lanka’s Concert Band',
      description:
        'The official home of 2Forty2, the Sri Lankan concert band led by Billy Fernando. Concerts, weddings, corporate events and private celebrations in Sinhala, Tamil and English.',
    },
    hero: {
      eyebrow: 'Sri Lanka’s pioneering concert band',
      headline: ['Fusion, culture', '*& class.*'],
      intro:
        'Fifteen-plus years of reimagining the songs Sri Lanka loves — sung in Sinhala, Tamil and English, played live by a full band led by Billy Fernando.',
    },
    intro: {
      statement:
        '2Forty2 takes the classics a whole country grew up with — Clarence, Jothipala, Milton — and plays them again, loud, live and brand new.',
      /** Editorial version of the statement: text, *accent* text and inline photo capsules. */
      // `br` marks a line break on tablet/desktop — lines step from long to short.
      statementParts: [
        { text: '2Forty2' },
        { image: images.liveBillyStage },
        { text: 'takes the classics a whole country' },
        { br: true },
        { text: 'grew up with' },
        { image: images.bandSuits },
        { text: '*Clarence, Jothipala, Milton*' },
        { br: true },
        { text: '— and plays them again, loud,' },
        { br: true },
        { image: images.livePercussion },
        { text: 'live &' },
        { text: '*brand new.*' },
      ],
      body:
        'Baila, reggae, disco, ballads and originals, carried by a line-up of voices and musicians who read the room from the first note to the last encore.',
      images: [images.liveBillyStage, images.livePercussion, images.bandSuits],
    },
    stats: [
      { value: '15+', label: 'Years on stage' },
      { value: '3', label: 'Languages — Sinhala, Tamil, English' },
      { value: '12M', label: 'Views on the Clarence Baila Medley' },
      { value: '25+', label: 'Official videos' },
    ],
    marquee: ['Concerts', 'Weddings', 'Corporate Nights', 'Baila Sessions', 'Acoustic Vibes', 'Private Celebrations'],
    cta: {
      title: ['Bring 2Forty2', 'to *your night.*'],
      body: 'Concerts, weddings, corporate galas and private celebrations — tell us about your event and the band will shape a set around it.',
    },
  },
  about: {
    meta: {
      title: 'About — 2Forty2',
      description: 'The story of 2Forty2 — Sri Lanka’s concert band led by Billy Fernando, performing in Sinhala, Tamil and English for more than fifteen years.',
    },
    hero: {
      eyebrow: 'About the band',
      title: ['More than', 'a *band.*'],
      intro: 'A concert band, a family of voices and fifteen-plus years of reimagining the songs Sri Lanka loves.',
      images: [images.bandLineup, images.liveVocalTrio, images.livePercussion],
    },
    story: {
      lead: 'Led by vocalist and co-founder Billy Fernando, 2Forty2 brings fusion, culture and class to every stage it plays.',
      paragraphs: [
        'The band’s sound is built on reinvention. Classics by Clarence Wijewardena, H. R. Jothipala, Milton Mallawarachchi and The Tennysons are rebuilt as full-band remakes and medleys — baila, reggae, disco and soul — alongside 2Forty2’s own original songs.',
        'From the Ra Ahase concert series to the Ultimate Band Show, from Nelum Pokuna to stages in New Zealand, 2Forty2 performs in Sinhala, Tamil and English for audiences who come to sing every word back.',
      ],
      quote: 'Fusion, culture and class — fifteen years and counting.',
      images: [images.liveStageWide, images.acousticSession],
    },
    identity: {
      pillars: [
        { title: 'Reinvention', text: 'Beloved classics, rebuilt with fresh arrangements and a full live band.' },
        { title: 'Fusion', text: 'Baila, reggae, pop, soul and Sri Lankan tradition in the same set.' },
        { title: 'Connection', text: 'Three languages, one room — songs the whole audience can sing.' },
      ],
      styles: ['Baila', 'Reggae', 'Sinhala Classics', 'Disco', 'Pop', 'Soul', 'Acoustic', 'Tamil', 'English'],
    },
    cta: {
      title: ['Bring the', '*band* to', 'your stage.'],
      body: 'Ready to hear 2Forty2 live at your event? Start a booking inquiry.',
    },
  },
  performances: {
    meta: {
      title: 'Performances — 2Forty2',
      description: 'Concerts, weddings, corporate events, private parties and indoor live performances by 2Forty2.',
    },
    hero: {
      eyebrow: 'Performances',
      title: ['One band.', 'Every kind', 'of *room.*'],
      intro: 'From acoustic sessions to full-production concerts, every 2Forty2 performance is shaped around the event.',
      images: [images.liveStageWide, images.acousticSession, images.bandBrickwall],
    },
    cta: {
      title: ['Your event,', '*live.*'],
      body: 'Share your date and venue and the band will come back with availability and options.',
    },
  },
  music: {
    meta: {
      title: 'Music — 2Forty2',
      description: 'Original songs, remakes, medleys and live concert recordings from 2Forty2 — watch them all on the official channel.',
    },
    hero: {
      eyebrow: 'Music',
      title: ['Turn it', '*up.*'],
      intro: 'Originals, remakes, medleys and live concert recordings — straight from the official 2Forty2 channel.',
      images: [images.coverAdara, images.coverRaAhase, images.coverIraPaya],
    },
  },
  media: {
    meta: {
      title: 'Media & Gallery — 2Forty2',
      description: 'Live photography, band portraits, event posters and performance videos of 2Forty2.',
    },
    hero: {
      eyebrow: 'Media',
      title: ['Seen &', '*heard.*'],
      intro: 'Live photography, band portraits, posters and performance films.',
      images: [images.liveBillyStage, images.bandSuits, images.liveStageBlue],
    },
  },
  events: {
    meta: {
      title: 'Events — 2Forty2',
      description: 'Upcoming 2Forty2 concerts, including Padura at Heritance Negombo, and an archive of past shows.',
    },
    hero: {
      eyebrow: 'Events',
      title: ['Catch us', '*live.*'],
      intro: 'Upcoming concerts and an archive of nights already played — from Ra Ahase to the Ultimate Band Show.',
      images: [images.posterPadura, images.posterLive, images.posterOrdnance],
    },
  },
  book: {
    meta: {
      title: 'Book the Band — 2Forty2',
      description: 'Send a booking inquiry to 2Forty2 for your wedding, corporate event, private party or concert.',
    },
    image: images.liveVocalTrio,
  },
  contact: {
    meta: {
      title: 'Contact — 2Forty2',
      description: 'Get in touch with 2Forty2 for bookings, collaborations and press.',
    },
    image: images.liveStageBlue,
    still: ytStill('-Q-XRJyvtb0', 'Ra Tharakawo — 2Forty2'),
  },
};
