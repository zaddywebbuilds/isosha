import {
  botanicals,
  vitamins,
  compounds,
  quantitiesNote,
} from '../config/ingredients.js';
import { BotanicalMark } from './BotanicalMarks.jsx';
import { Eyebrow, Icon, Pending } from './ui.jsx';

export default function Ingredients() {
  return (
    <section
      id="ingredients"
      className="relative bg-forest text-white py-16 md:py-24 overflow-hidden"
      aria-labelledby="ingredients-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 85% 10%, rgba(96,182,9,0.2), transparent 70%), radial-gradient(50% 40% at 0% 90%, rgba(96,182,9,0.14), transparent 70%)',
        }}
      />

      <div className="shell relative">
        <div className="reveal max-w-2xl">
          <Eyebrow tone="gold">Inside the capsule</Eyebrow>
          <h2
            id="ingredients-heading"
            className="mt-5 text-[2.1rem] sm:text-4xl lg:text-[2.9rem]"
          >
            Explore the ingredients inside Isosha
          </h2>
          <p className="mt-5 text-white/70 leading-relaxed">
            A combination of botanical ingredients, plant compounds and
            vitamins.
          </p>
        </div>

        {/* Botanicals */}
        <ul className="mt-12 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {botanicals.map((item, i) => (
            <li
              key={item.id}
              style={{ transitionDelay: `${i * 80}ms` }}
              className="reveal group relative flex flex-col rounded-[1.25rem] border border-gold/25 bg-white/[0.04] p-6 backdrop-blur-[2px] transition-colors duration-300 hover:border-gold/60 hover:bg-white/[0.07]"
            >
              <div className="w-20 h-20 -mt-1 mb-4 text-leaf">
                <BotanicalMark id={item.id} />
              </div>

              <h3 className="text-[1.25rem] leading-tight">{item.commonName}</h3>
              <p className="mt-1 text-[0.8rem] italic text-gold/90">
                {item.botanicalName}
              </p>
              <p className="mt-3.5 text-[0.87rem] text-white/65 leading-relaxed">
                {item.description}
              </p>

              {!item.confirmed && (
                <p className="mt-4">
                  <Pending>{item.pendingNote}</Pending>
                </p>
              )}
            </li>
          ))}
        </ul>

        {/* Vitamins */}
        <div className="mt-16">
          <div className="reveal flex items-end justify-between gap-6 flex-wrap">
            <h3 className="text-[1.6rem] sm:text-[1.9rem]">
              Vitamins in the formulation
            </h3>
            <p className="text-[0.82rem] text-white/55 max-w-md">
              The descriptions below are general nutritional information about
              each vitamin.
            </p>
          </div>

          <ul className="mt-7 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {vitamins.map((v, i) => (
              <li
                key={v.id}
                style={{ transitionDelay: `${i * 70}ms` }}
                className="reveal rounded-[1.25rem] bg-white text-ink p-6 border-t-[3px] border-gold"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-serif text-[1.5rem] text-forest leading-none">
                    {v.name}
                  </h4>
                  <Icon name="vitamin" className="w-6 h-6 text-leaf shrink-0" />
                </div>
                <p className="mt-2 eyebrow text-[0.6rem] text-forest-line">
                  {v.role}
                </p>
                <p className="mt-3.5 text-[0.87rem] text-ink-soft leading-relaxed">
                  {v.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Listed compounds */}
        <div className="reveal mt-14 rounded-[1.25rem] border border-white/15 bg-forest-deep/60 p-6 sm:p-9">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h3 className="text-[1.45rem]">Additional listed components</h3>
            <Pending>Specification pending</Pending>
          </div>
          <p className="mt-3 text-[0.88rem] text-white/60 max-w-3xl leading-relaxed">
            These are classes of plant compounds rather than dosed
            declarations. They are shown as listed formulation components,
            pending the manufacturer&rsquo;s confirmed specification.
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {compounds.map((c) => (
              <li
                key={c.name}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              >
                <p className="font-semibold text-[0.98rem] text-leaf-soft">
                  {c.name}
                </p>
                <p className="mt-1.5 text-[0.8rem] text-white/55 leading-relaxed">
                  {c.note}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-7 flex items-start gap-2.5 text-[0.82rem] text-white/55 border-t border-white/10 pt-5">
            <Icon name="doc" className="w-4 h-4 mt-0.5 shrink-0 text-gold/80" />
            {quantitiesNote}
          </p>
        </div>
      </div>
    </section>
  );
}
