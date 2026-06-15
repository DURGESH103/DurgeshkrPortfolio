'use client';

import { skills } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import { motion } from 'framer-motion';

type Level = 'Advanced' | 'Intermediate' | 'Familiar';

const levelStyle: Record<Level, { label: string; colors: string }> = {
  Advanced:     { label: 'Advanced',     colors: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/18 hover:border-blue-500/40' },
  Intermediate: { label: 'Intermediate', colors: 'bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/18 hover:border-violet-500/40' },
  Familiar:     { label: 'Familiar',     colors: 'bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/18 hover:border-slate-500/35' },
};

const accentMap: Record<string, { icon: string; border: string }> = {
  blue:    { icon: 'bg-blue-500/12 border-blue-500/20',    border: 'hover:border-blue-500/30'    },
  violet:  { icon: 'bg-violet-500/12 border-violet-500/20', border: 'hover:border-violet-500/30'  },
  emerald: { icon: 'bg-emerald-500/12 border-emerald-500/20', border: 'hover:border-emerald-500/30' },
  amber:   { icon: 'bg-amber-500/12 border-amber-500/20',   border: 'hover:border-amber-500/30'   },
  cyan:    { icon: 'bg-cyan-500/12 border-cyan-500/20',     border: 'hover:border-cyan-500/30'    },
  rose:    { icon: 'bg-rose-500/12 border-rose-500/20',     border: 'hover:border-rose-500/30'    },
};

const legend: { level: Level; desc: string }[] = [
  { level: 'Advanced',     desc: 'Used in production projects' },
  { level: 'Intermediate', desc: 'Comfortable, building depth' },
  { level: 'Familiar',     desc: 'Learning & exploring'       },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-container">
        <Reveal>
          <p className="section-label">Skills</p>
          <h2 className="section-title">
            My Technical{' '}
            <span className="gradient-text">Toolkit</span>
          </h2>
          <p className="section-subtitle">
            Languages, frameworks, and tools I use to build production-grade software —
            labelled by hands-on experience level.
          </p>
        </Reveal>

        {/* Legend */}
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {legend.map(({ level, desc }) => {
              const s = levelStyle[level];
              return (
                <div key={level} className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.colors} transition-colors duration-150`}>
                    {s.label}
                  </span>
                  <span className="text-xs hidden sm:inline" style={{ color: 'var(--text-subtle)' }}>
                    {desc}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, i) => {
            const a = accentMap[group.color] ?? accentMap.blue;
            return (
              <Reveal key={group.category} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className={`card h-full transition-all duration-300 ${a.border}`}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl border ${a.icon}`}>
                      {group.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-base leading-tight">{group.category}</h3>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-subtle)' }}>
                        {group.items.length} skills
                      </p>
                    </div>
                  </div>

                  {/* Skill pills */}
                  <div className="flex flex-col gap-2">
                    {group.items.map(skill => {
                      const lvl = skill.level as Level;
                      const s = levelStyle[lvl] ?? levelStyle.Familiar;
                      return (
                        <div key={skill.name}
                          className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                            {skill.name}
                          </span>
                          <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-colors duration-150 ${s.colors}`}>
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
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
