/** Minimal line-style brand marks drawn to match Lucide's 24px / 1.5 stroke system. */
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const YouTubeIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="4" />
    <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
  </svg>
);
export const InstagramIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
);
export const FacebookIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M14.5 8H17V4.5h-2.5C12 4.5 10.5 6 10.5 8.6V11H8v3.5h2.5V21H14v-6.5h2.6L17 11h-3V8.9c0-.6.4-.9.5-.9z" />
  </svg>
);
export const SpotifyIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M7 9.4c3.4-1 7.2-.7 10.2 1" />
    <path d="M7.6 12.5c2.8-.8 5.8-.5 8.3.9" />
    <path d="M8.2 15.4c2.2-.6 4.4-.3 6.3.7" />
  </svg>
);
export const AppleMusicIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M9 18V6.5l10-2v11" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="15.5" r="2.5" />
  </svg>
);

export const brandIcon = { youtube: YouTubeIcon, instagram: InstagramIcon, facebook: FacebookIcon, spotify: SpotifyIcon, apple: AppleMusicIcon };

/** Social links. Profiles without a URL render as disabled "coming soon" marks, never fake links. */
export function SocialLinks({ items, className = '', size = 'size-5' }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {items.map(({ id, label, url }) => {
        const Icon = brandIcon[id];
        const cls = 'grid size-11 place-items-center rounded-full border border-white/15 transition-colors duration-300';
        return (
          <li key={id}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className={`${cls} hover:border-signal hover:bg-signal`}>
                <Icon className={size} />
              </a>
            ) : (
              <span className={`${cls} cursor-not-allowed opacity-40`} title={`${label} — link coming soon`} aria-label={`${label} (link coming soon)`} role="img">
                <Icon className={size} />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
