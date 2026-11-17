import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';
import { Equalizer } from '../ui/Primitives';

/**
 * Splash screen, shown on every full page load.
 * The 2Forty2 badge spins up out of a blur, a progress ring draws around it
 * and the loading line fills, light sweeps across the badge, and the
 * panel lifts away to reveal the site.
 * Reduced-motion devices get a calm version: the logo simply fades in and out.
 */
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = (k) => `[data-pl="${k}"]`;
      const tl = gsap.timeline({ onComplete: onDone });

      if (prefersReducedMotion()) {
        gsap.set(q('ring'), { strokeDashoffset: 0 });
        gsap.set(q('bar'), { scaleX: 1 });
        gsap.set([q('pulse'), q('shine')], { autoAlpha: 0 });
        tl.fromTo([q('glow'), q('orbit'), q('logo'), q('tag'), q('corner')], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: 'power1.out' }, 0)
          .add(() => onReveal?.(), 1.7)
          .to(root.current, { autoAlpha: 0, duration: 0.5, ease: 'power1.inOut' }, 1.7);
        return;
      }

      tl.fromTo(q('glow'), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'power2.out' }, 0)
        .fromTo(q('orbit'), { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, 0.1)
        .fromTo(
          q('logo'),
          { autoAlpha: 0, scale: 0.35, rotate: -120, filter: 'blur(18px)' },
          { autoAlpha: 1, scale: 1, rotate: 0, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' },
          0.15
        )
        .fromTo(q('ring'), { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.3)
        .fromTo(q('bar'), { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0.3)
        .fromTo(q('shine'), { xPercent: -160 }, { xPercent: 160, duration: 1.1, ease: 'power2.inOut' }, 0.9)
        .fromTo(q('pulse'), { scale: 0.9, autoAlpha: 0.7 }, { scale: 1.45, autoAlpha: 0, duration: 1.2, ease: 'power2.out', repeat: 1, repeatDelay: 0.1 }, 0.9)
        .fromTo(q('tag'), { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08 }, 1.0)
        .fromTo(q('corner'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.4)
        // Exit
        .to(q('logo'), { scale: 1.12, duration: 0.5, ease: 'power2.in' }, 2.35)
        .to([q('inner'), q('glow')], { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '<0.15')
        .add(() => onReveal?.(), '-=0.1')
        .to(root.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.25');
    },
    { scope: root }
  );

  return (
    <div ref={root} className="fixed inset-0 z-[110] overflow-hidden bg-ink" role="status" aria-label="Loading 2Forty2">
      {/* Ambient navy glow */}
      <div data-pl="glow" className="pointer-events-none absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(29_63_160/0.55),rgb(10_26_68/0.25)_45%,transparent_70%)] blur-2xl" aria-hidden="true" />

      <div data-pl="inner" className="relative flex h-full flex-col justify-between p-5 md:p-10">
        <div data-pl="corner" className="flex items-start justify-between text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-mist">
          <span>Concert band</span>
          <span>Sri Lanka</span>
        </div>

        {/* Badge */}
        <div className="flex flex-col items-center">
          <div className="relative size-[clamp(170px,32vmin,280px)]">
            {/* Pulse wave */}
            <span data-pl="pulse" className="absolute inset-0 rounded-full border border-signal/60" aria-hidden="true" />

            {/* Dotted orbit, slowly rotating */}
            <svg data-pl="orbit" viewBox="0 0 100 100" className="absolute -inset-[16%] size-[132%] animate-spin-slow" aria-hidden="true">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="0.35" strokeDasharray="0.6 2.4" />
              <circle cx="50" cy="2" r="0.9" fill="#7f9dff" />
            </svg>

            {/* Progress ring */}
            <svg viewBox="0 0 100 100" className="absolute -inset-[7%] size-[114%] -rotate-90" aria-hidden="true">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="0.8" />
              <circle data-pl="ring" cx="50" cy="50" r="48" fill="none" stroke="#3d6bff" strokeWidth="0.8" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset="100" />
            </svg>

            {/* Logo with light sweep */}
            <div data-pl="logo" className="relative size-full overflow-hidden rounded-full shadow-[0_0_80px_-10px_rgba(61,107,255,0.55)]">
              <img src="/logo-mark.png" alt="2Forty2" className="size-full select-none" draggable="false" />
              <span
                data-pl="shine"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="mt-12 flex items-center gap-3 overflow-hidden md:mt-14">
            <span data-pl="tag" className="inline-block text-signal-soft"><Equalizer /></span>
            <span data-pl="tag" className="t-eyebrow inline-block text-fog">Fusion</span>
            <span data-pl="tag" className="inline-block text-smoke">·</span>
            <span data-pl="tag" className="t-eyebrow inline-block text-fog">Culture</span>
            <span data-pl="tag" className="inline-block text-smoke">·</span>
            <span data-pl="tag" className="t-eyebrow inline-block text-fog">Class</span>
          </div>
        </div>

        {/* Counter + progress */}
        <div>
          <div className="mb-4 flex items-end justify-between">
            <span data-pl="corner" className="t-eyebrow">Tuning the room</span>
          </div>
          <div className="h-px w-full bg-white/10">
            <div data-pl="bar" className="h-full origin-left bg-signal" />
          </div>
        </div>
      </div>
    </div>
  );
}
