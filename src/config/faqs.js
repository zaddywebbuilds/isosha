/**
 * FAQ CONFIGURATION
 *
 * These double as the page's organic-search surface. Each question is
 * phrased the way a Nigerian buyer actually types it into Google, because
 * those exact strings are what the FAQPage structured data in
 * src/hooks/useStructuredData.js is built from.
 *
 * Questions people really search, and which are answered below:
 *   "how much is isosha"            -> price question
 *   "is isosha nafdac approved"     -> registration question
 *   "eye supplement nigeria price"  -> price question
 *   "can i take ... with eye drops" -> prescription question
 *   "does it cure glaucoma"         -> the honest answer
 *   "do you deliver to <state>"     -> delivery question, states named
 *
 * Answers stay honest. An answer that overclaims is worse than no answer:
 * it loses the sceptical buyer who can afford the three-bottle pack.
 */

export const faqs = [
  {
    q: 'How much is Isosha in Nigeria?',
    a: 'A single bottle of 30 capsules is ₦21,500. Two bottles are ₦40,000, which saves ₦3,000. Three bottles are ₦55,000, which saves ₦9,500 and works out at roughly ₦611 a day. Prices do not include delivery, which is confirmed for your location before anything is dispatched.',
  },
  {
    q: 'Does Isosha cure glaucoma, cataract or myopia?',
    a: 'No, and you should be wary of any product that says it does. Glaucoma, cataract and myopia are distinct medical conditions that require professional assessment and management. Isosha is a herbal wellness supplement containing vitamins A and B2, which contribute to the maintenance of normal vision. It is not a treatment for any disease and nothing on this website should be read as a claim that it is.',
  },
  {
    q: 'Can I take Isosha with my prescribed eye drops?',
    a: 'Do not stop, reduce or replace prescribed eye medication because you have started a supplement. Keep taking exactly what your eye-care professional prescribed, and tell them you are taking Isosha so they have the full picture. If they advise against it, follow their advice.',
  },
  {
    q: 'What is actually in Isosha?',
    a: 'Four botanicals, turmeric (Curcuma longa L.), clove (Syzygium aromaticum), ginger (Zingiber) and black pepper (Piper nigrum L.), together with vitamins A, B2, C and E. The formulation also lists lignans, flavonoids, tannins and iridoid glycosides, which are classes of naturally occurring plant compounds. Quantities are not stated on this website because the manufacturer has not supplied them; the full declaration is on the approved product label.',
  },
  {
    q: 'How soon will I notice something?',
    a: 'This is the question every honest answer disappoints, so here it is. Nutritional support is not a treatment with a timetable. Vitamins A and B2 contribute to maintaining normal vision; they do not restore vision that has already been lost. If you are hoping for a change in a condition you have been diagnosed with, that conversation belongs with your eye-care professional. If you want a daily habit that supports your eye health alongside proper care, that is exactly what Isosha is for.',
  },
  {
    q: 'Is Isosha NAFDAC registered?',
    a: 'The manufacturer has supplied the NAFDAC number A7-102621L, and it is published on this website exactly as supplied. We have not yet independently checked it against the NAFDAC register, so we describe it as pending verification rather than displaying a seal or badge. When the check is complete this page will say so.',
  },
  {
    q: 'How do I take Isosha?',
    a: 'One capsule daily, as provided by the manufacturer. One bottle of 30 capsules therefore covers 30 days. Follow the directions printed on the approved product label, and speak to a healthcare professional if you are unsure whether it suits you.',
  },
  {
    q: 'Who should not take Isosha without asking a doctor first?',
    a: 'Speak to a healthcare professional before taking Isosha if you are on blood-thinning medication such as warfarin, if you are due for surgery, if you are pregnant or breastfeeding, if you are managing diabetes or blood-pressure medication, or if you know you react to turmeric, ginger, clove or black pepper. Turmeric and ginger in particular are worth mentioning to anyone managing your medication.',
  },
  {
    q: 'Do you deliver to my state?',
    a: 'Delivery is arranged across Nigeria, including Lagos, Abuja, Rivers, Oyo, Kano, Enugu, Delta, Kaduna, Anambra and the rest of the 36 states. Contact the seller to confirm coverage, the charge for your location and the expected timeline before you order.',
  },
  {
    q: 'Is Isosha suitable for someone over 60?',
    a: 'Isosha is intended for adults, and interest in eye wellness naturally rises with age. Suitability still depends on the individual, particularly where there is existing medication or a diagnosed condition, so the answer for any specific person comes from their healthcare professional rather than from this page.',
  },
];
