import { useRef } from 'react';
import Img from '../ui/Img';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';

/** Vertical journey timeline; the spine fills as the reader scrolls through it. */
export default function Timeline({ items }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '[data-spine]',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 60%', end: 'bottom 70%', scrub: true } }
      );
      gsap.utils.toArray('[data-node]').forEach((node) => {
        gsap.from(node, { scale: 0, duration: 0.6, ease: 'back.out(3)', scrollTrigger: { trigger: node, start: 'top 65%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <ol ref={root} className="relative">
      <span className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:left-1/2" aria-hidden="true" />
      <span data-spine="" className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-signal md:left-1/2" aria-hidden="true" />

      {items.map((item, i) => {
        const right = i % 2 === 1;
        return (
          <li key={item.id} className="relative grid gap-8 pb-20 pl-10 last:pb-0 md:grid-cols-2 md:gap-20 md:pl-0 md:pb-32">
            <span data-node="" className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-signal bg-ink md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
            <div className={`${right ? 'md:order-2 md:pl-4' : 'md:pr-4 md:text-right'}`} data-reveal="">
              <p className="font-display text-4xl font-black uppercase leading-none text-outline md:text-6xl">{item.year}</p>
              <h3 className="t-h3 mt-4">{item.title}</h3>
              <p className={`mt-4 max-w-md leading-relaxed text-mist ${right ? '' : 'md:ml-auto'}`}>{item.text}</p>
            </div>
            <div className={`${right ? 'md:order-1' : ''}`}>
              <div className={`aspect-[16/10] overflow-hidden bg-coal md:w-4/5 ${right ? 'md:ml-auto' : ''}`} data-mask="">
                <Img image={item.image} w={900} h={562} sizes="(min-width: 768px) 40vw, 100vw" className="size-full object-cover" />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
