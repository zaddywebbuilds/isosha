/**
 * ORDER FORM INTEGRATION: XURGE CRM
 * =================================
 * The order form posts natively to Netwill Herbals' Xurge CRM. This is a
 * real, live endpoint: a completed form creates a real order record.
 *
 * WHY A NATIVE FORM POST AND NOT fetch()
 * --------------------------------------
 * The endpoint is on another origin and does not send CORS headers, so a
 * fetch() or XHR POST would be blocked by the browser and orders would
 * silently fail. A native <form method="POST" action="..."> is exempt from
 * CORS, which is how these CRM snippets are designed to be used. The cost is
 * that the browser navigates to the CRM's own response page on submit, which
 * is the normal behaviour for this CRM and where the customer sees their
 * confirmation.
 *
 * FIELD NAMES ARE FIXED BY THE CRM
 * --------------------------------
 * Every `name` below must match the CRM's expected field exactly. Renaming
 * one does not cause a visible error; it quietly drops that value from the
 * order. Do not rename them to match the site's own naming.
 */

export const crm = {
  /** Where the order goes. Supplied by Netwill Herbals. */
  endpoint: 'https://netwillherbal.xurgecrm.com/orders/webhook/',

  /** Hidden fields the CRM uses to route and attribute the order. */
  formId: '14',
  schemaName: 'netwillherbal',
  mediaBuyerId: '5',

  /**
   * The CRM's own scripts, loaded from index.html.
   * `click_control.js` is click tracking. `cart_abandonment.js` watches the
   * form and reports partially completed orders so the team can follow up.
   * Both are third-party and both observe what a visitor types, which is why
   * the privacy policy had to change: the site is no longer tracker-free.
   */
  scripts: [
    'https://xurgecrm.com/static/js/click_control.js',
    'https://xurgecrm.com/static/js/cart_abandonment.js',
  ],

  /** The CRM field name for the eye-condition question. */
  conditionField: 'variation_4',
  conditionLabel: "What's Your Eye Condition",

  /**
   * Values must match the CRM's options exactly, including spelling and case.
   * "Diabetic retinopathy" is lower-case r in the CRM.
   */
  conditions: ['Glaucoma', 'Cataract', 'Myopia', 'Diabetic retinopathy'],

  /** The CRM's submit wording, kept verbatim. It is the client's copy. */
  submitLabel: 'I Am Cash Ready, Place My Order',
};

/**
 * The state list is the CRM's own, not a general list of Nigerian states.
 * The CRM uses "FCT" rather than "Federal Capital Territory"; sending the
 * long form would not match its options.
 */
export const crmStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];
