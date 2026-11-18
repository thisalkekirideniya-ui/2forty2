import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.defaults({ ease: 'power3.out' });

export { gsap, ScrollTrigger, useGSAP };

export const EASE = {
  expo: [0.16, 1, 0.3, 1],
  curtain: [0.76, 0, 0.24, 1],
};

/**
 * The site plays the same motion on every device. Many phones switch on
 * "reduce motion" / "remove animations" automatically (battery saver,
 * accessibility presets), which used to freeze the photo strips and skip all
 * scroll reveals on mobile. Set this to true to honour that setting again.
 */
export const RESPECT_REDUCED_MOTION = false;

export function prefersReducedMotion() {
  return (
    RESPECT_REDUCED_MOTION &&
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function isFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
