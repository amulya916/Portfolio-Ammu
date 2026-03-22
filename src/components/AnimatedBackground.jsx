import React, { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Configuration ───────────────────────────────────────────────
    const PARTICLE_COUNT = 450;
    const G = 0.04; 
    const REPEL_RADIUS = 120;
    const REPEL_STRENGTH = 0.4;

    // ── Insight Hubs (Attractors) ────────────────────────────────────
    const hubs = [
      { x: 0.15, y: 0.25, color: '#818cf8', mass: 120, label: 'ML' },
      { x: 0.82, y: 0.18, color: '#c6ff00', mass: 150, label: 'Analytics' },
      { x: 0.5, y: 0.72, color: '#f472b6', mass: 100, label: 'Systems' },
      { x: 0.12, y: 0.82, color: '#fbbf24', mass: 130, label: 'Insights' },
      { x: 0.88, y: 0.75, color: '#22d3ee', mass: 110, label: 'Big Data' },
    ];

    const getHubPos = (hub) => ({
      x: hub.x * window.innerWidth,
      y: hub.y * window.innerHeight
    });

    // ── Particles ───────────────────────────────────────────────────
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.4 + 0.4,
      alpha: 0.08 + Math.random() * 0.18,
    }));

    // ── Data Rocket - Logic ─────────────────────────────────────────
    const TRANSFORMS = ['CLEANING DATA', 'PROCESSING', 'FEATURE ENG', 'MODELING', 'OPTIMIZING', 'INSIGHT FOUND'];
    const rocket = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      angle: 0,
      phase: 'IDLE', // IDLE | SEEKING_DATA | SEEKING_HUB
      transformIdx: 0,
      path: [], // Previous points visited
      lastHub: null,
      speed: 2.8
    };

    const findNewTarget = () => {
      if (rocket.phase === 'SEEKING_DATA' || rocket.phase === 'IDLE') {
        // Find a random particle far enough
        const p = particles[Math.floor(Math.random() * particles.length)];
        rocket.targetX = p.x;
        rocket.targetY = p.y;
        rocket.phase = 'SEEKING_DATA';
      } else {
        // Find a new hub
        let hub;
        do {
          hub = hubs[Math.floor(Math.random() * hubs.length)];
        } while (hub === rocket.lastHub);
        const pos = getHubPos(hub);
        rocket.targetX = pos.x;
        rocket.targetY = pos.y;
        rocket.lastHub = hub;
        rocket.phase = 'SEEKING_HUB';
        rocket.transformIdx = Math.floor(Math.random() * (TRANSFORMS.length - 1));
      }
    };
    findNewTarget();

    // ── Animation Loop ─────────────────────────────────────────────
    const draw = () => {
      frame++;
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = 'rgba(10, 10, 10, 0.25)';
      ctx.fillRect(0, 0, W, H);

      // 1. Dotted Background Grid (Very faint)
      ctx.fillStyle = 'rgba(255,255,255,0.025)';
      for (let x = 0; x < W; x += 60) {
        for (let y = 0; y < H; y += 60) {
          ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill();
        }
      }

      // 2. Hubs
      hubs.forEach(hub => {
        const pos = getHubPos(hub);
        const pulse = Math.sin(frame * 0.025) * 0.1 + 0.9;
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 110 * pulse);
        grad.addColorStop(0, `${hub.color}22`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 110 * pulse, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = hub.color;
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 2.8 * pulse, 0, Math.PI * 2); ctx.fill();
        ctx.font = '700 9px monospace'; ctx.fillStyle = `${hub.color}55`; ctx.textAlign = 'center';
        ctx.fillText(hub.label.toUpperCase(), pos.x, pos.y + 24);
      });

      // 3. Particles
      particles.forEach(p => {
        hubs.forEach(hub => {
          const hPos = getHubPos(hub);
          const dx = hPos.x - p.x, dy = hPos.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 160000) {
            const dist = Math.sqrt(distSq);
            const force = (hub.mass * G) / (distSq + 150);
            p.vx += (dx / dist) * force; p.vy += (dy / dist) * force;
          }
        });
        if (mouse.current.active) {
          const dx = p.x - mouse.current.x, dy = p.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            p.vx += (dx / dist) * force; p.vy += (dy / dist) * force;
          }
        }
        p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      });

      // 4. Data Rocket - Movement & Visualization
      const dx = rocket.targetX - rocket.x;
      const dy = rocket.targetY - rocket.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 5) {
        if (rocket.phase === 'SEEKING_DATA') {
          rocket.path.push({ x: rocket.x, y: rocket.y });
          if (rocket.path.length > 5) rocket.path.shift();
          rocket.phase = 'SEEKING_HUB';
          findNewTarget();
        } else {
          rocket.path.push({ x: rocket.x, y: rocket.y });
          if (rocket.path.length > 5) rocket.path.shift();
          rocket.phase = 'SEEKING_DATA';
          findNewTarget();
        }
      }

      // Rotate toward target
      const targetAngle = Math.atan2(dy, dx);
      const angleDiff = targetAngle - rocket.angle;
      rocket.angle += angleDiff * 0.1;

      // Move rocket
      rocket.x += Math.cos(rocket.angle) * rocket.speed;
      rocket.y += Math.sin(rocket.angle) * rocket.speed;

      // Draw Rocket Trail (Paths connecting data points)
      rocket.path.forEach((pt, i) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(198,255,0, ${0.1 * (i / rocket.path.length)})`;
        ctx.lineWidth = 0.8;
        if (i > 0) ctx.moveTo(rocket.path[i-1].x, rocket.path[i-1].y);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
      });

      // Draw Rocket Shape
      ctx.save();
      ctx.translate(rocket.x, rocket.y);
      ctx.rotate(rocket.angle);
      
      // Rocket Glow
      const rGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
      rGlow.addColorStop(0, 'rgba(198,255,0,0.5)');
      rGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = rGlow;
      ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.fill();

      // Rocket Body (Triangle)
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(-6, -5);
      ctx.lineTo(-6, 5);
      ctx.closePath();
      ctx.fill();
      
      // Flame
      ctx.fillStyle = '#c6ff00';
      ctx.beginPath();
      ctx.moveTo(-6, -2); ctx.lineTo(-12, 0); ctx.lineTo(-6, 2);
      ctx.fill();
      ctx.restore();

      // Transformation Label (Flying alongside rocket)
      if (rocket.phase === 'SEEKING_HUB') {
        ctx.font = '600 10px monospace';
        ctx.fillStyle = 'rgba(198,255,0,0.7)';
        ctx.textAlign = 'left';
        ctx.fillText(`${TRANSFORMS[rocket.transformIdx]}...`, rocket.x + 15, rocket.y);
      } else {
        ctx.font = '500 9px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.textAlign = 'left';
        ctx.fillText('SCANNING DATA...', rocket.x + 15, rocket.y);
      }

      // 5. Global Vignette
      const vGrad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W/0.75);
      vGrad.addColorStop(0, 'rgba(10,10,10,0)');
      vGrad.addColorStop(1, 'rgba(10,10,10,0.85)');
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 0, background: '#0a0a0a'
      }}
    />
  );
}
