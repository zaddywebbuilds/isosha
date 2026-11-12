import { useState } from 'react';
import { faqs } from '../config/faqs.js';
import { Eyebrow, Icon } from './ui.jsx';

function Item({ item, index, open, onToggle }) {
  const buttonId = `faq-q-${index}`;
  const panelId = `faq-a-${index}`;

  return (
    <li className="reveal border-b border-forest/12">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start justify-between gap-5 py-5 text-left group"
        >
          <span className="font-sans font-bold text-[1.02rem] text-forest group-hover:text-leaf transition-colors duration-200">
            {item.q}
          </span>
          <span
            className={`grid place-items-center w-8 h-8 shrink-0 rounded-full border transition-all duration-300 ${
              open
                ? 'bg-leaf border-leaf text-white rotate-45'
                : 'border-forest/20 text-forest group-hover:border-leaf'
            }`}
            aria-hidden="true"
          >
            <Icon name="plus" className="w-4 h-4" />
          </span>
        </button>
      </h3>

      {/* Height is animated via a grid row so the content stays in normal
          flow and remains selectable and searchable. */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="pb-6 pr-10 text-[0.93rem] text-ink-soft leading-relaxed"
          >
            {item.a}
          </div>
        </div>
      </div>
    </li>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faqs"
      className="bg-mist py-16 md:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="shell grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
        <div className="reveal lg:sticky lg:top-28">
          <Eyebrow>Questions</Eyebrow>
          <h2
            id="faq-heading"
            className="mt-5 text-[2.1rem] sm:text-4xl lg:text-[2.9rem] text-forest"
          >
            Frequently asked questions
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed">
            Straight answers about what Isosha is, how it is taken, and what it
            does not replace.
          </p>
          <a href="#order" className="btn btn-forest mt-7">
            Order Isosha
            <Icon name="arrow" className="w-4 h-4" />
          </a>
        </div>

        <ul className="border-t border-forest/12">
          {faqs.map((item, i) => (
            <Item
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
