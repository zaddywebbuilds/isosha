import { highlights } from '../config/product.js';
import { Icon } from './ui.jsx';

const icons = ['capsule', 'leaf', 'vitamin', 'sun'];

export default function ProductHighlights() {
  return (
    <section
      className="bg-forest-deep text-white"
      aria-label="Isosha at a glance"
    >
      <div className="shell">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <li
              key={item.label}
              style={{ transitionDelay: `${i * 70}ms` }}
              className={[
                'reveal flex items-center gap-3.5 px-3 py-6 sm:px-6',
                // Mobile and tablet: 2 columns, so a divider left of odd items
                // and above the second row.
                i % 2 === 1 ? 'border-l border-white/10' : '',
                i >= 2 ? 'border-t border-white/10' : '',
                // Desktop: one row, dividers between every pair.
                'lg:border-t-0',
                i === 0 ? 'lg:border-l-0' : 'lg:border-l lg:border-white/10',
              ].join(' ')}
            >
              <Icon name={icons[i]} className="w-7 h-7 text-leaf shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-[0.98rem] sm:text-[1.08rem] leading-snug">
                  {item.label}
                </p>
                <p className="text-[0.86rem] sm:text-[0.86rem] text-white/82 leading-snug mt-0.5">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
