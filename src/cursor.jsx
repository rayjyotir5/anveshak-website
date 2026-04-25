// Custom cursor with magnetic hover effect
import { useEffect } from 'react';

export default function CursorTracker() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = (e) => {
      const t = e.target;
      if (!t || !t.matches) return;
      if (t.matches('a, button, input, textarea, .magnetic, [data-cursor]')) {
        ring.style.width = '52px';
        ring.style.height = '52px';
        ring.style.borderColor = 'rgba(200, 150, 62, 0.9)';
        dot.style.width = '4px';
        dot.style.height = '4px';
      }
    };
    const onLeave = (e) => {
      const t = e.target;
      if (!t || !t.matches) return;
      if (t.matches('a, button, input, textarea, .magnetic, [data-cursor]')) {
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.borderColor = 'rgba(200, 150, 62, 0.5)';
        dot.style.width = '6px';
        dot.style.height = '6px';
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
