import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget } from '../lib/smoothScroll';

/** Scrolls to #anchor targets after the page-transition curtain has lifted. */
export function useHashScroll() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) scrollToTarget(el, { offset: -90 });
    }, 650);
    return () => clearTimeout(t);
  }, [hash]);
}
