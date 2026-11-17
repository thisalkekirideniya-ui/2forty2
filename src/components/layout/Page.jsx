import { useRef } from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import Logo from '../ui/Logo';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { usePageAnimations } from '../../hooks/usePageAnimations';
import { EASE } from '../../lib/motion';

/**
 * Page shell: SEO meta, declarative scroll animations, footer and the
 * curtain page-transition (a panel wipes up to cover, then lifts away).
 */
export default function Page({ meta, children }) {
  const ref = useRef(null);
  useDocumentMeta(meta);
  usePageAnimations(ref);

  return (
    <motion.div ref={ref} className="relative" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />

      {/* Enter: covering panel lifts away */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[80] grid origin-top place-items-center bg-graphite"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.75, ease: EASE.curtain, delay: 0.05 } }}
        exit={{ scaleY: 0 }}
        aria-hidden="true"
      />
      {/* Exit: panel rises from the bottom to cover */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[80] grid origin-bottom place-items-center bg-graphite"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.6, ease: EASE.curtain } }}
        aria-hidden="true"
      >
        <motion.span
          className="text-2xl text-bone/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1, transition: { delay: 0.3, duration: 0.3 } }}
        >
          <Logo />
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
