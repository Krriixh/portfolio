import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const COMMANDS = {
  help: "Available commands: help, whoami, skills, clear, sudo, hire",
  whoami: "I'm Krrish Raj Chauhan, a builder of personal tools who realizes others need them too.",
  skills: "React, React Native, Node.js, TailwindCSS, Python, C++, Data Science... and over-engineering Easter eggs.",
  sudo: "Nice try. This incident will be reported.",
  hire: "Good choice. Email me at krriixh@gmail.com to get started.",
};

export default function Terminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Krrish-OS v1.0.0 initialized.' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', text: cmd }];
      
      if (cmd === 'clear') {
        setHistory([]);
      } else if (cmd === '') {
        // do nothing
      } else if (COMMANDS[cmd]) {
        newHistory.push({ type: 'output', text: COMMANDS[cmd] });
        setHistory(newHistory);
      } else {
        newHistory.push({ type: 'error', text: `command not found: ${cmd}` });
        setHistory(newHistory);
      }
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 w-full max-w-md z-50 rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl shadow-2xl font-mono text-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-white/40 text-xs">guest@krrish-os:~</span>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 h-64 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => (
              <div key={i} className="mb-2">
                {line.type === 'input' ? (
                  <div className="flex items-center text-white/60">
                    <span className="text-green-400 mr-2">❯</span>
                    <span>{line.text}</span>
                  </div>
                ) : (
                  <div className={line.type === 'error' ? 'text-red-400' : 'text-white/80'}>
                    {line.text}
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex items-center text-white">
              <span className="text-green-400 mr-2">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent outline-none border-none text-white font-mono"
                spellCheck="false"
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
