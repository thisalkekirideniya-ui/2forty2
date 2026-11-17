import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';
import { Equalizer } from '../ui/Primitives';

/**
 * Splash / loading screen, shown on every full page load.
 *
 * Progress is tied to real loading: the ring and bar creep forward while the
 * page loads, then fill to 100% once the browser reports everything is ready
 * (fonts, logo, first photos). A minimum duration keeps the intro readable,
 * and a fallback stops it from ever hanging on a slow connection.
 *
 * Reduced-motion devices keep the loading indicator (it is information, not
 * decoration) but skip the spin, blur, pulse and light sweep.
 */
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null);
  const label = useRef(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const q = (k) => `[data-pl="${k}"]`;
      const reduce = prefersReducedMotion();
      const start = performance.now();
      const minSeconds = reduce ? 1.4 : 2.2;
      const progress = { v: 0 };
      const render = () => {
        gsap.set(q('ring'), { strokeDashoffset: 100 - progress.v });
        gsap.set(q('bar'), { scaleX: progress.v / 100 });
      };
      render();

      // ---- Intro visuals ----
      if (reduce) {
        gsap.set([q('pulse'), q('shine')], { autoAlpha: 0 });
        gsap.fromTo([q('glow'), q('orbit'), q('logo'), q('tag'), q('corner'), q('loader')], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power1.out' });
      } else {
        gsap
          .timeline()
          .fromTo(q('glow'), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'power2.out' }, 0)
          .fromTo(q('orbit'), { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, 0.1)
          .fromTo(
            q('logo'),
            { autoAlpha: 0, scale: 0.35, rotate: -120, filter: 'blur(18px)' },
            { autoAlpha: 1, scale: 1, rotate: 0, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' },
            0.15
          )
          .fromTo(q('loader'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 0.35)
          .fromTo(q('shine'), { xPercent: -160 }, { xPercent: 160, duration: 1.1, ease: 'power2.inOut' }, 0.9)
          .fromTo(q('pulse'), { scale: 0.9, autoAlpha: 0.7 }, { scale: 1.45, autoAlpha: 0, duration: 1.2, ease: 'power2.out', repeat: -1, repeatDelay: 0.3 }, 0.9)
          .fromTo(q('tag'), { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08 }, 1.0)
          .fromTo(q('corner'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.4);
      }

      // ---- Progress creeps forward while the page loads ----
      // Steady fill to 85% across the minimum duration, then a slow tail
      // towards 97% if the page is still loading on a slow connection.
      const creep = gsap
        .timeline()
        .to(progress, { v: 85, duration: minSeconds - 0.5, ease: 'sine.inOut', onUpdate: render })
        .to(progress, { v: 97, duration: 5, ease: 'power1.out', onUpdate: render });

      // ---- Finish: fill to 100%, then reveal the site ----
      let finished = false;
      const finish = contextSafe(() => {
        if (finished) return;
        finished = true;
        const elapsed = (performance.now() - start) / 1000;
        const out = gsap.timeline({ delay: Math.max(0, minSeconds - elapsed - 0.5), onComplete: onDone });
        out
          .add(() => creep.kill())
          .to(progress, { v: 100, duration: 0.5, ease: 'power2.inOut', onUpdate: render })
          .add(() => {
            if (label.current) label.current.textContent = 'Ready';
          });
        if (reduce) {
          out.add(() => onReveal?.(), '+=0.15').to(root.current, { autoAlpha: 0, duration: 0.5, ease: 'power1.inOut' });
        } else {
          out
            .to(q('logo'), { scale: 1.12, duration: 0.5, ease: 'power2.in' }, '+=0.1')
            .to([q('inner'), q('glow')], { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '<0.15')
            .add(() => onReveal?.(), '-=0.1')
            .to(root.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.25');
        }
      });

      const onLoad = () => finish();
      if (document.readyState === 'complete') finish();
      else window.addEventListener('load', onLoad, { once: true });
      const fallback = setTimeout(finish, 7000); // never hang on slow networks

      return () => {
        window.removeEventListener('load', onLoad);
        clearTimeout(fallback);
      };
    },
    { scope: root }
  );

  return (
    <div ref={root} className="fixed inset-0 z-[110] overflow-hidden bg-ink" role="status" aria-live="polite" aria-label="Loading 2Forty2">
      {/* Ambient navy glow */}
      <div data-pl="glow" className="pointer-events-none absolute left-1/2 top-1/2 size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(29_63_160/0.55),rgb(10_26_68/0.25)_45%,transparent_70%)] blur-2xl" aria-hidden="true" />

      <div data-pl="inner" className="relative flex h-full flex-col justify-between p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:p-10">
        <div data-pl="corner" className="flex items-start justify-between text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-mist">
          <span>Concert band</span>
          <span>Sri Lanka</span>
        </div>

        {/* Badge + loader */}
        <div className="flex flex-col items-center">
          <div className="relative size-[clamp(180px,34vmin,280px)]">
            {/* Pulse wave */}
            <span data-pl="pulse" className="absolute inset-0 rounded-full border border-signal/60" aria-hidden="true" />

            {/* Dotted orbit, slowly rotating */}
            <svg data-pl="orbit" viewBox="0 0 100 100" className="absolute -inset-[16%] size-[132%] animate-spin-slow" aria-hidden="true">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="0.35" strokeDasharray="0.6 2.4" />
              <circle cx="50" cy="2" r="0.9" fill="#7f9dff" />
            </svg>

            {/* Progress ring */}
            <svg viewBox="0 0 100 100" className="absolute -inset-[7%] size-[114%] -rotate-90" aria-hidden="true">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="1.1" />
              <circle data-pl="ring" cx="50" cy="50" r="48" fill="none" stroke="#3d6bff" strokeWidth="1.1" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset="100" />
            </svg>

            {/* Logo with light sweep */}
            <div data-pl="logo" className="relative size-full overflow-hidden rounded-full shadow-[0_0_80px_-10px_rgba(61,107,255,0.55)]">
              <img src="/logo-mark.png" alt="2Forty2" className="size-full select-none" draggable="false" />
              <span data-pl="shine" className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent" aria-hidden="true" />
            </div>
          </div>

          {/* Loading bar */}
          <div data-pl="loader" className="mt-14 w-[min(240px,64vw)] md:mt-16">
            <div className="mb-2.5 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-fog">
              <span ref={label}>Loading</span>
              <span className="flex gap-1" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-1 animate-pulse rounded-full bg-signal-soft" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </span>
            </div>
            <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
              <div data-pl="bar" className="h-full origin-left rounded-full bg-gradient-to-r from-signal to-signal-soft shadow-[0_0_14px_rgba(61,107,255,0.9)]" />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 overflow-hidden">
            <span data-pl="tag" className="inline-block text-signal-soft"><Equalizer /></span>
            <span data-pl="tag" className="t-eyebrow inline-block text-[0.62rem] text-mist">Fusion</span>
            <span data-pl="tag" className="inline-block text-smoke">·</span>
            <span data-pl="tag" className="t-eyebrow inline-block text-[0.62rem] text-mist">Culture</span>
            <span data-pl="tag" className="inline-block text-smoke">·</span>
            <span data-pl="tag" className="t-eyebrow inline-block text-[0.62rem] text-mist">Class</span>
          </div>
        </div>

        <p data-pl="corner" className="text-center text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-smoke">Tuning the room</p>
      </div>
    </div>
  );
}
