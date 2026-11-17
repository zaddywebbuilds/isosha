import { useId, useState } from 'react';
import { Eyebrow, Icon, Img } from './ui.jsx';
import { images } from '../config/site.js';
import { publishedReviews, reviewsNote } from '../config/reviews.js';

/**
 * CUSTOMER REVIEWS
 * ----------------
 * The content lives in src/config/reviews.js. Nothing is written on a
 * customer's behalf here and nothing is invented: a review only appears
 * because a real WhatsApp message or voice note exists behind it.
 *
 * Two things this section does differently from a normal review wall:
 *
 * 1. The customer's words are real text, not a picture of text. The
 *    screenshot is kept as supporting evidence behind a disclosure, because
 *    this product is sold to people who have told us their sight is not
 *    what it was. Asking them to read a phone screenshot of a chat is
 *    asking the one thing they cannot do.
 *
 * 2. No rating, star count or aggregate score is shown, and no review
 *    structured data is emitted. Review markup asks a search engine to
 *    vouch for a score, and there is no verified score to vouch for.
 */

const AUDIO_TYPES = {
  m4a: 'audio/mp4',
  ogg: 'audio/ogg',
  mp3: 'audio/mpeg',
};

const assetBase = 'assets/reviews';

/** The disclosure pattern used across the site: button + hidden panel. */
function Disclosure({ showLabel, hideLabel, children }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <>
      <div id={panelId} hidden={!open} className="mt-4">
        {children}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="btn-inline mt-5 self-start text-[1.02rem] font-bold text-forest hover:text-leaf transition-colors"
      >
        {open ? hideLabel : showLabel}
        <Icon
          name="arrow"
          className={`w-4 h-4 transition-transform duration-300 ${
            open ? '-rotate-90' : ''
          }`}
        />
      </button>
    </>
  );
}

function MessageReview({ review, index }) {
  // One conversation can run across several screenshots. They stack in the
  // order they were sent, so the disclosure reads as the chat did.
  const shots = (review.screenshots ?? [])
    .map((s) => images[s.image])
    .filter(Boolean);

  return (
    /*
      One full-width card per review, quote beside the screenshots.

      Three columns of cards was the problem. These reviews are 1491px,
      790px and 491px tall, and a grid row is as tall as its tallest cell,
      so the two short ones sat in a hole the height of the long one.
      items-start shrank the cards but left the hole, because the hole was
      in the row. CSS columns were worse: the browser packed two cards into
      one column and left the third empty.

      A single column cannot have that fault. There is no row to match and
      no column to balance, so nothing can be left empty. Putting the quote
      and the pictures side by side inside each card is also what finally
      uses the width, and it is shorter than stacking them.
    */
    <li
      className="reveal card p-5 sm:p-6"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div
        className={`grid gap-5 lg:gap-8 items-start ${
          shots.length > 0 ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''
        }`}
      >
        <div>
          <span
            className="grid place-items-center w-11 h-11 rounded-full bg-leaf-wash text-forest"
            aria-hidden="true"
          >
            <Icon name="chat" className="w-5 h-5" />
          </span>

          {/*
            A quote and its attribution are a <figure>. A bare <figcaption>
            next to a <blockquote> is invalid HTML, and assistive technology
            then has nothing tying the name to the words it belongs to.
          */}
          <figure className="mt-4 flex flex-col">
            <blockquote className="text-[1.08rem] text-ink leading-relaxed">
              {review.quote}
            </blockquote>

        {/*
          No name, no caption. The chat header is cropped off some
          screenshots, so there is nothing to attribute, and an unnamed
          review simply carries no byline rather than announcing the gap to
          the visitor. Still never filled in with "a happy customer": that
          would be inventing an attribution nobody gave. Put a real `name`
          in src/config/reviews.js and the byline appears.
        */}
            {review.name && (
              <figcaption className="mt-5 pt-4 border-t border-forest/10 text-[0.96rem]">
                <span className="font-bold text-forest">{review.name}</span>
                {review.location && (
                  <span className="text-ink-soft"> &middot; {review.location}</span>
                )}
                {review.date && (
                  <span className="text-ink-soft"> &middot; {review.date}</span>
                )}
              </figcaption>
            )}
          </figure>
        </div>

        {/*
          The screenshots are shown outright, not hidden behind a button,
          and sit beside the quote rather than under it. Where a customer
          sent two, they go side by side: stacking them is what made that
          one card 1491px, three times the height of the others, which is
          what the uneven layout was reacting to in the first place.
          The quote carries the same words as text, so a screen reader and
          a search engine get the full account without the picture.
        */}
        {shots.length > 0 && (
          <figure
            className={`grid gap-3 ${shots.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
          >
            {shots.map((shot) => (
              <a
                key={shot.src}
                href={shot.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full overflow-hidden rounded-xl border border-forest/10 transition-opacity hover:opacity-90"
              >
                <Img
                  image={shot}
                  sizes="(min-width: 1024px) 15rem, (min-width: 640px) 22vw, 44vw"
                  className="w-full"
                />
              </a>
            ))}
          </figure>
        )}
      </div>
    </li>
  );
}

function VoiceReview({ review, index }) {
  const { file, transcript, formats = ['ogg'] } = review.audio;
  const labelId = `voice-note-${index + 1}-label`;
  const lastFormat = formats[formats.length - 1];

  return (
    <li
      className="reveal card p-5 sm:p-6 flex flex-col"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="flex items-center gap-3">
        <span
          className="grid place-items-center w-11 h-11 shrink-0 rounded-full bg-leaf-wash text-forest"
          aria-hidden="true"
        >
          <Icon name="mic" className="w-5 h-5" />
        </span>
        <p id={labelId} className="text-[1.06rem] font-bold text-forest">
          Voice note {index + 1}
        </p>
      </div>

      {/*
        preload="metadata" so three players do not pull three recordings down
        on every visit. The browser fetches enough to draw the duration and
        nothing more until someone presses play.
      */}
      <audio
        controls
        preload="metadata"
        aria-labelledby={labelId}
        className="mt-5 w-full"
      >
        {formats.map((ext) => (
          <source
            key={ext}
            src={`${assetBase}/${file}.${ext}`}
            type={AUDIO_TYPES[ext]}
          />
        ))}
        <a href={`${assetBase}/${file}.${lastFormat}`}>
          Download this voice note
        </a>
      </audio>

      {/*
        No transcript, nothing shown. The transcripts are still outstanding
        and still belong here: an audio-only review with no text version is
        a WCAG 1.2.1 failure, and this product is sold to people whose sight
        is not what it was. But a visitor is not the right audience for that
        status, so it is tracked in CLIENT-CHECKLIST.md instead of printed
        on the card. Fill `audio.transcript` in src/config/reviews.js and it
        appears here.
      */}
      {transcript && (
        <Disclosure showLabel="Read the transcript" hideLabel="Hide the transcript">
          <blockquote className="text-[1.02rem] text-ink leading-relaxed">
            {transcript}
          </blockquote>
        </Disclosure>
      )}

      {review.name && (
        <p className="mt-5 pt-4 border-t border-forest/10 text-[0.96rem]">
          <span className="font-bold text-forest">{review.name}</span>
          {review.location && (
            <span className="text-ink-soft"> &middot; {review.location}</span>
          )}
        </p>
      )}
    </li>
  );
}

export default function Testimonials() {
  const written = publishedReviews.filter((r) => r.kind === 'message');
  const voice = publishedReviews.filter((r) => r.kind === 'voice');

  if (written.length === 0 && voice.length === 0) return null;

  return (
    <section
      id="reviews"
      className="bg-cream py-8 md:py-12"
      aria-labelledby="reviews-heading"
    >
      <div className="shell">
        {/* Heading left, intro right from lg up. See Agitate.jsx for why. */}
        <div className="reveal grid gap-x-10 gap-y-4 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>Customer feedback</Eyebrow>
            <h2
              id="reviews-heading"
              className="mt-5 text-[clamp(1.65rem,7.4vw,2.1rem)] sm:text-4xl text-forest"
            >
              What customers say
            </h2>
          </div>
          <p className="mt-4 lg:mt-0 text-ink-soft leading-relaxed">
            {reviewsNote}
          </p>
        </div>

        {written.length > 0 && (
          /* One card per row. Nothing to balance, so nothing left empty. */
          <ul className="mt-7 flex flex-col gap-4">
            {written.map((review, i) => (
              <MessageReview key={review.id} review={review} index={i} />
            ))}
          </ul>
        )}

        {voice.length > 0 && (
          <div className="mt-8">
            <h3 className="reveal text-[clamp(1.3rem,5.6vw,1.6rem)] text-forest">
              Voice notes customers sent us
            </h3>
            <p className="reveal mt-3 max-w-2xl text-ink-soft leading-relaxed">
              Recordings exactly as they arrived, with nothing cut.
            </p>

            {/* items-start here too, for the same reason. */}
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {voice.map((review, i) => (
                <VoiceReview key={review.id} review={review} index={i} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
