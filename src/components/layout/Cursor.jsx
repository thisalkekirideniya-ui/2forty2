import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/motion';
import { useMediaQuery, useReducedMotion } from '../../hooks/useMediaQuery';

function CursorFollower() {
  const ref = useRef(null);
  const [label, setLabel] = useState('');
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      setVisible(true);
    };
    const over = (e) => {
      const target = e.target.closest?.('[data-cursor]');
      setLabel(target ? target.getAttribute('data-cursor') : '');
      setHovering(!!e.target.closest?.('a, button, [role="button"], input, select, textarea, label'));
    };
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  const size = label ? 'size-24 bg-signal' : hovering ? 'size-12 border border-bone/70 bg-transparent' : 'size-2.5 bg-bone';

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[120] grid place-items-center rounded-full transition-[width,height,background-color,opacity] duration-300 ease-expo ${size} ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className={`text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white transition-opacity ${label ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
    </div>
  );
}

/** Subtle follower for mouse users only; the native cursor stays visible for accessibility. */
export default function Cursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduce = useReducedMotion();
  return fine && !reduce ? <CursorFollower /> : null;
}
