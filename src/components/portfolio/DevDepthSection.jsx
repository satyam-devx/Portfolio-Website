import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Globe, Code2, Layers, BarChart3 } from 'lucide-react';

const techChoices = [
  {
    icon: Layers,
    title: 'Multi-layer Rendering',
    desc: 'WebGL shader → Canvas 2D particles → React Three Fiber → DOM UI. Each layer has a purpose and runs on its own compositing layer.',
    color: '#00f5ff',
  },
  {
    icon: Zap,
    title: 'Zero-jank Animations',
    desc: 'All animations run on GPU-accelerated properties: transform, opacity. No layout thrashing. requestAnimationFrame loops separated from React render cycles.',
    color: '#9b5de5',
  },
  {
    icon: Code2,
    title: 'Custom GLSL Shaders',
    desc: 'The background is a live-compiled fragment shader using simplex noise with mouse-driven ripple distortion — zero CPU cost after initialization.',
    color: '#4361ee',
  },
  {
    icon: Globe,
    title: 'Font-aware Canvas',
    desc: 'Particle name waits for document.fonts.ready before sampling pixels — preventing zero-width canvas errors on first paint.',
    color: '#f72585',
  },
  {
    icon: Cpu,
    title: 'Deferred Hydration',
    desc: 'Heavy 3D assets (React Three Fiber, particle systems) load only after the loading screen completes, keeping TTI fast.',
    color: '#00f5ff',
  },
  {
    icon: BarChart3,
    title: 'Spring Physics',
    desc: 'Every particle uses spring force equations (attraction + damping) instead of linear tweens — making motion feel physically real.',
    color: '#9b5de5',
  },
];

function LiveFPS() {
  const [fps, setFps] = useState(60);
  const frameRef = useRef(0);
  const lastRef = useRef(0); // Fixed: Initialized with 0 instead of performance.now()

  useEffect(() => {
    lastRef.current = performance.now(); // Fixed: Set value after component mounts
    let rafId;
    const tick = () => {
      frameRef.current++;
      const now = performance.now();
      if (now - lastRef.current >= 1000) {
        setFps(frameRef.current);
        frameRef.current = 0;
        lastRef.current = now;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const color = fps >= 55 ? '#4ade80' : fps >= 30 ? '#facc15' : '#f87171';

  return <span style={{ color }} className="font-orbitron text-2xl font-black tabular-nums">{fps}</span>;
}

export default function DevDepthSection() {
  const [loadTime, setLoadTime] = useState(0); // Fixed: Initialized with 0

  useEffect(() => {
    // Fixed: Calculate performance.now() only on the client-side
    setLoadTime(Math.round(performance.now()));
  }, []);

  return (
    <section className="relative py-36 px-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(67,97,238,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-blue-400 tracking-widest">//</span>
          <span className="font-mono text-xs text-blue-400/60 tracking-widest uppercase">Under the Hood</span>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-400/20 to-transparent" />
          <span className="font-mono text-xs text-white/20">07</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="font-orbitron text-4xl md:text-5xl font-black mb-4">
          Engineering <span className="gradient-text">Depth</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-space text-white/35 mb-16 max-w-xl"
        >
          This portfolio itself is a technical statement. Here's what's running under the surface.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Live FPS', value: <LiveFPS />, sub: 'render loop' },
            { label: 'Load Time', value: <span className="font-orbitron text-2xl font-black text-cyan-400">{loadTime}ms</span>, sub: 'time to interactive' },
            { label: 'Render Layers', value: <span className="font-orbitron text-2xl font-black text-purple-400">4</span>, sub: 'WebGL + Canvas + R3F + DOM' },
            { label: 'Particles', value: <span className="font-orbitron text-2xl font-black" style={{ color: '#f72585' }}>30k+</span>, sub: 'forming your name' },
          ].map(({ label, value, sub }) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-5 text-center">
              {value}
              <div className="font-orbitron text-xs text-white/70 mt-1">{label}</div>
              <div className="font-mono text-[10px] text-white/25 mt-0.5">{sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {techChoices.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card rounded-2xl p-5 group relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(ellipse at top left, ${item.color}08, transparent 70%)` }}
                />
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  <Icon size={16} style={{ color: item.color }} />
                </div>
                <div className="font-orbitron text-sm font-bold text-white mb-2">
                  {item.title}
                </div>
                <div className="font-space text-xs text-white/40 leading-relaxed">
                  {item.desc}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
