import { useState } from 'react';
import { product, productInfoPanels } from '../config/product.js';
import { images } from '../config/site.js';
import { Eyebrow, Icon, Img } from './ui.jsx';
import { sections } from '../config/copy.js';

const facts = [
  { label: 'Product', value: product.name },
  { label: 'Form', value: product.form },
  { label: 'Quantity', value: `${product.capsulesPerBottle} capsules per bottle` },
  { label: 'Dosage', value: product.dosage, note: product.dosageNote },
  { label: 'Target market', value: product.market },
  { label: 'Intended for', value: product.audience },
];

function Panel({ panel }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-forest/10">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`panel-${panel.id}`}
          className="flex w-full items-center justify-between gap-4 py-4 text-left"
        >
          <span className="font-sans font-bold text-[1.08rem] text-forest">
            {panel.title}
          </span>
          <Icon
            name="plus"
            className={`w-5 h-5 shrink-0 text-leaf transition-transform duration-300 ${
              open ? 'rotate-45' : ''
            }`}
          />
        </button>
      </h3>
      <div id={`panel-${panel.id}`} hidden={!open} className="pb-5 -mt-1">
        <p className="text-[0.89rem] text-ink-soft leading-relaxed max-w-2xl">
          {panel.body}
        </p>
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const readyPanels = productInfoPanels.filter((panel) => !panel.pending);

  return (
    <section
      id="product-information"
      className="bg-cream py-12 md:py-16"
      aria-labelledby="details-heading"
    >
      <div className="shell grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">
        <figure className="reveal lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[1.5rem] border border-forest/10">
            <Img
              image={images.dailyRoutine}
              sizes="(min-width: 1024px) 34vw, 92vw"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </figure>

        <div className="reveal">
          <Eyebrow>{sections.details.eyebrow}</Eyebrow>
          <h2
            id="details-heading"
            className="mt-5 text-[clamp(1.65rem,7.4vw,2.1rem)] sm:text-4xl lg:text-[2.9rem] text-forest"
          >
            {sections.details.headline}
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed max-w-xl">
            Each bottle contains {product.capsulesPerBottle} capsules. The
            dosage provided by the manufacturer is one capsule daily, so one
            bottle represents {product.daysPerBottle} days of use at that
            dosage.
          </p>

          <dl className="mt-9 grid sm:grid-cols-2 gap-x-8">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="py-4 border-b border-forest/10"
              >
                <dt className="eyebrow text-[0.76rem] text-forest-line">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-[1.06rem] text-ink font-medium">
                  {fact.value}
                </dd>
                {fact.note && (
                  <dd className="text-[0.86rem] text-ink-soft mt-0.5">
                    {fact.note}
                  </dd>
                )}
              </div>
            ))}
          </dl>

          <p className="mt-8 flex items-start gap-2.5 rounded-xl bg-leaf-wash border border-leaf/25 p-4 text-[0.96rem] text-forest leading-relaxed">
            <Icon name="shield" className="w-5 h-5 mt-0.5 shrink-0 text-forest" />
            Follow the approved product label and consult a qualified
            healthcare professional before use, especially if you have an
            existing eye condition or take prescription medication.
          </p>

          {/*
            Label panels appear only once they carry real wording from the
            approved product label. Fill a panel's `body` in
            src/config/product.js and set `pending: false`, and both the
            heading and that panel appear.
          */}
          {readyPanels.length > 0 && (
            <div className="mt-10">
              <h3 className="eyebrow text-[0.76rem] text-forest-line mb-1">
                Further label information
              </h3>
              {readyPanels.map((panel) => (
                <Panel key={panel.id} panel={panel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
