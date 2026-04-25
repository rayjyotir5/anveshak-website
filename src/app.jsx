// App root
const { useState } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "intensity": 1,
  "showCursor": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = window.useTweaks
    ? window.useTweaks(TWEAK_DEFAULTS)
    : [TWEAK_DEFAULTS, () => {}];

  return (
    <>
      {tweaks.showCursor && <window.CursorTracker />}
      <window.Navbar />
      <main>
        <window.Hero intensity={tweaks.intensity} />
        <window.Stats />
        <window.Services />
        <window.Impact />
        <window.About />
        <window.Team />
        <window.Partners />
        <window.CTA />
      </main>
      <window.Footer />

      {window.TweaksPanel && (
        <window.TweaksPanel>
          <window.TweakSection title="Hero motion">
            <window.TweakSlider label="Network intensity"
              value={tweaks.intensity}
              min={0.3} max={1.6} step={0.1}
              onChange={(v) => setTweak('intensity', v)} />
          </window.TweakSection>
          <window.TweakSection title="Cursor">
            <window.TweakToggle label="Custom cursor (desktop)"
              value={tweaks.showCursor}
              onChange={(v) => setTweak('showCursor', v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
