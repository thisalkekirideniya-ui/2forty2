import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';
import { getSite } from '../../services/content';

const site = getSite();

function RollLabel({ children }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">{children}</span>
      <span className="absolute inset-0 translate-y-full text-white transition-transform duration-500 ease-expo group-hover:translate-y-0" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

/**
 * Transparent over hero media; gains a dark blurred backdrop once scrolled.
 * Hides while scrolling down, reappears on scroll up.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 480);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-expo ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${
          open
            ? 'border-b border-white/10 bg-coal lg:border-transparent lg:bg-transparent'
            : solid
              ? 'border-b border-white/[0.06] bg-ink/75 backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between gap-6 md:h-24">
          <Link to="/" aria-label="2Forty2 — home" className="relative z-10 text-lg md:text-xl">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {site.nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-colors ${
                        isActive ? 'text-bone' : 'text-fog/80'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`size-1 rounded-full bg-signal transition-transform duration-500 ${isActive ? 'scale-100' : 'scale-0'}`} aria-hidden="true" />
                        <RollLabel>{item.label}</RollLabel>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <span className="hidden sm:block">
              <Button to={site.bookingPath}>Book the band</Button>
            </span>
            <button
              type="button"
              className="grid size-12 place-items-center rounded-full border border-white/20 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span className={`absolute left-0 h-px w-full bg-bone transition-all duration-500 ease-expo ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px bg-bone transition-all duration-500 ease-expo ${open ? 'top-1/2 w-full -rotate-45' : 'top-full w-3/5'}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
