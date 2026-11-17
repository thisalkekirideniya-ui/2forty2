import { Link } from 'react-router-dom';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { SocialLinks } from '../ui/BrandIcons';
import { Equalizer } from '../ui/Primitives';
import { getSite } from '../../services/content';
import { scrollToTarget } from '../../lib/smoothScroll';

const site = getSite();

export default function Footer() {
  const toTop = () => scrollToTarget(0);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-coal pt-20 md:pt-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-navy/60 blur-[140px]" aria-hidden="true" />

      <div className="container-x relative">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="t-eyebrow mb-5 flex items-center gap-3">
              <Equalizer className="text-signal-soft" /> Now booking
            </p>
            <p className="t-h2 max-w-3xl">
              Have a date <span className="t-accent text-signal-soft">in mind?</span>
            </p>
          </div>
          <Button to={site.bookingPath} size="lg">
            Book the band
          </Button>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-sm text-sm leading-relaxed text-mist">{site.shortDescription}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
            <p className="t-eyebrow mb-5">Explore</p>
            <ul className="space-y-3">
              {[...site.nav.slice(1), { label: 'Book the Band', to: site.bookingPath }].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-fog transition-colors hover:text-signal-soft">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="t-eyebrow mb-5">Contact</p>
            <ul className="space-y-4 text-sm text-fog">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 text-mist" strokeWidth={1.5} aria-hidden="true" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-signal-soft">{site.contact.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 text-mist" strokeWidth={1.5} aria-hidden="true" />
                <span>{site.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 text-mist" strokeWidth={1.5} aria-hidden="true" />
                <span>Based in {site.location}</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="t-eyebrow mb-5">Follow</p>
            <SocialLinks items={site.socials} className="flex-wrap" />
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="relative select-none" aria-hidden="true">
        <p className="whitespace-nowrap text-center font-brand text-[13vw] font-black uppercase leading-[0.8] tracking-tight text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.09)]">
          2Forty2
        </p>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-coal to-transparent" />
      </div>

      <div className="container-x relative flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-mist md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} 2Forty2. All rights reserved.</p>
        <p className="max-w-xl md:text-center">
          Photography and video © 2Forty2. Booking contact details shown are placeholders until confirmed.
        </p>
        <button type="button" onClick={toTop} className="group inline-flex items-center gap-2 uppercase tracking-[0.2em] text-fog hover:text-bone">
          Back to top
          <ArrowUp className="size-4 transition-transform group-hover:-translate-y-1" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
