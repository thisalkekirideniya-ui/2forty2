import { Play } from 'lucide-react';
import Img from '../ui/Img';
import { SpotifyIcon, YouTubeIcon, AppleMusicIcon } from '../ui/BrandIcons';

const LINKS = [
  { key: 'youtubeUrl', label: 'YouTube', Icon: YouTubeIcon },
  { key: 'spotifyUrl', label: 'Spotify', Icon: SpotifyIcon },
  { key: 'appleMusicUrl', label: 'Apple Music', Icon: AppleMusicIcon },
];

/** External listening links — only platforms that actually have a link are shown. */
export function StreamLinks({ release, compact = false }) {
  const available = LINKS.filter(({ key }) => release[key]);
  if (!available.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {available.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={release[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${release.title} on ${label}`}
            className={`inline-flex items-center gap-2 rounded-full border border-white/20 text-[0.62rem] font-semibold uppercase tracking-[0.18em] transition-colors hover:border-signal hover:bg-signal ${compact ? 'h-9 px-3' : 'h-11 px-4'}`}
          >
            <Icon className="size-4" /> {!compact && label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Video card — HD still from the official channel; plays in the site's video player. */
export function VideoCard({ release, onPlay, size = 'md', className = '' }) {
  return (
    <article className={`group ${className}`}>
      <button
        type="button"
        onClick={() => onPlay(release)}
        className="relative block aspect-video w-full overflow-hidden rounded-[3px] bg-coal text-left"
        data-cursor="Play"
        aria-label={`Play ${release.title}`}
      >
        <Img image={release.still} w={960} sizes={size === 'lg' ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'} className="size-full object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-105" />
        <span className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-ink/40" />
        <span className={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 scale-90 place-items-center rounded-full bg-bone text-ink opacity-0 transition-all duration-500 ease-expo group-hover:scale-100 group-hover:bg-signal group-hover:text-white group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:scale-100 pointer-coarse:opacity-100 ${size === 'lg' ? 'size-20' : 'size-14'}`}>
          <Play className={`ml-0.5 fill-current ${size === 'lg' ? 'size-7' : 'size-5'}`} strokeWidth={0} />
        </span>
      </button>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="t-eyebrow mb-1.5 text-[0.62rem] text-signal-soft">{release.format}</p>
          <h3 className={`font-display font-bold uppercase leading-tight tracking-tight ${size === 'lg' ? 'text-2xl md:text-3xl' : 'text-base md:text-lg'}`}>{release.title}</h3>
          {release.native && <p className="mt-0.5 text-sm text-fog">{release.native}</p>}
          {(release.featuring || release.credit) && (
            <p className="mt-1 line-clamp-1 text-xs text-mist">{release.featuring ? `Ft. ${release.featuring}` : release.credit}</p>
          )}
        </div>
        {release.highlight && (
          <span className="shrink-0 rounded-full border border-white/15 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-fog">{release.highlight}</span>
        )}
      </div>
    </article>
  );
}

/** Track-list row; clicking plays the official video. */
export function TrackRow({ release, index, onPlay }) {
  return (
    <li className="group border-t border-white/10">
      <button type="button" onClick={() => onPlay?.(release)} className="grid w-full grid-cols-[2rem_4.5rem_1fr_auto] items-center gap-4 py-4 text-left md:gap-5" aria-label={`Play ${release.title}`}>
        <span className="font-brand text-xs text-mist transition-colors group-hover:text-signal-soft">{String(index + 1).padStart(2, '0')}</span>
        <span className="relative aspect-video overflow-hidden rounded-[2px] bg-coal">
          <Img image={release.still} w={240} sizes="80px" alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-base font-bold uppercase tracking-tight transition-colors group-hover:text-signal-soft md:text-lg">{release.title}</span>
          <span className="block truncate text-xs text-mist">{release.native ? `${release.native} · ` : ''}{release.format}</span>
        </span>
        <span className="grid size-10 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-signal group-hover:bg-signal">
          <Play className="ml-0.5 size-3.5 fill-current" strokeWidth={0} />
        </span>
      </button>
    </li>
  );
}

/** Featured release: sleeve with a spinning record peeking out. */
export function FeaturedRelease({ release, onPlay, className = '' }) {
  return (
    <div className={`group relative ${className}`}>
      <div className="relative mr-[18%] aspect-square">
        <div
          className="absolute inset-[3%] translate-x-[30%] animate-spin-slow rounded-full bg-[repeating-radial-gradient(circle,#111419_0px,#111419_2px,#262b35_3px,#111419_4px)] shadow-2xl ring-1 ring-white/15 transition-transform duration-[1.2s] ease-expo group-hover:translate-x-[42%]"
          aria-hidden="true"
        >
          <span className="absolute inset-[34%] grid place-items-center rounded-full bg-signal">
            <span className="font-brand text-[0.5rem] font-black tracking-widest text-white/90 md:text-[0.65rem]">2FORTY2</span>
          </span>
          <span className="absolute inset-[48.5%] rounded-full bg-ink" />
          <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_30deg,transparent_0deg,rgb(255_255_255/0.14)_40deg,transparent_90deg,transparent_180deg,rgb(255_255_255/0.1)_220deg,transparent_270deg)]" />
        </div>
        <button
          type="button"
          onClick={() => onPlay?.(release)}
          className="relative block size-full overflow-hidden rounded-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]"
          data-cursor="Play"
          aria-label={`Play ${release.title}`}
          data-mask=""
        >
          <Img image={release.artwork} w={900} sizes="(min-width: 1024px) 40vw, 80vw" className="size-full object-cover" />
          <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30">
            <span className="grid size-16 scale-75 place-items-center rounded-full bg-bone text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 pointer-coarse:scale-100 pointer-coarse:opacity-100">
              <Play className="ml-1 size-6 fill-current" strokeWidth={0} />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
