import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = ['Home', 'About', 'Skills', 'Projects', 'AI', 'Journey', 'Contact'];
const linkIds = { Home: 'home', About: 'about', Skills: 'skills', Projects: 'projects', AI: 'ai', Journey: 'journey', Contact: 'contact' };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);

    // 🔥 NEW: update active link on scroll
    const handleActiveOnScroll = () => {
      links.forEach((link) => {
        const id = linkIds[link];
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(link);
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('scroll', handleActiveOnScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', handleActiveOnScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const targetId = linkIds[id] || id.toLowerCase();
    const el = document.getElementById(targetId);

    // 🔥 FIX: smooth scroll with offset for navbar
    if (el) {
      const yOffset = -80; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }

    setActive(id);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className={`mx-auto max-w-6xl px-6 flex items-center justify-between transition-all duration-500 ${
        scrolled ? 'glass rounded-2xl py-3 px-6' : ''
      }`}>
        {/* Logo */}
        <div
          className="font-orbitron text-lg font-bold cursor-pointer gradient-text tracking-widest"
          onClick={() => scrollTo('home')}
        >
          S<span className="text-white/40">.</span>DEV
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 relative group ${
                active === link ? 'text-cyan-400' : 'text-white/50 hover:text-white'
              }`}
            >
              {link}
              <span className={`absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all duration-300 ${
                active === link ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-orbitron text-xs px-5 py-2.5 rounded-lg bg-cyan-400 text-black font-bold tracking-wider"
            style={{ boxShadow: '0 0 20px rgba(0,245,255,0.4)' }}
            onClick={() => scrollTo('Contact')}
          >
            HIRE ME
          </motion.button>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-white/70" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass mx-4 mt-2 rounded-2xl p-6 flex flex-col gap-4"
          >
            {links.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="font-mono text-sm tracking-widest uppercase text-white/70 hover:text-cyan-400 transition-colors text-left"
              >
                {link}
              </button>
            ))}
            <button
              className="font-orbitron text-xs px-5 py-2.5 rounded-lg bg-cyan-400 text-black font-bold"
              onClick={() => scrollTo('Contact')}
            >
              HIRE ME
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
