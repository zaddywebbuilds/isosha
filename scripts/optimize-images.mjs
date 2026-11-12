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
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

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
