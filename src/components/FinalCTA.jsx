import { images } from '../config/site.js';
import { Icon, Img } from './ui.jsx';

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden bg-forest text-white"
      aria-labelledby="final-cta-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 70% at 70% 50%, rgba(96,182,9,0.26), transparent 72%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-10 w-[46rem] h-[46rem] rounded-full border border-gold/12"
      />

      <div className="shell relative py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="reveal order-last lg:order-first">
            <div className="rounded-[1.5rem] overflow-hidden border border-white/12">
              <Img
                image={images.coupleDecision}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <p className="mt-3 text-[0.76rem] text-white/45">
              Lifestyle photography. It does not depict a result from using
              Isosha.
            </p>
          </div>

          <div className="reveal">
            <div className="w-14 h-px bg-gold mb-7" aria-hidden="true" />
            <h2
              id="final-cta-heading"
              className="text-[2.2rem] sm:text-4xl lg:text-[3.1rem] leading-[1.08]"
            >
              Explore Isosha
              <br />
              <span className="text-leaf-soft">Herbal Capsules.</span>
            </h2>
            <p className="mt-6 text-white/72 leading-relaxed max-w-md">
              Discover the ingredients, compare the available packages and take
              the next step with confidence.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a href="#packages" className="btn btn-gold">
                Select Your Package
                <Icon name="arrow" className="w-4 h-4" />
              </a>
              <a href="#product-information" className="btn btn-ghost-light">
                View Product Information
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
