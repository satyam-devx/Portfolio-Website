import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';

const projects = [
  {
    title: "AI Content Engine",
    description: "A sophisticated platform using GPT-4 to generate SEO-optimized content and social media assets in real-time.",
    tech: ["Next.js", "OpenAI", "Tailwind", "Supabase"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    category: "AI / ML"
  },
  {
    title: "Cyber-Commerce v2",
    description: "High-performance E-commerce engine with 3D product previews and instant checkout functionality.",
    tech: ["React", "Three.js", "Node.js", "Stripe"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    category: "Web App"
  },
  {
    title: "Nexus Dashboard",
    description: "Real-time crypto analytics dashboard with advanced charting and multi-wallet integration.",
    tech: ["TypeScript", "Recharts", "Web3.js", "Tailwind"],
    link: "#",
    github: "#",
    image: "https://images.pexels.com/photos/6770775/pexels-photo-6770775.jpeg",
    category: "FinTech"
  }
];

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      viewport={{ once: true }}
      className="group relative glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-400/30 transition-all duration-500"
    >
      {/* Project Image Container */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10 opacity-60" />
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-400 tracking-wider uppercase">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="font-orbitron text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="font-space text-sm text-white/50 mb-6 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span key={t} className="text-[10px] font-mono text-white/30 border border-white/5 px-2 py-1 rounded-md">
              {t}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-4 border-t border-white/5 pt-6">
          <a href={project.link} className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors group/link">
            <ExternalLink size={14} />
            <span>LIVE DEMO</span>
          </a>
          <a href={project.github} className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors">
            <Github size={14} />
            <span>SOURCE</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <Code2 size={16} className="text-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">Works</span>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/20 to-transparent" />
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-orbitron text-4xl md:text-5xl font-black mb-4"
            >
              Selected <span className="gradient-text">Creations</span>
            </motion.h2>
            <p className="font-space text-white/40 max-w-lg">
              A glimpse into the digital architectures I've engineered—balancing aesthetics with extreme performance.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:block"
          >
            <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em]">
              Scroll to explore • 0{projects.length} Total
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
