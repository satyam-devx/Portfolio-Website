export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="font-orbitron text-sm font-bold gradient-text tracking-widest">
          S.DEV
        </div>
        
        <div className="font-mono text-xs text-white/30 text-center">
          © 2026 Satyam - Designed & Built with intent.
        </div>
        
        <div className="font-mono text-xs text-cyan-400/40 tracking-widest">
          v2.0.0 - ONLINE
        </div>

      </div>
    </footer>
  );
}
