/**
 * LEGAL PAGE DRAFTS
 * -----------------
 * These are DRAFTS for the client's own review. They are written in plain
 * language to give Netwill Herbals a starting point, and they are labelled as
 * drafts wherever they appear on the site.
 *
 * They are not legal advice and they do not establish compliance with the
 * Nigeria Data Protection Act or any other law. Netwill Herbals should have
 * them reviewed by a qualified adviser, fill in the bracketed blanks, and then
 * set `draft: false` on each document to remove the draft notice.
 *
 * Every paragraph that needs a client decision is wrapped in [SQUARE BRACKETS].
 */

export const legalDocuments = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    draft: true,
    sections: [
      {
        heading: 'Who we are',
        body: 'This website presents product information for Isosha Herbal Capsules, a product of Netwill Herbals. [Insert the full legal entity name, registered address and, where one has been appointed, the contact details of the person responsible for data protection enquiries.]',
      },
      {
        heading: 'What we collect',
        body: 'When you place an order we collect your name, phone number, WhatsApp number, delivery state, delivery address, the package you selected, and your answer to the question about your eye condition. That last answer is health information, which is sensitive personal data under the Nigeria Data Protection Act. We collect it only because you chose to give it when ordering, we use it to handle your order and answer your questions, and it is never a diagnosis.',
      },
      {
        heading: 'Why we collect it',
        body: 'We use your details to contact you about the order you placed, to confirm the delivery charge for your location, and to arrange delivery. [Confirm whether Netwill Herbals also uses these details for marketing, including follow-up on orders that were started but not completed. The cart-abandonment script described below exists for exactly that, so this must be answered before launch, and a separate opt-in is likely required.]',
      },
      {
        heading: 'Where it goes',
        body: 'Your order is submitted directly to Netwill Herbals’ customer management system, hosted by Xurge CRM at netwillherbal.xurgecrm.com, where the order record is created and stored. [Confirm where Xurge stores this data, for how long, and under what agreement with Netwill Herbals. Name any courier or delivery partner that receives a customer address in order to deliver an order.]',
      },
      {
        heading: 'Your answer about your eye condition',
        body: 'The order form asks which of glaucoma, cataract, myopia or diabetic retinopathy applies to you. Answering is required to complete the order through our system. We treat that answer as sensitive personal data: it is used to handle your order and to answer your questions, it is not a diagnosis, and no one at Netwill Herbals is in a position to give you medical advice about it. [Confirm who inside the business can see this field, and whether it may be used for anything beyond handling the order. If it is used to target marketing, that requires its own explicit consent.]',
      },
      {
        heading: 'How long we keep it',
        body: '[State the retention period, for example: order enquiry records are kept for 24 months and then deleted.]',
      },
      {
        heading: 'Your rights',
        body: 'You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. Contact us using the details in the footer of this website and we will respond. [Confirm the response time Netwill Herbals commits to.]',
      },
      {
        heading: 'Cookies and tracking',
        body: 'This website loads two scripts from Xurge CRM, the system that receives orders. One records clicks on the page. The other watches the order form and reports orders that were started but not completed, so that the team can follow them up. Both observe what you do on this page and may set identifiers in your browser. Fonts are served from this site and there is no advertising pixel or general analytics tool. [Confirm what the Xurge scripts store, for how long, and whether Nigerian or other data-protection rules require a consent banner before they load. If an advertising pixel is added later, this section must be updated before that goes live.]',
      },
    ],
  },
  {
    id: 'terms',
    title: 'Terms and Conditions',
    draft: true,
    sections: [
      {
        heading: 'About this website',
        body: 'This website provides product information for Isosha Herbal Capsules and allows you to send an order enquiry. Submitting the enquiry form does not create a binding order. An order exists once Netwill Herbals has made contact and both sides have confirmed the items, the total payable and the delivery arrangement.',
      },
      {
        heading: 'Prices',
        body: 'Prices shown on this website are in Nigerian naira and are for the product only. They do not include delivery. Delivery charges depend on location and are confirmed before dispatch. [Confirm how long a quoted price is held and whether prices may change without notice.]',
      },
      {
        heading: 'Payment',
        body: '[State the accepted payment methods and when payment is due. Do not list a payment method until it is actually in place.]',
      },
      {
        heading: 'Delivery',
        body: '[State the delivery areas covered, the typical delivery times and who the delivery partners are.]',
      },
      {
        heading: 'Accuracy of information',
        body: 'We take care to describe the product accurately. Where this website and the approved product label differ, the approved product label is correct. Product packaging and specifications may be updated by the manufacturer.',
      },
      {
        heading: 'Governing law',
        body: '[Confirm that these terms are governed by the laws of the Federal Republic of Nigeria, and name the forum for disputes.]',
      },
    ],
  },
  {
    id: 'refunds',
    title: 'Refund and Returns Policy',
    draft: true,
    sections: [
      {
        heading: 'This policy needs a decision from Netwill Herbals',
        body: 'No refund or return promise has been made on this website, because Netwill Herbals has not yet set one. Nothing here should be read as a guarantee until this policy is completed.',
      },
      {
        heading: 'Damaged or incorrect items',
        body: '[State what a customer should do if a package arrives damaged, opened or containing the wrong item, how long they have to report it, and what Netwill Herbals will do in response.]',
      },
      {
        heading: 'Change of mind',
        body: '[State whether an unopened, unused bottle can be returned, within what period, and who pays the return delivery cost. Supplements are often non-returnable once opened, for safety reasons. Confirm the position.]',
      },
      {
        heading: 'How to make a claim',
        body: '[Give the contact route for a refund or return claim and the information the customer should have ready, such as an order reference and the batch number on the bottle.]',
      },
    ],
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    draft: false,
    sections: [
      {
        heading: 'Not medical advice',
        body: 'The information on this website is general product and health information. It is not medical advice and it is not a diagnosis. Always consult a qualified healthcare or eye-care professional about your eyes, your health and any medication you are taking.',
      },
      {
        heading: 'Not a substitute for treatment',
        body: 'Isosha Herbal Capsules is a herbal wellness supplement. It is not a replacement for prescribed eye drops, for cataract surgery, for prescription glasses or for any other treatment a professional has recommended. Do not stop, reduce or change prescribed treatment without speaking to the professional who prescribed it.',
      },
      {
        heading: 'No disease claims',
        body: 'Nothing on this website should be read as a claim that Isosha diagnoses, treats, cures or prevents glaucoma, cataracts, myopia or any other disease. Those are distinct medical conditions that require professional assessment and management.',
      },
      {
        heading: 'Individual circumstances',
        body: 'Supplements affect individuals differently. Suitability depends on your own circumstances, including any existing condition, any medication you take, pregnancy or breastfeeding, and any known sensitivity to the ingredients.',
      },
      {
        heading: 'Report a problem',
        body: 'If you experience an unexpected reaction after taking a herbal product, stop taking it and speak to a healthcare professional. Adverse reactions to regulated products in Nigeria can also be reported to NAFDAC.',
      },
    ],
  },
];
