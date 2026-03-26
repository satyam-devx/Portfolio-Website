import { useEffect, useRef } from 'react';

export default function ParticleNameHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const w = Math.max(window.innerWidth, 100);
    const h = Math.max(window.innerHeight, 100);
    canvas.width = w;
    canvas.height = h;

    let rafId;
    let mouseX = -1000, mouseY = -1000;
    let exploded = false;
    let explodeTimer = null;
    let start = performance.now();

    const COLORS = ['#00f5ff', '#9b5de5', '#4361ee', '#f72585'];
    let particles = [];

    const buildParticles = (width, height) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const oc = offscreen.getContext('2d');

      const fontSize = Math.min(width / 5, 160);
      oc.fillStyle = 'white';
      oc.font = `900 ${fontSize}px Orbitron, sans-serif`;
      oc.textAlign = 'center';
      oc.textBaseline = 'middle';
      oc.fillText('SATYAM', width / 2, height / 2);

      // Guard: ensure canvas has valid dimensions before getImageData
      if (offscreen.width === 0 || offscreen.height === 0) return [];

      const imageData = oc.getImageData(0, 0, offscreen.width, offscreen.height);
      const pixels = imageData.data;

      const targetPoints = [];
      const gap = 6;
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const idx = (y * width + x) * 4;
          if (pixels[idx + 3] > 128) {
            targetPoints.push({ x, y });
          }
        }
      }

      // Shuffle
      for (let i = targetPoints.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [targetPoints[i], targetPoints[j]] = [targetPoints[j], targetPoints[i]];
      }

      return targetPoints.map(p => ({
        x: Math.random() * width,
        y: Math.random() * height,
        tx: p.x,
        ty: p.y,
        vx: 0,
        vy: 0,
        size: Math.random() * 1.5 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.6,
      }));
    };

    const startAnimation = (width, height) => {
      particles = buildParticles(width, height);
      start = performance.now();

      const animate = () => {
        ctx.fillStyle = 'rgba(5,5,5,0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const elapsed = (performance.now() - start) / 1000;

        particles.forEach(p => {
          if (exploded) {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.96;
            p.vy *= 0.96;
            p.vy += 0.15;
          } else {
            if (elapsed < p.delay) return;

            const dxm = p.x - mouseX;
            const dym = p.y - mouseY;
            const dm = Math.sqrt(dxm * dxm + dym * dym);
            if (dm < 100 && dm > 0) {
              p.x += (dxm / dm) * (100 - dm) * 0.15;
              p.y += (dym / dm) * (100 - dm) * 0.15;
            }

            const dx = p.tx - p.x;
            const dy = p.ty - p.y;
            p.vx += dx * 0.06;
            p.vy += dy * 0.06;
            p.vx *= 0.82;
            p.vy *= 0.82;
            p.x += p.vx;
            p.y += p.vy;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        rafId = requestAnimationFrame(animate);
      };

      cancelAnimationFrame(rafId);
      animate();
    };

    const onMouse = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onClick = () => {
      exploded = !exploded;
      if (exploded) {
        particles.forEach(p => {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 12 + 4;
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed;
        });
        explodeTimer = setTimeout(() => { exploded = false; }, 2000);
      }
    };

    const onResize = () => {
      const nw = Math.max(window.innerWidth, 100);
      const nh = Math.max(window.innerHeight, 100);
      canvas.width = nw;
      canvas.height = nh;
      startAnimation(nw, nh);
    };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('resize', onResize);
    canvas.addEventListener('click', onClick);

    // Wait for fonts before sampling text pixels
    document.fonts.ready.then(() => {
      startAnimation(canvas.width, canvas.height);
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(explodeTimer);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 cursor-crosshair"
      title="Click to explode!"
    />
  );
}
