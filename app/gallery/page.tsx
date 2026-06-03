import WorkGallery from '@/components/site/WorkGallery'

export default function Gallery() {
  return (
    <>
      <section className="c-wrap" style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="c-eyebrow" style={{ marginBottom: 22 }}><span className="c-eyebrow-line" /> Our recent work</div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 68px)', maxWidth: 820, marginBottom: 24 }}>Gallery</h1>
        <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 560, lineHeight: 1.7 }}>
          A selection of real carpets and flooring fitted by our team across Bolton, Wigan and Greater Manchester. Click any image to view it larger.
        </p>
      </section>

      <section className="c-wrap" style={{ paddingBottom: 100 }}>
        <WorkGallery />
      </section>
    </>
  )
}
