// Impact — parallax research-impact section
// Multiple layers move at different speeds with scroll
import { useEffect, useRef, useState } from 'react';

const PILLARS = [
  { kw: 'Discovery', body: 'Mapping the right researchers and labs to a real industry problem.' },
  { kw: 'Translation', body: 'Turning academic insight into production-ready specifications.' },
  { kw: 'Protection', body: 'Structuring IP, licensing, and knowledge ownership before scale.' },
  { kw: 'Deployment', body: 'Embedding outcomes in operations with the partner team.' },
];

export default function Impact() {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section enters viewport, 1 when it has fully passed
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      const x = Math.max(0, Math.min(1, scrolled / total));
      setP(x);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { update(); raf = null; });
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Parallax layers — each at a different speed
  const yBack = (p - 0.5) * 200;     // slowest — far background
  const yMid = (p - 0.5) * 120;
  const yFront = (p - 0.5) * 60;     // fastest — near layer

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        padding: '180px 0 200px',
        background: 'linear-gradient(180deg, var(--bg) 0%, #050912 50%, var(--bg) 100%)',
        borderTop: '1px solid var(--line)',
        overflow: 'hidden',
      }}
    >
      {/* Far layer — giant typographic backdrop */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, calc(-50% + ${yBack}px))`,
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(220px, 36vw, 600px)',
        color: 'rgba(200, 150, 62, 0.04)',
        letterSpacing: '-0.04em',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        lineHeight: 1,
      }}>
        impact.
      </div>

      {/* Mid layer — orbital ring/dots */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 700,
        height: 700,
        transform: `translate(-50%, calc(-50% + ${yMid}px)) rotate(${p * 60}deg)`,
        pointerEvents: 'none',
        opacity: 0.5,
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(200, 150, 62, 0.15)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          inset: 80,
          border: '1px dashed rgba(245, 242, 234, 0.06)',
          borderRadius: '50%',
        }} />
        {[0, 60, 120, 180, 240, 300].map(deg => (
          <div key={deg} style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 6,
            height: 6,
            background: 'var(--gold)',
            borderRadius: '50%',
            transform: `rotate(${deg}deg) translateY(-350px)`,
            transformOrigin: 'center',
            boxShadow: '0 0 14px var(--gold)',
          }} />
        ))}
      </div>

      {/* Front layer — content */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        transform: `translateY(${yFront}px)`,
      }}>
        <div style={{ marginBottom: 80, maxWidth: 760 }}>
          <span className="eyebrow">Why it matters</span>
          <h2 className="display" style={{
            fontSize: 'clamp(40px, 5.5vw, 80px)',
            marginTop: 28,
            color: 'var(--ink)',
            lineHeight: 1.0,
          }}>
            Research becomes <em>impact</em><br />
            when industry can <em>move</em> on it.
          </h2>
          <p className="body-copy" style={{ marginTop: 24, fontSize: 18 }}>
            Anveshak Hub is built around four pillars that turn academic depth into
            commercially grounded outcomes — not a report on a shelf.
          </p>
        </div>

        {/* Pillars */}
        <div className="pillars-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
        }}>
          {PILLARS.map((p, i) => (
            <PillarCard key={p.kw} pillar={p} i={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pillars-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function PillarCard({ pillar, i }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      padding: '28px 24px',
      border: '1px solid var(--line-strong)',
      borderRadius: 16,
      background: 'rgba(8, 16, 31, 0.4)',
      backdropFilter: 'blur(8px)',
      transform: vis ? 'translateY(0)' : 'translateY(30px)',
      opacity: vis ? 1 : 0,
      transition: `transform 0.7s ${i * 0.08}s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ${i * 0.08}s`,
    }}>
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: 10,
        color: 'var(--gold)',
        letterSpacing: '0.2em',
        marginBottom: 16,
      }}>{String(i + 1).padStart(2, '0')}</div>
      <h3 className="display" style={{
        fontSize: 28,
        color: 'var(--ink)',
        marginBottom: 10,
      }}>{pillar.kw}</h3>
      <p style={{ fontSize: 14, color: 'var(--ink-mute)', lineHeight: 1.55 }}>{pillar.body}</p>
    </div>
  );
}

