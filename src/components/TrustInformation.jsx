import { regulatory, contact } from '../config/site.js';
import { Eyebrow, Icon, Pending } from './ui.jsx';
import { sections } from '../config/copy.js';

/**
 * No badge, seal, certification logo or government endorsement is rendered
 * anywhere in this section. The NAFDAC number is presented as a number the
 * manufacturer supplied, with its verification status stated plainly.
 */
export default function TrustInformation() {
  const items = [
    {
      icon: 'doc',
      title: 'NAFDAC registration',
      body: (
        <>
          <p className="font-mono text-[1.05rem] font-bold text-forest tracking-wide">
            {regulatory.nafdacNumber}
          </p>
          <p className="mt-2 text-[1.06rem] text-ink-soft leading-relaxed">
            {regulatory.nafdacVerified
              ? 'Isosha Herbal Capsules is registered with NAFDAC under this number.'
              : 'This number was supplied by the manufacturer and is shown here exactly as supplied.'}
          </p>
        </>
      ),
    },
    {
      icon: 'truck',
      title: 'Delivery',
      body: (
        <p className="text-[0.96rem] text-ink-soft leading-relaxed">
          Delivery coverage, charges and timelines are confirmed by the seller
          when your order enquiry is answered. No delivery promise is made on
          this page until the client confirms one.
        </p>
      ),
    },
  ];

  return (
    <section
      id="trust"
      className="bg-mist py-12 md:py-16"
      aria-labelledby="trust-heading"
    >
      <div className="shell">
        <div className="reveal max-w-2xl">
          <Eyebrow>{sections.trust.eyebrow}</Eyebrow>
          <h2
            id="trust-heading"
            className="mt-5 text-[clamp(1.65rem,7.4vw,2.1rem)] sm:text-4xl lg:text-[2.9rem] text-forest"
          >
            {sections.trust.headline}
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed">
{sections.trust.body}
          </p>
        </div>

        <ul className="mt-8 grid sm:grid-cols-2 gap-5 max-w-3xl">
          {items.map((item, i) => (
            <li
              key={item.title}
              style={{ transitionDelay: `${i * 70}ms` }}
              className="reveal card p-6 flex flex-col"
            >
              <span
                className="grid place-items-center w-11 h-11 rounded-full bg-leaf-wash text-forest"
                aria-hidden="true"
              >
                <Icon name={item.icon} className="w-5 h-5" />
              </span>
              <h3 className="mt-4 text-[1.25rem] text-forest">{item.title}</h3>
              <div className="mt-2.5">{item.body}</div>
            </li>
          ))}
        </ul>

        <p className="reveal mt-7 rounded-xl border border-forest/12 bg-white p-5 text-[0.98rem] text-ink-soft leading-relaxed max-w-4xl">
          {regulatory.disclaimer}
        </p>
      </div>
    </section>
  );
}
