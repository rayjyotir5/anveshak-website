// Navbar — fixed, transparent → solid on scroll, with mobile drawer
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const navItems = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#partners', label: 'Partners' },
  { href: '#contact', label: 'Contact' }];


  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: scrolled ? '14px 0' : '24px 0',
        background: scrolled ? 'rgba(8, 16, 31, 0.78)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'padding 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s, border 0.4s'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36,
              background: '#fff',
              borderRadius: 8,
              padding: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <img src="img/anveshak-logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: 'var(--serif)',
                fontSize: 22,
                color: 'var(--ink)',
                letterSpacing: '-0.01em'
              }}>Anveshak Hub</span>
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: 9,
                letterSpacing: '0.25em',
                color: 'var(--gold)',
                marginTop: 2
              }}>IGNITE / INNOVATE / INSPIRE</span>
            </div>
          </a>

          <div className="nav-links-desktop" style={{
            display: 'flex',
            gap: 36,
            alignItems: 'center'
          }}>
            {navItems.map((item) =>
            <a key={item.href} href={item.href} style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--ink-mute)',
              letterSpacing: '0.01em',
              position: 'relative',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-mute)'}>
                {item.label}
              </a>
            )}
            <a href="#contact" className="magnetic" style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--bg)',
              background: 'var(--gold)',
              padding: '10px 20px',
              borderRadius: 999,
              letterSpacing: '0.01em',
              transition: 'background 0.2s, transform 0.2s'
            }}
            onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--gold-bright)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'var(--gold)';}}>
              Start a project →
            </a>
          </div>

          <button
            className="nav-burger"
            aria-label="Open menu"
            onClick={() => setOpen(!open)}
            style={{
              display: 'none',
              background: 'transparent',
              border: '1px solid var(--line-strong)',
              borderRadius: 8,
              width: 44, height: 44,
              alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column',
              gap: 5
            }}>
            
            <span style={{
              width: 18, height: 1.5, background: 'var(--ink)',
              transition: 'transform 0.3s',
              transform: open ? 'translateY(3.25px) rotate(45deg)' : 'none'
            }} />
            <span style={{
              width: 18, height: 1.5, background: 'var(--ink)',
              transition: 'transform 0.3s',
              transform: open ? 'translateY(-3.25px) rotate(-45deg)' : 'none'
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99,
        background: 'rgba(8, 16, 31, 0.96)',
        backdropFilter: 'blur(20px)',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: 'opacity 0.4s, visibility 0.4s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24
        }}>
          {navItems.map((item, i) =>
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 38,
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              opacity: open ? 1 : 0,
              transition: `transform 0.5s ${0.1 + i * 0.05}s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ${0.1 + i * 0.05}s`
            }}>
            
              {item.label}
            </a>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>);

}