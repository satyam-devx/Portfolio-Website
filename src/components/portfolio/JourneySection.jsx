import { motion } from 'framer-motion';

const chapters = [
  {
    year: '2021',
    title: 'The Spark',
    desc: 'Wrote my first line of HTML on a cracked laptop. Built a calculator. Thought I was a genius. I wasn\'t. But the obsession was already planted.',
    color: '#00f5ff',
    icon: '⚡',
  },
  {
    year: '2022',
    title: 'The Grind',
    desc: 'No courses, no bootcamp. Just documentation, Stack Overflow, and 3am problem-solving sessions. Built 15+ projects nobody asked for but learned everything I needed.',
    color: '#9b5de5',
    icon: '🔥',
  },
  {
    year: '2023',
    title: 'The Shift',
    desc: 'Stopped thinking like a developer, started thinking like a product architect. Discovered Three.js, WebGL, and the intersection of engineering and art. Everything changed.',
    color: '#4361ee',
    icon: '🌌',
  },
  {
    year: '2024',
    title: 'The Build',
    desc: 'Shipped real products. Integrated AI before it was mainstream. Started thinking about scale — not hundreds of users, but millions. The ambition level became unreasonable.',
    color: '#f72585',
    icon: '🚀',
  },
  {
    year: '2025+',
    title: 'The Vision',
    desc: 'Building systems that don\'t just solve problems — they reshape how people experience software. The endgame isn\'t a job. It\'s a dent in the universe.',
    color: '#00f5ff',
    icon: '∞',
  },
];

export default function JourneySection() {
  return (
    <section id="journey" className="relative py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,245,255,0.04) 0%, transparent 60%)' }} />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-cyan-400 tracking-widest">//</span>
          <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">My Journey</span>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/20 to-transparent" />
          <span className="font-mono text-xs text-white/20">06</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="font-orbitron text-4xl md:text-5xl font-black mb-4">
          From Zero to <span className="gradient-text">Obsessed</span>
        </motion.h2>
        
        {/* Fixed unescaped entities here */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="font-space text-white/35 mb-20 max-w-xl">
          This isn&apos;t a resume timeline. It&apos;s a story.
        </motion.p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, #00f5ff40, #9b5de540, #4361ee40, transparent)' }} />

          <div className="space-y-12">
            {chapters.map((ch, i) => (
              <motion.div
                key={ch.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-16 group"
              >
                {/* Node */}
                <div className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${ch.color}15`, border: `1px solid ${ch.color}40`, boxShadow: `0 0 0 0 ${ch.color}` }}>
                  {ch.icon}
                </div>

                {/* Year */}
                <div className="font-mono text-xs mb-2" style={{ color: ch.color }}>{ch.year}</div>

                <div className="glass-card rounded-2xl p-6 relative overflow-hidden group-hover:border-opacity-40 transition-all duration-300"
                  style={{ borderColor: `${ch.color}15` }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at left, ${ch.color}06, transparent 70%)` }} />
                  <h3 className="font-orbitron text-lg font-bold text-white mb-2 relative z-10">{ch.title}</h3>
                  <p className="font-space text-sm text-white/50 leading-relaxed relative z-10">{ch.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mindset quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 glass-card rounded-3xl p-10 text-center relative overflow-hidden"
          style={{ borderColor: 'rgba(0,245,255,0.1)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)' }} />
          {/* Fixed unescaped entities here */}
          <p className="font-orbitron text-xl md:text-2xl font-black gradient-text mb-4 leading-tight">
            &quot;I don&apos;t compete with others.<br />I compete with what&apos;s possible.&quot;
          </p>
          <p className="font-mono text-xs text-white/20">— Satyam</p>
        </motion.div>
      </div>
    </section>
  );
}
