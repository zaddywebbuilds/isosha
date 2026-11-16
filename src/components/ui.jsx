/**
 * Small shared presentation pieces used across sections.
 */

export function Eyebrow({ children, tone = 'leaf', className = '' }) {
  const tones = {
    leaf: 'text-leaf',
    gold: 'text-gold',
    forest: 'text-forest-line',
    muted: 'text-ink-soft',
  };
  return (
    <p className={`eyebrow ${tones[tone]} ${className}`}>
      <span className="inline-block w-6 h-px align-middle mr-2 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function GoldRule({ className = '' }) {
  return <div className={`rule-gold ${className}`} aria-hidden="true" />;
}

export function Pending({ children = 'Pending client confirmation' }) {
  return <span className="pending-chip">{children}</span>;
}

/**
 * A responsive <picture>-free image. `image` objects come from
 * src/config/site.js and already carry srcSet, dimensions and alt text.
 */
export function Img({ image, sizes, className = '', loading = 'lazy', priority = false }) {
  // React 18 passes unknown attributes through verbatim, so `fetchpriority`
  // is written in lowercase to match the HTML attribute name.
  const priorityAttrs = priority ? { fetchpriority: 'high' } : {};
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      className={className}
      loading={priority ? 'eager' : loading}
      decoding={priority ? 'sync' : 'async'}
      {...priorityAttrs}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Line icons. Stroke-only, so they inherit the surrounding colour.    */
/* ------------------------------------------------------------------ */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

export function Icon({ name, className = 'w-6 h-6' }) {
  const paths = {
    capsule: (
      <>
        <path d="M8.5 3.5a4.5 4.5 0 0 1 6.4 6.3l-5.1 5.1a4.5 4.5 0 0 1-6.4-6.3z" />
        <path d="M6.2 5.8l6.4 6.4" />
      </>
    ),
    leaf: (
      <>
        <path d="M4 20c0-8 5-13 16-13 0 9-5 13-11 13-2.5 0-5-1-5 0z" />
        <path d="M5 19c3-5 7-8 11-9.5" />
      </>
    ),
    vitamin: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5v9M7.5 12h9" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    lens: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8 9.5c1.5-1.5 4-2 6 0" />
        <path d="M7.5 13c2-1 5.5-1 8 1" />
      </>
    ),
    focus: (
      <>
        <path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3l7 2.8v5.3c0 4.3-2.9 8.2-7 9.4-4.1-1.2-7-5.1-7-9.4V5.8z" />
        <path d="M9.2 12.1l2 2 3.6-3.8" />
      </>
    ),
    truck: (
      <>
        <path d="M2.5 6.5h11v8h-11z" />
        <path d="M13.5 9.5h3.6l2.4 2.7v2.3h-6z" />
        <circle cx="6.5" cy="17" r="1.8" />
        <circle cx="16.5" cy="17" r="1.8" />
      </>
    ),
    doc: (
      <>
        <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5z" />
        <path d="M14 3v4.5h4.5M8.5 12.5h7M8.5 16h5" />
      </>
    ),
    chat: (
      <>
        <path d="M21 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.4-5A7.5 7.5 0 1 1 21 11.5z" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="2.8" width="6" height="11" rx="3" />
        <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
        <path d="M12 18v3.2M9 21.2h6" />
      </>
    ),
    plus: <path d="M12 5.5v13M5.5 12h13" />,
    arrow: <path d="M5 12h13M13 6.5l5.5 5.5L13 17.5" />,
    check: <path d="M5 12.5l4.5 4.5L19 7" />,
    whatsapp: (
      <>
        <path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.5L3.5 20.5l1.5-4.6A8.4 8.4 0 1 1 20.5 11.6z" />
        <path d="M8.9 8.3c.3-.1.7 0 .9.4l.7 1.3c.1.3.1.6-.1.8l-.4.5c-.1.2-.2.4 0 .7a6 6 0 0 0 2.5 2.4c.3.1.5.1.7-.1l.5-.5c.2-.2.5-.2.8-.1l1.3.7c.4.2.5.6.4.9-.3.8-1.1 1.3-2 1.2-2.9-.3-5.9-3.3-6.2-6.2-.1-.9.3-1.7 1.2-2z" />
      </>
    ),
    facebook: <path d="M14.5 21v-7.5h2.5l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5H17.7V4.4A21 21 0 0 0 15.3 4.3c-2.4 0-4 1.5-4 4.2v2H8.8v3h2.5V21z" />,
    instagram: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17" cy="7" r="0.8" fill="currentColor" />
      </>
    ),
    tiktok: (
      <>
        <path d="M14.5 3.5v10.9a3.6 3.6 0 1 1-3.1-3.6" />
        <path d="M14.5 6.2A4.6 4.6 0 0 0 19 9.3" />
      </>
    ),
    phone: <path d="M7 3.5h2.5l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5V17a3.5 3.5 0 0 1-3.5 3.5A14.5 14.5 0 0 1 3.5 7 3.5 3.5 0 0 1 7 3.5z" />,
    mail: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2" />
        <path d="M3.8 6.8l8.2 6 8.2-6" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-5.6 7-10.5a7 7 0 1 0-14 0C5 15.4 12 21 12 21z" />
        <circle cx="12" cy="10.5" r="2.6" />
      </>
    ),
  };

  return (
    <svg {...iconProps} className={className}>
      {paths[name] ?? paths.leaf}
    </svg>
  );
}
