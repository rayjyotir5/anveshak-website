// CTA + Contact form
import { useState } from 'react';

export default function CTA() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const formData = new FormData(e.target);
      const res = await fetch('https://formspree.io/f/xreoyeqe', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) setStatus('done');
      else throw new Error('failed');
    } catch (err) {
      setStatus('idle');
      setError('Something went wrong. Please email info@anveshakhub.com directly.');
    }
  }

  return (
    <section id="contact" style={{
      padding: '160px 0',
      background: 'var(--bg)',
      borderTop: '1px solid var(--line)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient gold glow */}
      <div style={{
        position: 'absolute',
        width: '60vw', height: '60vw',
        maxWidth: 800, maxHeight: 800,
        top: '-20%', right: '-15%',
        background: 'radial-gradient(circle, rgba(200,150,62,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <div className="cta-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}>
          <div>
            <span className="eyebrow">Let's build</span>
            <h2 className="display" style={{
              fontSize: 'clamp(40px, 5.5vw, 80px)',
              marginTop: 28,
              color: 'var(--ink)',
              marginBottom: 32,
            }}>
              Shape India's <em>innovation</em> future, with us.
            </h2>
            <p className="body-copy" style={{ marginBottom: 40 }}>
              Ready to transform how research drives business innovation in India?
              Whether you're an enterprise looking to access cutting-edge research, or
              a researcher with breakthrough ideas — let's talk.
            </p>

            <div className="cta-cards" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}>
              {[
                { h: 'Industry Partners', p: 'Unlock academic research for business growth and competitive advantage.' },
                { h: 'Academic Researchers', p: 'Solve real-world problems, secure industry funding, drive economic impact.' },
              ].map(c => (
                <div key={c.h} style={{
                  padding: '24px',
                  border: '1px solid var(--line-strong)',
                  borderRadius: 12,
                  background: 'rgba(245,242,234,0.02)',
                }}>
                  <h3 style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 600, marginBottom: 8, letterSpacing: '0.02em' }}>{c.h}</h3>
                  <p style={{ fontSize: 13, color: 'var(--ink-mute)', lineHeight: 1.6 }}>{c.p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{
            border: '1px solid var(--line-strong)',
            borderRadius: 20,
            padding: 32,
            background: 'rgba(11, 18, 38, 0.4)',
            backdropFilter: 'blur(12px)',
          }}>
            {status !== 'done' ? (
              <form onSubmit={onSubmit}>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 6 }}>Get in touch</div>
                  <div className="display" style={{ fontSize: 28, color: 'var(--ink)' }}>Tell us your story.</div>
                </div>

                <Field name="name" label="Full name" placeholder="Your name" required />
                <Field name="email" type="email" label="Email" placeholder="you@company.com" required />
                <Field name="phone" type="tel" label="Phone" placeholder="+91 98765 43210" />
                <Field name="message" label="Message" placeholder="Tell us about your requirements..." textarea required />

                <button type="submit" disabled={status === 'sending'} style={{
                  width: '100%',
                  background: 'var(--gold)',
                  color: 'var(--bg)',
                  border: 'none',
                  padding: '16px',
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  marginTop: 16,
                  opacity: status === 'sending' ? 0.6 : 1,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { if (status !== 'sending') e.currentTarget.style.background = 'var(--gold-bright)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold)'; }}>
                  {status === 'sending' ? 'Sending…' : 'Send message →'}
                </button>
                {error && <p style={{ color: '#ff8888', fontSize: 13, marginTop: 12 }}>{error}</p>}
                <p style={{ fontSize: 12, color: 'var(--ink-dim)', textAlign: 'center', marginTop: 16 }}>
                  Or email us at <a href="mailto:info@anveshakhub.com" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>info@anveshakhub.com</a>
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 16px' }}>
                <div style={{
                  width: 64, height: 64,
                  borderRadius: 999,
                  background: 'rgba(200,150,62,0.15)',
                  border: '1px solid var(--gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: 28,
                  color: 'var(--gold)',
                }}>✓</div>
                <h4 className="display" style={{ fontSize: 28, color: 'var(--ink)', marginBottom: 8 }}>Thank you.</h4>
                <p style={{ color: 'var(--ink-mute)', fontSize: 14 }}>We'll be in touch within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 540px) {
          .cta-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Field({ name, label, placeholder, type = 'text', required, textarea }) {
  const [focus, setFocus] = useState(false);
  const Cmp = textarea ? 'textarea' : 'input';
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: 'block',
        fontFamily: 'var(--mono)',
        fontSize: 10,
        letterSpacing: '0.2em',
        color: focus ? 'var(--gold)' : 'var(--ink-dim)',
        textTransform: 'uppercase',
        marginBottom: 8,
        transition: 'color 0.2s',
      }}>{label}{required && <span style={{ color: 'var(--gold)' }}> *</span>}</label>
      <Cmp
        name={name}
        type={textarea ? undefined : type}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        rows={textarea ? 4 : undefined}
        style={{
          width: '100%',
          padding: '12px 0',
          background: 'transparent',
          border: 'none',
          borderBottom: focus ? '1px solid var(--gold)' : '1px solid var(--line-strong)',
          color: 'var(--ink)',
          fontSize: 15,
          fontFamily: 'var(--sans)',
          outline: 'none',
          transition: 'border-color 0.2s',
          resize: textarea ? 'vertical' : 'none',
        }}
      />
    </div>
  );
}

