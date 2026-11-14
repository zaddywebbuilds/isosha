/**
 * INGREDIENTS CONFIGURATION
 * -------------------------
 * Only the ingredient names supplied by the client appear here.
 * No quantities, percentages or strengths are stated anywhere, because none
 * have been supplied. Descriptions say what the plant or compound class is.
 * They never attribute a health outcome to the ingredient as used in this
 * product.
 *
 * `photography` on each entry says what its image actually shows:
 *
 *   'ingredient'   A photograph of the botanical named on the card.
 *   'illustrative' A photograph of plants commonly associated with that
 *                  class of compound. It is NOT a photograph of the source
 *                  material used in Isosha, and the site says so in the
 *                  section itself, not only in this comment.
 */

export const botanicals = [
  {
    id: 'turmeric',
    image: 'turmeric',
    photography: 'ingredient',
    botanicalName: 'Curcuma longa L.',
    commonName: 'Turmeric',
    description:
      'Turmeric is the rhizome of Curcuma longa, a plant in the ginger family. Its deep orange root has been used in cooking and traditional preparations across West Africa and Asia for centuries.',
    confirmed: true,
  },
  {
    id: 'clove',
    image: 'clove',
    photography: 'ingredient',
    botanicalName: 'Syzygium aromaticum',
    commonName: 'Clove',
    description:
      'Clove is the dried flower bud of Syzygium aromaticum, an evergreen tree. The buds are picked before they open and dried whole, which is what gives them their familiar aroma.',
    confirmed: true,
  },
  {
    id: 'ginger',
    image: 'ginger',
    photography: 'ingredient',
    botanicalName: 'Zingiber',
    commonName: 'Ginger',
    description:
      'Ginger is the rhizome of a plant in the genus Zingiber. The root is lifted, washed and dried, and has been used in West African cooking and traditional preparations for generations.',
    confirmed: true,
  },
  {
    id: 'black-pepper',
    image: 'black-pepper',
    photography: 'ingredient',
    botanicalName: 'Piper nigrum L.',
    commonName: 'Black Pepper',
    description:
      'Black pepper is the dried unripe fruit of the Piper nigrum vine. The dried corns carry the plant compound piperine, which gives pepper its characteristic sharpness.',
    confirmed: true,
  },
];

/**
 * Vitamin descriptions are general nutrition facts about the vitamin, drawn
 * from standard nutritional references. They are deliberately NOT phrased as
 * outcomes this product delivers, and no vitamin is given an image.
 */
export const vitamins = [
  {
    id: 'vitamin-a',
    name: 'Vitamin A',
    role: 'Normal vision',
    description:
      'An essential nutrient that contributes to the maintenance of normal vision and to the normal function of the immune system.',
  },
  {
    id: 'vitamin-b2',
    name: 'Vitamin B2',
    role: 'Riboflavin',
    description:
      'A B-group vitamin that contributes to the maintenance of normal vision and to normal energy-yielding metabolism.',
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C',
    role: 'Antioxidant nutrient',
    description:
      'A water-soluble vitamin that contributes to the protection of cells from oxidative stress and to normal collagen formation.',
  },
  {
    id: 'vitamin-e',
    name: 'Vitamin E',
    role: 'Antioxidant nutrient',
    description:
      'A fat-soluble nutrient that contributes to the protection of cells from oxidative stress.',
  },
];

/**
 * Listed formulation components.
 *
 * These are classes of naturally occurring plant compounds, not individual
 * plants. Each image shows plants that are well known sources of that class
 * in general. None of them is a photograph of the source material used in
 * Isosha, and the section states that plainly on the page.
 */
export const compounds = [
  {
    id: 'lignans',
    image: 'lignans',
    photography: 'illustrative',
    name: 'Lignans',
    shows: 'Flaxseed and sesame seed',
    note: 'A class of plant compounds found in the seeds, grains and woody tissue of many plants.',
  },
  {
    id: 'flavonoids',
    image: 'flavonoids',
    photography: 'illustrative',
    name: 'Flavonoids',
    shows: 'Citrus fruit and berries',
    note: 'A large family of plant compounds responsible for much of the colour in fruits, vegetables and flowers.',
  },
  {
    id: 'tannins',
    image: 'tannins',
    photography: 'illustrative',
    name: 'Tannins',
    shows: 'Tea leaf, grape and bark',
    note: 'Plant polyphenols found in tea, grape skins, bark and many other botanical materials.',
  },
  {
    id: 'iridoid-glycosides',
    image: 'iridoid-glycosides',
    photography: 'illustrative',
    name: 'Iridoid Glycosides',
    shows: 'Gardenia, honeysuckle, noni and goji',
    note: 'A class of plant compounds occurring across several botanical families, among them Rubiaceae and Caprifoliaceae.',
  },
];

/**
 * Note on the compound photographs: each card carries a "Shown:" line naming
 * exactly what is in its picture, which is what keeps a photograph of
 * flaxseed from reading as an Isosha ingredient. Keep that line on the card.
 */
