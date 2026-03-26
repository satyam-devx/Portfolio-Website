import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Zap, Globe, Brain, Code2 } from 'lucide-react'
import useScrollReveal from '../../hooks/useScrollReveal'

const traits = [
  { icon: Code2, label: 'Precision', desc: 'Every line of code is intentional.', color: '#00f5ff' },
  { icon: Brain, label: 'Vision', desc: 'Thinking three moves ahead.', color: '#9b5de5' },
  { icon: Zap, label: 'Execution', desc: 'Ideas shipped fast and flawlessly.', color: '#4361ee' },
  { icon: Globe, label: 'Impact', desc: 'Building for the next billion.', color: '#f72585' },
]

// 🔥 Distortion Text Effect
function DistortText({ children, className }) {
  const ref = useRef(null)

  const scramble = () => {
    const el = ref.current
    if (!el) return
    const original = el.textContent
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%'
    let iter = 0

    const interval = setInterval(() => {
      el.textContent = original
        .split('')
        .map((c, i) =>
          i < iter ? original[i] : chars[Math.floor(Math.random() * chars.length)]
        )
        .join('')

      if (iter >= original.length) {
        clearInterval(interval)
        el.textContent = original
      }

      iter += 0.5
    }, 30)
  }

  return (
    <span ref={ref} className={className} onMouseEnter={scramble}>
      {children}
    </span>
  )
}

export default function AboutSection() {
  const headingRef = useScrollReveal({ threshold: 0.2 })
  const textRef = useScrollReveal({ threshold: 0.1, delay: 0.2 })

  return (
    <section id="about" className="relative py-36 px-6">
      
      {/* Background glow */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(155,93,229,0.07), transparent 70%)' }} />

      <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.05), transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-cyan-400">//</span>
          <span className="font-mono text-xs text-cyan-400/60 uppercase">About</span>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/20 to-transparent" />
          <span className="font-mono text-xs text-white/20">01</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT TEXT */}
          <div>
            <h2
              ref={headingRef}
              className="font-orbitron text-4xl md:text-5xl font-bold mb-8 leading-tight"
            >
              I Don't Write Code.
              <br />
              <DistortText className="gradient-text">
                I Build Futures.
              </DistortText>
            </h2>

            <div
              ref={textRef}
              className="space-y-5 font-space text-white/60 text-[15px] leading-relaxed"
            >
              <p>
                I'm <span className="text-cyan-400 font-semibold">Satyam</span> — a full-stack developer who lives at the intersection of precision engineering and creative obsession.
              </p>

              <p>
                Every system I build carries intent. Every pixel, every function, every interaction — crafted with
                <span className="text-white/90"> surgical precision</span>.
              </p>

              <p>
                Right now, I'm deep in development on something that has the potential to
                <span className="text-purple-400 font-semibold"> reshape how humans interact with software</span>.
              </p>

              <p className="font-mono text-xs text-cyan-400/50 border-l-2 border-cyan-400/30 pl-4 italic">
                "The best time to build the future was yesterday. The second best time is now."
              </p>
            </div>
          </div>

          {/* RIGHT TRAITS */}
          <div className="grid grid-cols-2 gap-6">
            {traits.map(({ icon: Icon, label, desc, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-6 group relative overflow-hidden"
              >
                {/* glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${color}20, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${color}20` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>

                  <div className="font-orbitron text-sm font-bold text-white mb-1">
                    {label}
                  </div>

                  <div className="font-space text-xs text-white/40">
                    {desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
