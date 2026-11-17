import { MapPin, Phone, Ticket } from 'lucide-react';
import Img from '../ui/Img';
import Button from '../ui/Button';
import { formatEventDate } from '../../lib/format';

const STATUS = {
  soon: 'Tickets soon',
  private: 'Private event',
  free: 'Open entry',
};

export function TicketAction({ event, past }) {
  if (past) {
    return <span className="inline-flex h-11 items-center rounded-full border border-white/10 px-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-mist">Completed</span>;
  }
  if (event.ticketUrl) {
    return <Button href={event.ticketUrl} icon={Ticket}>Get tickets</Button>;
  }
  if (event.ticketPhone) {
    return (
      <Button href={`tel:${event.ticketPhone.replace(/\s/g, '')}`} icon={Phone} target="_self">
        Tickets · {event.ticketPhone}
      </Button>
    );
  }
  return (
    <span className="inline-flex h-11 items-center rounded-full border border-white/15 px-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-fog">
      {STATUS[event.ticketStatus] || 'Details soon'}
    </span>
  );
}

export function PriceList({ prices, className = '' }) {
  if (!prices?.length) return null;
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 text-sm ${className}`}>
      {prices.map((p) => (
        <li key={p.label}>
          <span className="text-mist">{p.label}</span> <span className="font-semibold text-bone">{p.value}</span>
        </li>
      ))}
    </ul>
  );
}

/** Editorial event listing row: big date, details, poster and ticket action. */
export default function EventRow({ event, past = false }) {
  const d = formatEventDate(event.date);
  const place = [event.venue, event.city].filter(Boolean).join(', ');
  return (
    <article className="group relative grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-5 border-t border-white/10 py-8 transition-colors duration-500 hover:bg-white/[0.02] lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-10">
      <time dateTime={d.iso} className="flex items-start gap-3 lg:col-span-2">
        <span className="font-display text-5xl font-extrabold leading-[0.8] tracking-tight lg:text-6xl">{d.day}</span>
        <span className="pt-1 text-xs font-semibold uppercase leading-snug tracking-[0.2em] text-mist">
          {d.month}
          <br />
          {d.year}
        </span>
      </time>

      <div className="lg:col-span-5">
        <p className="t-eyebrow mb-3 text-signal-soft">{event.presenter || event.type} · {d.weekday} · {d.time}</p>
        <h3 className="t-h2 transition-colors duration-500 group-hover:text-signal-soft">{event.title}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-fog">
          <MapPin className="size-4 text-mist" strokeWidth={1.5} aria-hidden="true" />
          {place}
        </p>
        <PriceList prices={event.prices} className="mt-4" />
      </div>

      <div className="col-span-2 lg:col-span-2 lg:col-start-8">
        <div className="aspect-[4/5] w-36 overflow-hidden sm:w-40 rounded-[3px] bg-coal shadow-2xl lg:w-full">
          <Img image={event.image} sizes="(min-width: 768px) 15vw, 160px" className="size-full object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-105" />
        </div>
      </div>

      <div className="col-span-2 lg:col-span-3 lg:text-right">
        <TicketAction event={event} past={past} />
      </div>
    </article>
  );
}
