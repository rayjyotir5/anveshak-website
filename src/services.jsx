// Services — horizontal scroll-jacked storytelling
// While the user scrolls vertically, the section pins and panels translate horizontally
const { useEffect, useRef, useState } = React;

const SERVICES = [
  {
    n: '01',
    title: 'Research-led Projects',
    short: 'Driving innovation through structured research methodologies.',
    body: 'Connecting PhD researchers and academic experts with industry challenges for breakthrough solutions. Structured around clear deliverables, IP assignment, and commercial alignment.',
    tags: ['PhD network', 'Pilot studies', 'Tech transfer'],
  },
  {
    n: '02',
    title: 'IP & Knowledge',
    short: 'Maximize commercial value of innovations.',
    body: 'Systematic management of IP portfolios, patent strategies, and knowledge assets to maximize commercial value and protect innovations across product lifecycles.',
    tags: ['Patent strategy', 'Licensing', 'Knowledge ops'],
  },
  {
    n: '03',
    title: 'Startup Ecosystem',
    short: 'Nurturing deep-tech ventures, lab to launch.',
    body: 'Mentorship, infrastructure support, and industry connections to accelerate commercialization of deep-tech ideas from university labs to market.',
    tags: ['Incubation', 'Mentor network'],
  },
  {
    n: '04',
    title: 'Upskilling',
    short: 'Industry-aligned training programs.',
    body: 'From shop floor to leadership: Factory of the Future, AI, Automation, and IoT — courses built with academia, delivered for industry.',
    tags: ['Factory of the Future', 'AI / IoT', 'Leadership'],
  },
  {
    n: '05',
    title: 'Design & Development',
    short: 'End-to-end product engineering.',
    body: 'Hardware, software, and embedded systems development that leverages academic research as a foundation. From concept to production-ready outcome.',
    tags: ['Hardware', 'Embedded', 'Software'],
  },
  {
    n: '06',
    title: 'Consulting',
    short: 'Strategic advisory for innovation.',
    body: 'Helping organizations bridge the innovation gap and build effective industry-academia collaboration frameworks tailored to their context.',
    tags: ['Strategy', 'Frameworks'],
  },
];

function Services() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [translatePx, setTranslatePx] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let raf;
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = wrap.offsetHeight - vh;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);

      // Measure actual track length in px — robust to panel clamping
      const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
      const tx = -p * maxTranslate;
      setTranslatePx(tx);

      // Active index by which panel center is closest to viewport center
      const panels = track.children;
      const viewportCenter = window.innerWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < panels.length; i++) {
        const r = panels[i].getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = Math.abs(c - viewportCenter);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      }
      setActiveIdx(bestIdx);
    };
    update();

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { update(); raf = null; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section id="services" style={{
        padding: '120px 0',
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
      }}>
        <div className="container">
          <div style={{ marginBottom: 56 }}>
            <span className="eyebrow">What we do</span>
            <h2 className="display" style={{ fontSize: 44, marginTop: 24, color: 'var(--ink)' }}>
              Six ways to <em>activate</em> research.
            </h2>
            <p className="body-copy" style={{ marginTop: 20 }}>
              Research as a Service — bridging academic excellence and industry needs.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SERVICES.map((s, i) => (
              <MobileServiceCard key={s.n} svc={s} i={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: horizontal scroll
  return (
    <section id="services" ref={wrapRef} style={{
      position: 'relative',
      height: `${SERVICES.length * 90 + 80}vh`,
      background: 'var(--bg)',
      borderTop: '1px solid var(--line)',
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header rail */}
        <div style={{
          padding: '120px 0 24px',
          flexShrink: 0,
        }}>
          <div className="container" style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 32,
          }}>
            <div style={{ maxWidth: 640 }}>
              <span className="eyebrow">What we do</span>
              <h2 className="display" style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                marginTop: 16,
                color: 'var(--ink)',
              }}>
                Six ways to <em>activate</em> research.
              </h2>
            </div>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.2em',
              color: 'var(--ink-dim)',
              textTransform: 'uppercase',
              textAlign: 'right',
            }}>
              <div style={{ color: 'var(--gold)', marginBottom: 4 }}>
                {String(activeIdx + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
              </div>
              <div>Scroll to explore →</div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="container" style={{ marginTop: 32 }}>
            <div style={{
              height: 1,
              background: 'var(--line-strong)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 0, left: 0,
                height: '1px',
                background: 'var(--gold)',
                width: `${progress * 100}%`,
                transition: 'width 0.1s linear',
              }} />
              <div style={{
                position: 'absolute',
                top: -3,
                left: `calc(${progress * 100}% - 3.5px)`,
                width: 7, height: 7,
                background: 'var(--gold)',
                borderRadius: 999,
                boxShadow: '0 0 12px var(--gold)',
                transition: 'left 0.1s linear',
              }} />
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          paddingBottom: 60,
        }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '2vw',
              paddingLeft: '8vw',
              paddingRight: '8vw',
              transform: `translateX(${translatePx}px)`,
              willChange: 'transform',
            }}
          >
            {SERVICES.map((s, i) => (
              <ServicePanel key={s.n} svc={s} i={i} active={i === activeIdx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicePanel({ svc, i, active }) {
  return (
    <div style={{
      width: '60vw',
      maxWidth: 720,
      flexShrink: 0,
      height: '62vh',
      maxHeight: 600,
      padding: '40px',
      background: active ? 'rgba(200, 150, 62, 0.04)' : 'rgba(245, 242, 234, 0.015)',
      border: '1px solid',
      borderColor: active ? 'rgba(200, 150, 62, 0.3)' : 'var(--line-strong)',
      borderRadius: 24,
      display: 'flex',
      flexDirection: 'column',
      transition: 'background 0.5s, border-color 0.5s, transform 0.6s cubic-bezier(0.22,1,0.36,1)',
      transform: active ? 'scale(1)' : 'scale(0.94)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Big number */}
      <div style={{
        position: 'absolute',
        top: 24, right: 32,
        fontFamily: 'var(--mono)',
        fontSize: 13,
        color: active ? 'var(--gold)' : 'var(--ink-dim)',
        letterSpacing: '0.15em',
        transition: 'color 0.4s',
      }}>{svc.n} / 06</div>

      <div style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(120px, 18vw, 280px)',
        color: active ? 'rgba(200, 150, 62, 0.12)' : 'rgba(245, 242, 234, 0.04)',
        position: 'absolute',
        bottom: -60,
        right: -20,
        lineHeight: 1,
        letterSpacing: '-0.03em',
        pointerEvents: 'none',
        transition: 'color 0.5s',
      }}>{svc.n}</div>

      <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto' }}>
        <h3 className="display" style={{
          fontSize: 'clamp(36px, 4.5vw, 64px)',
          color: 'var(--ink)',
          marginBottom: 20,
          letterSpacing: '-0.02em',
        }}>
          {svc.title}
        </h3>
        <p style={{
          fontSize: 17,
          color: 'var(--ink-mute)',
          lineHeight: 1.6,
          marginBottom: 24,
          maxWidth: 480,
        }}>
          {svc.body}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {svc.tags.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              padding: '6px 12px',
              border: '1px solid var(--line-strong)',
              borderRadius: 999,
              color: 'var(--ink-mute)',
              letterSpacing: '0.05em',
              background: 'rgba(8, 16, 31, 0.5)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileServiceCard({ svc, i }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        padding: '28px 0',
        borderTop: '1px solid var(--line-strong)',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.1em' }}>{svc.n}</span>
        <div style={{ flex: 1 }}>
          <h3 className="display" style={{ fontSize: 28, color: 'var(--ink)', marginBottom: 6 }}>{svc.title}</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-mute)' }}>{svc.short}</p>
          <div style={{
            maxHeight: open ? 240 : 0,
            opacity: open ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.5s, opacity 0.4s, margin-top 0.4s',
            marginTop: open ? 16 : 0,
          }}>
            <p style={{ fontSize: 14, color: 'var(--ink-mute)', lineHeight: 1.6, marginBottom: 12 }}>{svc.body}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {svc.tags.map(t => (
                <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: 10, padding: '4px 10px', border: '1px solid var(--line-strong)', borderRadius: 999, color: 'var(--ink-mute)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <span style={{ color: 'var(--ink-dim)', fontSize: 18, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }}>+</span>
      </div>
    </div>
  );
}

window.Services = Services;
