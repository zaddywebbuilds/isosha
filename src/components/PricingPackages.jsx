import { packages, formatPrice, packageMath, singleBottlePrice } from '../config/pricing.js';
import { product } from '../config/product.js';
import { images } from '../config/site.js';
import { sections } from '../config/copy.js';
import { Eyebrow, Icon, Img } from './ui.jsx';

const copy = sections.packages;

/**
 * Pricing card artwork.
 *
 * Only one product photograph was supplied, so every card shows that same
 * bottle and states the quantity in type. No two-bottle or three-bottle
 * render is fabricated: an invented product photograph would show packaging
 * that does not exist. A dedicated multi-bottle photograph is listed in
 * CLIENT-CHECKLIST.md as still outstanding.
 */
function PackArt({ bottles }) {
  return (
    <div className="relative w-full h-full">
      <Img
        image={images.bottleSquare}
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
        className="w-full h-full object-cover"
      />
      <p className="absolute bottom-3 left-3 inline-flex items-baseline gap-1.5 rounded-full border border-gold/60 bg-forest-deep/85 px-3.5 py-1.5 text-white backdrop-blur-[2px]">
        <span className="font-serif text-lg leading-none">&times;{bottles}</span>
        <span className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-gold">
          bottle{bottles > 1 ? 's' : ''}
        </span>
      </p>
    </div>
  );
}

function PackageCard({ pkg, selected, onSelect }) {
  const { capsules, days, perBottle, savings } = packageMath(
    pkg,
    product.capsulesPerBottle,
  );
  const isSelected = selected === pkg.id;

  return (
    <li
      className={`reveal relative flex flex-col overflow-hidden rounded-[1.5rem] bg-white transition-[transform,box-shadow,border-color] duration-300 ${
        pkg.featured
          ? 'border-2 border-gold shadow-[0_28px_60px_-34px_rgba(0,59,23,0.55)] lg:-translate-y-3'
          : pkg.accent
            ? 'border border-gold/45'
            : 'border border-forest/12'
      } ${isSelected ? 'ring-2 ring-leaf ring-offset-2 ring-offset-mist' : ''}`}
    >
      {pkg.badge && (
        <p className="absolute top-4 right-4 z-10 rounded-full bg-gold px-3 py-1 text-[0.7rem] font-extrabold tracking-[0.18em] text-forest-deep">
          {pkg.badge}
        </p>
      )}

      <div className="aspect-[4/3] overflow-hidden border-b border-forest/8">
        <PackArt bottles={pkg.bottles} />
      </div>

      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <h3 className="text-[1.55rem] text-forest leading-tight">
          {pkg.title}
        </h3>
        <p className="mt-1.5 text-[0.85rem] text-ink-soft">{pkg.blurb}</p>

        <dl className="mt-5 space-y-2 text-[0.86rem]">
          <div className="flex justify-between gap-4 border-b border-forest/8 pb-2">
            <dt className="text-ink-soft">Contents</dt>
            <dd className="font-semibold text-ink">
              {pkg.bottles} bottle{pkg.bottles > 1 ? 's' : ''}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-forest/8 pb-2">
            <dt className="text-ink-soft">Quantity</dt>
            <dd className="font-semibold text-ink">{capsules} capsules</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-forest/8 pb-2">
            <dt className="text-ink-soft">Supply at stated dosage</dt>
            <dd className="font-semibold text-ink">{days} days</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">Price per bottle</dt>
            <dd className="font-semibold text-ink">{formatPrice(perBottle)}</dd>
          </div>
        </dl>

        <div className="mt-6 pt-5 border-t border-forest/10">
          <p className="font-serif text-[2.6rem] leading-none text-forest">
            {formatPrice(pkg.price)}
          </p>
          {savings > 0 ? (
            <p className="mt-2 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-forest-line">
              <Icon name="check" className="w-3.5 h-3.5" />
              Save {formatPrice(savings)} against {pkg.bottles} single bottles
            </p>
          ) : (
            <p className="mt-2 text-[0.82rem] text-ink-soft">
              Single bottle price
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSelect(pkg.id)}
          aria-pressed={isSelected}
          className={`btn mt-6 w-full ${
            pkg.featured ? 'btn-gold' : isSelected ? 'btn-leaf' : 'btn-forest'
          }`}
        >
          {isSelected ? (
            <>
              <Icon name="check" className="w-4 h-4" />
              Selected
            </>
          ) : (
            pkg.cta
          )}
        </button>
      </div>
    </li>
  );
}

export default function PricingPackages({ selected, onSelect }) {
  // Cheapest per-day cost across the packages, derived not typed.
  const perDay = Math.min(
    ...packages.map((p) =>
      Math.round(p.price / (p.bottles * product.capsulesPerBottle)),
    ),
  );

  return (
    <section
      id="packages"
      className="bg-mist py-12 md:py-16"
      aria-labelledby="packages-heading"
    >
      <div className="shell">
        <div className="reveal max-w-2xl">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2
            id="packages-heading"
            className="mt-5 text-[clamp(1.65rem,7.4vw,2.1rem)] sm:text-4xl lg:text-[2.9rem] text-forest"
          >
            {copy.headline}
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed">{copy.body}</p>
        </div>

        <ul className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-start">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </ul>

        {/* Cost reframe. The per-day figure is derived from the same config
            as the cards, so it can never contradict the prices above. */}
        <p className="reveal mt-8 max-w-3xl rounded-xl border border-forest/12 bg-white p-5 font-serif text-[1.15rem] leading-snug text-forest">
          {copy.valueFraming.replace('{perDay}', formatPrice(perDay))}
        </p>

        <p className="reveal mt-4 text-[0.8rem] text-ink-soft">
          {copy.footnote.replace('{single}', formatPrice(singleBottlePrice))}
        </p>
      </div>
    </section>
  );
}
