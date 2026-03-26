import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const skillGroups = [
  {
    category: 'Frontend',
    color: '#00f5ff',
    skills: [
      { name: 'HTML5 / CSS3', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'JavaScript ES6+', level: 90 },
      { name: 'React.js', level: 85 },
      { name: 'Next.js', level: 82 },
    ]
  },
  {
    category: 'Backend',
    color: '#b955e5',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 80 },
      { name: 'REST APIs', level: 88 },
    ]
  },
  {
    category: 'Database',
    color: '#ff5544',
    skills: [
      { name: 'MongoDB', level: 80 },
      { name: 'Firebase', level: 75 },
    ]
  },
  {
    category: 'Creative Tech',
    color: '#ff2555',
    skills: [
      { name: 'Three.js / R3F', level: 75 },
      { name: 'Framer Motion', level: 85 },
      { name: 'GSAP + ScrollTrigger', level: 72 },
      { name: 'WebGL / GLSL', level: 65 },
      { name: 'AI API Integration', level: 80 },
    ]
  }
];

function SkillBar({ name, level, color, index }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setAnimated(true);
    }, { threshold: 0.5 });
    
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-xs text-white/50 group-hover:text-white/90 transition-colors duration-300">{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: animated ? 1 : 0 }}
          className="font-mono text-xs tabular-nums"
          style={{ color }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ delay: index * 0.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}50, ${color})` }}
        >
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 8px ${color}, 0 0 16px ${color}60` }}
          />
        </motion.div>
      </div>
    </div>
  );
}

const techTags = [
  'HTML5', 'CSS3', 'Tailwind', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Node.js', 'Express', 'MongoDB', 'Firebase', 'Git', 'REST API', 'WebSockets',
  'Three.js', 'Framer Motion', 'GSAP', 'WebGL', 'GLSL', 'React Three Fiber', 'AI APIs',
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-36 px-6">
      <div className="absolute left-0 top-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(185,85,229,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">Skills</span>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/20 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-orbitron text-4xl md:text-5xl font-black mb-4"
        >
          My <span className="gradient-text">Arsenal</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-space text-white/50 mb-16 max-w-xl"
        >
          Tools I've mastered and continuously push further — each one wielded with purpose.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.1, duration: 0.7 }}
              className="glass-card rounded-3xl p-7 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none"
                   style={{ background: `radial-gradient(circle at top right, ${group.color}, transparent)` }} />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full" style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
                <span className="font-orbitron text-sm tracking-[0.2em] font-bold" style={{ color: group.color }}>
                  {group.category.toUpperCase()}
                </span>
              </div>

              <div className="space-y-5">
                {group.skills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} color={group.color} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {techTags.map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.15, y: -3 }}
              className="glass-card px-4 py-2 rounded-xl font-mono text-xs text-white/50 hover:text-cyan-400 transition-all duration-300 cursor-default relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.08), rgba(185,85,229,0.05))' }} />
              <span className="relative z-10">{tag}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
