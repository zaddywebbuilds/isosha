import { botanicals, vitamins, compounds } from '../config/ingredients.js';
import { images } from '../config/site.js';
import { Eyebrow, Icon, Img, Pending } from './ui.jsx';

/**
 * INSIDE ISOSHA
 *
 * Three tiers, in descending visual weight:
 *
 *   1. The four botanicals named in the formulation. Large cards, white,
 *      photography edge to edge.
 *   2. The four vitamins. A deep-green band, typographic only, no imagery,
 *      so they read as a different kind of thing.
 *   3. The four classes of plant compounds. Compact cards, clearly labelled
 *      as illustrative photography.
 *
 * The hierarchy is deliberate: the botanicals are confirmed ingredients, the
 * compound photographs are illustrations of a compound class. Giving all
 * eight images equal weight would blur that difference.
 */

function BotanicalCard({ item, index }) {
  return (
    <li
      style={{ transitionDelay: `${index * 80}ms` }}
      className="reveal group relative flex flex-col overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-forest/8 transition-shadow duration-500 hover:shadow-[0_26px_50px_-30px_rgba(0,59,23,0.45)]"
    >
      {/* Gold hairline that draws in on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="overflow-hidden">
        <Img
          image={images[`ingredient-${item.image}`]}
          sizes="(min-width: 1280px) 18rem, (min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
          className="w-full aspect-square object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
      </div>

      <div className="flex flex-col flex-1 px-6 pt-6 pb-7">
        <h3 className="text-[1.5rem] leading-tight text-forest">
          {item.commonName}
        </h3>
        <p className="mt-1 font-sans text-[0.8rem] italic tracking-wide text-gold-deep">
          {item.botanicalName}
        </p>

        <span
          aria-hidden="true"
          className="mt-4 block h-px w-10 bg-gold transition-[width] duration-500 group-hover:w-20"
        />

        <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-soft">
          {item.description}
        </p>
      </div>
    </li>
  );
}

function VitaminBand() {
  return (
    <div className="reveal relative mt-10 overflow-hidden rounded-[1.5rem] bg-forest text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 90% at 50% 0%, rgba(96,182,9,0.22), transparent 70%)',
        }}
      />

      <div className="relative px-6 py-8 sm:px-10 sm:py-9">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <Eyebrow tone="gold">Also in the formulation</Eyebrow>
            <h3 className="mt-4 text-[1.8rem] sm:text-[2.2rem]">
              Four vitamins
            </h3>
          </div>
          <p className="max-w-sm text-[0.82rem] leading-relaxed text-white/55">
            The notes below are general nutritional information about each
            vitamin. Amounts are not stated, because none has been supplied.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="mt-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        />

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {vitamins.map((v, i) => (
            <li
              key={v.id}
              className={[
                'group px-0 py-7 sm:px-6 lg:px-7',
                i % 2 === 1 ? 'sm:border-l sm:border-white/12' : '',
                i >= 2 ? 'sm:border-t sm:border-white/12' : '',
                'lg:border-t-0',
                i === 0
                  ? 'lg:border-l-0 sm:!pl-0 lg:!pl-0'
                  : 'lg:border-l lg:border-white/12',
                i > 0 ? 'border-t border-white/12 sm:border-t-0' : '',
              ].join(' ')}
            >
              <div className="flex items-baseline gap-2.5">
                <span className="font-serif text-[2.6rem] leading-none text-gold">
                  {v.name.replace('Vitamin ', '')}
                </span>
                <Icon
                  name="vitamin"
                  className="w-4 h-4 text-leaf opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <p className="mt-3 font-semibold text-[0.95rem]">{v.name}</p>
              <p className="eyebrow mt-1 text-[0.7rem] text-leaf-soft">
                {v.role}
              </p>
              <p className="mt-3 text-[0.84rem] leading-relaxed text-white/60">
                {v.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CompoundCard({ item, index }) {
  return (
    <li
      style={{ transitionDelay: `${index * 70}ms` }}
      className="reveal group flex gap-4 rounded-[1.1rem] bg-white p-3.5 ring-1 ring-forest/8 transition-shadow duration-500 hover:shadow-[0_18px_36px_-26px_rgba(0,59,23,0.45)] sm:flex-col sm:gap-0 sm:p-0 sm:overflow-hidden"
    >
      <div className="w-24 shrink-0 overflow-hidden rounded-[0.8rem] sm:w-full sm:rounded-none">
        <Img
          image={images[`compound-${item.image}`]}
          sizes="(min-width: 1024px) 17rem, (min-width: 640px) 45vw, 6rem"
          className="w-full aspect-square object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
      </div>

      <div className="min-w-0 sm:px-5 sm:pt-5 sm:pb-6">
        <h4 className="font-sans font-bold text-[0.98rem] leading-snug text-forest">
          {item.name}
        </h4>
        <p className="mt-1 text-[0.74rem] font-medium uppercase tracking-[0.1em] text-gold-deep">
          Shown: {item.shows}
        </p>
        <p className="mt-2.5 text-[0.82rem] leading-relaxed text-ink-soft">
          {item.note}
        </p>
      </div>
    </li>
  );
}

export default function Ingredients() {
  return (
    <section
      id="ingredients"
      className="relative overflow-hidden border-y border-forest/8 bg-white py-12 md:py-16"
      aria-labelledby="ingredients-heading"
    >
      {/* Soft botanical wash, kept to the approved greens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(45% 35% at 95% 2%, rgba(96,182,9,0.10), transparent 70%), radial-gradient(40% 30% at 2% 55%, rgba(96,182,9,0.07), transparent 70%)',
        }}
      />

      <div className="shell relative">
        {/* Header */}
        <div className="reveal max-w-2xl">
          <Eyebrow>What&rsquo;s inside Isosha?</Eyebrow>
          <h2
            id="ingredients-heading"
            className="mt-5 text-[clamp(1.65rem,7.4vw,2.1rem)] sm:text-4xl lg:text-[3rem] leading-[1.08] text-forest"
          >
            Nature-inspired ingredients,
            <br className="hidden sm:block" /> thoughtfully combined.
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Explore the botanical ingredients, vitamins and naturally occurring
            plant compounds listed in the Isosha formulation.
          </p>
        </div>

        {/* Tier 1: the four botanicals */}
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {botanicals.map((item, i) => (
            <BotanicalCard key={item.id} item={item} index={i} />
          ))}
        </ul>

        {/* Tier 2: the vitamins */}
        <VitaminBand />

        {/* Tier 3: the plant-compound classes */}
        <div className="mt-10">
          <div className="reveal max-w-xl">
            <div>
              <Eyebrow tone="forest">Listed plant compounds</Eyebrow>
              <h3 className="mt-4 text-[1.6rem] sm:text-[2rem] text-forest">
                Classes of compounds, not single plants
              </h3>
            </div>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {compounds.map((item, i) => (
              <CompoundCard key={item.id} item={item} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
