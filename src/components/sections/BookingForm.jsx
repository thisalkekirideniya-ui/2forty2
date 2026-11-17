import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Check, Loader2, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import { getBookingOptions } from '../../services/content';
import { submitBookingInquiry } from '../../services/booking';
import { EASE } from '../../lib/motion';
import { scrollToTarget } from '../../lib/smoothScroll';

const { eventTypes, audienceSizes } = getBookingOptions();
const MAX_NOTES = 1000;

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};
const maxISO = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 3);
  return d.toISOString().slice(0, 10);
};

const EMPTY = { fullName: '', email: '', phone: '', eventType: '', eventDate: '', location: '', audienceSize: '', requirements: '' };

function validate(v) {
  const e = {};
  if (v.fullName.trim().length < 2) e.fullName = 'Please enter your full name.';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (!v.phone.trim()) e.phone = 'Please enter a contact number.';
  else if (!/^\+?[\d\s()-]{7,20}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (!v.eventType) e.eventType = 'Please choose an event type.';
  if (!v.eventDate) e.eventDate = 'Please choose your event date.';
  else if (v.eventDate < todayISO()) e.eventDate = 'The event date cannot be in the past.';
  else if (v.eventDate > maxISO()) e.eventDate = 'Please choose a date within the next three years.';
  if (v.location.trim().length < 2) e.location = 'Please enter the event location.';
  if (!v.audienceSize) e.audienceSize = 'Please choose an expected audience size.';
  if (v.requirements.length > MAX_NOTES) e.requirements = `Please keep this under ${MAX_NOTES} characters.`;
  return e;
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="t-eyebrow absolute left-0 top-0 text-[0.64rem]">
        {label} {required && <span className="text-signal-soft" aria-hidden="true">*</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="mt-2 flex items-center gap-2 text-xs text-ember"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle className="size-3.5" aria-hidden="true" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
      {hint && !error && <p className="mt-2 text-xs text-mist">{hint}</p>}
    </div>
  );
}

/**
 * Booking inquiry form — validated on blur and submit, with loading, success and
 * error states. Submission is SIMULATED in this frontend phase (see services/booking.js).
 */
export default function BookingForm({ initialType = '' }) {
  const [values, setValues] = useState({ ...EMPTY, eventType: eventTypes.some((t) => t.value === initialType) ? initialType : '' });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  const rootRef = useRef(null);
  const successRef = useRef(null);

  // Bring the confirmation into view and move focus to it for screen-reader users.
  useEffect(() => {
    if (status !== 'success') return;
    const t = setTimeout(() => {
      scrollToTarget(rootRef.current, { offset: -140 });
      successRef.current?.focus({ preventScroll: true });
    }, 450);
    return () => clearTimeout(t);
  }, [status]);

  const errors = useMemo(() => validate(values), [values]);
  const show = (k) => (touched[k] ? errors[k] : undefined);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const aria = (k) => ({
    'aria-invalid': show(k) ? 'true' : 'false',
    'aria-describedby': show(k) ? `${k}-error` : undefined,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])));
    const keys = Object.keys(errors);
    if (keys.length) {
      const first = formRef.current.querySelector(`[name="${keys[0]}"]`);
      first?.focus();
      return;
    }
    setStatus('submitting');
    try {
      const res = await submitBookingInquiry(values);
      setResult(res);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setResult(null);
    setStatus('idle');
  };

  const typeLabel = eventTypes.find((t) => t.value === values.eventType)?.label;

  return (
    <div ref={rootRef} className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            role="status"
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE.expo }}
          >
            <span className="mb-8 grid size-16 place-items-center rounded-full bg-signal">
              <Check className="size-7" strokeWidth={2} />
            </span>
            <h2 ref={successRef} tabIndex={-1} className="t-h2 outline-none">Inquiry <span className="t-accent text-signal-soft">received.</span></h2>
            <p className="t-lead mt-6 max-w-lg">
              Thank you, {values.fullName.split(' ')[0]}. Your details for a {typeLabel?.toLowerCase()} on{' '}
              {new Date(values.eventDate + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} in {values.location} are ready.
            </p>
            <div className="mt-8 w-full max-w-lg border border-dashed border-white/20 p-5 text-sm leading-relaxed text-fog">
              <p className="t-eyebrow mb-2 text-signal-soft">Preview mode · Ref {result?.reference}</p>
              This website is in its frontend preview phase, so <strong className="text-bone">no booking request has actually been sent</strong> to the band yet.
              Once the booking system is connected, inquiries will be delivered directly to the 2Forty2 team.
            </div>
            <button type="button" onClick={reset} className="group mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-bone">
              Start a new inquiry <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
            aria-describedby="form-required-note"
          >
            <p id="form-required-note" className="text-xs text-mist">
              Fields marked <span className="text-signal-soft">*</span> are required.
            </p>

            <div className="grid gap-10 md:grid-cols-2">
              <Field id="fullName" label="Full name" required error={show('fullName')}>
                <input id="fullName" name="fullName" type="text" autoComplete="name" className="field-input" value={values.fullName} onChange={set('fullName')} onBlur={blur('fullName')} {...aria('fullName')} />
              </Field>
              <Field id="email" label="Email address" required error={show('email')}>
                <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className="field-input" value={values.email} onChange={set('email')} onBlur={blur('email')} {...aria('email')} />
              </Field>
              <Field id="phone" label="Contact number" required error={show('phone')}>
                <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field-input" value={values.phone} onChange={set('phone')} onBlur={blur('phone')} {...aria('phone')} />
              </Field>
              <Field id="eventDate" label="Event date" required error={show('eventDate')}>
                <input id="eventDate" name="eventDate" type="date" min={todayISO()} max={maxISO()} className="field-input" value={values.eventDate} onChange={set('eventDate')} onBlur={blur('eventDate')} {...aria('eventDate')} />
              </Field>
            </div>

            <fieldset aria-describedby={show('eventType') ? 'eventType-error' : undefined}>
              <legend className="t-eyebrow mb-5 text-[0.64rem]">
                Event type <span className="text-signal-soft" aria-hidden="true">*</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((t) => (
                  <label
                    key={t.value}
                    className="cursor-pointer rounded-full border border-white/20 px-5 py-3 text-sm transition-all duration-300 hover:border-white/50 has-[:checked]:border-bone has-[:checked]:bg-bone has-[:checked]:text-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal-soft"
                  >
                    <input
                      type="radio"
                      name="eventType"
                      value={t.value}
                      checked={values.eventType === t.value}
                      onChange={(e) => {
                        set('eventType')(e);
                        blur('eventType')();
                      }}
                      className="sr-only"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
              <AnimatePresence>
                {show('eventType') && (
                  <motion.p id="eventType-error" className="mt-3 flex items-center gap-2 text-xs text-ember" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.eventType}
                  </motion.p>
                )}
              </AnimatePresence>
            </fieldset>

            <div className="grid gap-10 md:grid-cols-2">
              <Field id="location" label="Event location" required error={show('location')} hint="Venue name and city">
                <input id="location" name="location" type="text" autoComplete="address-level2" className="field-input" value={values.location} onChange={set('location')} onBlur={blur('location')} {...aria('location')} />
              </Field>
              <Field id="audienceSize" label="Expected audience size" required error={show('audienceSize')}>
                <select id="audienceSize" name="audienceSize" className="field-input" value={values.audienceSize} onChange={set('audienceSize')} onBlur={blur('audienceSize')} {...aria('audienceSize')}>
                  <option value="" disabled>Select a range</option>
                  {audienceSizes.map((s) => (
                    <option key={s} value={s}>{s} guests</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field id="requirements" label="Additional requirements" error={show('requirements')} hint={`${values.requirements.length} / ${MAX_NOTES} — schedule, song requests, sound or stage details`}>
              <textarea id="requirements" name="requirements" rows={4} className="field-input resize-none" value={values.requirements} onChange={set('requirements')} onBlur={blur('requirements')} {...aria('requirements')} />
            </Field>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div role="alert" className="flex items-start gap-3 border border-ember/40 bg-ember/10 p-4 text-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-ember" aria-hidden="true" />
                  <p>Something went wrong while sending your inquiry. Your details are still here — please try again in a moment.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
              <p className="flex max-w-sm items-start gap-3 text-xs leading-relaxed text-mist">
                <ShieldCheck className="size-4 shrink-0 text-signal-soft" aria-hidden="true" />
                Your details are used only to respond to this inquiry. They are never sold or shared with third parties.
              </p>
              <Button type="submit" size="lg" disabled={status === 'submitting'} icon={status === 'submitting' ? null : undefined} aria-live="polite">
                {status === 'submitting' ? (
                  <span className="flex items-center gap-3"><Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…</span>
                ) : status === 'error' ? 'Try again' : 'Send inquiry'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
