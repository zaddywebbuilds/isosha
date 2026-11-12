import { regulatory, contact } from '../config/site.js';
import { Eyebrow, Icon, Pending } from './ui.jsx';

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
          <p className="mt-2 text-[0.85rem] text-ink-soft leading-relaxed">
            {regulatory.nafdacVerified
              ? 'This registration number has been checked against the NAFDAC register.'
              : 'This number was supplied by the manufacturer. It is shown here as supplied and has not yet been independently checked against the NAFDAC register.'}
          </p>
          {!regulatory.nafdacVerified && (
            <p className="mt-3">
              <Pending>Pending verification</Pending>
            </p>
          )}
        </>
      ),
    },
    {
      icon: 'shield',
      title: 'Manufacturer',
      body: regulatory.manufacturer ? (
        <p className="text-[0.88rem] text-ink-soft leading-relaxed">
          {regulatory.manufacturer}
        </p>
      ) : (
        <>
          <p className="text-[0.88rem] text-ink-soft leading-relaxed">
            Isosha Herbal Capsules is a product of Netwill Herbals. The full
            legal manufacturer name, address and licence details will be
            published here once supplied.
          </p>
          <p className="mt-3">
            <Pending>To be supplied</Pending>
          </p>
        </>
      ),
    },
    {
      icon: 'capsule',
      title: 'Product label',
      body: (
        <p className="text-[0.88rem] text-ink-soft leading-relaxed">
          The information on this website is drawn from the product information
          supplied by Netwill Herbals. Where this website and the approved
          product label differ, the approved product label is correct.
        </p>
      ),
    },
    {
      icon: 'chat',
      title: 'Customer support',
      body: contact.phone || contact.email ? (
        <p className="text-[0.88rem] text-ink-soft leading-relaxed">
          Reach the team on {contact.phone || contact.email} for questions about
          your order.
        </p>
      ) : (
        <>
          <p className="text-[0.88rem] text-ink-soft leading-relaxed">
            Customer support contact details will appear here once the client
            supplies a phone number and email address.
          </p>
          <p className="mt-3">
            <Pending>To be supplied</Pending>
          </p>
        </>
      ),
    },
    {
      icon: 'truck',
      title: 'Delivery',
      body: (
        <p className="text-[0.88rem] text-ink-soft leading-relaxed">
          Delivery coverage, charges and timelines are confirmed by the seller
          when your order enquiry is answered. No delivery promise is made on
          this page until the client confirms one.
        </p>
      ),
    },
    {
      icon: 'eye',
      title: 'Customer reviews',
      body: (
        <>
          <p className="text-[0.88rem] text-ink-soft leading-relaxed">
            No reviews are published yet. Authentic, authorised customer
            feedback will be shown here once it has been collected, with the
            customer&rsquo;s permission.
          </p>
          <p className="mt-3">
            <Pending>Awaiting genuine reviews</Pending>
          </p>
        </>
      ),
    },
  ];

  return (
    <section
      id="trust"
      className="bg-mist py-16 md:py-24"
      aria-labelledby="trust-heading"
    >
      <div className="shell">
        <div className="reveal max-w-2xl">
          <Eyebrow>Transparency</Eyebrow>
          <h2
            id="trust-heading"
            className="mt-5 text-[2.1rem] sm:text-4xl lg:text-[2.9rem] text-forest"
          >
            Product information you can review
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed">
            Everything stated about Isosha on this website comes from the
            manufacturer. Where something has not been confirmed, this page says
            so rather than filling the gap.
          </p>
        </div>

        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

        <p className="reveal mt-9 rounded-xl border border-forest/12 bg-white p-5 text-[0.84rem] text-ink-soft leading-relaxed max-w-4xl">
          {regulatory.disclaimer}
        </p>
      </div>
    </section>
  );
}
