'use client';

import { experiences } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import { Briefcase, Code2, GitBranch, TrendingUp, Trophy, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const typeMap: Record<string, {
  icon: typeof Briefcase; label: string; accent: string; bg: string; border: string;
}> = {
  internship: { icon: Briefcase, label: 'Internship',   accent: '#3B82F6', bg: 'bg-blue-500/10',   border: 'border-blue-500/25'   },
  freelance:  { icon: Code2,     label: 'Freelance',    accent: '#10B981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' },
  opensource: { icon: GitBranch, label: 'Open Source',  accent: '#8B5CF6', bg: 'bg-violet-500/10',  border: 'border-violet-500/25'  },
  hackathon:  { icon: Trophy,    label: 'Hackathon',    accent: '#F59E0B', bg: 'bg-amber-500/10',   border: 'border-amber-500/25'   },
  leadership: { icon: Users,     label: 'Leadership',   accent: '#EC4899', bg: 'bg-pink-500/10',    border: 'border-pink-500/25'    },
};

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-container">
        <Reveal>
          <p className="section-label">Experience</p>
          <h2 className="section-title">
            Technical{' '}
            <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle">
            Internships, freelance work, open-source contributions — every role with
            quantified, recruiter-ready impact metrics.
          </p>
        </Reveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline spine */}
          <div className="absolute left-5 top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(to bottom, #3b82f6 0%, #8b5cf6 50%, rgba(99,102,241,0.1) 100%)' }} />

          <div className="space-y-5">
            {experiences.map((exp, i) => {
              const meta = typeMap[exp.type] ?? typeMap.internship;
              const { icon: Icon } = meta;

              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-5 group">
                    {/* Icon node */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${meta.bg} border ${meta.border} shadow-sm mt-1`}>
                        <Icon size={17} style={{ color: meta.accent }} />
                      </motion.div>
                    </div>

                    {/* Card */}
                    <motion.div whileHover={{ x: 2 }}
                      className="card flex-1 hover:border-blue-500/20 transition-all duration-300">

                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-1.5 inline-block"
                            style={{ background: `${meta.accent}15`, color: meta.accent }}>
                            {meta.label}
                          </span>
                          <h3 className="font-black text-lg leading-tight">{exp.role}</h3>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: meta.accent }}>{exp.company}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--text-subtle)' }}>{exp.companyType}</p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex-shrink-0"
                          style={{ color: 'var(--text-muted)' }}>
                          {exp.duration}
                        </span>
                      </div>

                      {/* Impact metrics chips */}
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {exp.metrics.map(m => (
                          <div key={m.label}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)]">
                            <TrendingUp size={11} style={{ color: meta.accent }} />
                            <span className="text-xs font-bold" style={{ color: meta.accent }}>{m.value}</span>
                            <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>{m.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-1.5 mb-4">
                        {exp.description.map((d, j) => (
                          <li key={j} className="text-sm flex gap-2.5" style={{ color: 'var(--text-muted)' }}>
                            <span className="w-1 h-1 rounded-full flex-shrink-0 mt-[7px]"
                              style={{ background: meta.accent }} />
                            {d}
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border)]">
                        {exp.tech.map(t => <span key={t} className="badge">{t}</span>)}
                      </div>
                    </motion.div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
