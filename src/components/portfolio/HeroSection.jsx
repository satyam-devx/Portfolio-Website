import { motion } from 'framer-motion';
import { ArrowRight, Code2, Terminal, Cpu } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden px-6">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.03)_0%,transparent_50%)]" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(185,85,229,0.04)_0%,transparent_50%)] blur-[100px]" />
      </div>

      {/* Floating Badges (Desktop Only) */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:flex absolute top-1/4 left-[15%] items-center gap-2 glass-card px-4 py-2 rounded-full border border-white/5"
      >
        <Code2 size={16} className="text-cyan-400" />
        <span className="font-mono text-xs text-white/50">React / Next.js</span>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:flex absolute top-1/3 right-[15%] items-center gap-2 glass-card px-4 py-2 rounded-full border border-white/5"
      >
        <Terminal size={16} className="text-purple-400" />
        <span className="font-mono text-xs text-white/50">Node.js / Go</span>
      </motion.div>

      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:flex absolute bottom-1/4 left-[20%] items-center gap-2 glass-card px-4 py-2 rounded-full border border-white/5"
      >
        <Cpu size={16} className="text-cyan-400" />
        <span className="font-mono text-xs text-white/50">AI / ML APIs</span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8 glass-card px-4 py-1.5 rounded-full border border-cyan-400/20"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: '0 0 10px #00f5ff' }} />
          <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">Available for work</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
        >
          WEB
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundSize: '200% auto', animation: 'gradient 4s linear infinite' }}>
            DEVELOPER
          </span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-space text-lg md:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed"
        >
          I engineer digital experiences that bridge the gap between design and complex logic. Specialized in high-performance web applications and AI integrations.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-cyan-400 text-black font-orbitron font-bold text-sm tracking-wider overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative flex items-center gap-2">
              VIEW MY WORK
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <a
            href="#contact"
            className="group px-8 py-4 bg-transparent text-white font-orbitron font-bold text-sm tracking-wider border border-white/20 hover:border-cyan-400 transition-colors duration-300 rounded-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-cyan-400/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
            <span className="relative">CONTACT ME</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase [writing-mode:vertical-rl] mb-4">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
