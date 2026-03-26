import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };

    const handleHover = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {trail.map((t, i) => (
        <div
          key={t.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: t.x,
            top: t.y,
            width: `${(i + 1) * 1.5}px`,
            height: `${(i + 1) * 1.5}px`,
            background: `rgba(0, 245, 255, ${(i + 1) * 0.05})`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.1s',
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        animate={{
          x: pos.x - (isHovering ? 20 : 8),
          y: pos.y - (isHovering ? 20 : 8),
          width: isHovering ? 40 : 16,
          height: isHovering ? 40 : 16,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{
          background: isHovering ? 'transparent' : '#00f5ff',
          border: isHovering ? '1px solid #00f5ff' : 'none',
          boxShadow: '0 0 10px #00f5ff, 0 0 20px rgba(0,245,255,0.5)',
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9997] rounded-full border border-cyan-400/30"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          width: 40,
          height: 40,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </>
  );
}
