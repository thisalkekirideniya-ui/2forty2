import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';

/**
 * Site-wide smooth scrolling (Lenis), driven by GSAP's ticker so every
 * ScrollTrigger animation stays in perfect sync with the scroll position.
 *
 * - Mouse wheel / trackpad: eased, inertial scrolling.
 * - Touch devices: native momentum scrolling is kept (it already feels best).
 * - Reduced-motion users: Lenis is not started at all; the browser scrolls normally.
 */
let lenis = null;

export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined' || prefersReducedMotion()) return lenis;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    anchors: { offset: -90 },
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export const getLenis = () => lenis;

const resolve = (target) => (typeof target === 'string' ? document.querySelector(target) : target);

/** Smoothly scrolls to a number, selector or element (falls back to native scrolling). */
export function scrollToTarget(target, { offset = 0, immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, force: true, duration: immediate ? 0 : 1.4 });
    return;
  }
  const top =
    typeof target === 'number' ? target : (resolve(target)?.getBoundingClientRect().top ?? 0) + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
}

/** Pauses smooth scrolling while overlays (menu, lightbox, video) are open. */
export function setScrollLocked(locked) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
