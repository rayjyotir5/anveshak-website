// App root
import CursorTracker from './cursor.jsx';
import Navbar from './navbar.jsx';
import Hero from './hero.jsx';
import Stats from './stats.jsx';
import Services from './services.jsx';
import Impact from './impact.jsx';
import About from './about.jsx';
import Team from './team.jsx';
import Partners from './partners.jsx';
import CTA from './cta.jsx';
import Footer from './footer.jsx';
import {
  useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakToggle,
} from './tweaks-panel.jsx';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "intensity": 1,
  "showCursor": true
}/*EDITMODE-END*/;

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <>
      {tweaks.showCursor && <CursorTracker />}
      <Navbar />
      <main>
        <Hero intensity={tweaks.intensity} />
        <Stats />
        <Services />
        <Impact />
        <About />
        <Team />
        <Partners />
        <CTA />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection title="Hero motion">
          <TweakSlider label="Network intensity"
            value={tweaks.intensity}
            min={0.3} max={1.6} step={0.1}
            onChange={(v) => setTweak('intensity', v)} />
        </TweakSection>
        <TweakSection title="Cursor">
          <TweakToggle label="Custom cursor (desktop)"
            value={tweaks.showCursor}
            onChange={(v) => setTweak('showCursor', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}
