import AnimatedHeading from './AnimatedHeading';
import { Eyebrow } from './Primitives';

/**
 * Asymmetric section header: oversized heading on the left, supporting copy
 * and action pushed to the right column.
 */
export default function SectionIntro({ index, eyebrow, title, body, action, tag, className = '', headingClass = 't-h2' }) {
  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className="lg:col-span-7">
        <div className="mb-6 flex flex-wrap items-center gap-4" data-reveal="">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
          {tag}
        </div>
        <AnimatedHeading lines={title} className={headingClass} />
      </div>
      {(body || action) && (
        <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9" data-reveal="" data-delay="0.15">
          {body && <p className="t-lead">{body}</p>}
          {action}
        </div>
      )}
    </div>
  );
}
