const TZ = 'Asia/Colombo';

export function formatEventDate(iso) {
  const d = new Date(iso);
  const part = (opts) => new Intl.DateTimeFormat('en-GB', { timeZone: TZ, ...opts }).format(d);
  return {
    day: part({ day: '2-digit' }),
    month: part({ month: 'short' }),
    monthLong: part({ month: 'long' }),
    year: part({ year: 'numeric' }),
    weekday: part({ weekday: 'long' }),
    time: part({ hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase(),
    full: part({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    iso: d.toISOString(),
  };
}

export const pad2 = (n) => String(n).padStart(2, '0');
