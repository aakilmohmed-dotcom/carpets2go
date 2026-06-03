'use client'
import { useState, useEffect, useRef } from 'react'

type Review = { text: string; name: string }

const REVIEWS: Review[] = [
  { name: 'Verified Google review', text: 'Absolutely delighted with our new carpet. The colour is exactly what we were hoping for — light, modern and it really brightens the room. The fitting was done neatly and professionally, with great attention to detail around the doorways and edges. Would definitely recommend.' },
  { name: 'Verified Google review', text: 'Stairs and landing carpet fitted today. From sales, measuring and fitting cannot fault their service. This is my 3rd purchase from them and my experience has not dwindled. I definitely recommend this company. Keep up the good work Urfan and team.' },
  { name: 'Verified Google review', text: 'Very pleased with Carpets2Go. Amazing guys! The sales advisor was really helpful and friendly, and everything he promised has been done. Great, fast, professional service. Recommended to anyone who needs carpets, laminate or any flooring.' },
  { name: 'Verified Google review', text: 'Love my carpet — absolutely fantastic service from start to finish! Fitted so quickly and the quality is amazing. All the staff were really friendly and the fitter did an excellent job, keeping me updated along the way. Couldn’t be happier, highly recommend!' },
  { name: 'Verified Google review', text: 'I had laminate flooring supplied and fitted in my living room and hallway, and they were fantastic from start to finish. Excellent quality, the fitter did a brilliant job, and the price was very reasonable. Delighted with the result. Highly impressed!' },
  { name: 'Verified Google review', text: 'Amazing service from start to finish. The advice we received was honest and genuinely helpful. They measured and even fitted our living room carpet the very next day — on a Sunday — above and beyond. The end result looks fantastic. Highly recommend.' },
]

const INTERVAL = 4000
const FADE = 450

export default function ReviewsCarousel() {
  const [i, setI] = useState(0)
  const [visible, setVisible] = useState(true)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const paused = useRef(false)
  const n = REVIEWS.length

  // Crossfade: fade out, swap, fade in
  const transitionTo = (next: number) => {
    setVisible(false)
    setTimeout(() => {
      setI(((next % n) + n) % n)
      setVisible(true)
    }, FADE)
  }

  const start = () => {
    stop()
    timer.current = setInterval(() => {
      if (!paused.current) transitionTo(iRef.current + 1)
    }, INTERVAL)
  }
  const stop = () => { if (timer.current) clearInterval(timer.current) }

  // keep a ref of current index for the interval closure
  const iRef = useRef(0)
  useEffect(() => { iRef.current = i }, [i])

  useEffect(() => {
    start()
    return stop
  }, [])

  return (
    <div
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
      style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}
    >
      <div style={{ color: 'var(--action)', fontSize: 22, letterSpacing: '0.12em', marginBottom: 20 }}>★★★★★</div>

      <div style={{ minHeight: 170 }}>
        <p style={{
          fontFamily: 'var(--c-serif)', fontStyle: 'italic',
          fontSize: 'clamp(18px, 2.6vw, 26px)', lineHeight: 1.5,
          color: 'var(--text-1)', margin: 0,
          opacity: visible ? 1 : 0, transition: `opacity ${FADE}ms ease`,
        }}>
          &ldquo;{REVIEWS[i].text}&rdquo;
        </p>
        <div style={{
          fontSize: 13, color: 'var(--text-3)', marginTop: 18, letterSpacing: '0.04em',
          opacity: visible ? 1 : 0, transition: `opacity ${FADE}ms ease`,
        }}>{REVIEWS[i].name}</div>
      </div>

      <div style={{ display: 'flex', gap: 18, justifyContent: 'center', alignItems: 'center', marginTop: 28 }}>
        <button onClick={() => transitionTo(i - 1)} aria-label="Previous review" style={navBtn}>&#8249;</button>
        <div style={{ display: 'flex', gap: 8 }}>
          {REVIEWS.map((_, k) => (
            <button key={k} onClick={() => transitionTo(k)} aria-label={`Review ${k+1}`} style={{
              width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
              background: k === i ? 'var(--action)' : 'var(--border-2)', transition: 'background 200ms',
            }} />
          ))}
        </div>
        <button onClick={() => transitionTo(i + 1)} aria-label="Next review" style={navBtn}>&#8250;</button>
      </div>
    </div>
  )
}

const navBtn: React.CSSProperties = {
  width: 42, height: 42, borderRadius: '50%', cursor: 'pointer',
  border: '1px solid var(--border-2)', background: 'transparent',
  color: 'var(--text-1)', fontSize: 22, lineHeight: 1,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
