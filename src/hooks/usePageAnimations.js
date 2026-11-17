import { useEffect } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/motion';
import { useAppState } from '../context/AppState';

/**
 * Declarative animation engine.
 * Components opt in with data attributes, so motion stays consistent site-wide
 * and markup stays clean:
 *
 *   data-load="split|fade|scale"  entrance animation when the page appears
 *   data-load-delay="0.2"         extra delay for a load animation
 *   data-split                    word-mask reveal on scroll (AnimatedHeading)
 *   data-reveal                   fade-up on scroll   (data-delay optional)
 *   data-stagger                  children fade-up in sequence on scroll
 *   data-mask                     image clip-path wipe + settle on scroll
 *   data-parallax="12"            vertical parallax (yPercent amplitude)
 *   data-scrub-words              statement words light up as you scroll
 *   data-line                     hairline draws in from the left
 *
 * Reduced motion: nothing is animated; content is simply shown.
 */
let firstRun = true;

export function usePageAnimations(scope) {
  const { introDone } = useAppState();

  // ---- Scroll-driven animations (set up once per page mount) ----
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = scope.current;
      const q = (sel) => Array.from(root.querySelectorAll(sel));
      const st = (trigger, start = 'top 88%') => ({ trigger, start, once: true });

      q('[data-split]').forEach((el) => {
        gsap.from(el.querySelectorAll('.split-inner'), {
          yPercent: 115,
          rotate: 3,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.055,
          scrollTrigger: st(el, 'top 90%'),
        });
      });

      q('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 48,
          autoAlpha: 0,
          duration: 1.1,
          delay: parseFloat(el.dataset.delay || 0),
          scrollTrigger: st(el),
        });
      });

      q('[data-stagger]').forEach((el) => {
        gsap.from(el.children, { y: 40, autoAlpha: 0, duration: 1, stagger: 0.09, scrollTrigger: st(el) });
      });

      q('[data-mask]').forEach((el) => {
        const media = el.querySelector('img, video');
        const tl = gsap.timeline({ scrollTrigger: st(el, 'top 85%') });
        tl.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' }
        );
        if (media) tl.from(media, { scale: 1.35, duration: 1.8, ease: 'expo.out' }, 0.15);
      });

      q('[data-parallax]').forEach((el) => {
        const amt = parseFloat(el.dataset.parallax) || 10;
        gsap.fromTo(
          el,
          { yPercent: -amt },
          {
            yPercent: amt,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      q('[data-scrub-words]').forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll('.scrub-word'),
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true },
          }
        );
      });

      q('[data-pill]').forEach((el) => {
        const img = el.querySelector('img');
        const tl = gsap.timeline({ scrollTrigger: st(el, 'top 85%') });
        tl.from(el, { width: 0, marginLeft: 0, marginRight: 0, duration: 1.2, ease: 'expo.out' });
        if (img) tl.from(img, { scale: 1.6, duration: 1.4, ease: 'expo.out' }, 0);
      });

      q('[data-line]').forEach((el) => {
        gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'expo.out', scrollTrigger: st(el, 'top 95%') });
      });

      // ---- Automatic image reveals ------------------------------------
      // Every photo not already animated gets a clip-path wipe + settle-in
      // zoom as it scrolls into view. Grids cascade via ScrollTrigger.batch.
      const vw = window.innerWidth;
      const frames = [];
      q('img').forEach((img) => {
        if (img.closest('[data-mask],[data-no-reveal],[data-load],[data-pill],[aria-hidden="true"]')) return;
        let frame = img.parentElement;
        for (let i = 0; i < 3 && frame && getComputedStyle(frame).overflow !== 'hidden'; i++) frame = frame.parentElement;
        if (!frame || getComputedStyle(frame).overflow !== 'hidden' || frames.some((f) => f.el === frame)) return;
        const r = frame.getBoundingClientRect();
        if (r.width < 48 || r.height < 48) return; // skip thumbnails & icons
        frames.push({ el: frame, img, wide: r.width > r.height * 1.35, large: r.width > vw * 0.42 && r.height > 280 });
      });

      frames.forEach(({ el, img, wide, large }) => {
        gsap.set(el, { clipPath: wide ? 'inset(0% 100% 0% 0%)' : 'inset(100% 0% 0% 0%)' });
        if (large && !img.closest('[data-parallax]')) {
          // Big photos: gentle depth drift inside the frame while scrolling
          gsap.set(img, { scale: 1.14 });
          gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        } else {
          gsap.set(img, { scale: 1.28 });
        }
      });

      if (frames.length) {
        ScrollTrigger.batch(
          frames.map((f) => f.el),
          {
            start: 'top 90%',
            once: true,
            onEnter: (batch) =>
              batch.forEach((el, i) => {
                const f = frames.find((x) => x.el === el);
                gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.35, ease: 'expo.inOut', delay: i * 0.12, clearProps: 'clipPath' });
                gsap.to(f.img, { scale: f.large && !f.img.closest('[data-parallax]') ? 1.14 : 1, duration: 1.8, ease: 'expo.out', delay: i * 0.12 + 0.1 });
              }),
          }
        );
      }

      // ---- Velocity skew: strips lean with scroll speed, then spring back
      const skewEls = q('[data-skew]');
      if (skewEls.length) {
        const proxy = { skew: 0 };
        const setSkew = gsap.quickSetter(skewEls, 'skewY', 'deg');
        const clamp = gsap.utils.clamp(-6, 6);
        ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const skew = clamp(self.getVelocity() / -350);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, { skew: 0, duration: 0.9, ease: 'power3', overwrite: true, onUpdate: () => setSkew(proxy.skew) });
            }
          },
        });
      }
    },
    { scope }
  );

  // ---- Entrance animations (wait for the first-visit preloader) ----
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const els = Array.from(scope.current.querySelectorAll('[data-load]'));
      if (!els.length) return;

      if (!introDone) {
        els.forEach((el) => {
          const t = el.dataset.load;
          if (t === 'split') gsap.set(el.querySelectorAll('.split-inner'), { yPercent: 115 });
          else gsap.set(el, { autoAlpha: 0 });
        });
        return;
      }

      // After a route change the curtain needs ~0.55s to clear the screen.
      const base = firstRun ? 0.1 : 0.55;
      firstRun = false;

      els.forEach((el) => {
        const t = el.dataset.load;
        const delay = base + parseFloat(el.dataset.loadDelay || 0);
        if (t === 'split') {
          gsap.from(el.querySelectorAll('.split-inner'), { yPercent: 115, rotate: 4, duration: 1.3, ease: 'expo.out', stagger: 0.06, delay });
        } else if (t === 'scale') {
          gsap.from(el, { scale: 1.22, autoAlpha: 0, duration: 2.4, ease: 'expo.out', delay: Math.max(0, delay - 0.3) });
        } else {
          gsap.from(el, { y: 28, autoAlpha: 0, duration: 1.1, ease: 'power3.out', delay });
        }
      });
    },
    { scope, dependencies: [introDone], revertOnUpdate: true }
  );

  // ---- Keep trigger positions correct as lazy media changes page height ----
  useEffect(() => {
    let raf;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
}
