'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FRAME_COUNT = 180
const framePath = (i: number) => `/showcase/frames/frame_${String(i).padStart(4, '0')}.jpg`
const CREAM = '#FBFBF9'

export default function CarpetVideoHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const pinRef = useRef<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 900px)').matches
    setIsMobile(mobile)

    gsap.registerPlugin(ScrollTrigger)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const images: HTMLImageElement[] = []
    const state = { frame: 0 }

    let count = 0
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = framePath(i)
      img.onload = () => { count++; setLoaded(count); if (count >= 1) render() }
      images[i - 1] = img
    }

    const fit = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      render()
    }
    const render = () => {
      const img = images[Math.min(Math.round(state.frame), FRAME_COUNT - 1)]
      const cw = canvas.width, ch = canvas.height
      ctx.clearRect(0, 0, cw, ch)
      if (!img || !img.complete || !img.width) return
      const ir = img.width / img.height, cr = cw / ch
      // contain: whole frame visible, no cropping
      let dw = cw, dh = ch, dx = 0, dy = 0
      if (ir > cr) { dw = cw; dh = cw / ir; dy = (ch - dh) / 2 }
      else { dh = ch; dw = ch * ir; dx = (cw - dw) / 2 }
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    window.addEventListener('resize', fit)
    fit()

    let st: ScrollTrigger | undefined
    if (!mobile) {
      const tween = gsap.to(state, {
        frame: FRAME_COUNT - 1, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinRef.current,
          start: 'top top',
          end: '+=700',           // brief hold, quick play-through
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
        onUpdate: render,
      })
      st = tween.scrollTrigger
    } else {
      // Mobile fallback: show a representative static frame, no pin/scrub
      const img = new Image()
      img.src = framePath(Math.floor(FRAME_COUNT / 2))
      img.onload = () => { images[Math.floor(FRAME_COUNT/2)-1] = img; state.frame = Math.floor(FRAME_COUNT/2); render() }
    }

    return () => {
      window.removeEventListener('resize', fit)
      st?.kill()
      ScrollTrigger.getAll().forEach(s => s.kill())
    }
  }, [])

  const pct = Math.round((loaded / FRAME_COUNT) * 100)

  return (
    <section ref={sectionRef} style={{ position: 'relative' }}>
      <div ref={pinRef} style={{ minHeight: isMobile ? 'auto' : '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="cvh-grid">
          {/* Left 2/3 — text */}
          <div>
            <div className="c-eyebrow" style={{ marginBottom: 22 }}>
              <span className="c-eyebrow-line" /> Carpets &amp; flooring specialists &middot; Bolton
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', maxWidth: 720, marginBottom: 26, lineHeight: 1.06 }}>
              Beautiful floors,<br />
              <span style={{ fontStyle: 'italic', color: 'var(--text-1)' }}>fitted with care</span>.
            </h1>
            <p style={{ fontSize: 'clamp(17px, 2vw, 20px)', color: 'var(--text-1)', maxWidth: 520, lineHeight: 1.7, marginBottom: 34 }}>
              Quality carpets, laminate and flooring supplied and fitted across Bolton, Wigan &amp; Greater Manchester. Free home visits, honest advice and expert fitting.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 26 }}>
              <a href="/contact" className="c-btn c-btn-cta">Book a free measure</a>
              <a href="tel:+441204775930" className="c-btn c-btn-ghost">Call 01204 775 930</a>
            </div>

          </div>

          {/* Right 1/3 — scroll animation */}
          <div className="cvh-canvas-col" style={{ position: 'relative', height: '94vh', maxHeight: 1000 }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            {pct < 100 && !isMobile && (
              <div style={{ position: 'absolute', bottom: 12, left: 12, fontSize: 11, color: 'var(--text-3)' }}>Loading {pct}%</div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .cvh-grid {
          max-width: 1180px; margin: 0 auto; padding: 0 32px; width: 100%;
          display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; align-items: center;
        }
        @media (max-width: 900px) {
          .cvh-grid { grid-template-columns: 1fr; gap: 32px; padding: 60px 22px; }
          .cvh-canvas-col { display: none !important; }
        }
      `}</style>
    </section>
  )
}
