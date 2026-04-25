// About — values only
function About() {
  return (
    <section id="about" style={{
      position: 'relative',
      padding: '160px 0',
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--line)',
    }}>
      <div className="container">
        <div style={{ maxWidth: 760, marginBottom: 72 }}>
          <span className="eyebrow">What we stand for</span>
          <h2 className="display" style={{
            fontSize: 'clamp(40px, 5vw, 72px)',
            marginTop: 28,
            color: 'var(--ink)',
          }}>
            Innovation, with <em>intent</em>.
          </h2>
          <p className="body-copy" style={{ marginTop: 24 }}>
            Four principles that shape every engagement — from how we choose research
            partners to how we structure outcomes for industry.
          </p>
        </div>

        <div className="values-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          borderTop: '1px solid var(--line-strong)',
        }}>
          {[
            { n: '01', title: 'Innovation', desc: 'Pushing boundaries and embracing change.' },
            { n: '02', title: 'Integrity', desc: 'Operating with transparency and honesty.' },
            { n: '03', title: 'Excellence', desc: 'Delivering quality in everything we do.' },
            { n: '04', title: 'Collaboration', desc: 'Working together to achieve more.' },
          ].map(v => (
            <div key={v.n} className="value-cell" style={{
              padding: '40px 24px 40px 0',
              borderRight: '1px solid var(--line-strong)',
              borderBottom: '1px solid var(--line-strong)',
            }}>
              <div style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--gold)',
                letterSpacing: '0.15em',
                marginBottom: 20,
              }}>{v.n}</div>
              <h4 className="display" style={{
                fontSize: 32,
                color: 'var(--ink)',
                marginBottom: 12,
              }}>{v.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-dim)', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .values-grid { grid-template-columns: 1fr 1fr !important; }
          .value-cell:nth-child(2n) { border-right: none !important; }
        }
        @media (max-width: 540px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .value-cell { border-right: none !important; padding-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}

window.About = About;
