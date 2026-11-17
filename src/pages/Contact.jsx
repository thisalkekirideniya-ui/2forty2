import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Check, Loader2, Mail, MapPin, Phone, Plus } from 'lucide-react';
import Page from '../components/layout/Page';
import AnimatedHeading from '../components/ui/AnimatedHeading';
import Img from '../components/ui/Img';
import Button from '../components/ui/Button';
import { Eyebrow, Equalizer } from '../components/ui/Primitives';
import { InstagramIcon, YouTubeIcon, SocialLinks } from '../components/ui/BrandIcons';
import { getPage, getSite, getFeaturedEvent, getCleanPhotos } from '../services/content';
import { submitContactMessage } from '../services/booking';
import { formatEventDate } from '../lib/format';
import { images } from '../data/media';
import { EASE } from '../lib/motion';

// General guidance only — the band should confirm or edit these answers.
const FAQ = [
  { q: 'How far in advance should we book?', a: 'As early as possible, especially for weekends and peak wedding season. Send an inquiry with your date and the band will confirm availability.' },
  { q: 'Do you travel for events across Sri Lanka?', a: 'Travel and location details are discussed per event. Include your venue and city in the booking inquiry.' },
  { q: 'Can we request specific songs?', a: 'Song requests are welcome. Share them in the “Additional requirements” field of the booking form.' },
  { q: 'Do you provide sound and lighting?', a: 'Technical requirements depend on the venue and event. The band will discuss production needs after your inquiry.' },
];

const TOPICS = ['Booking', 'Press & media', 'Collaboration', 'Something else'];

/* ------------------------------------------------------------------ */
/* Contact method card                                                 */
/* ------------------------------------------------------------------ */
function ContactCard({ icon: Icon, label, value, href, external, placeholder }) {
  const inner = (
    <>
      <span className="flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-full bg-white/[0.06] text-signal-soft transition-colors duration-500 group-hover:bg-signal group-hover:text-white">
          <Icon className="size-5" strokeWidth={1.5} />
        </span>
        {href && <ArrowUpRight className="size-5 text-mist transition-all duration-500 group-hover:rotate-45 group-hover:text-bone" strokeWidth={1.5} aria-hidden="true" />}
      </span>
      <span className="mt-8 block">
        <span className="t-eyebrow block text-[0.6rem]">{label}</span>
        <span className="mt-2 block break-words font-display text-lg font-bold tracking-tight md:text-xl">{value}</span>
        {placeholder && <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.18em] text-smoke">Placeholder</span>}
      </span>
    </>
  );
  const cls = 'group block rounded-[4px] border border-white/10 bg-white/[0.02] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04] md:p-6';
  return href ? (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/* ------------------------------------------------------------------ */
/* Quick message form (simulated in this frontend phase)               */
/* ------------------------------------------------------------------ */
function QuickMessage() {
  const [v, setV] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState('idle');

  const errors = {};
  if (v.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = 'Please enter a valid email.';
  if (v.message.trim().length < 10) errors.message = 'Please write a little more (10+ characters).';
  const err = (k) => (touched ? errors[k] : undefined);
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (Object.keys(errors).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(errors)[0]}"]`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      await submitContactMessage(v);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setV({ name: '', email: '', topic: TOPICS[0], message: '' });
    setTouched(false);
    setStatus('idle');
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'sent' ? (
        <motion.div key="sent" role="status" className="rounded-[4px] border border-white/10 p-6 md:p-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <span className="grid size-12 place-items-center rounded-full bg-signal"><Check className="size-5" /></span>
          <p className="t-h2 mt-6">Message <span className="t-accent text-signal-soft">noted.</span></p>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            Thanks, {v.name.split(' ')[0]}. This site is in preview, so <strong className="text-bone">your message has not been sent yet</strong> — once the
            backend is connected, messages will go straight to the band.
          </p>
          <button type="button" onClick={reset} className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-signal-soft hover:text-bone">
            Write another
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <fieldset>
            <legend className="sr-only">Topic</legend>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <label key={t} className="cursor-pointer rounded-full border border-white/15 px-4 py-2 text-xs transition-colors hover:border-white/40 has-[:checked]:border-bone has-[:checked]:bg-bone has-[:checked]:text-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal-soft">
                  <input type="radio" name="topic" value={t} checked={v.topic === t} onChange={set('topic')} className="sr-only" />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-6 sm:grid-cols-2">
            {[['name', 'Your name', 'text', 'name'], ['email', 'Email address', 'email', 'email']].map(([k, label, type, ac]) => (
              <div key={k} className="relative">
                <label htmlFor={`qm-${k}`} className="t-eyebrow absolute left-0 top-0 text-[0.6rem]">{label} <span className="text-signal-soft" aria-hidden="true">*</span></label>
                <input id={`qm-${k}`} name={k} type={type} autoComplete={ac} value={v[k]} onChange={set(k)} className="field-input" aria-invalid={err(k) ? 'true' : 'false'} aria-describedby={err(k) ? `qm-${k}-err` : undefined} />
                {err(k) && <p id={`qm-${k}-err`} className="mt-2 flex items-center gap-1.5 text-xs text-ember"><AlertCircle className="size-3.5" aria-hidden="true" />{err(k)}</p>}
              </div>
            ))}
          </div>
          <div className="relative">
            <label htmlFor="qm-message" className="t-eyebrow absolute left-0 top-0 text-[0.6rem]">Message <span className="text-signal-soft" aria-hidden="true">*</span></label>
            <textarea id="qm-message" name="message" rows={3} value={v.message} onChange={set('message')} className="field-input resize-none" aria-invalid={err('message') ? 'true' : 'false'} aria-describedby={err('message') ? 'qm-message-err' : undefined} />
            {err('message') && <p id="qm-message-err" className="mt-2 flex items-center gap-1.5 text-xs text-ember"><AlertCircle className="size-3.5" aria-hidden="true" />{err('message')}</p>}
          </div>
          {status === 'error' && (
            <p role="alert" className="flex items-center gap-2 border border-ember/40 bg-ember/10 p-3 text-sm"><AlertCircle className="size-4 text-ember" aria-hidden="true" />Something went wrong — please try again.</p>
          )}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-xs text-mist">
              For full event details, use the <Link to="/book" className="text-bone underline decoration-white/30 underline-offset-4 hover:decoration-signal">booking form</Link>.
            </p>
            <Button type="submit" disabled={status === 'sending'} icon={status === 'sending' ? null : undefined}>
              {status === 'sending' ? <span className="flex items-center gap-2"><Loader2 className="size-4 animate-spin" aria-hidden="true" />Sending…</span> : 'Send message'}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const page = getPage('contact');
  const site = getSite();
  const [open, setOpen] = useState(0);
  const next = getFeaturedEvent();
  const nd = next && formatEventDate(next.date);
  const instagram = site.socials.find((s) => s.id === 'instagram');
  const youtube = site.socials.find((s) => s.id === 'youtube');
  const grid = getCleanPhotos().slice(0, 6);

  return (
    <Page meta={page.meta}>
      {/* Split hero: photo + headline | contact panel */}
      <section className="grid lg:min-h-[100svh] lg:grid-cols-2 lg:items-start">
        <div className="relative isolate min-h-[72svh] overflow-hidden lg:sticky lg:top-0 lg:h-[100svh] lg:min-h-0">
          <div className="absolute inset-0 -z-10" data-load="scale">
            <Img image={images.liveStageWide} priority sizes="(min-width: 1024px) 50vw, 100vw" className="size-full object-cover" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
          <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-transparent to-ink/60 lg:block" />

          <div className="flex h-full flex-col justify-end p-5 pb-10 pt-32 md:p-10 md:pb-14 xl:p-16">
            <p className="t-eyebrow mb-6 flex items-center gap-3 text-fog" data-load="fade">
              <Equalizer className="text-signal-soft" /> Contact 2Forty2
            </p>
            <AnimatedHeading as="h1" lines={["Let's make", 'some *noise.*']} load className="t-hero max-w-xl" />
            <p className="t-lead mt-6 max-w-md" data-load="fade" data-load-delay="0.35">
              Bookings, press, collaborations or just a hello — the band would love to hear from you.
            </p>
            <div className="mt-8" data-load="fade" data-load-delay="0.5">
              <SocialLinks items={site.socials} />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-coal px-5 py-14 md:px-10 md:py-16 lg:pt-32 xl:px-16">
          <div className="pointer-events-none absolute -right-20 top-10 size-80 rounded-full bg-navy/70 blur-[120px]" aria-hidden="true" />
          <div className="relative">
            <div data-load="fade" data-load-delay="0.2">
              <Eyebrow index="07">Get in touch</Eyebrow>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:gap-4" data-load="fade" data-load-delay="0.3">
              <ContactCard icon={Mail} label="Bookings & general" value={site.contact.email} href={`mailto:${site.contact.email}`} placeholder />
              <ContactCard icon={Phone} label="Call the band" value={site.contact.phone} placeholder />
              <ContactCard icon={InstagramIcon} label="Instagram" value="@2forty2_official" href={instagram?.url} external />
              <ContactCard icon={YouTubeIcon} label="YouTube" value="Official channel" href={youtube?.url} external />
            </div>

            <div className="mt-12 border-t border-white/10 pt-10" data-load="fade" data-load-delay="0.45">
              <p className="t-eyebrow mb-6">Send a quick message</p>
              <QuickMessage />
            </div>

            <p className="mt-10 flex items-center gap-2 text-xs text-mist" data-load="fade" data-load-delay="0.55">
              <MapPin className="size-4" aria-hidden="true" /> Based in {site.location}
            </p>
          </div>
        </div>
      </section>

      {/* Instagram grid */}
      <section className="py-20 md:py-28" aria-labelledby="ig-title">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow index="IG" data-reveal="">Follow the band</Eyebrow>
              <h2 id="ig-title" className="t-h1 mt-6 normal-case" data-reveal="">
                @2forty2<span className="t-accent text-signal-soft">_official</span>
              </h2>
            </div>
            {instagram?.url && <Button href={instagram.url} variant="outline">Follow on Instagram</Button>}
          </div>
          <ul className="mt-10 grid grid-cols-3 gap-2 md:mt-12 md:grid-cols-6 md:gap-3" data-stagger="">
            {grid.map((ph, i) => (
              <li key={i}>
                <a href={instagram?.url} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden rounded-[3px] bg-coal" aria-label={`View on Instagram: ${ph.alt}`} data-cursor="Follow">
                  <Img image={ph} alt="" sizes="(min-width: 768px) 16vw, 33vw" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/50">
                    <InstagramIcon className="size-7 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ + next show */}
      <section className="bg-coal py-20 md:py-28" aria-labelledby="faq-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index="FAQ" data-reveal="">Good to know</Eyebrow>
            <AnimatedHeading lines={['Questions,', '*answered.*']} className="t-h1 mt-6" />
            <h2 id="faq-title" className="sr-only">Frequently asked questions</h2>
            <ul className="mt-10" data-stagger="">
              {FAQ.map((f, i) => {
                const expanded = open === i;
                return (
                  <li key={f.q} className="border-t border-white/10 last:border-b">
                    <h3>
                      <button type="button" className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={expanded} aria-controls={`faq-${i}`} id={`faq-btn-${i}`} onClick={() => setOpen(expanded ? -1 : i)}>
                        <span className="font-display text-lg font-bold uppercase leading-tight tracking-tight md:text-xl">{f.q}</span>
                        <span className={`grid size-10 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-500 ${expanded ? 'rotate-45 border-signal bg-signal' : ''}`}>
                          <Plus className="size-4" aria-hidden="true" />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE.expo }} className="overflow-hidden">
                          <p className="max-w-xl pb-6 leading-relaxed text-mist">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-xs text-mist">Answers are general guidance and will be confirmed by the band.</p>
          </div>

          {next && (
            <aside className="lg:col-span-4 lg:col-start-9" aria-label="Next show">
              <Link to="/events" className="group block lg:sticky lg:top-28" data-reveal="">
                <p className="t-eyebrow mb-4 flex items-center gap-3"><Equalizer className="text-signal-soft" /> Next show</p>
                <div className="overflow-hidden rounded-[4px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
                  <Img image={next.image} sizes="(min-width: 1024px) 30vw, 100vw" className="w-full transition-transform duration-[1.2s] ease-expo group-hover:scale-105" />
                </div>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl font-extrabold uppercase tracking-tight">{next.title}</p>
                    <p className="mt-1 text-sm text-fog">{nd.day} {nd.monthLong} · {next.venue}</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </aside>
          )}
        </div>
      </section>
    </Page>
  );
}
