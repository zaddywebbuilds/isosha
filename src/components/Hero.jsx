import { product } from '../config/product.js';
import { hero } from '../config/copy.js';
import { images } from '../config/site.js';
import { Eyebrow, Icon, Img } from './ui.jsx';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-forest text-white"
      aria-labelledby="hero-heading"
    >
      {/* Depth: a soft leaf-green glow behind the product, and a faint
          botanical arc. Both are decorative and carry no content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          // Kept to the left, behind the copy. The product photograph has its
          // own deep-green background, so the area around it stays dark and
          // the bottle separates instead of blending in.
          background:
            'radial-gradient(55% 60% at 12% 28%, rgba(96,182,9,0.20), transparent 70%), radial-gradient(60% 60% at 95% 95%, rgba(0,0,0,0.35), transparent 65%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 w-[32rem] h-[32rem] rounded-full border border-gold/15"
      />

      <div className="shell relative py-10 sm:py-14 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 sm:gap-8 lg:gap-12 items-center">
          {/* Copy */}
          <div className="reveal max-w-xl">
            <Eyebrow tone="gold">{hero.eyebrow}</Eyebrow>

            <h1
              id="hero-heading"
              className="mt-5 text-[clamp(2rem,9.6vw,2.6rem)] leading-[1.06] sm:text-5xl lg:text-[4.1rem] text-white"
            >
              {hero.headlineLead}
              <br />
              <span className="text-leaf-soft">{hero.headlineAccent}</span>
            </h1>

            <p className="mt-6 text-white/80 text-[1.08rem] leading-relaxed max-w-lg">
              {hero.body}
            </p>
            <p className="mt-3.5 text-white/60 text-[1.02rem] leading-relaxed max-w-lg">
              {hero.bodyTwo}
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a href="#packages" className="btn btn-gold">
                {hero.primaryCta}
                <Icon name="arrow" className="w-4 h-4" />
              </a>
              <a href="#why-now" className="btn btn-ghost-light">
                {hero.secondaryCta}
              </a>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 max-w-md border-t border-white/15 pt-6">
              <div>
                <dt className="eyebrow text-[0.7rem] text-gold/80">Per bottle</dt>
                <dd className="mt-1.5 font-serif text-2xl">
                  {product.capsulesPerBottle}
                  <span className="text-sm font-sans text-white/60 ml-1.5">
                    capsules
                  </span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.7rem] text-gold/80">Dosage</dt>
                <dd className="mt-1.5 font-serif text-2xl">
                  1<span className="text-sm font-sans text-white/60 ml-1.5">daily</span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.7rem] text-gold/80">Vitamins</dt>
                <dd className="mt-1.5 font-serif text-2xl leading-none">
                  A<span className="text-white/35">·</span>B2
                  <span className="text-white/35">·</span>C
                  <span className="text-white/35">·</span>E
                </dd>
              </div>
            </dl>
          </div>

          {/* Product */}
          {/* On phones the copy and the primary call to action come first, so
              the Explore Packages button is reachable without a long scroll.
              The bottle sits directly underneath, capped so it never fills
              the whole screen. */}
          <div className="reveal relative">
            <div className="relative mx-auto w-[78%] max-w-[17rem] sm:w-full sm:max-w-[22rem] lg:max-w-none">
              {/* Pedestal glow behind the frame */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 bottom-[-6%] w-[82%] h-20 rounded-[50%] blur-2xl bg-leaf/35"
              />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-gold/40 ring-1 ring-white/10 shadow-[0_32px_70px_-26px_rgba(0,0,0,0.8)]">
                <Img
                  image={images.bottleDisplay}
                  priority
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 82vw"
                  className="w-full brightness-[1.12] saturate-[1.06] contrast-[1.04]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fade into the highlights strip */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
    </section>
  );
}
