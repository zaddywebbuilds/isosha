import { useEffect } from 'react';
import { brand, product } from '../config/product.js';
import { packages, currency, formatPrice } from '../config/pricing.js';
import { seo } from '../config/site.js';
import { faqs } from '../config/faqs.js';

/**
 * Injects Product structured data built from the same config the page renders.
 *
 * Deliberately excluded: aggregateRating, review, and any health or medical
 * property. None of those has been verified, and fabricating them would be
 * both dishonest and a search-engine policy violation.
 */
export function useStructuredData() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      brand: { '@type': 'Brand', name: brand.name },
      category: product.category,
      description: seo.description,
      image: [seo.ogImage],
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Capsules per bottle',
          value: String(product.capsulesPerBottle),
        },
        { '@type': 'PropertyValue', name: 'Form', value: product.form },
      ],
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: currency.code,
        lowPrice: Math.min(...packages.map((p) => p.price)),
        highPrice: Math.max(...packages.map((p) => p.price)),
        offerCount: packages.length,
        availability: 'https://schema.org/InStock',
        offers: packages.map((p) => ({
          '@type': 'Offer',
          name: `${p.title} (${p.bottles} bottle${p.bottles > 1 ? 's' : ''})`,
          price: p.price,
          priceCurrency: currency.code,
          description: `${p.bottles * product.capsulesPerBottle} capsules, ${formatPrice(p.price)}`,
        })),
      },
    };

    if (seo.canonical) data.url = seo.canonical;

    /**
     * FAQPage markup, built from the same array the accordion renders, so the
     * answers in search results can never drift from the answers on the page.
     * This is the single biggest organic-search lever here: these questions
     * are the ones Nigerian buyers actually type.
     */
    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    };

    const tags = [data, faqData].map((payload, i) => {
      const tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.textContent = JSON.stringify(payload);
      tag.dataset.generated = i === 0 ? 'isosha-product' : 'isosha-faq';
      document.head.appendChild(tag);
      return tag;
    });

    return () => tags.forEach((tag) => tag.remove());
  }, []);
}
