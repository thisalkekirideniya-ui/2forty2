import { Check } from 'lucide-react';
import Page from '../components/layout/Page';
import PageHero from '../components/sections/PageHero';
import CTASection from '../components/sections/CTASection';
import SectionIntro from '../components/ui/SectionIntro';
import Button from '../components/ui/Button';
import Img from '../components/ui/Img';
import { SampleTag, ScrubText } from '../components/ui/Primitives';
import { getPage, getPerformanceCategories, getPackages, getSite } from '../services/content';
import { useHashScroll } from '../hooks/useHashScroll';

function Category({ cat, index, total }) {
  const flip = index % 2 === 1;
  const booking = `${getSite().bookingPath}?type=${cat.bookingType}`;
  return (
    <section id={cat.id} className="scroll-mt-24 border-t border-white/10 py-20 md:py-28" aria-labelledby={`${cat.id}-title`}>
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className={`relative lg:col-span-7 ${flip ? 'lg:order-2 lg:col-start-6' : ''}`}>
          <div className="relative aspect-[4/5] overflow-hidden bg-coal sm:aspect-[16/12]" data-mask="">
            <div className="absolute inset-[-10%_0]" data-parallax="8">
              <Img image={cat.image} w={1500} sizes="(min-width: 1024px) 58vw, 100vw" className="size-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <p className={`absolute bottom-5 max-w-xs font-serif text-xl italic text-bone md:bottom-8 md:text-2xl ${flip ? 'right-5 text-right md:right-8' : 'left-5 md:left-8'}`}>“{cat.atmosphere}”</p>
          </div>
          <div
            className={`absolute -bottom-10 hidden aspect-[3/4] w-[32%] overflow-hidden border-[6px] border-ink bg-coal shadow-2xl md:block ${flip ? '-left-6' : '-right-6'}`}
            data-reveal=""
            data-delay="0.3"
          >
            <Img image={cat.secondaryImage} w={600} sizes="20vw" className="size-full object-cover" />
          </div>
        </div>

        <div className={`lg:col-span-4 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}>
          <p className="font-brand text-xs font-bold text-signal-soft" data-reveal="">
            {String(index + 1).padStart(2, '0')} <span className="text-mist">/ {String(total).padStart(2, '0')}</span>
          </p>
          <p className="t-eyebrow mt-6" data-reveal="">{cat.kicker}</p>
          <h2 id={`${cat.id}-title`} className="t-h1 mt-4" data-reveal="">{cat.title}</h2>
          <p className="t-lead mt-6" data-reveal="">{cat.description}</p>
          <dl className="mt-10 border-t border-white/10" data-stagger="">
            {cat.details.map((d) => (
              <div key={d.label} className="flex justify-between gap-6 border-b border-white/10 py-4 text-sm">
                <dt className="text-mist">{d.label}</dt>
                <dd className="text-right text-bone">{d.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10" data-reveal="">
            <Button to={booking}>Book for {cat.title.toLowerCase()}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Performances() {
  const page = getPage('performances');
  const cats = getPerformanceCategories();
  const packages = getPackages();
  useHashScroll();

  return (
    <Page meta={page.meta}>
      <PageHero {...page.hero} index="02">
        <nav aria-label="Performance types" className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium transition-colors hover:border-signal hover:bg-signal">
              {c.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="py-20 md:py-32">
        <div className="container-x">
          <ScrubText
            text="A hundred guests or a thousand, a ballroom or a terrace — the room changes, the standard does not. Each performance is planned around the occasion, the audience and the moment it needs to deliver."
            className="t-statement max-w-6xl"
          />
        </div>
      </section>

      {cats.map((c, i) => (
        <Category key={c.id} cat={c} index={i} total={cats.length} />
      ))}

      {/* Packages — placeholders only */}
      <section className="bg-coal py-20 md:py-32" aria-labelledby="packages">
        <div className="container-x">
          <SectionIntro
            index="06"
            eyebrow="Performance packages"
            title={['Performance', '*packages.*']}
            tag={<SampleTag>Placeholder packages</SampleTag>}
            body="Package names, inclusions and pricing will be published once confirmed by the band. Every booking can also be tailored."
          />
          <div className="mt-16 grid border-t border-white/10 md:mt-24 md:grid-cols-3" data-stagger="">
            {packages.map((p) => (
              <article
                key={p.id}
                className={`relative flex flex-col border-b border-white/10 py-12 md:border-b-0 md:border-r md:px-10 md:last:border-r-0 ${p.highlighted ? 'md:bg-white/[0.03]' : ''}`}
              >
                {p.highlighted && <span className="absolute inset-x-0 top-0 h-0.5 bg-signal" aria-hidden="true" />}
                <h3 className="t-h3">{p.name}</h3>
                <p className="mt-4 text-sm text-mist">{p.summary}</p>
                <p className="mt-8 font-display text-3xl font-extrabold uppercase">{p.price ?? 'Price on request'}</p>
                <ul className="mt-8 flex-1 space-y-3">
                  {p.includes.map((inc, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-fog">
                      <Check className="size-4 text-signal-soft" aria-hidden="true" /> {inc}
                    </li>
                  ))}
                </ul>
                <Button to={getSite().bookingPath} variant={p.highlighted ? 'primary' : 'outline'} className="mt-10 self-start">
                  Enquire
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection {...page.cta} />
    </Page>
  );
}
