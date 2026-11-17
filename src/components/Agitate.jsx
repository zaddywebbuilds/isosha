import { agitate } from '../config/copy.js';
import { Eyebrow, Icon } from './ui.jsx';

/**
 * PAS stage two: Agitate.
 *
 * Movement one names the daily frictions the reader already lives with.
 * Movement two explains why waiting is the expensive choice, and then sends
 * them to an eye examination rather than to the buy button.
 *
 * That second part is counter-intuitive as sales copy and is the point. The
 * reader is at peak concern here, which is exactly where every competitor
 * pushes the product. Pointing at a professional instead is what earns the
 * right to sell three paragraphs later, and it is also simply the correct
 * advice.
 */
export default function Agitate() {
  return (
    <section
      id="why-now"
      className="bg-mist py-8 md:py-12"
      aria-labelledby="agitate-heading"
    >
      <div className="shell">
        {/* Movement one: the daily cost */}
        {/*
          Heading left, intro right from lg up. Capped at max-w-2xl it left
          a 576px empty column on a desktop screen and stacked two blocks
          that fit side by side. Line length stays readable because each
          column is still about 45 characters wide, not the full shell.
        */}
        <div className="reveal grid gap-x-10 gap-y-4 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>{agitate.eyebrow}</Eyebrow>
            <h2
              id="agitate-heading"
              className="mt-5 text-[clamp(1.6rem,7.2vw,2rem)] sm:text-4xl lg:text-[2.75rem] leading-[1.08] text-forest"
            >
              {agitate.headline}
            </h2>
          </div>
          <p className="mt-5 lg:mt-0 leading-relaxed text-ink-soft">
            {agitate.body}
          </p>
        </div>

        <ul className="mt-6 grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {agitate.frictions.map((item, i) => (
            <li
              key={item.title}
              style={{ transitionDelay: `${i * 70}ms` }}
              className="reveal card p-5"
            >
              <span
                className="grid place-items-center w-11 h-11 rounded-full bg-leaf-wash text-forest"
                aria-hidden="true"
              >
                <Icon name={item.icon} className="w-5 h-5" />
              </span>
              <h3 className="mt-4 font-sans font-bold text-[1.06rem] leading-snug text-forest">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.96rem] leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        {/* Movement two: why waiting costs more */}
        <div className="reveal mt-6 overflow-hidden rounded-[1.5rem] bg-forest text-white">
          <div className="relative px-6 py-9 sm:px-10 sm:py-11">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(60% 80% at 90% 0%, rgba(96,182,9,0.18), transparent 70%)',
              }}
            />

            {/*
              The heading is four words against a column of evidence, so
              laid out items-start it left a 460px hole underneath itself.
              Two changes close it. The heading now centres against the
              list rather than hanging from the top, and the closing
              statement has moved out of the right-hand column to sit full
              width below both.

              That second move is why the reading order still works on a
              phone, where this all stacks: the facts come first and the
              conclusion drawn from them comes last. Putting the closing
              into the left column would have filled the hole just as well
              and made a phone read the conclusion before the evidence.
            */}
            <div className="relative grid lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-12 lg:items-center">
              <div>
                <Eyebrow tone="gold">{agitate.turn.eyebrow}</Eyebrow>
                <h3 className="mt-4 text-[clamp(1.45rem,6.2vw,1.7rem)] sm:text-[2.1rem] leading-[1.1]">
                  {agitate.turn.headline}
                </h3>
              </div>

              <ul className="space-y-3.5">
                {agitate.turn.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                    <span className="text-[1.08rem] leading-relaxed text-white/90">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-white/15 pt-6">
              <p className="font-serif text-[1.3rem] sm:text-[1.5rem] leading-snug text-leaf-soft max-w-4xl">
                {agitate.turn.closing}
              </p>
              <p className="mt-3 text-[0.96rem] text-white/90">
                {agitate.turn.cta}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
