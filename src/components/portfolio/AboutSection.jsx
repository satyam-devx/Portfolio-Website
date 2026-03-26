import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Globe, Brain, Code2 } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const traits = [
  { icon: Code2, label: 'Precision', desc: 'Every line of code is intentional.', color: '#00f5ff' },
  { icon: Brain, label: 'Vision', desc: 'Thinking three moves ahead.', color: '#9b5de5' },
  { icon: Zap, label: 'Execution', desc: 'Ideas shipped fast and flawlessly.', color: '#4361ee' },
  { icon: Globe, label: 'Impact', desc: 'Building for the next billion.', color: '#f72585' },
];

// Distortion text effect on hover
function DistortText({ children, className }) {
  const ref = useRef(null);

  const scramble = () => {
    const el = ref.current;
    if (!el) return;
    const original = el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
    let iter = 0;
    const iv = setInterval(() => {
      el.textContent = original.split('').map((c, i) =>
        i < iter ? original[i] : c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
      ).join('');
      if (iter >= original.length) { clearInterval(iv); el.textContent = original; }
      iter += 0.4;
    }, 30);
  };

  return (
    <span ref={ref} className={className} onMouseEnter={scramble}>
      {children}
    </span>
  );
}

export default function AboutSection() {
  const headingRef = useScrollReveal({ threshold: 0.2 });
  const textRef = useScrollReveal({ threshold: 0.1, delay: 0.2 });

  return (
    <section id="about" className="relative py-36 px-6">
      {/* Side glow */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(155,93,229,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-cyan-400 tracking-widest">//</span>
          <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">About</span>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/20 to-transparent" />
          <span className="font-mono text-xs text-white/20">01</span>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <h2 ref={headingRef} className="font-orbitron text-4xl md:text-5xl font-black mb-8 leading-tight">
            I Don’t Write Code.
            <br />
            <DistortText className="gradient-text">I Build Futures.</DistortText>
          </h2>

          <div ref={textRef} className="space-y-5 font-space text-white/55 leading-relaxed text-[15px]">
            <p>
                I'm <span className="text-cyan-400 font-semibold">Satyam</span> — a full-stack developer who lives at the intersection of precision engineering and creative obsession. While others ship features, I architect experiences that leave users in awe.
            </p>
            <p>
                Every system I build carries intent. Every pixel, every function, every interaction — crafted with <span className="text-white/90">surgical precision</span>. I don't follow trends. I identify where technology is heading and build there — before anyone else does.
            </p>
            <p>
                Right now, I'm deep in development on something with the potential to <span className="text-purple-400 font-semibold">fundamentally reshape how humans interact with software</span> at a global scale.
            </p>
            <p className="font-mono text-xs text-cyan-400/50 border-l-2 border-cyan-400/30 pl-4 italic">
              "The best time to build the future was yesterday. The second best time is now."
            </p>
          </div>
        </div>

        {/* Traits grid */}
        <div className="grid grid-cols-2 gap-4">
          {traits.map(({ icon: TraitIcon, label, desc, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="glass-card rounded-2xl p-5 cursor-default group relative overflow-hidden"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >

              {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 30% 30%, ${color}10, transparent 70%)` }} />

              <div className="relative z-10">
                  <div className="mb-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <TraitIcon size={18} style={{ color }} />
                </div>
                <div className="font-orbitron text-sm font-bold text-white mb-1">{label}</div>
                <div className="font-space text-xs text-white/40">{desc}</div>
              </div>
            </motion.div>
          ))}
          
          {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="col-span-2 glass-card rounded-2xl p-5 flex justify-around"
        >
          {[
            { val: '3+', label: 'Years Building' },
            { val: '20+', label: 'Projects Shipped' },
            { val: '∞', label: 'Ambition Level' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center group cursor-default">
                  <DistortText className="font-orbitron text-2xl font-black gradient-text block">{val}</DistortText>
              <div className="font-mono text-xs text-white/35 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </div>
</section>
);
}
