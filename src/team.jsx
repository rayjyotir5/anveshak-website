// Team — compact portraits with text alongside; portraits capped to image native size
const { useState } = React;

const TEAM = [
  {
    name: 'Tejaswini',
    role: 'Technical & Engineering Leadership',
    bio: 'Deep technical, delivery, and leadership experience from global organizations such as NXP Semiconductors, Harman, and Wipro. Shaping a research-led, engineering-driven innovation partner.',
    img: 'img/team-tejaswini.jpg',
    initial: 'T',
  },
  {
    name: 'Rathika Rani Ponnusamy',
    role: 'Industry Interface & Business Transformation',
    bio: "Anchors Anveshak Hub's industry interface, structuring transformation initiatives that convert operational challenges into execution-ready, commercially grounded outcomes.",
    img: 'img/team-rathika.jpg',
    initial: 'R',
  },
  {
    name: 'Dr. Prakruthi Hareesh',
    role: 'Applied Research & Knowledge Systems',
    bio: 'Leads applied research frameworks and knowledge systems that translate insights into high-value outcomes aligned with strategic priorities and long-term competitiveness.',
    img: 'img/team-prakruthi.jpg',
    initial: 'P',
  },
];

function Team() {
  return (
    <section id="team" style={{
      padding: '160px 0',
      background: 'var(--bg)',
      borderTop: '1px solid var(--line)',
    }}>
      <div className="container">
        <div style={{ marginBottom: 72, maxWidth: 760 }}>
          <span className="eyebrow">Leadership</span>
          <h2 className="display" style={{
            fontSize: 'clamp(40px, 5vw, 72px)',
            marginTop: 28,
            color: 'var(--ink)',
          }}>
            Built by people who've <em>shipped.</em>
          </h2>
          <p className="body-copy" style={{ marginTop: 24 }}>
            Visionary leaders driving Anveshak Hub's mission to bridge innovation,
            enterprise, and academia.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          {TEAM.map((t, i) => <TeamRow key={t.name} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function TeamRow({ t, i }) {
  const [hover, setHover] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="team-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '240px 80px 1fr',
        gap: 0,
        alignItems: 'start',
        padding: '40px 0',
        borderTop: i === 0 ? '1px solid var(--line-strong)' : 'none',
        borderBottom: '1px solid var(--line-strong)',
      }}
    >
      {/* Portrait — capped at native res, max 240px wide */}
      <div style={{
        width: 240,
        maxWidth: '100%',
        aspectRatio: '5/6',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--navy)',
        position: 'relative',
      }}>
        {!imgErr ? (
          <img
            src={t.img}
            alt={t.name}
            loading="lazy"
            onError={() => setImgErr(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: hover ? 'grayscale(0%) brightness(0.95)' : 'grayscale(45%) brightness(0.85)',
              transform: hover ? 'scale(1.03)' : 'scale(1)',
              transition: 'filter 0.5s, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--navy)',
            fontFamily: 'var(--serif)',
            fontSize: 96,
            color: 'var(--gold)',
          }}>{t.initial}</div>
        )}
      </div>

      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: 11,
        color: 'var(--gold)',
        letterSpacing: '0.15em',
        paddingTop: 8,
        textAlign: 'center',
      }}>
        0{i + 1}
      </div>

      <div style={{ paddingTop: 4 }}>
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.25em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>{t.role}</div>
        <h3 className="display" style={{
          fontSize: 'clamp(32px, 3.6vw, 52px)',
          color: 'var(--ink)',
          marginBottom: 18,
          letterSpacing: '-0.01em',
          lineHeight: 1.05,
        }}>{t.name}</h3>
        <p style={{
          fontSize: 15,
          color: 'var(--ink-mute)',
          lineHeight: 1.65,
          maxWidth: 560,
        }}>{t.bio}</p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .team-row { grid-template-columns: 140px 1fr !important; gap: 24px !important; }
          .team-row > :nth-child(2) { display: none !important; }
        }
        @media (max-width: 480px) {
          .team-row { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
}

window.Team = Team;
