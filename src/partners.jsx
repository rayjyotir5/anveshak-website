// Partners — minimalist showcase
export default function Partners() {
  return (
    <section id="partners" style={{
      padding: '120px 0',
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--line)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 56,
          flexWrap: 'wrap',
          gap: 24,
        }}>
          <div style={{ maxWidth: 560 }}>
            <span className="eyebrow">Academic Partners</span>
            <h2 className="display" style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              marginTop: 24,
              color: 'var(--ink)',
            }}>
              Collaborating with India's <em>premier</em> institutions.
            </h2>
          </div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'var(--ink-dim)',
            letterSpacing: '0.2em',
          }}>01 / EXPANDING</div>
        </div>

        <div style={{
          padding: '48px',
          background: 'rgba(245, 242, 234, 0.02)',
          border: '1px solid var(--line-strong)',
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 48,
          flexWrap: 'wrap',
          transition: 'border-color 0.3s, background 0.3s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,150,62,0.3)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-strong)'; }}>
          <div style={{
            width: 120,
            height: 120,
            background: '#fff',
            borderRadius: 16,
            padding: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <img src="img/bits-pilani-logo.png" alt="BITS Pilani"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ flex: '1 1 320px' }}>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              color: 'var(--gold)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>Lead Institute</div>
            <h3 className="display" style={{
              fontSize: 36,
              color: 'var(--ink)',
              marginBottom: 8,
            }}>BITS Pilani</h3>
            <p style={{ color: 'var(--ink-mute)', fontSize: 15 }}>
              Birla Institute of Technology and Science — Lead institute for WILP Smart Manufacturing.
            </p>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            {[
              { l: 'Programs', v: 'WILP · M.Tech · PhD' },
              { l: 'Focus', v: 'Smart Manufacturing' },
            ].map(x => (
              <div key={x.l}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-dim)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>{x.l}</div>
                <div style={{ fontSize: 14, color: 'var(--ink)' }}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

