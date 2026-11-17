import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import Button from '../ui/Button';
import Img from '../ui/Img';
import { Equalizer } from '../ui/Primitives';
import { SocialLinks } from '../ui/BrandIcons';
import { useScrollLock } from '../media/Overlay';
import { getSite, getFeaturedEvent } from '../../services/content';
import { formatEventDate } from '../../lib/format';
import { EASE } from '../../lib/motion';

const site = getSite();

const item = (i) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE.expo, delay: 0.2 + i * 0.045 } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.25 } },
});

/**
 * Full-screen mobile navigation: divided link list with active state,
 * booking CTA, next-show card and contact details. Scrolls on short screens.
 */
export default function MobileMenu({ open, onClose }) {
  useScrollLock(open);
  const next = getFeaturedEvent();
  const nd = next && formatEventDate(next.date);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          data-lenis-prevent=""
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-coal lg:hidden"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.55, ease: EASE.curtain, delay: 0.1 } }}
          transition={{ duration: 0.75, ease: EASE.curtain }}
        >
          <div className="pointer-events-none absolute -right-32 top-24 size-80 rounded-full bg-signal/20 blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-40 bottom-0 size-96 rounded-full bg-navy/70 blur-[120px]" aria-hidden="true" />

          <div className="container-x relative flex min-h-full flex-col pb-8 pt-24 md:pt-28">
            <motion.p {...item(0)} className="t-eyebrow mb-4 flex items-center gap-3 text-[0.62rem]">
              <Equalizer className="text-signal-soft" /> Menu
            </motion.p>

            <nav aria-label="Mobile">
              <ul className="border-t border-white/10">
                {site.nav.map((link, i) => (
                  <motion.li key={link.to} {...item(i + 1)} className="border-b border-white/10">
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group grid grid-cols-[2.25rem_1fr_auto] items-center gap-2 py-3.5 transition-colors md:py-4 ${isActive ? 'text-bone' : 'text-bone/55 active:text-bone'}`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className={`font-brand text-[0.62rem] font-bold ${isActive ? 'text-signal-soft' : 'text-mist'}`}>{String(i + 1).padStart(2, '0')}</span>
                          <span className="flex items-center gap-3 font-display text-[clamp(1.45rem,6.8vw,2.4rem)] font-extrabold uppercase leading-none tracking-[-0.02em]">
                            {link.label}
                            {isActive && <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />}
                          </span>
                          <span
                            className={`grid size-9 place-items-center rounded-full border transition-colors ${isActive ? 'border-signal bg-signal text-white' : 'border-white/15 text-mist'}`}
                            aria-hidden="true"
                          >
                            <ArrowUpRight className="size-4" strokeWidth={1.75} />
                          </span>
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div {...item(site.nav.length + 1)} className="mt-7">
              <Button to={site.bookingPath} onClick={onClose} size="lg" className="w-full">
                Book the band
              </Button>
            </motion.div>

            {next && (
              <motion.div {...item(site.nav.length + 2)} className="mt-4">
                <Link to="/events" onClick={onClose} className="flex items-center gap-4 rounded-[4px] border border-white/10 bg-white/[0.03] p-3 pr-4">
                  <span className="h-16 w-12 shrink-0 overflow-hidden rounded-[2px]">
                    <Img image={next.image} sizes="48px" alt="" className="size-full object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="t-eyebrow block text-[0.56rem] text-signal-soft">Up next</span>
                    <span className="mt-1 block truncate font-display text-base font-extrabold uppercase leading-none tracking-tight">{next.title}</span>
                    <span className="mt-1 block truncate text-xs text-fog">{nd.day} {nd.month} · {next.venue}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-mist" aria-hidden="true" />
                </Link>
              </motion.div>
            )}

            <motion.div {...item(site.nav.length + 3)} className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-8">
              <div>
                <p className="t-eyebrow mb-2 text-[0.58rem]">Bookings</p>
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 text-sm text-fog">
                  <Mail className="size-4 text-mist" aria-hidden="true" /> {site.contact.email}
                </a>
              </div>
              <SocialLinks items={site.socials} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
