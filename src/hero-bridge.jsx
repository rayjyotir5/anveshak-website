// 3D Bridge / Network metaphor — Industry ↔ Academia
// Two clusters of nodes connected by luminous threads, projected from 3D
import { useEffect, useRef } from 'react';

export default function HeroBridge({ intensity = 1, mode = 'bridge' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let raf;
    let t0 = performance.now();

    // Build two node clusters: left (Industry) + right (Academia)
    const buildNodes = () => {
      const nodes = [];
      const NL = 22, NR = 22;
      // Left cluster — distributed in a hemisphere on the left
      for (let i = 0; i < NL; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 0.55 + Math.random() * 0.35;
        nodes.push({
          x: -1.4 + Math.sin(phi) * Math.cos(theta) * r * 0.7,
          y: Math.cos(phi) * r * 0.9,
          z: Math.sin(phi) * Math.sin(theta) * r * 0.6,
          side: 'L',
          size: 0.6 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.4 + Math.random() * 0.6,
        });
      }
      for (let i = 0; i < NR; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 0.55 + Math.random() * 0.35;
        nodes.push({
          x: 1.4 + Math.sin(phi) * Math.cos(theta) * r * 0.7,
          y: Math.cos(phi) * r * 0.9,
          z: Math.sin(phi) * Math.sin(theta) * r * 0.6,
          side: 'R',
          size: 0.6 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.4 + Math.random() * 0.6,
        });
      }
      // Bridge nodes — chain across center
      const bridgeCount = 9;
      for (let i = 0; i < bridgeCount; i++) {
        const tt = (i + 1) / (bridgeCount + 1);
        nodes.push({
          x: -1.4 + tt * 2.8,
          y: Math.sin(tt * Math.PI) * 0.15 + (Math.random() - 0.5) * 0.1,
          z: Math.cos(tt * Math.PI * 2) * 0.05,
          side: 'B',
          size: 1.0 + Math.random() * 0.6,
          phase: i * 0.4,
          pulseSpeed: 0.6 + Math.random() * 0.4,
        });
      }
      return nodes;
    };

    let nodes = buildNodes();

    // Build connections: within-cluster + a few cross-bridge threads
    const buildEdges = () => {
      const edges = [];
      const left = nodes.filter(n => n.side === 'L');
      const right = nodes.filter(n => n.side === 'R');
      const bridge = nodes.filter(n => n.side === 'B');

      // Within left
      left.forEach((a, i) => {
        const closest = left.map((b, j) => ({ b, j, d: dist3(a, b) }))
          .filter(x => x.j !== i).sort((x, y) => x.d - y.d).slice(0, 3);
        closest.forEach(({ b }) => edges.push({ a, b, kind: 'L' }));
      });
      right.forEach((a, i) => {
        const closest = right.map((b, j) => ({ b, j, d: dist3(a, b) }))
          .filter(x => x.j !== i).sort((x, y) => x.d - y.d).slice(0, 3);
        closest.forEach(({ b }) => edges.push({ a, b, kind: 'R' }));
      });

      // Bridge chain
      for (let i = 0; i < bridge.length - 1; i++) {
        edges.push({ a: bridge[i], b: bridge[i + 1], kind: 'B' });
      }
      // Connect clusters to bridge ends
      const leftEnd = bridge[0];
      const rightEnd = bridge[bridge.length - 1];
      const leftClose = left.map(b => ({ b, d: dist3(leftEnd, b) })).sort((x, y) => x.d - y.d).slice(0, 4);
      const rightClose = right.map(b => ({ b, d: dist3(rightEnd, b) })).sort((x, y) => x.d - y.d).slice(0, 4);
      leftClose.forEach(({ b }) => edges.push({ a: leftEnd, b, kind: 'X' }));
      rightClose.forEach(({ b }) => edges.push({ a: rightEnd, b, kind: 'X' }));

      return edges;
    };

    function dist3(a, b) {
      const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    let edges = buildEdges();

    // Data packets that travel along edges
    const packets = [];
    function spawnPacket() {
      if (packets.length > 14) return;
      const e = edges[Math.floor(Math.random() * edges.length)];
      packets.push({ edge: e, t: 0, speed: 0.005 + Math.random() * 0.01 });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onTouch = (e) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = ((e.touches[0].clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.ty = ((e.touches[0].clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });

    const onScroll = () => {
      scrollRef.current = Math.min(1, window.scrollY / window.innerHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Project a 3D point to 2D
    function project(x, y, z, rotY, rotX) {
      // rotate Y
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      let X = x * cosY + z * sinY;
      let Z = -x * sinY + z * cosY;
      // rotate X
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      let Y = y * cosX - Z * sinX;
      Z = y * sinX + Z * cosX;
      const dist = 5;
      const fov = Math.min(w, h) * 0.55;
      const f = fov / (dist + Z);
      return {
        x: X * f + w / 2,
        y: Y * f + h / 2,
        scale: f / fov,
        z: Z,
      };
    }

    function draw(now) {
      const t = (now - t0) / 1000;
      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.06;

      const baseRotY = t * 0.08 + mouseRef.current.x * 0.6;
      const baseRotX = mouseRef.current.y * 0.3 + scrollRef.current * 0.2;

      // Clear with subtle gradient bg
      ctx.fillStyle = '#08101F';
      ctx.fillRect(0, 0, w, h);

      // Vignette glow
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
      grad.addColorStop(0, 'rgba(27, 42, 74, 0.35)');
      grad.addColorStop(0.6, 'rgba(11, 18, 38, 0)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Project all nodes
      const projected = nodes.map(n => {
        const p = project(n.x, n.y, n.z, baseRotY, baseRotX);
        return { ...n, ...p };
      });

      // Sort edges by avg z (back to front)
      const projectedEdges = edges.map(e => {
        const aP = projected[nodes.indexOf(e.a)];
        const bP = projected[nodes.indexOf(e.b)];
        return { ...e, aP, bP, avgZ: (aP.z + bP.z) / 2 };
      }).sort((a, b) => a.avgZ - b.avgZ);

      // Draw edges
      projectedEdges.forEach(e => {
        const { aP, bP, kind } = e;
        const depthFade = Math.max(0, Math.min(1, 1 - (e.avgZ + 1) * 0.4));
        let color, lineW;
        if (kind === 'B' || kind === 'X') {
          // bridge — gold
          color = `rgba(200, 150, 62, ${0.35 * depthFade * intensity})`;
          lineW = 1.0 * intensity;
        } else {
          color = `rgba(165, 180, 220, ${0.12 * depthFade * intensity})`;
          lineW = 0.6;
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = lineW;
        ctx.beginPath();
        ctx.moveTo(aP.x, aP.y);
        ctx.lineTo(bP.x, bP.y);
        ctx.stroke();
      });

      // Draw packets
      if (Math.random() < 0.18 * intensity) spawnPacket();
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        if (p.t >= 1) { packets.splice(i, 1); continue; }
        const aP = projected[nodes.indexOf(p.edge.a)];
        const bP = projected[nodes.indexOf(p.edge.b)];
        const x = aP.x + (bP.x - aP.x) * p.t;
        const y = aP.y + (bP.y - aP.y) * p.t;
        const isBridge = p.edge.kind === 'B' || p.edge.kind === 'X';
        ctx.fillStyle = isBridge ? `rgba(224, 176, 86, 0.95)` : `rgba(255,255,255,0.7)`;
        ctx.beginPath();
        ctx.arc(x, y, isBridge ? 2.2 : 1.6, 0, Math.PI * 2);
        ctx.fill();
        // glow
        ctx.fillStyle = isBridge ? `rgba(224, 176, 86, 0.18)` : `rgba(255,255,255,0.1)`;
        ctx.beginPath();
        ctx.arc(x, y, isBridge ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes (sorted)
      const sortedNodes = [...projected].sort((a, b) => a.z - b.z);
      sortedNodes.forEach(n => {
        const depthFade = Math.max(0.25, Math.min(1, 1 - (n.z + 1) * 0.35));
        const pulse = 0.6 + 0.4 * Math.sin(t * n.pulseSpeed * 2 + n.phase);
        const r = n.size * 1.6 * n.scale * 8 * pulse;
        const isBridge = n.side === 'B';

        // glow
        const gg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        if (isBridge) {
          gg.addColorStop(0, `rgba(224, 176, 86, ${0.6 * depthFade})`);
          gg.addColorStop(1, `rgba(224, 176, 86, 0)`);
        } else {
          gg.addColorStop(0, `rgba(180, 195, 235, ${0.35 * depthFade})`);
          gg.addColorStop(1, `rgba(180, 195, 235, 0)`);
        }
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = isBridge
          ? `rgba(245, 220, 160, ${0.95 * depthFade})`
          : `rgba(220, 230, 255, ${0.85 * depthFade})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Cluster labels (faint, dynamic)
      ctx.font = '500 10px JetBrains Mono, monospace';
      ctx.fillStyle = 'rgba(165, 180, 220, 0.4)';
      ctx.textAlign = 'center';
      const lp = project(-1.6, -1.05, 0, baseRotY, baseRotX);
      const rp = project(1.6, -1.05, 0, baseRotY, baseRotX);
      ctx.fillText('INDUSTRY', lp.x, lp.y);
      ctx.fillText('ACADEMIA', rp.x, rp.y);

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('scroll', onScroll);
    };
  }, [intensity, mode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
