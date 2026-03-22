import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { CheckCircle, RotateCcw } from 'lucide-react';

// ── Generate anomaly grid ─────────────────────────────────────────────
// Normal values: integers in a tight band (42–68)
// Anomaly: one value wildly outside (like 9,841 or 0.003 or -512)
const ANOMALIES = [9847, -312, 0.007, 4829, -99.5, 8001, 0.0012, 3726, -404, 7777];

function generateGrid() {
  const TOTAL = 48; // 8 × 6
  const normalMin = 42, normalMax = 68;
  const anomalyIdx = Math.floor(Math.random() * TOTAL);
  const anomalyVal = ANOMALIES[Math.floor(Math.random() * ANOMALIES.length)];

  const cells = Array.from({ length: TOTAL }, (_, i) => {
    if (i === anomalyIdx) return { id: i, value: anomalyVal, isAnomaly: true };
    const v = Math.floor(Math.random() * (normalMax - normalMin + 1)) + normalMin;
    return { id: i, value: v, isAnomaly: false };
  });
  return cells;
}

// ── Scanline flicker overlay ──────────────────────────────────────────
function Scanlines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] opacity-[0.04]"
      style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.8) 2px,rgba(0,0,0,0.8) 4px)' }}
    />
  );
}

// ── Particle Canvas ───────────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let id;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
      r: Math.random() * 1.3 + .3, a: Math.random() * .3 + .08,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(198,255,0,${.1 * (1 - d / 110)})`;
            ctx.lineWidth = .4;
            ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198,255,0,${pts[i].a})`; ctx.fill();
        pts[i].x += pts[i].vx; pts[i].y += pts[i].vy;
        if (pts[i].x < 0 || pts[i].x > W) pts[i].vx *= -1;
        if (pts[i].y < 0 || pts[i].y > H) pts[i].vy *= -1;
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    const onR = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener('resize', onR);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', onR); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

// ── Main Landing ──────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate();
  const [cells, setCells] = useState(() => generateGrid());
  const [status, setStatus] = useState('idle'); // idle | wrong | won
  const [wrongId, setWrongId] = useState(null);
  const [exiting, setExiting] = useState(false);
  const [hint, setHint] = useState(false);

  // Mouse glow
  const mx = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 600);
  const my = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400);
  const bX = useSpring(mx, { damping: 28, stiffness: 80 });
  const bY = useSpring(my, { damping: 28, stiffness: 80 });
  useEffect(() => {
    const m = e => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, [mx, my]);

  const handleClick = useCallback((cell) => {
    if (status !== 'idle') return;
    if (cell.isAnomaly) {
      setStatus('won');
      setTimeout(() => { setExiting(true); setTimeout(() => navigate('/home'), 700); }, 1200);
    } else {
      setWrongId(cell.id);
      setStatus('wrong');
      setTimeout(() => { setStatus('idle'); setWrongId(null); }, 800);
    }
  }, [status, navigate]);

  const reset = () => { setCells(generateGrid()); setStatus('idle'); setWrongId(null); setHint(false); };

  // Format display value to keep layout tight
  const fmt = (v) => {
    if (typeof v === 'number' && !Number.isInteger(v)) return v.toFixed(4);
    return String(v);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.65 }}
          className="relative w-full min-h-screen bg-[#07070a] text-white overflow-hidden flex flex-col items-center justify-center px-4 py-10"
        >
          <ParticleCanvas />
          <Scanlines />

          {/* Mouse glow */}
          <motion.div className="pointer-events-none fixed z-[1] rounded-full"
            style={{ left: bX, top: bY, width: 420, height: 420, transform: 'translate(-50%,-50%)',
              background: 'radial-gradient(circle,rgba(198,255,0,0.06) 0%,transparent 70%)', filter: 'blur(40px)' }}
          />
          <div className="pointer-events-none fixed inset-0 z-0">
            <div className="absolute top-[-8%] left-[-5%] w-[38rem] h-[38rem] rounded-full bg-orange-600/8 blur-[110px]" />
            <div className="absolute bottom-[-8%] right-[-5%] w-[32rem] h-[32rem] rounded-full bg-indigo-700/8 blur-[110px]" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-6 text-center">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <p className="text-[10px] font-black tracking-[0.45em] text-[#c6ff00]/50 uppercase mb-2">Amulya Putta · Portfolio</p>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter"
                style={{ background: 'linear-gradient(135deg,#fff 40%,#555)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                🔍 Spot the Anomaly
              </h1>
              <p className="text-gray-500 text-sm mt-2 font-medium max-w-md mx-auto leading-relaxed">
                Data Analysts detect outliers in the wild.<br />
                <span className="text-gray-400">Find the one value that doesn't belong — click it to enter.</span>
              </p>
            </motion.div>

            {/* Status bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex items-center gap-4 text-xs font-mono text-gray-600">
              <span>dataset: <span className="text-[#c6ff00]">portfolio_v1.csv</span></span>
              <span>|</span>
              <span>rows: <span className="text-white">48</span></span>
              <span>|</span>
              <span>anomalies: <span className="text-red-400">1</span></span>
            </motion.div>

            {/* Data Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full p-4 rounded-2xl border border-white/8 bg-[#0d0d10]/80 backdrop-blur-sm shadow-2xl"
            >
              <div className="grid grid-cols-8 gap-1.5">
                {cells.map((cell) => {
                  const isWrong = cell.id === wrongId;
                  const isWon = status === 'won' && cell.isAnomaly;
                  return (
                    <motion.button
                      key={cell.id}
                      onClick={() => handleClick(cell)}
                      whileHover={{ scale: 1.12, backgroundColor: 'rgba(198,255,0,0.08)' }}
                      whileTap={{ scale: 0.93 }}
                      animate={isWrong ? { x: [-4, 4, -4, 4, 0] } : isWon ? { scale: [1, 1.2, 1], backgroundColor: 'rgba(198,255,0,0.2)' } : {}}
                      transition={{ duration: 0.3 }}
                      className={`
                        rounded-lg py-2 px-1 text-center font-mono text-[11px] md:text-xs font-semibold
                        border transition-colors duration-150 select-none
                        ${isWon
                          ? 'border-[#c6ff00]/60 bg-[#c6ff00]/15 text-[#c6ff00]'
                          : isWrong
                            ? 'border-red-400/50 bg-red-400/10 text-red-400'
                            : 'border-white/5 bg-white/2 text-gray-400 hover:text-white hover:border-white/15'
                        }
                      `}
                    >
                      {fmt(cell.value)}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Feedback */}
            <AnimatePresence mode="wait">
              {status === 'won' && (
                <motion.div key="won" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-[#c6ff00] font-bold text-sm">
                  <CheckCircle size={18} className="drop-shadow-[0_0_8px_#c6ff00]" />
                  Anomaly detected! Entering portfolio…
                </motion.div>
              )}
              {status === 'wrong' && (
                <motion.div key="wrong" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-red-400 text-sm font-semibold">
                  ✗ That's a normal value. Keep scanning…
                </motion.div>
              )}
              {status === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center gap-5">
                  <button onClick={reset}
                    className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-white transition-colors font-semibold tracking-wider uppercase">
                    <RotateCcw size={12} /> New Dataset
                  </button>
                  <button onClick={() => setHint(h => !h)}
                    className="text-xs text-gray-600 hover:text-[#c6ff00] transition-colors font-semibold tracking-wider uppercase">
                    {hint ? '▲ Hide Hint' : '? Hint'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint */}
            <AnimatePresence>
              {hint && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-gray-500 font-mono bg-white/3 border border-white/8 px-4 py-2 rounded-lg">
                  💡 Hint: All normal values fall between <span className="text-white">42</span> and <span className="text-white">68</span>. The anomaly is outside this range.
                </motion.p>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
