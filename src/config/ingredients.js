/**
 * INGREDIENTS CONFIGURATION
 * -------------------------
 * Only the ingredient names supplied by the client appear here.
 * No quantities, percentages or strengths are stated anywhere, because none
 * have been supplied. Descriptions are botanical and factual. They do not
 * attribute a health outcome to the ingredient as used in this product.
 */

export const botanicals = [
  {
    id: 'turmeric',
    botanicalName: 'Curcuma longa L.',
    commonName: 'Turmeric',
    description:
      'Turmeric is a botanical ingredient obtained from the rhizome of Curcuma longa, a plant in the ginger family long used in cooking and traditional preparations across West Africa and Asia.',
    confirmed: true,
  },
  {
    id: 'clove',
    botanicalName: 'Syzygium aromaticum',
    commonName: 'Clove',
    description:
      'Clove comes from the dried flower buds of Syzygium aromaticum, an aromatic botanical recognised for its distinctive plant compounds.',
    confirmed: true,
  },
  {
    id: 'zingiber',
    botanicalName: 'Zingiber',
    commonName: 'Commonly associated with ginger',
    description:
      'The ingredient declaration supplied by the manufacturer reads "Zingiber". Zingiber is a plant genus. The full botanical name is awaited from Netwill Herbals before the species is stated here.',
    confirmed: false,
    pendingNote: 'Full botanical name pending confirmation',
  },
  {
    id: 'black-pepper',
    botanicalName: 'Piper nigrum L.',
    commonName: 'Black pepper',
    description:
      'Black pepper is obtained from the dried fruit of Piper nigrum and carries naturally occurring plant compounds including piperine.',
    confirmed: true,
  },
];

/**
 * Vitamin descriptions below are general nutrition facts about the vitamin,
 * drawn from standard nutritional references. They are deliberately NOT
 * phrased as outcomes this product delivers.
 */
export const vitamins = [
  {
    id: 'vitamin-a',
    name: 'Vitamin A',
    role: 'Normal vision',
    description:
      'Vitamin A is an essential nutrient. It contributes to the maintenance of normal vision and to the normal function of the immune system.',
  },
  {
    id: 'vitamin-b2',
    name: 'Vitamin B2',
    role: 'Riboflavin',
    description:
      'Riboflavin is a B-group vitamin. It contributes to the maintenance of normal vision and to normal energy-yielding metabolism.',
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C',
    role: 'Antioxidant nutrient',
    description:
      'Vitamin C is a water-soluble vitamin. It contributes to the protection of cells from oxidative stress and to normal collagen formation.',
  },
  {
    id: 'vitamin-e',
    name: 'Vitamin E',
    role: 'Antioxidant nutrient',
    description:
      'Vitamin E is a fat-soluble nutrient that contributes to the protection of cells from oxidative stress.',
  },
];

/**
 * Listed formulation components. These are classes of plant compounds rather
 * than dosed declarations, so they are presented as listed components only.
 */
export const compounds = [
  {
    name: 'Lignan',
    note: 'A class of plant compounds found in a range of seeds and botanicals.',
  },
  {
    name: 'Flavonoids',
    note: 'A large group of plant compounds widely present in fruits, vegetables and herbs.',
  },
  {
    name: 'Tannins',
    note: 'Naturally occurring plant polyphenols found in many botanical materials.',
  },
  {
    name: 'Iridoid glycosides',
    note: 'A class of plant compounds occurring in several botanical families.',
  },
];

export const quantitiesNote =
  'Ingredient quantities have not been supplied by the manufacturer and are therefore not stated. The full quantitative declaration appears on the approved product label.';
