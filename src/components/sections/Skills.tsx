'use client';

import Reveal from '@/components/ui/Reveal';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   SKILL DATA  — self-contained, no portfolio.ts dependency
   Each tech has: name, icon (emoji/text), brand color
───────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Building fast, modern web experiences',
    accent: '#6366F1',
    glow: 'rgba(99,102,241,0.12)',
    border: 'rgba(99,102,241,0.25)',
    size: 'large', // spans 2 cols on lg
    techs: [
      { name: 'React',         icon: '⚛',  color: '#61DAFB' },
      { name: 'Next.js',       icon: '▲',  color: '#ffffff' },
      { name: 'TypeScript',    icon: 'TS', color: '#3178C6' },
      { name: 'Tailwind CSS',  icon: '🌊', color: '#38BDF8' },
      { name: 'Framer Motion', icon: '✦',  color: '#BB86FC' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'Scalable APIs and server-side systems',
    accent: '#10B981',
    glow: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
    size: 'normal',
    techs: [
      { name: 'Node.js',    icon: '⬡',  color: '#68A063' },
      { name: 'Express.js', icon: '𝙴',  color: '#CCCCCC' },
      { name: 'Django',     icon: '🐍', color: '#44B78B' },
      { name: 'REST APIs',  icon: '⇄',  color: '#F59E0B' },
      { name: 'GraphQL',    icon: '◈',  color: '#E10098' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Core programming languages I write daily',
    accent: '#F59E0B',
    glow: 'rgba(245,158,11,0.10)',
    border: 'rgba(245,158,11,0.22)',
    size: 'normal',
    techs: [
      { name: 'JavaScript', icon: 'JS', color: '#F7DF1E' },
      { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
      { name: 'Java',       icon: '☕', color: '#ED8B00' },
      { name: 'Python',     icon: '🐍', color: '#3776AB' },
      { name: 'SQL',        icon: '𝙳',  color: '#336791' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    subtitle: 'Data storage, modelling and querying',
    accent: '#EF4444',
    glow: 'rgba(239,68,68,0.10)',
    border: 'rgba(239,68,68,0.22)',
    size: 'normal',
    techs: [
      { name: 'MongoDB',    icon: '🍃', color: '#47A248' },
      { name: 'MySQL',      icon: '🐬', color: '#4479A1' },
      { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
      { name: 'Redis',      icon: '⚡', color: '#DC382D' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    subtitle: 'Deployment, infra, and automation pipelines',
    accent: '#06B6D4',
    glow: 'rgba(6,182,212,0.10)',
    border: 'rgba(6,182,212,0.22)',
    size: 'normal',
    techs: [
      { name: 'Git & GitHub', icon: '⌥',  color: '#F1502F' },
      { name: 'Docker',       icon: '🐳', color: '#2496ED' },
      { name: 'AWS',          icon: '☁',  color: '#FF9900' },
      { name: 'CI/CD',        icon: '∞',  color: '#5BA4CF' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    subtitle: 'Everyday productivity and dev workflow',
    accent: '#8B5CF6',
    glow: 'rgba(139,92,246,0.10)',
    border: 'rgba(139,92,246,0.22)',
    size: 'normal',
    techs: [
      { name: 'VS Code',  icon: '⬡',  color: '#007ACC' },
      { name: 'Postman',  icon: '🔶', color: '#FF6C37' },
      { name: 'Figma',    icon: '✦',  color: '#F24E1E' },
      { name: 'Linux',    icon: '🐧', color: '#FCC624' },
    ],
  },
] as const;

/* Primary / Experienced / Learning groupings */
const STACK_GROUPS = [
  {
    label: 'Primary Stack',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.10)',
    border: 'rgba(59,130,246,0.20)',
    items: ['React', 'Next.js', 'Node.js', 'MongoDB', 'JavaScript', 'Tailwind CSS'],
  },
  {
    label: 'Experienced With',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.10)',
    border: 'rgba(139,92,246,0.20)',
    items: ['TypeScript', 'PostgreSQL', 'Docker', 'Express.js', 'Python'],
  },
  {
    label: 'Currently Learning',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.10)',
    border: 'rgba(245,158,11,0.20)',
    items: ['AWS', 'CI/CD', 'GraphQL', 'System Design'],
  },
];

/* ─── Tech pill ─────────────────────────────────────────── */
function TechPill({
  name, icon, color,
}: { name: string; icon: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold
                 border border-[var(--border)] bg-[var(--bg)] cursor-default select-none
                 transition-all duration-200"
      style={{ color: 'var(--text-muted)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}45`;
        (e.currentTarget as HTMLElement).style.background = `${color}0c`;
        (e.currentTarget as HTMLElement).style.color = color;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.background = 'var(--bg)';
        (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
      }}
    >
      <span className="font-bold leading-none" style={{ color, fontSize: '13px' }}>
        {icon}
      </span>
      {name}
    </motion.div>
  );
}

/* ─── Bento card ────────────────────────────────────────── */
function SkillCard({
  cat, index,
}: { cat: (typeof CATEGORIES)[number]; index: number }) {
  const isLarge = cat.size === 'large';

  return (
    <Reveal delay={index * 0.07}>
      <motion.div
        whileHover={{ y: -5 }}
        className={`relative rounded-2xl border bg-[var(--card)] p-6 flex flex-col gap-4
                    overflow-hidden transition-all duration-300 h-full
                    ${isLarge ? 'lg:col-span-2' : ''}`}
        style={{ borderColor: 'var(--border)' }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = cat.border;
          el.style.boxShadow = `0 16px 48px -12px ${cat.glow}`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'var(--border)';
          el.style.boxShadow = 'none';
        }}
      >
        {/* Ambient glow blob */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${cat.accent}20, transparent 70%)` }}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}30)` }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-black text-base leading-tight">{cat.title}</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-subtle)' }}>
              {cat.subtitle}
            </p>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-1 rounded-lg flex-shrink-0"
            style={{ background: cat.glow, color: cat.accent, border: `1px solid ${cat.border}` }}
          >
            {cat.techs.length} techs
          </span>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2">
          {cat.techs.map(t => (
            <TechPill key={t.name} name={t.name} icon={t.icon} color={t.color} />
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ─── Stack grouping row ────────────────────────────────── */
function StackGroups() {
  return (
    <Reveal delay={0.4}>
      <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] mb-5"
          style={{ color: 'var(--text-subtle)' }}>
          Experience Levels
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {STACK_GROUPS.map(g => (
            <div key={g.label}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: g.color }} />
                <p className="text-xs font-bold" style={{ color: g.color }}>{g.label}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map(name => (
                  <span
                    key={name}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                    style={{
                      background: g.bg,
                      color: g.color,
                      border: `1px solid ${g.border}`,
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Main section ──────────────────────────────────────── */
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
            A curated bento of the technologies I use to design, build,
            and ship production-grade full-stack software.
          </p>
        </Reveal>

        {/* Bento grid — lg: 3 cols, frontend card spans 2 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>

        {/* Experience level groupings */}
        <StackGroups />
      </div>
    </section>
  );
}
