import Img from '../ui/Img';

/** Large editorial member portrait with alternating composition. */
export default function MemberProfile({ member, index, reverse = false }) {
  return (
    <article className={`group grid items-end gap-8 md:grid-cols-12 md:gap-10 ${reverse ? 'md:[direction:rtl]' : ''}`}>
      <div className="relative md:col-span-6 lg:col-span-5 [direction:ltr]">
        <div className="relative aspect-[4/5] overflow-hidden bg-coal" data-mask="">
          <Img
            image={member.image}
            w={900}
            h={1125}
            sizes="(min-width: 768px) 45vw, 100vw"
            alt={`Placeholder portrait for the ${member.role.toLowerCase()} position`}
            className="size-full object-cover grayscale transition-all duration-[1.2s] ease-expo group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          <span className="absolute bottom-4 left-4 font-brand text-xs font-bold text-bone/80">{String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>
      <div className="md:col-span-6 lg:col-span-6 lg:col-start-7 [direction:ltr]" data-reveal="">
        <p className="t-eyebrow mb-4 text-signal-soft">Member {String(index + 1).padStart(2, '0')}</p>
        <h3 className="t-h2">{member.role}</h3>
        <p className="mt-3 font-serif text-xl italic text-fog">{member.name || 'Name to be confirmed'}</p>
        <p className="mt-6 max-w-md leading-relaxed text-mist">{member.bio}</p>
      </div>
    </article>
  );
}
