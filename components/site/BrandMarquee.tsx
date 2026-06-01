'use client'

// Each brand gets a subtle distinct treatment (case, weight, spacing, italic)
// so the row feels characterful without reproducing trademarked logos.
type Brand = { name: string; style: React.CSSProperties }

const SERIF = "'Cormorant Garamond', Georgia, serif"
const SANS  = "'DM Sans', sans-serif"

const BRANDS: Brand[] = [
  { name: 'Cormar',            style: { fontFamily: SANS,  fontWeight: 700, letterSpacing: '-0.02em' } },
  { name: 'Associated Weavers',style: { fontFamily: SERIF, fontWeight: 500, fontStyle: 'italic', letterSpacing: '0.01em' } },
  { name: 'iSense',            style: { fontFamily: SANS,  fontWeight: 600, letterSpacing: '-0.03em' } },
  { name: 'Balta',             style: { fontFamily: SANS,  fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' } },
  { name: 'Balterio',          style: { fontFamily: SANS,  fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' } },
  { name: 'Abingdon',          style: { fontFamily: SERIF, fontWeight: 600, letterSpacing: '0.02em' } },
  { name: 'Kosset',            style: { fontFamily: SANS,  fontWeight: 700, letterSpacing: '0.02em' } },
  { name: 'Lifestyle Floors',  style: { fontFamily: SERIF, fontWeight: 500, fontStyle: 'italic' } },
  { name: 'Stainfree',         style: { fontFamily: SANS,  fontWeight: 600, letterSpacing: '-0.01em' } },
  { name: 'Tarkett',           style: { fontFamily: SANS,  fontWeight: 800, letterSpacing: '-0.02em' } },
  { name: 'Cloud 9',           style: { fontFamily: SERIF, fontWeight: 500, fontStyle: 'italic', letterSpacing: '0.02em' } },
  { name: 'Wilton Royal',      style: { fontFamily: SERIF, fontWeight: 600, letterSpacing: '0.03em' } },
  { name: 'Flotex',            style: { fontFamily: SANS,  fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' } },
  { name: 'Forbo',             style: { fontFamily: SANS,  fontWeight: 800, letterSpacing: '0.02em' } },
  { name: 'Polyflor',          style: { fontFamily: SANS,  fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase' } },
  { name: 'Egger',             style: { fontFamily: SANS,  fontWeight: 700, letterSpacing: '0.02em' } },
  { name: 'Fells Carpets',     style: { fontFamily: SERIF, fontWeight: 600 } },
  { name: 'Westex',            style: { fontFamily: SANS,  fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' } },
  { name: 'Vivendi',           style: { fontFamily: SERIF, fontWeight: 500, fontStyle: 'italic', letterSpacing: '0.03em' } },
  { name: 'Invictus',          style: { fontFamily: SERIF, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' } },
  { name: 'Canadia',           style: { fontFamily: SANS,  fontWeight: 600, letterSpacing: '0.02em' } },
]

export default function BrandMarquee() {
  // Duplicate the list so the loop is seamless
  const row = [...BRANDS, ...BRANDS]

  return (
    <div className="bm-wrap" aria-label="Brands we stock">
      <style>{`
        .bm-wrap { position: relative; overflow: hidden; padding: 14px 0; }
        .bm-wrap::before, .bm-wrap::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 120px; z-index: 2; pointer-events: none;
        }
        .bm-wrap::before { left: 0;  background: linear-gradient(90deg, var(--bg) 0%, transparent 100%); }
        .bm-wrap::after  { right: 0; background: linear-gradient(270deg, var(--bg) 0%, transparent 100%); }
        .bm-track {
          display: flex; align-items: center; gap: 0; width: max-content;
          animation: bm-scroll 60s linear infinite;
        }
        .bm-wrap:hover .bm-track { animation-play-state: paused; }
        .bm-item {
          display: inline-flex; align-items: center; white-space: nowrap;
          font-size: 26px; color: var(--text-2);
          padding: 0 38px; transition: color 200ms;
          cursor: default;
        }
        .bm-item:hover { color: var(--accent); }
        .bm-sep { width: 1px; height: 22px; background: var(--border); flex-shrink: 0; }
        @keyframes bm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (max-width: 860px) {
          .bm-item { font-size: 21px; padding: 0 26px; }
          .bm-wrap::before, .bm-wrap::after { width: 60px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bm-track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; }
        }
      `}</style>

      <div className="bm-track">
        {row.map((b, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span className="bm-item" style={b.style}>{b.name}</span>
            <span className="bm-sep" />
          </span>
        ))}
      </div>
    </div>
  )
}
