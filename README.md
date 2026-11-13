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

### The order form

Orders post natively to Netwill Herbals' Xurge CRM. Everything about that
integration lives in `src/config/crm.js`: the endpoint, the hidden routing
fields, the package ids, the eye-condition options and the state list.

Three things are easy to break and worth knowing:

1. **It is a native form POST, not `fetch()`.** The CRM sends no CORS
   headers, so a scripted request is blocked by the browser and the order
   fails silently. The browser therefore leaves the page on submit and lands
   on the CRM's confirmation, which is this CRM's normal behaviour.
2. **Field names are fixed by the CRM.** Renaming one does not error; it
   quietly drops that value from the order. The package is a real `<select>`
   rather than a hidden input because `cart_abandonment.js` reads it with
   `querySelector('select[name="package"]')`.
3. **The form id prefix is load bearing.** Both CRM scripts find the form
   with `querySelector('[id^="orderForm"]')` and bind on `DOMContentLoaded`,
   which fires before React renders. They are therefore injected after mount
   by `src/hooks/useCrmScripts.js`, which also re-dispatches
   `DOMContentLoaded` because `click_control.js` has no `readyState` check.

Package ids map through `crmId` in `src/config/pricing.js`
(1 bottle = 27, 2 = 28, 3 = 29). Change a price there and the card, the
summary and the structured data all follow, but the `crmId` must keep
matching the CRM's own package list.

---

## Images

| Where | File |
| --- | --- |
| Masters (client-supplied) | `original-assets/*.png` |
| Served, optimised | `public/assets/images/*.webp` |

`npm run images` regenerates the served set from the masters with `sharp`.
Drop a corrected render into `original-assets/` under the same filename and
re-run it. The originals total about 6 MB; the served set is about 0.9 MB.

The "Inside Isosha" section runs three tiers of decreasing visual weight: the
four confirmed botanicals as large white cards with edge-to-edge photography,
the four vitamins as a deep-green typographic band with no imagery, and the
four classes of plant compounds as a compact row. The hierarchy is
deliberate. The compound photographs illustrate a class of compound and are
not photographs of the source material used in Isosha, so they do not carry
the same weight as a confirmed ingredient. Each one is labelled with what it
actually shows, and the section says so in full underneath.

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
- Fonts are subset to latin and latin-ext and served from the build, with no
  external font request. The only third-party code is the two Xurge CRM
  scripts that belong with the order form.

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
