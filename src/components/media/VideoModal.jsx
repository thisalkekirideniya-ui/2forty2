import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import Overlay from './Overlay';
import Img from '../ui/Img';
import { YouTubeIcon } from '../ui/BrandIcons';
import { EASE } from '../../lib/motion';

/**
 * Plays an official YouTube video (privacy-enhanced embed) or a hosted file.
 * Videos only start after a user click; nothing autoplays with sound on load.
 */
export default function VideoModal({ video, open, onClose }) {
  // Keep the last video so the closing animation still has content to show.
  const last = useRef(video);
  if (video) last.current = video;
  const current = video || last.current;
  if (!current) return null;
  const { youtubeId, src, title, poster, still, youtubeUrl } = current;

  return (
    <Overlay open={open} onClose={onClose} label={title || 'Video player'}>
      <div className="flex w-[min(92vw,1400px)] flex-col gap-4">
        <motion.div
          className="relative aspect-video w-full overflow-hidden rounded-[3px] bg-coal"
          initial={{ scale: 0.92, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 10 }}
          transition={{ duration: 0.7, ease: EASE.expo }}
        >
          {youtubeId ? (
            <iframe
              className="size-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : src ? (
            <video className="size-full object-cover" src={src} poster={(poster || still)?.src} controls autoPlay playsInline />
          ) : (
            <div className="relative grid size-full place-items-center">
              {(poster || still) && <Img image={poster || still} alt="" className="absolute inset-0 size-full object-cover opacity-25 blur-sm" />}
              <div className="relative flex max-w-md flex-col items-center gap-5 px-6 text-center">
                <Film className="size-10 text-signal-soft" strokeWidth={1.25} />
                <p className="t-h3">Film coming soon</p>
              </div>
            </div>
          )}
        </motion.div>
        {title && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <p className="font-display text-lg font-bold uppercase tracking-tight">{title}</p>
            {(youtubeUrl || youtubeId) && (
              <a href={youtubeUrl || `https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-fog hover:text-bone">
                <YouTubeIcon className="size-4" /> Watch on YouTube
              </a>
            )}
          </div>
        )}
      </div>
    </Overlay>
  );
}
