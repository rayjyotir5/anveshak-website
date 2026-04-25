// Hero — full-bleed 3D bridge canvas + kinetic typography
import { useEffect, useRef } from 'react';
import HeroBridge from './hero-bridge.jsx';

export default function Hero({ intensity }) {
  const headlineRef = useRef(null);

  useEffect(() => {
    // Stagger reveal
    const spans = headlineRef.current?.querySelectorAll('.h-word');
    if (!spans) return;
    spans.forEach((s, i) => {
      s.style.transition = `transform 0.9s ${0.6 + i * 0.08}s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ${0.6 + i * 0.08}s`;
      requestAnimationFrame(() => {
        s.style.transform = 'translateY(0)';
        s.style.opacity = 1;
      });
    });
  }, []);

  return (
    <section id="home" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      paddingTop: 120,
      paddingBottom: 140,
    }}>
      <HeroBridge intensity={intensity} />

      {/* Top vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(8,16,31,0.6) 0%, transparent 30%, transparent 70%, rgba(8,16,31,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <div style={{
            opacity: 0,
            animation: 'fadeIn 0.8s 0.4s forwards',
          }}>
            <span className="eyebrow">Research as a Service · India</span>
          </div>

          <h1
            ref={headlineRef}
            className="display"
            style={{
              fontSize: 'clamp(48px, 9vw, 132px)',
              lineHeight: 1.3,
              marginTop: 28,
              marginBottom: 36,
              color: 'var(--ink)',
            }}
          >
            <span className="h-line" style={{ display: 'block', overflow: 'hidden' }}>
              <span className="h-word" style={{ display: 'inline-block', transform: 'translateY(105%)', opacity: 0 }}>Bridging</span>
              <span className="h-word" style={{ display: 'inline-block', width: '0.35em' }}>&nbsp;</span>
              <span className="h-word" style={{ display: 'inline-block', transform: 'translateY(105%)', opacity: 0, fontStyle: 'italic', color: 'var(--gold)' }}>innovation</span>
            </span>
            <span className="h-line" style={{ display: 'block', overflow: 'hidden' }}>
              <span className="h-word" style={{ display: 'inline-block', transform: 'translateY(105%)', opacity: 0 }}>between</span>
              <span className="h-word" style={{ display: 'inline-block', width: '0.35em' }}>&nbsp;</span>
              <span className="h-word" style={{ display: 'inline-block', transform: 'translateY(105%)', opacity: 0 }}>industry</span>
            </span>
            <span className="h-line" style={{ display: 'block', overflow: 'hidden' }}>
              <span className="h-word" style={{ display: 'inline-block', transform: 'translateY(105%)', opacity: 0 }}>and</span>
              <span className="h-word" style={{ display: 'inline-block', width: '0.35em' }}>&nbsp;</span>
              <span className="h-word" style={{ display: 'inline-block', transform: 'translateY(105%)', opacity: 0, fontStyle: 'italic', color: 'var(--gold)' }}>academia</span>
              <span className="h-word" style={{ display: 'inline-block', transform: 'translateY(105%)', opacity: 0 }}>.</span>
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            color: 'var(--ink-mute)',
            maxWidth: 580,
            margin: '0 auto 44px',
            lineHeight: 1.6,
            opacity: 0,
            animation: 'fadeIn 0.8s 1.4s forwards',
          }}>
            A premier organization fostering cutting-edge innovation and IP-led products
            and solutions across enterprises in India.
          </p>

          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: 0,
            animation: 'fadeIn 0.8s 1.7s forwards',
          }}>
            <a href="#services" className="magnetic" style={{
              padding: '16px 32px',
              background: 'var(--gold)',
              color: 'var(--bg)',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.02em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              transition: 'transform 0.3s, background 0.3s',
            }}>
              Explore our work
              <span style={{ display: 'inline-block', transition: 'transform 0.3s' }}>→</span>
            </a>
            <a href="#contact" className="magnetic" style={{
              padding: '16px 32px',
              background: 'transparent',
              color: 'var(--ink)',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.02em',
              border: '1px solid var(--line-strong)',
              backdropFilter: 'blur(10px)',
              transition: 'border-color 0.3s, background 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(245,242,234,0.05)'; e.currentTarget.style.borderColor = 'var(--ink-mute)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--line-strong)'; }}>
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" style={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        opacity: 0,
        animation: 'fadeIn 0.8s 2.0s forwards',
        zIndex: 2,
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.3em',
          color: 'var(--ink-dim)',
          textTransform: 'uppercase',
        }}>Scroll</span>
        <div style={{
          width: 1,
          height: 40,
          background: 'linear-gradient(180deg, var(--gold) 0%, transparent 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: 12,
            background: 'var(--ink)',
            animation: 'scrollDot 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes scrollDot {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        /* Hide scroll cue on shorter viewports where it can collide with CTAs */
        @media (max-height: 820px), (max-width: 820px) {
          .hero-scroll { display: none !important; }
        }
      `}</style>
    </section>
  );
}
