import AnimatedHeading from '../ui/AnimatedHeading';
import Button, { TextLink } from '../ui/Button';
import { Equalizer } from '../ui/Primitives';
import PhotoWall from '../media/PhotoWall';
import { getSite, getCleanPhotos } from '../../services/content';

const site = getSite();

/** Full-bleed closing call-to-action over a drifting wall of band photos. */
export default function CTASection({ title, body, eventType }) {
  const to = eventType ? `${site.bookingPath}?type=${eventType}` : site.bookingPath;
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-32" aria-labelledby="cta-heading">
      <PhotoWall photos={getCleanPhotos()} className="-z-10 opacity-60" speed={1.4} />
      <div className="absolute inset-0 -z-10 bg-ink/80" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(10_26_68/0.6),rgb(7_8_10/0.9)_75%)]" />

      <div className="container-x flex flex-col items-center text-center">
        <p className="t-eyebrow mb-8 flex items-center gap-3" data-reveal="">
          <Equalizer className="text-signal-soft" /> Bookings open
        </p>
        <div id="cta-heading">
          <AnimatedHeading lines={title} className="t-hero" />
        </div>
        <p className="t-lead mx-auto mt-8 max-w-xl" data-reveal="">{body}</p>
        <div className="mt-10 flex w-full flex-col items-center gap-6 sm:mt-12 sm:w-auto sm:flex-row" data-reveal="" data-delay="0.1">
          <Button to={to} size="lg" className="w-full sm:w-auto">Book the band</Button>
          <TextLink to="/contact">Ask a question</TextLink>
        </div>
      </div>
    </section>
  );
}
