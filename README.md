# Isosha Herbal Capsules

One-page sales site for **Isosha Herbal Capsules**, a product of **Netwill Herbals**.

React + Vite + Tailwind CSS v4. Static output, no backend, no third-party
requests at runtime (fonts are vendored, there is no analytics, no pixel and
no cookie).

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5178
npm run build    # static site in dist/
npm run preview  # serve the built site
npm run images   # rebuild the optimised image set from original-assets/
```

Node 20 or newer.

---

## Deploying

`vite.config.js` sets `base: './'`, so `dist/` works from a domain root, from a
GitHub Pages project sub-path, or from any static host, with no change.

**GitHub Pages:** `.github/workflows/deploy.yml` builds and publishes on every
push to `main`/`master`. Turn it on once under **Settings → Pages → Build and
deployment → Source → GitHub Actions**.

**Any other static host:** upload the contents of `dist/`.

---

## Where to edit things

Everything the client can change lives in `src/config/`. No price, phone
number, ingredient or FAQ is hardcoded anywhere else.

| File | Holds |
| --- | --- |
| `src/config/pricing.js` | Package prices, bottle counts, max order quantity. Savings and per-bottle figures are calculated, never typed in. |
| `src/config/product.js` | Product facts, the hero highlight strip, the expandable label panels. |
| `src/config/ingredients.js` | Botanicals, vitamins, listed compounds. |
| `src/config/faqs.js` | The FAQ accordion. Add or reorder freely. |
| `src/config/site.js` | Contact details, social links, NAFDAC status, SEO, image paths, **order form integration**. |
| `src/config/legal.js` | Draft Privacy, Terms, Refunds and Disclaimer text. |
| `src/config/states.js` | The state dropdown. |

### Changing a price

Edit `price` in `src/config/pricing.js`. The pricing cards, the order form,
the order summary and the structured data all follow automatically. The
"savings" line is `bottles × singleBottlePrice − price`, so it can never
disagree with the prices shown.

### Connecting the order form

`src/hooks/useOrderSubmission.js` is the only place customer details leave the
page. Set `formIntegration.mode` in `src/config/site.js`:

- `'demo'` — **the current setting.** Nothing is sent, nothing is stored, and
  the form tells the visitor plainly that ordering is not yet live. It never
  reports a successful order that nobody received.
- `'whatsapp'` — opens WhatsApp with the order pre-filled. Needs a real
  `contact.whatsapp` number (international format, digits only, e.g.
  `2348012345678`).
- `'endpoint'` — POSTs JSON to `formIntegration.endpointUrl`. Works with
  Formspree, Getform, Basin, a Google Apps Script web app, a serverless
  function or the client's own CRM. The exact payload shape is documented at
  the top of `useOrderSubmission.js`.

Empty values in `site.js` are treated as "not supplied": the site renders a
clearly marked placeholder rather than a fake phone number, address or link.
Fill the value in and the real thing appears.

---

## Images

| Where | File |
| --- | --- |
| Masters (client-supplied) | `original-assets/*.png` |
| Served, optimised | `public/assets/images/*.webp` |

`npm run images` regenerates the served set from the masters with `sharp`.
Drop a corrected render into `original-assets/` under the same filename and
re-run it. The originals total about 6 MB; the served set is about 0.9 MB.

The ingredient cards use drawn botanical marks
(`src/components/BotanicalMarks.jsx`) rather than stock photography, because
no licensed turmeric, clove or pepper photographs were supplied and the brief
rules out unrelated imagery. Swap them for an `<Img>` if real macro
photography is supplied; the card layout does not need to change.

---

## Accessibility and performance notes

- Skip link, semantic landmarks, one `h1`, ordered headings.
- Every control is keyboard reachable, with a visible gold focus ring.
- The FAQ, the label panels and the "learn more" cards are real
  `aria-expanded` disclosures; the legal dialog traps focus, closes on Escape
  and restores focus.
- Form errors use `aria-invalid` and `aria-describedby`; the result message is
  in an `aria-live` region.
- `prefers-reduced-motion` disables every reveal, transition and smooth
  scroll. The page is fully usable with JavaScript animation off.
- Images carry width and height, so nothing shifts as they load.
- No external fonts, scripts or trackers. Fonts are subset to latin and
  latin-ext and served from the build.

---

## What is deliberately **not** on this site

These are not omissions to be filled in later by guesswork. Each one was left
out because publishing it without evidence would be false:

- No claim that Isosha treats, cures, prevents or manages glaucoma, cataracts,
  myopia or any other disease.
- No fake reviews, star ratings, sales counts or professional endorsements.
- No NAFDAC badge, certification seal or government endorsement graphic. The
  registration number is shown as supplied, marked pending verification.
- No invented ingredient quantities or percentages.
- No countdown timers, false stock warnings, invented discounts or
  fear-of-blindness messaging.
- No delivery, payment or refund promise, because none has been confirmed.

See `CLIENT-CHECKLIST.md` for everything the client still needs to supply.
