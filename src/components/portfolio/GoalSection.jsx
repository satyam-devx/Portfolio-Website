import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Rocket, Infinity } from 'lucide-react';

export default function GoalSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add('visible');
    }, { threshold: 0.1 });
    
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Animated bg gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(185,85,229,0.06) 0%, transparent 60%)' }}
      />

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute h-px w-full"
               style={{
                 top: `${20 + i * 15}%`,
                 background: `linear-gradient(90deg, transparent, rgba(0,245,255,${0.01 + i * 0.008}), transparent)`
               }}
          />
        ))}
      </div>

      <div ref={sectionRef} className="section-reveal max-w-4xl mx-auto text-center">
        <div className="flex items-center gap-4 mb-12 justify-center">
          <div className="flex-1 h-px bg-white/5 max-w-[100px]" />
          <span className="font-mono text-xs text-purple-400/80 tracking-widest uppercase">Mission</span>
          <div className="flex-1 h-px bg-white/5 max-w-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-12 relative overflow-hidden"
          style={{ borderColor: 'rgba(185,85,229,0.2)' }}
        >
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-purple-400/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-cyan-400/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-cyan-400/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-purple-400/40 rounded-br-lg" />

          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div 
                className="w-20 h-20 rounded-full border border-cyan-400/20 absolute inset-0"
                style={{ animation: 'rotate-slow 20s linear infinite' }}
              />
              <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Rocket size={28} className="text-purple-400" />
              </div>
            </div>
          </div>

          <h2 className="font-orbitron text-3xl md:text-4xl font-black mb-6 gradient-text leading-tight">
            Not Just Building Apps.<br />Building The Future.
          </h2>

          <p className="font-space text-lg text-white/50 leading-relaxed max-w-2xl mx-auto mb-8">
            My goal isn't to build another app. It's to create infrastructure that changes how the world operates — a system so deeply integrated into daily life that people can't imagine existing without it. The kind of impact that echoes for decades.
          </p>

          <div className="grid grid-cols-3 gap-8 mt-10 pt-8 border-t border-white/5">
            {[
              { icon: Target, label: 'Focus', value: 'Global Scale' },
              { icon: Rocket, label: 'Timeline', value: 'Now . Forever' },
              { icon: Infinity, label: 'Vision', value: 'Limitless' }
            ].map(({ icon: GoalIcon, label, value }) => (
              <div key={label} className="text-center">
                <GoalIcon size={20} className="text-cyan-400 mx-auto mb-2" />
                <div className="font-mono text-xs text-white/30 mb-1">{label}</div>
                <div className="font-orbitron text-sm font-bold text-white">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
