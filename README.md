# 2Forty2 — Official Website

The official website of **2Forty2**, Sri Lanka's concert band led by Billy Fernando: fusion, culture and class in Sinhala, Tamil and English.

**Frontend phase.** The site runs entirely on structured local data. A Node.js + MongoDB backend and admin panel come next.

## Tech stack

- React 18 + Vite 6
- Tailwind CSS 4
- GSAP 3 + ScrollTrigger (scroll animations), Lenis (smooth scrolling)
- Framer Motion (page transitions and UI interactions)
- React Router 6, Lucide icons
- Self-hosted fonts: Archivo, Inter, Instrument Serif, Orbitron, Noto Sans Sinhala

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
```

The `vercel.json` and `public/_redirects` files make client-side routes work on Vercel and Netlify.

## Pages

Home · About · Performances · Music · Media · Events · Book the Band · Contact · 404

## Project structure

```
src/
  data/           All website content (the future API contract)
    site.js         navigation, contact details, social links
    pages.js        per-page copy, hero images, SEO meta
    band.js         line-up, featured voices, timeline, milestones
    events.js       events (upcoming/past computed from the date)
    music.js        releases and videos from the official YouTube channel
    gallery.js      gallery items and categories
    performances.js performance types, packages, booking form options
    media.js        image library (/public/photos)
  services/
    content.js      the ONLY place components read content from
    booking.js      simulated booking/contact submissions
  hooks/
    usePageAnimations.js  data-attribute animation engine
  lib/
    smoothScroll.js       Lenis smooth scrolling + GSAP sync
  components/
    layout/   Navbar, MobileMenu, Footer, Page transitions, Preloader, Cursor, ScrollProgress
    ui/       Button, AnimatedHeading, SectionIntro, Img, Primitives, BrandIcons, Logo
    media/    PhotoWall, Overlay, VideoModal, Lightbox, PlayButton
    sections/ PageHero, CTASection, EventRow, Music cards, GalleryGrid, Timeline, BookingForm
    home/     Home-page sections
  pages/      one file per route
public/
  photos/     band photography, posters, cover art
  photos/yt/  HD stills from the official YouTube videos
```

## Updating content

Edit the files in `src/data/`. Components never hard-code content.

- **Photos:** put the files in `public/photos/` and reference them in `src/data/media.js`. Higher-resolution originals can replace the current files under the same names.
- **Events:** add an entry to `src/data/events.js`. It moves from upcoming to past automatically once the date passes.
- **Videos:** add an entry with its YouTube ID to `src/data/music.js`. It plays inside the site.

### Still to confirm

- Booking email and phone number (`src/data/site.js`): currently placeholders
- Facebook page URL (`src/data/site.js`)
- Names for the line-up roles marked "Name to be confirmed" (`src/data/band.js`)
- Performance package details and pricing (`src/data/performances.js`)

## Backend phase

Replace the getters in `src/services/content.js` with API calls that return the same data shapes. Replace the simulated functions in `src/services/booking.js` with real `POST` requests. No component changes are needed.

On the booking and contact forms, an email starting with `error@` previews the error state.
