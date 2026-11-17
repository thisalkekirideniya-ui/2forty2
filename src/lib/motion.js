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

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
