import { Eyebrow, Icon, Pending } from './ui.jsx';

/**
 * REVIEW PLACEHOLDERS
 * -------------------
 * No review, rating, star count or customer name is invented here.
 * When the client supplies authentic, authorised feedback, add it to the
 * `reviews` array below and the section switches from placeholder cards to
 * real quotes automatically.
 *
 * Each review object: { quote, name, location, date }
 * Only publish a review the customer has agreed to have published.
 */
const reviews = [];

export default function Testimonials() {
  const hasReviews = reviews.length > 0;

  return (
    <section
      className="bg-cream py-12 md:py-16"
      aria-labelledby="reviews-heading"
    >
      <div className="shell">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>Customer feedback</Eyebrow>
            <h2
              id="reviews-heading"
              className="mt-5 text-[2.1rem] sm:text-4xl text-forest"
            >
              {hasReviews ? 'What customers say' : 'Reviews, once they are real'}
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              {hasReviews
                ? 'Feedback published with the permission of the customer.'
                : 'This space is reserved for verified customer feedback. Nothing has been written here on a customer’s behalf.'}
            </p>
          </div>
          {!hasReviews && <Pending>Awaiting genuine reviews</Pending>}
        </div>

        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hasReviews
            ? reviews.map((r, i) => (
                <li key={i} className="reveal card p-6 flex flex-col">
                  <Icon name="chat" className="w-6 h-6 text-leaf" />
                  <blockquote className="mt-4 flex-1 text-[0.95rem] text-ink leading-relaxed">
                    {r.quote}
                  </blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-forest/10 text-[0.82rem]">
                    <span className="font-bold text-forest">{r.name}</span>
                    {r.location && (
                      <span className="text-ink-soft"> &middot; {r.location}</span>
                    )}
                  </figcaption>
                </li>
              ))
            : [0, 1, 2].map((i) => (
                <li
                  key={i}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className="reveal rounded-[1.25rem] border border-dashed border-forest/20 bg-white/60 p-6 flex flex-col"
                  aria-hidden={i > 0 ? 'true' : undefined}
                >
                  <Icon name="chat" className="w-6 h-6 text-forest/25" />
                  <div className="mt-4 flex-1 space-y-2.5" aria-hidden="true">
                    <span className="block h-2.5 rounded-full bg-forest/8 w-full" />
                    <span className="block h-2.5 rounded-full bg-forest/8 w-[92%]" />
                    <span className="block h-2.5 rounded-full bg-forest/8 w-[78%]" />
                    <span className="block h-2.5 rounded-full bg-forest/8 w-[55%]" />
                  </div>
                  <p className="mt-5 pt-4 border-t border-forest/10 text-[0.78rem] text-ink-soft">
                    {i === 0
                      ? 'A verified customer review will appear here.'
                      : 'Reserved for a verified review.'}
                  </p>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
