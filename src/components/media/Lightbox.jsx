import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Overlay from './Overlay';
import Img from '../ui/Img';
import { EASE } from '../../lib/motion';

const pad = (n) => String(n).padStart(2, '0');

/** Full-screen image viewer: arrow keys, buttons and swipe to navigate. */
export default function Lightbox({ items, index, onClose, onChange }) {
  const open = index !== null && index >= 0;
  const item = open ? items[index] : null;
  const go = (dir) => onChange((index + dir + items.length) % items.length);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  return (
    <Overlay open={open} onClose={onClose} label="Image viewer" onKeyDown={onKeyDown}>
      {item && (
        <div className="flex size-full flex-col items-center justify-center px-4 pb-24 pt-20 md:px-24">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={item.id}
              className="flex max-h-full flex-col items-center"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE.expo }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
            >
              <Img image={item.image} w={1800} sizes="90vw" className="max-h-[72svh] w-auto select-none object-contain" draggable={false} />
              <figcaption className="mt-5 flex items-center gap-4 text-sm text-fog">
                <span className="font-brand text-xs text-signal-soft">{pad(index + 1)} / {pad(items.length)}</span>
                <span className="h-px w-6 bg-white/30" />
                <span>{item.caption}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 md:inset-x-8 md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:justify-between">
            {[
              { dir: -1, Icon: ChevronLeft, label: 'Previous image' },
              { dir: 1, Icon: ChevronRight, label: 'Next image' },
            ].map(({ dir, Icon, label }) => (
              <button
                key={dir}
                type="button"
                onClick={() => go(dir)}
                aria-label={label}
                className="grid size-14 place-items-center rounded-full border border-white/20 bg-ink/60 transition-colors hover:border-signal hover:bg-signal"
              >
                <Icon className="size-5" strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </div>
      )}
    </Overlay>
  );
}
