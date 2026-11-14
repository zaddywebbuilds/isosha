import { useEffect, useRef } from 'react';
import { legalDocuments } from '../config/legal.js';
import { Icon, Pending } from './ui.jsx';

/**
 * Legal documents open in a dialog rather than a separate page, so the site
 * stays a single deployable page with no broken links. If the client later
 * wants real URLs (/privacy, /terms) these same section arrays can be
 * rendered by a router without rewriting the content.
 */
export default function LegalDialog({ openId, onClose }) {
  const doc = legalDocuments.find((d) => d.id === openId);
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!doc) return;

    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      // Keep focus inside the dialog.
      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [doc, onClose]);

  if (!doc) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-forest-deep/70 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[85vh] flex flex-col bg-cream rounded-t-[1.5rem] sm:rounded-[1.5rem] shadow-2xl"
      >
        <div className="flex items-start justify-between gap-5 p-6 sm:p-7 border-b border-forest/10">
          <div>
            <h2 id="legal-title" className="text-[1.7rem] text-forest">
              {doc.title}
            </h2>
            {doc.draft && (
              <p className="mt-2.5">
                <Pending>Draft for client review</Pending>
              </p>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid place-items-center w-10 h-10 shrink-0 rounded-full border border-forest/20 text-forest hover:bg-leaf-wash transition-colors"
            aria-label={`Close ${doc.title}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-7">
          {doc.draft && (
            <p className="flex items-start gap-2.5 rounded-xl border border-dashed border-gold-deep bg-[#fdf8e3] p-4 mb-6 text-[0.83rem] text-[#5b4a05] leading-relaxed">
              <Icon name="doc" className="w-4 h-4 mt-0.5 shrink-0" />
              This is a working draft prepared for Netwill Herbals to review
              with a qualified adviser. Text in square brackets marks a decision
              the business still needs to make. It is not legal advice and it
              does not by itself establish compliance with any law.
            </p>
          )}

          {doc.sections.map((section) => (
            <section key={section.heading} className="mb-6 last:mb-0">
              <h3 className="font-sans font-bold text-[1.08rem] text-forest">
                {section.heading}
              </h3>
              <p className="mt-2 text-[0.98rem] text-ink-soft leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
