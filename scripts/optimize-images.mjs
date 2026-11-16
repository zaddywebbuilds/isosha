/**
 * Builds the optimised web image set from the client-supplied originals.
 *
 *   original-assets/*.png  ->  public/assets/images/*.webp
 *
 * Run with:  npm run images
 *
 * The originals in /original-assets are the master files. They are never
 * served directly. Drop a corrected file into /original-assets under the same
 * name and re-run this script.
 *
 * A recipe may also produce a cropped variant, so one master can serve more
 * than one aspect ratio without a second photograph.
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { reviews } from '../src/config/reviews.js';

const SRC = 'original-assets';
const OUT = 'public/assets/images';

/**
 * variants: [{ suffix, widths, aspect }]
 *   aspect  omitted -> keep the master's own ratio
 *           a number -> centre-crop to that width/height ratio
 */
const RECIPES = {
  // Product -------------------------------------------------------------
  'isosha-bottle-display': [
    { suffix: '', widths: [500, 900, 1200] },
    { suffix: '-square', widths: [420, 760], aspect: 1 },
  ],

  // Eye-health education -------------------------------------------------
  'eyecare-exam-wide-a': [{ suffix: '', widths: [800, 1400, 1672] }],
  'eyecare-exam-wide-b': [{ suffix: '', widths: [700, 1200] }],
  'eyecare-exam-wide-c': [{ suffix: '', widths: [600, 1000] }],
  'eyecare-portrait-a': [{ suffix: '', widths: [500, 900] }],
  'eyecare-portrait-b': [{ suffix: '', widths: [500, 900] }],
  'eye-anatomy-wide': [{ suffix: '', widths: [800, 1400] }],
  'eye-anatomy-portrait': [{ suffix: '', widths: [560, 1000] }],
  'vision-reading-strain-a': [{ suffix: '', widths: [600, 1000] }],
  'vision-reading-strain-b': [{ suffix: '', widths: [600, 1000] }],
  'vision-distance-blur-a': [{ suffix: '', widths: [600, 1000] }],
  'vision-distance-blur-b': [{ suffix: '', widths: [600, 1000] }],

  // Lifestyle ------------------------------------------------------------
  'lifestyle-daily-routine': [{ suffix: '', widths: [700, 1200] }],
  'lifestyle-couple-decision': [{ suffix: '', widths: [800, 1400] }],

  // Ingredients ----------------------------------------------------------
  // All eight are square studio shots on the same cream sweep, so they read
  // as one coordinated set. Two widths each: the large botanical cards and
  // the compact plant-compound row.
  'ingredient-turmeric': [{ suffix: '', widths: [420, 760], aspect: 1 }],
  'ingredient-clove': [{ suffix: '', widths: [420, 760], aspect: 1 }],
  'ingredient-ginger': [{ suffix: '', widths: [420, 760], aspect: 1 }],
  'ingredient-black-pepper': [{ suffix: '', widths: [420, 760], aspect: 1 }],
  'compound-lignans': [{ suffix: '', widths: [320, 560], aspect: 1 }],
  'compound-flavonoids': [{ suffix: '', widths: [320, 560], aspect: 1 }],
  'compound-tannins': [{ suffix: '', widths: [320, 560], aspect: 1 }],
  'compound-iridoid-glycosides': [{ suffix: '', widths: [320, 560], aspect: 1 }],

  /**
   * marketing-collage-NOT-FOR-SITE is deliberately absent.
   *
   * That file is a social-media composite. It has a NAFDAC seal drawn into
   * the artwork, the phrase "Helps Manage Glaucoma & Cataract", prices baked
   * in as pixels, and a doctor giving a thumbs-up. Publishing it on the site
   * would create a certification badge, an unverified disease claim, a price
   * that cannot be updated from config, and an implied medical endorsement,
   * all of which the brief rules out. It stays in original-assets as a
   * marketing asset for channels the client controls.
   */
};

await mkdir(OUT, { recursive: true });
const files = await readdir(SRC);

let written = 0;

for (const file of files) {
  if (!file.toLowerCase().endsWith('.png')) continue;
  const base = path.basename(file, path.extname(file));
  const variants = RECIPES[base];

  if (!variants) {
    console.log('skipped (not published):', file);
    continue;
  }

  const meta = await sharp(path.join(SRC, file)).metadata();

  for (const variant of variants) {
    for (const width of variant.widths) {
      let pipeline = sharp(path.join(SRC, file));

      if (variant.aspect) {
        const height = Math.round(width / variant.aspect);
        pipeline = pipeline.resize({
          width,
          height,
          fit: 'cover',
          position: 'centre',
          withoutEnlargement: true,
        });
      } else {
        pipeline = pipeline.resize({ width, withoutEnlargement: true });
      }

      const target = path.join(OUT, `${base}${variant.suffix}-${width}.webp`);
      await pipeline.webp({ quality: 80, effort: 5 }).toFile(target);
      written += 1;
      console.log('wrote', target);
    }
  }

  console.log(`  (master ${meta.width}x${meta.height})`);
}

console.log(`\nImage set rebuilt: ${written} files.`);

/* ------------------------------------------------------------------ */
/* Social preview card                                                 */
/*                                                                     */
/* Built as a 1200x630 JPEG rather than reusing a product WebP.        */
/* Two reasons: the product shot is portrait, so link previews crop it */
/* badly, and WhatsApp's scraper is unreliable with WebP. WhatsApp is  */
/* the main sharing channel for this product, so the card is a plain   */
/* JPEG at the standard Open Graph ratio.                              */
/* ------------------------------------------------------------------ */

const OG_W = 1200;
const OG_H = 630;

const source = path.join(SRC, 'isosha-bottle-display.png');

// A heavily blurred, darkened cover crop of the same photograph forms the
// backdrop. Compositing the sharp bottle over it avoids the hard seam that
// a flat colour panel leaves against the photo's own background.
const backdrop = await sharp(source)
  .resize({ width: OG_W, height: OG_H, fit: 'cover', position: 'centre' })
  .blur(38)
  .modulate({ brightness: 0.62, saturation: 1.1 })
  .toBuffer();

const INSET = Math.round(OG_H * 0.07);
const cardH = OG_H - INSET * 2;

const bottle = await sharp(source)
  .resize({ height: cardH, fit: 'inside' })
  .toBuffer();
const bottleMeta = await sharp(bottle).metadata();

// The product shot is a rectangular photograph, not a cut-out, so laying it
// straight onto the backdrop leaves a hard edge where its own background
// stops. Rounding the corners turns that edge into a deliberate frame, the
// same treatment the hero uses on the site.
const radius = 32;
const mask = Buffer.from(
  `<svg width="${bottleMeta.width}" height="${bottleMeta.height}">` +
    `<rect x="0" y="0" width="${bottleMeta.width}" height="${bottleMeta.height}" ` +
    `rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
);

const card = await sharp(bottle)
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(backdrop)
  .composite([
    {
      input: card,
      top: INSET,
      left: Math.round(OG_W - bottleMeta.width - INSET * 1.4),
    },
  ])
  .jpeg({ quality: 86, progressive: true, mozjpeg: true })
  .toFile(path.join(OUT, 'isosha-social-card.jpg'));

console.log('wrote', path.join(OUT, 'isosha-social-card.jpg'), '(1200x630 JPEG)');

/* ------------------------------------------------------------------ */
/* Review screenshots                                                  */
/*                                                                     */
/*   original-assets/reviews/<master>.jpeg -> public/assets/reviews/   */
/*                                                                     */
/* The crop for each one is declared in src/config/reviews.js, beside  */
/* the review it belongs to and beside the note explaining why that    */
/* part of the conversation is cut. Both screenshots lose their chat   */
/* header, which carries the customer's saved contact name, and the    */
/* Anita screenshot additionally loses a Netwill reply promising to    */
/* clear a named eye disease, which the rest of the site is built not  */
/* to claim.                                                           */
/*                                                                     */
/* Crop values are fractions of the master's height, so re-exporting a */
/* screenshot at a different resolution does not break them.           */
/*                                                                     */
/* The voice notes in public/assets/reviews/ are deliberately not      */
/* touched here. They are served exactly as the customer recorded      */
/* them; trimming or re-encoding a person's own words is not an        */
/* optimisation this script gets to make.                              */
/* ------------------------------------------------------------------ */

const REVIEW_SRC = path.join(SRC, 'reviews');
const REVIEW_OUT = 'public/assets/reviews';

await mkdir(REVIEW_OUT, { recursive: true });

// Absent until the client's screenshots are dropped in. The rest of the
// image set must still rebuild without them, so this is a skip, not a throw.
const reviewMasters = await readdir(REVIEW_SRC).catch(() => null);

if (!reviewMasters) {
  console.log(`\n${REVIEW_SRC} not found: review screenshots skipped.`);
}

let reviewsWritten = 0;

/**
 * The finished `src`, `srcSet`, width and height of each screenshot,
 * written back out to src/config/review-image-sizes.js.
 *
 * None of it can be known in advance. The crop is a fraction of the
 * master's height, so the output height depends on the file the client
 * supplied, and a requested width wider than the master is clamped rather
 * than upscaled, so the output width can come back smaller than asked for.
 * A hand-written srcSet would then claim "760w" for a 668px file and the
 * browser would pick the wrong one. Writing it from what sharp actually
 * produced is the only version that cannot drift.
 */
const sizes = {};
const REVIEW_URL_BASE = 'assets/reviews';

// One customer's conversation can run across more than one screenshot, so
// this is a flat list of every picture to build, not one per review.
const shots = reviewMasters
  ? reviews.flatMap((review) => review.screenshots ?? [])
  : [];

for (const shot of shots) {
  const master = reviewMasters.find(
    (f) => path.basename(f, path.extname(f)) === shot.master,
  );

  if (!master) {
    console.log('MISSING review master:', shot.master, 'in', REVIEW_SRC);
    continue;
  }

  const file = path.join(REVIEW_SRC, master);
  const meta = await sharp(file).metadata();

  const { top = 0, bottom = 1 } = shot.crop ?? {};
  const cropTop = Math.round(meta.height * top);
  const cropHeight = Math.round(meta.height * (bottom - top));

  // Clamp to the master's own width so a file is never named after a width
  // it does not have, and drop the duplicates clamping can create.
  const widths = [...new Set(shot.widths.map((w) => Math.min(w, meta.width)))].sort(
    (a, b) => a - b,
  );

  const variants = [];

  for (const width of widths) {
    const name = `${shot.master}-${width}.webp`;
    const target = path.join(REVIEW_OUT, name);

    const info = await sharp(file)
      .extract({
        left: 0,
        top: cropTop,
        width: meta.width,
        height: cropHeight,
      })
      .resize({ width })
      .webp({ quality: 82, effort: 5 })
      .toFile(target);

    reviewsWritten += 1;
    console.log('wrote', target, `(${info.width}x${info.height})`);
    variants.push({ name, width: info.width, height: info.height });
  }

  // Widest last, and that is the one `src` points at.
  const widest = variants[variants.length - 1];

  sizes[shot.master] = {
    src: `${REVIEW_URL_BASE}/${widest.name}`,
    srcSet: variants
      .map((v) => `${REVIEW_URL_BASE}/${v.name} ${v.width}w`)
      .join(', '),
    width: widest.width,
    height: widest.height,
  };

  console.log(
    `  (${shot.master}: master ${meta.width}x${meta.height}, ` +
      `kept ${Math.round((bottom - top) * 100)}% of the height from ${Math.round(top * 100)}%)`,
  );
}

const SIZES_FILE = 'src/config/review-images.js';

// Nothing was rebuilt, so what is already on record is still the truth.
// Overwriting it with an empty object would strip the src, the srcSet and
// the dimensions off every review screenshot on the page.
if (Object.keys(sizes).length === 0) {
  console.log(`\nNo review screenshots rebuilt: ${SIZES_FILE} left alone.`);
  process.exit(0);
}

const entries = Object.entries(sizes)
  .map(
    ([key, v]) =>
      `  '${key}': {\n` +
      `    src: '${v.src}',\n` +
      `    srcSet: '${v.srcSet}',\n` +
      `    width: ${v.width},\n` +
      `    height: ${v.height},\n` +
      `  },`,
  )
  .join('\n');

await writeFile(
  SIZES_FILE,
  `/**
 * GENERATED FILE — DO NOT EDIT BY HAND
 * ------------------------------------
 * Written by scripts/optimize-images.mjs on every \`npm run images\`.
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
${entries}
};
`,
  'utf8',
);

console.log('wrote', SIZES_FILE);
console.log(`\nReview screenshots rebuilt: ${reviewsWritten} files.`);
