/**
 * PRODUCT CONFIGURATION
 * ---------------------
 * Confirmed product facts supplied by the client.
 * Anything not confirmed is marked `pending: true` and is rendered on the page
 * as a visible placeholder rather than invented text.
 */

export const brand = {
  name: 'Netwill Herbals',
  productName: 'Isosha',
  productFullName: 'Isosha Herbal Capsules',
  tagline: 'Herbal eye-wellness supplement',
};

export const product = {
  name: 'Isosha Herbal Capsules',
  category: 'Herbal wellness supplement',
  form: 'Capsules',
  capsulesPerBottle: 30,
  dosage: '1 capsule daily',
  dosageNote: 'Dosage as provided by the manufacturer.',
  daysPerBottle: 30, // capsulesPerBottle / capsules per day
  market: 'Nigeria',
  audience: 'Adults aged 30 and above',
};

/**
 * The four strip items under the hero.
 */
export const highlights = [
  { label: '30 Capsules', detail: 'Per bottle' },
  { label: 'Botanical Ingredients', detail: 'Turmeric, clove, pepper' },
  { label: 'Vitamins A, B2, C & E', detail: 'Included in the formulation' },
  { label: 'One Capsule Daily', detail: 'As directed by the manufacturer' },
];

/**
 * Expandable product-information panels.
 * `pending: true` renders the placeholder state. Replace `body` with the
 * client's verified wording and set `pending: false` to publish it.
 */
export const productInfoPanels = [
  {
    id: 'directions',
    title: 'Full directions for use',
    pending: true,
    body: 'The manufacturer has supplied a dosage of one capsule daily. Full directions for use, including timing and whether the capsule should be taken with food, are to be supplied by Netwill Herbals and will be reproduced here exactly as they appear on the approved product label.',
  },
  {
    id: 'warnings',
    title: 'Warnings and precautions',
    pending: true,
    body: 'Warnings, precautions, contraindications and interaction information are to be supplied by Netwill Herbals from the approved product label. No warning text has been written here, because safety information must not be drafted on the manufacturer’s behalf.',
  },
  {
    id: 'storage',
    title: 'Storage information',
    pending: true,
    body: 'Storage conditions and shelf life are to be supplied by Netwill Herbals from the approved product label.',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer information',
    pending: true,
    body: 'Manufacturer name, full address, batch identification and the manufacturing licence details are to be supplied by Netwill Herbals.',
  },
];
