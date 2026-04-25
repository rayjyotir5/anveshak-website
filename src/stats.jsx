// Stats — kinetic numerals on a constellation backdrop
import { useEffect, useRef, useState } from 'react';

export default function Stats() {
  return (
    <section style={{
      position: 'relative',
      padding: '140px 0',
      background: 'var(--bg-2)',
      overflow: 'hidden',
      borderTop: '1px solid var(--line)',
    }}>
      <ConstellationBg />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ marginBottom: 80, maxWidth: 720 }}>
          <span className="eyebrow">The Innovation Gap</span>
          <h2 className="display" style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            marginTop: 24,
            color: 'var(--ink)',
          }}>
            India's research output is world-class.<br />
            <em>Industry access, isn't.</em>
          </h2>
        </div>

        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          borderTop: '1px solid var(--line-strong)',
        }}>
          <StatItem value={70} suffix="%" label="Industry access challenge" desc="Indian companies struggle to access cutting-edge academic research for real-world problems." />
          <StatItem staticValue="<5%" label="Industry-academia collaboration" desc="Current partnership rate remains critically low compared to global standards." />
          <StatItem value={40} suffix="%" label="Potential time savings" desc="R&D acceleration possible through effective academic partnerships." />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function StatItem({ value, suffix = '', staticValue, label, desc }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(staticValue || '0' + suffix);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !seen) {
          setSeen(true);
          if (staticValue) {
            // scramble in
            const chars = '0123456789<%'.split('');
            const target = staticValue;
            let frame = 0;
            const totalFrames = 30;
            const id = setInterval(() => {
              frame++;
              const progress = frame / totalFrames;
              const out = target.split('').map((c, i) => {
                if (i / target.length < progress) return c;
                return chars[Math.floor(Math.random() * chars.length)];
              }).join('');
              setDisplay(out);
              if (frame >= totalFrames) {
                clearInterval(id);
                setDisplay(target);
              }
            }, 40);
          } else {
            const start = performance.now();
            const dur = 1600;
            const tick = (now) => {
              const t = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(Math.round(value * eased) + suffix);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen, value, suffix, staticValue]);

  return (
    <div ref={ref} style={{
      padding: '48px 32px 48px 0',
      borderRight: '1px solid var(--line-strong)',
      borderBottom: '1px solid var(--line-strong)',
      position: 'relative',
    }} className="stat-cell">
      <div className="display" style={{
        fontSize: 'clamp(64px, 10vw, 140px)',
        color: 'var(--gold)',
        marginBottom: 24,
        lineHeight: 0.95,
        fontFeatureSettings: '"tnum"',
      }}>
        {display}
      </div>
      <div style={{
        fontSize: 16,
        fontWeight: 600,
        color: 'var(--ink)',
        marginBottom: 8,
        letterSpacing: '-0.005em',
      }}>{label}</div>
      <p style={{
        fontSize: 14,
        color: 'var(--ink-dim)',
        lineHeight: 1.55,
        maxWidth: 320,
      }}>{desc}</p>
      <style>{`
        @media (max-width: 900px) {
          .stat-cell { border-right: none !important; padding-right: 0 !important; }
        }
      `}</style>
    </div>
  );
}

function ConstellationBg() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let w, h, raf;
    const stars = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = c.getBoundingClientRect();
      w = rect.width; h = rect.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
      });
    }

    let t0 = performance.now();
    const draw = (now) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const alpha = 0.3 + 0.5 * Math.abs(Math.sin(t * s.speed + s.phase));
        ctx.fillStyle = `rgba(200, 150, 62, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }} />;
}
