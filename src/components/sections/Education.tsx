'use client';

import { education } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import { motion } from 'framer-motion';
import { BookOpen, Award } from 'lucide-react';

export default function Education() {
  return (
    <section id="education">
      <div className="section-container">
        <Reveal>
          <p className="section-label">Education</p>
          <h2 className="section-title">
            Academic{' '}
            <span className="gradient-text">Background</span>
          </h2>
          <p className="section-subtitle">
            My educational foundation, relevant coursework, and academic achievements.
          </p>
        </Reveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #3b82f6, #06b6d4, transparent)' }} />

          <div className="space-y-6">
            {education.map((edu, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="flex gap-6">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/30 text-xl">
                      {edu.icon}
                    </div>
                  </div>

                  <motion.div whileHover={{ x: 3 }} className="card flex-1 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-black text-lg leading-tight">{edu.degree}</h3>
                        <p className="text-sm font-semibold text-blue-500 mt-0.5">{edu.institution}</p>
                        <p className="text-sm font-bold text-emerald-500 mt-0.5">{edu.grade}</p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex-shrink-0"
                        style={{ color: 'var(--text-muted)' }}>
                        {edu.duration}
                      </span>
                    </div>

                    <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{edu.description}</p>

                    {/* Coursework */}
                    {edu.coursework.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <BookOpen size={13} style={{ color: 'var(--text-subtle)' }} />
                          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
                            Key Coursework
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {edu.coursework.map(c => (
                            <span key={c} className="badge text-xs">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    {edu.achievements.length > 0 && (
                      <div className="pt-3 border-t border-[var(--border)]">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Award size={13} className="text-amber-500" />
                          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
                            Highlights
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {edu.achievements.map((a, j) => (
                            <span key={j}
                              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
