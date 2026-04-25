// Footer
export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-2)',
      padding: '80px 0 32px',
      borderTop: '1px solid var(--line)'
    }}>
      <div className="container">
        <div className="footer-marquee" style={{
          fontFamily: 'var(--serif)',
          fontSize: '4.2cqi',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          color: 'var(--ink)',
          marginBottom: 64,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          paddingBlock: '0.1em',
          containerType: 'inline-size',
        }}>
          <span>Bridging <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>innovation</em> · enterprise · academia</span>
        </div>

        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: 48,
          paddingBottom: 48,
          borderBottom: '1px solid var(--line-strong)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, background: '#fff', borderRadius: 8, padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="img/anveshak-logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ink)' }}>Anveshak Hub</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-dim)', lineHeight: 1.6, maxWidth: 360 }}>
              Premier organization fostering cutting-edge innovation and IP-led products across industries.
            </p>
          </div>

          <FooterCol heading="Navigate" links={[
          { l: 'Home', h: '#home' }, { l: 'Services', h: '#services' }, { l: 'About', h: '#about' },
          { l: 'Team', h: '#team' }, { l: 'Partners', h: '#partners' }]
          } />
          <FooterCol heading="Services" links={[
          { l: 'Research-led Projects', h: '#services' }, { l: 'IP & Knowledge', h: '#services' },
          { l: 'Startup Ecosystem', h: '#services' }, { l: 'Upskilling', h: '#services' }]
          } />
          <FooterCol heading="Contact" links={[
          { l: 'info@anveshakhub.com', h: 'mailto:info@anveshakhub.com' },
          { l: 'anveshakhub.com', h: 'https://anveshakhub.com' }]
          } />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 32,
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)', letterSpacing: '0.15em' }}>
            © 2026 ANVESHAK HUB PRIVATE LIMITED · ALL RIGHTS RESERVED
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)', letterSpacing: '0.15em' }}>INDIA · EST 2026

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>);

}

function FooterCol({ heading, links }) {
  return (
    <div>
      <h4 style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 20 }}>{heading}</h4>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((x) =>
        <li key={x.l}>
            <a href={x.h} style={{ fontSize: 14, color: 'var(--ink-mute)', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-mute)'}>
              {x.l}
            </a>
          </li>
        )}
      </ul>
    </div>);

}

