import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETTERS = ['S', 'A', 'T', 'Y', 'A', 'M'];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');
  const [activeLetter, setActiveLetter] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('done'), 500);
          setTimeout(() => onComplete?.(), 1100);
          return 100;
        }
        return Math.min(prev + Math.random() * 6 + 2, 100);
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveLetter(i => (i + 1) % LETTERS.length);
    }, 120);
    return () => clearInterval(t);
  }, []);

  // WebGL noise on loading canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 4;
    let rafId;
    let t = 0;

    const draw = () => {
      t += 0.05;
      ctx.clearRect(0, 0, 400, 4);

      const grad = ctx.createLinearGradient(0, 0, 400, 0);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.3 + Math.sin(t) * 0.1, '#00f5ff');
      grad.addColorStop(0.5 + Math.cos(t * 0.7) * 0.1, '#9b5de5');
      grad.addColorStop(0.7 + Math.sin(t * 1.3) * 0.1, '#4361ee');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 400 * Math.min(progress / 100, 1), 4);

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [progress]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: '#030308' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >

          {/* Noise grid */}
          <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

          {/* Radial pulse */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,245,255,0.04) 0%, transparent 60%)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          />

          <div className="relative flex flex-col items-center gap-10">

            {/* 3D rotating rings (CSS) */}
            <div className="relative w-36 h-36 flex items-center justify-center" style={{ perspective: '400px' }}>
              <div
                className="absolute inset-0 rounded-full border border-cyan-400/40"
                style={{ animation: 'rotate-slow 3s linear infinite', transformStyle: 'preserve-3d', transform: 'rotateX(60deg)' }}
              />
              <div
                className="absolute inset-3 rounded-full border border-purple-500/30"
                style={{ animation: 'rotate-slow 2s linear infinite reverse', transformStyle: 'preserve-3d', transform: 'rotateY(60deg)' }}
              />
              <div
                className="absolute inset-6 rounded-full border border-blue-400/20"
                style={{ animation: 'rotate-slow 4s linear infinite', transformStyle: 'preserve-3d' }}
              />

              {/* Pulsing core */}
              <div
                className="w-10 h-10 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #00f5ff, #9b5de5)',
                  boxShadow: '0 0 30px #00f5ff, 0 0 60px rgba(0,245,255,0.4)',
                  animation: 'pulse-glow 1.5s ease-in-out infinite',
                }}
              />
            </div>

            {/* Letter-by-letter name reveal */}
            <div className="flex gap-2">
              {LETTERS.map((l, i) => (
                <span
                  key={i}
                  className="font-orbitron text-4xl font-black tracking-wider transition-all duration-150"
                  style={{
                    color:
                      i === activeLetter
                        ? '#00f5ff'
                        : i < activeLetter || progress > (i / LETTERS.length) * 100
                        ? 'white'
                        : 'rgba(255,255,255,0.15)',
                    textShadow:
                      i === activeLetter
                        ? '0 0 20px #00f5ff, 0 0 40px rgba(0,245,255,0.6)'
                        : 'none',
                    transform: i === activeLetter ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                >
                  {l}
                </span>
              ))}
            </div>

            {/* Animated noise bar */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: 'pixelated' }} />
              </div>
              <div className="flex items-center gap-3">
                <div className="font-mono text-xs text-white/30">BOOTING SYSTEM</div>
                <div className="font-orbitron text-xs text-cyan-400 tabular-nums">
                  {Math.floor(Math.min(progress, 100)).toString().padStart(3, '0')}%
                </div>
              </div>
            </div>

            {/* Log lines */}
            <div className="font-mono text-xs text-white/15 space-y-1 text-left w-64">
              {[
                'Loading WebGL context...',
                'Compiling GLSL shaders...',
                'Spawning particle system...',
                'Mounting React Three Fiber...',
                'Initializing Framer Motion...',
              ].map((line, i) => (
                <div
                  key={i}
                  style={{ opacity: progress > i * 20 ? 1 : 0, transition: 'opacity 0.4s' }}
                  className="flex gap-2"
                >
                  <span className="text-cyan-400/40">{'>'}</span>
                  {line}
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
