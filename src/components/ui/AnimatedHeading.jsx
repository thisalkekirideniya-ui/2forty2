import { Fragment } from 'react';

/** Splits "plain *accent* plain" into segments; *wrapped* words render in the italic serif. */
function segments(line) {
  return line
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) => (part.startsWith('*') ? { text: part.slice(1, -1), accent: true } : { text: part, accent: false }));
}

export const plainText = (lines) => (Array.isArray(lines) ? lines : [lines]).join(' ').replace(/\*/g, '');

/**
 * Oversized editorial heading with a masked word-by-word reveal.
 * `load` animates on page entrance; otherwise it animates when scrolled into view.
 */
export default function AnimatedHeading({ as: Tag = 'h2', lines, className = '', lineClassName = '', load = false, delay, accentClassName = '' }) {
  const arr = Array.isArray(lines) ? lines : [lines];
  const motionAttrs = load ? { 'data-load': 'split', 'data-load-delay': delay } : { 'data-split': '' };

  return (
    <Tag className={className} aria-label={plainText(arr)} {...motionAttrs}>
      {arr.map((line, i) => (
        <span key={i} className={`block ${lineClassName}`} aria-hidden="true">
          {segments(line).map((seg, j) =>
            seg.text
              .split(' ')
              .filter(Boolean)
              .map((word, k) => (
                <Fragment key={`${j}-${k}`}>
                  <span className="split-word">
                    <span className={`split-inner ${seg.accent ? `t-accent text-signal-soft ${accentClassName}` : ''}`}>{word}</span>
                  </span>{' '}
                </Fragment>
              ))
          )}
        </span>
      ))}
    </Tag>
  );
}
