import { product } from '../config/product.js';
import { images } from '../config/site.js';
import { Eyebrow, GoldRule, Icon, Img } from './ui.jsx';

import { sections } from '../config/copy.js';

const { about } = sections;

export default function ProductIntroduction() {
  return (
    <section
      id="about"
      className="bg-cream py-12 md:py-16"
      aria-labelledby="about-heading"
    >
      <div className="shell grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image */}
        <figure className="reveal relative">
          <div className="overflow-hidden rounded-[1.5rem] border border-forest/10 bg-mist">
            <Img
              image={images.bottleSquare}
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="w-full aspect-square object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-3 sm:-right-5 hidden sm:flex flex-col items-center justify-center w-24 h-24 rounded-full bg-forest text-white border-2 border-gold"
          >
            <span className="font-serif text-3xl leading-none">
              {product.capsulesPerBottle}
            </span>
            <span className="eyebrow text-[0.7rem] text-gold mt-1">
              Capsules
            </span>
          </div>
        </figure>

        {/* Copy */}
        <div className="reveal">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2
            id="about-heading"
            className="mt-5 text-[clamp(1.65rem,7.4vw,2.1rem)] sm:text-4xl lg:text-[2.9rem] text-forest"
          >
            {about.headline}
          </h2>

          <GoldRule className="mt-6 max-w-[8rem] !bg-gold" />

          <p className="mt-6 text-ink-soft leading-relaxed">{about.body}</p>

          <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
            {about.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <span
                  className="grid place-items-center w-5 h-5 mt-0.5 rounded-full bg-leaf-wash text-forest shrink-0"
                  aria-hidden="true"
                >
                  <Icon name="check" className="w-3 h-3" />
                </span>
                <span className="text-[0.95rem] text-ink">{point}</span>
              </li>
            ))}
          </ul>

          <a href="#packages" className="btn btn-forest mt-9">
            {about.cta}
            <Icon name="arrow" className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
