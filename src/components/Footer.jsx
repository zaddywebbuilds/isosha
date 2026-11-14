import { brand } from '../config/product.js';
import { contact, social, navLinks, regulatory } from '../config/site.js';
import { legalDocuments } from '../config/legal.js';
import { Icon, Pending } from './ui.jsx';

const socialMeta = [
  { key: 'facebook', label: 'Facebook', icon: 'facebook' },
  { key: 'instagram', label: 'Instagram', icon: 'instagram' },
  { key: 'tiktok', label: 'TikTok', icon: 'tiktok' },
];

/**
 * A contact detail that has not been supplied yet renders nothing at all,
 * rather than a placeholder. The slot stays open: fill the value in
 * src/config/site.js and the line appears, correctly linked.
 */
function ContactLine({ icon, label, value, href }) {
  if (!value) return null;
  return (
    <li className="flex items-start gap-3">
      <Icon name={icon} className="w-4 h-4 mt-1 shrink-0 text-gold" />
      {href ? (
        <a
          href={href}
          className="text-[0.96rem] text-white/90 hover:text-gold transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="text-[0.96rem] text-white/90">{value}</span>
      )}
    </li>
  );
}

export default function Footer({ onOpenLegal }) {
  const year = new Date().getFullYear();
  const hasSocial = socialMeta.some((s) => social[s.key]);
  const hasContactDetails = Boolean(
    contact.phone || contact.whatsapp || contact.email || contact.address,
  );

  return (
    <footer className="bg-forest-deep text-white">
      <div className="shell py-11 md:py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span
                className="grid place-items-center w-11 h-11 rounded-full border border-gold/50"
                aria-hidden="true"
              >
                <svg viewBox="0 0 64 64" className="w-6 h-6">
                  <path
                    d="M32 46c-8-4-13-9-13-16 0-6 5-11 13-14 8 3 13 8 13 14 0 7-5 12-13 16z"
                    fill="#60B609"
                  />
                  <path
                    d="M32 16v30"
                    stroke="#002410"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M32 27l7-5M32 35l-7-5M32 41l7-5"
                    stroke="#002410"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="leading-none">
                <span className="block font-serif text-xl">Netwill</span>
                <span className="block eyebrow text-[0.76rem] text-gold mt-1">
                  Herbals
                </span>
              </span>
            </div>
            <p className="mt-5 text-[1.06rem] text-white/92 leading-relaxed max-w-xs">
              Product information and customer enquiries for Isosha Herbal
              Capsules.
            </p>

            {hasSocial ? (
              <ul className="mt-6 flex gap-2.5">
                {socialMeta
                  .filter((s) => social[s.key])
                  .map((s) => (
                    <li key={s.key}>
                      <a
                        href={social[s.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${brand.name} on ${s.label}`}
                        className="grid place-items-center w-10 h-10 rounded-full border border-white/20 text-white/88 hover:text-gold hover:border-gold transition-colors"
                      >
                        <Icon name={s.icon} className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                {contact.whatsapp && (
                  <li>
                    <a
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${brand.name} on WhatsApp`}
                      className="grid place-items-center w-10 h-10 rounded-full border border-white/20 text-white/88 hover:text-gold hover:border-gold transition-colors"
                    >
                      <Icon name="whatsapp" className="w-4 h-4" />
                    </a>
                  </li>
                )}
              </ul>
            ) : null}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="eyebrow text-[0.76rem] text-gold">Explore</h2>
            <ul className="mt-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[2.75rem] items-center text-[0.96rem] text-white/88 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#order"
                  className="inline-flex min-h-[2.75rem] items-center text-[0.96rem] text-white/88 hover:text-gold transition-colors"
                >
                  Order
                </a>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <div>
            <h2 className="eyebrow text-[0.76rem] text-gold">Legal</h2>
            <ul className="mt-2">
              {legalDocuments.map((doc) => (
                <li key={doc.id}>
                  <button
                    type="button"
                    onClick={() => onOpenLegal(doc.id)}
                    className="inline-flex min-h-[2.75rem] items-center text-left text-[0.96rem] text-white/88 hover:text-gold transition-colors"
                  >
                    {doc.title}
                    {doc.draft && (
                      <span className="ml-1.5 text-[0.76rem] text-gold/60 align-middle">
                        (draft)
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/*
            Contact. The whole column is left out until at least one detail
            exists, so the footer never shows a heading with nothing under
            it. Add any value to `contact` in src/config/site.js and the
            column and that line appear.
          */}
          <div hidden={!hasContactDetails}>
            <h2 className="eyebrow text-[0.76rem] text-gold">Contact</h2>
            <ul className="mt-5 space-y-3.5">
              <ContactLine
                icon="phone"
                label="Phone"
                value={contact.phone}
                href={contact.phone ? `tel:${contact.phone.replace(/\s/g, '')}` : null}
              />
              <ContactLine
                icon="whatsapp"
                label="WhatsApp"
                value={contact.whatsapp ? `+${contact.whatsapp}` : ''}
                href={contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : null}
              />
              <ContactLine
                icon="mail"
                label="Email"
                value={contact.email}
                href={contact.email ? `mailto:${contact.email}` : null}
              />
              <ContactLine
                icon="pin"
                label="Business address"
                value={contact.address}
              />
            </ul>
          </div>
        </div>

        {/* Regulatory strip */}
        <div className="mt-10 pt-6 border-t border-white/12">
          <p className="text-[0.86rem] text-white/90 leading-relaxed max-w-4xl">
            NAFDAC registration number:{' '}
            <span className="font-mono text-white/88">
              {regulatory.nafdacNumber}
            </span>
            . {regulatory.disclaimer}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[0.86rem] text-white/90">
            <p>
              &copy; {year} {brand.name}. All rights reserved.
            </p>
            <p>Isosha Herbal Capsules &middot; 30 capsules per bottle</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
