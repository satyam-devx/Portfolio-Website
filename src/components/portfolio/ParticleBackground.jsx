import { useEffect, useRef } from 'react';

// Enhanced particle system with noise-based movement
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Simple noise function
    const noise = (x, y, t) => {
      return Math.sin(x * 0.008 + t) * Math.cos(y * 0.006 + t * 0.8) * 0.5 +
             Math.sin(x * 0.003 - t * 0.5) * Math.sin(y * 0.01 + t * 0.3) * 0.5;
    };

    const count = 90;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.3,
      color: ['#00f5ff', '#9b5de5', '#4361ee'][Math.floor(Math.random() * 3)],
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.4 + 0.1,
      noiseOffset: Math.random() * 1000,
    }));

    let mouseX = -999, mouseY = -999;
    const onMouse = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', onMouse);

    let t = 0;
    let rafId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.005;

      particles.forEach(p => {
        // Noise-driven movement
        const nx = noise(p.x + p.noiseOffset, p.y, t);
        const ny = noise(p.x, p.y + p.noiseOffset, t * 0.7);
        p.x += nx * p.speed;
        p.y += ny * p.speed;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse glow repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const d = Math.sqrt(dx * dx + dy * dy);
        let op = p.opacity;
        if (d < 120) {
          op = Math.min(p.opacity * 3, 0.9);
          p.x += (dx / d) * (120 - d) * 0.025;
          p.y += (dy / d) * (120 - d) * 0.025;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = op;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      // Connections
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#00f5ff';
            ctx.globalAlpha = (1 - d / 90) * 0.06;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
