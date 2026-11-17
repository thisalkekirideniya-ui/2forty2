import { AnimatePresence, motion } from 'framer-motion';
import { Play, Plus } from 'lucide-react';
import Img from '../ui/Img';
import { EASE } from '../../lib/motion';

/** Masonry gallery with animated filtering. Images open the lightbox; videos open the player. */
export default function GalleryGrid({ items, onOpen }) {
  return (
    <motion.ul data-no-reveal="" className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:gap-6" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((item, i) => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.expo, delay: Math.min(i * 0.04, 0.4) } }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3 } }}
            className="mb-4 break-inside-avoid xl:mb-6"
          >
            <button
              type="button"
              onClick={() => onOpen(item)}
              className="group relative block w-full overflow-hidden bg-coal text-left"
              style={{ aspectRatio: item.ratio }}
              data-cursor={item.type === 'video' ? 'Play' : 'View'}
              aria-label={`${item.type === 'video' ? 'Play video' : 'View image'}: ${item.caption}`}
            >
              <Img
                image={item.image}
                w={900}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 size-full object-cover transition-all duration-[1.2s] ease-expo group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100 pointer-coarse:opacity-90" />
              {item.type === 'video' && (
                <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-ink/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-signal group-hover:bg-signal">
                  <Play className="ml-0.5 size-5 fill-current" strokeWidth={0} />
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <span className="translate-y-2 transition-transform duration-500 ease-expo group-hover:translate-y-0 pointer-coarse:translate-y-0">
                  <span className="t-eyebrow block text-signal-soft">{item.category === 'video' ? 'Video' : item.category}</span>
                  <span className="mt-1 block font-display text-xl font-bold uppercase">{item.caption}</span>
                </span>
                {item.type !== 'video' && (
                  <span className="grid size-10 shrink-0 scale-50 place-items-center rounded-full bg-bone text-ink opacity-0 transition-all duration-500 ease-expo group-hover:scale-100 group-hover:opacity-100">
                    <Plus className="size-4" />
                  </span>
                )}
              </span>
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
