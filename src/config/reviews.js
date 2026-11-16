/**
 * CUSTOMER REVIEWS
 * ----------------
 * Every entry here comes from a real message or voice note a customer sent
 * Netwill Herbals on WhatsApp. Nothing is written on a customer's behalf and
 * nothing is paraphrased: the `quote` is the customer's own wording, typos
 * and all, with only the surrounding chat removed.
 *
 * Rules this file keeps to
 * ------------------------
 * 1. `publish: false` keeps an entry off the page. Use it rather than
 *    deleting, so the reason stays on record.
 * 2. A customer's full name is never published. The screenshots show saved
 *    contact names ("Mrs Anita Abuja"), which are a first name plus a city,
 *    so that is what is shown.
 * 3. `screenshots` is a list, because one customer's conversation can run
 *    across more than one picture. Two cards for one person would make the
 *    wall look busier than the number of customers behind it.
 * 4. A Netwill message inside a screenshot is held to the same standard as
 *    the site's own body copy, because that is what it is. The Anita
 *    screenshot is cropped for exactly that reason: the Netwill reply in it
 *    promises to "totally clear the cataract cloudiness".
 *
 *    What a CUSTOMER says is theirs, and Netwill Herbals decide what of it
 *    goes up. On 16 November 2026 they chose to publish the conversation in
 *    `offshore-customer` in full, including the parts about coming off
 *    prescribed medication. The reasoning that was put to them, and which
 *    they overruled, is recorded on that entry.
 * 5. A voice note needs a transcript before launch. An audio-only review
 *    with no text alternative fails WCAG 1.2.1, and this product is sold to
 *    people whose sight is not what it was, so the text matters more here
 *    than on a normal site, not less.
 *
 * Still outstanding, tracked in CLIENT-CHECKLIST.md:
 *   - Written permission from each customer to publish their words.
 *   - Transcripts for the three voice notes.
 *   - The date each message was sent.
 *
 * Where the files live
 * --------------------
 *   original-assets/reviews/*.jpeg   screenshot masters, never served
 *   public/assets/reviews/*.webp     the cropped, resized screenshots
 *   public/assets/reviews/*.ogg      the voice notes, served as supplied
 *
 * `npm run images` reads the `crop` values below and rebuilds the WebP set,
 * so the crop and the reason for it stay in the same place. The voice notes
 * need no build step; they are already web-sized and are served untouched.
 */

/**
 * Shown directly under the section heading. This is not the legal
 * disclaimer (that lives in `regulatory.disclaimer` and is already on the
 * page); it is the plain-English version that belongs next to the quotes.
 */
export const reviewsNote =
  'These are messages and voice notes customers sent us on WhatsApp, published with their words unchanged. They describe one person’s own experience. Isosha is a herbal wellness supplement, not a treatment for any eye disease, and what one customer noticed is not a result anyone else should expect.';

export const reviews = [
  {
    id: 'offshore-customer',
    /**
     * PUBLISHED IN FULL ON NETWILL HERBALS' INSTRUCTION, 16 November 2026.
     *
     * Both screenshots are one conversation with one customer, running from
     * 10:48 to 14:32 on the same day. They are published whole, uncropped.
     *
     * The risk was put to Netwill Herbals and they chose to publish anyway.
     * Recorded here so that whoever reads this next knows it was a decision
     * and not an oversight. What is on the page:
     *
     * 1. The customer stopping Cafergot, a prescription medicine.
     * 2. His ophthalmologist taking him off two of the three glaucoma
     *    eyedrops he had used for over four years.
     * 3. Glaucoma named, and its symptoms attributed to the capsule.
     * 4. The Netwill reply "complete the 3 bottles as prescribed".
     *
     * Items 1 and 2 are the ones that matter: a visitor with glaucoma may
     * read this as a reason to stop their own medication. Item 4 is Netwill
     * using prescribing language about a product that is not prescribed.
     *
     * The page-level note in `reviewsNote` is the only thing standing
     * between this and a reader who takes it as advice, so do not weaken
     * it. Taking these two screenshots down is one edit: set `publish` to
     * false.
     */
    publish: true,
    kind: 'message',
    /** The chat headers are not in shot, so no name is known. */
    name: '',
    location: '',
    date: '',
    /**
     * The customer's own words across the conversation, unedited, his
     * spelling of Cafergot included. The written quote carries everything
     * the screenshots show: a visitor using a screen reader gets the same
     * account as a visitor who can see the pictures, which is the whole
     * reason the quote is real text.
     */
    quote:
      'The capsule is just the magic I wanted, I told you then I always have constant migraines due to the glaucoma, and I always take carfagot for It. 3 weeks into using your product I have not taken taken that cafargot again, because the migraine is not even coming back. You have finally brought my confidence back, and all thanks to your eye care capsule, I am about to start the 3rd bottle today. I saw my Opthamologist 2 days ago, and he confirmed that my eye pressure is stabilized where he wants it. And ask me to stop using 2 out of the 3 eyedrops I have been using since over 4 years.',
    screenshots: [
      {
        image: 'reviewCafergotMigraine',
        master: 'review-cafergot-migraine',
        widths: [420, 760],
        /** Published whole. */
        crop: { top: 0, bottom: 1 },
      },
      {
        image: 'reviewConfidenceReturned',
        master: 'review-confidence-returned',
        widths: [420, 760],
        /** Published whole, including the ophthalmologist exchange. */
        crop: { top: 0.012, bottom: 1 },
      },
    ],
    audio: null,
  },
  {
    id: 'eze-awka',
    publish: true,
    kind: 'message',
    name: 'Eze',
    location: 'Awka',
    /** Left empty until the client confirms the date of the conversation. */
    date: '',
    /** The customer's own words, from the screenshot, unedited. */
    quote:
      'I have been using Netwill Herbal Isosha Capsule for a long time for my eye challenge. I have tried all sorts of treatments but they all failed. When I came across your Isosha Capsule, I wasn’t really sure if it would work, but I have never seen such a great improvement in my eyesight, and I never regretted buying it.',
    screenshots: [
      {
        /** Key into `images` in src/config/site.js */
        image: 'reviewEzeAwka',
        /** Master in original-assets/reviews/, and the output basename. */
        master: 'review-eze-awka',
        /**
         * Requested widths. `npm run images` clamps anything wider than the
         * master rather than upscaling it, and writes the real widths into
         * the generated src/config/review-images.js, so asking for more
         * than a master can give costs nothing and breaks nothing.
         */
        widths: [420, 760],
        /**
         * Crop as fractions of the master's height, applied by
         * `npm run images`. The top strip is the chat header, which shows
         * the customer's saved contact name. It is cut off here.
         */
        crop: { top: 0.055, bottom: 1 },
      },
    ],
    audio: null,
  },
  {
    id: 'anita-abuja',
    publish: true,
    kind: 'message',
    name: 'Mrs Anita',
    location: 'Abuja',
    date: '',
    quote: 'This is the third bottle and it has really been helpful.',
    screenshots: [
      {
        image: 'reviewAnitaAbuja',
        master: 'review-anita-abuja',
        widths: [420, 760],
        /**
         * Starts below the Netwill reply saying the capsule "will help you
         * totally clear the cataract cloudiness".
         *
         * That one is still cropped. It is not the customer's words at all;
         * it is Netwill's own sentence, and the site cannot state in its
         * body copy that Isosha treats no disease and then show itself
         * promising to clear a cataract three sections further down. The
         * customer's message and the photograph she sent are kept. To
         * publish her screenshot whole, set `crop` to { top: 0, bottom: 1 }.
         */
        crop: { top: 0.42, bottom: 1 },
      },
    ],
    audio: null,
  },
  {
    id: 'voice-1',
    publish: true,
    kind: 'voice',
    /** Not known. The voice notes arrived without a sender name. */
    name: '',
    location: '',
    date: '',
    quote: '',
    screenshots: [],
    audio: {
      /** Served from public/assets/reviews/ */
      file: 'voice-note-1',
      /**
       * Formats on disk, in the order the browser should try them. The
       * browser plays the first one it understands, so Ogg Opus comes
       * first: it is what WhatsApp recorded, and it is a third of the size
       * of the AAC copy, which matters on a Nigerian mobile connection.
       * Safari cannot play Ogg at all and falls through to the .m4a.
       */
      formats: ['ogg', 'm4a'],
      /** Filled in once the recording has been transcribed. */
      transcript: '',
    },
  },
  {
    id: 'voice-2',
    publish: true,
    kind: 'voice',
    name: '',
    location: '',
    date: '',
    quote: '',
    screenshots: [],
    audio: {
      file: 'voice-note-2',
      formats: ['ogg', 'm4a'],
      transcript: '',
    },
  },
  {
    id: 'voice-3',
    publish: true,
    kind: 'voice',
    name: '',
    location: '',
    date: '',
    quote: '',
    screenshots: [],
    audio: {
      file: 'voice-note-3',
      formats: ['ogg', 'm4a'],
      transcript: '',
    },
  },
];

/** The entries actually rendered. */
export const publishedReviews = reviews.filter((r) => r.publish);
