'use client'
import { useState, useEffect } from 'react'

type Work = { src: string; title: string; cat: string }

const WORK: Work[] = [
  { src: '/images/tartan-staircase.jpg',     title: 'Tartan stair runner',     cat: 'Stairs' },
  { src: '/images/vinyl-hallway.jpg',        title: 'Saxony plush staircase', cat: 'Carpet' },
  { src: '/images/laminate-living-room.jpg', title: 'Oak laminate living room', cat: 'Laminate' },
  { src: '/images/tartan-landing.jpg',       title: 'Tartan landing & hallway', cat: 'Carpet' },
  { src: '/images/grass-garden.jpg',         title: 'Wood-effect laminate flooring', cat: 'Laminate' },
  { src: '/images/tartan-stairs.jpg',        title: 'Patterned stair carpet',   cat: 'Stairs' },
  { src: '/images/wood-kitchen.jpg',         title: 'Wood-effect kitchen floor', cat: 'Flooring' },
  { src: '/images/tartan-step-detail.jpg',   title: 'Bullnose step detail',     cat: 'Craftsmanship' },
  { src: '/images/grass-garden-2.jpg',       title: 'Low-maintenance lawn',     cat: 'Artificial grass' },
]

export default function WorkGallery() {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (active !== null && e.key === 'ArrowRight') setActive((active + 1) % WORK.length)
      if (active !== null && e.key === 'ArrowLeft') setActive((active - 1 + WORK.length) % WORK.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <>
      <style>{`
        .wg-grid {
          columns: 3; column-gap: 16px;
        }
        @media (max-width: 860px) { .wg-grid { columns: 2; column-gap: 12px; } }
        @media (max-width: 520px) { .wg-grid { columns: 1; } }
        .wg-item {
          break-inside: avoid; margin-bottom: 16px;
          position: relative; border-radius: 14px; overflow: hidden;
          cursor: pointer; border: 1px solid var(--border);
          background: var(--surface);
        }
        .wg-item img { width: 100%; display: block; transition: transform 500ms ease; }
        .wg-item:hover img { transform: scale(1.045); }
        .wg-cap {
          position: absolute; left: 0; right: 0; bottom: 0;
          padding: 30px 18px 16px;
          background: linear-gradient(0deg, rgba(13,10,31,0.78) 0%, transparent 100%);
          opacity: 0; transition: opacity 280ms;
        }
        .wg-item:hover .wg-cap { opacity: 1; }
        .wg-cap-cat {
          font-size: 10px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase;
          color: #4EACEA; margin-bottom: 4px;
        }
        .wg-cap-title { font-family: var(--c-serif); font-size: 20px; color: #fff; line-height: 1.2; }

        .wg-lb {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(8,6,18,0.92); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center; padding: 28px;
        }
        .wg-lb img { max-width: 90vw; max-height: 84vh; border-radius: 12px; box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
        .wg-lb-cap {
          position: absolute; bottom: 26px; left: 0; right: 0; text-align: center;
          color: #fff; font-family: var(--c-serif); font-size: 22px; font-style: italic;
        }
        .wg-x {
          position: absolute; top: 22px; right: 26px; width: 42px; height: 42px;
          border-radius: 50%; border: 1px solid rgba(255,255,255,0.3); background: transparent;
          color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .wg-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 48px; height: 48px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.2);
          color: #fff; cursor: pointer; font-size: 22px; display: flex; align-items: center; justify-content: center;
        }
        .wg-prev { left: 22px; } .wg-next { right: 22px; }
        @media (max-width: 600px) { .wg-nav { display: none; } }
      `}</style>

      <div className="wg-grid">
        {WORK.map((w, i) => (
          <div key={i} className="wg-item" onClick={() => setActive(i)}>
            <img src={w.src} alt={w.title} loading="lazy" />
            <div className="wg-cap">
              <div className="wg-cap-cat">{w.cat}</div>
              <div className="wg-cap-title">{w.title}</div>
            </div>
          </div>
        ))}
      </div>

      {active !== null && (
        <div className="wg-lb" onClick={() => setActive(null)}>
          <button className="wg-x" onClick={() => setActive(null)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
          <button className="wg-nav wg-prev" onClick={(e) => { e.stopPropagation(); setActive((active - 1 + WORK.length) % WORK.length) }} aria-label="Previous">&#8249;</button>
          <img src={WORK[active].src} alt={WORK[active].title} onClick={(e) => e.stopPropagation()} />
          <button className="wg-nav wg-next" onClick={(e) => { e.stopPropagation(); setActive((active + 1) % WORK.length) }} aria-label="Next">&#8250;</button>
          <div className="wg-lb-cap">{WORK[active].title}</div>
        </div>
      )}
    </>
  )
}
