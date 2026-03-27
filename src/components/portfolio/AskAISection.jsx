import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, RotateCcw } from 'lucide-react';

const SATYAM_CONTEXT = `You are Satyam's AI persona on his portfolio. Answer ONLY questions about Satyam. Be confident, concise, and ambitious in tone. Never break character. Here is everything about Satyam:

NAME: Satyam
ROLE: Full Stack Developer
EXPERIENCE: 3+ years
EMAIL: satyam160050@gmail.com
GITHUB: github.com/satyam-devx
INSTAGRAM: @satyamtbh
SKILLS: HTML5, CSS3, Tailwind CSS, JavaScript, React, Next.js, Node.js, Express.js, MongoDB, Firebase, Three.js, React Three Fiber, WebGL, GSAP, Framer Motion, AI API Integration, REST APIs, WebSockets.
                                                                                                    PROJECTS:
1. NexusAI — GPT-4 powered intelligent workspace. Multi-model routing, vector search, real-time streaming, Notion-like editor.

2. FlowBoard — Real-time SaaS analytics dashboard. WebSocket charts, funnels, cohorts, 2M+ events/day.

3. Orion — 3D code visualizer. Turns GitHub repos into navigable 3D galaxies using React Three Fiber and force-directed graphs.

PERSONALITY: Ambitious, precision-focused, visionary. Believes in building systems that matter at scale. Not just a developer — an architect of experiences.

AVAILABILITY: Open to work. Replies within 24h. Currently building something that could reshape how humans interact with software.

MINDSET: "The best time to build the future was yesterday. The second best time is now." Does not follow trends — identifies where tech is heading and builds there first.

If asked anything unrelated to Satyam, redirect back: "I'm here to talk about Satyam. Ask me anything about his work, skills, or how to reach him."`;

const QUICK_QUESTIONS = [
  "What tech stack does Satyam use?",
  "Tell me about his best project",
  "Is he available for work?",
  "What makes him different?",
];

export default function AskAISection() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey — I'm Satyam's AI. Ask me anything about his work, skills, projects, or mindset. I'll give you straight answers.",
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const sendMessage = async (text) => {
  const userText = text || input.trim();
  if (!userText || loading) return;

  setInput('');
  const newMessages = [...messages, { role: 'user', content: userText }];
  setMessages(newMessages);
  setLoading(true);

  try {
    const query = userText.toLowerCase();

    let response = "This AI is currently offline. Connect backend to enable it.";

    // 🎯 predefined answers
    if (query.includes("tech stack")) {
      response = "Satyam works with React, Next.js, Tailwind CSS, Node.js, MongoDB, Three.js, WebGL, and advanced animation tools like GSAP and Framer Motion.";
    }

    else if (query.includes("best project")) {
      response = "NexusAI stands out — a GPT-powered intelligent workspace with multi-model routing, real-time streaming, and a Notion-like editor.";
    }

    else if (query.includes("available")) {
      response = "Yes. Satyam is currently open to work and usually responds within 24 hours.";
    }

    else if (query.includes("different")) {
      response = "He builds more than apps — he engineers immersive experiences by combining performance, design, and deep technical architecture.";
    }

    // fake delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 600));

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);

  } catch (error) {
    setMessages(prev => [...prev, { role: 'assistant', content: "Connection hiccup. Try again in a moment." }]);
  } finally {
    setLoading(false);
  }
};

  const reset = () => setMessages([
    {
      role: 'assistant',
      content: "Hey — I'm Satyam's AI. Ask me anything about his work, skills, projects, or mindset. I'll give you straight answers.",
    }
  ]);

  return (
    <section id="ai" className="relative py-36 px-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(155,93,229,0.07) 0%, transparent 65%)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-purple-400 tracking-widest">//</span>
          <span className="font-mono text-xs text-purple-400/60 tracking-widest uppercase">Ask Satyam AI</span>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-400/20 to-transparent" />
          <span className="font-mono text-xs text-white/20">05</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="font-orbitron text-4xl md:text-5xl font-black mb-3">
          Talk to My <span className="gradient-text">AI</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="font-space text-white/35 mb-10 max-w-xl">
          Powered by GPT-4. Ask it anything about me — my skills, projects, availability, or mindset.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card rounded-3xl overflow-hidden"
          style={{ borderColor: 'rgba(155,93,229,0.2)' }}>

          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #9b5de5, #4361ee)' }}>
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <div className="font-orbitron text-xs font-bold text-white">Satyam AI</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-white/30">Online</span>
                </div>
              </div>
            </div>
            <button onClick={reset} className="text-white/20 hover:text-white/60 transition-colors">
              <RotateCcw size={14} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>

                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #9b5de5, #4361ee)' }}>
                    <Bot size={12} className="text-white" />
                  </div>
                )}

                <div className={`max-w-[80%] px-4 py-3 rounded-2xl font-space text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-cyan-400/10 border border-cyan-400/20 text-white/80'
                    : 'bg-white/4 border border-white/8 text-white/70'
                  }`}>
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 bg-white/10">
                    <User size={12} className="text-white/60" />
                  </div>
                )}

              </motion.div>
            ))}

            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #9b5de5, #4361ee)' }}>
                  <Bot size={12} className="text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/4 border border-white/8 flex gap-1.5 items-center">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400"
                      style={{ animation: `pulse-glow 1s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </motion.div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="px-6 py-3 border-t border-white/5 flex gap-2 flex-wrap">
            {QUICK_QUESTIONS.map(q => (
              <button key={q} onClick={() => sendMessage(q)}
                className="font-mono text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-white/30 hover:border-purple-400/40 hover:text-purple-400 transition-all duration-200">
                {q}
              </button>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-white/5 flex gap-3">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask anything about Satyam..."
              className="flex-1 bg-white/4 border border-white/10 rounded-xl px-4 py-2.5 font-space text-sm text-white/70 placeholder-white/20 outline-none focus:border-purple-400/40 transition-colors"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-30 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #9b5de5, #4361ee)' }}>
              <Send size={14} className="text-white" />
            </motion.button>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
