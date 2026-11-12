/**
 * Botanical marks for the ingredient cards.
 *
 * These are drawn illustrations in the Isosha palette rather than stock
 * photography. The brief rules out unrelated ingredient photography, and no
 * licensed turmeric / clove / pepper photographs were supplied with the
 * project. If the client later supplies real macro photography, swap each
 * mark for an <Img> and keep the same card layout.
 */

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function BotanicalMark({ id, className = 'w-full h-full' }) {
  const marks = {
    turmeric: (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <g {...common} className="text-gold-deep">
          {/* rhizome */}
          <path d="M26 74c-6-10-2-22 8-26 7-3 12 1 16-4 5-6 15-6 20 1 4 6 1 12 5 16 6 5 7 15 1 20-7 6-17 2-23 5-8 4-21 0-27-12z" />
          <path d="M44 48c2 5 1 9-2 13M62 45c3 5 2 11-2 15M70 70c-5 2-10 1-13-2" />
        </g>
        {/* sliced pieces */}
        <g className="text-gold">
          <circle cx="88" cy="88" r="13" fill="currentColor" opacity="0.9" />
          <circle cx="88" cy="88" r="13" {...common} className="text-gold-deep" />
          <circle cx="88" cy="88" r="7" {...common} className="text-gold-deep" opacity="0.7" />
          <circle cx="66" cy="98" r="9" fill="currentColor" opacity="0.75" />
          <circle cx="66" cy="98" r="9" {...common} className="text-gold-deep" />
        </g>
        {/* leaf */}
        <path
          d="M30 36c-4-12 4-24 16-26 2 13-5 23-16 26z"
          {...common}
          className="text-leaf"
          fill="currentColor"
          fillOpacity="0.18"
        />
      </svg>
    ),
    clove: (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <g {...common} className="text-forest-mid">
          {/* three clove buds */}
          <g>
            <path d="M40 92V54" strokeWidth="4" />
            <path d="M33 54c0-7 3-12 7-12s7 5 7 12c0 4-3 6-7 6s-7-2-7-6z" />
            <path d="M34 48l-7-5M46 48l7-5M40 44v-8" />
          </g>
          <g opacity="0.85">
            <path d="M66 98V66" strokeWidth="4" />
            <path d="M60 66c0-6 2.5-10 6-10s6 4 6 10c0 3.5-2.5 5-6 5s-6-1.5-6-5z" />
            <path d="M61 61l-6-4M71 61l6-4M66 57v-7" />
          </g>
          <g opacity="0.7">
            <path d="M88 86V62" strokeWidth="3.5" />
            <path d="M83 62c0-5 2-9 5-9s5 4 5 9c0 3-2 4.5-5 4.5s-5-1.5-5-4.5z" />
            <path d="M84 58l-5-3.5M92 58l5-3.5M88 54.5v-6" />
          </g>
        </g>
        <path
          d="M22 80c-6-11 0-24 12-27 2 14-3 24-12 27z"
          {...common}
          className="text-leaf"
          fill="currentColor"
          fillOpacity="0.16"
        />
      </svg>
    ),
    zingiber: (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <g {...common} className="text-gold-deep">
          <path d="M28 80c-8-9-6-23 4-28 7-4 13 1 17-4 5-6 16-7 21 0 4 6 0 13 4 17 7 6 6 17-2 21-8 4-16-1-22 2-8 4-16 0-22-8z" />
          <path d="M48 46c2 6 1 11-3 15M68 48c3 6 1 12-3 15M74 76c-5 2-11 1-14-3" />
          <path d="M40 60c3-2 7-2 10 0" opacity="0.6" />
        </g>
        <g className="text-leaf">
          <path
            d="M86 44c0-14 10-26 24-28-1 16-10 26-24 28z"
            {...common}
            fill="currentColor"
            fillOpacity="0.18"
          />
          <path d="M88 42c6-8 12-14 20-18" {...common} opacity="0.7" />
        </g>
      </svg>
    ),
    'black-pepper': (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <g className="text-forest">
          {[
            [44, 56, 15],
            [74, 48, 12],
            [62, 80, 14],
            [90, 74, 10],
            [34, 86, 9],
          ].map(([cx, cy, r], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill="currentColor" opacity={0.9 - i * 0.1} />
              <path
                d={`M${cx - r * 0.55} ${cy - r * 0.2}a${r * 0.6} ${r * 0.5} 0 0 1 ${r * 0.8} -${r * 0.45}`}
                {...common}
                strokeWidth="1.2"
                className="text-leaf-soft"
                opacity="0.8"
              />
            </g>
          ))}
        </g>
        <path
          d="M24 44c0-13 9-24 22-26-1 15-9 24-22 26z"
          {...common}
          className="text-leaf"
          fill="currentColor"
          fillOpacity="0.18"
        />
      </svg>
    ),
  };

  return marks[id] ?? marks.turmeric;
}
