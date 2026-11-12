/**
 * PRICING CONFIGURATION
 * ---------------------
 * The single source of truth for every price on the site.
 * Nothing else in the codebase hardcodes a price.
 *
 * To change a price: edit `price` below. Savings, per-bottle figures and the
 * order summary all recalculate from these numbers automatically.
 */

export const currency = {
  code: 'NGN',
  symbol: '₦',
};

/** Reference price of one bottle bought on its own. Savings are measured against this. */
export const singleBottlePrice = 21500;

export const packages = [
  {
    id: 'essential',
    title: 'Essential Pack',
    bottles: 1,
    price: 21500,
    featured: false,
    accent: false,
    badge: null,
    cta: 'Choose 1 Bottle',
    blurb: 'A single bottle, for a first order.',
  },
  {
    id: 'double',
    title: 'Double Pack',
    bottles: 2,
    price: 40000,
    featured: false,
    accent: true,
    badge: null,
    cta: 'Choose 2 Bottles',
    blurb: 'Two bottles at a lower price per bottle.',
  },
  {
    id: 'best-value',
    title: 'Best Value Pack',
    bottles: 3,
    price: 55000,
    featured: true,
    accent: true,
    badge: 'BEST VALUE',
    cta: 'Choose 3 Bottles',
    blurb: 'Three bottles, the lowest price per bottle.',
  },
];

/**
 * Quantity in the order form multiplies a whole package.
 * Two "Double Packs" cost exactly 2 x the Double Pack price. Bundle discounts
 * are never stacked or recombined into a price the client has not approved.
 */
export const maxQuantity = 5;

export const formatPrice = (value) =>
  `${currency.symbol}${Number(value).toLocaleString('en-NG')}`;

export const getPackage = (id) => packages.find((p) => p.id === id) ?? packages[0];

/** Derived figures. These are arithmetic, not a medical recommendation. */
export const packageMath = (pkg, capsulesPerBottle = 30, capsulesPerDay = 1) => {
  const capsules = pkg.bottles * capsulesPerBottle;
  const days = capsules / capsulesPerDay;
  const perBottle = Math.round(pkg.price / pkg.bottles);
  const savings = pkg.bottles * singleBottlePrice - pkg.price;
  return { capsules, days, perBottle, savings };
};
