import { useEffect, useRef } from 'react';

// Lenis-style smooth scroll implementation
export default function SmoothScroller({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let currentY = 0;
    let targetY = 0;
    let rafId;
    const ease = 0.1;

    const container = containerRef.current;
    if (!container) return;

    // Set body height to container's scroll height for native scrollbar
    const setHeight = () => {
      document.body.style.height = `${container.scrollHeight}px`;
    };

    const update = () => {
      targetY = window.scrollY;
      currentY += (targetY - currentY) * ease;

      const rounded = parseFloat(currentY.toFixed(2));
      container.style.transform = `translateY(-${rounded}px)`;

      rafId = requestAnimationFrame(update);
    };

    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.willChange = 'transform';

    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(container);

    update();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.body.style.height = '';
      container.style.transform = '';
      container.style.position = '';
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
