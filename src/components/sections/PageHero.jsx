import { Link } from 'react-router-dom';
import AnimatedHeading from '../ui/AnimatedHeading';
import Img from '../ui/Img';
import { Eyebrow, SampleTag } from '../ui/Primitives';

/**
 * Interior-page hero: oversized title on the left, a layered three-photo
 * collage on the right, and a softly blurred ambient version of the lead
 * photo washing the background.
 */
export default function PageHero({ eyebrow, title, intro, images = [], index = '00', tag, children }) {
  const [a, b, c] = images;
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      {a && (
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <img src={a.src} alt="" className="size-full scale-125 object-cover opacity-30 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        </div>
      )}

      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <div className="mb-8 flex flex-wrap items-center gap-4" data-load="fade">
            <nav aria-label="Breadcrumb" className="t-eyebrow flex items-center gap-2">
              <Link to="/" className="hover:text-bone">2Forty2</Link>
              <span aria-hidden="true">/</span>
              <span className="text-bone" aria-current="page">{eyebrow}</span>
            </nav>
            {tag && <SampleTag>{tag}</SampleTag>}
          </div>
          <AnimatedHeading as="h1" lines={title} load className="t-hero" />
          <div className="mt-8 flex flex-col gap-6" data-load="fade" data-load-delay="0.35">
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
            {intro && <p className="t-lead max-w-md">{intro}</p>}
            {children}
          </div>
        </div>

        <div className="relative h-[360px] sm:h-[440px] lg:col-span-6 lg:h-[540px]">
          {a && (
            <figure className="absolute right-0 top-0 h-[80%] w-[66%] overflow-hidden rounded-[3px] bg-coal shadow-2xl" data-load="fade" data-load-delay="0.15">
              <Img image={a} priority className="size-full object-cover" />
            </figure>
          )}
          {b && (
            <figure className="absolute bottom-0 left-0 h-[56%] w-[46%] overflow-hidden rounded-[3px] border-[6px] border-ink bg-coal shadow-2xl" data-load="fade" data-load-delay="0.35">
              <Img image={b} className="size-full object-cover" />
            </figure>
          )}
          {c && (
            <figure className="absolute bottom-[4%] right-[6%] hidden h-[34%] w-[26%] overflow-hidden rounded-[3px] border-[6px] border-ink bg-coal shadow-2xl sm:block" data-load="fade" data-load-delay="0.5">
              <Img image={c} className="size-full object-cover" />
            </figure>
          )}
          <span className="absolute left-[8%] top-[10%] h-24 w-24 rounded-full bg-signal/30 blur-2xl" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
