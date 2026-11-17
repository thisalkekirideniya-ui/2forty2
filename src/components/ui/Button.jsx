import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-bone text-ink hover:text-white',
  outline: 'border border-white/25 text-bone hover:border-signal hover:text-white',
  dark: 'bg-ink text-bone hover:text-white',
};
const SIZES = {
  md: 'h-12 pl-6 pr-5 text-[0.7rem]',
  lg: 'h-14 pl-8 pr-6 text-[0.74rem] md:h-16 md:pl-10 md:pr-8',
};

/**
 * Animated pill button. Renders a router Link (`to`), an anchor (`href`) or a <button>.
 * Hover: signal-blue fill rises, label rolls, arrow rotates.
 */
export default function Button({ to, href, children, variant = 'primary', size = 'md', icon: Icon = ArrowUpRight, className = '', ...rest }) {
  const cls = `group relative isolate inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-3 overflow-hidden rounded-full font-semibold uppercase tracking-[0.18em] transition-colors duration-500 disabled:pointer-events-none disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const inner = (
    <>
      <span className="absolute inset-0 -z-10 translate-y-[101%] rounded-full bg-signal transition-transform duration-500 ease-expo group-hover:translate-y-0" aria-hidden="true" />
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">{children}</span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0" aria-hidden="true">
          {children}
        </span>
      </span>
      {Icon && <Icon className="size-4 shrink-0 transition-transform duration-500 ease-expo group-hover:rotate-45" strokeWidth={1.75} aria-hidden="true" />}
    </>
  );

  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}

/** Understated text link with a drawn underline. */
export function TextLink({ to, href, children, className = '', icon: Icon = ArrowUpRight, ...rest }) {
  const cls = `group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-bone ${className}`;
  const inner = (
    <>
      <span className="relative pb-1">
        {children}
        <span className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-100 bg-white/40 transition-transform duration-500 ease-expo group-hover:origin-left group-hover:scale-x-0" />
        <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform delay-150 duration-500 ease-expo group-hover:scale-x-100" />
      </span>
      {Icon && <Icon className="size-4 transition-transform duration-500 ease-expo group-hover:rotate-45" strokeWidth={1.75} aria-hidden="true" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}
