'use client';

import { currentlyLearning } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function ProgressBar({ value, color }: { value: number; color: string }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div ref={ref} className="progress-bar mt-3">
      <motion.div
        className="progress-fill"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)`, boxShadow: `0 0 8px ${color}60` }}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${value}%` : 0 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
    </div>
  );
}

export default function CurrentlyLearning() {
  return (
    <section id="learning">
      <div className="section-container">
        <Reveal>
          <p className="section-label">Roadmap</p>
          <h2 className="section-title">
            What I&apos;m Currently{' '}
            <span className="gradient-text">Learning</span>
          </h2>
          <p className="section-subtitle">
            I believe the best engineers never stop learning. Here&apos;s my current focus areas
            and how far I&apos;ve progressed.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentlyLearning.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                className="card card-hover h-full group relative overflow-hidden">

                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none blur-3xl opacity-30"
                  style={{ background: item.color }} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{item.icon}</div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                      style={{ background: `${item.color}18`, color: item.color }}>
                      {item.progress}%
                    </span>
                  </div>

                  <h3 className="font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--text-muted)' }}>
                    {item.desc}
                  </p>

                  <ProgressBar value={item.progress} color={item.color} />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Quote */}
        <Reveal delay={0.4}>
          <div className="mt-10 text-center">
            <p className="text-base italic" style={{ color: 'var(--text-subtle)' }}>
              &ldquo;An investment in knowledge pays the best interest.&rdquo;
            </p>
            <p className="text-xs mt-1 font-semibold" style={{ color: 'var(--text-subtle)' }}>— Benjamin Franklin</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
