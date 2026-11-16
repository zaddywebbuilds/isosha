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
| 3 | ~~Order destination~~ **Done.** Orders post to Xurge CRM. | `src/config/crm.js` | Live. A completed form creates a real order record. |
| 4 | ~~Live domain~~ **Done.** `https://eyesosharp.com`. | `siteUrl` in `src/config/site.js`, plus the four absolute URLs in the `<head>` of `index.html`, `public/robots.txt` and `public/sitemap.xml` | Canonical, Open Graph, Twitter card, sitemap and structured data all point at eyesosharp.com. |

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
| 15 | Whether the delivery details may also be used for marketing. **The CRM's cart-abandonment script already follows up incomplete orders, so this needs an answer before launch.** | `legalDocuments` → Privacy Policy |
| 15b | Where Xurge CRM stores order data, for how long, and under what agreement | `legalDocuments` → Privacy Policy |
| 15c | Who inside the business can see the eye-condition answer, and whether it is used for anything beyond handling the order | `legalDocuments` → Privacy Policy |

## 4. Content

| # | Needed | Where it goes | What the site does meanwhile |
| --- | --- | --- | --- |
| 16 | ~~Genuine customer reviews~~ **Partly done.** Two WhatsApp messages and three voice notes are now published. Three things are still outstanding, listed below. | `src/config/reviews.js` | The reviews section is back on the page, under the trust section. |
| 17 | **Social profile URLs** (Facebook, Instagram, TikTok) | `social.*` in `src/config/site.js` | Icons are hidden rather than linked to a dead profile. |
| 18 | **Legal review** of the four draft documents | `src/config/legal.js`, then set `draft: false` | Each draft is labelled "Draft for client review" and bracketed text marks every outstanding decision. |

### Outstanding on the reviews now published

Everything here lives in `src/config/reviews.js`, one entry per review.

| # | Needed | What the site does meanwhile |
| --- | --- | --- |
| 16a | **Permission from each customer** to publish their words, and for the two screenshots, their message. Nigerian data-protection law treats a WhatsApp message as the sender's personal data; a customer praising a product in a private chat has not thereby agreed to appear on a sales page. Get it in writing, including for the three voice notes. | Published. Set `publish: false` on an entry to pull it immediately. |
| 16b | **Transcripts of the three voice notes.** An audio-only review with no text alternative fails WCAG 1.2.1, and this product is sold to people whose sight is not what it was, so the written version matters more here, not less. | Each player shows a "Transcript pending" chip. Fill `audio.transcript` and the transcript appears behind a "Read the transcript" disclosure. |
| 16c | **Who sent each voice note, and when each message was sent.** | Voice notes are shown unattributed under "Senders to be confirmed". No date is shown on any review. |

### 16d. Published on your instruction, over a flagged objection

On 16 November 2026 Netwill Herbals instructed that **everything supplied go
on the page**, and it has. That includes the `offshore-customer` entry,
whose two screenshots are now published whole.

The objection was raised before publishing and was overruled. It is written
down here because it is still live, not because the decision is open:

1. The customer says he has stopped taking **Cafergot, a prescription
   medicine**. Later in the same conversation his **ophthalmologist takes
   him off two of the three glaucoma eyedrops** he had used for over four
   years. A visitor with glaucoma can read that as a reason to stop their
   own drops. That is the part with a real injury behind it.
2. It attributes **glaucoma and its symptoms** to the capsule, which the
   rest of the site states plainly it does not treat.
3. The Netwill reply tells him to "complete the 3 bottles **as
   prescribed**". Netwill does not prescribe.

**What this changes for the items above.** 16a stops being paperwork. A
testimonial about someone's glaucoma and their medication is health data
about an identifiable person, and it is now on a public page. Get his
written permission, specifically for these two screenshots, before anyone
starts sending traffic here. If he objects later, this is the entry that
costs the most to have published.

It is one edit to take down: `publish: false` on `offshore-customer` in
`src/config/reviews.js`. The masters stay in `original-assets/reviews/`
either way.

**Two judgement calls still standing, both reversible:**

1. The Anita screenshot is **cropped** so it starts at her own message. The
   part cut off is the Netwill reply saying the capsule "will help you
   totally clear the cataract cloudiness". That is the seller promising to
   cure a named eye disease, which is the one thing this whole site is built
   not to do, and putting it on the page inside a screenshot publishes it
   just as surely as typing it. Her words and the photograph she sent are
   kept. The crop is one line in `src/config/reviews.js`.
2. Every screenshot is published as **supporting evidence behind a
   disclosure**, not as the review itself. The review on the page is the
   customer's words as real text. A screenshot of a phone chat is small,
   low-contrast type that cannot be enlarged, read aloud by a screen reader
   or found by a search engine, and this site's visitors are the people
   least able to read it. The written quote therefore carries everything the
   pictures show, including the medication passages in `offshore-customer`.

**Three customers, not four cards.** The two screenshots from the offshore
worker are one conversation, so they sit in one card. Splitting them would
have made three customers look like four.

**Not done:** no star rating, review count or `AggregateRating` markup has
been added. Three written reviews are not a rating, and review markup asks
Google to vouch for a score that nothing verifies.

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
| `ingredient-turmeric` / `-clove` / `-ginger` / `-black-pepper` | The four large botanical cards in "Inside Isosha" |
| `compound-lignans` / `-flavonoids` / `-tannins` / `-iridoid-glycosides` | The compact plant-compound row |

Every photograph of a person is captioned or framed as lifestyle or
educational photography, and never as a result from using the product.

The four plant-compound photographs are labelled on the page with what each
one actually shows ("Shown: flaxseed and sesame seed"), and the section states
in full that they illustrate a class of compound and are not photographs of
the source materials used in Isosha. Lignans, flavonoids, tannins and iridoid
glycosides are classes of compounds, not single plants, so they are presented
in a visually lighter tier than the four confirmed botanicals.

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
- Fonts are served from the build. The only third-party code is the two Xurge
  CRM scripts that belong with the order form, and the Privacy Policy now
  describes both rather than claiming the site is tracker-free.
