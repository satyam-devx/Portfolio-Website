import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Twitter, Instagram, Send, ArrowRight } from 'lucide-react'

const socials = [
  {
    icon: Mail,
    label: 'Email',
    handle: 'satyam16005@gmail.com',
    href: 'mailto:satyam16005@gmail.com',
    color: '#00f5ff',
  },
  {
    icon: Github,
    label: 'GitHub',
    handle: '@satyam-devx',
    href: 'https://github.com/satyam-devx',
    color: '#9b5de5',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    handle: '@urfav_satyam',
    href: 'https://twitter.com/urfav_satyam',
    color: '#4361ee',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    handle: '@satyamtbh',
    href: 'https://instagram.com/satyamtbh',
    color: '#f72585',
  },
]

// 🔥 Magnetic Button
function MagneticButton({ children, href, className }) {
  const ref = useRef(null)

  const move = (e) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3

    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const leave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={leave}
      className={className}
    >
      {children}
    </a>
  )
}

export default function ContactSection() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="contact" className="relative py-36 px-6 scroll-mt-24">

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(0,245,255,0.06), transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-cyan-400">//</span>
          <span className="font-mono text-xs text-cyan-400/60 uppercase">Contact</span>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/20 to-transparent" />
          <span className="font-mono text-xs text-white/20">04</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">

          {/* LEFT */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-orbitron text-4xl md:text-5xl font-bold mb-6"
            >
              Let's Build
              <br />
              <span className="gradient-text">Something Epic</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-space text-white/50 mb-10 max-w-md"
            >
              Whether you have a project in mind, want to collaborate, or just talk — my inbox is always open.
            </motion.p>

            {/* CTA */}
            <MagneticButton
              href="mailto:satyam16005@gmail.com"
              className="inline-flex items-center gap-3 font-orbitron text-sm px-6 py-3 rounded-xl bg-cyan-400 text-black font-bold"
            >
              <Send size={16} />
              SEND A MESSAGE
            </MagneticButton>

            {/* Status */}
            <div className="mt-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/40 font-mono">
                Online & Available
              </span>
            </div>
          </div>

          {/* RIGHT SOCIALS */}
          <div className="space-y-4">
            {socials.map((s, i) => {
              const Icon = s.icon
              const isHover = hovered === s.label

              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  onMouseEnter={() => setHovered(s.label)}
                  onMouseLeave={() => setHovered(null)}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between glass-card rounded-xl p-5 group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-lg"
                      style={{ background: s.color + '20' }}
                    >
                      <Icon size={18} style={{ color: s.color }} />
                    </div>

                    <div>
                      <div className="text-sm text-white font-semibold">
                        {s.label}
                      </div>
                      <div className="text-xs text-white/40">
                        {s.handle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-white/30 group-hover:text-white transition"
                    style={{
                      transform: isHover ? 'translateX(5px)' : 'translateX(0)',
                    }}
                  />
                </motion.a>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
