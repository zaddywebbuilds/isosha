import { whyNow } from '../config/copy.js';
import { Eyebrow, Icon } from './ui.jsx';

/**
 * Problem agitation, done without fear.
 *
 * Each pressure named here is ordinary, verifiable and specific to living in
 * Nigeria. None of them threatens the reader with blindness, which the brief
 * rules out and which this audience has learned to distrust anyway.
 */
export default function WhyNow() {
  return (
    <section
      id="why-now"
      className="bg-mist py-12 md:py-16"
      aria-labelledby="why-now-heading"
    >
      <div className="shell">
        <div className="reveal max-w-2xl">
          <Eyebrow>{whyNow.eyebrow}</Eyebrow>
          <h2
            id="why-now-heading"
            className="mt-5 text-[2rem] sm:text-4xl lg:text-[2.75rem] leading-[1.08] text-forest"
          >
            {whyNow.headline}
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">{whyNow.body}</p>
        </div>

        <ul className="mt-8 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {whyNow.reasons.map((reason, i) => (
            <li
              key={reason.title}
              style={{ transitionDelay: `${i * 70}ms` }}
              className="reveal card p-6"
            >
              <span
                className="grid place-items-center w-11 h-11 rounded-full bg-leaf-wash text-forest"
                aria-hidden="true"
              >
                <Icon name={reason.icon} className="w-5 h-5" />
              </span>
              <h3 className="mt-4 font-sans font-bold text-[1rem] leading-snug text-forest">
                {reason.title}
              </h3>
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-soft">
                {reason.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="reveal mt-7 max-w-2xl font-serif text-[1.3rem] sm:text-[1.5rem] leading-snug text-forest">
          {whyNow.close}
        </p>
      </div>
    </section>
  );
}
