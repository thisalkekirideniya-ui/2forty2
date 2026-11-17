import { Play } from 'lucide-react';

/** Circular play control with a rotating text ring. */
export default function PlayButton({ label = 'Play the film', onClick, className = '', size = 'lg' }) {
  const dims = size === 'lg' ? 'size-32 md:size-44' : 'size-20';
  const ringText = `${label} · ${label} · `;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group relative grid place-items-center rounded-full ${dims} ${className}`}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        <text className="fill-bone font-sans text-[13px] font-semibold uppercase tracking-[0.42em]">
          <textPath href="#ring">{ringText}</textPath>
        </text>
      </svg>
      <span className="grid size-[52%] place-items-center rounded-full bg-bone text-ink transition-all duration-500 ease-expo group-hover:scale-110 group-hover:bg-signal group-hover:text-white">
        <Play className="ml-1 size-6 fill-current md:size-7" strokeWidth={0} />
      </span>
    </button>
  );
}
