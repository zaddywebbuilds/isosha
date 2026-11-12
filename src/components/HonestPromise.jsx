import { promise } from '../config/copy.js';
import { Eyebrow, Icon } from './ui.jsx';

/**
 * The positioning section.
 *
 * It sits directly under the hero because it does the work no other section
 * can: it separates Isosha from every "cure glaucoma in 30 days" advert the
 * reader has already seen. The admission comes before the pitch, which is
 * what makes the pitch credible.
 */
export default function HonestPromise() {
  return (
    <section
      id="promise"
      className="relative overflow-hidden bg-forest-deep text-white py-12 md:py-16"
      aria-labelledby="promise-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 55% at 85% 10%, rgba(96,182,9,0.14), transparent 72%)',
        }}
      />

      <div className="shell relative">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14 items-start">
          {/* Heading and pull quote */}
          <div className="reveal lg:sticky lg:top-28">
            <Eyebrow tone="gold">{promise.eyebrow}</Eyebrow>
            <h2
              id="promise-heading"
              className="mt-5 text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.06]"
            >
              {promise.headline}
            </h2>

            <figure className="mt-7 border-l-2 border-gold pl-5">
              <blockquote className="font-serif text-[1.25rem] leading-snug text-leaf-soft">
                {promise.pullQuote}
              </blockquote>
            </figure>
          </div>

          {/* The argument */}
          <div className="reveal">
            <div className="space-y-4 text-[1rem] leading-relaxed text-white/75">
              {promise.paragraphs.map((text, i) => (
                <p
                  key={i}
                  className={
                    // The one-line refusal is the hinge of the whole page, so
                    // it is set as display type rather than body copy. Index 2
                    // because a bridging paragraph now opens the section.
                    i === 2
                      ? 'font-serif text-[1.6rem] sm:text-[1.9rem] leading-snug text-white py-1'
                      : undefined
                  }
                >
                  {text}
                </p>
              ))}
            </div>

            <ul className="mt-8 grid sm:grid-cols-3 gap-5 border-t border-white/12 pt-7">
              {promise.points.map((point, i) => (
                <li key={point.title} style={{ transitionDelay: `${i * 70}ms` }}>
                  <Icon name={point.icon} className="w-6 h-6 text-gold" />
                  <p className="mt-3 font-semibold text-[0.95rem]">
                    {point.title}
                  </p>
                  <p className="mt-1.5 text-[0.84rem] leading-relaxed text-white/55">
                    {point.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
