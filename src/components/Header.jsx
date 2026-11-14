import { useEffect, useRef, useState } from 'react';
import { brand } from '../config/product.js';
import { navLinks } from '../config/site.js';
import { Icon } from './ui.jsx';

function Logo({ compact = false }) {
  return (
    <a
      href="#top"
      className="flex min-h-11 items-center gap-2.5 min-[400px]:gap-3 shrink-0"
      aria-label={`${brand.name} home`}
    >
      <span
        className="grid place-items-center w-9 h-9 min-[400px]:w-10 min-[400px]:h-10 shrink-0 rounded-full border border-gold/60 bg-forest-deep"
        aria-hidden="true"
      >
        <svg viewBox="0 0 64 64" className="w-6 h-6">
          <path
            d="M32 46c-8-4-13-9-13-16 0-6 5-11 13-14 8 3 13 8 13 14 0 7-5 12-13 16z"
            fill="#60B609"
          />
          <path d="M32 16v30" stroke="#003B17" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M32 27l7-5M32 35l-7-5M32 41l7-5"
            stroke="#003B17"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-serif text-[1.05rem] min-[400px]:text-lg text-white">
          Netwill
        </span>
        <span className="block eyebrow text-[0.7rem] min-[400px]:text-[0.76rem] text-gold mt-0.5">
          Herbals
        </span>
      </span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'bg-forest shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]'
          : 'bg-forest/95'
      }`}
    >
      <div className="shell flex items-center justify-between gap-4 h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[1.06rem] text-white/90 hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/*
            The header row is logo + this button + the menu toggle. At the
            larger body size that overflowed a 320px screen, so the button
            steps down below 400px rather than letting the row scroll.
          */}
          <a
            href="#order"
            className="btn btn-gold !min-h-11 !px-3.5 !text-[0.95rem] min-[400px]:!px-5 min-[400px]:!text-[1.06rem] shrink-0"
          >
            Order Now
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="lg:hidden grid place-items-center w-11 h-11 shrink-0 rounded-full border border-white/25 text-white"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="lg:hidden border-t border-white/10 bg-forest"
      >
        <nav aria-label="Main, mobile" className="shell py-4">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3.5 text-white/92 border-b border-white/10 hover:text-gold transition-colors"
                >
                  {link.label}
                  <Icon name="arrow" className="w-4 h-4 text-gold/70" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
