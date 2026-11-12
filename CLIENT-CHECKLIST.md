# What Netwill Herbals still needs to supply

The site is built and works end to end. Everything below is a real gap, shown
on the page as a clearly marked placeholder rather than filled in with a
guess. Each row says exactly which file to edit.

---

## 1. Blocking before launch

| # | Needed | Where it goes | What the site does meanwhile |
| --- | --- | --- | --- |
| 1 | **WhatsApp number** (international format, digits only, e.g. `2348012345678`) | `contact.whatsapp` in `src/config/site.js` | The WhatsApp order button is hidden and a note explains why. No placeholder number is shown, so no stranger gets called. |
| 2 | **Phone number, email, business address** | `contact.*` in `src/config/site.js` | Footer shows "To be supplied by the client" against each one. |
| 3 | **Order destination** — WhatsApp, a form provider, or the company CRM endpoint | `formIntegration.mode` in `src/config/site.js` | The form validates fully but sends nothing, stores nothing, and tells the visitor plainly that ordering is not yet live. |
| 4 | **Live domain** | `<link rel="canonical">` in `index.html`, `seo.canonical` in `src/config/site.js`, `Sitemap:` in `public/robots.txt` | Canonical URL and sitemap are left out rather than pointing somewhere wrong. |

## 2. Regulatory and product facts

| # | Needed | Where it goes | What the site does meanwhile |
| --- | --- | --- | --- |
| 5 | **NAFDAC verification.** Check `A7-102621L` against an authentic registration record. | `regulatory.nafdacVerified` in `src/config/site.js` | The number is shown as supplied by the manufacturer, marked "pending verification". No badge or seal is drawn. |
| 6 | **Full botanical name for "Zingiber".** The declaration supplied is a genus, not a species. | `botanicals` in `src/config/ingredients.js` | The card shows the supplied name with "full botanical name pending confirmation". No ginger photograph is used. |
| 7 | **Ingredient quantities** from the approved label | `src/config/ingredients.js` | No amount or percentage appears anywhere. |
| 8 | **Full directions for use** | `productInfoPanels` in `src/config/product.js` | Expandable panel says the directions are to be supplied. |
| 9 | **Warnings, precautions, interactions** | same | Same. Safety text is never drafted on the manufacturer's behalf. |
| 10 | **Storage information and shelf life** | same | Same. |
| 11 | **Manufacturer legal name, address, licence** | `regulatory.manufacturer` in `src/config/site.js` | Trust card says it will be published once supplied. |

## 3. Commercial terms

| # | Needed | Where it goes |
| --- | --- | --- |
| 12 | Delivery coverage, charges and timelines | `legalDocuments` → Terms, in `src/config/legal.js` |
| 13 | Accepted payment methods and when payment is due | same |
| 14 | Refund and returns position (this is a business decision, not a drafting gap) | `legalDocuments` → Refund and Returns Policy |
| 15 | Whether the delivery details may also be used for marketing | `legalDocuments` → Privacy Policy |

## 4. Content

| # | Needed | Where it goes | What the site does meanwhile |
| --- | --- | --- | --- |
| 16 | **Genuine customer reviews**, published with the customer's permission | `reviews` array in `src/components/Testimonials.jsx` | Empty review placeholders, labelled as reserved for verified feedback. Nothing is written on a customer's behalf. |
| 17 | **Social profile URLs** (Facebook, Instagram, TikTok) | `social.*` in `src/config/site.js` | Icons are hidden rather than linked to a dead profile. |
| 18 | **Legal review** of the four draft documents | `src/config/legal.js`, then set `draft: false` | Each draft is labelled "Draft for client review" and bracketed text marks every outstanding decision. |

## 5. Images

Masters live in `original-assets/`. `npm run images` rebuilds the served set
in `public/assets/images/`. `src/config/site.js` maps each one to its place.

### Where the 15 supplied images are used

| Master file | Used for |
| --- | --- |
| `isosha-bottle-display` | Hero, "Meet Isosha", and all three pricing cards (square crop) |
| `eyecare-exam-wide-a` | Wide band opening the Eye Health section |
| `eyecare-exam-wide-c` | Glaucoma card |
| `eyecare-exam-wide-b` | Glaucoma card, expanded "Learn more" panel |
| `vision-reading-strain-a` | Cataracts card |
| `vision-reading-strain-b` | Cataracts card, expanded panel |
| `vision-distance-blur-a` | Myopia card |
| `vision-distance-blur-b` | Myopia card, expanded panel |
| `eye-anatomy-wide` | Main anatomy figure |
| `eye-anatomy-portrait` | "See the detailed diagram" disclosure |
| `eyecare-portrait-b` | Eye care in practice, first portrait |
| `eyecare-portrait-a` | Eye care in practice, second portrait |
| `lifestyle-daily-routine` | Product information section |
| `lifestyle-couple-decision` | Closing call to action |

Every photograph of a person is captioned or framed as lifestyle or
educational photography, and never as a result from using the product.

### One supplied image is deliberately not published

`marketing-collage-NOT-FOR-SITE.png` is kept in `original-assets/` but is not
served. It is a social-media composite containing four things the brief rules
out:

1. A **NAFDAC seal** drawn into the artwork, next to registration number
   A7-102621L. The number has not been independently verified, and a drawn
   seal is exactly the fake certification badge the brief prohibits.
2. The phrase **"Helps Manage Glaucoma & Cataract"** as a headline claim.
3. **Prices baked in as pixels** (₦21,500 / ₦40,000 / ₦55,000). A price in an
   image cannot be updated from `pricing.js`, so it would silently go stale.
4. A **doctor giving a thumbs-up**, which reads as a professional
   endorsement the product does not have.

It is fine for channels Netwill Herbals controls and accepts responsibility
for. If a version of it is wanted on the site, supply one without the seal,
the disease claim and the baked-in prices.

### Product photography still outstanding

Only one product photograph was supplied, so all three pricing cards show the
same bottle with the quantity stated in type (×1, ×2, ×3). No two-bottle or
three-bottle render was invented, because that would show packaging
arrangements that do not exist. Worth supplying:

- A **transparent cut-out** of the bottle (PNG with alpha) for flexible
  placement.
- A genuine **two-bottle** and **three-bottle** photograph.
- **Ingredient macro photography** (turmeric, clove, black pepper). The
  ingredient cards currently use drawn botanical marks in the brand palette,
  because the brief rules out unrelated stock ingredient photography.

Keep the bottle label exactly as the manufacturer produced it. Do not
regenerate the label text; composite the approved artwork onto a render and
check every word against the original. Keep text out of images generally, so
headings stay real HTML for accessibility and search.

---

## Already handled, no action needed

- Prices, savings and supply-duration arithmetic: all derived from one config
  object, so they cannot drift apart.
- Package selection carries into the order form and stays selected.
- Mobile layout from 320 px up, no horizontal scrolling.
- Reduced-motion support, keyboard navigation, focus management.
- Structured data, Open Graph and X preview metadata, built from confirmed
  facts only. No rating or review markup.
- No cookies, no analytics, no third-party requests. Fonts are served from the
  build.
