import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { setScrollLocked } from '../../lib/smoothScroll';

/** Locks page scroll while an overlay is open. */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    setScrollLocked(true);
    return () => {
      html.style.overflow = prev;
      setScrollLocked(false);
    };
  }, [active]);
}

/**
 * Accessible full-screen overlay: portal, focus management, Esc to close,
 * Tab kept inside, focus restored to the trigger on close.
 */
export default function Overlay({ open, onClose, label, children, onKeyDown }) {
  const panelRef = useRef(null);
  const returnFocus = useRef(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement;
    const t = setTimeout(() => panelRef.current?.querySelector('[data-autofocus]')?.focus(), 50);
    return () => {
      clearTimeout(t);
      returnFocus.current?.focus?.();
    };
  }, [open]);

  const handleKey = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Tab') {
      const focusables = panelRef.current.querySelectorAll('button, [href], iframe, video, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    onKeyDown?.(e);
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          data-lenis-prevent=""
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onKeyDown={handleKey}
        >
          <button
            type="button"
            onClick={onClose}
            data-autofocus=""
            className="absolute right-4 top-4 z-10 grid size-12 place-items-center rounded-full border border-white/20 bg-ink/60 transition-colors hover:border-signal hover:bg-signal md:right-8 md:top-8"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
