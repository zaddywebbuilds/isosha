/**
 * GENERATED FILE — DO NOT EDIT BY HAND
 * ------------------------------------
 * Written by scripts/optimize-images.mjs on every `npm run images`.
 *
 * It holds the real src, srcSet and pixel size of every review screenshot
 * after cropping and resizing. None of that is knowable in
 * src/config/site.js: the crop is a fraction of the master's height,
 * declared in src/config/reviews.js, and a requested width wider than the
 * master is clamped rather than upscaled. Written by hand, the srcSet would
 * sooner or later claim a width the file does not have, and the browser
 * would choose the wrong file on the strength of it.
 *
 * Alt text is NOT here. It is a description of what the picture shows, so
 * it stays with the other alt text in src/config/site.js.
 */
export const reviewImages = {
  'review-cafergot-migraine': {
    src: 'assets/reviews/review-cafergot-migraine-760.webp',
    srcSet: 'assets/reviews/review-cafergot-migraine-420.webp 420w, assets/reviews/review-cafergot-migraine-760.webp 760w',
    width: 760,
    height: 1081,
  },
  'review-confidence-returned': {
    src: 'assets/reviews/review-confidence-returned-668.webp',
    srcSet: 'assets/reviews/review-confidence-returned-420.webp 420w, assets/reviews/review-confidence-returned-668.webp 668w',
    width: 668,
    height: 1265,
  },
  'review-eze-awka': {
    src: 'assets/reviews/review-eze-awka-760.webp',
    srcSet: 'assets/reviews/review-eze-awka-420.webp 420w, assets/reviews/review-eze-awka-760.webp 760w',
    width: 760,
    height: 964,
  },
  'review-anita-abuja': {
    src: 'assets/reviews/review-anita-abuja-760.webp',
    srcSet: 'assets/reviews/review-anita-abuja-420.webp 420w, assets/reviews/review-anita-abuja-760.webp 760w',
    width: 760,
    height: 675,
  },
};
