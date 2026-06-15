'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  // Only render on the client — eliminates SSR/client mismatch entirely
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Respect prefers-reduced-motion via media query (safe — runs client-only)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduced ? 400 : 1600;

    const t = setTimeout(() => setVisible(false), delay);
    return () => clearTimeout(t);
  }, []);

  // Render nothing on the server and on first client paint
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#0a0f1e' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-center gap-5">
            {/* Logo mark */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-500/30">
              DK
            </div>

            {/* Bouncing dots */}
            <div className="flex gap-1.5" aria-hidden="true">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-blue-500"
                  animate={{ y: [0, -7, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
