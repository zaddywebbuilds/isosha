import { useEffect } from 'react';
import { seo, siteUrl, absoluteUrl } from '../config/site.js';

/**
 * Keeps the canonical link and the social-preview tags absolute.
 *
 * Relative og:image and twitter:image paths are silently ignored by the
 * Facebook, WhatsApp and X scrapers, which is why a shared link can come out
 * with no picture. These are rewritten to absolute URLs from `siteUrl`, so
 * changing that one constant moves the whole site to a new domain.
 *
 * The static tags in index.html stay as they are: they carry the text that a
 * non-JavaScript crawler reads. This only upgrades the URLs.
 */
export function useSeoHead() {
  useEffect(() => {
    const ogImage = absoluteUrl(seo.ogImage);
    const pageUrl = seo.canonical || `${siteUrl}/`;

    const setMeta = (selector, attr, value) => {
      let tag = document.head.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? [];
        if (key && name) tag.setAttribute(key, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute(attr, value);
      return tag;
    };

    // Canonical
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;

    setMeta('meta[property="og:url"]', 'content', pageUrl);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:image:alt"]', 'content', seo.ogImageAlt);
    setMeta('meta[property="og:image:width"]', 'content', '1200');
    setMeta('meta[property="og:image:height"]', 'content', '1313');
    setMeta('meta[name="twitter:image"]', 'content', ogImage);
    setMeta('meta[name="twitter:image:alt"]', 'content', seo.ogImageAlt);
  }, []);
}
