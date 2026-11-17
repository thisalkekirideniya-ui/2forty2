import { useSearchParams } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import Page from '../components/layout/Page';
import AnimatedHeading from '../components/ui/AnimatedHeading';
import Img from '../components/ui/Img';
import { Eyebrow, Equalizer } from '../components/ui/Primitives';
import BookingForm from '../components/sections/BookingForm';
import { getPage, getSite } from '../services/content';

const STEPS = [
  { title: 'Tell us about it', text: 'Share your date, venue and the kind of night you are planning.' },
  { title: 'We get back to you', text: 'The band reviews availability and replies with options.' },
  { title: 'Lock in the date', text: 'Confirm the details and we start shaping your set.' },
];

export default function Book() {
  const page = getPage('book');
  const site = getSite();
  const [params] = useSearchParams();

  return (
    <Page meta={page.meta}>
      <section className="relative overflow-hidden pb-28 pt-32 md:pb-40 md:pt-44">
        <div className="pointer-events-none absolute -right-40 -top-20 size-[40rem] rounded-full bg-navy/70 blur-[160px]" aria-hidden="true" />
        <div className="container-x relative grid gap-16 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <p className="t-eyebrow flex items-center gap-3" data-load="fade">
              <Equalizer className="text-signal-soft" /> Book the band
            </p>
            <AnimatedHeading as="h1" lines={['Book', '*2Forty2.*']} load className="t-hero mt-8" />
            <p className="t-lead mt-8 max-w-md" data-load="fade" data-load-delay="0.3">
              Weddings, corporate galas, private parties and concerts. Tell us about your event and we will shape a live performance around it.
            </p>

            <div className="relative mt-12 hidden aspect-[16/10] overflow-hidden bg-coal lg:block" data-load="fade" data-load-delay="0.4">
              <Img image={page.image} w={900} sizes="40vw" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>

            <ol className="mt-12 space-y-6" data-load="fade" data-load-delay="0.5">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="font-brand text-xs font-bold text-signal-soft">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-display text-xl font-bold uppercase">{s.title}</p>
                    <p className="mt-1 text-sm text-mist">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-fog" data-load="fade" data-load-delay="0.6">
              <p className="t-eyebrow mb-2">Prefer to talk?</p>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 hover:text-signal-soft"><Mail className="size-4 text-mist" aria-hidden="true" />{site.contact.email}</a>
              <p className="flex items-center gap-3"><Phone className="size-4 text-mist" aria-hidden="true" />{site.contact.phone}</p>
            </div>
          </aside>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-white/10 bg-coal/80 p-6 backdrop-blur-sm sm:p-10 md:p-14" data-load="fade" data-load-delay="0.3">
              <Eyebrow index="01" className="mb-10">Booking inquiry</Eyebrow>
              <BookingForm initialType={params.get('type') || ''} />
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
