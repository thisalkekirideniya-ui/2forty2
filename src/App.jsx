import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Preloader from './components/layout/Preloader';
import Cursor from './components/layout/Cursor';
import ScrollProgress from './components/layout/ScrollProgress';
import { AppStateProvider, useAppState } from './context/AppState';
import { ScrollTrigger, prefersReducedMotion } from './lib/motion';
import { scrollToTarget } from './lib/smoothScroll';
import Home from './pages/Home';
import About from './pages/About';
import Performances from './pages/Performances';
import Music from './pages/Music';
import Media from './pages/Media';
import Events from './pages/Events';
import Book from './pages/Book';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const INTRO_KEY = '2f2-intro-seen';

function shouldShowPreloader() {
  if (prefersReducedMotion()) return false;
  try {
    return !sessionStorage.getItem(INTRO_KEY);
  } catch {
    return false;
  }
}

function Shell({ showIntro }) {
  const location = useLocation();
  const { setIntroDone } = useAppState();
  const [preloading, setPreloading] = useState(showIntro);

  const onExitComplete = () => {
    // Jump to top while the curtain covers the screen, unless linking to an anchor.
    if (!window.location.hash) scrollToTarget(0, { immediate: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <>
      <a href="#main" className="sr-only z-[130] rounded-full bg-bone px-5 py-3 text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      {preloading && (
        <Preloader
          onReveal={() => {
            setIntroDone(true);
            try {
              sessionStorage.setItem(INTRO_KEY, '1');
            } catch {
              /* storage unavailable — intro will simply replay */
            }
          }}
          onDone={() => setPreloading(false)}
        />
      )}
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/performances" element={<Performances />} />
          <Route path="/music" element={<Music />} />
          <Route path="/media" element={<Media />} />
          <Route path="/events" element={<Events />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [showIntro] = useState(shouldShowPreloader);
  return (
    <MotionConfig reducedMotion="user">
      <AppStateProvider initialIntroDone={!showIntro}>
        <div className="grain">
          <Shell showIntro={showIntro} />
        </div>
      </AppStateProvider>
    </MotionConfig>
  );
}
