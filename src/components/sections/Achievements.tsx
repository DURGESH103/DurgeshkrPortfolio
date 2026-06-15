'use client';

import { achievements } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const colorMap: Record<string, { accent: string; bg: string; ring: string }> = {
  blue:   { accent: '#3B82F6', bg: '#3B82F610', ring: '#3B82F620' },
  amber:  { accent: '#F59E0B', bg: '#F59E0B10', ring: '#F59E0B20' },
  violet: { accent: '#8B5CF6', bg: '#8B5CF610', ring: '#8B5CF620' },
  emerald:{ accent: '#10B981', bg: '#10B98110', ring: '#10B98120' },
  pink:   { accent: '#EC4899', bg: '#EC489910', ring: '#EC489920' },
  cyan:   { accent: '#06B6D4', bg: '#06B6D410', ring: '#06B6D420' },
  green:  { accent: '#22C55E', bg: '#22C55E10', ring: '#22C55E20' },
  orange: { accent: '#F97316', bg: '#F9731610', ring: '#F9731620' },
};

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 2000;
    const isFloat = !Number.isInteger(target);
    const frame = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(isFloat ? parseFloat((e * target).toFixed(2)) : Math.floor(e * target));
      if (p < 1) raf.current = requestAnimationFrame(frame);
    };
    raf.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {Number.isInteger(target) ? count.toLocaleString() : count.toFixed(2)}{suffix}
    </span>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="bg-[var(--bg-secondary)]">
      <div className="section-container">
        <Reveal>
          <p className="section-label">Achievements</p>
          <h2 className="section-title">
            By the{' '}
            <span className="gradient-text">Numbers</span>
          </h2>
          <p className="section-subtitle">
            Key milestones, metrics, and competitive programming stats that define my engineering journey.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements.map((item, i) => {
            const c = colorMap[item.color] ?? colorMap.blue;
            return (
              <Reveal key={item.label} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="card text-center group overflow-hidden relative">

                  {/* Glow bg */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${c.ring}, transparent 70%)` }} />

                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ background: c.bg, border: `1px solid ${c.ring}` }}>
                      {item.icon}
                    </div>

                    <p className="text-3xl sm:text-4xl font-black mb-1"
                      style={{ color: c.accent }}>
                      <Counter target={item.value} suffix={item.suffix} />
                    </p>
                    <p className="text-sm font-semibold mb-1">{item.label}</p>
                    <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>{item.sub}</p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
