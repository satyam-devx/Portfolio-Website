import { useEffect } from 'react';

export function useEasterEggs() {
  useEffect(() => {
    // Console easter egg
    setTimeout(() => {
      console.log(
        '%c\n██████╗ ███████╗██╗   ██╗\n' +
        '██╔══██╗██╔════╝██║   ██║\n' +
        '██║  ██║█████╗  ██║   ██║\n' +
        '██║  ██║██╔══╝  ╚██╗ ██╔╝\n' +
        '██████╔╝███████╗ ╚████╔╝ \n' +
        '╚═════╝ ╚══════╝  ╚═══╝  \n',
        'color: #00f5ff; font-size: 10px; font-family: monospace;'
      );
      console.log(
        '%cYou found me. Let\'s build something big.',
        'color: #9b5de5; font-size: 16px; font-weight: bold; font-family: monospace;'
      );
      console.log(
        '%c→ satyam160050@gmail.com',
        'color: #4361ee; font-size: 12px; font-family: monospace;'
      );
    }, 2000);

    // Konami code easter egg
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let seq = [];
    const onKey = (e) => {
      seq.push(e.key);
      if (seq.length > KONAMI.length) seq.shift();
      if (JSON.stringify(seq) === JSON.stringify(KONAMI)) {
        triggerKonamiEffect();
        seq = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

function triggerKonamiEffect() {
  // Flash the page briefly in cyan
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed; inset: 0; z-index: 99998;
    background: radial-gradient(ellipse at center, rgba(0,245,255,0.15), transparent 70%);
    pointer-events: none; animation: konamiFade 1.5s ease forwards;
  `;

  const style = document.createElement('style');
  style.textContent = `@keyframes konamiFade { 0%{opacity:1} 100%{opacity:0} }`;
  document.head.appendChild(style);

  const msg = document.createElement('div');
  msg.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);
    z-index: 99999; font-family: Orbitron, sans-serif; font-size: clamp(14px,2vw,20px);
    color: #00f5ff; text-align: center; pointer-events: none;
    text-shadow: 0 0 20px #00f5ff; animation: konamiFade 2.5s ease forwards;
    letter-spacing: 0.2em;
  `;
  msg.innerHTML = '⚡ CHEAT CODE ACTIVATED ⚡<br><span style="font-size:0.6em;color:#9b5de5;letter-spacing:0.1em;">You clearly have good taste.</span>';

  document.body.appendChild(flash);
  document.body.appendChild(msg);
  setTimeout(() => { flash.remove(); msg.remove(); style.remove(); }, 2500);
}
