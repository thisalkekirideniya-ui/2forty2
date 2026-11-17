/**
 * GLOBAL SITE SETTINGS — Future: GET /api/settings
 */
export const site = {
  name: '2Forty2',
  shortDescription:
    "2Forty2 is Sri Lanka's concert band led by Billy Fernando — fifteen-plus years of fusion, culture and class, sung in Sinhala, Tamil and English.",
  location: 'Sri Lanka',
  contact: {
    // PLACEHOLDERS — replace with the band's official booking contacts.
    email: 'bookings@example.com',
    phone: '+94 XX XXX XXXX',
    whatsapp: null,
    responseNote: 'Response time to be confirmed by the band',
  },
  /** url: null renders a disabled "coming soon" link instead of a fake one. */
  socials: [
    { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/channel/UCFtEiNuNNFr1SqbLamWsLVg' },
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/2forty2_official/' },
    { id: 'facebook', label: 'Facebook', url: null },
    { id: 'spotify', label: 'Spotify', url: 'https://open.spotify.com/artist/3eAXlMjpOlynvgvoAiDEL4' },
  ],
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Performances', to: '/performances' },
    { label: 'Music', to: '/music' },
    { label: 'Media', to: '/media' },
    { label: 'Events', to: '/events' },
    { label: 'Contact', to: '/contact' },
  ],
  bookingPath: '/book',
};
