import { useEffect, useRef } from 'react';

// GSAP-style scroll reveal with stagger support
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      threshold = 0.15,
      delay = 0,
    } = options;

    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0px)';
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}

export function useStaggerReveal(count = 5, baseDelay = 0.1) {
  const refs = Array.from({ length: count }, () => useRef(null));

  useEffect(() => {
    refs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;

      el.style.opacity = '0';
      el.style.transform = 'translateY(40px) scale(0.97)';
      el.style.transition = `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * baseDelay}s`;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      obs.observe(el);
    });
  }, []);

  return refs;
}
