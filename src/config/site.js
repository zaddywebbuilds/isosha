/**
 * SITE CONFIGURATION
 * ------------------
 * Contact details, social links, regulatory information, SEO metadata and
 * asset paths. Everything the client needs to fill in lives in this one file.
 *
 * Any value left as an empty string is treated as NOT SUPPLIED. The site then
 * renders a clearly marked placeholder instead of a fake phone number,
 * address or link. Fill the value in and the real thing appears automatically.
 */

/**
 * The only import in this file. The review screenshots are cropped and
 * resized by `npm run images`, so their finished paths and pixel sizes are
 * not knowable here. That script writes them out and this reads them back,
 * rather than anyone typing a guess that the next rebuild quietly breaks.
 * The alt text stays below, with all the other alt text.
 */
import { reviewImages } from './review-images.js';

/* --------------------------------------------------------------------- */
/* CONTACT                                                               */
/* --------------------------------------------------------------------- */

export const contact = {
  // Use full international format for WhatsApp, digits only, e.g. '2348012345678'
  whatsapp: '',
  // Displayed phone number, e.g. '+234 801 234 5678'
  phone: '',
  email: '',
  address: '',
  // Pre-filled text for the WhatsApp message. {package} is replaced at runtime.
  whatsappMessage: 'Hello Netwill Herbals, I would like to order Isosha Herbal Capsules ({package}).',
};

export const social = {
  facebook: '',
  instagram: '',
  tiktok: '',
};

/* --------------------------------------------------------------------- */
/* REGULATORY                                                            */
/* --------------------------------------------------------------------- */

export const regulatory = {
  nafdacNumber: 'A7-102621L',
  /**
   * Confirmed by Netwill Herbals as the product's NAFDAC registration
   * number, so the site states it plainly.
   *
   * The site still shows no NAFDAC seal, badge or crest. Stating a
   * registration number the manufacturer stands behind is ordinary product
   * information; drawing an official-looking mark is not ours to make.
   */
  nafdacVerified: true,
  manufacturer: '', // Full legal manufacturer name and address, once supplied
  disclaimer:
    'This product is a herbal wellness supplement. It is not intended to diagnose, treat, cure or prevent any disease. Information on this website is provided for general product information and is not medical advice. Always consult a qualified healthcare or eye-care professional about your eyes, your health and any medication you are taking.',
};

/* --------------------------------------------------------------------- */
/* ORDER FORM INTEGRATION                                                */
/* --------------------------------------------------------------------- */

/**
 * Order submission now goes to Netwill Herbals' Xurge CRM. The endpoint,
 * hidden fields, package ids and state list all live in src/config/crm.js,
 * and the form posts natively because the CRM sends no CORS headers.
 */

/* --------------------------------------------------------------------- */
/* SEO                                                                   */
/* --------------------------------------------------------------------- */

/**
 * The live origin, with no trailing slash.
 *
 * This must be absolute. Facebook, WhatsApp and X all refuse relative
 * og:image paths, so a relative one means link previews show no picture at
 * all, which matters here because WhatsApp is the main sharing channel.
 *
 * Change this one line when a custom domain is connected and the canonical
 * URL, the Open Graph tags, the sitemap and the structured data all follow.
 */
export const siteUrl = 'https://zaddywebbuilds.github.io/isosha';

/** Turns any site-relative asset path into an absolute URL. */
export const absoluteUrl = (path = '') =>
  `${siteUrl}/${String(path).replace(/^\/+/, '')}`;

export const seo = {
  title: 'Isosha Herbal Capsules | Eye Wellness Supplement Nigeria',
  description:
    'Isosha Herbal Capsules: a daily eye-wellness supplement with turmeric, clove, ginger and black pepper, plus vitamins A and B2, which contribute to the maintenance of normal vision. 30 capsules per bottle. Delivery across Nigeria.',
  canonical: `${siteUrl}/`,
  /**
   * A dedicated 1200x630 JPEG, not a product WebP. The product shot is
   * portrait, so link previews crop it badly, and WhatsApp's scraper is
   * unreliable with WebP. WhatsApp is the main sharing channel here, so the
   * card is a plain progressive JPEG at the standard Open Graph ratio.
   * Rebuilt by `npm run images`.
   */
  ogImage: 'assets/images/isosha-social-card.jpg',
  ogImageAlt:
    'A bottle of Isosha Herbal Capsules by Netwill Herbals, 30 capsules per bottle',
  locale: 'en_NG',
};

/* --------------------------------------------------------------------- */
/* ASSET PATHS                                                           */
/* --------------------------------------------------------------------- */

const base = 'assets/images';

/**
 * Review screenshots and voice notes sit apart from the marketing image set,
 * under public/assets/reviews/. They are customer material, republished
 * under a permission the client has to hold, and they are the first thing to
 * pull if that permission is ever withdrawn, so they live in their own
 * folder rather than scattered through the product photography.
 */

/**
 * Every image served by the site. Each entry carries its own srcSet,
 * intrinsic size and alt text, so no component writes an image path or an
 * alt string by hand.
 *
 * `lifestyle: true` marks a photograph of people. Those are presented as
 * lifestyle or educational photography and are never captioned, implied or
 * positioned as evidence that the product works.
 */
export const images = {
  /* ----------------------------------------------------------------- */
  /* Product                                                           */
  /* ----------------------------------------------------------------- */
  bottleDisplay: {
    src: `${base}/isosha-bottle-display-900.webp`,
    srcSet: `${base}/isosha-bottle-display-500.webp 500w, ${base}/isosha-bottle-display-900.webp 900w, ${base}/isosha-bottle-display-1200.webp 1200w`,
    width: 1199,
    height: 1312,
    alt: 'A bottle of Isosha Herbal Capsules by Netwill Herbals on a dark green pedestal, 30 capsules per bottle',
  },
  bottleSquare: {
    src: `${base}/isosha-bottle-display-square-760.webp`,
    srcSet: `${base}/isosha-bottle-display-square-420.webp 420w, ${base}/isosha-bottle-display-square-760.webp 760w`,
    width: 760,
    height: 760,
    alt: 'A bottle of Isosha Herbal Capsules showing the Netwill Herbals label and the 30 capsules mark',
  },

  /* ----------------------------------------------------------------- */
  /* Eye-health education                                              */
  /* ----------------------------------------------------------------- */
  examWide: {
    src: `${base}/eyecare-exam-wide-a-1400.webp`,
    srcSet: `${base}/eyecare-exam-wide-a-800.webp 800w, ${base}/eyecare-exam-wide-a-1400.webp 1400w, ${base}/eyecare-exam-wide-a-1672.webp 1672w`,
    width: 1672,
    height: 941,
    lifestyle: true,
    alt: 'An optometrist examining an older man at a slit lamp in a clinic',
  },
  examGlaucoma: {
    src: `${base}/eyecare-exam-wide-c-1000.webp`,
    srcSet: `${base}/eyecare-exam-wide-c-600.webp 600w, ${base}/eyecare-exam-wide-c-1000.webp 1000w`,
    width: 1672,
    height: 941,
    lifestyle: true,
    alt: 'An eye-care professional examining a patient at a slit lamp during a routine eye examination',
  },
  examGlaucomaDetail: {
    src: `${base}/eyecare-exam-wide-b-1200.webp`,
    srcSet: `${base}/eyecare-exam-wide-b-700.webp 700w, ${base}/eyecare-exam-wide-b-1200.webp 1200w`,
    width: 1536,
    height: 1024,
    lifestyle: true,
    alt: 'An optometrist looking through a slit lamp while examining an older patient, with an eye chart on the wall behind',
  },
  readingStrain: {
    src: `${base}/vision-reading-strain-a-1000.webp`,
    srcSet: `${base}/vision-reading-strain-a-600.webp 600w, ${base}/vision-reading-strain-a-1000.webp 1000w`,
    width: 1672,
    height: 941,
    lifestyle: true,
    alt: 'An older woman adjusting her glasses while reading a book at home',
  },
  readingStrainDetail: {
    src: `${base}/vision-reading-strain-b-1000.webp`,
    srcSet: `${base}/vision-reading-strain-b-600.webp 600w, ${base}/vision-reading-strain-b-1000.webp 1000w`,
    width: 1672,
    height: 941,
    lifestyle: true,
    alt: 'An older woman lifting her glasses to look more closely at the page of a book',
  },
  distanceBlur: {
    src: `${base}/vision-distance-blur-a-1000.webp`,
    srcSet: `${base}/vision-distance-blur-a-600.webp 600w, ${base}/vision-distance-blur-a-1000.webp 1000w`,
    width: 1672,
    height: 941,
    lifestyle: true,
    alt: 'A man adjusting his glasses while looking into the distance on a tree-lined street',
  },
  distanceBlurDetail: {
    src: `${base}/vision-distance-blur-b-1000.webp`,
    srcSet: `${base}/vision-distance-blur-b-600.webp 600w, ${base}/vision-distance-blur-b-1000.webp 1000w`,
    width: 1672,
    height: 941,
    lifestyle: true,
    alt: 'A man in glasses looking towards a distant road sign',
  },
  anatomyWide: {
    src: `${base}/eye-anatomy-wide-1400.webp`,
    srcSet: `${base}/eye-anatomy-wide-800.webp 800w, ${base}/eye-anatomy-wide-1400.webp 1400w`,
    width: 1536,
    height: 1024,
    alt: 'A labelled cross-section of the human eye showing the cornea, iris, pupil, lens, retina, sclera and optic nerve',
  },
  anatomyDetail: {
    src: `${base}/eye-anatomy-portrait-1000.webp`,
    srcSet: `${base}/eye-anatomy-portrait-560.webp 560w, ${base}/eye-anatomy-portrait-1000.webp 1000w`,
    width: 1122,
    height: 1402,
    alt: 'A detailed labelled cross-section of the human eye, additionally showing the conjunctiva, ciliary body, vitreous body and choroid',
  },
  carePortraitA: {
    src: `${base}/eyecare-portrait-a-900.webp`,
    srcSet: `${base}/eyecare-portrait-a-500.webp 500w, ${base}/eyecare-portrait-a-900.webp 900w`,
    width: 1122,
    height: 1402,
    lifestyle: true,
    alt: 'An optometrist and an older woman facing each other across a slit lamp during an eye examination',
  },
  carePortraitB: {
    src: `${base}/eyecare-portrait-b-900.webp`,
    srcSet: `${base}/eyecare-portrait-b-500.webp 500w, ${base}/eyecare-portrait-b-900.webp 900w`,
    width: 1122,
    height: 1402,
    lifestyle: true,
    alt: 'An optometrist adjusting a slit lamp while talking with an older man during his eye examination',
  },

  /* ----------------------------------------------------------------- */
  /* Lifestyle                                                         */
  /* ----------------------------------------------------------------- */
  dailyRoutine: {
    src: `${base}/lifestyle-daily-routine-1200.webp`,
    srcSet: `${base}/lifestyle-daily-routine-700.webp 700w, ${base}/lifestyle-daily-routine-1200.webp 1200w`,
    width: 1672,
    height: 941,
    lifestyle: true,
    alt: 'A couple at home marking dates on a desk calendar together',
  },
  /* ----------------------------------------------------------------- */
  /* Ingredients                                                       */
  /*                                                                   */
  /* One coordinated set: square studio shots on the same cream sweep. */
  /* Keys are referenced by `image` in src/config/ingredients.js, as    */
  /* `ingredient-<id>` and `compound-<id>`.                            */
  /* ----------------------------------------------------------------- */
  'ingredient-turmeric': {
    src: `${base}/ingredient-turmeric-760.webp`,
    srcSet: `${base}/ingredient-turmeric-420.webp 420w, ${base}/ingredient-turmeric-760.webp 760w`,
    width: 760,
    height: 760,
    alt: 'Fresh turmeric rhizomes with cut slices showing their deep orange flesh, beside green leaves',
  },
  'ingredient-clove': {
    src: `${base}/ingredient-clove-760.webp`,
    srcSet: `${base}/ingredient-clove-420.webp 420w, ${base}/ingredient-clove-760.webp 760w`,
    width: 760,
    height: 760,
    alt: 'A pile of whole dried cloves beside two green leaves',
  },
  'ingredient-ginger': {
    src: `${base}/ingredient-ginger-760.webp`,
    srcSet: `${base}/ingredient-ginger-420.webp 420w, ${base}/ingredient-ginger-760.webp 760w`,
    width: 760,
    height: 760,
    alt: 'Fresh ginger rhizomes with cut slices showing their pale yellow flesh, beside green leaves',
  },
  'ingredient-black-pepper': {
    src: `${base}/ingredient-black-pepper-760.webp`,
    srcSet: `${base}/ingredient-black-pepper-420.webp 420w, ${base}/ingredient-black-pepper-760.webp 760w`,
    width: 760,
    height: 760,
    alt: 'Black peppercorns spilling from a small wooden scoop, with pepper vine leaves alongside',
  },
  'compound-lignans': {
    src: `${base}/compound-lignans-560.webp`,
    srcSet: `${base}/compound-lignans-320.webp 320w, ${base}/compound-lignans-560.webp 560w`,
    width: 560,
    height: 560,
    alt: 'Bowls of brown flaxseed and pale sesame seed with flax flowers, shown as an illustration of lignans',
  },
  'compound-flavonoids': {
    src: `${base}/compound-flavonoids-560.webp`,
    srcSet: `${base}/compound-flavonoids-320.webp 320w, ${base}/compound-flavonoids-560.webp 560w`,
    width: 560,
    height: 560,
    alt: 'Halved citrus fruit with grapes, berries and strawberries, shown as an illustration of flavonoids',
  },
  'compound-tannins': {
    src: `${base}/compound-tannins-560.webp`,
    srcSet: `${base}/compound-tannins-320.webp 320w, ${base}/compound-tannins-560.webp 560w`,
    width: 560,
    height: 560,
    alt: 'Dark grapes, dried tea leaves and pieces of bark, shown as an illustration of tannins',
  },
  'compound-iridoid-glycosides': {
    src: `${base}/compound-iridoid-glycosides-560.webp`,
    srcSet: `${base}/compound-iridoid-glycosides-320.webp 320w, ${base}/compound-iridoid-glycosides-560.webp 560w`,
    width: 560,
    height: 560,
    alt: 'Gardenia and honeysuckle flowers with noni fruit and goji berries, shown as an illustration of iridoid glycosides',
  },

  /* ----------------------------------------------------------------- */
  /* Customer reviews                                                  */
  /*                                                                   */
  /* Cropped WhatsApp screenshots. Masters live in                     */
  /* original-assets/reviews/ and the crops are declared in            */
  /* src/config/reviews.js, so the reason for each crop sits next to   */
  /* the review it belongs to. Rebuilt by `npm run images`.            */
  /* ----------------------------------------------------------------- */
  reviewCafergotMigraine: {
    ...reviewImages['review-cafergot-migraine'],
    alt: 'A WhatsApp conversation in which a customer says the capsule is the magic he wanted, that he had constant migraines from glaucoma and always took Cafergot for them, and that three weeks into using the product he has not taken it again because the migraine is not coming back',
  },
  reviewConfidenceReturned: {
    ...reviewImages['review-confidence-returned'],
    alt: 'A photograph of a bottle of Isosha on an office desk, followed by messages in which the customer says the capsule has brought his confidence back, that he is starting his third bottle, and that his ophthalmologist confirmed his eye pressure is stable and asked him to stop using two of his three eyedrops',
  },
  reviewEzeAwka: {
    ...reviewImages['review-eze-awka'],
    alt: 'A WhatsApp conversation in which a customer writes that he is Eze from Awka, that he had tried all sorts of treatments for his eye challenge without success, and that he has seen a great improvement in his eyesight since using Isosha',
  },
  reviewAnitaAbuja: {
    ...reviewImages['review-anita-abuja'],
    alt: 'A WhatsApp message reading “This is the third bottle and it has really been helpful”, followed by the photograph the customer sent of a bottle of Isosha Herbal Capsules held in her hand',
  },

  coupleDecision: {
    src: `${base}/lifestyle-couple-decision-1400.webp`,
    srcSet: `${base}/lifestyle-couple-decision-800.webp 800w, ${base}/lifestyle-couple-decision-1400.webp 1400w`,
    width: 1672,
    height: 941,
    lifestyle: true,
    alt: 'A couple sitting together at home, talking over a card one of them is holding',
  },
};

export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About Isosha', href: '#about' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Eye Health', href: '#eye-health' },
  { label: 'Packages', href: '#packages' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQs', href: '#faqs' },
];

/**
 * The long form wraps to two lines on a 320px screen, which costs 45px of a
 * 720px viewport before the page has said anything. Phones get the short one.
 */
export const announcement = 'ISOSHA HERBAL CAPSULES · AVAILABLE IN NIGERIA';
export const announcementShort = 'AVAILABLE ACROSS NIGERIA';
