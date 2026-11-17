import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin signal-blue line at the top of the screen that fills as you scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-signal via-signal-soft to-signal"
      style={{ scaleX }}
    />
  );
}
