/**
 * SALES AND SEO COPY
 * ==================
 * Every headline and paragraph on the page lives here, so copy can be
 * rewritten without touching a component.
 *
 * POSITIONING
 * -----------
 * The Nigerian herbal eye market is full of "cure glaucoma in 30 days"
 * advertising. The buyer for a 55,000 naira pack is 40 to 60, educated,
 * has money, and has already been lied to by that advertising at least once.
 * Another miracle claim puts Isosha in the same pile as the scams.
 *
 * So the page sells on the opposite: it is the one that refuses to claim a
 * cure. That is a damaging admission, one of the oldest and strongest
 * devices in direct response, and here it happens to be true. It builds the
 * trust that a premium price needs, and it keeps the product clear of NAFDAC
 * and ARCON advertising rules, which a disease claim would not.
 *
 * WHAT MAY BE CLAIMED
 * -------------------
 * Only nutrient-function statements that hold for the vitamin itself:
 *   Vitamin A  - contributes to the maintenance of normal vision
 *   Vitamin B2 - contributes to the maintenance of normal vision
 *   Vitamin C  - contributes to the protection of cells from oxidative stress
 *   Vitamin E  - contributes to the protection of cells from oxidative stress
 * Never that Isosha treats, manages, slows, reverses or cures any condition.
 *
 * SEO
 * ---
 * Primary: eye supplement Nigeria, herbal eye supplement
 * Secondary: vitamins for eye health, eye care supplement, Isosha,
 *            Netwill Herbals, eye supplement price Nigeria
 * Local: Nigeria, Lagos, Abuja, nationwide delivery, states named in the
 *        delivery FAQ so state-level searches have something to match.
 */

/* --------------------------------------------------------------------- */
/* HERO                                                                   */
/* --------------------------------------------------------------------- */

export const hero = {
  eyebrow: 'Eye-wellness supplement · Nigeria',
  // PROBLEM. The moment of recognition, which almost every adult past forty
  // has had, and which nobody else in this market opens with. The body then
  // stacks three more recognitions so the reader is nodding before the
  // product is mentioned at all.
  headlineLead: 'You noticed it',
  headlineAccent: 'while reading.',
  body: 'First it was the small print. Then the phone, held a little further away. Then headlights at night, scattering more than they used to.',
  bodyTwo:
    'Your eyes have been telling you something for a while now. Most Nigerian adults wait years before they listen, and the waiting is the part that costs.',
  primaryCta: 'See Prices and Order',
  secondaryCta: 'Why it is happening',
};

/* --------------------------------------------------------------------- */
/* OBJECTION                                                              */
/*                                                                        */
/* PAS stage three, and the conversion engine of the page. It sits after  */
/* Agitate because that is where the reader's doubt actually appears: not */
/* "do I have a problem" but "is this another one of the lying ones".     */
/* --------------------------------------------------------------------- */

export const promise = {
  eyebrow: 'And then what?',
  headline: 'What Isosha will not tell you.',
  paragraphs: [
    'So you book the examination. Then, like most people, you start looking for something you can do every day in between. That is the moment this market has been waiting for, and it is where the trouble starts.',
    'You have seen the adverts. Cure glaucoma in thirty days. Throw away your glasses. Dissolve cataract naturally. Perhaps you have already paid for one of them.',
    'Isosha is not going to say any of that.',
    'Glaucoma, cataract and myopia are medical conditions. They are found with equipment, by professionals, and they are managed by professionals. No capsule, herbal or otherwise, replaces your eye drops, your surgery or your prescription glasses. Anyone who tells you differently is selling you something, and it is not your sight.',
    'Here is what Isosha actually is. A daily botanical supplement made with turmeric, clove, ginger and black pepper, with vitamins A and B2, which contribute to the maintenance of normal vision, and vitamins C and E, which contribute to the protection of cells from oxidative stress. One capsule a day. Thirty days to a bottle. Taken alongside proper eye care, never instead of it.',
    'If that sounds less exciting than the adverts, good. It is also true, and you can check every word of it on this page.',
  ],
  pullQuote:
    'The product that will not lie to you about your eyes is the one worth putting in your body every morning.',
  points: [
    {
      icon: 'check',
      title: 'No cure claims',
      body: 'Not one sentence on this website claims Isosha treats or cures a disease, because none has been established.',
    },
    {
      icon: 'doc',
      title: 'Every ingredient named',
      body: 'Four botanicals and four vitamins, listed in full. Where a detail is still awaited from the manufacturer, the page says so instead of filling the gap.',
    },
    {
      icon: 'shield',
      title: 'Works with your doctor',
      body: 'Isosha is designed to sit beside your eye examinations and any treatment you have been prescribed, not to replace either.',
    },
  ],
};

/* --------------------------------------------------------------------- */
/* WHY NOW                                                                */
/* --------------------------------------------------------------------- */

/* --------------------------------------------------------------------- */
/* AGITATE                                                                */
/*                                                                        */
/* Two movements. First the daily cost, which the reader already feels    */
/* and has never seen written down. Then the reason waiting is expensive, */
/* which is education, not a threat.                                      */
/*                                                                        */
/* The call to action of the second movement is "book an eye examination",*/
/* not "buy this". That is deliberate. Pointing the reader at a           */
/* professional at the exact moment they are most worried is the single   */
/* most trust-building thing this page does, and it is the opposite of    */
/* what every competitor does with the same fear.                         */
/* --------------------------------------------------------------------- */

export const agitate = {
  eyebrow: 'The part nobody warns you about',
  headline: 'It never announces itself. It just gets harder to ignore.',
  body: 'There is no single morning you wake up and your sight has changed. It arrives as a series of small adjustments, each one small enough to explain away. You have probably made most of these already.',

  // Each one is a specific, physical moment. No abstractions.
  frictions: [
    {
      icon: 'doc',
      title: 'The arm stretch',
      body: 'Holding your phone, a newspaper or your Bible further away than you used to, and turning the brightness up to find the words.',
    },
    {
      icon: 'lens',
      title: 'Headlights that scatter',
      body: 'Driving at night takes more concentration than it did. Oncoming lights spread instead of staying where they should.',
    },
    {
      icon: 'focus',
      title: 'The afternoon ache',
      body: 'That tightness behind the eyes after a long stretch on a laptop or a POS terminal, and the headache that follows it home.',
    },
    {
      icon: 'sun',
      title: 'Never enough light',
      body: 'Reading indoors means moving towards a window. In the evening you simply stop trying.',
    },
  ],

  // Second movement: why waiting is the expensive choice.
  turn: {
    eyebrow: 'Why waiting costs more than acting',
    headline: 'The conditions that matter most are the quietest ones.',
    points: [
      'Glaucoma, the leading cause of irreversible blindness in Nigeria, usually causes no pain and no obvious symptom until a great deal of sight has already gone.',
      'It runs in families, and it is both more common and often more aggressive among people of West African descent than almost anywhere else in the world.',
      'Sight lost to it does not come back. What is caught early can be managed for decades.',
      'And a great many Nigerian adults have never had a single proper eye examination.',
    ],
    closing:
      'So here is the one thing on this page we would say even if we were not selling anything: book an eye examination. Not because of this product. Because you are over thirty, you live in Nigeria, and you have been putting it off.',
    cta: 'Then come back and read the rest.',
  },
};

/* --------------------------------------------------------------------- */
/* SECTION HEADINGS                                                       */
/* --------------------------------------------------------------------- */

export const sections = {
  about: {
    eyebrow: 'Meet Isosha',
    headline: 'Four botanicals. Four vitamins. One capsule a day.',
    body: 'Isosha Herbal Capsules brings together turmeric, clove, ginger and black pepper with vitamins A, B2, C and E, in a capsule small enough to forget you are taking it. Thirty capsules to a bottle, one a day, for Nigerian adults from thirty upwards who would rather do something about their eyes than wait and hope.',
    points: [
      'Turmeric, clove, ginger and black pepper',
      'Vitamins A and B2 for the maintenance of normal vision',
      'Vitamins C and E for protection of cells from oxidative stress',
      'One capsule daily, thirty days to a bottle',
    ],
    cta: 'See prices and order',
  },

  eyeHealth: {
    eyebrow: 'Know what you are dealing with',
    headline: 'Glaucoma, cataract and myopia are not the same thing.',
    body: 'They are three different conditions, in three different parts of the eye, with three different answers. Anyone selling you one product for all three has not told you that. Here is the plain version.',
    note: 'Educational information only. Consult a qualified eye-care professional for diagnosis and treatment.',
  },

  ingredients: {
    eyebrow: 'What is inside Isosha?',
    headline: 'Nature-inspired ingredients, thoughtfully combined.',
    body: 'Explore the botanical ingredients, vitamins and naturally occurring plant compounds listed in the Isosha formulation.',
  },

  details: {
    eyebrow: 'How to take it',
    headline: 'One capsule. Every morning. That is the whole routine.',
    body: 'No measuring, no mixing, no bitter decoction on an empty stomach. The dosage provided by the manufacturer is one capsule daily, so a single bottle covers a full thirty days.',
  },

  packages: {
    eyebrow: 'Prices',
    headline: 'Choose your Isosha package.',
    body: 'Every package holds the same thirty-capsule bottle. The larger packages simply cost less per bottle. Supply duration below is arithmetic, thirty capsules divided by one a day, and not a recommended course of treatment.',
    valueFraming:
      'At the three-bottle price, Isosha works out at about {perDay} a day. A single consultation at most Nigerian eye clinics costs considerably more than that, and you should still have one.',
    footnote:
      'Savings are measured against the single-bottle price of {single}. Prices exclude delivery. Delivery coverage and charges are confirmed by the seller before dispatch.',
  },

  order: {
    eyebrow: 'Order',
    headline: 'Order Isosha with delivery across Nigeria.',
    body: 'Fill in your details and the Netwill Herbals team will call you to confirm your order and the delivery charge for your state before anything is dispatched. Orders go straight to the team, so there is no account to create and nothing to pay on this page.',
  },

  trust: {
    eyebrow: 'Check us',
    headline: 'Everything we claim, you can check.',
    body: 'Every statement about Isosha on this website comes from the manufacturer. Where something has not been confirmed yet, this page says so rather than quietly filling the gap. That is the whole standard.',
  },

  faq: {
    eyebrow: 'Questions',
    headline: 'Questions Nigerians actually ask about Isosha.',
    body: 'Straight answers on price, delivery, safety and what this product does and does not do.',
    cta: 'Order Isosha',
  },

  finalCta: {
    headlineLead: 'Thirty days starts',
    headlineAccent: 'with one capsule.',
    body: 'You already noticed something. The question is only whether you do anything about it this month or next year. Compare the packages, place your order, and keep your eye appointments.',
    primaryCta: 'Select your package',
    secondaryCta: 'See how to take it',
  },
};
