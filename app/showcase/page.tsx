'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FRAME_COUNT = 181
const framePath = (i: number) => `/showcase/frames/frame_${String(i).padStart(4, '0')}.jpg`

export default function Showcase() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const images: HTMLImageElement[] = []
    const state = { frame: 0 }
    let ready = false

    // Preload all frames
    let count = 0
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = framePath(i)
      img.onload = () => { count++; setLoaded(count); if (count === FRAME_COUNT) { ready = true; render() } }
      images[i - 1] = img
    }

    const fit = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      render()
    }
    const render = () => {
      const img = images[Math.min(Math.round(state.frame), FRAME_COUNT - 1)]
      if (!img || !img.complete) return
      const cw = canvas.width, ch = canvas.height
      const ir = img.width / img.height, cr = cw / ch
      let dw = cw, dh = ch, dx = 0, dy = 0
      if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2 }
      else { dw = cw; dh = cw / ir; dy = (ch - dh) / 2 }
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    window.addEventListener('resize', fit)
    fit()

    const st = gsap.to(state, {
      frame: FRAME_COUNT - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
      onUpdate: render,
    })

    // Text overlays fade in/out across scroll
    const texts = gsap.utils.toArray<HTMLElement>('.sc-text')
    texts.forEach((t, idx) => {
      gsap.fromTo(t, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: `${idx * 28 + 8}% top`,
          end: `${idx * 28 + 22}% top`,
          scrub: true,
        },
      })
      gsap.to(t, {
        opacity: 0, y: -40,
        scrollTrigger: {
          trigger: containerRef.current,
          start: `${idx * 28 + 22}% top`,
          end: `${idx * 28 + 30}% top`,
          scrub: true,
        },
      })
    })

    return () => {
      window.removeEventListener('resize', fit)
      st.scrollTrigger?.kill(); st.kill()
      ScrollTrigger.getAll().forEach(s => s.kill())
    }
  }, [])

  const pct = Math.round((loaded / FRAME_COUNT) * 100)

  return (
    <div ref={containerRef} style={{ height: '500vh', position: 'relative', background: '#0E1626' }}>
      {/* Pinned stage */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

        {/* Loading */}
        {pct < 100 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'DM Sans', sans-serif", flexDirection: 'column', gap: 12, background: '#0E1626' }}>
            <div style={{ fontSize: 14, letterSpacing: '0.1em' }}>LOADING {pct}%</div>
            <div style={{ width: 200, height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
              <div style={{ width: `${pct}%`, height: '100%', background: '#4EACEA', borderRadius: 2, transition: 'width 120ms' }} />
            </div>
          </div>
        )}

        {/* Text overlays */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div className="sc-text" style={overlay}>
            <h1 style={hStyle}>Carpets<span style={{ color: '#CE2D20' }}>2Go</span></h1>
            <p style={pStyle}>Quality flooring, delivered with care</p>
          </div>
          <div className="sc-text" style={overlay}>
            <h2 style={hStyle}>Measured &amp; fitted</h2>
            <p style={pStyle}>By experienced local installers</p>
          </div>
          <div className="sc-text" style={overlay}>
            <h2 style={hStyle}>Bolton &amp; Greater Manchester</h2>
            <p style={pStyle}>Free home visits · 10+ years</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const overlay: React.CSSProperties = {
  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0,
  textShadow: '0 2px 30px rgba(0,0,0,0.6)',
}
const hStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(48px, 9vw, 120px)',
  color: '#fff', lineHeight: 1, margin: 0,
}
const pStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 2.5vw, 24px)',
  color: 'rgba(255,255,255,0.9)', marginTop: 18, letterSpacing: '0.02em',
}
