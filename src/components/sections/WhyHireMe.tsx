'use client';

import { whyHireMe } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function WhyHireMe() {
  return (
    <section id="why-hire-me" className="section-alt">
      <div className="section-container">
        <Reveal>
          <p className="section-label">Why Me</p>
          <h2 className="section-title">
            Why You Should{' '}
            <span className="gradient-text">Hire Me</span>
          </h2>
          <p className="section-subtitle">
            A clear, honest breakdown of what I bring to a team and why I&apos;m ready to
            contribute from day one at a top product company.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyHireMe.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="card card-hover h-full group relative overflow-hidden">
                {/* Subtle top-left corner glow */}
                <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />

                <div className="flex items-start gap-3 mb-3">
                  <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 ml-auto">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  </div>
                </div>

                <h3 className="font-bold text-sm mb-1.5">{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {item.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.4}>
          <div className="mt-10 card text-center py-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.04), rgba(99,102,241,0.04))' }} />
            <p className="text-2xl font-black mb-2">
              Ready to contribute from{' '}
              <span className="gradient-text">day one.</span>
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Internships · Full-time SWE · Freelance · Collaboration
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary px-8 py-3">
                Get in Touch
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                href="/resume.pdf" download className="btn-secondary px-8 py-3">
                Download Resume
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
